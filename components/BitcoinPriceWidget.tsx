import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import {
  bitcoinPriceService,
  BitcoinPriceData,
} from '@/services/BitcoinPriceService';

interface BitcoinPriceWidgetProps {
  onPress?: () => void;
}

export default function BitcoinPriceWidget({
  onPress,
}: BitcoinPriceWidgetProps) {
  const { colors } = useTheme();
  const [priceData, setPriceData] = useState<BitcoinPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchPrice = async () => {
    try {
      setLoading(true);
      const data = await bitcoinPriceService.getCurrentPrice();
      setPriceData(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();

    // Atualizar preço a cada 5 minutos
    const interval = setInterval(fetchPrice, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  };

  const formatVariation = (variation: number) => {
    const sign = variation >= 0 ? '+' : '';
    return `${sign}${variation.toFixed(2)}%`;
  };

  const getVariationColor = (variation: number) => {
    return variation >= 0 ? '#10B981' : '#EF4444';
  };

  const getVariationIcon = (variation: number) => {
    return variation >= 0 ? TrendingUp : TrendingDown;
  };

  if (loading && !priceData) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Carregando preço do Bitcoin...
          </Text>
        </View>
      </View>
    );
  }

  if (!priceData) {
    return null;
  }

  const VariationIcon = getVariationIcon(priceData.variationPercent);
  const variationColor = getVariationColor(priceData.variationPercent);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.bitcoinSymbol}>₿</Text>
          <Text style={styles.bitcoinText}>Bitcoin</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchPrice}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              color="white"
              style={loading ? styles.refreshing : undefined}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.priceSection}>
          <Text style={[styles.price, { color: colors.text }]}>
            {formatPrice(priceData.price)}
          </Text>
          <View style={styles.variationContainer}>
            <VariationIcon size={16} color={variationColor} />
            <Text style={[styles.variation, { color: variationColor }]}>
              {formatVariation(priceData.variationPercent)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.lastUpdate, { color: colors.textSecondary }]}>
            {lastUpdate
              ? `Atualizado ${lastUpdate.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : 'Carregando...'}
          </Text>
          <Text style={[styles.tapHint, { color: colors.textSecondary }]}>
            Toque para ver gráfico
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bitcoinSymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bitcoinText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    marginLeft: 8,
  },
  refreshButton: {
    padding: 4,
  },
  refreshing: {
    opacity: 0.5,
  },
  content: {
    padding: 16,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  variationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  variation: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastUpdate: {
    fontSize: 12,
  },
  tapHint: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
