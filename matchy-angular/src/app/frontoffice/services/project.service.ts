import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Project, CreateProjectRequest, UpdateProjectRequest } from "../models/models";

@Injectable({ providedIn: "root" })
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  createProject(data: CreateProjectRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getOpenProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/all?status=OPEN`);
  }

  getCompanyProjects(companyId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/company/${companyId}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: number, data: UpdateProjectRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getProjectMilestones(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/milestones`);
  }
}
