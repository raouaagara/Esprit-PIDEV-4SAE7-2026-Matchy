import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/models';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  selectedRole = 'all';
  selectedStatus = 'all';
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: users => { this.users = users; this.filteredUsers = users; this.isLoading = false; },
      error: () => this.isLoading = false
    });
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter(u => {
      const matchSearch = !this.searchTerm ||
        u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = this.selectedRole === 'all' || u.role.toLowerCase() === this.selectedRole;
      const matchStatus = this.selectedStatus === 'all' || u.status.toLowerCase() === this.selectedStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  deleteUser(id: number | undefined): void {
    if (!id || !confirm('Delete this user?')) return;
    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
      this.onSearch();
    });
  }
}
