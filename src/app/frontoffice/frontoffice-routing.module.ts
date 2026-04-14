import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoLayoutComponent } from './layout/fo-layout.component';
import { HomeComponent } from './home/home.component';
import { CoursesResourcesComponent } from './courses-resources/courses-resources.component';
import { EventsComponent } from './events/events.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProjectsMilestonesComponent } from './projects-milestones/projects-milestones.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { SubscriptionAbonnementComponent } from './subscription-abonnement/subscription-abonnement.component';
import { SubscriptionPaymentComponent } from './subscription-payment/subscription-payment.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { AvailableProjectsComponent } from './available-projects/available-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { AiRecommendationsComponent } from './ai-recommendations/ai-recommendations.component';

const routes: Routes = [
  {
    path: '',
    component: FoLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'courses-resources', component: CoursesResourcesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'projects', component: AvailableProjectsComponent },
      { path: 'projects/:id', component: ProjectDetailsComponent },
      { path: 'my-applications', component: MyApplicationsComponent },
      { path: 'ai-recommendations', component: AiRecommendationsComponent },
      { path: 'profile-settings', component: ProfileSettingsComponent },
      { path: 'projects-milestones', component: ProjectsMilestonesComponent },
      { path: 'subscription-management', component: SubscriptionManagementComponent },
      { path: 'my-subscription', component: MySubscriptionComponent },
      { path: 'subscription-abonnement/:planId/:planName', component: SubscriptionAbonnementComponent },
      { path: 'subscription-payment/:subscriptionId', component: SubscriptionPaymentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule {}