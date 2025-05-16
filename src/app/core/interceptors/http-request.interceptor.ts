import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private spinner = inject(NgxSpinnerService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show(undefined, {
      type: "ball-atom",
      bdColor: "rgba(0,0,0,0.8)",
      color: "#fff",
      size: "default",
    });

    return next.handle(req).pipe(
      map((event: HttpEvent<unknown>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 200);
      })
    );
  }
}
