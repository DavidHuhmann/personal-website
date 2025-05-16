import { inject, Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

import deDE from '../../../../../public/i18n/de.json';
import enUS from '../../../../../public/i18n/en.json';

const languageKey = 'language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translateService = inject(TranslateService);
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;
  private readonly languageSubject: BehaviorSubject<string>;

  constructor() {
    this.languageSubject = new BehaviorSubject<string>(localStorage.getItem(languageKey) || environment.defaultLanguage || this.translateService.getBrowserCultureLang() || '');

    // Embed languages to avoid extra HTTP requests
    this.translateService.setTranslation('de-DE', deDE);
    this.translateService.setTranslation('en-US', enUS);
  }

  /**
   * Returns the current language as an observable.
   * @return Observable of the current language.
   */
  get languageObservable(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    let newLanguage = language || localStorage.getItem(languageKey) || environment.defaultLanguage || this.translateService.getBrowserCultureLang() || '';
    let isSupportedLanguage = this.supportedLanguages.includes(newLanguage);

    if (language !== this.languageSubject.value) {
      this.languageSubject.next(newLanguage);
    }

    // If no exact match is found, search without the region
    if (newLanguage && !isSupportedLanguage) {
      if (typeof newLanguage === 'object' && newLanguage !== null && 'code' in newLanguage) {
        newLanguage = (newLanguage as { code: string }).code;
      }
      newLanguage = newLanguage.split('-')[0];
      newLanguage = this.supportedLanguages.find((supportedLanguage) => supportedLanguage.startsWith(newLanguage)) || '';
      isSupportedLanguage = Boolean(newLanguage);
    }

    // Fallback if language is not supported
    if (!newLanguage || !isSupportedLanguage) {
      newLanguage = this.defaultLanguage;
    }

    language = newLanguage;

    console.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    console.debug(`Initializing with default language: ${defaultLanguage}`);
    this.language = '';

    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
    });
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
