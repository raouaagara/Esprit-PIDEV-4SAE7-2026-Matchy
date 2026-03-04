import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';

// Layout
import { BoLayoutComponent } from './layout/bo-layout.component';
import { BoSidebarComponent } from './layout/bo-sidebar/bo-sidebar.component';
import { BoHeaderComponent } from './layout/bo-header/bo-header.component';
import { BoLoginComponent } from './layout/bo-login/bo-login.component';

// Shared
import { StatCardComponent } from './shared/stat-card/stat-card.component';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { BoCoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { BoEventsComponent } from './events/events.component';
import { CreateEventModalComponent } from './events/create-event-modal/create-event-modal.component';
import { ViewEventModalComponent } from './events/view-event-modal/view-event-modal.component';
import { EditEventModalComponent } from './events/edit-event-modal/edit-event-modal.component';
import { BoProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { BoProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { BoSubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RegistrationsComponent } from './registrations/registrations.component';

@NgModule({
  declarations: [
    BoLayoutComponent,
    BoSidebarComponent,
    BoHeaderComponent,
    BoLoginComponent,
    StatCardComponent,
    DashboardComponent,
    UsersComponent,
    ProjectsComponent,
    BoCoursesResourcesComponent,
    BoEventsComponent,
    CreateEventModalComponent,
    ViewEventModalComponent,
    EditEventModalComponent,
    BoProfileSettingsComponent,
    BoProjectsMilestonesComponent,
    BoSubscriptionManagementComponent,
    UserManagementComponent,
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule {}
