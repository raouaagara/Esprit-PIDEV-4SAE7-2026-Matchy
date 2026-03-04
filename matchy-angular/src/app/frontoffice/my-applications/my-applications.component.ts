import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';
import { Application } from '../models/models';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  loading = false;
  error = '';
  selectedStatus = 'ALL';

  statusOptions = [
    { value: 'ALL', label: 'All Applications' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'INTERVIEW_CONFIRMED', label: 'Interview Confirmed' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.error = 'User not authenticated';
      return;
    }

    this.loading = true;
    this.error = '';

    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        this.applications = applications;
        this.filteredApplications = [...applications];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading applications:', err);
        this.error = 'Failed to load applications';
        this.loading = false;
      }
    });
  }

  filterByStatus() {
    if (this.selectedStatus === 'ALL') {
      this.filteredApplications = [...this.applications];
    } else {
      this.filteredApplications = this.applications.filter(
        app => app.status === this.selectedStatus
      );
    }
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

  getStatusIcon(status: string): string {
    const iconMap: any = {
      'PENDING': '⏳',
      'INTERVIEW_SCHEDULED': '📅',
      'INTERVIEW_CONFIRMED': '✅',
      'ACCEPTED': '🎉',
      'REJECTED': '❌'
    };
    return iconMap[status] || '📋';
  }

  confirmInterview(applicationId: number) {
    if (!confirm('Confirm your attendance for this interview?')) {
      return;
    }

    this.applicationService.confirmInterview(applicationId).subscribe({
      next: () => {
        alert('Interview confirmed successfully!');
        this.loadApplications();
      },
      error: (err) => {
        console.error('Error confirming interview:', err);
        alert('Failed to confirm interview');
      }
    });
  }
}
