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
import { usePortfolio } from '@/hooks/usePortfolio';

// Identidade visual por símbolo (ícone/cor) para exibição.
const cryptos = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A' },
  { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627EEA' },
  { id: 'SOL', name: 'Solana', icon: '◎', color: '#9945FF' },
  { id: 'BNB', name: 'BNB', icon: 'B', color: '#F3BA2F' },
  { id: 'XRP', name: 'XRP', icon: 'X', color: '#23292F' },
  { id: 'ADA', name: 'Cardano', icon: 'A', color: '#0033AD' },
];

export default function TransactionDetailsScreen() {
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { positions, loading } = usePortfolio();

  const transaction = positions.find((p) => p.id === id);
  const crypto = cryptos.find((c) => c.id === transaction?.crypto);
  const profitColor = (transaction?.profit ?? 0) >= 0 ? '#10B981' : '#EF4444';

  if (!transaction) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
          styles.centered,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colors.textSecondary, fontFamily: fonts.body }}>
              {t('portfolio.errorGeneric')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#0f172a', '#1e293b'] : ['#4f46e5', '#3b82f6']}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('portfolioDetail.title')}</Text>
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
              <Text style={[styles.cryptoIconText, { color: crypto?.color, fontFamily: fonts.bodyBold }]}>
                {crypto?.icon}
              </Text>
            </View>
            <View style={styles.cryptoInfo}>
              <Text style={[styles.cryptoName, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                {crypto?.name}
              </Text>
              <Text
                style={[styles.cryptoSymbol, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {transaction.crypto}
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                {t('portfolioDetail.currentPrice')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                $
                {transaction.currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                {t('portfolioDetail.quantity')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                {transaction.quantity}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                {t('portfolioDetail.avgPrice')}
              </Text>
              <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
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
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            {t('portfolioDetail.financialSummary')}
          </Text>

          <View style={styles.financialGrid}>
            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {t('portfolioDetail.investment')}
              </Text>
              <View style={styles.financialValueContainer}>
                <DollarSign size={16} color={colors.textSecondary} />
                <Text style={[styles.financialValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  $
                  {transaction.investment.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {t('portfolioDetail.currentBalance')}
              </Text>
              <View style={styles.financialValueContainer}>
                <DollarSign size={16} color={colors.primary} />
                <Text style={[styles.financialValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
                  $
                  {transaction.balance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.financialItem}>
              <Text
                style={[styles.financialLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {t('portfolioDetail.profitLoss')}
              </Text>
              <View style={styles.financialValueContainer}>
                <Text
                  style={[
                    styles.financialValue,
                    { color: profitColor, fontFamily: fonts.bodyBold },
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
                style={[styles.financialLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {t('portfolioDetail.percentage')}
              </Text>
              <View
                style={[
                  styles.percentageBadge,
                  { backgroundColor: profitColor + '20' },
                ]}
              >
                <Text style={[styles.percentageText, { color: profitColor, fontFamily: fonts.bodyBold }]}>
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
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            {t('portfolioDetail.performanceHistory')}
          </Text>
          <Text
            style={{
              color: colors.textTertiary,
              fontFamily: fonts.body,
              fontSize: 13,
              paddingVertical: 12,
            }}
          >
            {t('portfolioDetail.historyUnavailable')}
          </Text>
        </View>

        {/* Wallets Distribution */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
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
                    <Text style={[styles.walletName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                      {wallet.name}
                    </Text>
                    <Text
                      style={[
                        styles.walletPercentage,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {wallet.percentage}%
                    </Text>
                  </View>
                  <Text style={[styles.walletValue, { color: colors.text, fontFamily: fonts.bodyBold }]}>
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
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 18,
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
    backgroundColor: '#6366f110',
  },
  dateText: {
    fontSize: 12,
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
  },
  sectionTitle: {
    fontSize: 18,
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
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  percentageText: {
    fontSize: 14,
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
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 14,
  },
  walletPercentage: {
    fontSize: 12,
    marginTop: 2,
  },
  walletValue: {
    fontSize: 16,
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
