import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoLayoutComponent } from './layout/fo-layout.component';
import { HomeComponent } from './home/home.component';
import { CoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { EventsComponent } from './events/events.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { BrowseProjectsComponent } from './browse-projects/browse-projects.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { FreelancerDashboardComponent } from './freelancer-dashboard/freelancer-dashboard.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SubmitWorkComponent } from './submit-work/submit-work.component';
import { MessagesComponent } from './messages/messages.component';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [
  {
    path: '',
    component: FoLayoutComponent,
    children: [
      { 
        path: '', 
        component: HomeComponent,
        pathMatch: 'full'
      },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'dashboard', component: FreelancerDashboardComponent },
      { path: 'freelancer-dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'my-applications', component: MyApplicationsComponent },
      { path: 'my-projects', component: MyProjectsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'contracts', component: ContractsComponent },
      { path: 'submit-work', component: SubmitWorkComponent },
      { path: 'courses-resources', component: CoursesResourcesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'profile-settings', component: ProfileSettingsComponent },
      { path: 'projects-milestones', component: ProjectsMilestonesComponent },
      { path: 'subscription-management', component: SubscriptionManagementComponent },
      { path: 'projects/:id', component: ProjectViewComponent },
      { path: 'projects', component: BrowseProjectsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule {}
