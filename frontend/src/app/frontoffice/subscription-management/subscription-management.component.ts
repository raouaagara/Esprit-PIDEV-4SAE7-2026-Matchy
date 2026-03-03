import { Component, OnInit } from '@angular/core';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
  isCurrent: boolean;
  isPopular: boolean;
}

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class SubscriptionManagementComponent implements OnInit {
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  plans: Plan[] = [
    {
      id: 'free', name: 'Free', price: 0, currency: 'TND', period: '/month',
      icon: '🌱', color: '#64748b',
      description: 'Perfect to get started as a freelancer.',
      features: ['Up to 3 active bids', 'Basic profile', 'Community access', 'Standard support'],
      isCurrent: false, isPopular: false
    },
    {
      id: 'pro', name: 'Pro', price: 29, currency: 'TND', period: '/month',
      icon: '⚡', color: '#4f6ef7',
      description: 'For serious freelancers who want to grow.',
      features: ['Unlimited bids', 'Featured profile', 'Priority in search results', 'Analytics dashboard', 'Badge Pro', 'Priority support'],
      isCurrent: true, isPopular: true
    },
    {
      id: 'elite', name: 'Elite', price: 69, currency: 'TND', period: '/month',
      icon: '👑', color: '#f59e0b',
      description: 'For top freelancers and agencies.',
      features: ['Everything in Pro', 'Dedicated account manager', 'Team workspace', 'White-label proposals', 'API access', '24/7 support'],
      isCurrent: false, isPopular: false
    }
  ];

  currentPlan: Plan = this.plans[1];

  invoices = [
    { id: 'INV-001', date: '2025-02-01', amount: 29, status: 'paid', plan: 'Pro' },
    { id: 'INV-002', date: '2025-01-01', amount: 29, status: 'paid', plan: 'Pro' },
    { id: 'INV-003', date: '2024-12-01', amount: 29, status: 'paid', plan: 'Pro' },
  ];

  ngOnInit(): void {}

  getPrice(plan: Plan): number {
    if (this.billingCycle === 'yearly') return Math.round(plan.price * 10);
    return plan.price;
  }

  getPeriod(): string {
    return this.billingCycle === 'yearly' ? '/year' : '/month';
  }
}
