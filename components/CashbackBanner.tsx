import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Gift,
  Coins,
  ArrowRight,
} from 'lucide-react-native';

interface CashbackBannerProps {
  cashbackPercentage: number;
  cashbackAmount: string;
  onPress?: () => void;
}

export default function CashbackBanner({ 
  cashbackPercentage, 
  cashbackAmount, 
  onPress 
}: CashbackBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Gift size={24} color="white" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Cashback Disponível!</Text>
            <Text style={styles.subtitle}>
              Ganhe {cashbackPercentage}% de volta ({cashbackAmount})
            </Text>
          </View>
          
          <View style={styles.coinsContainer}>
            <Coins size={20} color="white" />
            <ArrowRight size={16} color="white" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});