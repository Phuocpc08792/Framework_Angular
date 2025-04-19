import { Routes } from '@angular/router';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import { FullComponent } from './Admin/layouts/full/full.component';
import { MainClientComponent } from './Client/main-client/main-client.component';

export const routes: Routes = [
  // Giao diện Client
  {
    path: '',
    component: MainClientComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./Client/pages/Home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./Client/pages/Contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      
      {
        path: 'blog',
        loadComponent: () =>
          import('./Client/pages/blog/blog.component').then(
            (m) => m.BlogComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./Client/pages/introduce/introduce.component').then(
            (m) => m.IntroduceComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Client/pages/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
    ],
  },

  // Giao diện Admin
  {
    path: 'Admin',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Admin/pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./Admin/pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./Admin/pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },

  // Authentication
  {
    path: 'auth',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Auth/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },

  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];