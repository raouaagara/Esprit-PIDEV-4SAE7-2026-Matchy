import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoLayoutComponent } from './layout/fo-layout.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { EventsComponent } from './events/events.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';

const routes: Routes = [
  // Register page standalone (sans navbar/footer)
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: FoLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses-resources', component: CoursesResourcesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'profile-settings', component: ProfileSettingsComponent },
      { path: 'projects-milestones', component: ProjectsMilestonesComponent },
      { path: 'subscription-management', component: SubscriptionManagementComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule {}
