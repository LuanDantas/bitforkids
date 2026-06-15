import { api } from './client';

export interface CheckoutResult {
  transaction: { id: string; amountCents: number; status: string };
  enrollmentId?: string;
  cashbackEarnedCents?: number;
}

export interface CashbackBalance {
  availableCents: number;
  totalEarnedCents: number;
  entries: { id: string; amountCents: number; type: 'EARN' | 'REDEEM' }[];
}

export const paymentsApi = {
  checkout(courseId: string, paymentMethodId?: string): Promise<CheckoutResult> {
    return api.post<CheckoutResult>('/checkout', { courseId, paymentMethodId });
  },
  transactions(): Promise<unknown[]> {
    return api.get('/me/transactions');
  },
  cashback(): Promise<CashbackBalance> {
    return api.get<CashbackBalance>('/me/cashback');
  },
};
