import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token='';
  constructor(private router: Router) { }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');  // Elimina el estado de sesión
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';  // Retorna true si el usuario está logueado
  }
}
