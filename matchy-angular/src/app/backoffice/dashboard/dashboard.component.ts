import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../frontoffice/services/dashboard.service";
import { DarkModeService } from "../../frontoffice/services/dark-mode.service";
import { AuthService } from "../../frontoffice/services/auth.service";
import { DashboardStats, User } from "../../frontoffice/models/models";

interface StatItem {
  icon: string;
  iconBg: string;
  borderColor: string;
  label: string;
  subLabel: string;
  value: number | string;
  suffix?: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  stats: StatItem[] = [];
  recentUsers: User[] = [];
  topFreelancers: User[] = [];
  isLoading = true;
  userSearch = "";
  freelancerSearch = "";
  isDarkMode = false;
  currentUser: User | null = null;

  constructor(
    private dashboardService: DashboardService,
    public darkModeService: DarkModeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.loadData();
    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  loadData(): void {
    this.dashboardService.getStats().subscribe((data: DashboardStats) => {
      this.buildStats(data);
      this.isLoading = false;
    });
    this.dashboardService
      .getRecentUsers()
      .subscribe((u: User[]) => (this.recentUsers = u));
    this.dashboardService
      .getTopFreelancers()
      .subscribe((f: User[]) => (this.topFreelancers = f));
  }

  private buildStats(s: DashboardStats): void {
    this.stats = [
      {
        icon: "👥",
        iconBg: "#4f6ef7",
        borderColor: "#4f6ef7",
        label: "Total Users",
        subLabel: "registered accounts",
        value: s.totalUsers,
      },
      {
        icon: "🧑‍💼",
        iconBg: "#06b6d4",
        borderColor: "#06b6d4",
        label: "Clients",
        subLabel: "project owners",
        value: s.totalClients,
      },
      {
        icon: "🎨",
        iconBg: "#a855f7",
        borderColor: "#a855f7",
        label: "Freelancers",
        subLabel: "active providers",
        value: s.totalFreelancers,
      },
      {
        icon: "✅",
        iconBg: "#22c55e",
        borderColor: "#22c55e",
        label: "Verified",
        subLabel: "trusted badge",
        value: s.verifiedFreelancers,
      },
      {
        icon: "📂",
        iconBg: "#f59e0b",
        borderColor: "#f59e0b",
        label: "Open Projects",
        subLabel: "seeking freelancers",
        value: s.openProjects,
      },
      {
        icon: "🔲",
        iconBg: "#64748b",
        borderColor: "#64748b",
        label: "Completed Projects",
        subLabel: "successfully delivered",
        value: s.completedProjects,
      },
      {
        icon: "📊",
        iconBg: "#ef4444",
        borderColor: "#ef4444",
        label: "Total Projects",
        subLabel: "on the platform",
        value: s.totalProjects,
      },
      {
        icon: "⭐",
        iconBg: "#eab308",
        borderColor: "#eab308",
        label: "Verification Rate",
        subLabel: "platform quality",
        value: s.verificationRate,
        suffix: "%",
      },
    ];
  }
}
