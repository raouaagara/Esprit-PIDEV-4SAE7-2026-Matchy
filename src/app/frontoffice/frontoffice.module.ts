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

// Pages
import { HomeComponent } from './home/home.component';
import { CoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { EventsComponent } from './events/events.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { RegistrationModalComponent } from './events/registration-modal/registration-modal.component';

@NgModule({
  declarations: [
    FoLayoutComponent,
    FoNavbarComponent,
    FoFooterComponent,
    HomeComponent,
    CoursesResourcesComponent,
    EventsComponent,
    ProfileSettingsComponent,
    ProjectsMilestonesComponent,
    SubscriptionManagementComponent,
    RegistrationModalComponent
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
