import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

export const authGuard: CanActivateFn=(route,state) => {
const authService = inject(AuthService);
const router = inject(Router);

if(authService.isLoggedIn()){
  return true
}
else{
  router.navigateByUrl('/login')
  return false
}
};


