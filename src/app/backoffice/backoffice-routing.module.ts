import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoLayoutComponent } from "./layout/bo-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { ProjectsComponent } from "./projects/projects.component";
import { BoLoginComponent } from "./layout/bo-login/bo-login.component";
import { ContentManagementComponent } from "./content-management/content-management.component";
import { BoEventsComponent } from "./events/events.component";
import { CertificationManagementComponent } from "./certification-management/certification-management.component";
import { AssessmentManagementComponent } from "./assessment-management/assessment-management.component";
import { BoProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { BoProjectsMilestonesComponent } from "./projects-milestones/projects-milestones.component";
import { BoSubscriptionManagementComponent } from "./subscription-management/subscription-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { AuthGuard as AdminGuard } from "../frontoffice/guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: BoLoginComponent,
  },
  {
    path: "",
    component: BoLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      // use the full-featured user-management component for the users path
      { path: "users", component: UserManagementComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "content-management", component: ContentManagementComponent },
      {
        path: "certification-management",
        component: CertificationManagementComponent,
      },
      {
        path: "assessment-management",
        component: AssessmentManagementComponent,
      },
      { path: "events", component: BoEventsComponent },
      { path: "profile-settings", component: BoProfileSettingsComponent },
      { path: "projects-milestones", component: BoProjectsMilestonesComponent },
      {
        path: "subscription-management",
        component: BoSubscriptionManagementComponent,
      },
      // redirect old route for backwards compatibility
      { path: "user-management", redirectTo: "users", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
