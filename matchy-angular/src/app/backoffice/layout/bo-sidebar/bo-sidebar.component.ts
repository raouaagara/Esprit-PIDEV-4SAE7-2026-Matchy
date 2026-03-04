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
    { label: "Projects", icon: "📁", route: "/backoffice/projects" },
    { label: "Applications", icon: "📋", route: "/backoffice/applications" },
    { label: "Interviews", icon: "📅", route: "/backoffice/interviews" },
    { label: "Submissions", icon: "📤", route: "/backoffice/submissions" },
    { label: "Reviews", icon: "⭐", route: "/backoffice/reviews" },
    { label: "Messages", icon: "💬", route: "/backoffice/messages" },
    { label: "Contracts", icon: "📄", route: "/backoffice/contracts" },
    { label: "Users", icon: "👥", route: "/backoffice/users" },
    {
      label: "Profile Settings",
      icon: "⚙️",
      route: "/backoffice/profile-settings",
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
    this.router.navigate(["/"]).then(() => {
      // Reload to ensure clean state
      window.location.reload();
    });
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
