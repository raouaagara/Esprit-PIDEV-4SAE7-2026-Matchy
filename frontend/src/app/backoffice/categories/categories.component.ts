import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

export interface Category {
  id: number;
  name: string;
  color: string;
  description: string;
  active: boolean;
  createdAt: Date | string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private apiUrl = 'http://localhost:8081/api/categories';

  // ── Data
  categories: Category[] = [];
  filtered:   Category[] = [];

  // ── Stats
  stats: { total: number; active: number; inactive: number } = { total: 0, active: 0, inactive: 0 };

  // ── State
  isLoading = false;
  isSaving  = false;
  errorMsg  = '';

  // ── Search & Filter
  searchTerm:   string       = '';
  filterActive: boolean | null = null;

  // ── Modal Create/Edit
  showModal  = false;
  editingId: number | null = null;
  formError  = '';

  form = {
    name:        '',
    color:       '#7c6af7',
    description: '',
    active:      true,
  };

  // ── Modal Delete
  showDeleteConfirm = false;
  categoryToDelete: Category | null = null;

  // ── Color swatches
  colorSwatches = [
    '#7c6af7', '#22d3ee', '#34d399', '#fbbf24',
    '#f87171', '#fb923c', '#a78bfa', '#38bdf8',
    '#ec4899', '#84cc16',
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ── Load all categories from backend
  load(): void {
    this.isLoading = true;
    this.errorMsg  = '';

    this.http.get<Category[]>(this.apiUrl, { headers: this.getHeaders() }).subscribe({
      next: (data) => {
        this.categories = data;
        this.applyFilter();
        this.updateStats();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg  = err?.error?.error || 'Failed to load categories';
        this.isLoading = false;
      }
    });
  }

  // ── Filter / Search
  onSearch(): void { this.applyFilter(); }

  setFilter(val: boolean | null): void {
    this.filterActive = val;
    this.applyFilter();
  }

  private applyFilter(): void {
    let list = [...this.categories];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(term) ||
        (c.description || '').toLowerCase().includes(term)
      );
    }
    if (this.filterActive !== null) {
      list = list.filter(c => c.active === this.filterActive);
    }
    this.filtered = list;
  }

  private updateStats(): void {
    this.stats.total    = this.categories.length;
    this.stats.active   = this.categories.filter(c => c.active).length;
    this.stats.inactive = this.categories.filter(c => !c.active).length;
  }

  // ── Modal Open/Close
  openModal(cat?: Category): void {
    this.formError = '';
    if (cat) {
      this.editingId = cat.id;
      this.form = { name: cat.name, color: cat.color || '#7c6af7', description: cat.description || '', active: cat.active };
    } else {
      this.editingId = null;
      this.form = { name: '', color: '#7c6af7', description: '', active: true };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.formError = '';
  }

  // ── Save (Create or Update) — real API calls
  save(): void {
    if (!this.form.name.trim()) {
      this.formError = 'Name is required.';
      return;
    }
    this.isSaving  = true;
    this.formError = '';

    const payload = {
      name:        this.form.name.trim(),
      color:       this.form.color,
      description: this.form.description,
      active:      this.form.active,
    };

    if (this.editingId) {
      // UPDATE
      this.http.put<Category>(`${this.apiUrl}/${this.editingId}`, payload, { headers: this.getHeaders() }).subscribe({
        next: (updated) => {
          const idx = this.categories.findIndex(c => c.id === this.editingId);
          if (idx !== -1) this.categories[idx] = updated;
          this.applyFilter();
          this.updateStats();
          this.isSaving = false;
          this.closeModal();
        },
        error: (err) => {
          this.formError = err?.error?.error || 'Failed to update category';
          this.isSaving  = false;
        }
      });
    } else {
      // CREATE
      this.http.post<Category>(this.apiUrl, payload, { headers: this.getHeaders() }).subscribe({
        next: (created) => {
          this.categories.push(created);
          this.applyFilter();
          this.updateStats();
          this.isSaving = false;
          this.closeModal();
        },
        error: (err) => {
          this.formError = err?.error?.error || 'Failed to create category';
          this.isSaving  = false;
        }
      });
    }
  }

  // ── Toggle Active — real API call
  toggleActive(cat: Category): void {
    this.http.patch<Category>(`${this.apiUrl}/${cat.id}/toggle`, {}, { headers: this.getHeaders() }).subscribe({
      next: (updated) => {
        const idx = this.categories.findIndex(c => c.id === cat.id);
        if (idx !== -1) this.categories[idx] = updated;
        this.applyFilter();
        this.updateStats();
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Failed to toggle status';
      }
    });
  }

  // ── Delete — real API call
  confirmDelete(cat: Category): void {
    this.categoryToDelete = cat;
    this.showDeleteConfirm = true;
  }

  deleteConfirmed(): void {
    if (!this.categoryToDelete) return;
    this.isSaving = true;

    this.http.delete(`${this.apiUrl}/${this.categoryToDelete.id}`, { headers: this.getHeaders() }).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== this.categoryToDelete!.id);
        this.applyFilter();
        this.updateStats();
        this.isSaving          = false;
        this.showDeleteConfirm = false;
        this.categoryToDelete  = null;
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'Failed to delete category';
        this.isSaving          = false;
        this.showDeleteConfirm = false;
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.categoryToDelete  = null;
  }
}