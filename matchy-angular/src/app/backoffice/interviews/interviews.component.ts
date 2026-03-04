import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../frontoffice/services/application.service';
import { Application } from '../../frontoffice/models/models';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  interviews: Application[] = [];
  loading = false;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInterviews();
  }

  loadInterviews() {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
      next: (data: Application[]) => {
        this.interviews = data.filter(app => 
          app.status === 'INTERVIEW_SCHEDULED' || app.interviewDate
        );
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading interviews:', err);
        this.loading = false;
      }
    });
  }

  viewProject(projectId: number) {
    this.router.navigate(['/backoffice/projects', projectId]);
  }
}
