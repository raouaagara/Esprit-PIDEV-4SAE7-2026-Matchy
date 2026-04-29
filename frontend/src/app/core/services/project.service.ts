import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, DashboardStats, Purchase } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  getById(projectId: number) {
      throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8085/api/projects';
  private purchaseUrl = 'http://localhost:8085/api/purchases';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getMy(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/my`);
  }

  create(data: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`);
  }

  // ── Purchases ──────────────────────────────────────────
  buyProject(projectId: number, message: string): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchaseUrl, { projectId, message });
  }

  getPendingPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.purchaseUrl}/pending`);
  }

  getPendingCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.purchaseUrl}/pending/count`);
  }

  getMyPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.purchaseUrl}/my`);
  }

  acceptPurchase(id: number): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.purchaseUrl}/${id}/accept`, {});
  }

  rejectPurchase(id: number): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.purchaseUrl}/${id}/reject`, {});
  }
}
