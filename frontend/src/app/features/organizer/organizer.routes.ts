import { Routes } from '@angular/router';

export const organizerRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/org-projects.component').then(m => m.OrgProjectsComponent)
  },
  {
    path: 'messages',
    loadComponent: () => import('./messages/messages.component').then(m => m.MessagesComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./freelancer-chat/freelancer-chat.component').then(m => m.FreelancerChatComponent)
  },
    {
    path: 'agenda',
  loadComponent: () => import('./agenda/agenda.component')
    .then(m => m.AgendaComponent)
  }
];
