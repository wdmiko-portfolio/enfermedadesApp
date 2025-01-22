import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard} from './auth.guard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full',
    
  },
  {
    path: 'login',
loadComponent:() =>
  import('./Auth/login/login.component').then((m) => m.LoginComponent), 
},
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes), 
    canActivate: [authGuard],  
  },

  {
    path: '**',
    redirectTo: '/login', 
  }
];