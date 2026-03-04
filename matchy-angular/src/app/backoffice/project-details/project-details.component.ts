import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../frontoffice/services/project.service';
import { MilestoneService } from '../../frontoffice/services/milestone.service';
import { ApplicationService } from '../../frontoffice/services/application.service';
import { SubmissionService } from '../../frontoffice/services/submission.service';
import { ReviewService } from '../../frontoffice/services/review.service';
import { AuthService } from '../../frontoffice/services/auth.service';
import { Project, Milestone, Application, Submission, CreateMilestoneRequest, InterviewScheduleRequest, CreateReviewRequest } from '../../frontoffice/models/models';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  project: Project | null = null;
  milestones: Milestone[] = [];
  applications: Application[] = [];
  submissions: Submission[] = [];
  
  loading = false;
  error = '';
  
  // Milestone Modal
  showMilestoneModal = false;
  milestoneFormData: any = {};
  isEditMilestone = false;
  savingMilestone = false;
  
  // Application Modal
  showApplicationModal = false;
  selectedApplications: Application[] = [];
  
  // Interview Modal
  showInterviewModal = false;
  selectedApplication: Application | null = null;
  interviewFormData: any = {};
  
  // Submission Modal
  showSubmissionModal = false;
  selectedSubmissions: Submission[] = [];
  
  // Review Modal
  showReviewModal = false;
  selectedSubmission: Submission | null = null;
  reviewFormData: any = {};
  
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private milestoneService: MilestoneService,
    private applicationService: ApplicationService,
    private submissionService: SubmissionService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProjectDetails();
  }

  loadProjectDetails() {
    this.loading = true;
    this.error = '';
    
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadMilestones();
        this.loadApplications();
        this.loadSubmissions();
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

  loadApplications() {
    if (this.currentUser?.id) {
      this.applicationService.getCompanyApplications(this.currentUser.id).subscribe({
        next: (apps) => {
          this.applications = apps.filter(app => app.projectId === this.projectId);
        },
        error: (err) => console.error('Failed to load applications', err)
      });
    }
  }

  loadSubmissions() {
    if (this.currentUser?.id) {
      this.submissionService.getCompanySubmissions(this.currentUser.id).subscribe({
        next: (subs) => {
          this.submissions = subs.filter(sub => sub.projectId === this.projectId);
        },
        error: (err) => console.error('Failed to load submissions', err)
      });
    }
  }

  // Milestone CRUD
  openCreateMilestoneModal() {
    this.isEditMilestone = false;
    this.milestoneFormData = {
      title: '',
      description: '',
      budget: null,
      deadline: ''
    };
    this.showMilestoneModal = true;
  }

  openEditMilestoneModal(milestone: Milestone) {
    this.isEditMilestone = true;
    this.milestoneFormData = { ...milestone };
    this.showMilestoneModal = true;
  }

  saveMilestone() {
    if (!this.milestoneFormData.title || !this.milestoneFormData.budget || !this.milestoneFormData.deadline) {
      alert('Please fill all required fields');
      return;
    }

    this.savingMilestone = true;

    if (this.isEditMilestone) {
      this.milestoneService.updateMilestone(this.milestoneFormData.id, this.milestoneFormData).subscribe({
        next: () => {
          this.loadMilestones();
          this.closeMilestoneModal();
        },
        error: (err) => {
          alert('Failed to update milestone');
          this.savingMilestone = false;
        }
      });
    } else {
      const request: CreateMilestoneRequest = {
        projectId: this.projectId,
        ...this.milestoneFormData
      };
      
      this.milestoneService.createMilestone(request).subscribe({
        next: () => {
          this.loadMilestones();
          this.closeMilestoneModal();
        },
        error: (err) => {
          alert('Failed to create milestone');
          this.savingMilestone = false;
        }
      });
    }
  }

  deleteMilestone(id: number) {
    if (confirm('Are you sure you want to delete this milestone?')) {
      this.milestoneService.deleteMilestone(id).subscribe({
        next: () => this.loadMilestones(),
        error: (err) => alert('Failed to delete milestone')
      });
    }
  }

  closeMilestoneModal() {
    this.showMilestoneModal = false;
    this.savingMilestone = false;
  }

  // Applications
  viewMilestoneApplications(milestoneId: number) {
    this.applicationService.getMilestoneApplications(milestoneId).subscribe({
      next: (apps) => {
        this.selectedApplications = apps;
        this.showApplicationModal = true;
      },
      error: (err) => alert('Failed to load applications')
    });
  }

  closeApplicationModal() {
    this.showApplicationModal = false;
    this.selectedApplications = [];
  }

  // Interview Scheduling
  openInterviewModal(application: Application) {
    this.selectedApplication = application;
    this.interviewFormData = {
      interviewDate: '',
      meetLink: ''
    };
    this.showInterviewModal = true;
  }

  scheduleInterview() {
    if (!this.selectedApplication || !this.interviewFormData.interviewDate || !this.interviewFormData.meetLink) {
      alert('Please fill all fields');
      return;
    }

    const request: InterviewScheduleRequest = {
      interviewDate: this.interviewFormData.interviewDate,
      meetLink: this.interviewFormData.meetLink
    };

    this.applicationService.scheduleInterview(this.selectedApplication.id, request).subscribe({
      next: () => {
        alert('Interview scheduled successfully!');
        this.closeInterviewModal();
        this.loadApplications();
      },
      error: (err) => alert('Failed to schedule interview')
    });
  }

  closeInterviewModal() {
    this.showInterviewModal = false;
    this.selectedApplication = null;
  }

  acceptApplication(application: Application) {
    if (confirm('Accept this application?')) {
      this.applicationService.finalDecision(application.id, 'ACCEPTED', 'Congratulations! You have been selected.').subscribe({
        next: () => {
          alert('Application accepted!');
          this.loadApplications();
          this.loadMilestones();
        },
        error: (err) => alert('Failed to accept application')
      });
    }
  }

  rejectApplication(application: Application) {
    const feedback = prompt('Provide feedback for rejection:');
    if (feedback !== null) {
      this.applicationService.finalDecision(application.id, 'REJECTED', feedback).subscribe({
        next: () => {
          alert('Application rejected');
          this.loadApplications();
        },
        error: (err) => alert('Failed to reject application')
      });
    }
  }

  // Submissions
  viewMilestoneSubmissions(milestoneId: number) {
    this.submissionService.getMilestoneSubmissions(milestoneId).subscribe({
      next: (subs) => {
        this.selectedSubmissions = subs;
        this.showSubmissionModal = true;
      },
      error: (err) => alert('Failed to load submissions')
    });
  }

  closeSubmissionModal() {
    this.showSubmissionModal = false;
    this.selectedSubmissions = [];
  }

  // Review
  openReviewModal(submission: Submission) {
    this.selectedSubmission = submission;
    this.reviewFormData = {
      comments: '',
      rating: 5,
      status: 'APPROVED'
    };
    this.showReviewModal = true;
  }

  submitReview() {
    if (!this.selectedSubmission || !this.reviewFormData.comments) {
      alert('Please provide comments');
      return;
    }

    const request: CreateReviewRequest = {
      submissionId: this.selectedSubmission.id,
      reviewerId: this.currentUser.id,
      comments: this.reviewFormData.comments,
      rating: this.reviewFormData.rating,
      status: this.reviewFormData.status
    };

    this.reviewService.createReview(request).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        this.closeReviewModal();
        this.loadSubmissions();
        this.loadMilestones();
      },
      error: (err) => alert('Failed to submit review')
    });
  }

  closeReviewModal() {
    this.showReviewModal = false;
    this.selectedSubmission = null;
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'warning',
      'OPEN': 'info',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'success',
      'PAID': 'success',
      'CANCELLED': 'danger',
      'REJECTED': 'danger',
      'ACCEPTED': 'success',
      'APPROVED': 'success',
      'INTERVIEW_SCHEDULED': 'info',
      'INTERVIEW_CONFIRMED': 'primary'
    };
    return statusMap[status] || 'secondary';
  }

  goBack() {
    this.router.navigate(['/backoffice/projects']);
  }
}
