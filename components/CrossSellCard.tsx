import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Star,
  Clock,
  Users,
  ArrowRight,
  Zap,
} from 'lucide-react-native';

interface CrossSellCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    price: string;
    originalPrice?: string;
    discount?: number;
    level: string;
    category: string;
  };
  onPress: () => void;
  type: 'crosssell' | 'upsell';
}

export default function CrossSellCard({ course, onPress, type }: CrossSellCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return '#10B981';
      case 'Intermediário':
        return '#F59E0B';
      case 'Avançado':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTypeConfig = () => {
    if (type === 'upsell') {
      return {
        badge: 'UPGRADE',
        badgeColor: ['#F59E0B', '#D97706'],
        icon: Zap,
        description: 'Aprimore seus conhecimentos'
      };
    }
    return {
      badge: 'RECOMENDADO',
      badgeColor: ['#8B5CF6', '#7C3AED'],
      icon: ArrowRight,
      description: 'Curso relacionado'
    };
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <LinearGradient
          colors={config.badgeColor}
          style={styles.badge}
        >
          <Icon size={12} color="white" />
          <Text style={styles.badgeText}>{config.badge}</Text>
        </LinearGradient>
        {course.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{course.discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{config.description}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.instructor}>{course.instructor}</Text>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.infoText}>{course.rating}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Users size={12} color="#9CA3AF" />
            <Text style={styles.infoText}>{course.students}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={12} color="#9CA3AF" />
            <Text style={styles.infoText}>{course.duration}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{course.price}</Text>
            {course.originalPrice && (
              <Text style={styles.originalPrice}>{course.originalPrice}</Text>
            )}
          </View>
          
          <View
            style={[
              styles.levelBadge,
              { backgroundColor: `${getLevelColor(course.level)}20` },
            ]}
          >
            <Text
              style={[
                styles.levelText,
                { color: getLevelColor(course.level) },
              ]}
            >
              {course.level}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
    width: 280,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  description: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  originalPrice: {
    fontSize: 12,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
  },
});