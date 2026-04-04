import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, ArrowRight, Star, Users, Award } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import VSLVideo from './VSLVideo';

const { width } = Dimensions.get('window');

interface VSLHeroProps {
  onCTAPress: () => void;
  onVideoProgress?: (progress: number) => void;
}

export default function VSLHero({ onCTAPress, onVideoProgress }: VSLHeroProps) {
  const { fonts } = useTheme();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4f46e5', '#3b82f6']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.badge, { fontFamily: fonts.secondaryMedium }]}>🎯 OFERTA LIMITADA</Text>
          <Text style={[styles.mainHeadline, { fontFamily: fonts.display }]}>
            Como Transformar Seu Filho em um Jovem Investidor Consciente
          </Text>
          <Text style={[styles.subHeadline, { fontFamily: fonts.displaySemiBold }]}>
            Mesmo que Ele Nunca Tenha Ouvido Falar em Bitcoin
          </Text>

          <Text style={[styles.description, { fontFamily: fonts.body }]}>
            Descubra o método passo a passo que já ajudou{' '}
            <Text style={[styles.highlight, { fontFamily: fonts.bodyBold }]}>+12.500 famílias</Text> a ensinar
            educação financeira e criptomoedas de forma segura e divertida
          </Text>

          {/* Social Proof Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={20} color="white" />
              <Text style={[styles.statNumber, { fontFamily: fonts.bodyBold }]}>12.5k</Text>
              <Text style={[styles.statLabel, { fontFamily: fonts.secondaryMedium }]}>Alunos</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={20} color="white" />
              <Text style={[styles.statNumber, { fontFamily: fonts.bodyBold }]}>4.9</Text>
              <Text style={[styles.statLabel, { fontFamily: fonts.secondaryMedium }]}>Avaliação</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={20} color="white" />
              <Text style={[styles.statNumber, { fontFamily: fonts.bodyBold }]}>50+</Text>
              <Text style={[styles.statLabel, { fontFamily: fonts.secondaryMedium }]}>Cursos</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Video Section */}
      <View style={styles.videoSection}>
        <View style={styles.videoHeader}>
          <View style={styles.playIconContainer}>
            <Play size={24} color="white" />
          </View>
          <Text style={[styles.videoTitle, { fontFamily: fonts.displaySemiBold }]}>
            Assista ao Vídeo Exclusivo (5 minutos)
          </Text>
        </View>

        <VSLVideo onVideoProgress={onVideoProgress} />

        <Text style={[styles.videoSubtitle, { fontFamily: fonts.body }]}>
          Descubra como outras famílias estão preparando seus filhos para o
          futuro financeiro
        </Text>
      </View>

      {/* Main CTA */}
      <View style={styles.ctaSection}>
        <TouchableOpacity style={styles.mainCTA} onPress={onCTAPress}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaText, { fontFamily: fonts.bodyBold }]}>
              QUERO TRANSFORMAR MEU FILHO AGORA
            </Text>
            <ArrowRight size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.ctaSubtext, { fontFamily: fonts.body }]}>
          ⚡ Acesso imediato após o pagamento
        </Text>
        <Text style={[styles.ctaSubtext, { fontFamily: fonts.body }]}>
          🔒 Garantia de 30 dias ou seu dinheiro de volta
        </Text>
      </View>

      {/* Urgency Section */}
      <View style={styles.urgencySection}>
        <LinearGradient
          colors={['rgba(239, 68, 68, 0.1)', 'rgba(220, 38, 38, 0.1)']}
          style={styles.urgencyCard}
        >
          <Text style={[styles.urgencyTitle, { fontFamily: fonts.displaySemiBold }]}>⚠️ ATENÇÃO:</Text>
          <Text style={[styles.urgencyText, { fontFamily: fonts.body }]}>
            Esta oferta especial está disponível apenas por tempo limitado. Não
            perca a chance de dar ao seu filho uma vantagem financeira que
            durará toda a vida.
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
  },
  mainHeadline: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  subHeadline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  highlight: {
    color: '#F59E0B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    color: 'white',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 18,
    color: '#1a1a1a',
    flex: 1,
  },
  videoSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  ctaSection: {
    padding: 20,
    alignItems: 'center',
  },
  mainCTA: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 8,
  },
  ctaText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  ctaSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  urgencySection: {
    padding: 20,
  },
  urgencyCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  urgencyTitle: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
