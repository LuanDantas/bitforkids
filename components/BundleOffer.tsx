import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Package,
  Star,
  Clock,
  CheckCircle,
  Zap,
} from 'lucide-react-native';

interface BundleOfferProps {
  bundle: {
    id: number;
    title: string;
    description: string;
    courses: Array<{
      id: number;
      title: string;
      duration: string;
    }>;
    originalPrice: string;
    bundlePrice: string;
    savings: string;
    savingsPercentage: number;
    rating: number;
    totalDuration: string;
    features: string[];
  };
  onPress: () => void;
}

export default function BundleOffer({ bundle, onPress }: BundleOfferProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Package size={24} color="white" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.bundleTitle}>PACOTE COMPLETO</Text>
            <Text style={styles.savingsText}>
              Economize {bundle.savingsPercentage}%
            </Text>
          </View>
          <View style={styles.zapIcon}>
            <Zap size={20} color="#F59E0B" fill="#F59E0B" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.title}>{bundle.title}</Text>
        <Text style={styles.description}>{bundle.description}</Text>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.statText}>{bundle.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{bundle.totalDuration}</Text>
          </View>
          <View style={styles.statItem}>
            <Package size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{bundle.courses.length} cursos</Text>
          </View>
        </View>

        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Cursos inclusos:</Text>
          {bundle.courses.map((course, index) => (
            <View key={course.id} style={styles.courseItem}>
              <CheckCircle size={16} color="#10B981" />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDuration}>{course.duration}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Benefícios extras:</Text>
          {bundle.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <CheckCircle size={14} color="#8B5CF6" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pricing}>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>De {bundle.originalPrice}</Text>
            <Text style={styles.bundlePrice}>Por {bundle.bundlePrice}</Text>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savings}>Você economiza {bundle.savings}</Text>
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  bundleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  zapIcon: {
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  coursesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
  },
  courseDuration: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  featuresSection: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  pricing: {
    backgroundColor: '#0f0f0f',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  bundlePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  savingsContainer: {
    alignItems: 'center',
  },
  savings: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
});