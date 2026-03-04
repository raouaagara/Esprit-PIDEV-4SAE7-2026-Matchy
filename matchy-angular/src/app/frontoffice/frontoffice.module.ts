import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { SharedModule } from '../shared/shared.module';

// Layout
import { FoLayoutComponent } from './layout/fo-layout.component';
import { FoNavbarComponent } from './layout/fo-navbar/fo-navbar.component';
import { FoFooterComponent } from './layout/fo-footer/fo-footer.component';
import { FoSidebarComponent } from './layout/fo-sidebar/fo-sidebar.component';

// Pages
import { HomeComponent } from './home/home.component';
import { CoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { EventsComponent } from './events/events.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { BrowseProjectsComponent } from './browse-projects/browse-projects.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { BrowseMilestonesComponent } from './browse-milestones/browse-milestones.component';
import { FreelancerDashboardComponent } from './freelancer-dashboard/freelancer-dashboard.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SubmitWorkComponent } from './submit-work/submit-work.component';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { MessagesComponent } from './messages/messages.component';
import { ContractsComponent } from './contracts/contracts.component';

@NgModule({
  declarations: [
    FoLayoutComponent,
    FoNavbarComponent,
    FoFooterComponent,
    FoSidebarComponent,
    HomeComponent,
    CoursesResourcesComponent,
    EventsComponent,
    ProfileSettingsComponent,
    ProjectsMilestonesComponent,
    SubscriptionManagementComponent,
    BrowseProjectsComponent,
    ProjectViewComponent,
    BrowseMilestonesComponent,
    FreelancerDashboardComponent,
    MyApplicationsComponent,
    MyProjectsComponent,
    SubmitWorkComponent,
    FilterPipe,
    MessagesComponent,
    ContractsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FrontofficeRoutingModule,
    SharedModule
  ]
})
export class FrontofficeModule {}
