import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DashboardStats, User } from "../models/models";

@Injectable({ providedIn: "root" })
export class DashboardService {
  getStats(): Observable<DashboardStats> {
    // dummy data matching current DashboardStats fields
    return of({
      totalUsers: 0,
      totalClients: 0,
      totalFreelancers: 0,
      verifiedFreelancers: 0,
      openProjects: 0,
      completedProjects: 0,
      totalProjects: 0,
      verificationRate: 0,
    });
  }

  getRecentUsers(): Observable<User[]> {
    return of([]);
  }

  getTopFreelancers(): Observable<User[]> {
    return of([]);
  }
}
