/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, interval, takeUntil, tap, map, distinctUntilChanged, catchError, EMPTY, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ApiResponse } from './entities/api-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscordService implements OnDestroy {
  private webSocket: WebSocketSubject<unknown>;
  private stop$ = new Subject<void>();
  private dataSubject$ = new BehaviorSubject<ApiResponse | null>(null);
  private heartbeat$ = interval(25000);

  constructor() {
    this.webSocket = this.createWebSocket();
    this.start();
  }

  private createWebSocket(): WebSocketSubject<any> {
    return webSocket(environment.discord.socket);
  }

  start(): void {
    this.webSocket
      .pipe(
        takeUntil(this.stop$),
        tap(data => this.handleServerMessage(data)),
        map(data => this.mapStringArrayToData(data)),
        distinctUntilChanged(),
        catchError(err => {
          console.error('WebSocket Error:', err);
          return EMPTY;
        })
      )
      .subscribe({
        next: user => this.dataSubject$.next(user),
        error: err => console.error('Unhandled WebSocket Error:', err),
        complete: () => console.log('WebSocket connection closed.'),
      });
  }

  private handleServerMessage(data: any): void {
    if (data.op === 1) {
      this.initiateHandshake();
    }
  }

  private initiateHandshake(): void {
    this.webSocket.next({
      op: 2,
      d: { subscribe_to_ids: [environment.discord.userId] },
    });

    this.heartbeat$.pipe(takeUntil(this.stop$)).subscribe(() => this.webSocket.next({ op: 3 }));
  }

  private mapStringArrayToData(data: any): ApiResponse {
    return data.t === 'INIT_STATE' ? (data.d[environment.discord.userId] as ApiResponse) : (data.d as ApiResponse);
  }

  getUserData(): Observable<ApiResponse | null> {
    return this.dataSubject$.asObservable();
  }

  convertMpUrlToImgUrl(mpUrl: string): string | null {
    const match = mpUrl.match(/\/https?\/(.+)$/);
    if (!match) return null;

    const url = 'https://' + match[1];

    return decodeURIComponent(url);
  }

  sendMessage(message: any): void {
    this.webSocket.next(message);
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
    this.dataSubject$.complete();
    this.webSocket.complete();
  }
}
