import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bo-projects-milestones',
  templateUrl: './projects-milestones.component.html',
  styleUrls: ['./projects-milestones.component.scss']
})
export class BoProjectsMilestonesComponent implements OnInit {
  searchTerm = '';
  selectedStatus = 'all';
  statuses = ['all', 'active', 'completed', 'paused', 'cancelled'];

  projects = [
    { id: 1, title: 'E-Commerce Mobile App', client: 'TechStart TN', freelancer: 'Karim M.', budget: 4500, currency: 'TND', progress: 65, status: 'active', milestones: 4, completedMilestones: 1, dueDate: '2025-04-01' },
    { id: 2, title: 'Restaurant Website', client: 'Chez Habib', freelancer: 'Sara B.', budget: 1800, currency: 'TND', progress: 100, status: 'completed', milestones: 3, completedMilestones: 3, dueDate: '2025-01-28' },
    { id: 3, title: 'Brand Identity Package', client: 'Startup TN', freelancer: 'Yasmine K.', budget: 2200, currency: 'TND', progress: 30, status: 'active', milestones: 3, completedMilestones: 1, dueDate: '2025-03-30' },
    { id: 4, title: 'SEO Campaign Q1', client: 'Boutique TN', freelancer: 'Ahmed R.', budget: 800, currency: 'TND', progress: 0, status: 'paused', milestones: 2, completedMilestones: 0, dueDate: '2025-05-01' },
  ];

  get filteredProjects() {
    return this.projects.filter(p => {
      const matchStatus = this.selectedStatus === 'all' || p.status === this.selectedStatus;
      const matchSearch = !this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.client.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    return { active: 'primary', completed: 'success', paused: 'warning', cancelled: 'danger' }[status] || 'primary';
  }
}
