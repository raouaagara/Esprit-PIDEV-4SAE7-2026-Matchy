import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('/api/auth/')) {
        if (auth.isTokenExpired() || !auth.token) {
          auth.logout();
          router.navigate(['/auth/login']);
        }
      } else if (err.status === 0) {
        console.error('Network error:', err);
      }
      return throwError(() => err);
    })
  );
};