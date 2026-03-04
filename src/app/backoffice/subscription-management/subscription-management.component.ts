import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bo-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class BoSubscriptionManagementComponent implements OnInit {
  searchTerm = '';
  selectedPlan = 'all';
  plans = ['all', 'free', 'pro', 'elite'];

  subscriptions = [
    { id: 1, user: 'Karim Mansouri', email: 'karim@gmail.com', plan: 'pro', amount: 29, currency: 'TND', startDate: '2025-01-01', nextBilling: '2025-03-01', status: 'active' },
    { id: 2, user: 'Sara Belhaj', email: 'sara@gmail.com', plan: 'elite', amount: 69, currency: 'TND', startDate: '2025-02-01', nextBilling: '2025-03-01', status: 'active' },
    { id: 3, user: 'Ahmed Riahi', email: 'ahmed@gmail.com', plan: 'free', amount: 0, currency: 'TND', startDate: '2025-01-15', nextBilling: '-', status: 'active' },
    { id: 4, user: 'Yasmine Karoui', email: 'yasmine@gmail.com', plan: 'pro', amount: 29, currency: 'TND', startDate: '2024-12-01', nextBilling: '2025-03-01', status: 'cancelled' },
  ];

  get filteredSubscriptions() {
    return this.subscriptions.filter(s => {
      const matchPlan = this.selectedPlan === 'all' || s.plan === this.selectedPlan;
      const matchSearch = !this.searchTerm || s.user.toLowerCase().includes(this.searchTerm.toLowerCase()) || s.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchPlan && matchSearch;
    });
  }

  get totalMRR(): number {
    return this.subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  }

  ngOnInit(): void {}

  getPlanClass(plan: string): string {
    return { free: 'muted', pro: 'primary', elite: 'warning' }[plan] || 'primary';
  }
}
