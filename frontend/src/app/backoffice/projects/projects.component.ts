import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../../core/models/models';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ProjectRow extends Project {
  acceptedFreelancer?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectRow[] = [];
  filteredProjects: ProjectRow[] = [];
  searchTerm = '';
  selectedStatus = 'all';
  isLoading = true;

  private apiUrl = 'http://localhost:8081';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  load(): void {
    this.isLoading = true;

    this.projectService.getAll().subscribe({
      next: (projects) => {
        // For each project, fetch accepted proposal if any
        const requests = projects.map(p =>
          this.http.get<any[]>(`${this.apiUrl}/api/proposals?projectId=${p.id}`, { headers: this.getHeaders() }).pipe(
            map(proposals => {
              const accepted = proposals?.find(pr => pr.status === 'ACCEPTED');
              return { ...p, acceptedFreelancer: accepted?.freelancerName || null } as ProjectRow;
            }),
            catchError(() => of({ ...p, acceptedFreelancer: undefined } as ProjectRow))
          )
        );

        if (requests.length === 0) {
          this.projects = [];
          this.filteredProjects = [];
          this.isLoading = false;
          return;
        }

        forkJoin(requests).subscribe({
          next: (rows) => {
            this.projects = rows;
            this.filteredProjects = rows;
            this.isLoading = false;
          },
          error: () => {
            this.projects = projects;
            this.filteredProjects = projects;
            this.isLoading = false;
          }
        });
      },
      error: () => this.isLoading = false
    });
  }

  onSearch(): void {
    this.filteredProjects = this.projects.filter(p => {
      const matchSearch = !this.searchTerm ||
        p.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.clientName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'all' ||
        p.status?.toLowerCase() === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      open: 'success', in_progress: 'primary', delivered: 'warning',
      completed: 'success', cancelled: 'danger'
    };
    return map[status?.toLowerCase()] || 'primary';
  }

  deleteProject(id: number | undefined): void {
    if (!id || !confirm('Delete this project?')) return;
    this.projectService.delete(id).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== id);
      this.onSearch();
    });
  }
}