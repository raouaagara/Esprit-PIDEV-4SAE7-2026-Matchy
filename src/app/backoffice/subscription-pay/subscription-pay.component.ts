import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface PaymentRecord {
  id: string;
  userId?: string;
  user: string;
  email: string;
  plan: string;
  amount: number;
  currency: string;
  method: 'card' | 'paypal' | 'bank_transfer' | 'mobile';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  transactionId: string;
  rejectionReason?: string;
}

@Component({
  selector: 'app-bo-subscription-pay',
  templateUrl: './subscription-pay.component.html',
  styleUrls: ['./subscription-pay.component.scss']
})
export class BoSubscriptionPayComponent implements OnInit {
  searchTerm = '';
  selectedStatus = 'all';
  selectedMethod = 'all';
  statuses = ['all', 'completed', 'pending', 'failed', 'refunded'];
  methods = ['all', 'card', 'paypal', 'bank_transfer', 'mobile'];

  toastMessage = '';

  payments: PaymentRecord[] = [
    {
      id: 'PAY-001',
      user: 'Karim Mansouri',
      email: 'karim@gmail.com',
      plan: 'Pro',
      amount: 29,
      currency: 'TND',
      method: 'card',
      status: 'completed',
      date: '2025-03-01',
      transactionId: 'TXN-A7B3C9D2E'
    },
    {
      id: 'PAY-002',
      user: 'Sara Belhaj',
      email: 'sara@gmail.com',
      plan: 'Premium',
      amount: 69,
      currency: 'TND',
      method: 'card',
      status: 'completed',
      date: '2025-02-28',
      transactionId: 'TXN-F1G4H8J5K'
    },
    {
      id: 'PAY-003',
      user: 'Ahmed Riahi',
      email: 'ahmed@gmail.com',
      plan: 'Pro',
      amount: 29,
      currency: 'TND',
      method: 'bank_transfer',
      status: 'pending',
      date: '2025-02-27',
      transactionId: 'TXN-L2M6N9P3Q'
    },
    {
      id: 'PAY-004',
      user: 'Yasmine Karoui',
      email: 'yasmine@gmail.com',
      plan: 'Pro',
      amount: 29,
      currency: 'TND',
      method: 'card',
      status: 'failed',
      date: '2025-02-25',
      transactionId: 'TXN-R4S7T1U5V'
    },
    {
      id: 'PAY-005',
      user: 'Mehdi Trabelsi',
      email: 'mehdi@gmail.com',
      plan: 'Premium',
      amount: 69,
      currency: 'TND',
      method: 'mobile',
      status: 'completed',
      date: '2025-02-20',
      transactionId: 'TXN-W8X2Y6Z0A'
    },
    {
      id: 'PAY-006',
      user: 'Nour Hamdi',
      email: 'nour@gmail.com',
      plan: 'Pro',
      amount: 29,
      currency: 'TND',
      method: 'card',
      status: 'refunded',
      date: '2025-02-18',
      transactionId: 'TXN-B3C7D1E5F'
    },
    {
      id: 'PAY-007',
      user: 'Omar Jaziri',
      email: 'omar@gmail.com',
      plan: 'Premium',
      amount: 69,
      currency: 'TND',
      method: 'card',
      status: 'completed',
      date: '2025-02-15',
      transactionId: 'TXN-G9H2J4K8L'
    }
  ];

  showDetail = false;
  selectedPayment: PaymentRecord | null = null;

  showRefundModal = false;
  paymentToRefund: PaymentRecord | null = null;

  showRejectModal = false;
  paymentToReject: PaymentRecord | null = null;
  rejectReason = '';

  showAddModal = false;
  newPayment: Partial<PaymentRecord> = this.initNewPayment();

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {}

  initNewPayment(): Partial<PaymentRecord> {
    return {
      user: '',
      email: '',
      plan: 'Pro',
      amount: 29,
      currency: 'TND',
      method: 'card',
      status: 'completed'
    };
  }

  get filteredPayments(): PaymentRecord[] {
    return this.payments.filter(p => {
      const matchStatus = this.selectedStatus === 'all' || p.status === this.selectedStatus;
      const matchMethod = this.selectedMethod === 'all' || p.method === this.selectedMethod;
      const matchSearch =
        !this.searchTerm ||
        p.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatus && matchMethod && matchSearch;
    });
  }

  get totalRevenue(): number {
    return this.payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  }

  get completedCount(): number {
    return this.payments.filter(p => p.status === 'completed').length;
  }

  get pendingCount(): number {
    return this.payments.filter(p => p.status === 'pending').length;
  }

  get failedCount(): number {
    return this.payments.filter(p => p.status === 'failed').length;
  }

  getStatusClass(status: string): string {
    return (
      {
        completed: 'badge-success',
        pending: 'badge-warning',
        failed: 'badge-danger',
        refunded: 'badge-muted'
      }[status] || 'badge-muted'
    );
  }

  getMethodIcon(method: string): string {
    const m: Record<string, string> = {
      card: '💳',
      paypal: '🅿️',
      bank_transfer: '🏦',
      mobile: '📱'
    };
    return m[method] || '💰';
  }

  viewDetail(payment: PaymentRecord): void {
    this.selectedPayment = payment;
    this.showDetail = true;
  }

  openRefund(payment: PaymentRecord): void {
    this.paymentToRefund = payment;
    this.showRefundModal = true;
  }

  confirmRefund(): void {
    if (this.paymentToRefund) {
      const idx = this.payments.findIndex(p => p.id === this.paymentToRefund!.id);
      if (idx >= 0) {
        this.payments[idx] = { ...this.payments[idx], status: 'refunded' };
      }
      this.showRefundModal = false;
      this.paymentToRefund = null;
    }
  }

  closeModal(): void {
    this.showDetail = false;
    this.showRefundModal = false;
    this.showAddModal = false;
    this.showRejectModal = false;
    this.selectedPayment = null;
    this.paymentToRefund = null;
    this.paymentToReject = null;
  }

  openAddModal(): void {
    this.newPayment = this.initNewPayment();
    this.showAddModal = true;
  }

  savePayment(): void {
    const p: PaymentRecord = {
      id: `PAY-${String(this.payments.length + 1).padStart(3, '0')}`,
      user: this.newPayment.user || 'Unknown User',
      email: this.newPayment.email || 'unknown@example.com',
      plan: this.newPayment.plan || 'Pro',
      amount: this.newPayment.amount || 0,
      currency: this.newPayment.currency || 'TND',
      method: (this.newPayment.method as PaymentRecord['method']) || 'card',
      status: (this.newPayment.status as PaymentRecord['status']) || 'completed',
      date: new Date().toISOString().split('T')[0],
      transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };
    this.payments.unshift(p);
    this.closeModal();
  }

  approve(p: PaymentRecord): void {
    const base = environment.paymentsAdminBaseUrl;
    const url = `${base}/api/admin/payments/${encodeURIComponent(p.id)}/approve`;
    this.http.patch(url, {}).subscribe({
      next: () => {
        p.status = 'completed';
        this.toast('✅ Paiement approuvé. Un email de confirmation a été envoyé (si SMTP est configuré).');
      },
      error: () => {
        this.fallbackApprove(p);
        this.toast('✅ Approuvé en local (serveur /backend indisponible ou ID différent).');
      }
    });
  }

  private fallbackApprove(p: PaymentRecord): void {
    p.status = 'completed';
  }

  openReject(p: PaymentRecord): void {
    this.paymentToReject = p;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  confirmReject(): void {
    if (!this.paymentToReject) {
      return;
    }
    const p = this.paymentToReject;
    const base = environment.paymentsAdminBaseUrl;
    const url = `${base}/api/admin/payments/${encodeURIComponent(p.id)}/reject`;
    this.http.patch(url, { reason: this.rejectReason || 'Non spécifié' }).subscribe({
      next: () => {
        p.status = 'failed';
        p.rejectionReason = this.rejectReason;
        this.toast('❌ Paiement rejeté — email de notification envoyé si SMTP configuré.');
        this.showRejectModal = false;
        this.paymentToReject = null;
      },
      error: () => {
        p.status = 'failed';
        p.rejectionReason = this.rejectReason;
        this.toast('❌ Rejet enregistré en local (API indisponible).');
        this.showRejectModal = false;
        this.paymentToReject = null;
      }
    });
  }

  private toast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => (this.toastMessage = ''), 5000);
  }
}
