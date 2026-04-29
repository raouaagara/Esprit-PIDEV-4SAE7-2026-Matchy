import { Routes } from '@angular/router';
import { authGuard, organizerGuard, clientGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'client',
    canActivate: [authGuard, clientGuard],
    loadChildren: () => import('./features/client/client.routes').then(m => m.clientRoutes)
  },
  {
    path: 'organizer',
    canActivate: [authGuard, organizerGuard],
    loadChildren: () => import('./features/organizer/organizer.routes').then(m => m.organizerRoutes)
  },
  {
    path: 'meet/:roomId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/meet/meet-room.component').then(m => m.MeetRoomComponent)
  },
  { path: '**', redirectTo: '/auth/login' }
];
