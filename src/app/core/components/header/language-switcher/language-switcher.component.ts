import { Component, inject, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'dqvid-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent implements OnInit {
  private languageService = inject(LanguageService);
  selectedLanguage: string = this.languageService.language;
  currLanguage = "";
  showDropdown = false;

  ngOnInit(): void {
    this.currLanguage = this.currentLanguage;
  }

  get currentLanguage(): string {
    const language = this.languageService.language;
    this.selectedLanguage = language;
    const parts = language.split('-');
    return parts.length > 1 ? parts[1] : '';
  }

  get languages(): { code: string; image: string }[] {
    return this.languageService.supportedLanguages.map(lang => ({
      code: lang,
      image: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${this.getLanguageCode(lang)}.svg`
    }));
  }

  setLanguage(language: string) {
    this.languageService.language = language;
    this.selectedLanguage = language;
  }

  getLanguageCode(language: string): string {
    const parts = language.split('-');
    return parts.length > 1 ? parts[1] : '';
  }

  getLanguageImage(language: string): string {
    const code = this.getLanguageCode(language);
    return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;
  }
}
