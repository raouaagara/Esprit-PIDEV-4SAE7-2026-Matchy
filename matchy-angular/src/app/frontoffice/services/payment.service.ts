import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  Payment, 
  CreatePaymentRequest, 
  ProcessPaymentRequest, 
  Invoice, 
  PaymentHistory 
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Create payment for milestone
  createPayment(data: CreatePaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/create`, data);
  }

  // Get payment by ID
  getPayment(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${paymentId}`);
  }

  // Get payments by milestone
  getMilestonePayments(milestoneId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/milestone/${milestoneId}`);
  }

  // Get payments by project
  getProjectPayments(projectId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Get payment history for company
  getCompanyPaymentHistory(companyId: number): Observable<PaymentHistory> {
    return this.http.get<PaymentHistory>(`${this.apiUrl}/company/${companyId}/history`);
  }

  // Get payment history for freelancer
  getFreelancerPaymentHistory(freelancerId: number): Observable<PaymentHistory> {
    return this.http.get<PaymentHistory>(`${this.apiUrl}/freelancer/${freelancerId}/history`);
  }

  // Process payment
  processPayment(data: ProcessPaymentRequest): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${data.paymentId}/process`, data);
  }

  // Move to escrow
  moveToEscrow(paymentId: number): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}/escrow`, {});
  }

  // Release from escrow
  releaseFromEscrow(paymentId: number): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}/release`, {});
  }

  // Generate invoice
  generateInvoice(paymentId: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/${paymentId}/invoice`, {});
  }

  // Get invoice
  getInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/invoices/${invoiceId}`);
  }

  // Download invoice PDF
  downloadInvoice(invoiceId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
  }
}
