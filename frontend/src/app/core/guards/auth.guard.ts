import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn || auth.isTokenExpired()) {
    auth.logout();
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};

export const organizerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isOrganizer) {
    router.navigate(['/client']);
    return false;
  }
  return true;
};

export const clientGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isClient) {
    router.navigate(['/organizer']);
    return false;
  }
  return true;
};
