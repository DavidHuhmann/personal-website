import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  TranslatePipe,
    TranslateService
} from "@ngx-translate/core";
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map, merge } from 'rxjs';
import { LanguageService } from './core/services/language/language.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'dqvid-root',
  imports: [RouterOutlet, NgxSpinnerModule, HeaderComponent, FooterComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private titleService = inject(Title);
	private activatedRoute = inject(ActivatedRoute);
	private metaService = inject(Meta);
	private languageService = inject(LanguageService);
	private translateService = inject(TranslateService);

	private defaultTitle = "";
	private defaultDescription = "";

  constructor() {
    this.translate.addLangs(['de', 'en']);
  }

	ngOnInit() {
		this.languageService.init(environment.defaultLanguage, environment.supportedLanguages);
		this.defaultTitle = this.translateService.instant('app.routes.default.title');
		this.defaultDescription = this.translateService.instant('app.routes.default.description');
    /** Used for SEO */
		this.metaService.addTags([
			{
				name: "description",
				content: this.defaultDescription,
			},
			{
				property: "og:title",
				content: this.defaultTitle,
			},
			{
				property: "og:description",
				content: this.defaultDescription,
			},
			{
				property: "twitter:title",
				content: this.defaultTitle,
			},
			{
				property: "twitter:description",
				content: this.defaultDescription,
			},
		]);

		const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

		merge(this.translateService.onLangChange, onNavigationEnd)
		.pipe(map(() => this.getMetaData(this.activatedRoute)))
		.subscribe(({ title, description }) => {
			this.titleService.setTitle(title);
			this.metaService.updateTag({ property: "og:title", content: title });
			this.metaService.updateTag({ property: "twitter:title", content: title });
			this.metaService.updateTag({ name: "description", content: description });
			this.metaService.updateTag({ property: "og:description", content: description });
			this.metaService.updateTag({ property: "twitter:description", content: description });
		})
	}

  ngOnDestroy() {
    this.languageService.destroy();
  }

  /** Used for SEO */
  private getMetaData(route: ActivatedRoute): { title: string; description: string } {
		let currentRoute = route;
		while (currentRoute.firstChild) {
			currentRoute = currentRoute.firstChild;
		}

		const routeData = currentRoute.snapshot.data['routeData'] || {};
		const title = routeData.title ?? this.defaultTitle;
		const description = routeData.description ?? this.defaultDescription;

		return { title, description };
	}
}
