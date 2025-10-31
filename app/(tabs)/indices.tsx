import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react-native';

// Market Indices Data
const marketIndices = [
  {
    id: 'SP500',
    name: 'S&P 500',
    value: 4685.25,
    change: 0.85,
    changePercent: 0.02,
    chartData: [
      { label: 'Jan', value: 4600 },
      { label: 'Fev', value: 4625 },
      { label: 'Mar', value: 4650 },
      { label: 'Abr', value: 4640 },
      { label: 'Mai', value: 4660 },
      { label: 'Jun', value: 4670 },
      { label: 'Jul', value: 4675 },
      { label: 'Ago', value: 4680 },
      { label: 'Set', value: 4682 },
      { label: 'Out', value: 4683 },
      { label: 'Nov', value: 4684 },
      { label: 'Dez', value: 4685.25 },
    ],
  },
  {
    id: 'NASDAQ',
    name: 'NASDAQ',
    value: 14501.85,
    change: -15.25,
    changePercent: -0.11,
    chartData: [
      { label: 'Jan', value: 14200 },
      { label: 'Fev', value: 14300 },
      { label: 'Mar', value: 14400 },
      { label: 'Abr', value: 14350 },
      { label: 'Mai', value: 14420 },
      { label: 'Jun', value: 14450 },
      { label: 'Jul', value: 14480 },
      { label: 'Ago', value: 14490 },
      { label: 'Set', value: 14500 },
      { label: 'Out', value: 14510 },
      { label: 'Nov', value: 14520 },
      { label: 'Dez', value: 14501.85 },
    ],
  },
  {
    id: 'DOW',
    name: 'Dow Jones',
    value: 36247.12,
    change: 125.5,
    changePercent: 0.35,
    chartData: [
      { label: 'Jan', value: 35800 },
      { label: 'Fev', value: 35900 },
      { label: 'Mar', value: 36000 },
      { label: 'Abr', value: 36050 },
      { label: 'Mai', value: 36100 },
      { label: 'Jun', value: 36150 },
      { label: 'Jul', value: 36180 },
      { label: 'Ago', value: 36200 },
      { label: 'Set', value: 36210 },
      { label: 'Out', value: 36220 },
      { label: 'Nov', value: 36230 },
      { label: 'Dez', value: 36247.12 },
    ],
  },
  {
    id: 'FTSE',
    name: 'FTSE 100',
    value: 7574.38,
    change: 8.15,
    changePercent: 0.11,
    chartData: [
      { label: 'Jan', value: 7450 },
      { label: 'Fev', value: 7500 },
      { label: 'Mar', value: 7520 },
      { label: 'Abr', value: 7510 },
      { label: 'Mai', value: 7530 },
      { label: 'Jun', value: 7540 },
      { label: 'Jul', value: 7550 },
      { label: 'Ago', value: 7555 },
      { label: 'Set', value: 7560 },
      { label: 'Out', value: 7565 },
      { label: 'Nov', value: 7570 },
      { label: 'Dez', value: 7574.38 },
    ],
  },
  {
    id: 'NIKKEI',
    name: 'Nikkei 225',
    value: 32820.52,
    change: -185.3,
    changePercent: -0.56,
    chartData: [
      { label: 'Jan', value: 33000 },
      { label: 'Fev', value: 33100 },
      { label: 'Mar', value: 33050 },
      { label: 'Abr', value: 32950 },
      { label: 'Mai', value: 32900 },
      { label: 'Jun', value: 32850 },
      { label: 'Jul', value: 32830 },
      { label: 'Ago', value: 32820 },
      { label: 'Set', value: 32825 },
      { label: 'Out', value: 32830 },
      { label: 'Nov', value: 32835 },
      { label: 'Dez', value: 32820.52 },
    ],
  },
  {
    id: 'IBOVESPA',
    name: 'Ibovespa',
    value: 128547.82,
    change: 425.18,
    changePercent: 0.33,
    chartData: [
      { label: 'Jan', value: 126000 },
      { label: 'Fev', value: 127000 },
      { label: 'Mar', value: 127500 },
      { label: 'Abr', value: 128000 },
      { label: 'Mai', value: 128200 },
      { label: 'Jun', value: 128300 },
      { label: 'Jul', value: 128400 },
      { label: 'Ago', value: 128450 },
      { label: 'Set', value: 128500 },
      { label: 'Out', value: 128520 },
      { label: 'Nov', value: 128530 },
      { label: 'Dez', value: 128547.82 },
    ],
  },
];

// Simple Chart Component
const SimpleChart = ({
  data,
}: {
  data: { label: string; value: number }[];
}) => {
  const { colors } = useTheme();
  const chartHeight = 80;
  const chartWidth = 300;
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <View style={{ height: chartHeight, width: chartWidth }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ height: chartHeight, width: chartWidth }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: chartHeight - 20,
              gap: 4,
              paddingHorizontal: 10,
            }}
          >
            {data.map((item, index) => {
              const barHeight =
                ((item.value - minValue) / range) * (chartHeight - 20);
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    height: Math.max(barHeight, 2),
                    backgroundColor:
                      index === data.length - 1 ? '#8B5CF6' : '#3B82F6',
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default function IndicesScreen() {
  const { colors, isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderIndexCard = (index: (typeof marketIndices)[0]) => {
    const isPositive = index.change >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const changeColor = isPositive ? '#10B981' : '#EF4444';

    return (
      <TouchableOpacity
        key={index.id}
        style={[
          styles.indexCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.indexInfo}>
            <Text style={[styles.indexName, { color: colors.text }]}>
              {index.name}
            </Text>
            <Text style={[styles.indexValue, { color: colors.text }]}>
              {index.value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View
            style={[
              styles.changeBadge,
              { backgroundColor: changeColor + '20' },
            ]}
          >
            <TrendIcon size={14} color={changeColor} />
            <Text style={[styles.changeText, { color: changeColor }]}>
              {isPositive ? '+' : ''}
              {index.change.toFixed(2)} ({isPositive ? '+' : ''}
              {index.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
        <SimpleChart data={index.chartData} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Índices de Mercado</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe os principais índices mundiais
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Indices Cards */}
        <View style={styles.indicesContainer}>
          {marketIndices.map((index) => renderIndexCard(index))}
        </View>
      </ScrollView>
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
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  indicesContainer: {
    padding: 20,
    gap: 16,
  },
  indexCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  indexInfo: {
    flex: 1,
  },
  indexName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  indexValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
