import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from '../../frontoffice/services/payment.service';
import { Payment, PaymentHistory } from '../../frontoffice/models/models';

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})
export class PaymentDashboardComponent implements OnInit {
  @Input() userId!: number;
  @Input() userType!: 'FREELANCER' | 'COMPANY';

  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  paymentHistory?: PaymentHistory;
  selectedStatus = 'ALL';
  loading = false;
  error = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    if (this.userId && this.userType) {
      this.loadPayments();
    }
  }

  loadPayments() {
    this.loading = true;
    this.error = '';

    const historyObservable = this.userType === 'COMPANY'
      ? this.paymentService.getCompanyPaymentHistory(this.userId)
      : this.paymentService.getFreelancerPaymentHistory(this.userId);

    historyObservable.subscribe({
      next: (history) => {
        this.paymentHistory = history;
        this.payments = history.payments || [];
        this.filteredPayments = [...this.payments];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading payments:', err);
        this.error = 'Failed to load payment data';
        this.loading = false;
      }
    });
  }

  filterPayments() {
    if (this.selectedStatus === 'ALL') {
      this.filteredPayments = [...this.payments];
    } else {
      this.filteredPayments = this.payments.filter(
        p => p.status === this.selectedStatus
      );
    }
  }

  getTotalEscrow(): number {
    return this.payments
      .filter(p => p.status === 'IN_ESCROW')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'PENDING': 'warning',
      'IN_ESCROW': 'info',
      'PAID': 'success',
      'OVERDUE': 'danger',
      'CANCELLED': 'secondary'
    };
    return statusMap[status] || 'secondary';
  }

  moveToEscrow(paymentId: number) {
    if (!confirm('Move this payment to escrow? The funds will be held until work is approved.')) {
      return;
    }

    this.paymentService.moveToEscrow(paymentId).subscribe({
      next: () => {
        alert('Payment moved to escrow successfully!');
        this.loadPayments();
      },
      error: (err) => {
        console.error('Error moving to escrow:', err);
        alert('Failed to move payment to escrow');
      }
    });
  }

  releasePayment(paymentId: number) {
    if (!confirm('Release this payment to the freelancer? This action cannot be undone.')) {
      return;
    }

    this.paymentService.releaseFromEscrow(paymentId).subscribe({
      next: () => {
        alert('Payment released successfully!');
        this.loadPayments();
      },
      error: (err) => {
        console.error('Error releasing payment:', err);
        alert('Failed to release payment');
      }
    });
  }

  generateInvoice(paymentId: number) {
    this.paymentService.generateInvoice(paymentId).subscribe({
      next: (invoice) => {
        alert(`Invoice #${invoice.invoiceNumber} generated successfully!`);
        this.loadPayments();
      },
      error: (err) => {
        console.error('Error generating invoice:', err);
        alert('Failed to generate invoice');
      }
    });
  }

  downloadInvoice(paymentId: number) {
    const payment = this.payments.find(p => p.id === paymentId);
    if (!payment || !payment.invoiceNumber) return;

    // In a real implementation, you would get the invoice ID from the payment
    // For now, we'll use the payment ID as a placeholder
    this.paymentService.downloadInvoice(paymentId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${payment.invoiceNumber}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading invoice:', err);
        alert('Failed to download invoice');
      }
    });
  }

  viewDetails(payment: Payment) {
    // TODO: Open payment details modal
    console.log('View payment details:', payment);
    alert(`Payment Details:\n\nMilestone: ${payment.milestoneTitle}\nAmount: ${payment.amount} TND\nStatus: ${payment.status}`);
  }
}
