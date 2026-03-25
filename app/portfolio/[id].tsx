import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Calendar,
  Wallet,
} from 'lucide-react-native';
import EnhancedCardChart from '@/components/charts/LineChart';

// Mock cryptos
const cryptos = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A' },
  { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627EEA' },
  { id: 'SOL', name: 'Solana', icon: '◎', color: '#9945FF' },
  { id: 'BNB', name: 'BNB', icon: 'B', color: '#F3BA2F' },
  { id: 'XRP', name: 'XRP', icon: 'X', color: '#23292F' },
  { id: 'ADA', name: 'Cardano', icon: 'A', color: '#0033AD' },
];

// Mock data for transaction details
const getTransactionDetails = (id: string) => {
  const mockDetails = {
    '1': {
      id: '1',
      crypto: 'BTC',
      currentPrice: 73250.45,
      quantity: 0.15,
      investment: 10000,
      balance: 10987.57,
      avgPrice: 66666.67,
      profit: 987.57,
      profitPercent: 9.88,
      trend: 'high',
      date: '15/03/2024',
      historicalData: [
        { label: 'Jan', value: 9000 },
        { label: 'Fev', value: 9500 },
        { label: 'Mar', value: 10000 },
        { label: 'Abr', value: 9800 },
        { label: 'Mai', value: 10200 },
        { label: 'Jun', value: 10500 },
        { label: 'Jul', value: 10800 },
        { label: 'Ago', value: 10750 },
        { label: 'Set', value: 10850 },
        { label: 'Out', value: 10900 },
        { label: 'Nov', value: 10950 },
        { label: 'Dez', value: 10987.57 },
      ],
      wallets: [
        { id: '1', name: 'Carteira Principal', percentage: 65, value: 7142 },
        { id: '2', name: 'Trading', percentage: 35, value: 3845.57 },
      ],
    },
    '2': {
      id: '2',
      crypto: 'ETH',
      currentPrice: 3845.67,
      quantity: 1.5,
      investment: 5000,
      balance: 5768.51,
      avgPrice: 3333.33,
      profit: 768.51,
      profitPercent: 15.37,
      trend: 'high',
      date: '20/04/2024',
      historicalData: [
        { label: 'Jan', value: 4200 },
        { label: 'Fev', value: 4500 },
        { label: 'Mar', value: 4800 },
        { label: 'Abr', value: 5000 },
        { label: 'Mai', value: 5200 },
        { label: 'Jun', value: 5300 },
        { label: 'Jul', value: 5450 },
        { label: 'Ago', value: 5500 },
        { label: 'Set', value: 5600 },
        { label: 'Out', value: 5700 },
        { label: 'Nov', value: 5750 },
        { label: 'Dez', value: 5768.51 },
      ],
      wallets: [
        { id: '1', name: 'Carteira Principal', percentage: 80, value: 4614.81 },
        { id: '2', name: 'Trading', percentage: 20, value: 1153.7 },
      ],
    },
    '3': {
      id: '3',
      crypto: 'SOL',
      currentPrice: 198.34,
      quantity: 25,
      investment: 3000,
      balance: 4958.5,
      avgPrice: 120,
      profit: 1958.5,
      profitPercent: 65.28,
      trend: 'high',
      date: '10/05/2024',
      historicalData: [
        { label: 'Jan', value: 2500 },
        { label: 'Fev', value: 2800 },
        { label: 'Mar', value: 3100 },
        { label: 'Abr', value: 3400 },
        { label: 'Mai', value: 3000 },
        { label: 'Jun', value: 3600 },
        { label: 'Jul', value: 3800 },
        { label: 'Ago', value: 4000 },
        { label: 'Set', value: 4300 },
        { label: 'Out', value: 4500 },
        { label: 'Nov', value: 4800 },
        { label: 'Dez', value: 4958.5 },
      ],
      wallets: [
        { id: '1', name: 'Carteira Principal', percentage: 100, value: 4958.5 },
      ],
    },
  };

  return mockDetails[id] || mockDetails['1'];
};

export default function TransactionDetailsScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const transaction = getTransactionDetails(id as string);
  const crypto = cryptos.find((c) => c.id === transaction.crypto);
  const profitColor = transaction.profit >= 0 ? '#10B981' : '#EF4444';
  const trendIcon =
    transaction.profitPercent >= 5
      ? TrendingUp
      : transaction.profitPercent <= -5
      ? TrendingDown
      : Eye;

  if (!transaction) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
          styles.centered,
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('portfolioDetail.title')}</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Crypto Info Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cryptoHeader}>
            <View
              style={[
                styles.cryptoIcon,
                { backgroundColor: crypto?.color + '20' },
              ]}
            >
              <Text style={[styles.cryptoIconText, { color: crypto?.color }]}>
                {crypto?.icon}
              </Text>
            </View>
            <View style={styles.cryptoInfo}>
              <Text style={[styles.cryptoName, { color: colors.text }]}>
                {crypto?.name}
              </Text>
              <Text
                style={[styles.cryptoSymbol, { color: colors.textSecondary }]}
              >
                {transaction.crypto}
              </Text>
            </View>
            <View style={styles.dateBadge}>
              <Calendar size={14} color={colors.primary} />
              <Text style={[styles.dateText, { color: colors.text }]}>
                {transaction.date}
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('portfolioDetail.currentPrice')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                $
                {transaction.currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('portfolioDetail.quantity')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {transaction.quantity}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('portfolioDetail.avgPrice')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                $
                {transaction.avgPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Summary Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('portfolioDetail.financialSummary')}
          </Text>

          <View style={styles.financialGrid}>
            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary }]}
              >
                {t('portfolioDetail.investment')}
              </Text>
              <View style={styles.financialValueContainer}>
                <DollarSign size={16} color={colors.textSecondary} />
                <Text style={[styles.financialValue, { color: colors.text }]}>
                  $
                  {transaction.investment.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary }]}
              >
                {t('portfolioDetail.currentBalance')}
              </Text>
              <View style={styles.financialValueContainer}>
                <DollarSign size={16} color={colors.primary} />
                <Text style={[styles.financialValue, { color: colors.text }]}>
                  $
                  {transaction.balance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary }]}
              >
                {t('portfolioDetail.profitLoss')}
              </Text>
              <View style={styles.financialValueContainer}>
                <Text
                  style={[
                    styles.financialValue,
                    { color: profitColor, fontWeight: 'bold' },
                  ]}
                >
                  {transaction.profit >= 0 ? '+' : ''}$
                  {transaction.profit.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary }]}
              >
                {t('portfolioDetail.percentage')}
              </Text>
              <View
                style={[
                  styles.percentageBadge,
                  { backgroundColor: profitColor + '20' },
                ]}
              >
                <Text style={[styles.percentageText, { color: profitColor }]}>
                  {transaction.profitPercent >= 0 ? '+' : ''}
                  {transaction.profitPercent.toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Historical Chart */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('portfolioDetail.performanceHistory')}
          </Text>
          <EnhancedCardChart
            data={transaction.historicalData}
            color={profitColor}
          />
        </View>

        {/* Wallets Distribution */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('portfolioDetail.walletDistribution')}
          </Text>

          <View style={styles.walletsList}>
            {transaction.wallets.map((wallet) => (
              <View
                key={wallet.id}
                style={[
                  styles.walletItem,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.walletHeader}>
                  <View style={styles.walletIcon}>
                    <Wallet size={16} color={colors.primary} />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={[styles.walletName, { color: colors.text }]}>
                      {wallet.name}
                    </Text>
                    <Text
                      style={[
                        styles.walletPercentage,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {wallet.percentage}%
                    </Text>
                  </View>
                  <Text style={[styles.walletValue, { color: colors.text }]}>
                    $
                    {wallet.value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${wallet.percentage}%`,
                        backgroundColor: profitColor,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cryptoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cryptoIconText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cryptoSymbol: {
    fontSize: 14,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#8B5CF610',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '30%',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  financialGrid: {
    gap: 16,
  },
  financialItem: {
    marginBottom: 12,
  },
  financialLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  financialValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  financialValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  walletsList: {
    gap: 12,
  },
  walletItem: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF620',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 14,
    fontWeight: '600',
  },
  walletPercentage: {
    fontSize: 12,
    marginTop: 2,
  },
  walletValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
