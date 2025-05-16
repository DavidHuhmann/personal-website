import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeMode } from './entities/theme-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string | null>(localStorage.getItem('theme'));
  public theme$: Observable<string | null> = this.themeSubject.asObservable();

  getPreferredScheme = () => (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light');

  public load() {
    if (!localStorage.getItem('theme')) {
      if (this.getPreferredScheme() === 'dark') {
        this.setTheme(ThemeMode.Dark);
      } else {
        this.setTheme(ThemeMode.Light);
      }
    } else {
      this.setTheme(localStorage.getItem('theme'));
    }
  }

  public setTheme(mode: string | null | ThemeMode) {
    switch (mode) {
      case ThemeMode.Dark:
        document.body.dataset["theme"] = 'dark';
        localStorage.setItem('theme', ThemeMode.Dark);
        this.themeSubject.next(ThemeMode.Dark);
        break;
      case ThemeMode.Light:
        document.body.dataset['theme'] = '';
        localStorage.setItem('theme', ThemeMode.Light);
        this.themeSubject.next(ThemeMode.Light);
        break;
    }
  }

  public toggleTheme() {
    const mode = this.getCurrentTheme();
    this.setTheme(mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light);
  }

  public getCurrentTheme() {
    return localStorage.getItem('theme');
  }
}
