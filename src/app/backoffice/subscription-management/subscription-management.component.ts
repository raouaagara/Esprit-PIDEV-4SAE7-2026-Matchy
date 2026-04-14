import { Component, OnInit } from '@angular/core';
import { SubscriptionPlan, Subscription as FrontSubscription, PaymentMethod } from '../../frontoffice/models/subscription.model';
import { SubscriptionService } from '../../frontoffice/services/subscription.service';

interface Subscription {
  id: number;
  user: string;
  email: string;
  plan: string;
  amount: number;
  currency: string;
  startDate: string;
  nextBilling: string;
  status: string;
}

@Component({
  selector: 'app-bo-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class BoSubscriptionManagementComponent implements OnInit {
  searchTerm = '';
  selectedPlanFilter = 'all';
  plans = ['all', 'free', 'pro', 'elite'];
  planPrices: Record<string, number> = { free: 0, pro: 29, elite: 69 };

  subscriptions: Subscription[] = [
    { id: 1, user: 'Karim Mansouri', email: 'karim@gmail.com', plan: 'pro', amount: 29, currency: 'TND', startDate: '2025-01-01', nextBilling: '2025-03-01', status: 'active' },
    { id: 2, user: 'Sara Belhaj', email: 'sara@gmail.com', plan: 'elite', amount: 69, currency: 'TND', startDate: '2025-02-01', nextBilling: '2025-03-01', status: 'active' },
    { id: 3, user: 'Ahmed Riahi', email: 'ahmed@gmail.com', plan: 'free', amount: 0, currency: 'TND', startDate: '2025-01-15', nextBilling: '-', status: 'active' },
    { id: 4, user: 'Yasmine Karoui', email: 'yasmine@gmail.com', plan: 'pro', amount: 29, currency: 'TND', startDate: '2024-12-01', nextBilling: '2025-03-01', status: 'cancelled' },
  ];

  private nextId = 5;

  // Modal states
  showViewModal = false;
  showDeleteModal = false;
  showAddEditModal = false;

  // Data models
  selectedSub: Subscription | null = null;
  subToDelete: Subscription | null = null;

  // Form State
  isEditing = false;
  subForm: Subscription = this.getEmptySubscription();

  constructor(private subscriptionService: SubscriptionService) { }

  get filteredSubscriptions(): Subscription[] {
    return this.subscriptions.filter(s => {
      const matchPlan = this.selectedPlanFilter === 'all' || s.plan === this.selectedPlanFilter;
      const matchSearch = !this.searchTerm ||
        s.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchPlan && matchSearch;
    });
  }

  get totalMRR(): number {
    return this.subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  }

  get activeCount(): number {
    return this.subscriptions.filter(s => s.status === 'active').length;
  }

  get cancelledCount(): number {
    return this.subscriptions.filter(s => s.status === 'cancelled').length;
  }

  ngOnInit(): void { }

  getPlanClass(plan: string): string {
    return { free: 'muted', pro: 'primary', elite: 'warning' }[plan] || 'primary';
  }

  private getEmptySubscription(): Subscription {
    return {
      id: 0,
      user: '',
      email: '',
      plan: 'pro',
      amount: 29,
      currency: 'TND',
      startDate: new Date().toISOString().split('T')[0],
      nextBilling: '',
      status: 'active'
    };
  }

  // --- Actions ---
  viewSub(sub: Subscription): void {
    this.selectedSub = sub;
    this.showViewModal = true;
  }

  openAddSubscription(): void {
    this.isEditing = false;
    this.subForm = this.getEmptySubscription();
    this.showAddEditModal = true;
  }

  openEditSubscription(sub: Subscription): void {
    this.isEditing = true;
    this.subForm = { ...sub };
    this.showAddEditModal = true;
  }

  onPlanChange(): void {
    this.subForm.amount = this.planPrices[this.subForm.plan] || 0;
    if (this.subForm.plan === 'free') {
      this.subForm.nextBilling = '-';
    } else if (this.subForm.nextBilling === '-') {
      this.subForm.nextBilling = '';
    }
  }

  saveSubscription(): void {
    if (this.isEditing) {
      const index = this.subscriptions.findIndex(s => s.id === this.subForm.id);
      if (index !== -1) {
        this.subscriptions[index] = { ...this.subForm };
      }
    } else {
      this.subForm.id = this.nextId++;
      this.subscriptions.push({ ...this.subForm });
    }
    this.closeModal();
  }

  // --- Delete ---
  confirmDelete(sub: Subscription): void {
    this.subToDelete = sub;
    this.showDeleteModal = true;
  }

  deleteSub(): void {
    if (this.subToDelete) {
      this.subscriptions = this.subscriptions.filter(s => s.id !== this.subToDelete!.id);
      this.showDeleteModal = false;
      this.subToDelete = null;
    }
  }

  // --- Close ---
  closeModal(): void {
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.showAddEditModal = false;
    this.selectedSub = null;
    this.subToDelete = null;
  }

  // --- Export ---
  exportCSV(): void {
    const headers = ['ID', 'User', 'Email', 'Plan', 'Amount', 'Currency', 'Start Date', 'Next Billing', 'Status'];
    const rows = this.filteredSubscriptions.map(s =>
      [s.id, s.user, s.email, s.plan, s.amount, s.currency, s.startDate, s.nextBilling, s.status].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    this.downloadFile(csv, 'subscriptions.csv', 'text/csv');
  }

  exportExcel(): void {
    const headers = ['ID', 'User', 'Email', 'Plan', 'Amount', 'Currency', 'Start Date', 'Next Billing', 'Status'];
    let xml = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
    xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"';
    xml += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">';
    xml += '<Worksheet ss:Name="Subscriptions"><Table>';
    xml += '<Row>' + headers.map(h => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join('') + '</Row>';
    this.filteredSubscriptions.forEach(s => {
      xml += '<Row>';
      xml += `<Cell><Data ss:Type="Number">${s.id}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.user}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.email}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.plan}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="Number">${s.amount}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.currency}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.startDate}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.nextBilling}</Data></Cell>`;
      xml += `<Cell><Data ss:Type="String">${s.status}</Data></Cell>`;
      xml += '</Row>';
    });
    xml += '</Table></Worksheet></Workbook>';
    this.downloadFile(xml, 'subscriptions.xls', 'application/vnd.ms-excel');
  }

  private downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
