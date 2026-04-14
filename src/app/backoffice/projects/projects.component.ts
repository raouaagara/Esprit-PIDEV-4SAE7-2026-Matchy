import { Component, OnInit } from '@angular/core';
import { Project } from '../../frontoffice/models/models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = '';
  selectedStatus: string = 'all';

  ngOnInit(): void {
    this.filteredProjects = [...this.projects];
  }

  onSearch(): void {
    this.filteredProjects = this.projects.filter(p => {
      const matchSearch = !this.searchTerm ||
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'all' || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      open: 'success',
      in_progress: 'primary',
      delivered: 'warning',
      completed: 'success',
      cancelled: 'danger'
    };
    return map[status] || 'primary';
  }
}
