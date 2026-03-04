export interface User {
  userId?: number;
  id?: number;
  name: string;
  email: string;
  role?: string;
  status?: string;
  city?: string;
  plan?: string;
  verified?: boolean;
  rating?: number;
  projects?: number;
  joined?: string;
  badge?: string;
}

export interface Project {
  projectId?: number;
  name: string;
  title: string;
  description?: string;
  category?: string;
  status?: string;
  budget?: number;
  currency?: string;
  applications?: number;
  rating?: number;
  createdAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalAssessments: number;
  completedAssessments: number;
  totalClients: number;
  totalFreelancers: number;
  verifiedFreelancers: number;
  openProjects: number;
  completedProjects: number;
  totalProjects: number;
  verificationRate: number;
}

export interface Content {
  contentId?: number;
  title: string;
  description: string;
  type: "COURS" | "ARTICLE" | "VIDEO";
  createdAt?: string;
  updatedAt?: string;
  authorId?: number;
  assessment?: Assessment;
}

export interface Assessment {
  assessmentId?: number;
  questions: string; // JSON string avec format Question[]
  passingScore: number;
  duration: number;
  contentId?: number;
  content?: { contentId?: number; title?: string };
  contentTitle?: string;
}

// Nouveaux interfaces pour le système de questions
export interface Question {
  question: string;
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface AssessmentResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  passed: boolean;
  passingScore: number;
}
export * from './favorite.model';
