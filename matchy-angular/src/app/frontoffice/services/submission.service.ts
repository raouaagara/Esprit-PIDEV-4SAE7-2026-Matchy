import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Submission, CreateSubmissionRequest } from "../models/models";

@Injectable({ providedIn: "root" })
export class SubmissionService {
  private apiUrl = `${environment.apiUrl}/submissions`;

  constructor(private http: HttpClient) {}

  submitWork(data: CreateSubmissionRequest): Observable<Submission> {
    return this.http.post<Submission>(`${this.apiUrl}/submit`, data);
  }

  getFreelancerSubmissions(freelancerId: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  getCompanySubmissions(companyId: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/company/${companyId}`);
  }

  getMilestoneSubmissions(milestoneId: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/milestone/${milestoneId}`);
  }

  getAllSubmissions(): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/all`);
  }
}
