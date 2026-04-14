import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  SubscriptionPlan, Subscription, Payment, PaymentResponse,
  SubscriptionStatus, PaymentStatus, PaymentMethod, PaymentPayload, PaymentCurrency
} from '../models/subscription.model';
import { CurrencyService } from './currency.service';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  constructor(private readonly currencyService: CurrencyService) {
    this.loadFromLocalStorage();
  }

  private selectedPlanSubject = new BehaviorSubject<SubscriptionPlan | null>(null);
  selectedPlan$ = this.selectedPlanSubject.asObservable();

  private billingCycleSubject = new BehaviorSubject<'monthly' | 'yearly'>('monthly');
  billingCycle$ = this.billingCycleSubject.asObservable();

  private currentSubscriptionSubject = new BehaviorSubject<Subscription | null>(null);
  currentSubscription$ = this.currentSubscriptionSubject.asObservable();

  private readonly STORAGE_KEY = 'matchy_subscription_plans';

  private plans: SubscriptionPlan[] = [
    {
      id: 'free', name: 'Free', price: 0, currency: 'TND', billingCycle: 'monthly',
      description: 'Perfect to get started as a freelancer.',
      features: ['Up to 3 active bids', 'Basic profile', 'Community access', 'Standard support'],
      isPopular: false, isCurrent: false, color: '#6b7280', icon: '🌱'
    },
    {
      id: 'pro', name: 'Pro', price: 29, currency: 'TND', billingCycle: 'monthly',
      description: 'For serious freelancers who want to grow.',
      features: ['Unlimited bids', 'Featured profile', 'Priority in search results', 'Analytics dashboard', 'Badge Pro', 'Priority support'],
      isPopular: true, isCurrent: false, color: '#10b981', icon: '⚡'
    },
    {
      id: 'premium', name: 'Premium', price: 69, currency: 'TND', billingCycle: 'monthly',
      description: 'For top freelancers and agencies.',
      features: ['Everything in Pro', 'Dedicated account manager', 'Team workspace', 'White-label proposals', 'API access', '24/7 support'],
      isPopular: false, isCurrent: false, color: '#3b82f6', icon: '👑'
    }
  ];

  private saveToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.plans));
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          let loadedPlans: SubscriptionPlan[] = JSON.parse(stored);
          let modified = false;
          loadedPlans = loadedPlans.map(plan => {
            if (plan.id === 'elite') { plan.id = 'premium'; plan.name = 'Premium'; modified = true; }
            if (plan.isCurrent) { plan.isCurrent = false; modified = true; }
            return plan;
          });
          this.plans = loadedPlans;
          if (modified) this.saveToLocalStorage();
        } catch (e) { console.error('Error parsing stored plans', e); }
      }
    }
  }

  getPlans(billingCycle: 'monthly' | 'yearly'): SubscriptionPlan[] {
    return this.plans.map(plan => ({
      ...plan, billingCycle,
      price: billingCycle === 'yearly' ? Math.round(plan.price * 12 * 0.80) : plan.price
    }));
  }

  addPlan(plan: SubscriptionPlan): void { this.plans.push(plan); this.saveToLocalStorage(); }
  updatePlan(plan: SubscriptionPlan): void {
    const idx = this.plans.findIndex(p => p.id === plan.id);
    if (idx !== -1) { this.plans[idx] = plan; this.saveToLocalStorage(); }
  }
  deletePlan(id: string): void { this.plans = this.plans.filter(p => p.id !== id); this.saveToLocalStorage(); }
  setSelectedPlan(plan: SubscriptionPlan): void { this.selectedPlanSubject.next(plan); }
  getSelectedPlan(): SubscriptionPlan | null { return this.selectedPlanSubject.getValue(); }
  setBillingCycle(cycle: 'monthly' | 'yearly'): void { this.billingCycleSubject.next(cycle); }

  buildSubscription(plan: SubscriptionPlan, billingCycle: 'monthly' | 'yearly'): Subscription {
    const duration = billingCycle === 'monthly' ? 1 : 12;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + duration);
    return { plan, priceAtPurchase: plan.price, duration, startDate, endDate, status: 'PENDING' as SubscriptionStatus };
  }

  buildPayment(subscription: Subscription, paymentData: Partial<Payment>): Payment {
    const cur = this.currencyService.getCurrency() as PaymentCurrency;
    const amountTnd = paymentData.amountOriginalTnd ?? subscription.priceAtPurchase;
    return {
      subscription,
      amount: this.currencyService.convertFromTnd(amountTnd),
      amountOriginalTnd: amountTnd,
      currency: cur,
      method: paymentData.method || 'CARD',
      status: 'PENDING' as PaymentStatus,
      cardNumber: paymentData.cardNumber,
      expiryDate: paymentData.expiryDate,
      cvv: paymentData.cvv,
      cardholderName: paymentData.cardholderName,
      paypalEmail: paymentData.paypalEmail,
      mobileProvider: paymentData.mobileProvider,
      mobilePhone: paymentData.mobilePhone,
      mobileTransactionCode: paymentData.mobileTransactionCode,
      bankName: paymentData.bankName,
      rib: paymentData.rib,
      accountHolder: paymentData.accountHolder,
      transferReference: paymentData.transferReference,
      promoCode: paymentData.promoCode,
      discountAmountTnd: paymentData.discountAmountTnd,
      lastFourDigits: paymentData.cardNumber ? paymentData.cardNumber.replace(/\D/g, '').slice(-4) : undefined,
      transactionDate: new Date()
    };
  }

  private toApiMethod(m: PaymentMethod): PaymentPayload['paymentMethod'] {
    const map: Record<PaymentMethod, PaymentPayload['paymentMethod']> = {
      CARD: 'card', PAYPAL: 'paypal', MOBILE: 'mobile', BANK_TRANSFER: 'bank_transfer'
    };
    return map[m] ?? 'card';
  }

  processPayment(payment: Payment, userId: string): Observable<PaymentResponse> {
    const ref = `TXN-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const payload: PaymentPayload = {
      planId: String(payment.subscription?.plan?.id ?? ''),
      amount: payment.amount,
      currency: payment.currency as PaymentCurrency,
      paymentMethod: this.toApiMethod(payment.method),
      userId, transactionRef: ref, promoCode: payment.promoCode
    };
    console.log('[PaymentPayload]', payload);
    return of({
      success: true,
      message: 'Payment successful! Your subscription is now active.',
      paymentId: 'PAY-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      transactionId: ref, transactionRef: ref
    }).pipe(delay(1500));
  }

  activateSubscription(subscription: Subscription): Subscription {
    const activated: Subscription = { ...subscription, id: Math.floor(Math.random() * 1000000), status: 'ACTIVE' as SubscriptionStatus };
    this.currentSubscriptionSubject.next(activated);
    return activated;
  }

  getCurrentPlan(): SubscriptionPlan {
    return this.plans.find(p => p.isCurrent) || this.plans[0];
  }
}
