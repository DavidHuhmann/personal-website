import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { ColorPreset } from './shared/styling/color.preset';
import { ThemeService } from './core/services/theme/theme.service';
import { DiscordService } from './core/services/discord/discord.service';

function AppConfigServiceFactory(themeService: ThemeService) {
    return () => themeService.load();
}

export function initializeApp(discordService: DiscordService) {
  return () => discordService.start();
}

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ColorPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'de',
    }),
    ThemeService,
    provideAppInitializer(() => {
      const initFn = AppConfigServiceFactory(inject(ThemeService));
      return initFn();
    }),
    provideAppInitializer(() => {
      const initFn = initializeApp(inject(DiscordService));
      return initFn();
    }),
  ],
};
