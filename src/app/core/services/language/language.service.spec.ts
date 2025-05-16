import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

const defaultLanguage = 'en-US';
const supportedLanguages = ['eo', 'en-US', 'fr-FR'];

class MockTranslateService {
  currentLang = '';
  onLangChange = new Subject();

  use(language: string) {
    this.currentLang = language;
    this.onLangChange.next({
      lang: this.currentLang,
      translations: {},
    });
  }

  getBrowserCultureLang() {
    return 'en-US';
  }
}

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;
  let onLangChangeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService, { provide: TranslateService, useClass: MockTranslateService }],
    });
    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);

    // Create spies
    onLangChangeSpy = jasmine.createSpy('onLangChangeSpy');
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      onLangChangeSpy(event.lang);
    });
    spyOn(translateService, 'use').and.callThrough();
  });

  afterEach(() => {
    // Cleanup
    localStorage.removeItem('language');
  });

  describe('init', () => {
    it('should init with default language', () => {
      // Act
      service.init(defaultLanguage, supportedLanguages);

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
    });

    it('should init with save language', () => {
      // Arrange
      const savedLanguage = 'eo';
      localStorage.setItem('language', savedLanguage);

      // Act
      service.init(defaultLanguage, supportedLanguages);

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(savedLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(savedLanguage);
    });
  });

  describe('set language', () => {
    it('should change current language', () => {
      // Arrange
      const newLanguage = 'eo';
      service.init(defaultLanguage, supportedLanguages);

      // Act
      service.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(newLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(newLanguage);
    });

    it('should change current language without a region match', () => {
      // Arrange
      const newLanguage = 'fr-CA';
      service.init(defaultLanguage, supportedLanguages);

      // Act
      service.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith('fr-FR');
      expect(onLangChangeSpy).toHaveBeenCalledWith('fr-FR');
    });

    it('should change current language to default if unsupported', () => {
      // Arrange
      const newLanguage = 'es';
      service.init(defaultLanguage, supportedLanguages);

      // Act
      service.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
    });
  });

  describe('get language', () => {
    it('should return current language', () => {
      // Arrange
      service.init(defaultLanguage, supportedLanguages);

      // Act
      const currentLanguage = service.language;

      // Assert
      expect(currentLanguage).toEqual(defaultLanguage);
    });
  });
});
