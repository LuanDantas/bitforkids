import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarket } from '@/hooks/useMarket';
import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Globe,
  Clock,
  Star,
  Eye,
  Zap,
  Target,
  Layers,
  LineChart as LineChartIcon,
  CandlestickChart as CandlestickIcon,
  AreaChart,
  Volume2,
  Settings,
  Maximize2,
  TrendingUp as TrendIcon,
} from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import PieChart from '@/components/charts/PieChart';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';
import VerticalBarChart from '@/components/charts/VerticalBarChart';
import LineChart from '@/components/charts/LineChart';
import CandlestickChart from '@/components/charts/CandlestickChart';

const { width } = Dimensions.get('window');

export default function IndicesScreen() {
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedChart, setSelectedChart] = useState('BTC');
  const [chartType, setChartType] = useState('line');
  const [showAdvancedCharts, setShowAdvancedCharts] = useState(false);

  const timeframes = ['1h', '24h', '7d', '30d', '1y'];

  const { overview: apiOverview, topCryptos: apiTopCryptos, reload } = useMarket();

  // Fallback local enquanto carrega / se a API estiver indisponível.
  const marketOverview = apiOverview ?? {
    totalMarketCap: 2.1,
    totalVolume: 89.5,
    btcDominance: 52.3,
    activeCryptos: 2847,
    exchanges: 756,
    defiTvl: 45.2,
  };

  const FALLBACK_TOP_CRYPTOS = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 73250.45,
      change24h: 12.5,
      change7d: 8.3,
      marketCap: 1.44,
      volume: 28.5,
      rank: 1,
      logo: '₿',
      color: '#F7931A',
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3845.67,
      change24h: 8.2,
      change7d: 15.7,
      marketCap: 462.3,
      volume: 15.2,
      rank: 2,
      logo: 'Ξ',
      color: '#627EEA',
    },
    {
      id: 3,
      name: 'Solana',
      symbol: 'SOL',
      price: 198.34,
      change24h: -3.4,
      change7d: 22.1,
      marketCap: 93.8,
      volume: 4.7,
      rank: 3,
      logo: '◎',
      color: '#9945FF',
    },
    {
      id: 4,
      name: 'BNB',
      symbol: 'BNB',
      price: 645.23,
      change24h: 5.8,
      change7d: -2.1,
      marketCap: 93.2,
      volume: 2.1,
      rank: 4,
      logo: 'B',
      color: '#F3BA2F',
    },
    {
      id: 5,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.34,
      change24h: -1.2,
      change7d: 45.6,
      marketCap: 133.7,
      volume: 8.9,
      rank: 5,
      logo: 'X',
      color: '#23292F',
    },
    {
      id: 6,
      name: 'Cardano',
      symbol: 'ADA',
      price: 1.12,
      change24h: 7.3,
      change7d: 12.8,
      marketCap: 39.2,
      volume: 1.8,
      rank: 6,
      logo: 'A',
      color: '#0033AD',
    },
  ];

  const topCryptos = apiTopCryptos ?? FALLBACK_TOP_CRYPTOS;

  const marketStats = [
    {
      title: 'Fear & Greed Index',
      value: '76',
      label: 'Extreme Greed',
      icon: Target,
      color: '#10B981',
      change: '+5',
    },
    {
      title: 'Global Market Cap',
      value: `$${marketOverview.totalMarketCap}T`,
      label: `BTC ${marketOverview.btcDominance}%`,
      icon: Globe,
      color: '#3B82F6',
      change: `${marketOverview.activeCryptos} ativos`,
    },
    {
      title: 'Total Volume',
      value: `$${marketOverview.totalVolume}B`,
      label: '24h',
      icon: Activity,
      color: '#6366f1',
      change: `${marketOverview.exchanges} mercados`,
    },
    {
      title: 'DeFi TVL',
      value: '$45.2B',
      label: '+8.9% (7d)',
      icon: Layers,
      color: '#F59E0B',
      change: '+$3.7B',
    },
  ];

  const trendingCoins = [
    { name: 'PEPE', change: '+234.5%', rank: 1 },
    { name: 'DOGE', change: '+45.2%', rank: 2 },
    { name: 'SHIB', change: '+38.7%', rank: 3 },
    { name: 'WIF', change: '+28.9%', rank: 4 },
    { name: 'BONK', change: '+25.1%', rank: 5 },
  ];

  const chartData = {
    BTC: {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 73250.45,
      change: 12.5,
      data: [
        { time: '00:00', price: 65000, volume: 1200 },
        { time: '04:00', price: 67500, volume: 1450 },
        { time: '08:00', price: 69200, volume: 1680 },
        { time: '12:00', price: 71800, volume: 1920 },
        { time: '16:00', price: 70500, volume: 1750 },
        { time: '20:00', price: 73250, volume: 2100 },
      ],
      indicators: {
        rsi: 68.5,
        macd: 'Bullish',
        sma20: 69500,
        sma50: 67200,
        volume24h: '28.5B',
        marketCap: '1.44T',
      },
    },
    ETH: {
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3845.67,
      change: 8.2,
      data: [
        { time: '00:00', price: 3500, volume: 800 },
        { time: '04:00', price: 3620, volume: 920 },
        { time: '08:00', price: 3750, volume: 1100 },
        { time: '12:00', price: 3890, volume: 1250 },
        { time: '16:00', price: 3780, volume: 1050 },
        { time: '20:00', price: 3845, volume: 1180 },
      ],
      indicators: {
        rsi: 72.3,
        macd: 'Bullish',
        sma20: 3720,
        sma50: 3580,
        volume24h: '15.2B',
        marketCap: '462.3B',
      },
    },
    SOL: {
      name: 'Solana',
      symbol: 'SOL',
      price: 198.34,
      change: -3.4,
      data: [
        { time: '00:00', price: 205, volume: 300 },
        { time: '04:00', price: 202, volume: 280 },
        { time: '08:00', price: 195, volume: 320 },
        { time: '12:00', price: 190, volume: 350 },
        { time: '16:00', price: 196, volume: 310 },
        { time: '20:00', price: 198, volume: 290 },
      ],
      indicators: {
        rsi: 45.2,
        macd: 'Bearish',
        sma20: 195,
        sma50: 201,
        volume24h: '4.7B',
        marketCap: '93.8B',
      },
    },
  };

  const chartTypes = [
    { key: 'line', label: t('indices.chartLine'), icon: LineChartIcon },
    { key: 'candle', label: t('indices.chartCandlestick'), icon: CandlestickIcon },
    { key: 'area', label: t('indices.chartArea'), icon: AreaChart },
    { key: 'volume', label: t('indices.chartVolume'), icon: Volume2 },
  ];
  const onRefresh = () => {
    setRefreshing(true);
    reload().finally(() => setRefreshing(false));
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return '#10B981';
    if (change < 0) return '#EF4444';
    return colors.textSecondary;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return ArrowUp;
    if (change < 0) return ArrowDown;
    return Minus;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(1)}T`;
    }
    return `$${marketCap.toFixed(1)}B`;
  };

  const renderChart = () => {
    const data = chartData[selectedChart as keyof typeof chartData];
    const maxPrice = Math.max(...data.data.map((d) => d.price));
    const minPrice = Math.min(...data.data.map((d) => d.price));
    const priceRange = maxPrice - minPrice;

    return (
      <View
        style={[
          styles.chartContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.chartHeader}>
          <View style={styles.chartInfo}>
            <Text style={[styles.chartTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
              {data.name}
            </Text>
            <Text style={[styles.chartPrice, { color: colors.text, fontFamily: fonts.bodyBold }]}>
              $
              {data.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
            <View style={styles.chartChange}>
              {(() => {
                const ChangeIcon = data.change > 0 ? ArrowUp : ArrowDown;
                const changeColor = data.change > 0 ? '#10B981' : '#EF4444';
                return (
                  <>
                    <ChangeIcon size={14} color={changeColor} />
                    <Text
                      style={[styles.chartChangeText, { color: changeColor, fontFamily: fonts.bodySemiBold }]}
                    >
                      {Math.abs(data.change).toFixed(1)}%
                    </Text>
                  </>
                );
              })()}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.fullscreenButton,
              { backgroundColor: colors.surface },
            ]}
            onPress={() => setShowAdvancedCharts(true)}
          >
            <Maximize2 size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Chart Visualization */}
        <View style={styles.chartArea}>
          <LinearGradient
            colors={
              data.change > 0
                ? ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.05)']
                : ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.05)']
            }
            style={styles.chartGradient}
          >
            <View style={styles.chartPlaceholder}>
              <LineChartIcon size={48} color={colors.textTertiary} />
              <Text
                style={[
                  styles.chartPlaceholderText,
                  { color: colors.textTertiary },
                ]}
              >
                {`${t('indices.chartAnalysis')} ${data.name}`}
              </Text>
              <Text
                style={[styles.chartSubtext, { color: colors.textTertiary, fontFamily: fonts.body }]}
              >
                {t('indices.realtimeData')}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Chart Footer */}
        <View style={styles.chartFooter}>
          <Text
            style={[styles.chartFooterText, { color: colors.textSecondary, fontFamily: fonts.body }]}
          >
            {t('indices.lastUpdate')}
          </Text>
        </View>
      </View>
    );
  };

  const renderAdvancedCharts = () => {
    if (!showAdvancedCharts) return null;

    const data = chartData[selectedChart as keyof typeof chartData];

    return (
      <View
        style={[
          styles.advancedChartsModal,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            styles.modalHeader,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowAdvancedCharts(false)}
          >
            <Text style={[styles.closeButtonText, { color: colors.primary, fontFamily: fonts.bodySemiBold }]}>
              {`← ${t('indices.back')}`}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            {t('indices.advancedCharts')}
          </Text>
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.surface }]}
          >
            <Settings size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Chart Type Selector */}
          <View style={styles.chartTypeSelector}>
            {chartTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.chartTypeButton,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    chartType === type.key && {
                      backgroundColor: colors.primary,
                    },
                  ]}
                  onPress={() => setChartType(type.key)}
                >
                  <Icon
                    size={16}
                    color={
                      chartType === type.key ? 'white' : colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.chartTypeText,
                      { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                      chartType === type.key && { color: 'white' },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Crypto Selector */}
          <View style={styles.cryptoSelector}>
            {Object.entries(chartData).map(([key, crypto]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.cryptoButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedChart === key && {
                    backgroundColor: colors.primary + '20',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedChart(key)}
              >
                <Text
                  style={[
                    styles.cryptoButtonSymbol,
                    { color: colors.text, fontFamily: fonts.bodyBold },
                    selectedChart === key && { color: colors.primary },
                  ]}
                >
                  {crypto.symbol}
                </Text>
                <Text
                  style={[
                    styles.cryptoButtonName,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  {crypto.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Advanced Chart */}
          <View
            style={[
              styles.advancedChart,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.advancedChartHeader}>
              <View>
                <Text
                  style={[styles.advancedChartTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}
                >
                  {data.name} ({data.symbol})
                </Text>
                <Text
                  style={[styles.advancedChartPrice, { color: colors.text, fontFamily: fonts.bodyBold }]}
                >
                  $
                  {data.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={styles.advancedChartChange}>
                {(() => {
                  const ChangeIcon = data.change > 0 ? TrendIcon : TrendingDown;
                  const changeColor = data.change > 0 ? '#10B981' : '#EF4444';
                  return (
                    <>
                      <ChangeIcon size={20} color={changeColor} />
                      <Text
                        style={[
                          styles.advancedChartChangeText,
                          { color: changeColor, fontFamily: fonts.bodyBold },
                        ]}
                      >
                        {data.change > 0 ? '+' : ''}
                        {data.change.toFixed(1)}%
                      </Text>
                    </>
                  );
                })()}
              </View>
            </View>

            {/* Chart Area */}
            <View style={styles.enhancedChartArea}>
              <LinearGradient
                colors={
                  data.change > 0
                    ? ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.05)']
                    : ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.05)']
                }
                style={styles.chartGradient}
              >
                <View style={styles.chartPlaceholder}>
                  <Activity size={48} color={colors.textTertiary} />
                  <Text
                    style={[
                      styles.chartPlaceholderText,
                      { color: colors.textTertiary, fontFamily: fonts.bodySemiBold },
                    ]}
                  >
                    {chartType === 'line'
                      ? t('indices.chartLine')
                      : chartType === 'candle'
                      ? t('indices.chartCandlestick')
                      : chartType === 'area'
                      ? t('indices.chartArea')
                      : t('indices.chartVolume')}
                  </Text>
                  <Text
                    style={[
                      styles.chartSubtext,
                      { color: colors.textTertiary },
                    ]}
                  >
                    {t('indices.technicalAnalysis')}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Technical Indicators */}
          <GlassCard
            style={styles.indicatorsSection}
          >
            <Text style={[styles.indicatorsTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('indices.technicalIndicators')}
            </Text>
            <View style={styles.indicatorsGrid}>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  RSI (14)
                </Text>
                <Text
                  style={[
                    styles.indicatorValue,
                    {
                      color:
                        data.indicators.rsi > 70
                          ? '#EF4444'
                          : data.indicators.rsi < 30
                          ? '#10B981'
                          : colors.text,
                      fontFamily: fonts.bodyBold,
                    },
                  ]}
                >
                  {data.indicators.rsi}
                </Text>
              </View>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  MACD
                </Text>
                <Text
                  style={[
                    styles.indicatorValue,
                    {
                      color:
                        data.indicators.macd === 'Bullish'
                          ? '#10B981'
                          : '#EF4444',
                      fontFamily: fonts.bodyBold,
                    },
                  ]}
                >
                  {data.indicators.macd}
                </Text>
              </View>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  SMA 20
                </Text>
                <Text style={[styles.indicatorValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  ${data.indicators.sma20.toLocaleString()}
                </Text>
              </View>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  SMA 50
                </Text>
                <Text style={[styles.indicatorValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  ${data.indicators.sma50.toLocaleString()}
                </Text>
              </View>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  Volume 24h
                </Text>
                <Text style={[styles.indicatorValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  ${data.indicators.volume24h}
                </Text>
              </View>
              <View style={styles.indicatorItem}>
                <Text
                  style={[
                    styles.indicatorLabel,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  Market Cap
                </Text>
                <Text style={[styles.indicatorValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  ${data.indicators.marketCap}
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Trading View */}
          <GlassCard
            style={styles.tradingSection}
          >
            <Text style={[styles.tradingTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('indices.marketAnalysis')}
            </Text>
            <View style={styles.tradingGrid}>
              <View
                style={[
                  styles.tradingCard,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Text style={[styles.tradingCardTitle, { color: colors.text, fontFamily: fonts.body }]}>
                  {t('indices.support')}
                </Text>
                <Text style={[styles.tradingCardValue, { color: '#10B981', fontFamily: fonts.bodyBold }]}>
                  ${(data.price * 0.95).toFixed(2)}
                </Text>
              </View>
              <View
                style={[
                  styles.tradingCard,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Text style={[styles.tradingCardTitle, { color: colors.text, fontFamily: fonts.body }]}>
                  {t('indices.resistance')}
                </Text>
                <Text style={[styles.tradingCardValue, { color: '#EF4444', fontFamily: fonts.bodyBold }]}>
                  ${(data.price * 1.05).toFixed(2)}
                </Text>
              </View>
              <View
                style={[
                  styles.tradingCard,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Text style={[styles.tradingCardTitle, { color: colors.text, fontFamily: fonts.body }]}>
                  {t('indices.trend')}
                </Text>
                <Text
                  style={[
                    styles.tradingCardValue,
                    {
                      color: data.change > 0 ? '#10B981' : '#EF4444',
                      fontFamily: fonts.bodyBold,
                    },
                  ]}
                >
                  {data.change > 0 ? t('indices.high') : t('indices.low')}
                </Text>
              </View>
            </View>
          </GlassCard>
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#0f172a', '#1e293b'] : ['#4f46e5', '#3b82f6']}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('indices.headerTitle')}</Text>
        <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>
          {t('indices.headerSubtitle')}
        </Text>

        <View style={styles.marketOverview}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { fontFamily: fonts.body }]}>Market Cap</Text>
            <Text style={[styles.overviewValue, { fontFamily: fonts.bodyBold }]}>
              ${marketOverview.totalMarketCap}T
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { fontFamily: fonts.body }]}>Volume 24h</Text>
            <Text style={[styles.overviewValue, { fontFamily: fonts.bodyBold }]}>
              ${marketOverview.totalVolume}B
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { fontFamily: fonts.body }]}>BTC Dom.</Text>
            <Text style={[styles.overviewValue, { fontFamily: fonts.bodyBold }]}>
              {marketOverview.btcDominance}%
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Market Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {t('indices.marketStats')}
          </Text>
          <View style={styles.statsGrid}>
            {marketStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlassCard
                  key={index}
                  style={styles.statCard}
                >
                  <View style={styles.statHeader}>
                    <View
                      style={[
                        styles.statIcon,
                        { backgroundColor: stat.color + '20' },
                      ]}
                    >
                      <Icon size={20} color={stat.color} />
                    </View>
                    <Text style={[styles.statChange, { color: stat.color, fontFamily: fonts.bodySemiBold }]}>
                      {stat.change}
                    </Text>
                  </View>
                  <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                    {stat.value}
                  </Text>
                  <Text
                    style={[styles.statTitle, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}
                  >
                    {stat.title}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textTertiary, fontFamily: fonts.body }]}
                  >
                    {stat.label}
                  </Text>
                </GlassCard>
              );
            })}
          </View>
        </View>

        {/* Timeframe Selector */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
              {t('indices.topCryptos')}
            </Text>
            <View style={styles.timeframeSelector}>
              {timeframes.map((timeframe) => (
                <TouchableOpacity
                  key={timeframe}
                  style={[
                    styles.timeframeButton,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    selectedTimeframe === timeframe && {
                      backgroundColor: colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedTimeframe(timeframe)}
                >
                  <Text
                    style={[
                      styles.timeframeText,
                      { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                      selectedTimeframe === timeframe && { color: 'white' },
                    ]}
                  >
                    {timeframe}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Crypto List */}
        <View style={styles.section}>
          <View style={styles.cryptoList}>
            {topCryptos.map((crypto) => {
              const ChangeIcon = getChangeIcon(crypto.change24h);
              const changeColor = getChangeColor(crypto.change24h);

              return (
                <TouchableOpacity
                  key={crypto.id}
                  style={[
                    styles.cryptoItem,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => {
                    // Navigate to crypto details (if route exists)
                    // router.push(`/crypto/${crypto.id}` as any);
                  }}
                >
                  <View style={styles.cryptoHeader}>
                    <View style={styles.cryptoRank}>
                      <Text
                        style={[styles.rankText, { color: colors.textTertiary, fontFamily: fonts.bodySemiBold }]}
                      >
                        {crypto.rank}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.cryptoLogo,
                        { backgroundColor: crypto.color + '20' },
                      ]}
                    >
                      <Text style={[styles.logoText, { color: crypto.color, fontFamily: fonts.bodyBold }]}>
                        {crypto.logo}
                      </Text>
                    </View>
                    <View style={styles.cryptoDetails}>
                      <Text style={[styles.cryptoName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                        {crypto.name}
                      </Text>
                      <Text
                        style={[
                          styles.cryptoSymbol,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {crypto.symbol}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cryptoMetrics}>
                    <View style={styles.metricBlock}>
                      <Text style={[styles.priceText, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                        {formatPrice(crypto.price)}
                      </Text>
                      <View style={styles.changeContainer}>
                        <ChangeIcon size={12} color={changeColor} />
                        <Text style={[styles.changeText, { color: changeColor, fontFamily: fonts.bodySemiBold }]}>
                          {Math.abs(crypto.change24h).toFixed(1)}%
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.metricBlock, styles.metricBlockRight]}>
                      <Text
                        style={[
                          styles.marketCapText,
                          { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                        ]}
                      >
                        {formatMarketCap(crypto.marketCap)}
                      </Text>
                      <Text
                        style={[
                          styles.volumeText,
                          { color: colors.textTertiary, fontFamily: fonts.body },
                        ]}
                      >
                        Vol: ${crypto.volume}B
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {t('indices.trending')}
          </Text>
          <GlassCard
            style={styles.trendingContainer}
          >
            {trendingCoins.map((coin, index) => (
              <View key={index} style={styles.trendingItem}>
                <View style={styles.trendingRank}>
                  <Text
                    style={[styles.trendingRankText, { color: colors.primary, fontFamily: fonts.bodyBold }]}
                  >
                    {coin.rank}
                  </Text>
                </View>
                <Text style={[styles.trendingName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                  {coin.name}
                </Text>
                <Text style={[styles.trendingChange, { color: '#10B981', fontFamily: fonts.bodyBold }]}>
                  {coin.change}
                </Text>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* Market Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {t('indices.marketAnalysis')}
          </Text>
          <View
            style={[
              styles.analysisCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.analysisHeader}
            >
              <Target size={24} color="white" />
              <Text style={[styles.analysisTitle, { fontFamily: fonts.displaySemiBold }]}>Fear & Greed Index</Text>
            </LinearGradient>
            <View style={styles.analysisContent}>
              <View style={styles.indexContainer}>
                <Text style={[styles.indexValue, { fontFamily: fonts.display }]}>76</Text>
                <Text style={[styles.indexLabel, { fontFamily: fonts.bodySemiBold }]}>Extreme Greed</Text>
              </View>
              <Text
                style={[
                  styles.analysisDescription,
                  { color: colors.textSecondary, fontFamily: fonts.body },
                ]}
              >
                {t('indices.marketAnalysisText')}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {t('indices.quickActions')}
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.quickAction,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => setShowAdvancedCharts(true)}
            >
              <LinearGradient
                colors={['#4f46e5', '#3b82f6']}
                style={styles.quickActionIcon}
              >
                <BarChart3 size={24} color="white" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                {t('indices.advancedCharts')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickAction,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.quickActionIcon}
              >
                <PieChartIcon size={24} color="white" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                {t('indices.portfolioTracker')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Charts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {t('indices.chartAnalysis')}
          </Text>

          <PieChart
            title={t('indices.marketCapDistribution')}
            data={[
              { label: 'Bitcoin', value: 52.3, color: '#F7931A' },
              { label: 'Ethereum', value: 17.2, color: '#627EEA' },
              { label: 'Solana', value: 3.4, color: '#9945FF' },
              { label: 'BNB', value: 3.2, color: '#F3BA2F' },
              { label: 'Outros', value: 23.9, color: '#6366f1' },
            ]}
          />

          <HorizontalBarChart
            title={t('indices.performance24h')}
            data={[
              { label: 'Bitcoin (BTC)', value: 12.5, color: '#10B981' },
              { label: 'Ethereum (ETH)', value: 8.2, color: '#10B981' },
              { label: 'BNB', value: 5.8, color: '#10B981' },
              { label: 'Solana (SOL)', value: -3.4, color: '#EF4444' },
              { label: 'XRP', value: -1.2, color: '#EF4444' },
            ]}
            maxValue={15}
          />

          <VerticalBarChart
            title={t('indices.tradingVolume')}
            data={[
              { label: 'BTC', value: 28.5, color: '#F7931A' },
              { label: 'ETH', value: 15.2, color: '#627EEA' },
              { label: 'XRP', value: 8.9, color: '#23292F' },
              { label: 'SOL', value: 4.7, color: '#9945FF' },
              { label: 'BNB', value: 2.1, color: '#F3BA2F' },
              { label: 'ADA', value: 1.8, color: '#0033AD' },
            ]}
          />

          <LineChart
            title={t('indices.btcPriceTrend')}
            data={[
              { label: '00:00', value: 65000 },
              { label: '04:00', value: 67500 },
              { label: '08:00', value: 69200 },
              { label: '12:00', value: 71800 },
              { label: '16:00', value: 70500 },
              { label: '20:00', value: 73250 },
            ]}
            color="#F7931A"
          />

          <CandlestickChart
            title={t('indices.candlestickPattern')}
            data={[
              {
                time: '00:00',
                open: 65000,
                close: 67500,
                high: 68000,
                low: 64500,
              },
              {
                time: '04:00',
                open: 67500,
                close: 69200,
                high: 70000,
                low: 67000,
              },
              {
                time: '08:00',
                open: 69200,
                close: 71800,
                high: 72500,
                low: 69000,
              },
              {
                time: '12:00',
                open: 71800,
                close: 70500,
                high: 72800,
                low: 69800,
              },
              {
                time: '16:00',
                open: 70500,
                close: 73250,
                high: 74000,
                low: 70000,
              },
              {
                time: '20:00',
                open: 73250,
                close: 73250,
                high: 74500,
                low: 72500,
              },
            ]}
          />
        </View>
      </ScrollView>

      {renderAdvancedCharts()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  marketOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 18,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  timeframeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeframeText: {
    fontSize: 12,
  },
  cryptoList: {
    gap: 12,
  },
  cryptoItem: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cryptoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoRank: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
  },
  cryptoDetails: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    marginBottom: 2,
  },
  cryptoSymbol: {
    fontSize: 14,
  },
  cryptoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.15)',
    paddingLeft: 52,
  },
  metricBlock: {
    alignItems: 'flex-start',
  },
  metricBlockRight: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 14,
  },
  marketCapText: {
    fontSize: 14,
    marginBottom: 2,
  },
  volumeText: {
    fontSize: 12,
  },
  trendingContainer: {
    borderRadius: 12,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  trendingRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendingRankText: {
    fontSize: 12,
  },
  trendingName: {
    flex: 1,
    fontSize: 14,
  },
  trendingChange: {
    fontSize: 14,
  },
  analysisCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  analysisTitle: {
    fontSize: 18,
    color: 'white',
  },
  analysisContent: {
    padding: 16,
  },
  indexContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  indexValue: {
    fontSize: 48,
    color: '#10B981',
    marginBottom: 4,
  },
  indexLabel: {
    fontSize: 16,
    color: '#10B981',
  },
  analysisDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  chartSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chartSelectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  chartSelectorText: {
    fontSize: 14,
  },
  chartContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  chartInfo: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  chartPrice: {
    fontSize: 20,
    marginBottom: 4,
  },
  chartChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chartChangeText: {
    fontSize: 14,
  },
  fullscreenButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartArea: {
    height: 180,
    marginHorizontal: 16,
  },
  chartGradient: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  chartPlaceholderText: {
    fontSize: 16,
    textAlign: 'center',
  },
  chartSubtext: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartFooter: {
    paddingVertical: 8,
    paddingBottom: 12,
    alignItems: 'center',
  },
  chartFooterText: {
    fontSize: 12,
  },
  advancedChartsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chartTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  chartTypeText: {
    fontSize: 12,
  },
  cryptoSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  cryptoButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  cryptoButtonSymbol: {
    fontSize: 14,
    marginBottom: 2,
  },
  cryptoButtonName: {
    fontSize: 10,
  },
  advancedChart: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  advancedChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  advancedChartTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  advancedChartPrice: {
    fontSize: 20,
  },
  advancedChartChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  advancedChartChangeText: {
    fontSize: 16,
  },
  enhancedChartArea: {
    height: 250,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  indicatorsSection: {
    borderRadius: 12,
    marginBottom: 16,
  },
  indicatorsTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  indicatorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  indicatorItem: {
    width: (width - 80) / 3,
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  indicatorValue: {
    fontSize: 14,
  },
  tradingSection: {
    borderRadius: 12,
    marginBottom: 16,
  },
  tradingTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  tradingGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  tradingCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  tradingCardTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  tradingCardValue: {
    fontSize: 14,
  },
});
