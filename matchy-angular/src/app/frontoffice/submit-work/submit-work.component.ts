import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { SubmissionService } from '../services/submission.service';
import { AuthService } from '../services/auth.service';
import { Submission } from '../models/models';

@Component({
  selector: 'app-submit-work',
  templateUrl: './submit-work.component.html',
  styleUrls: ['./submit-work.component.scss']
})
export class SubmitWorkComponent implements OnInit {
  activeProjects: any[] = [];
  milestones: any[] = [];
  
  selectedProjectId: any = '';
  selectedMilestoneId: any = '';
  workDescription = '';
  fileUrl = '';
  notes = '';
  
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private submissionService: SubmissionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadActiveProjects();
    
    // Check for query params (if coming from My Projects)
    this.route.queryParams.subscribe(params => {
      if (params['projectId']) {
        this.selectedProjectId = params['projectId'];
        this.onProjectChange();
      }
      if (params['milestoneId']) {
        this.selectedMilestoneId = params['milestoneId'];
      }
    });
  }

  loadActiveProjects() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.errorMessage = 'User not authenticated';
      return;
    }

    this.applicationService.getFreelancerApplications(currentUser.id).subscribe({
      next: (applications) => {
        const acceptedApps = applications.filter(app => app.status === 'ACCEPTED');
        
        this.activeProjects = acceptedApps.map(app => ({
          id: app.projectId,
          title: app.projectTitle || 'Project',
          milestones: [{
            id: app.milestoneId,
            title: app.milestoneTitle,
            budget: app.proposedBudget
          }]
        }));
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.errorMessage = 'Failed to load projects';
      }
    });
  }

  onProjectChange() {
    const project = this.activeProjects.find(p => p.id == this.selectedProjectId);
    this.milestones = project ? project.milestones : [];
    this.selectedMilestoneId = '';
  }

  submitWork() {
    if (!this.selectedMilestoneId || !this.workDescription || !this.fileUrl) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) {
      this.errorMessage = 'User not authenticated';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const submissionData = {
      milestoneId: Number(this.selectedMilestoneId),
      freelancerId: currentUser.id,
      title: 'Work Submission',
      description: this.workDescription,
      attachmentUrl: this.fileUrl
    };

    this.submissionService.submitWork(submissionData).subscribe({
      next: (response: Submission) => {
        this.successMessage = 'Work submitted successfully! The client will review it soon.';
        this.submitting = false;
        
        // Reset form
        setTimeout(() => {
          this.router.navigate(['/my-projects']);
        }, 2000);
      },
      error: (err: any) => {
        console.error('Error submitting work:', err);
        this.errorMessage = err.error?.error || 'Failed to submit work';
        this.submitting = false;
      }
    });
  }
}
