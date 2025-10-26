import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import {
  BookOpen,
  Shield,
  Award,
  Users,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Heart,
  Star,
} from 'lucide-react-native';

export default function VSLBenefits() {
  const { colors } = useTheme();

  const mainBenefits = [
    {
      icon: BookOpen,
      title: 'Educação Financeira Completa',
      description:
        'Aprenda sobre Bitcoin, blockchain e investimentos de forma didática e segura',
      color: '#8B5CF6',
    },
    {
      icon: Shield,
      title: 'Conteúdo Aprovado por Educadores',
      description:
        'Material desenvolvido com especialistas em educação infantil e financeira',
      color: '#10B981',
    },
    {
      icon: Award,
      title: 'Certificados Reconhecidos',
      description:
        'Certificados válidos que seu filho pode usar no futuro acadêmico',
      color: '#F59E0B',
    },
    {
      icon: Users,
      title: 'Comunidade Exclusiva',
      description: 'Acesso a grupo VIP com outros pais e jovens investidores',
      color: '#3B82F6',
    },
    {
      icon: Zap,
      title: 'Metodologia Comprovada',
      description:
        'Sistema testado com mais de 12.500 famílias ao redor do mundo',
      color: '#EF4444',
    },
    {
      icon: Clock,
      title: 'Acesso Vitalício',
      description:
        'Uma vez adquirido, você tem acesso para sempre aos conteúdos',
      color: '#8B5CF6',
    },
  ];

  const additionalBenefits = [
    '🎯 Foco em crianças e adolescentes (8-18 anos)',
    '📱 Interface intuitiva e gamificada',
    '🎮 Atividades práticas e exercícios interativos',
    '📊 Acompanhamento de progresso detalhado',
    '🔄 Atualizações constantes de conteúdo',
    '💬 Suporte prioritário via chat',
    '🎁 Bônus exclusivos para assinantes',
    '📈 Relatórios mensais de evolução',
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Por que escolher o BitforKids?
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Mais de 12.500 famílias já transformaram a educação financeira dos
          seus filhos
        </Text>
      </View>

      {/* Main Benefits Grid */}
      <View style={styles.benefitsGrid}>
        {mainBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <View
              key={index}
              style={[
                styles.benefitCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <LinearGradient
                colors={[`${benefit.color}20`, `${benefit.color}10`]}
                style={styles.benefitIconContainer}
              >
                <Icon size={24} color={benefit.color} />
              </LinearGradient>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>
                {benefit.title}
              </Text>
              <Text
                style={[
                  styles.benefitDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {benefit.description}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Additional Benefits */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          O que mais você recebe:
        </Text>

        <View
          style={[
            styles.additionalBenefitsContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {additionalBenefits.map((benefit, index) => (
            <View key={index} style={styles.additionalBenefitItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text
                style={[styles.additionalBenefitText, { color: colors.text }]}
              >
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Social Proof Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Resultados Reais de Nossos Alunos
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.resultsContainer}>
            <View
              style={[
                styles.resultCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <TrendingUp size={32} color="#10B981" />
              <Text style={[styles.resultNumber, { color: colors.text }]}>
                94%
              </Text>
              <Text
                style={[styles.resultLabel, { color: colors.textSecondary }]}
              >
                dos alunos melhoraram suas notas em matemática
              </Text>
            </View>

            <View
              style={[
                styles.resultCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Heart size={32} color="#EF4444" />
              <Text style={[styles.resultNumber, { color: colors.text }]}>
                87%
              </Text>
              <Text
                style={[styles.resultLabel, { color: colors.textSecondary }]}
              >
                dos pais relataram maior interesse em estudos
              </Text>
            </View>

            <View
              style={[
                styles.resultCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Star size={32} color="#F59E0B" />
              <Text style={[styles.resultNumber, { color: colors.text }]}>
                4.9/5
              </Text>
              <Text
                style={[styles.resultLabel, { color: colors.textSecondary }]}
              >
                avaliação média dos nossos cursos
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Guarantee Section */}
      <View style={styles.section}>
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.1)']}
          style={[styles.guaranteeCard, { borderColor: colors.border }]}
        >
          <View style={styles.guaranteeHeader}>
            <Shield size={32} color="#10B981" />
            <Text style={[styles.guaranteeTitle, { color: colors.text }]}>
              Garantia de 30 Dias
            </Text>
          </View>
          <Text style={[styles.guaranteeText, { color: colors.textSecondary }]}>
            Se você não ficar completamente satisfeito com o conteúdo ou se seu
            filho não demonstrar interesse após 30 dias, devolvemos 100% do seu
            investimento. Sem perguntas, sem burocracias.
          </Text>
          <View style={styles.guaranteeBadge}>
            <Text style={styles.guaranteeBadgeText}>GARANTIA TOTAL</Text>
          </View>
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
    fontSize: 22,
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
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  benefitCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  benefitIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  additionalBenefitsContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  additionalBenefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  additionalBenefitText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  resultsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
  },
  resultCard: {
    width: 200,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  resultNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  resultLabel: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  guaranteeCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    position: 'relative',
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  guaranteeText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  guaranteeBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  guaranteeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
