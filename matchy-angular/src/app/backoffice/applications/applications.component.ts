import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../frontoffice/services/application.service';
import { Application } from '../../frontoffice/models/models';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = 'ALL';

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        this.filteredApplications = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading applications:', err);
        this.loading = false;
      }
    });
  }

  filterApplications() {
    this.filteredApplications = this.applications.filter(app => {
      const matchesSearch = !this.searchTerm || 
        app.freelancerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.projectTitle?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'ALL' || app.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  viewProject(projectId: number) {
    this.router.navigate(['/backoffice/projects', projectId]);
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'status-pending',
      'ACCEPTED': 'status-accepted',
      'REJECTED': 'status-rejected',
      'INTERVIEW_SCHEDULED': 'status-interview'
    };
    return statusMap[status] || 'status-default';
  }
}
