import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { FrontofficeModule } from '../frontoffice/frontoffice.module';

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
import { BoProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { BoProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { BoSubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BoSubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { BoSubscriptionPayComponent } from './subscription-pay/subscription-pay.component';
import { BoSubscriptionDashboardComponent } from './subscription-dashboard/subscription-dashboard.component';
import { SubscriptionPlanComparisonComponent } from './subscription-plan/subscription-plan-comparison/subscription-plan-comparison.component';
import { CompanyProjectsComponent } from './company-projects/company-projects.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ProjectMilestonesManagerComponent } from './project-milestones-manager/project-milestones-manager.component';
import { ReviewApplicationsComponent } from './review-applications/review-applications.component';
import { BoNotificationsComponent } from './notifications/notifications.component';
import { BoHistoryComponent } from './history/history.component';
import { WorkspaceManagerComponent } from './workspace-manager/workspace-manager.component';

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
    BoProfileSettingsComponent,
    BoProjectsMilestonesComponent,
    BoSubscriptionManagementComponent,
    UserManagementComponent,
    BoSubscriptionPlanComponent,
    BoSubscriptionPayComponent,
    SubscriptionPlanComparisonComponent,
    BoSubscriptionDashboardComponent,
    CompanyProjectsComponent,
    FilterPipe,
    ProjectMilestonesManagerComponent,
    ReviewApplicationsComponent,
    BoNotificationsComponent,
    BoHistoryComponent,
    WorkspaceManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeRoutingModule,
    FrontofficeModule
  ]
})
export class BackofficeModule { }
