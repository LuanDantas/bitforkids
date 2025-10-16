import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowUp, ArrowDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CandleData {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface CandlestickChartProps {
  data: CandleData[];
  title?: string;
}

export default function CandlestickChart({ data, title }: CandlestickChartProps) {
  const { colors } = useTheme();

  const allValues = data.flatMap(d => [d.high, d.low]);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue;
  const chartHeight = 200;

  const getYPosition = (value: number) => {
    return ((maxValue - value) / range) * (chartHeight - 40) + 20;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}

      <View style={[styles.chartArea, { height: chartHeight + 40 }]}>
        {data.map((candle, index) => {
          const isBullish = candle.close > candle.open;
          const candleColor = isBullish ? '#10B981' : '#EF4444';

          const highY = getYPosition(candle.high);
          const lowY = getYPosition(candle.low);
          const openY = getYPosition(candle.open);
          const closeY = getYPosition(candle.close);

          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);

          return (
            <View key={index} style={styles.candleContainer}>
              <View style={styles.candleWrapper}>
                <View
                  style={[
                    styles.wick,
                    {
                      backgroundColor: candleColor,
                      top: highY,
                      height: lowY - highY,
                    }
                  ]}
                />
                <View
                  style={[
                    styles.body,
                    {
                      backgroundColor: candleColor,
                      borderColor: candleColor,
                      top: bodyTop,
                      height: Math.max(bodyHeight, 2),
                    }
                  ]}
                />
              </View>
              <Text style={[styles.timeLabel, { color: colors.textTertiary }]} numberOfLines={1}>
                {candle.time}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <ArrowUp size={16} color="#10B981" />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>Alta</Text>
        </View>
        <View style={styles.legendItem}>
          <ArrowDown size={16} color="#EF4444" />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>Baixa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  candleContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  candleWrapper: {
    width: '60%',
    height: '100%',
    position: 'relative',
  },
  wick: {
    position: 'absolute',
    width: 2,
    left: '50%',
    marginLeft: -1,
  },
  body: {
    position: 'absolute',
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
  timeLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
