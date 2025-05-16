import { Routes } from '@angular/router';
import { RouteDataResolver } from './core/resolvers/route-data.resolver';

export const routes: Routes = [
  {
    path: '',
    resolve: { routeData: RouteDataResolver },
    data: {
      titleKey: 'app.routes.home.title',
      descriptionKey: 'app.routes.home.description',
    },
    loadComponent: () => import('./core/components/homepage/homepage.component').then(m => m.HomepageComponent),
  },
  {
    path: 'impressum',
    loadComponent: () => import('./core/components/imprint/imprint.component').then(m => m.ImprintComponent),
  },
  {
    path: 'error',
    resolve: { routeData: RouteDataResolver },
    data: {
      titleKey: 'app.routes.404.title',
      descriptionKey: 'app.routes.404.description',
    },
    loadComponent: () => import('./core/components/error-404/error-404.component').then(m => m.Error404Component),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
