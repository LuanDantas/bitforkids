import { useCallback, useEffect, useState } from 'react';
import { marketApi } from '@/services/api/market';
import { portfolioApi, PortfolioHistory } from '@/services/api/portfolio';

const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const labelOf = (dateKey: string) => {
  const m = parseInt(dateKey.slice(5, 7), 10);
  return MONTHS_PT[m - 1] ?? dateKey.slice(5);
};
const seriesToChart = (pts: { date: string; valueCents: number }[]) =>
  pts.map((p) => ({ label: labelOf(p.date), value: p.valueCents / 100 }));

export interface PortfolioWalletVM {
  id: string;
  name: string;
  totalValue: number;
  change: number; // %
  profit: number;
  chartData: { label: string; value: number }[];
}
export interface PortfolioPositionVM {
  id: string;
  crypto: string;
  currentPrice: number;
  quantity: number;
  investment: number;
  balance: number;
  avgPrice: number;
  profit: number;
  profitPercent: number;
  trend: 'high' | 'low' | 'neutral';
}
export interface PortfolioStatsVM {
  totalAportes: number;
  totalBalance: number;
  totalProfit: number;
  profitChange: number;
  depositsChart: { label: string; value: number }[];
  balanceChart: { label: string; value: number }[];
  profitChart: { label: string; value: number }[];
}

export interface UsePortfolio {
  loading: boolean;
  error: boolean;
  wallets: PortfolioWalletVM[];
  positions: PortfolioPositionVM[];
  stats: PortfolioStatsVM;
  reload: () => Promise<void>;
}

const EMPTY_STATS: PortfolioStatsVM = {
  totalAportes: 0,
  totalBalance: 0,
  totalProfit: 0,
  profitChange: 0,
  depositsChart: [],
  balanceChart: [],
  profitChart: [],
};

export function usePortfolio(): UsePortfolio {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wallets, setWallets] = useState<PortfolioWalletVM[]>([]);
  const [positions, setPositions] = useState<PortfolioPositionVM[]>([]);
  const [stats, setStats] = useState<PortfolioStatsVM>(EMPTY_STATS);

  const load = useCallback(async () => {
    try {
      const [summary, assets, history] = await Promise.all([
        portfolioApi.summary(),
        marketApi.assets(),
        portfolioApi.history(180).catch<PortfolioHistory>(() => ({ totals: [], wallets: [] })),
      ]);
      const priceById = new Map(assets.map((a) => [a.symbol, a.priceCents / 100]));
      const change24hById = new Map(assets.map((a) => [a.symbol, a.change24h]));
      const histByWallet = new Map(history.wallets.map((w) => [w.walletId, w.points]));

      // Carteiras
      const walletVMs: PortfolioWalletVM[] = summary.wallets.map((w) => {
        const value = w.holdings.reduce(
          (s, h) => s + Number(h.quantity) * (priceById.get(h.assetSymbol) ?? 0),
          0,
        );
        const investment = w.investmentCents / 100;
        const profit = value - investment;
        return {
          id: w.walletId,
          name: w.name,
          totalValue: value,
          change: investment > 0 ? (profit / investment) * 100 : 0,
          profit,
          chartData: seriesToChart(histByWallet.get(w.walletId) ?? []),
        };
      });

      // Posições agregadas por ativo
      const positionVMs: PortfolioPositionVM[] = summary.byAsset.map((a) => {
        const qty = Number(a.quantity);
        const price = priceById.get(a.assetSymbol) ?? 0;
        const investment = a.investmentCents / 100;
        const balance = qty * price;
        const profit = balance - investment;
        const profitPercent = investment > 0 ? (profit / investment) * 100 : 0;
        const ch = change24hById.get(a.assetSymbol) ?? 0;
        return {
          id: a.assetSymbol,
          crypto: a.assetSymbol,
          currentPrice: price,
          quantity: qty,
          investment,
          balance,
          avgPrice: qty > 0 ? investment / qty : 0,
          profit,
          profitPercent,
          trend: ch > 1 ? 'high' : ch < -1 ? 'low' : 'neutral',
        };
      });

      // Stats agregados + séries
      const totalAportes = summary.totalInvestmentCents / 100;
      const totalBalance = positionVMs.reduce((s, p) => s + p.balance, 0);
      const totalProfit = totalBalance - totalAportes;
      setStats({
        totalAportes,
        totalBalance,
        totalProfit,
        profitChange: totalAportes > 0 ? (totalProfit / totalAportes) * 100 : 0,
        depositsChart: history.totals.map((p) => ({ label: labelOf(p.date), value: p.investmentCents / 100 })),
        balanceChart: seriesToChart(history.totals),
        profitChart: history.totals.map((p) => ({
          label: labelOf(p.date),
          value: (p.valueCents - p.investmentCents) / 100,
        })),
      });
      setWallets(walletVMs);
      setPositions(positionVMs);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, error, wallets, positions, stats, reload: load };
}
