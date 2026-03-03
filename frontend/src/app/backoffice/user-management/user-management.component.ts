import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  activeTab = 'all';
  searchTerm = '';
  selectedRole = 'all';
  selectedStatus = 'all';
  showBanModal = false;
  showAddModal = false;
  showEditModal = false;
  showPassword = false;
  selectedUser: any = null;
  editUser: any = null;
  isLoading = true;
  isSaving = false;
  addError = '';
  editError = '';
  previewInitials = '?';
  users: any[] = [];

  newUser: any = { firstName: '', lastName: '', email: '', password: '', role: 'CLIENT', location: '' };

  tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'FREELANCER', label: 'Freelancers' },
    { id: 'CLIENT', label: 'Clients' },
    { id: 'ADMIN', label: 'Admins' },
  ];

  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.isLoading = true;
    this.http.get<any[]>(`${this.api}/users`).subscribe({
      next: u => { this.users = u; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  get filteredUsers() {
    return this.users.filter(u => {
      const matchTab = this.activeTab === 'all' || u.role === this.activeTab;
      const matchSearch = !this.searchTerm ||
        this.getName(u).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = this.selectedRole === 'all' || u.role === this.selectedRole;
      const matchStatus = this.selectedStatus === 'all' || u.status?.toLowerCase() === this.selectedStatus;
      return matchTab && matchSearch && matchRole && matchStatus;
    });
  }

  getTabCount(id: string): number {
    return id === 'all' ? this.users.length : this.users.filter(u => u.role === id).length;
  }

  getName(u: any): string {
    if (!u) return '';
    return u.name || ((u.firstName || '') + ' ' + (u.lastName || '')).trim();
  }

  getInitials(u: any): string {
    return ((u.firstName?.[0] || '') + (u.lastName?.[0] || '')).toUpperCase() || '?';
  }

  updatePreview(): void {
    const f = this.newUser.firstName?.[0] || '';
    const l = this.newUser.lastName?.[0] || '';
    this.previewInitials = (f + l).toUpperCase() || '?';
  }

  // ─── Add ───
  openAddModal(): void {
    this.newUser = { firstName: '', lastName: '', email: '', password: '', role: 'CLIENT', location: '' };
    this.addError = ''; this.showPassword = false; this.previewInitials = '?';
    this.showAddModal = true;
  }

  saveNewUser(): void {
    if (!this.newUser.firstName || !this.newUser.lastName || !this.newUser.email || !this.newUser.password) {
      this.addError = 'First name, last name, email and password are required.'; return;
    }
    if (this.newUser.password.length < 6) { this.addError = 'Password must be at least 6 characters.'; return; }
    this.isSaving = true; this.addError = '';
    this.http.post(`${this.api}/auth/register`, this.newUser).subscribe({
      next: () => { this.showAddModal = false; this.isSaving = false; this.loadUsers(); },
      error: (err) => { this.addError = err?.error?.error || 'Error creating user'; this.isSaving = false; }
    });
  }

  // ─── Edit ───
  openEditModal(user: any): void {
    this.editUser = { ...user };
    this.editError = '';
    this.showEditModal = true;
  }

  saveEdit(): void {
    if (!this.editUser.firstName || !this.editUser.lastName || !this.editUser.email) {
      this.editError = 'First name, last name and email are required.'; return;
    }
    this.isSaving = true; this.editError = '';
    this.http.put(`${this.api}/users/${this.editUser.id}`, this.editUser).subscribe({
      next: (updated: any) => {
        const idx = this.users.findIndex(u => u.id === this.editUser.id);
        if (idx > -1) this.users[idx] = { ...this.users[idx], ...updated };
        this.showEditModal = false; this.isSaving = false;
      },
      error: (err) => { this.editError = err?.error?.error || 'Error updating user'; this.isSaving = false; }
    });
  }

  // ─── Ban ───
  openBanModal(user: any): void { this.selectedUser = user; this.showBanModal = true; }

  confirmBan(): void {
    if (!this.selectedUser) return;
    const s = this.selectedUser.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    this.http.patch(`${this.api}/users/${this.selectedUser.id}/status`, { status: s }).subscribe({
      next: () => { this.selectedUser.status = s; this.showBanModal = false; this.selectedUser = null; },
      error: () => { this.showBanModal = false; }
    });
  }

  // ─── Verify ───
  verifyUser(user: any): void {
    this.http.put(`${this.api}/users/${user.id}`, { ...user, verified: true }).subscribe({
      next: () => user.verified = true, error: () => {}
    });
  }

  // ─── Export CSV ───
  exportCSV(): void {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Status', 'Verified', 'Rating', 'Location'];
    const rows = this.filteredUsers.map(u => [
      u.id, u.firstName, u.lastName, u.email, u.role,
      u.status, u.verified ? 'Yes' : 'No', u.rating || '', u.location || ''
    ]);
    this.downloadFile([headers, ...rows].map(r => r.join(',')).join('\n'), 'users.csv', 'text/csv');
  }

  // ─── Export JSON ───
  exportJSON(): void {
    const data = this.filteredUsers.map(u => ({
      id: u.id, firstName: u.firstName, lastName: u.lastName,
      email: u.email, role: u.role, status: u.status,
      verified: u.verified, rating: u.rating, location: u.location
    }));
    this.downloadFile(JSON.stringify(data, null, 2), 'users.json', 'application/json');
  }

  // ─── Export PDF (print) ───
  exportPDF(): void {
    const rows = this.filteredUsers.map(u => `
      <tr>
        <td>${u.id}</td><td>${this.getName(u)}</td><td>${u.email}</td>
        <td>${u.role}</td><td>${u.status}</td><td>${u.verified ? '✓' : '✗'}</td>
        <td>${u.rating || '—'}</td><td>${u.location || '—'}</td>
      </tr>`).join('');
    const html = `
      <html><head><title>Users Export</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h2 { color: #4f6ef7; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th { background: #4f6ef7; color: white; padding: 8px 10px; text-align: left; }
        td { padding: 7px 10px; border-bottom: 1px solid #e2e8f0; }
        tr:nth-child(even) { background: #f8fafc; }
      </style></head>
      <body>
        <h2>Users Export — Matchy Platform</h2>
        <p>Total: ${this.filteredUsers.length} users | Date: ${new Date().toLocaleDateString()}</p>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Verified</th><th>Rating</th><th>Location</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  // ─── Export Excel (CSV with BOM for Excel) ───
  exportExcel(): void {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Status', 'Verified', 'Rating', 'Location'];
    const rows = this.filteredUsers.map(u => [
      u.id, u.firstName, u.lastName, u.email, u.role,
      u.status, u.verified ? 'Yes' : 'No', u.rating || '', u.location || ''
    ]);
    const csv = '\uFEFF' + [headers, ...rows].map(r => r.map((v: any) => `"${v}"`).join(';')).join('\n');
    this.downloadFile(csv, 'users.xlsx', 'application/vnd.ms-excel');
  }

  private downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  getRoleClass(role: string): string {
    return { ADMIN: 'danger', CLIENT: 'primary', FREELANCER: 'success' }[role] || 'primary';
  }

  getStatusClass(status: string): string {
    return { ACTIVE: 'active', INACTIVE: 'inactive', SUSPENDED: 'banned' }[status] || '';
  }
}