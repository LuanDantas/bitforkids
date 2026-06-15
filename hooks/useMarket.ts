import { useCallback, useEffect, useState } from 'react';
import { marketApi, MarketOverviewDto } from '@/services/api/market';

export interface MarketOverview {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  activeCryptos: number;
  exchanges: number;
  defiTvl: number;
}

export interface TopCrypto {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number; // bilhões
  volume: number; // bilhões
  rank: number;
  logo: string;
  color: string;
}

// Identidade visual local por símbolo (a API traz iconUrl da CoinGecko).
const LOGOS: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  SOL: '◎',
  BNB: 'B',
  XRP: 'X',
  ADA: 'A',
  USDT: '₮',
  USDC: '$',
  DOGE: 'Ð',
};
const COLORS: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#9945FF',
  BNB: '#F3BA2F',
  XRP: '#23292F',
  ADA: '#0033AD',
  USDT: '#26A17B',
  USDC: '#2775CA',
};

export function useMarket() {
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [topCryptos, setTopCryptos] = useState<TopCrypto[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const [ov, assets] = await Promise.all([
        marketApi.overview(),
        marketApi.assets(),
      ]);
      setOverview(mapOverview(ov));
      setTopCryptos(
        assets.slice(0, 10).map((a, i) => ({
          id: i + 1,
          name: a.name,
          symbol: a.symbol,
          price: a.priceCents / 100,
          change24h: a.change24h,
          change7d: a.change7d,
          marketCap: a.marketCap / 1e9,
          volume: a.volume / 1e9,
          rank: a.rank,
          logo: LOGOS[a.symbol] ?? a.symbol.charAt(0),
          color: COLORS[a.symbol] ?? a.color ?? '#6366f1',
        }))
      );
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { overview, topCryptos, error, reload: load };
}

function round(n: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function mapOverview(ov: MarketOverviewDto): MarketOverview {
  return {
    totalMarketCap: round(ov.totalMarketCap, 2),
    totalVolume: round(ov.totalVolume, 1),
    btcDominance: round(ov.btcDominance, 1),
    activeCryptos: ov.activeCryptos,
    exchanges: ov.exchanges,
    defiTvl: round(ov.defiTvl, 1),
  };
}
