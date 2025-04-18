import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: 'Dashboard',
    component: StarterComponent,
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/Admin/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
];