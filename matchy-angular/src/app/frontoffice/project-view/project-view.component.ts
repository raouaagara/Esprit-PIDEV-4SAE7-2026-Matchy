import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { MilestoneService } from '../services/milestone.service';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';
import { Project, Milestone, CreateApplicationRequest } from '../models/models';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectId!: number;
  project: Project | null = null;
  milestones: Milestone[] = [];
  loading = false;
  error = '';
  
  // Application Modal
  showApplicationModal = false;
  selectedMilestone: Milestone | null = null;
  applicationFormData: any = {
    coverLetter: '',
    proposedBudget: null
  };
  submitting = false;
  
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private milestoneService: MilestoneService,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('ProjectViewComponent initialized');
    this.currentUser = this.authService.currentUser;
    console.log('Current user in project view:', this.currentUser);
    
    if (!this.currentUser) {
      this.error = 'Please login to view projects';
      return;
    }
    
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID:', this.projectId);
    this.loadProjectDetails();
  }

  loadProjectDetails() {
    this.loading = true;
    this.error = '';
    
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadMilestones();
      },
      error: (err) => {
        this.error = 'Failed to load project details';
        this.loading = false;
      }
    });
  }

  loadMilestones() {
    this.milestoneService.getProjectMilestones(this.projectId).subscribe({
      next: (milestones) => {
        this.milestones = milestones;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load milestones', err);
        this.loading = false;
      }
    });
  }

  openApplicationModal(milestone: Milestone) {
    if (this.currentUser.userType !== 'FREELANCER') {
      alert('Only freelancers can apply to milestones');
      return;
    }
    
    this.selectedMilestone = milestone;
    this.applicationFormData = {
      coverLetter: '',
      proposedBudget: milestone.budget
    };
    this.showApplicationModal = true;
  }

  closeApplicationModal() {
    this.showApplicationModal = false;
    this.selectedMilestone = null;
  }

  submitApplication() {
    if (!this.selectedMilestone || !this.applicationFormData.coverLetter || !this.applicationFormData.proposedBudget) {
      alert('Please fill all required fields');
      return;
    }

    this.submitting = true;

    const request: CreateApplicationRequest = {
      milestoneId: this.selectedMilestone.id,
      freelancerId: this.currentUser.id,
      coverLetter: this.applicationFormData.coverLetter,
      proposedBudget: this.applicationFormData.proposedBudget
    };

    this.applicationService.applyToMilestone(request).subscribe({
      next: () => {
        alert('Application submitted successfully! The company will review your application.');
        this.closeApplicationModal();
        this.loadMilestones();
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.error || 'Failed to submit application';
        alert(errorMsg);
        this.submitting = false;
      }
    });
  }

  canApply(milestone: Milestone): boolean {
    return milestone.status === 'PENDING' && this.currentUser?.userType === 'FREELANCER';
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'warning',
      'OPEN': 'success',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'success',
      'PAID': 'success',
      'CANCELLED': 'danger'
    };
    return statusMap[status] || 'secondary';
  }

  goBack() {
    this.router.navigate(['/frontoffice/projects']);
  }
}
