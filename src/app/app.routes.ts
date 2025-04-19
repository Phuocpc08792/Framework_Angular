import { Routes } from '@angular/router';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import { FullComponent } from './Admin/layouts/full/full.component';
import { MainClientComponent } from './Client/main-client/main-client.component';

export const routes: Routes = [
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
        path: 'cart',
        loadComponent: () =>
          import('./Client/pages/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./Client/pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./Client/pages/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'order/:id',
        loadComponent: () =>
          import('./Client/pages/order-detail/order-detail.component').then(
            (m) => m.OrderDetailComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
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
  {
    path: '**',
    redirectTo: '',
  },
];