import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Crown,
  CheckCircle,
  Star,
  Zap,
  Users,
  Award,
  BookOpen,
  Clock,
  Gift,
  Infinity,
} from 'lucide-react-native';

interface SubscriptionPlanProps {
  onSubscribe: () => void;
}

export default function SubscriptionPlan({ onSubscribe }: SubscriptionPlanProps) {
  const { colors } = useTheme();

  const benefits = [
    {
      icon: BookOpen,
      title: 'Acesso a +50 Cursos',
      description: 'Biblioteca completa de cursos sobre criptomoedas',
    },
    {
      icon: Infinity,
      title: 'Acesso Ilimitado',
      description: 'Assista quantas vezes quiser, sem restrições',
    },
    {
      icon: Award,
      title: 'Certificados Premium',
      description: 'Certificados especiais para assinantes',
    },
    {
      icon: Zap,
      title: 'Conteúdo Exclusivo',
      description: 'Cursos e materiais apenas para assinantes',
    },
    {
      icon: Users,
      title: 'Comunidade VIP',
      description: 'Acesso ao grupo exclusivo de assinantes',
    },
    {
      icon: Gift,
      title: 'Cashback Dobrado',
      description: 'Ganhe 2x mais cashback em compras extras',
    },
  ];

  const stats = [
    { label: 'Cursos Inclusos', value: '50+' },
    { label: 'Horas de Conteúdo', value: '200+' },
    { label: 'Certificados', value: 'Ilimitados' },
    { label: 'Suporte', value: 'Prioritário' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        style={styles.header}
      >
        <View style={styles.crownContainer}>
          <Crown size={32} color="white" fill="white" />
        </View>
        <Text style={styles.planTitle}>PLANO ANUAL PREMIUM</Text>
        <Text style={styles.planSubtitle}>
          Acesso completo à plataforma por 12 meses
        </Text>
        
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>De R$ 1.799,90</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-60%</Text>
            </View>
          </View>
          <Text style={styles.currentPrice}>R$ 699,90</Text>
          <Text style={styles.priceSubtext}>
            ou 12x de R$ 58,33 sem juros
          </Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.warning }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>O que está incluído:</Text>
        <View style={styles.benefitsList}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <View key={index} style={[styles.benefitItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.benefitIcon}>
                  <Icon size={20} color="#F59E0B" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={[styles.benefitTitle, { color: colors.text }]}>{benefit.title}</Text>
                  <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                    {benefit.description}
                  </Text>
                </View>
                <CheckCircle size={20} color="#10B981" />
              </View>
            );
          })}
        </View>
      </View>

      {/* Comparison */}
      <View style={styles.comparisonSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Comparação de Planos:</Text>
        <View style={[styles.comparisonTable, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.comparisonHeader}>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Recurso</Text>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Gratuito</Text>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Premium</Text>
          </View>
          
          {[
            { feature: 'Cursos Básicos', free: '3', premium: '50+' },
            { feature: 'Certificados', free: '❌', premium: '✅' },
            { feature: 'Suporte', free: 'Email', premium: 'Prioritário' },
            { feature: 'Comunidade VIP', free: '❌', premium: '✅' },
            { feature: 'Cashback', free: '5%', premium: '10%' },
          ].map((row, index) => (
            <View key={index} style={[styles.comparisonRow, { borderBottomColor: colors.border }]}>
              <Text style={[styles.comparisonFeature, { color: colors.text }]}>{row.feature}</Text>
              <Text style={[styles.comparisonFree, { color: colors.textSecondary }]}>{row.free}</Text>
              <Text style={[styles.comparisonPremium, { color: colors.warning }]}>{row.premium}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.testimonialsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>O que dizem nossos assinantes:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              name: 'Carlos Silva',
              text: 'Melhor investimento que fiz! Aprendi muito sobre DeFi.',
              rating: 5,
            },
            {
              name: 'Ana Costa',
              text: 'Conteúdo de qualidade e suporte excelente.',
              rating: 5,
            },
            {
              name: 'João Santos',
              text: 'Recomendo para quem quer se aprofundar em cripto.',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <View key={index} style={[styles.testimonialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.testimonialHeader}>
                <View style={styles.testimonialAvatar}>
                  <Text style={styles.testimonialInitial}>
                    {testimonial.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.testimonialInfo}>
                  <Text style={[styles.testimonialName, { color: colors.text }]}>{testimonial.name}</Text>
                  <View style={styles.testimonialRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        color="#F59E0B"
                        fill="#F59E0B"
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={[styles.testimonialText, { color: colors.textSecondary }]}>{testimonial.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* CTA Button */}
      <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribe}>
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.subscribeGradient}
        >
          <Crown size={20} color="white" />
          <Text style={styles.subscribeText}>Assinar Plano Premium</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Guarantee */}
      <View style={[styles.guaranteeSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.guaranteeIcon}>
          <CheckCircle size={24} color="#10B981" />
        </View>
        <View style={styles.guaranteeContent}>
          <Text style={[styles.guaranteeTitle, { color: colors.text }]}>Garantia de 30 dias</Text>
          <Text style={[styles.guaranteeText, { color: colors.textSecondary }]}>
            Se não ficar satisfeito, devolvemos 100% do seu dinheiro
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 16,
    margin: 20,
  },
  crownContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  planSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  currentPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  priceSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 0,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  benefitsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
  },
  comparisonSection: {
    padding: 20,
  },
  comparisonTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
  },
  comparisonHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  comparisonFeature: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  comparisonFree: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  comparisonPremium: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  testimonialsSection: {
    padding: 20,
  },
  testimonialCard: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testimonialInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
  },
  subscribeButton: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  subscribeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  guaranteeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    borderWidth: 1,
  },
  guaranteeIcon: {
    marginRight: 12,
  },
  guaranteeContent: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  guaranteeText: {
    fontSize: 14,
  },
});