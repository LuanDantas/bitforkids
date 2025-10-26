import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { useVSL } from '@/contexts/VSLContext';
import {
  X,
  Play,
  Crown,
  ArrowRight,
  Clock,
  Users,
  Star,
} from 'lucide-react-native';
import VSLVideo from './VSLVideo';

const { width, height } = Dimensions.get('window');

interface VSLModalProps {
  visible: boolean;
  onClose: () => void;
  onCTAPress: () => void;
}

export default function VSLModal({
  visible,
  onClose,
  onCTAPress,
}: VSLModalProps) {
  const { colors } = useTheme();
  const { dismissVSLForDays, trackVSLConversion } = useVSL();

  const handleDismissFor30Days = async () => {
    await dismissVSLForDays(30);
    onClose();
  };

  const handleCTAPress = () => {
    trackVSLConversion('register');
    onCTAPress();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Oferta Especial para Você
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.heroSection}
          >
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>🎯 OFERTA LIMITADA</Text>
            </View>

            <Text style={styles.mainHeadline}>
              Como Transformar Seu Filho em um Jovem Investidor Consciente
            </Text>

            <Text style={styles.subHeadline}>
              Mesmo que Ele Nunca Tenha Ouvido Falar em Bitcoin
            </Text>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={styles.quickStat}>
                <Users size={16} color="white" />
                <Text style={styles.quickStatText}>12.5k</Text>
              </View>
              <View style={styles.quickStat}>
                <Star size={16} color="white" />
                <Text style={styles.quickStatText}>4.9/5</Text>
              </View>
              <View style={styles.quickStat}>
                <Clock size={16} color="white" />
                <Text style={styles.quickStatText}>5min</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Video Section */}
          <View style={styles.videoSection}>
            <View style={styles.videoHeader}>
              <View style={styles.playIconContainer}>
                <Play size={20} color="white" />
              </View>
              <Text style={[styles.videoTitle, { color: colors.text }]}>
                Assista ao Vídeo Exclusivo
              </Text>
            </View>

            <VSLVideo />

            <Text
              style={[styles.videoSubtitle, { color: colors.textSecondary }]}
            >
              Descubra como outras famílias estão preparando seus filhos para o
              futuro financeiro
            </Text>
          </View>

          {/* Premium Offer */}
          <View style={styles.offerSection}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.offerCard}
            >
              <View style={styles.offerHeader}>
                <Crown size={28} color="white" />
                <Text style={styles.offerTitle}>PLANO ANUAL PREMIUM</Text>
                <Text style={styles.offerSubtitle}>
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

              <View style={styles.benefitsList}>
                <Text style={styles.benefitItem}>
                  ✅ Acesso a +50 cursos completos
                </Text>
                <Text style={styles.benefitItem}>
                  ✅ Mais de 200 horas de conteúdo
                </Text>
                <Text style={styles.benefitItem}>
                  ✅ Comunidade VIP exclusiva
                </Text>
                <Text style={styles.benefitItem}>
                  ✅ Certificados ilimitados
                </Text>
                <Text style={styles.benefitItem}>
                  ✅ Cashback dobrado (10%)
                </Text>
                <Text style={styles.benefitItem}>✅ Suporte prioritário</Text>
              </View>

              <TouchableOpacity style={styles.mainCTA} onPress={handleCTAPress}>
                <Text style={styles.mainCTAText}>
                  QUERO O PLANO PREMIUM AGORA
                </Text>
                <ArrowRight size={18} color="white" />
              </TouchableOpacity>

              <Text style={styles.guaranteeText}>
                🔒 Garantia de 30 dias ou seu dinheiro de volta
              </Text>
            </LinearGradient>
          </View>

          {/* Urgency Section */}
          <View style={styles.urgencySection}>
            <LinearGradient
              colors={['rgba(239, 68, 68, 0.1)', 'rgba(220, 38, 38, 0.1)']}
              style={[styles.urgencyCard, { borderColor: colors.border }]}
            >
              <Text style={[styles.urgencyTitle, { color: colors.text }]}>
                ⚠️ ATENÇÃO:
              </Text>
              <Text
                style={[styles.urgencyText, { color: colors.textSecondary }]}
              >
                Esta oferta especial está disponível apenas por tempo limitado.
                Não perca a chance de dar ao seu filho uma vantagem financeira
                que durará toda a vida.
              </Text>
            </LinearGradient>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProofSection}>
            <Text style={[styles.socialProofTitle, { color: colors.text }]}>
              Mais de 12.500 famílias já transformaram a educação financeira dos
              seus filhos
            </Text>

            <View style={styles.testimonialsContainer}>
              <View
                style={[
                  styles.testimonialCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.testimonialText,
                    { color: colors.textSecondary },
                  ]}
                >
                  "Meu filho sempre teve dificuldade com matemática, mas depois
                  do BitforKids ele não só melhorou as notas como agora me
                  ensina sobre investimentos!"
                </Text>
                <Text
                  style={[styles.testimonialAuthor, { color: colors.text }]}
                >
                  - Maria Silva, mãe de João, 12 anos
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={handleDismissFor30Days}
          >
            <Text
              style={[
                styles.dismissButtonText,
                { color: colors.textSecondary },
              ]}
            >
              Não mostrar novamente por 30 dias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryCTA}
            onPress={handleCTAPress}
          >
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.secondaryCTAGradient}
            >
              <Text style={styles.secondaryCTAText}>VER TODOS OS CURSOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  heroSection: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  mainHeadline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
  subHeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  videoSection: {
    padding: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  videoSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  offerSection: {
    padding: 20,
  },
  offerCard: {
    borderRadius: 16,
    padding: 24,
    position: 'relative',
  },
  offerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  priceSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  benefitsList: {
    marginBottom: 20,
  },
  benefitItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  mainCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  mainCTAText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  guaranteeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  urgencySection: {
    padding: 20,
  },
  urgencyCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  urgencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  socialProofSection: {
    padding: 20,
  },
  socialProofTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  testimonialsContainer: {
    gap: 12,
  },
  testimonialCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerActions: {
    padding: 20,
    gap: 12,
  },
  dismissButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dismissButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  secondaryCTA: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  secondaryCTAGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryCTAText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
