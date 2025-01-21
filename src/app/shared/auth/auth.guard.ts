import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isAuthenticated()) {
    return true; // Autorise l’accès si l’utilisateur est authentifié
  } else {
    router.navigate(['/login']); // Redirige vers la page de connexion
    return false; // Bloque l’accès si non authentifié
  }
};
