import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/models';

@Component({
  selector: 'app-browse-projects',
  templateUrl: './browse-projects.component.html',
  styleUrls: ['./browse-projects.component.scss']
})
export class BrowseProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  selectedStatus = 'OPEN';
  
  currentUser: any;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadAllProjects();
  }

  loadAllProjects() {
    this.loading = true;
    this.error = '';
    
    this.projectService.getOpenProjects().subscribe({
      next: (projects) => {
        console.log('Loaded projects:', projects);
        this.projects = projects;
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.error = err.error?.error || err.error || 'Failed to load projects';
        this.loading = false;
      }
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(p => {
      const matchSearch = !term || 
        p.title.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term));
      const matchStatus = this.selectedStatus === 'ALL' || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  viewProject(projectId: number) {
    console.log('Navigating to project:', projectId);
    console.log('Current user:', this.currentUser);
    this.router.navigate(['/projects', projectId]).then(
      success => console.log('Navigation success:', success),
      error => console.error('Navigation error:', error)
    );
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

  getCompanyInitials(companyName: string | undefined): string {
    if (!companyName) return 'C';
    return companyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedStatus = 'OPEN';
    this.onSearch();
  }
}
