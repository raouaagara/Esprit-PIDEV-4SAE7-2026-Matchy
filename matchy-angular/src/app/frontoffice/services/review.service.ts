import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { 
  Review, 
  CreateReviewRequest, 
  TaskReview, 
  CreateTaskReviewRequest, 
  QualityScore 
} from "../models/models";

@Injectable({ providedIn: "root" })
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  // Basic review operations
  createReview(data: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/create`, data);
  }

  getReviewBySubmission(submissionId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/submission/${submissionId}`);
  }

  // Enhanced multi-level review operations
  createTaskReview(data: CreateTaskReviewRequest): Observable<TaskReview> {
    return this.http.post<TaskReview>(`${this.apiUrl}/task/create`, data);
  }

  getTaskReviews(submissionId: number): Observable<TaskReview[]> {
    return this.http.get<TaskReview[]>(`${this.apiUrl}/submission/${submissionId}/tasks`);
  }

  updateTaskReview(taskReviewId: number, data: Partial<CreateTaskReviewRequest>): Observable<TaskReview> {
    return this.http.put<TaskReview>(`${this.apiUrl}/task/${taskReviewId}`, data);
  }

  // Request revision
  requestRevision(submissionId: number, taskName: string, revisionNotes: string): Observable<TaskReview> {
    return this.http.post<TaskReview>(`${this.apiUrl}/submission/${submissionId}/revision`, {
      taskName,
      revisionNotes
    });
  }

  // Approve task
  approveTask(taskReviewId: number): Observable<TaskReview> {
    return this.http.put<TaskReview>(`${this.apiUrl}/task/${taskReviewId}/approve`, {});
  }

  // Get quality score
  getQualityScore(submissionId: number): Observable<QualityScore> {
    return this.http.get<QualityScore>(`${this.apiUrl}/submission/${submissionId}/quality-score`);
  }

  // Get freelancer average rating
  getFreelancerRating(freelancerId: number): Observable<{ averageRating: number; totalReviews: number }> {
    return this.http.get<{ averageRating: number; totalReviews: number }>(
      `${this.apiUrl}/freelancer/${freelancerId}/rating`
    );
  }

  // Get all reviews
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/all`);
  }
}
