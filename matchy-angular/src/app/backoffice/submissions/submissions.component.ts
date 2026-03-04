import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionService } from '../../frontoffice/services/submission.service';
import { Submission } from '../../frontoffice/models/models';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  submissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];
  loading = false;
  statusFilter = 'ALL';

  constructor(
    private submissionService: SubmissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading = true;
    this.submissionService.getAllSubmissions().subscribe({
      next: (data: Submission[]) => {
        this.submissions = data;
        this.filteredSubmissions = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading submissions:', err);
        this.loading = false;
      }
    });
  }

  filterSubmissions() {
    this.filteredSubmissions = this.submissions.filter(sub => {
      return this.statusFilter === 'ALL' || sub.status === this.statusFilter;
    });
  }

  viewProject(projectId: number) {
    this.router.navigate(['/backoffice/projects', projectId]);
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'status-pending',
      'APPROVED': 'status-accepted',
      'REJECTED': 'status-rejected',
      'REVISION_REQUESTED': 'status-interview'
    };
    return statusMap[status] || 'status-default';
  }
}
