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
import VSLVideo from './VSLVideo';

const { width } = Dimensions.get('window');

interface VSLHeroProps {
  onCTAPress: () => void;
  onVideoProgress?: (progress: number) => void;
}

export default function VSLHero({ onCTAPress, onVideoProgress }: VSLHeroProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#8B5CF6', '#3B82F6']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.badge}>🎯 OFERTA LIMITADA</Text>
          <Text style={styles.mainHeadline}>
            Como Transformar Seu Filho em um Jovem Investidor Consciente
          </Text>
          <Text style={styles.subHeadline}>
            Mesmo que Ele Nunca Tenha Ouvido Falar em Bitcoin
          </Text>

          <Text style={styles.description}>
            Descubra o método passo a passo que já ajudou{' '}
            <Text style={styles.highlight}>+12.500 famílias</Text> a ensinar
            educação financeira e criptomoedas de forma segura e divertida
          </Text>

          {/* Social Proof Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={20} color="white" />
              <Text style={styles.statNumber}>12.5k</Text>
              <Text style={styles.statLabel}>Alunos</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={20} color="white" />
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={20} color="white" />
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Cursos</Text>
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
          <Text style={styles.videoTitle}>
            Assista ao Vídeo Exclusivo (5 minutos)
          </Text>
        </View>

        <VSLVideo onVideoProgress={onVideoProgress} />

        <Text style={styles.videoSubtitle}>
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
            <Text style={styles.ctaText}>
              QUERO TRANSFORMAR MEU FILHO AGORA
            </Text>
            <ArrowRight size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.ctaSubtext}>
          ⚡ Acesso imediato após o pagamento
        </Text>
        <Text style={styles.ctaSubtext}>
          🔒 Garantia de 30 dias ou seu dinheiro de volta
        </Text>
      </View>

      {/* Urgency Section */}
      <View style={styles.urgencySection}>
        <LinearGradient
          colors={['rgba(239, 68, 68, 0.1)', 'rgba(220, 38, 38, 0.1)']}
          style={styles.urgencyCard}
        >
          <Text style={styles.urgencyTitle}>⚠️ ATENÇÃO:</Text>
          <Text style={styles.urgencyText}>
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
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  mainHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  subHeadline: {
    fontSize: 18,
    fontWeight: '600',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
