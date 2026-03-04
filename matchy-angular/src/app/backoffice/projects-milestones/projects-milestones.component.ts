import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, Milestone } from '../../frontoffice/models/models';
import { ProjectService } from '../../frontoffice/services/project.service';
import { MilestoneService } from '../../frontoffice/services/milestone.service';
import { AuthService } from '../../frontoffice/services/auth.service';

interface ProjectWithMilestones extends Project {
  milestones?: Milestone[];
  completedMilestones?: number;
  progress?: number;
}

@Component({
  selector: 'app-bo-projects-milestones',
  templateUrl: './projects-milestones.component.html',
  styleUrls: ['./projects-milestones.component.scss']
})
export class BoProjectsMilestonesComponent implements OnInit {
  searchTerm = '';
  selectedStatus = 'all';
  statuses = ['all', 'OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  projects: ProjectWithMilestones[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private projectService: ProjectService,
    private milestoneService: MilestoneService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjectsWithMilestones();
  }

  loadProjectsWithMilestones(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = "Please login to view projects";
      return;
    }

    this.loading = true;
    this.error = null;

    this.projectService.getCompanyProjects(currentUser.id).subscribe({
      next: (projects) => {
        this.projects = projects.map(p => ({
          ...p,
          milestones: [],
          completedMilestones: 0,
          progress: 0
        }));

        // Load milestones for each project
        this.projects.forEach((project, index) => {
          this.milestoneService.getProjectMilestones(project.id).subscribe({
            next: (milestones) => {
              this.projects[index].milestones = milestones;
              const completed = milestones.filter(m => m.status === 'COMPLETED').length;
              this.projects[index].completedMilestones = completed;
              this.projects[index].progress = milestones.length > 0 
                ? Math.round((completed / milestones.length) * 100) 
                : 0;
            },
            error: (err) => console.error(`Error loading milestones for project ${project.id}:`, err)
          });
        });

        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading projects:", err);
        this.error = "Failed to load projects. Please try again.";
        this.loading = false;
      }
    });
  }

  get filteredProjects() {
    return this.projects.filter(p => {
      const matchStatus = this.selectedStatus === 'all' || p.status === this.selectedStatus;
      const matchSearch = !this.searchTerm || 
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        (p.companyName && p.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchStatus && matchSearch;
    });
  }

  viewProject(id: number): void {
    this.router.navigate(['/backoffice/projects', id]);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      OPEN: 'success',
      IN_PROGRESS: 'primary',
      COMPLETED: 'success',
      CANCELLED: 'danger'
    };
    return map[status] || 'primary';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      OPEN: 'Open',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled'
    };
    return map[status] || status;
  }

  getTotalBudget(): number {
    return this.projects.reduce((sum, p) => sum + (p.totalBudget || 0), 0);
  }

  getActiveCount(): number {
    return this.projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'OPEN').length;
  }

  getCompletedCount(): number {
    return this.projects.filter(p => p.status === 'COMPLETED').length;
  }
}
