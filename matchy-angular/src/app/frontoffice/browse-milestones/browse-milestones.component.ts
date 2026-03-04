import { Component, OnInit } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';
import { Milestone, CreateApplicationRequest } from '../models/models';

@Component({
  selector: 'app-browse-milestones',
  templateUrl: './browse-milestones.component.html',
  styleUrls: ['./browse-milestones.component.scss']
})
export class BrowseMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  filteredMilestones: Milestone[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  
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
    private milestoneService: MilestoneService,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    if (this.currentUser?.userType !== 'FREELANCER') {
      this.error = 'This page is only for freelancers';
      return;
    }
    this.loadAvailableMilestones();
  }

  loadAvailableMilestones() {
    this.loading = true;
    this.error = '';
    
    // In a real app, you'd have an endpoint to get all available milestones
    // For now, we'll need to implement this on the backend
    // Placeholder: Load milestones from all projects
    this.loading = false;
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMilestones = this.milestones.filter(m =>
      m.title.toLowerCase().includes(term) ||
      m.description?.toLowerCase().includes(term) ||
      m.projectTitle?.toLowerCase().includes(term)
    );
  }

  openApplicationModal(milestone: Milestone) {
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
        alert('Application submitted successfully!');
        this.closeApplicationModal();
        this.loadAvailableMilestones();
      },
      error: (err) => {
        alert(err.error || 'Failed to submit application');
        this.submitting = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'warning',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'success',
      'PAID': 'success'
    };
    return statusMap[status] || 'secondary';
  }
}
