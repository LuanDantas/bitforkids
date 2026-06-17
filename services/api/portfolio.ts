import { api } from './client';

export type TradeSide = 'BUY' | 'SELL';

export interface PortfolioAsset {
  symbol: string;
  name: string;
  rank: number;
  color?: string | null;
  iconUrl?: string | null;
}

export interface Holding {
  walletId: string;
  assetSymbol: string;
  quantity: string; // Decimal serializado
  avgPriceCents: number;
  investmentCents: number;
}

export interface Wallet {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  holdings: Holding[];
}

export interface PortfolioTransaction {
  id: string;
  walletId: string;
  assetSymbol: string;
  side: TradeSide;
  quantity: string;
  priceCents: number;
  occurredAt: string;
}

export interface CreateTransactionInput {
  assetSymbol: string;
  side: TradeSide;
  quantity: number;
  priceCents: number;
  occurredAt?: string;
}

export interface PortfolioSummary {
  totalInvestmentCents: number;
  byAsset: { assetSymbol: string; quantity: string; investmentCents: number }[];
  wallets: {
    walletId: string;
    name: string;
    investmentCents: number;
    holdings: {
      assetSymbol: string;
      quantity: string;
      avgPriceCents: number;
      investmentCents: number;
    }[];
  }[];
}

export const portfolioApi = {
  listAssets(): Promise<PortfolioAsset[]> {
    return api.get<PortfolioAsset[]>('/assets', { auth: false });
  },
  listWallets(): Promise<Wallet[]> {
    return api.get<Wallet[]>('/me/wallets');
  },
  createWallet(name: string): Promise<Wallet> {
    return api.post<Wallet>('/me/wallets', { name });
  },
  updateWallet(id: string, name: string): Promise<Wallet> {
    return api.patch<Wallet>(`/me/wallets/${id}`, { name });
  },
  removeWallet(id: string): Promise<{ deleted: boolean }> {
    return api.delete(`/me/wallets/${id}`);
  },
  listHoldings(walletId: string): Promise<Holding[]> {
    return api.get<Holding[]>(`/me/wallets/${walletId}/holdings`);
  },
  createTransaction(
    walletId: string,
    input: CreateTransactionInput
  ): Promise<PortfolioTransaction> {
    return api.post<PortfolioTransaction>(
      `/me/wallets/${walletId}/transactions`,
      input
    );
  },
  summary(): Promise<PortfolioSummary> {
    return api.get<PortfolioSummary>('/me/portfolio/summary');
  },
  history(days = 180): Promise<PortfolioHistory> {
    return api.get<PortfolioHistory>(`/me/portfolio/history?days=${days}`);
  },
};

export interface HistoryPoint {
  date: string;
  investmentCents: number;
  valueCents: number;
}
export interface PortfolioHistory {
  totals: HistoryPoint[];
  wallets: { walletId: string; points: HistoryPoint[] }[];
}
