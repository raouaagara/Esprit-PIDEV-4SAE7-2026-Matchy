import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyProject } from '../models/project.model';
import { ProjectMilestone, MilestoneApplication } from '../models/milestone.model';
import { CompanyProjectsService } from '../services/company-projects.service';
import { MilestonesService } from '../services/milestones.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project?: CompanyProject;
  milestones: ProjectMilestone[] = [];
  
  showApplicationModal = false;
  selectedMilestone?: ProjectMilestone;
  
  applicationForm = {
    motivationLetter: '',
    yearsOfExperience: 0,
    cvUrl: '',
    proposedBudget: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: CompanyProjectsService,
    private milestonesService: MilestonesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.projectsService.getProjectById(projectId).subscribe(project => {
      this.project = project;
      
      if (!this.project) {
        this.router.navigate(['/projects']);
        return;
      }

      // Increment view count
      this.projectsService.incrementClickCount(projectId).subscribe();
      
      // Load only open milestones for front office
      this.milestonesService.getMilestonesByProjectId(projectId).subscribe(allMilestones => {
        this.milestones = allMilestones.filter(m => m.status === 'open');
        
        console.log('Project details loaded:', {
          projectId,
          totalMilestones: allMilestones.length,
          openMilestones: this.milestones.length
        });
      });
    });
  }

  openApplicationModal(milestone: ProjectMilestone): void {
    if (!this.authService.isAuthenticated) {
      alert('Please login to apply for this milestone');
      this.router.navigate(['/backoffice/login']);
      return;
    }

    if (milestone.status !== 'open') {
      alert('This milestone is not available for applications');
      return;
    }

    this.selectedMilestone = milestone;
    this.applicationForm = {
      motivationLetter: '',
      yearsOfExperience: 0,
      cvUrl: '',
      proposedBudget: milestone.budget || 0
    };
    this.showApplicationModal = true;
  }

  closeApplicationModal(): void {
    this.showApplicationModal = false;
    this.selectedMilestone = undefined;
  }

  submitApplication(): void {
    if (!this.selectedMilestone || !this.project || !this.authService.currentUser) {
      console.error('Missing required data for application submission');
      return;
    }

    if (!this.applicationForm.motivationLetter || this.applicationForm.yearsOfExperience < 0) {
      alert('Please fill in all required fields');
      return;
    }

    const application: Omit<MilestoneApplication, 'id' | 'appliedAt' | 'status'> = {
      milestoneId: this.selectedMilestone.id,
      projectId: this.project.id,
      freelancerId: this.authService.currentUser.id,
      freelancerName: this.authService.currentUser.name,
      freelancerEmail: this.authService.currentUser.email,
      motivationLetter: this.applicationForm.motivationLetter,
      yearsOfExperience: this.applicationForm.yearsOfExperience,
      cvUrl: this.applicationForm.cvUrl,
      proposedBudget: this.applicationForm.proposedBudget
    };

    console.log('Submitting application:', application);
    this.milestonesService.submitApplication(application).subscribe(() => {
      // Refresh milestones to show updated count
      this.milestonesService.getMilestonesByProjectId(this.project!.id).subscribe(allMilestones => {
        this.milestones = allMilestones.filter(m => m.status === 'open');
        console.log('Milestones after application:', this.milestones);
      });
      
      alert('Application submitted successfully! The company will review your application.');
      this.closeApplicationModal();
    });
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  getStatusClass(status: string): string {
    return status;
  }
}
