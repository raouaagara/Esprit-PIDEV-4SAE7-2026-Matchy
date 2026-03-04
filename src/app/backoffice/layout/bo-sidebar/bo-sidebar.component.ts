import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../frontoffice/services/auth.service";

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: "app-bo-sidebar",
  templateUrl: "./bo-sidebar.component.html",
  styleUrls: ["./bo-sidebar.component.scss"],
})
export class BoSidebarComponent {
  navItems: NavItem[] = [
    { label: "Dashboard", icon: "📊", route: "/backoffice/dashboard" },
    { label: "Users", icon: "👥", route: "/backoffice/users" },
    { label: "Projects", icon: "📁", route: "/backoffice/projects" },
    { label: "Content", icon: "📄", route: "/backoffice/content-management" },
    {
      label: "Certifications",
      icon: "🏆",
      route: "/backoffice/certification-management",
    },
    {
      label: "Assessments",
      icon: "📝",
      route: "/backoffice/assessment-management",
    },
    { label: "Events", icon: "📅", route: "/backoffice/events" },
    {
      label: "Profile Settings",
      icon: "⚙️",
      route: "/backoffice/profile-settings",
    },
    {
      label: "Milestones",
      icon: "🎯",
      route: "/backoffice/projects-milestones",
    },
    {
      label: "Subscriptions",
      icon: "💳",
      route: "/backoffice/subscription-management",
    },
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }
}
