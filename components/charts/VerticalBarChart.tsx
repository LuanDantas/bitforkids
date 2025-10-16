import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface BarData {
  label: string;
  value: number;
  color: string;
}

interface VerticalBarChartProps {
  data: BarData[];
  title?: string;
  maxValue?: number;
}

export default function VerticalBarChart({ data, title, maxValue }: VerticalBarChartProps) {
  const { colors } = useTheme();
  const max = maxValue || Math.max(...data.map(d => d.value));
  const chartHeight = 200;

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}

      <View style={[styles.chartArea, { height: chartHeight }]}>
        <View style={styles.yAxis}>
          {[100, 75, 50, 25, 0].map((tick) => (
            <Text key={tick} style={[styles.yAxisLabel, { color: colors.textTertiary }]}>
              {Math.round((max * tick) / 100)}
            </Text>
          ))}
        </View>

        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const percentage = (item.value / max) * 100;

            return (
              <View key={index} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <LinearGradient
                    colors={[item.color, item.color + '88']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.bar, { height: `${percentage}%` }]}
                  >
                    <Text style={styles.barValue}>{item.value.toFixed(0)}</Text>
                  </LinearGradient>
                </View>
                <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
                  {item.label}
                </Text>
              </View>
            );
          })}
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
    gap: 12,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  yAxisLabel: {
    fontSize: 10,
    textAlign: 'right',
    minWidth: 30,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingBottom: 24,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 40,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});
