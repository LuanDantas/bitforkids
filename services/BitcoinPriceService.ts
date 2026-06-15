import * as Notifications from 'expo-notifications';
import { api } from '@/services/api/client';

export interface BitcoinPriceData {
  price: number;
  variation24h: number;
  variationPercent: number;
  lastUpdate: Date;
}

export interface BitcoinPriceService {
  getCurrentPrice: () => Promise<BitcoinPriceData>;
  checkPriceVariation: (threshold: number) => Promise<boolean>;
  startPriceMonitoring: () => void;
  stopPriceMonitoring: () => void;
}

class BitcoinPriceServiceImpl implements BitcoinPriceService {
  private monitoringInterval: ReturnType<typeof setInterval> | null = null;
  private lastPrice: number | null = null;

  async getCurrentPrice(): Promise<BitcoinPriceData> {
    // 1) Backend BitForKids (cacheia o CoinGecko via cron).
    try {
      const data = await api.get<{
        priceBrlCents: number;
        variation24h: number;
        variationPercent: number;
        capturedAt: string;
      }>('/market/bitcoin/price', { auth: false });
      if (data?.priceBrlCents) {
        return {
          price: data.priceBrlCents / 100,
          variation24h: data.variation24h,
          variationPercent: data.variationPercent,
          lastUpdate: data.capturedAt ? new Date(data.capturedAt) : new Date(),
        };
      }
    } catch {
      // segue para o fallback direto
    }

    // 2) Fallback: CoinGecko direto.
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true'
      );
      const data = await response.json();
      const variation24h = data.bitcoin.brl_24h_change;
      return {
        price: data.bitcoin.brl,
        variation24h,
        variationPercent: variation24h,
        lastUpdate: new Date(),
      };
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      // 3) Fallback estático.
      return {
        price: 350000,
        variation24h: 5000,
        variationPercent: 1.45,
        lastUpdate: new Date(),
      };
    }
  }

  async checkPriceVariation(threshold: number = 5): Promise<boolean> {
    const currentPrice = await this.getCurrentPrice();

    if (this.lastPrice === null) {
      this.lastPrice = currentPrice.price;
      return false;
    }

    const variation =
      ((currentPrice.price - this.lastPrice) / this.lastPrice) * 100;

    if (Math.abs(variation) >= threshold) {
      // Enviar notificação
      await this.scheduleBitcoinPriceNotification(
        currentPrice.price,
        variation
      );

      this.lastPrice = currentPrice.price;
      return true;
    }

    return false;
  }

  private async scheduleBitcoinPriceNotification(
    price: number,
    variation: number
  ): Promise<void> {
    const title = 'Bitcoin Price Alert';
    const body =
      variation > 0
        ? `📈 Bitcoin subiu ${variation.toFixed(
            2
          )}% - Agora R$ ${price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`
        : `📉 Bitcoin caiu ${Math.abs(variation).toFixed(
            2
          )}% - Agora R$ ${price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { price, variation, type: 'bitcoin_price' },
      },
      trigger: null, // Send immediately
    });
  }

  startPriceMonitoring(): void {
    if (this.monitoringInterval) {
      return; // Já está monitorando
    }

    // Verificar variação a cada 30 minutos
    this.monitoringInterval = setInterval(async () => {
      await this.checkPriceVariation(5);
    }, 30 * 60 * 1000);

    // Agendar notificações diárias
    this.scheduleDailyNotifications();
  }

  stopPriceMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  private async scheduleDailyNotifications(): Promise<void> {
    const currentPrice = await this.getCurrentPrice();

    // Agendar notificação da manhã
    await this.scheduleDailyBitcoinPrice(currentPrice.price, true);

    // Agendar notificação da noite
    await this.scheduleDailyBitcoinPrice(currentPrice.price, false);

    // Agendar motivação diária
    await this.scheduleBitcoinMotivation();
  }

  private async scheduleDailyBitcoinPrice(
    price: number,
    isMorning: boolean = true
  ): Promise<void> {
    const title = isMorning
      ? '🌅 Preço do Bitcoin - Manhã'
      : '🌙 Preço do Bitcoin - Noite';
    const body = `Bitcoin está cotado a R$ ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })}`;

    // Schedule for next day at 8 AM or 8 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(isMorning ? 8 : 20, 0, 0, 0);

    const secondsFromNow = Math.floor((tomorrow.getTime() - Date.now()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          price,
          type: 'daily_bitcoin_price',
          time: isMorning ? 'morning' : 'evening',
        },
      },
      trigger: null, // Send immediately for testing
    });
  }

  private async scheduleBitcoinMotivation(): Promise<void> {
    const motivations = [
      '💡 Bitcoin é liberdade financeira! Invista no seu futuro hoje.',
      '🚀 Não espere o momento perfeito. O momento é agora!',
      '💰 Cada satoshi conta. Comece sua jornada Bitcoin hoje.',
      '🔒 Bitcoin é a reserva de valor do futuro. Seja parte dele.',
      '⚡ Liberte-se do sistema bancário tradicional com Bitcoin.',
      '🎯 Diversifique seu portfólio com Bitcoin e proteja seu patrimônio.',
      '🌟 Bitcoin não é apenas uma moeda, é uma revolução.',
      '💎 HODL com sabedoria. Bitcoin é para o longo prazo.',
      '🌍 Bitcoin conecta o mundo sem fronteiras bancárias.',
      '🔥 Cada dia sem Bitcoin é um dia perdido na revolução financeira.',
    ];

    const randomMotivation =
      motivations[Math.floor(Math.random() * motivations.length)];

    // Schedule for tomorrow at 9 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    const secondsFromNow = Math.floor((tomorrow.getTime() - Date.now()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Motivação Bitcoin',
        body: randomMotivation,
        data: { type: 'bitcoin_motivation' },
      },
      trigger: null, // Send immediately for testing
    });
  }
}

export const bitcoinPriceService = new BitcoinPriceServiceImpl();
