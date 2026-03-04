import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Application, CreateApplicationRequest, InterviewScheduleRequest } from "../models/models";

@Injectable({ providedIn: "root" })
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  applyToMilestone(data: CreateApplicationRequest): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/apply`, data);
  }

  getFreelancerApplications(freelancerId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  getCompanyApplications(companyId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/company/${companyId}`);
  }

  getMilestoneApplications(milestoneId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/milestone/${milestoneId}`);
  }

  scheduleInterview(applicationId: number, data: InterviewScheduleRequest): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${applicationId}/schedule-interview`, data);
  }

  confirmInterview(applicationId: number): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${applicationId}/confirm-interview`, {});
  }

  finalDecision(applicationId: number, status: string, feedback: string): Observable<Application> {
    return this.http.put<Application>(
      `${this.apiUrl}/${applicationId}/final-decision?status=${status}&feedback=${encodeURIComponent(feedback)}`,
      {}
    );
  }

  updateStatus(applicationId: number, status: string): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${applicationId}/status?status=${status}`, {});
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/all`);
  }
}
