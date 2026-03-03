import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClLayoutComponent } from './layout/cl-layout.component';
import { ClDashboardComponent } from './dashboard/dashboard.component';
import { ClProjectsComponent } from './projects/projects.component';
import { ClProposalsComponent } from './proposals/proposals.component';
import { NotificationsPageComponent } from './notifications/notifications.component';
import { ClProfileComponent } from './profile/profile.component';
import { ClientGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClLayoutComponent,
    canActivate: [ClientGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ClDashboardComponent },
      { path: 'projects', component: ClProjectsComponent },
      { path: 'proposals', component: ClProposalsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'profile', component: ClProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
