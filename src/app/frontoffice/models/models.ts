// model definitions used across the app
export interface User {
  id: string;
  name: string;
  email?: string;
  role?: string;
  status?: string;
  rating?: number;
  projects?: number;
  city?: string;
  badge?: string;
  verified?: boolean;
  createdAt?: string | Date;
}

export interface Project {
  id: string;
  title: string;
  ownerId: string;
  description?: string;
  category?: string;
  budget?: number;
  currency?: string;
  status?: string;
  applications?: number;
  rating?: number;
  createdAt?: string | Date;
}

export interface DashboardStats {
  totalUsers: number;
  totalClients: number;
  totalFreelancers: number;
  verifiedFreelancers: number;
  openProjects: number;
  completedProjects: number;
  totalProjects: number;
  verificationRate: number; // percentage
}
