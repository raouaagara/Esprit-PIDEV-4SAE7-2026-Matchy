import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-freelancer-dashboard',
  templateUrl: './freelancer-dashboard.component.html',
  styleUrls: ['./freelancer-dashboard.component.scss']
})
export class FreelancerDashboardComponent implements OnInit {
  currentUser: any;
  stats = {
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    activeProjects: 0
  };
  recentApplications: any[] = [];
  loading = true;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadDashboardData();
  }

  loadDashboardData() {
    if (!this.currentUser || !this.currentUser.id) {
      this.loading = false;
      return;
    }

    this.applicationService.getFreelancerApplications(this.currentUser.id).subscribe({
      next: (applications) => {
        this.stats.totalApplications = applications.length;
        this.stats.pendingApplications = applications.filter(a => a.status === 'PENDING').length;
        this.stats.acceptedApplications = applications.filter(a => a.status === 'ACCEPTED').length;
        this.stats.activeProjects = applications.filter(a => a.status === 'ACCEPTED').length;
        
        // Get 5 most recent applications
        this.recentApplications = applications
          .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
          .slice(0, 5);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.loading = false;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'warning',
      'INTERVIEW_SCHEDULED': 'info',
      'INTERVIEW_CONFIRMED': 'primary',
      'ACCEPTED': 'success',
      'REJECTED': 'danger'
    };
    return statusMap[status] || 'secondary';
  }
}
