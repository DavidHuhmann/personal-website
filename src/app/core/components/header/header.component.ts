import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { LanguageSwitcherComponent } from "./language-switcher/language-switcher.component";
import { ThemeService } from '../../services/theme/theme.service';
import { ThemeMode } from '../../services/theme/entities/theme-mode';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoon, heroLightBulb } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'dqvid-header',
  imports: [RouterLink, CommonModule, NgOptimizedImage, TranslatePipe, LanguageSwitcherComponent, NgIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [provideIcons({ heroMoon, heroLightBulb })],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  protected readonly ThemeMode = ThemeMode;

  scrollY = window.scrollY;
  sidebarOpen = false;
  currentTheme = this.themeService.getCurrentTheme();

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.sidebarOpen = false;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY = window.scrollY;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 1280) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }
}
