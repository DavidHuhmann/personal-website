import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class RouteDataResolver implements Resolve<{ title: string; description: string }> {
  private translateService = inject(TranslateService);

  resolve(route: ActivatedRouteSnapshot): Promise<{ title: string; description: string }> {
    const titleKey = route.data['titleKey'] || 'app.routes.default.title';
    const descriptionKey = route.data['descriptionKey'] || 'app.routes.default.description';

    return Promise.resolve({
      title: this.translateService.instant(titleKey),
      description: this.translateService.instant(descriptionKey),
    });
  }
}
