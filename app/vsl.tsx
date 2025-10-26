import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useVSL } from '@/contexts/VSLContext';
import {
  ArrowRight,
  Crown,
  Play,
  Star,
  Users,
  Award,
  Shield,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react-native';

// Import VSL Components
import VSLHero from '@/components/VSLHero';
import VSLBenefits from '@/components/VSLBenefits';
import VSLPricing from '@/components/VSLPricing';
import VSLTestimonials from '@/components/VSLTestimonials';

const { width } = Dimensions.get('window');

export default function VSLPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const { trackVSLConversion } = useVSL();
  const [videoProgress, setVideoProgress] = useState(0);

  const handlePremiumCTAPress = () => {
    trackVSLConversion('register');
    router.push('/auth/register?source=vsl&plan=premium');
  };

  const handleCoursesCTAPress = () => {
    trackVSLConversion('register');
    router.push('/auth/register?source=vsl&plan=courses');
  };

  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);

    // Track milestones
    if (progress >= 25 && progress < 30) {
      trackVSLConversion('view');
    }
  };

  const handleSkipToPricing = () => {
    Alert.alert(
      'Pular para Ofertas',
      'Deseja ir direto para ver nossas ofertas especiais?',
      [
        { text: 'Continuar Assistindo', style: 'cancel' },
        {
          text: 'Ver Ofertas',
          onPress: () => {
            // Scroll to pricing section
            // This would need a ref to scroll to specific section
            handlePremiumCTAPress();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Hero Section */}
        <VSLHero
          onCTAPress={handlePremiumCTAPress}
          onVideoProgress={handleVideoProgress}
        />

        {/* Benefits Section */}
        <VSLBenefits />

        {/* Pricing Section */}
        <VSLPricing
          onPremiumPress={handlePremiumCTAPress}
          onCoursesPress={handleCoursesCTAPress}
        />

        {/* Testimonials Section */}
        <VSLTestimonials />

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Perguntas Frequentes
          </Text>

          <View style={styles.faqContainer}>
            {[
              {
                question: 'Para qual idade é recomendado o BitforKids?',
                answer:
                  'Nosso conteúdo é desenvolvido para crianças e adolescentes de 8 a 18 anos, com adaptações específicas para cada faixa etária.',
              },
              {
                question: 'O conteúdo é seguro para crianças?',
                answer:
                  'Sim! Todo nosso conteúdo é aprovado por educadores e psicólogos infantis, focando na educação financeira de forma didática e segura.',
              },
              {
                question: 'Posso cancelar a qualquer momento?',
                answer:
                  'Sim, você pode cancelar sua assinatura a qualquer momento. Além disso, oferecemos garantia de 30 dias ou seu dinheiro de volta.',
              },
              {
                question: 'Como funciona o acesso aos cursos?',
                answer:
                  'Após o pagamento, você recebe acesso imediato a todos os cursos através da nossa plataforma web e aplicativo móvel.',
              },
              {
                question: 'Há suporte disponível?',
                answer:
                  'Sim! Oferecemos suporte prioritário via chat, email e comunidade VIP para todos os assinantes premium.',
              },
            ].map((faq, index) => (
              <View
                key={index}
                style={[
                  styles.faqItem,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.faqQuestion, { color: colors.text }]}>
                  {faq.question}
                </Text>
                <Text
                  style={[styles.faqAnswer, { color: colors.textSecondary }]}
                >
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Final CTA Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.finalCTASection}
          >
            <View style={styles.finalCTAHeader}>
              <Crown size={32} color="white" />
              <Text style={styles.finalCTATitle}>
                Não Deixe Esta Oportunidade Passar
              </Text>
              <Text style={styles.finalCTASubtitle}>
                Junte-se a mais de 12.500 famílias que já estão preparando seus
                filhos para um futuro financeiro próspero
              </Text>
            </View>

            <View style={styles.finalCTAStats}>
              <View style={styles.finalCTAStat}>
                <Users size={20} color="white" />
                <Text style={styles.finalCTAStatNumber}>12.5k</Text>
                <Text style={styles.finalCTAStatLabel}>Famílias</Text>
              </View>
              <View style={styles.finalCTAStat}>
                <Star size={20} color="white" />
                <Text style={styles.finalCTAStatNumber}>4.9/5</Text>
                <Text style={styles.finalCTAStatLabel}>Avaliação</Text>
              </View>
              <View style={styles.finalCTAStat}>
                <Award size={20} color="white" />
                <Text style={styles.finalCTAStatNumber}>50+</Text>
                <Text style={styles.finalCTAStatLabel}>Cursos</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.finalCTAButton}
              onPress={handlePremiumCTAPress}
            >
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.finalCTAGradient}
              >
                <Crown size={20} color="white" />
                <Text style={styles.finalCTAButtonText}>
                  SIM, QUERO O PLANO PREMIUM AGORA
                </Text>
                <ArrowRight size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.finalCTAGuarantees}>
              <View style={styles.guaranteeItem}>
                <Shield size={16} color="white" />
                <Text style={styles.guaranteeText}>Garantia de 30 dias</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Zap size={16} color="white" />
                <Text style={styles.guaranteeText}>Acesso imediato</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <CheckCircle size={16} color="white" />
                <Text style={styles.guaranteeText}>Suporte prioritário</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            © 2024 BitforKids. Todos os direitos reservados.
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Transformando a educação financeira das crianças brasileiras.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.stickyCTA}>
        <TouchableOpacity
          style={styles.stickyCTAButton}
          onPress={handlePremiumCTAPress}
        >
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.stickyCTAGradient}
          >
            <Crown size={20} color="white" />
            <Text style={styles.stickyCTAText}>QUERO O PLANO PREMIUM</Text>
            <ArrowRight size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  faqContainer: {
    gap: 16,
  },
  faqItem: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  finalCTASection: {
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: 'center',
  },
  finalCTAHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  finalCTATitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  finalCTASubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  finalCTAStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  finalCTAStat: {
    alignItems: 'center',
  },
  finalCTAStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  finalCTAStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  finalCTAButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  finalCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  finalCTAButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  finalCTAGuarantees: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guaranteeText: {
    fontSize: 14,
    color: 'white',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  stickyCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34, // Account for safe area
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  stickyCTAButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  stickyCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  stickyCTAText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
