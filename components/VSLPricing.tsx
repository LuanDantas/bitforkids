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
  ArrowRight,
  Clock,
  Users,
  Zap,
  Gift,
} from 'lucide-react-native';

interface VSLPricingProps {
  onPremiumPress: () => void;
  onCoursesPress: () => void;
}

export default function VSLPricing({
  onPremiumPress,
  onCoursesPress,
}: VSLPricingProps) {
  const { colors } = useTheme();

  const premiumBenefits = [
    { icon: Crown, text: 'Acesso a +50 cursos completos' },
    { icon: Clock, text: 'Mais de 200 horas de conteúdo' },
    { icon: Users, text: 'Comunidade VIP exclusiva' },
    { icon: Gift, text: 'Cashback dobrado (10%)' },
    { icon: CheckCircle, text: 'Suporte prioritário' },
  ];

  const courseOptions = [
    {
      title: 'Bitcoin para Iniciantes',
      price: 'R$ 149,90',
      duration: '2h 15min',
      students: '3.2k',
      rating: 4.5,
    },
    {
      title: 'Trading Avançado',
      price: 'R$ 299,90',
      duration: '4h 30min',
      students: '890',
      rating: 4.9,
    },
    {
      title: 'DeFi Completo',
      price: 'R$ 199,90',
      duration: '3h 45min',
      students: '1.1k',
      rating: 4.7,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Escolha sua opção ideal
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Recomendamos o Plano Premium para máxima economia e acesso completo
        </Text>
      </View>

      {/* Premium Plan - Main Offer */}
      <View style={styles.section}>
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.premiumCard}
        >
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>MAIS POPULAR</Text>
          </View>

          <View style={styles.premiumHeader}>
            <Crown size={32} color="white" />
            <Text style={styles.premiumTitle}>PLANO ANUAL PREMIUM</Text>
            <Text style={styles.premiumSubtitle}>
              Acesso completo por 12 meses
            </Text>
          </View>

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

          <View style={styles.benefitsContainer}>
            {premiumBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <View key={index} style={styles.benefitItem}>
                  <Icon size={16} color="white" />
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity style={styles.premiumCTA} onPress={onPremiumPress}>
            <Text style={styles.premiumCTAText}>
              QUERO O PLANO PREMIUM AGORA
            </Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          <Text style={styles.guaranteeText}>
            🔒 Garantia de 30 dias ou seu dinheiro de volta
          </Text>
        </LinearGradient>
      </View>

      {/* Individual Courses */}
      <View style={styles.section}>
        <Text style={[styles.coursesTitle, { color: colors.text }]}>
          Ou escolha cursos individuais:
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.coursesContainer}>
            {courseOptions.map((course, index) => (
              <View
                key={index}
                style={[
                  styles.courseCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.courseTitle, { color: colors.text }]}>
                  {course.title}
                </Text>

                <View style={styles.courseStats}>
                  <View style={styles.courseStat}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.courseStatText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.duration}
                    </Text>
                  </View>
                  <View style={styles.courseStat}>
                    <Users size={14} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.courseStatText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.students}
                    </Text>
                  </View>
                  <View style={styles.courseStat}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text
                      style={[
                        styles.courseStatText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {course.rating}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.coursePrice, { color: colors.primary }]}>
                  {course.price}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.coursesCTA} onPress={onCoursesPress}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.coursesCTAGradient}
          >
            <Text style={styles.coursesCTAText}>VER TODOS OS CURSOS</Text>
            <ArrowRight size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Comparison Table */}
      <View style={styles.section}>
        <Text style={[styles.comparisonTitle, { color: colors.text }]}>
          Comparação de Planos
        </Text>

        <View
          style={[
            styles.comparisonTable,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.comparisonHeader}>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>
              Recurso
            </Text>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>
              Individual
            </Text>
            <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>
              Premium
            </Text>
          </View>

          {[
            {
              feature: 'Cursos Básicos',
              individual: '1 curso',
              premium: '50+ cursos',
            },
            { feature: 'Comunidade VIP', individual: '❌', premium: '✅' },
            { feature: 'Suporte', individual: 'Email', premium: 'Prioritário' },
            { feature: 'Cashback', individual: '5%', premium: '10%' },
            { feature: 'Atualizações', individual: '❌', premium: '✅' },
          ].map((row, index) => (
            <View
              key={index}
              style={[
                styles.comparisonRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <Text style={[styles.comparisonFeature, { color: colors.text }]}>
                {row.feature}
              </Text>
              <Text
                style={[
                  styles.comparisonIndividual,
                  { color: colors.textSecondary },
                ]}
              >
                {row.individual}
              </Text>
              <Text style={[styles.comparisonPremium, { color: '#F59E0B' }]}>
                {row.premium}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Final CTA */}
      <View style={styles.section}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)']}
          style={[styles.finalCTACard, { borderColor: colors.border }]}
        >
          <Text style={[styles.finalCTATitle, { color: colors.text }]}>
            Não perca esta oportunidade única!
          </Text>
          <Text style={[styles.finalCTAText, { color: colors.textSecondary }]}>
            Junte-se a mais de 12.500 famílias que já estão preparando seus
            filhos para um futuro financeiro próspero. A educação financeira é o
            melhor investimento que você pode fazer no futuro do seu filho.
          </Text>

          <TouchableOpacity style={styles.finalCTA} onPress={onPremiumPress}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.finalCTAGradient}
            >
              <Crown size={20} color="white" />
              <Text style={styles.finalCTATextButton}>
                SIM, QUERO O PLANO PREMIUM
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  premiumCard: {
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    marginBottom: 8,
  },
  premiumBadge: {
    position: 'absolute',
    top: -8,
    left: 24,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  premiumHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
  benefitsContainer: {
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 12,
    flex: 1,
  },
  premiumCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  premiumCTAText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  guaranteeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  coursesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  coursesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
  },
  courseCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  courseStats: {
    marginBottom: 12,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  courseStatText: {
    fontSize: 12,
    marginLeft: 6,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coursesCTA: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  coursesCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  coursesCTAText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  },
  comparisonFeature: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  comparisonIndividual: {
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
  finalCTACard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  finalCTATitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  finalCTAText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  finalCTA: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  finalCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  finalCTATextButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
