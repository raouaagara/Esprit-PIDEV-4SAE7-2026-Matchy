import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoLayoutComponent } from "./layout/fo-layout.component";
import { HomeComponent } from "./home/home.component";
import { EventsComponent } from "./events/events.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProjectsMilestonesComponent } from "./projects-milestones/projects-milestones.component";
import { SubscriptionManagementComponent } from "./subscription-management/subscription-management.component";
import { ContentListComponent } from "./content-list/content-list.component";
import { ContentDetailComponent } from "./content-detail/content-detail.component";
import { AssessmentTestComponent } from "./assessment-test/assessment-test.component";
import { FavoritesComponent } from "./favorites/favorites.component";

const routes: Routes = [
  {
    path: "",
    component: FoLayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "content-list", component: ContentListComponent },
      { path: "content/:id", component: ContentDetailComponent },
      { path: "assessment/:contentId", component: AssessmentTestComponent },
      { path: "favorites", component: FavoritesComponent },
      { path: "events", component: EventsComponent },
      { path: "profile-settings", component: ProfileSettingsComponent },
      { path: "projects-milestones", component: ProjectsMilestonesComponent },
      {
        path: "subscription-management",
        component: SubscriptionManagementComponent,
      },
      { path: "home", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontofficeRoutingModule {}
