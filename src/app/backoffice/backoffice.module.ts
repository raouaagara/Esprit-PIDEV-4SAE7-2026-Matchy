import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BackofficeRoutingModule } from "./backoffice-routing.module";

// Layout
import { BoLayoutComponent } from "./layout/bo-layout.component";
import { BoSidebarComponent } from "./layout/bo-sidebar/bo-sidebar.component";
import { BoHeaderComponent } from "./layout/bo-header/bo-header.component";
import { BoLoginComponent } from "./layout/bo-login/bo-login.component";

// Shared
import { StatCardComponent } from "./shared/stat-card/stat-card.component";

// Pages
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { ProjectsComponent } from "./projects/projects.component";
import { BoEventsComponent } from "./events/events.component";
import { BoProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { BoProjectsMilestonesComponent } from "./projects-milestones/projects-milestones.component";
import { BoSubscriptionManagementComponent } from "./subscription-management/subscription-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { AssessmentManagementComponent } from "./assessment-management/assessment-management.component";
import { CertificationManagementComponent } from "./certification-management/certification-management.component";
import { ContentManagementComponent } from "./content-management/content-management.component";

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
    BoEventsComponent,
    BoProfileSettingsComponent,
    BoProjectsMilestonesComponent,
    BoSubscriptionManagementComponent,
    UserManagementComponent,
    ContentManagementComponent,
    AssessmentManagementComponent,
    CertificationManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
  ],
})
export class BackofficeModule {}
