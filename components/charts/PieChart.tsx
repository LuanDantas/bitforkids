import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  size?: number;
}

export default function PieChart({ data, title, size = 180 }: PieChartProps) {
  const { colors } = useTheme();
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = -90;
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;

    const largeArcFlag = angle > 180 ? 1 : 0;

    const x1 = centerX + radius * Math.cos(startRadians);
    const y1 = centerY + radius * Math.sin(startRadians);
    const x2 = centerX + radius * Math.cos(endRadians);
    const y2 = centerY + radius * Math.sin(endRadians);

    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos((midAngle * Math.PI) / 180);
    const labelY = centerY + labelRadius * Math.sin((midAngle * Math.PI) / 180);

    return {
      path,
      color: item.color,
      label: item.label,
      percentage: percentage.toFixed(1),
      labelX,
      labelY,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}

      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          {segments.map((segment, index) => (
            <G key={index}>
              <Circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={radius * 2}
                strokeDasharray={`${(parseFloat(segment.percentage) / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
                strokeDashoffset={-segments.slice(0, index).reduce((sum, s) => sum + (parseFloat(s.percentage) / 100) * (2 * Math.PI * radius), 0) + (Math.PI * radius) / 2}
              />
            </G>
          ))}
        </Svg>
      </View>

      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={[styles.legendLabel, { color: colors.text }]}>{item.label}</Text>
            <Text style={[styles.legendValue, { color: colors.textSecondary }]}>
              {segments[index].percentage}%
            </Text>
          </View>
        ))}
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
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  legend: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
