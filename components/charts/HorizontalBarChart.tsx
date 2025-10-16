import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface BarData {
  label: string;
  value: number;
  color: string;
}

interface HorizontalBarChartProps {
  data: BarData[];
  title?: string;
  maxValue?: number;
}

export default function HorizontalBarChart({ data, title, maxValue }: HorizontalBarChartProps) {
  const { colors } = useTheme();
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}

      <View style={styles.barsContainer}>
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;

          return (
            <View key={index} style={styles.barRow}>
              <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
              <View style={styles.barWrapper}>
                <View style={[styles.barBackground, { backgroundColor: colors.surface }]}>
                  <LinearGradient
                    colors={[item.color, item.color + 'AA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.bar, { width: `${percentage}%` }]}
                  />
                </View>
                <Text style={[styles.value, { color: colors.textSecondary }]}>
                  {item.value.toFixed(1)}%
                </Text>
              </View>
            </View>
          );
        })}
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
  barsContainer: {
    gap: 16,
  },
  barRow: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barBackground: {
    flex: 1,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 12,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'right',
  },
});
