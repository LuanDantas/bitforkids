import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Search,
  Wallet,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  DollarSign,
  Calendar,
  ChevronLeft,
  Clock,
} from 'lucide-react-native';
import LineChart from '@/components/charts/LineChart';
import GlassCard from '@/components/GlassCard';
import Svg, { Polyline, Circle } from 'react-native-svg';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useMarket } from '@/hooks/useMarket';
import { portfolioApi } from '@/services/api/portfolio';

const cryptos = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A', price: 73250.45, change: 2.3 },
  { id: 'USDT', name: 'USDT', icon: '₮', color: '#26A17B', price: 1.0, change: 0.0 },
  { id: 'USDC', name: 'USDC', icon: '$', color: '#2775CA', price: 1.0, change: 0.01 },
  { id: 'DAI', name: 'DAI', icon: '◈', color: '#F5AC37', price: 1.0, change: -0.02 },
  { id: 'ETH', name: 'Ether', icon: 'Ξ', color: '#627EEA', price: 3845.67, change: 8.2 },
  { id: 'POL', name: 'Polygon', icon: '⬡', color: '#8247E5', price: 0.52, change: -1.2 },
  { id: 'SOL', name: 'Solana', icon: '◎', color: '#9945FF', price: 198.34, change: -3.4 },
  { id: 'TRX', name: 'Tron', icon: 'T', color: '#EF0027', price: 0.24, change: 1.5 },
];

// Enhanced Line Chart Component for Cards with Axes and Scroll
const EnhancedCardChart = ({
  data,
  color,
}: {
  data: { label: string; value: number }[];
  color: string;
}) => {
  const { colors: themeColors } = useTheme();
  const chartWidth = Math.max(600, data.length * 60); // Make it scrollable
  const chartHeight = 140;
  const padding = 40;
  const chartInnerWidth = chartWidth - padding * 2;
  const chartInnerHeight = chartHeight - padding * 2;

  // Histórico ainda esparso (0–1 ponto): o gráfico de linha precisa de ≥2 pontos.
  if (!data || data.length < 2) {
    return (
      <View style={{ height: 200, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
        <Text style={{ color: themeColors.textTertiary, fontSize: 12, textAlign: 'center' }}>
          Gráfico disponível após alguns dias de histórico.
        </Text>
      </View>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  // Round to nice numbers for Y axis
  const yMax = Math.ceil(maxValue * 1.1);
  const yMin = Math.floor(minValue * 0.9);
  const yRange = yMax - yMin;
  const yStep = yRange / 5;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartInnerWidth;
    const y = padding + ((yMax - item.value) / yRange) * chartInnerHeight;
    return { x, y, value: item.value, label: item.label };
  });

  const pointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={{ marginTop: 12, height: 200 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={{ maxWidth: '100%' }}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View style={{ width: chartWidth, height: 190 }}>
          {/* Y Axis Labels */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: chartHeight,
              width: padding,
              justifyContent: 'space-between',
            }}
          >
            {[...Array(6)].map((_, i) => {
              const value = yMax - yStep * i;
              return (
                <Text
                  key={i}
                  style={{
                    fontSize: 10,
                    color: themeColors.textTertiary,
                    textAlign: 'right',
                    paddingRight: 8,
                  }}
                >
                  {value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </Text>
              );
            })}
          </View>

          {/* Chart Area */}
          <View
            style={{
              position: 'absolute',
              left: padding,
              top: 0,
              width: chartInnerWidth,
              height: chartHeight,
            }}
          >
            <LinearGradient
              colors={[color + '20', color + '05', 'transparent']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 8,
              }}
            />

            {/* Y Axis Grid Lines */}
            <Svg width={chartInnerWidth} height={chartHeight}>
              {[...Array(6)].map((_, i) => {
                const y = (i / 5) * chartInnerHeight;
                return (
                  <Polyline
                    key={i}
                    points={`0,${y} ${chartInnerWidth},${y}`}
                    stroke={themeColors.border}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Main Line */}
              <Polyline
                points={pointsString}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((point, index) => (
                <React.Fragment key={index}>
                  <Circle
                    cx={point.x - padding}
                    cy={point.y}
                    r="5"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                  />
                </React.Fragment>
              ))}
            </Svg>

            {/* X Axis Labels */}
            <View
              style={{
                position: 'absolute',
                bottom: -30,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
            >
              {data.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    color: themeColors.textTertiary,
                    width: chartInnerWidth / data.length - 5,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Helper functions for currency and date formatting
const formatCurrency = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numbers = value.replace(/[^\d.]/g, '');
  // Split into integer and decimal parts
  const parts = numbers.split('.');
  // Format integer part with commas
  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Return formatted currency
  return parts.length > 1
    ? `$${integer}.${parts[1].slice(0, 2)}`
    : `$${integer}`;
};

const parseCurrency = (value: string): string => {
  // Remove dollar sign, commas, and spaces
  return value.replace(/[$,\s]/g, '');
};

const formatDateInput = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  // Add slashes
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

const calculateQuantity = (amount: string, price: string): string => {
  const amountNum = parseFloat(parseCurrency(amount)) || 0;
  const priceNum = parseFloat(parseCurrency(price)) || 0;
  if (priceNum === 0) return '0.0000';
  const quantity = amountNum / priceNum;
  return quantity.toFixed(4);
};

export default function PortfolioScreen() {
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletsList, setShowWalletsList] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    'deposit' | 'withdrawal' | null
  >(null);

  // Form fields for transaction
  const [transactionForm, setTransactionForm] = useState({
    crypto: '',
    wallet: '',
    price: '',
    date: '',
    amount: '',
    quantity: '',
  });

  // Dados reais do portfólio (API): carteiras, posições por ativo e stats.
  const { wallets, positions, stats, reload } = usePortfolio();

  // Resumo de mercado com preços reais (CoinGecko via API).
  const { topCryptos } = useMarket();
  const marketCoins = (topCryptos ?? []).slice(0, 6).map((c) => ({
    id: c.symbol,
    name: c.name,
    icon: c.logo,
    color: c.color,
    price: c.price,
    change: c.change24h,
  }));

  const calculateTrend = (value: number) => {
    if (value > 5)
      return { label: t('portfolio.strongUp'), color: '#10B981', icon: TrendingUp };
    if (value < -5)
      return { label: t('portfolio.strongDown'), color: '#EF4444', icon: TrendingDown };
    return { label: t('portfolio.neutral'), color: '#F59E0B', icon: Minus };
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
    setNewWalletName('');
    setEditingWalletId(null);
  };

  const handleAddWallet = async () => {
    const name = newWalletName.trim();
    if (!name) {
      Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorWalletName'));
      return;
    }
    try {
      if (editingWalletId) {
        await portfolioApi.updateWallet(editingWalletId, name);
      } else {
        await portfolioApi.createWallet(name);
      }
      const wasEditing = !!editingWalletId;
      await reload();
      closeWalletModal();
      Alert.alert(
        t('portfolio.successTitle'),
        wasEditing ? t('portfolio.walletUpdated') : t('portfolio.walletCreated')
      );
    } catch {
      Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorGeneric'));
    }
  };

  const handleEditWallet = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    setEditingWalletId(id);
    setNewWalletName(wallet?.name || '');
    setShowWalletModal(true);
  };

  const handleDeleteWallet = (id: string) => {
    Alert.alert(
      t('portfolio.confirmDelete'),
      t('portfolio.confirmDeleteMessage'),
      [
        { text: t('portfolio.cancel'), style: 'cancel' },
        {
          text: t('portfolio.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await portfolioApi.removeWallet(id);
              await reload();
            } catch {
              Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorGeneric'));
            }
          },
        },
      ]
    );
  };

  const handleAddTransaction = async () => {
    if (
      !transactionForm.crypto ||
      !transactionForm.wallet ||
      !transactionForm.price ||
      !transactionForm.amount
    ) {
      Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorFillRequired'));
      return;
    }

    const priceValue = parseFloat(parseCurrency(transactionForm.price));
    const quantityValue = parseFloat(transactionForm.quantity);
    if (!(priceValue > 0) || !(quantityValue > 0)) {
      Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorFillRequired'));
      return;
    }

    // DD/MM/YYYY -> ISO (opcional)
    let occurredAt: string | undefined;
    const m = transactionForm.date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) occurredAt = `${m[3]}-${m[2]}-${m[1]}T12:00:00.000Z`;

    try {
      await portfolioApi.createTransaction(transactionForm.wallet, {
        assetSymbol: transactionForm.crypto,
        side: selectedTransactionType === 'withdrawal' ? 'SELL' : 'BUY',
        quantity: quantityValue,
        priceCents: Math.round(priceValue * 100),
        occurredAt,
      });
      await reload();
      setTransactionForm({
        crypto: '',
        wallet: '',
        price: '',
        date: '',
        amount: '',
        quantity: '',
      });
      setShowTransactionModal(false);
      setSelectedTransactionType(null);
      Alert.alert(t('portfolio.successTitle'), t('portfolio.transactionCreated'));
    } catch {
      Alert.alert(t('portfolio.errorTitle'), t('portfolio.errorGeneric'));
    }
  };

  const formatCoinPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const renderMarketSummary = () => {
    return (
      <GlassCard style={styles.marketCard}>
        <Text style={[styles.marketTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
          {t('portfolio.marketSummary')}
        </Text>
        {marketCoins.map((coin) => {
          const changeColor =
            coin.change > 0 ? '#10B981' : coin.change < 0 ? '#EF4444' : colors.textSecondary;
          const ChangeIcon =
            coin.change > 0 ? TrendingUp : coin.change < 0 ? TrendingDown : Minus;
          return (
            <View
              key={coin.id}
              style={[styles.marketRow, { borderBottomColor: colors.border }]}
            >
              <View style={styles.marketCoinInfo}>
                <View style={[styles.marketCoinIcon, { backgroundColor: coin.color + '20' }]}>
                  <Text style={[styles.marketCoinIconText, { color: coin.color, fontFamily: fonts.bodyBold }]}>
                    {coin.icon}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.marketCoinName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                    {coin.name}
                  </Text>
                  <Text style={[styles.marketCoinSymbol, { color: colors.textTertiary, fontFamily: fonts.body }]}>
                    {coin.id}
                  </Text>
                </View>
              </View>
              <View style={styles.marketCoinPriceBox}>
                <Text style={[styles.marketCoinPrice, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  {formatCoinPrice(coin.price)}
                </Text>
                <View style={styles.marketCoinChange}>
                  <ChangeIcon size={12} color={changeColor} />
                  <Text style={[styles.marketCoinChangeText, { color: changeColor, fontFamily: fonts.secondaryMedium }]}>
                    {coin.change > 0 ? '+' : ''}
                    {coin.change.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </GlassCard>
    );
  };

  const renderPortfolioCards = () => {
    const fmt = (n: number) =>
      `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    const cards = [
      {
        title: t('portfolio.deposits'),
        value: fmt(stats.totalAportes),
        change: 0,
        trend: calculateTrend(0),
        chartData: stats.depositsChart,
      },
      {
        title: t('portfolio.balance'),
        value: fmt(stats.totalBalance),
        change: stats.profitChange,
        trend: calculateTrend(stats.profitChange),
        chartData: stats.balanceChart,
      },
      {
        title: t('portfolio.profit'),
        value: fmt(stats.totalProfit),
        change: stats.profitChange,
        trend: calculateTrend(stats.profitChange),
        chartData: stats.profitChart,
      },
    ];

    return (
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const TrendIcon = card.trend.icon;
          const chartColor = card.change >= 0 ? '#10B981' : '#EF4444';
          return (
            <GlassCard
              key={index}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text
                  style={[styles.cardTitle, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}
                >
                  {card.title}
                </Text>
                <View style={styles.cardTrend}>
                  <TrendIcon size={14} color={card.trend.color} />
                  <Text
                    style={[styles.cardTrendText, { color: card.trend.color, fontFamily: fonts.secondaryMedium }]}
                  >
                    {card.change > 0 ? '+' : ''}
                    {card.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardValue, { color: colors.text, fontFamily: fonts.display }]}>
                {card.value}
              </Text>
              <View style={styles.cardChart}>
                <EnhancedCardChart data={card.chartData} color={chartColor} />
              </View>
            </GlassCard>
          );
        })}
      </View>
    );
  };

  const renderTransactionsTable = () => {
    return (
      <GlassCard
        style={styles.tableContainer}
      >
        <Text style={[styles.tableTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
          {t('portfolio.profitAndLoss')}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.crypto')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.currentPrice')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.quantity')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.deposit')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.balance')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.avgPrice')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.profit')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.profitPercent')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.trend')}
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary, fontFamily: fonts.bodySemiBold },
                ]}
              >
                {t('portfolio.actions')}
              </Text>
            </View>

            {positions.map((transaction) => {
              const crypto = cryptos.find((c) => c.id === transaction.crypto);
              const profitColor =
                transaction.profit >= 0 ? '#10B981' : '#EF4444';
              const trend = calculateTrend(transaction.profitPercent);
              const TrendIcon = trend.icon;

              return (
                <View key={transaction.id} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cryptoCell, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                      {crypto?.icon} {transaction.crypto}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text, fontFamily: fonts.body }]}>
                      $
                      {transaction.currentPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text, fontFamily: fonts.body }]}>
                      {transaction.quantity}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text, fontFamily: fonts.body }]}>
                      $
                      {transaction.investment.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text, fontFamily: fonts.body }]}>
                      $
                      {transaction.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text, fontFamily: fonts.body }]}>
                      $
                      {(transaction.avgPrice || 0).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.cellText,
                        { color: profitColor, fontFamily: fonts.bodyBold },
                      ]}
                    >
                      {transaction.profit >= 0 ? '+' : ''}$
                      {transaction.profit.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.percentageBadge,
                        {
                          backgroundColor: profitColor + '20',
                          color: profitColor,
                          fontFamily: fonts.secondaryMedium,
                        },
                      ]}
                    >
                      {transaction.profitPercent >= 0 ? '+' : ''}
                      {transaction.profitPercent.toFixed(2)}%
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <View
                      style={[
                        styles.trendBadge,
                        { backgroundColor: trend.color + '20' },
                      ]}
                    >
                      <TrendIcon size={12} color={trend.color} />
                      <Text style={[styles.trendText, { color: trend.color, fontFamily: fonts.secondaryMedium }]}>
                        {trend.label}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, styles.actionsCell]}>
                    <TouchableOpacity style={styles.actionButton}>
                      <BarChart3 size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        router.push(`/portfolio/${transaction.id}`)
                      }
                    >
                      <Eye size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </GlassCard>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#0f172a', '#1e293b'] : ['#4f46e5', '#3b82f6']}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('portfolio.headerTitle')}</Text>
        <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>
          {t('portfolio.headerSubtitle')}
        </Text>

        {/* Search and Icons */}
        <View style={styles.topActions}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            ]}
          >
            <Search size={20} color="white" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('portfolio.search')}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowWalletsList(true)}
            >
              <Wallet size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Filter size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowTransactionModal(true)}
            >
              <Plus size={24} color="white" />
            </TouchableOpacity>
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
        {/* Market Summary — main coins */}
        <View style={styles.section}>{renderMarketSummary()}</View>

        {/* Portfolio Stats Cards */}
        <View style={styles.section}>{renderPortfolioCards()}</View>

        {/* Transactions Table */}
        <View style={styles.section}>{renderTransactionsTable()}</View>
      </ScrollView>

      {/* Wallets List Modal */}
      <Modal visible={showWalletsList} animationType="slide">
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <LinearGradient
            colors={['#0f172a', '#1e293b']}
            style={styles.modalHeader}
          >
            <TouchableOpacity onPress={() => setShowWalletsList(false)}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text style={[styles.modalHeaderTitle, { fontFamily: fonts.displaySemiBold }]}>{t('portfolio.wallets')}</Text>
            <View style={{ width: 24 }} />
          </LinearGradient>

          <ScrollView style={styles.walletsList}>
            {wallets.map((wallet) => {
              const profitColor = wallet.profit >= 0 ? '#10B981' : '#EF4444';
              const TrendIcon = wallet.change >= 0 ? TrendingUp : TrendingDown;

              return (
                <GlassCard
                  key={wallet.id}
                  style={styles.walletCard}
                >
                  <View style={styles.walletHeader}>
                    <Text style={[styles.walletName, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                      {wallet.name}
                    </Text>
                    <View style={styles.walletActions}>
                      <TouchableOpacity
                        onPress={() => handleEditWallet(wallet.id)}
                      >
                        <Edit size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteWallet(wallet.id)}
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.walletStats}>
                    <Text style={[styles.walletValue, { color: colors.text, fontFamily: fonts.display }]}>
                      $
                      {wallet.totalValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <View
                      style={[
                        styles.walletProfitBadge,
                        { backgroundColor: profitColor + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.walletProfitText,
                          { color: profitColor, fontFamily: fonts.bodySemiBold },
                        ]}
                      >
                        {wallet.profit >= 0 ? '+' : ''}$
                        {wallet.profit.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.walletChart}>
                    <EnhancedCardChart
                      data={wallet.chartData}
                      color={profitColor}
                    />
                  </View>
                </GlassCard>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.addWalletButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => {
              setEditingWalletId(null);
              setNewWalletName('');
              setShowWalletModal(true);
            }}
          >
            <Plus size={24} color="white" />
            <Text style={[styles.addWalletText, { fontFamily: fonts.bodyBold }]}>{t('portfolio.addWallet')}</Text>
          </TouchableOpacity>

          {/* Modal de adicionar/editar carteira — aninhado para sobrepor a
              lista de Carteiras sem fechá-la (evita navegar de volta ao Portfólio) */}
          <Modal visible={showWalletModal} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                  {editingWalletId
                    ? t('portfolio.walletEdit')
                    : t('portfolio.walletRegistration')}
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={t('portfolio.walletNamePlaceholder')}
                  placeholderTextColor={colors.textTertiary}
                  value={newWalletName}
                  onChangeText={setNewWalletName}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: colors.surface || '#f3f4f6',
                        borderWidth: 1,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={closeWalletModal}
                  >
                    <Text
                      style={[
                        styles.modalButtonText,
                        { color: colors.text || '#000000', fontFamily: fonts.bodyBold },
                      ]}
                    >
                      {t('portfolio.cancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={handleAddWallet}
                  >
                    <Text style={[styles.modalButtonText, { color: 'white', fontFamily: fonts.bodyBold }]}>
                      {t('portfolio.save')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>

      {/* Transaction Type Selection Modal */}
      <Modal
        visible={showTransactionModal && !selectedTransactionType}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('portfolio.transactionType')}
            </Text>
            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setSelectedTransactionType('deposit')}
            >
              <Plus size={24} color={colors.primary} />
              <Text
                style={[styles.transactionTypeText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}
              >
                {t('portfolio.depositType')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setSelectedTransactionType('withdrawal')}
            >
              <Minus size={24} color="#EF4444" />
              <Text
                style={[styles.transactionTypeText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}
              >
                {t('portfolio.withdrawalType')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                backgroundColor: '#6366f1',
              }}
              onPress={() => {
                setShowTransactionModal(false);
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#FFFFFF', fontFamily: fonts.bodyBold }]}>
                {t('portfolio.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Transaction Form Modal */}
      <Modal
        visible={selectedTransactionType !== null}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, maxHeight: '90%' },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('portfolio.registerDeposit')}
            </Text>

            {/* Crypto Selector */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('portfolio.coin')}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cryptoSelector}
            >
              {cryptos.map((crypto) => (
                <TouchableOpacity
                  key={crypto.id}
                  style={[
                    styles.cryptoOption,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                    transactionForm.crypto === crypto.id && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    setTransactionForm({
                      ...transactionForm,
                      crypto: crypto.id,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.cryptoOptionIcon,
                      {
                        color:
                          transactionForm.crypto === crypto.id
                            ? 'white'
                            : crypto.color,
                      },
                    ]}
                  >
                    {crypto.icon}
                  </Text>
                  <Text
                    style={[
                      styles.cryptoOptionText,
                      {
                        color:
                          transactionForm.crypto === crypto.id
                            ? 'white'
                            : colors.text,
                        fontFamily: fonts.secondaryMedium,
                      },
                    ]}
                  >
                    {crypto.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Wallet Selector */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('portfolio.wallet')}</Text>
            <TouchableOpacity
              style={[
                styles.select,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setShowWalletPicker(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: transactionForm.wallet
                      ? colors.text
                      : colors.textTertiary,
                    fontFamily: fonts.body,
                  },
                ]}
              >
                {wallets.find((w) => w.id === transactionForm.wallet)?.name ||
                  t('portfolio.selectWallet')}
              </Text>
            </TouchableOpacity>

            {/* Price */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
              {t('portfolio.coinPrice')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="$0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.price}
              onChangeText={(text) => {
                const formatted = formatCurrency(text);
                setTransactionForm((prev) => ({
                  ...prev,
                  price: formatted,
                  quantity: calculateQuantity(prev.amount, formatted),
                }));
              }}
            />

            {/* Date */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
              {t('portfolio.depositDate')}
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={{
                  color: transactionForm.date
                    ? colors.text
                    : colors.textTertiary,
                  fontSize: 16,
                  fontFamily: fonts.body,
                }}
              >
                {transactionForm.date || 'DD/MM/YYYY'}
              </Text>
            </TouchableOpacity>

            {/* Amount */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
              {t('portfolio.depositValue')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="$0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.amount}
              onChangeText={(text) => {
                const formatted = formatCurrency(text);
                setTransactionForm((prev) => ({
                  ...prev,
                  amount: formatted,
                  quantity: calculateQuantity(formatted, prev.price),
                }));
              }}
            />

            {/* Quantity */}
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
              {t('portfolio.coinQuantity')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface + '80',
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder={t('portfolio.autoCalculated')}
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.quantity}
              onChangeText={() => {}}
              editable={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.surface || '#f3f4f6',
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setSelectedTransactionType(null);
                  setShowTransactionModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    { color: colors.text || '#000000', fontFamily: fonts.bodyBold },
                  ]}
                >
                  {t('portfolio.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleAddTransaction}
              >
                <Text style={[styles.modalButtonText, { color: 'white', fontFamily: fonts.bodyBold }]}>
                  {t('portfolio.save')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Wallet Picker Modal */}
      <Modal
        visible={showWalletPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWalletPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('portfolio.selectWallet')}
            </Text>

            <ScrollView style={{ maxHeight: 400 }}>
              {wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  style={[
                    styles.walletPickerOption,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                    transactionForm.wallet === wallet.id && {
                      backgroundColor: colors.primary + '20',
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => {
                    setTransactionForm({
                      ...transactionForm,
                      wallet: wallet.id,
                    });
                    setShowWalletPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.walletPickerText,
                      {
                        color:
                          transactionForm.wallet === wallet.id
                            ? colors.primary
                            : colors.text,
                        fontFamily: fonts.bodySemiBold,
                      },
                    ]}
                  >
                    {wallet.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: colors.surface || '#f3f4f6',
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setShowWalletPicker(false)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.text || '#000000' },
                ]}
              >
                {t('portfolio.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('portfolio.selectDate')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 16,
                maxHeight: 300,
              }}
            >
              {/* Days of month */}
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                  {t('portfolio.dayOfMonth')}
                </Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => {
                        const now = new Date();
                        const selectedDate = `${day
                          .toString()
                          .padStart(2, '0')}/${(now.getMonth() + 1)
                          .toString()
                          .padStart(2, '0')}/${now.getFullYear()}`;
                        setTransactionForm((prev) => ({
                          ...prev,
                          date: selectedDate,
                        }));
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={{ color: colors.text, fontFamily: fonts.bodySemiBold }}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: colors.surface || '#f3f4f6',
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginTop: 16,
                },
              ]}
              onPress={() => setShowDatePicker(false)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.text || '#000000' },
                ]}
              >
                {t('portfolio.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  topActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  marketCard: {
    borderRadius: 12,
  },
  marketTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  marketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  marketCoinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  marketCoinIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marketCoinIconText: {
    fontSize: 16,
  },
  marketCoinName: {
    fontSize: 15,
    marginBottom: 2,
  },
  marketCoinSymbol: {
    fontSize: 12,
  },
  marketCoinPriceBox: {
    alignItems: 'flex-end',
  },
  marketCoinPrice: {
    fontSize: 15,
    marginBottom: 2,
  },
  marketCoinChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  marketCoinChangeText: {
    fontSize: 12,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    width: '100%',
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardValue: {
    fontSize: 24,
    marginBottom: 16,
  },
  cardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTrendText: {
    fontSize: 12,
  },
  cardChart: {
    alignItems: 'flex-start',
    marginTop: 8,
    maxHeight: 200,
    overflow: 'hidden',
  },
  tableContainer: {
    borderRadius: 12,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  table: {
    minWidth: 800,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    marginBottom: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    width: 100,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tableCell: {
    width: 100,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
  cryptoCell: {
    fontSize: 14,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
  },
  actionsCell: {
    flexDirection: 'row',
    gap: 8,
    width: 80,
  },
  actionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  modalHeaderTitle: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
  },
  walletsList: {
    flex: 1,
    padding: 20,
  },
  walletCard: {
    borderRadius: 12,
    marginBottom: 16,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletName: {
    fontSize: 18,
  },
  walletActions: {
    flexDirection: 'row',
    gap: 16,
  },
  walletStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletValue: {
    fontSize: 24,
  },
  walletProfitBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  walletProfitText: {
    fontSize: 14,
  },
  walletChart: {
    minHeight: 200,
    marginTop: 8,
    overflow: 'hidden',
  },
  addWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    gap: 8,
  },
  addWalletText: {
    fontSize: 16,
    color: 'white',
  },
  transactionTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 8,
  },
  transactionTypeText: {
    fontSize: 16,
  },
  cryptoSelector: {
    marginBottom: 16,
  },
  cryptoOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 80,
  },
  cryptoOptionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  cryptoOptionText: {
    fontSize: 12,
  },
  select: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  selectText: {
    fontSize: 16,
  },
  walletPickerOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  walletPickerText: {
    fontSize: 16,
  },
  dayButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
});

