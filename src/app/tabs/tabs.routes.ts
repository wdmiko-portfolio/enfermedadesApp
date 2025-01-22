import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
        canActivate: [authGuard],  


      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
        canActivate: [authGuard],  



      },

      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
        canActivate: [authGuard],  



      },  {
        path: '',
        redirectTo: '/tabs/tab1', // Redirigir al primer tab si el path es vacío
        pathMatch: 'full',

      },
    
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
