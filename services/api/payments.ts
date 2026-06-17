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

export type TransactionType = 'PURCHASE' | 'CASHBACK' | 'REFUND' | 'WITHDRAWAL';
export type TransactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'REFUNDED'
  | 'FAILED';

export interface TransactionItem {
  id: string;
  type: TransactionType;
  description: string;
  amountCents: number;
  currency: string;
  status: TransactionStatus;
  courseId?: string | null;
  paymentMethodId?: string | null;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  holderName: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  gateway: string;
  gatewayToken?: string | null;
}

export interface CreatePaymentMethodInput {
  brand: string;
  last4: string;
  holderName: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  gatewayToken?: string;
}

export const paymentsApi = {
  checkout(courseId: string, paymentMethodId?: string): Promise<CheckoutResult> {
    return api.post<CheckoutResult>('/checkout', { courseId, paymentMethodId });
  },
  transactions(): Promise<TransactionItem[]> {
    return api.get<TransactionItem[]>('/me/transactions');
  },
  cashback(): Promise<CashbackBalance> {
    return api.get<CashbackBalance>('/me/cashback');
  },
  withdrawCashback(amountCents: number): Promise<unknown> {
    return api.post('/me/cashback/withdraw', { amountCents });
  },
  // Métodos de pagamento (cartões). Criação real será via Stripe (token); por ora
  // o backend guarda apenas metadados (bandeira/últimos 4/validade) + gatewayToken.
  listPaymentMethods(): Promise<PaymentMethod[]> {
    return api.get<PaymentMethod[]>('/me/payment-methods');
  },
  createPaymentMethod(input: CreatePaymentMethodInput): Promise<PaymentMethod> {
    return api.post<PaymentMethod>('/me/payment-methods', input);
  },
  removePaymentMethod(id: string): Promise<unknown> {
    return api.delete(`/me/payment-methods/${id}`);
  },
  setDefaultPaymentMethod(id: string): Promise<unknown> {
    return api.post(`/me/payment-methods/${id}/default`, {});
  },
};
