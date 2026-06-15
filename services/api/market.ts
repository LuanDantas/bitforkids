import { api } from './client';

export interface MarketOverviewDto {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  activeCryptos: number;
  exchanges: number;
  defiTvl: number;
  capturedAt: string | null;
}

export interface MarketAssetDto {
  symbol: string;
  name: string;
  rank: number;
  iconUrl?: string | null;
  color?: string | null;
  priceCents: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume: number;
}

export const marketApi = {
  overview(): Promise<MarketOverviewDto> {
    return api.get<MarketOverviewDto>('/market/overview', { auth: false });
  },
  assets(): Promise<MarketAssetDto[]> {
    return api.get<MarketAssetDto[]>('/market/assets', { auth: false });
  },
};
