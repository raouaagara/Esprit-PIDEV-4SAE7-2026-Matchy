import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface PromoValidationResult {
  valid: boolean;
  discountType?: 'percent' | 'fixed';
  discountValue?: number;
  message: string;
}

/** Codes promo mock — à brancher sur l’API POST /api/promo-codes/validate */
@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  private readonly mockCodes: Record<
    string,
    { discountType: 'percent' | 'fixed'; discountValue: number; plans: string[] | 'all' }
  > = {
    LAUNCH50: { discountType: 'percent', discountValue: 50, plans: 'all' },
    SAVE10TND: { discountType: 'fixed', discountValue: 10, plans: 'all' },
    PROONLY20: { discountType: 'percent', discountValue: 20, plans: ['pro'] }
  };

  validate(code: string, planId: string, amountTnd: number): Observable<PromoValidationResult> {
    const c = code.trim().toUpperCase();
    if (!c) {
      return of({ valid: false, message: 'Saisissez un code' }).pipe(delay(300));
    }
    const rule = this.mockCodes[c];
    if (!rule) {
      return of({ valid: false, message: 'Code invalide ou expiré' }).pipe(delay(400));
    }
    const okPlan = rule.plans === 'all' || rule.plans.includes(String(planId).toLowerCase());
    if (!okPlan) {
      return of({ valid: false, message: 'Ce code ne s’applique pas à ce plan' }).pipe(delay(400));
    }
    if (amountTnd <= 0) {
      return of({ valid: false, message: 'Montant incompatible' }).pipe(delay(200));
    }
    return of({
      valid: true,
      discountType: rule.discountType,
      discountValue: rule.discountValue,
      message:
        rule.discountType === 'percent'
          ? `-${rule.discountValue}% appliqué`
          : `-${rule.discountValue} TND appliqué`
    }).pipe(delay(500));
  }

  applyDiscount(amountTnd: number, r: PromoValidationResult): number {
    if (!r.valid || r.discountValue == null || !r.discountType) {
      return amountTnd;
    }
    if (r.discountType === 'percent') {
      return Math.max(0, Math.round(amountTnd * (1 - r.discountValue / 100) * 100) / 100);
    }
    return Math.max(0, Math.round((amountTnd - r.discountValue) * 100) / 100);
  }
}
