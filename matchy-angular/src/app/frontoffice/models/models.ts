// Backend API Models
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'COMPANY';
  companyName?: string;
  expertise?: string;
  hourlyRate?: number;
  phone?: string;
  address?: string;
  isActive?: boolean;
  createdAt?: string;
  // Legacy properties for compatibility with existing components
  name?: string;
  role?: string;
  status?: string;
  rating?: number;
  projects?: number;
  city?: string;
  badge?: string;
  verified?: boolean;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'FREELANCER' | 'COMPANY';
  companyName?: string;
  expertise?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
  companyName?: string;
  expertise?: string;
  hourlyRate?: number;
  phone?: string;
  address?: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  totalBudget: number;
  deadline: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  companyId: number;
  companyName?: string;
  createdAt?: string;
  milestoneCount?: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  totalBudget: number;
  deadline: string;
  companyId: number;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  totalBudget?: number;
  deadline?: string;
  status?: string;
}

export interface Milestone {
  id: number;
  title: string;
  description?: string;
  budget: number;
  deadline: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  projectId: number;
  projectTitle?: string;
}

export interface CreateMilestoneRequest {
  projectId: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
}

export interface UpdateMilestoneRequest {
  title?: string;
  description?: string;
  budget?: number;
  deadline?: string;
  status?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalClients: number;
  totalFreelancers: number;
  verifiedFreelancers: number;
  openProjects: number;
  completedProjects: number;
  totalProjects: number;
  verificationRate: number;
}

// Application Models
export interface Application {
  id: number;
  milestoneId: number;
  milestoneTitle: string;
  projectId: number;
  projectTitle: string;
  freelancerId: number;
  freelancerName: string;
  coverLetter: string;
  proposedBudget: number;
  status: 'PENDING' | 'INTERVIEW_SCHEDULED' | 'INTERVIEW_CONFIRMED' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  interviewDate?: string;
  meetLink?: string;
  companyFeedback?: string;
  freelancerConfirmed?: boolean;
}

export interface CreateApplicationRequest {
  milestoneId: number;
  freelancerId: number;
  coverLetter: string;
  proposedBudget: number;
}

export interface InterviewScheduleRequest {
  interviewDate: string;
  meetLink: string;
}

// Submission Models
export interface Submission {
  id: number;
  milestoneId: number;
  milestoneTitle: string;
  projectId: number;
  projectTitle: string;
  freelancerId: number;
  freelancerName: string;
  title: string;
  description: string;
  attachmentUrl?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  review?: Review;
}

export interface CreateSubmissionRequest {
  milestoneId: number;
  freelancerId: number;
  title: string;
  description: string;
  attachmentUrl?: string;
}

// Review Models
export interface Review {
  id: number;
  submissionId: number;
  reviewerId: number;
  reviewerName: string;
  comments: string;
  rating: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface CreateReviewRequest {
  submissionId: number;
  reviewerId: number;
  comments: string;
  rating: number;
  status: string;
}

// Notification Models
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'APPLICATION_RECEIVED' | 'APPLICATION_ACCEPTED' | 'APPLICATION_REJECTED' | 
        'INTERVIEW_SCHEDULED' | 'INTERVIEW_CONFIRMED' | 'SUBMISSION_RECEIVED' | 
        'SUBMISSION_REVIEWED' | 'MILESTONE_ASSIGNED' | 'PROJECT_UPDATE' | 
        'PAYMENT_RECEIVED' | 'PAYMENT_PENDING' | 'CONTRACT_GENERATED' | 
        'REVISION_REQUESTED' | 'MESSAGE_RECEIVED';
  referenceId?: number;
  isRead: boolean;
  createdAt: string;
}

// Contract Models
export interface Contract {
  id: number;
  projectId: number;
  projectTitle: string;
  companyId: number;
  companyName: string;
  freelancerId: number;
  freelancerName: string;
  terms: string;
  deliverables: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'ACTIVE' | 'COMPLETED' | 'TERMINATED';
  companySignature?: string;
  freelancerSignature?: string;
  companySignedAt?: string;
  freelancerSignedAt?: string;
  createdAt: string;
  // Computed properties for UI
  contractNumber?: string;
  amount?: number;
  companySigned?: boolean;
  freelancerSigned?: boolean;
  milestoneTitle?: string;
}

export interface CreateContractRequest {
  projectId: number;
  companyId: number;
  freelancerId: number;
  terms: string;
  deliverables: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
}

export interface SignContractRequest {
  contractId: number;
  userId: number;
  signature: string;
}

// Enhanced Review Models
export interface TaskReview {
  id: number;
  submissionId: number;
  taskName: string;
  rating: number;
  comments: string;
  status: 'APPROVED' | 'REVISION_REQUESTED' | 'REJECTED';
  revisionNotes?: string;
  createdAt: string;
}

export interface CreateTaskReviewRequest {
  submissionId: number;
  taskName: string;
  rating: number;
  comments: string;
  status: string;
  revisionNotes?: string;
}

export interface QualityScore {
  submissionId: number;
  overallRating: number;
  taskReviews: TaskReview[];
  averageRating: number;
  totalTasks: number;
  approvedTasks: number;
  revisionRequests: number;
}

// Payment Models
export interface Payment {
  id: number;
  milestoneId: number;
  milestoneTitle: string;
  projectId: number;
  projectTitle: string;
  companyId: number;
  freelancerId: number;
  amount: number;
  status: 'PENDING' | 'IN_ESCROW' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  dueDate: string;
  paidAt?: string;
  invoiceNumber?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}

export interface CreatePaymentRequest {
  milestoneId: number;
  companyId: number;
  freelancerId: number;
  amount: number;
  dueDate: string;
}

export interface ProcessPaymentRequest {
  paymentId: number;
  paymentMethod: string;
  transactionId?: string;
}

export interface Invoice {
  id: number;
  paymentId: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  tax: number;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentHistory {
  payments: Payment[];
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
}

// Message/Chat Models
export interface Message {
  id: number;
  projectId: number;
  senderId: number;
  senderName: string;
  senderType: 'FREELANCER' | 'COMPANY';
  receiverId: number;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateMessageRequest {
  projectId: number;
  senderId: number;
  receiverId: number | null;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface ChatThread {
  projectId: number;
  projectTitle: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
}
