import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Polyline, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface LineData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineData[];
  title?: string;
  color?: string;
}

export default function LineChart({ data, title, color = '#3B82F6' }: LineChartProps) {
  const { colors } = useTheme();
  const chartHeight = 180;
  const chartWidth = width - 64;
  const padding = 20;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - padding * 2);
    const y = padding + ((maxValue - item.value) / range) * (chartHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const dataPoints = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - padding * 2);
    const y = padding + ((maxValue - item.value) / range) * (chartHeight - padding * 2);
    return { x, y, value: item.value, label: item.label };
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}

      <View style={styles.chartContainer}>
        <LinearGradient
          colors={[color + '20', color + '05', 'transparent']}
          style={styles.gradient}
        >
          <Svg width={chartWidth} height={chartHeight}>
            <Polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {dataPoints.map((point, index) => (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </Svg>
        </LinearGradient>
      </View>

      <View style={styles.xAxis}>
        {data.map((item, index) => (
          <Text key={index} style={[styles.xLabel, { color: colors.textTertiary }]} numberOfLines={1}>
            {item.label}
          </Text>
        ))}
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Máximo</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{maxValue.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mínimo</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{minValue.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Média</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(2)}
          </Text>
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  gradient: {
    borderRadius: 8,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  xLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
