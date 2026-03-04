import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';
import { Project, Application } from '../models/models';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  activeProjects: any[] = [];
  loading = false;
  error = '';

  constructor(
    private projectService: ProjectService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadActiveProjects();
  }

  loadActiveProjects() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.error = 'User not authenticated';
      return;
    }

    this.loading = true;
    this.error = '';

    // Get all accepted applications for this freelancer
    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        // Filter only accepted applications
        const acceptedApps = applications.filter(app => app.status === 'ACCEPTED');
        
        // Transform to project format with milestone info
        this.activeProjects = acceptedApps.map(app => ({
          id: app.projectId,
          title: app.projectTitle || 'Project',
          description: '',
          milestone: {
            id: app.milestoneId,
            title: app.milestoneTitle,
            budget: app.proposedBudget,
            status: 'IN_PROGRESS'
          },
          application: app,
          status: 'IN_PROGRESS'
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading active projects:', err);
        this.error = 'Failed to load active projects';
        this.loading = false;
      }
    });
  }

  viewProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  submitWork(projectId: number, milestoneId: number) {
    this.router.navigate(['/submit-work'], { 
      queryParams: { projectId, milestoneId } 
    });
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'OPEN': 'success',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'secondary',
      'CANCELLED': 'danger'
    };
    return statusMap[status] || 'secondary';
  }

  getProgressPercentage(milestone: any): number {
    // Simple calculation based on milestone status
    if (!milestone) return 0;
    if (milestone.status === 'COMPLETED') return 100;
    if (milestone.status === 'IN_PROGRESS') return 50;
    return 0;
  }
}
