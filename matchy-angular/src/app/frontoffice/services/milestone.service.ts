import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Milestone, CreateMilestoneRequest, UpdateMilestoneRequest } from "../models/models";

@Injectable({ providedIn: "root" })
export class MilestoneService {
  private apiUrl = `${environment.apiUrl}/milestones`;

  constructor(private http: HttpClient) {}

  createMilestone(data: CreateMilestoneRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getProjectMilestones(projectId: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(`${this.apiUrl}/project/${projectId}`);
  }

  getAvailableMilestones(projectId: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(`${this.apiUrl}/available/${projectId}`);
  }

  getMilestoneById(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.apiUrl}/${id}`);
  }

  updateMilestone(id: number, data: UpdateMilestoneRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteMilestone(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
