import React, { useState, useEffect } from 'react';
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
import CashbackBanner from '@/components/CashbackBanner';
import CrossSellCard from '@/components/CrossSellCard';
import SubscriptionPlan from '@/components/SubscriptionPlan';
import VSLModal from '@/components/VSLModal';
import BitcoinPriceWidget from '@/components/BitcoinPriceWidget';
import { useTheme } from '@/contexts/ThemeContext';
import { useVSL } from '@/contexts/VSLContext';
import { bitcoinPriceService } from '@/services/BitcoinPriceService';
import {
  TrendingUp,
  Award,
  Users,
  Play,
  Star,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Settings,
  LogOut,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { colors, theme, toggleTheme, isDark } = useTheme();
  const {
    shouldShowVSL,
    showVSLModal,
    hideVSLModal,
    isVSLModalVisible,
    resetSessionFlag,
  } = useVSL();
  const [showSubscription, setShowSubscription] = useState(false);
  const [user] = useState({
    name: 'João Silva',
    level: 'Iniciante',
    progress: 65,
    coursesCompleted: 3,
    certificates: 2,
  });

  // Check if VSL should be shown for remarketing
  useEffect(() => {
    if (shouldShowVSL) {
      // Delay showing VSL modal to allow home screen to load first
      const timer = setTimeout(() => {
        showVSLModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldShowVSL, showVSLModal]);

  // Initialize Bitcoin price monitoring
  useEffect(() => {
    bitcoinPriceService.startPriceMonitoring();

    return () => {
      bitcoinPriceService.stopPriceMonitoring();
    };
  }, []);

  const featuredCourses = [
    {
      id: 1,
      title:
        'Mini Curso GPS Bitcoin para leigos + ebook Bitcoin para iniciantes',
      instructor: 'Dani Spitaletti',
      rating: 4.8,
      students: 1250,
      image:
        'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'R$ 67,00',
      isFree: false,
      level: 'Iniciante',
      description:
        'Entenda o que só o Bitcoin pode fazer por você e conheça a rede descentralizada',
    },
    {
      id: 2,
      title: 'Curso Autocustódia - Carteiras Hotwallet e Coldwallet',
      instructor: 'Dani Spitaletti',
      rating: 4.9,
      students: 890,
      image:
        'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'R$ 97,00',
      isFree: false,
      level: 'Intermediário',
      description:
        'Aprenda a ser seu próprio banco com carteiras digitais seguras',
    },
    {
      id: 3,
      title: 'Curso Herança Digital - Reserva em Bitcoin e Auto-custódia',
      instructor: 'Dani Spitaletti',
      rating: 4.9,
      students: 650,
      image:
        'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'R$ 397,00',
      isFree: false,
      level: 'Avançado',
      description: 'Curso completo sobre reserva em Bitcoin e auto-custódia',
    },
  ];

  // Free courses section
  const freeCourses = [
    {
      id: 7,
      title: '🧠 Liberte sua mente do Sistema e conheça o Bitcoin',
      instructor: 'Vinicius da Palavra de Satoshi',
      rating: 4.5,
      students: 3200,
      duration: '2h 15min',
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
      description:
        'Aula especial com Vinicius da Palavra de Satoshi - Presente para você',
    },
  ];

  // Special offers and cross-sell opportunities
  const specialOffers = [
    {
      id: 4,
      title: 'Curso Finanças Descentralizadas e Rede Ethereum',
      instructor: 'Dani Spitaletti',
      rating: 4.9,
      students: 450,
      duration: '15h 30min',
      price: 'R$ 397,00',
      originalPrice: 'R$ 497,00',
      discount: 20,
      level: 'Avançado',
      category: 'DeFi',
      description:
        'Aprenda a usar USDT, pagar contas e usar cartão com criptomoedas',
    },
    {
      id: 5,
      title: 'Curso Empréstimo Descentralizado - AAVE',
      instructor: 'Dani Spitaletti',
      rating: 4.8,
      students: 320,
      duration: '8h 45min',
      price: 'R$ 97,00',
      originalPrice: 'R$ 147,00',
      discount: 34,
      level: 'Intermediário',
      category: 'DeFi',
      description: 'Juros de 6% ao ano na plataforma AAVE',
    },
    {
      id: 6,
      title: 'Pacote Completo - Todos os Cursos',
      instructor: 'Dani Spitaletti',
      rating: 4.9,
      students: 180,
      duration: '50h+',
      price: 'R$ 790,00',
      originalPrice: 'R$ 1.055,00',
      discount: 25,
      level: 'Todos',
      category: 'Pacote',
      description:
        'Acesso a todos os cursos por 1 ano + Cashback R$ 20 em Bitcoin',
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      label: 'Progresso',
      value: `${user.progress}%`,
      color: '#10B981',
    },
    {
      icon: Award,
      label: 'Certificados',
      value: user.certificates,
      color: '#F59E0B',
    },
    { icon: Users, label: 'Comunidade', value: '12.5k', color: '#3B82F6' },
  ];

  const handleSubscribe = () => {
    Alert.alert(
      'Plano Premium',
      'Redirecionando para o pagamento do plano anual...',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => console.log('Redirect to payment'),
        },
      ]
    );
  };

  const handleVSLCTAPress = () => {
    hideVSLModal();
    setShowSubscription(true);
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          // Reset VSL session flag on logout
          resetSessionFlag();
          router.replace('/auth/login');
        },
      },
    ]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      case 'system':
        return Monitor;
      default:
        return Moon;
    }
  };

  const ThemeIcon = getThemeIcon();

  if (showSubscription) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subscriptionHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSubscription(false)}
          >
            <Text style={[styles.backButtonText, { color: colors.primary }]}>
              ← Voltar
            </Text>
          </TouchableOpacity>
        </View>
        <SubscriptionPlan onSubscribe={handleSubscribe} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Olá, {user.name} 👋</Text>
            <Text style={styles.levelText}>Nível: {user.level}</Text>
          </View>

          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <ThemeIcon size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => router.push('/(tabs)/admin')}
          >
            <Settings size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressCard}>
          <Text style={[styles.progressTitle, { color: 'white' }]}>
            Seu Progresso
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${user.progress}%` }]}
            />
          </View>
          <Text
            style={[styles.progressText, { color: 'rgba(255, 255, 255, 0.8)' }]}
          >
            {user.progress}% concluído
          </Text>
        </View>
      </LinearGradient>

      {/* Bitcoin Price Widget */}
      <View style={styles.section}>
        <BitcoinPriceWidget onPress={() => router.push('/(tabs)/indices')} />
      </View>

      {/* Special Cashback Offer */}
      <View style={[styles.section, { paddingBottom: 5 }]}>
        <CashbackBanner
          cashbackPercentage={20}
          cashbackAmount="R$ 20,00"
          onPress={() => setShowSubscription(true)}
        />
      </View>

      {/* Premium Subscription CTA */}
      <View style={[styles.section, styles.sectionNoPadding]}>
        <TouchableOpacity
          style={styles.premiumCTA}
          onPress={() => setShowSubscription(true)}
        >
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.premiumGradient}
          >
            <View style={styles.premiumContent}>
              <View style={styles.premiumIcon}>
                <Text style={styles.premiumEmoji}>👑</Text>
              </View>
              <View style={styles.premiumText}>
                <Text style={styles.premiumTitle}>Pacote Completo</Text>
                <Text style={styles.premiumSubtitle}>
                  Todos os cursos por apenas R$ 790,00 + Cashback R$ 20 em
                  Bitcoin
                </Text>
              </View>
              <View style={styles.premiumArrow}>
                <ChevronRight size={20} color="white" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <Icon size={24} color={stat.color} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Featured Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Cursos em Destaque
          </Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              Ver todos
            </Text>
            <ChevronRight size={16} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => router.push(`/course/${course.id}`)}
            >
              <View style={styles.courseImageContainer}>
                <LinearGradient
                  colors={[
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                  ]}
                  style={styles.courseImageOverlay}
                >
                  <Play size={32} color="white" />
                </LinearGradient>
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text
                  style={[styles.instructor, { color: colors.textSecondary }]}
                >
                  {course.instructor}
                </Text>

                <View style={styles.courseStats}>
                  <View style={styles.rating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>
                      {course.rating}
                    </Text>
                  </View>
                  <Text
                    style={[styles.students, { color: colors.textSecondary }]}
                  >
                    {course.students} estudantes
                  </Text>
                </View>

                <View style={styles.courseBottom}>
                  <Text style={[styles.price, { color: colors.success }]}>
                    {course.price}
                  </Text>
                  <View
                    style={[
                      styles.levelBadge,
                      course.level === 'Iniciante'
                        ? styles.beginnerBadge
                        : course.level === 'Avançado'
                        ? styles.advancedBadge
                        : styles.intermediateBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        course.level === 'Iniciante'
                          ? styles.beginnerText
                          : course.level === 'Avançado'
                          ? styles.advancedText
                          : styles.intermediateText,
                      ]}
                    >
                      {course.level}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Free course indicator */}
              {course.isFree && (
                <View style={styles.freeIndicator}>
                  <Text style={styles.freeText}>🆓 GRÁTIS</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Free Courses Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Cursos Gratuitos
          </Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              Ver todos
            </Text>
            <ChevronRight size={16} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {freeCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.freeCourseCard}
              onPress={() => router.push(`/course/${course.id}`)}
            >
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>GRÁTIS</Text>
              </View>

              <View style={styles.courseImageContainer}>
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.8)', 'rgba(5, 150, 105, 0.8)']}
                  style={styles.courseImageOverlay}
                >
                  <Play size={32} color="white" />
                </LinearGradient>
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text
                  style={[styles.instructor, { color: colors.textSecondary }]}
                >
                  {course.instructor}
                </Text>

                <View style={styles.courseStats}>
                  <View style={styles.rating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>
                      {course.rating}
                    </Text>
                  </View>
                  <Text
                    style={[styles.students, { color: colors.textSecondary }]}
                  >
                    {course.students} estudantes
                  </Text>
                </View>

                <View style={styles.courseBottom}>
                  <Text style={[styles.freePrice, { color: colors.success }]}>
                    {course.price}
                  </Text>
                  <TouchableOpacity
                    style={styles.freeAccessButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/course/${course.id}`);
                    }}
                  >
                    <Text style={[styles.freeAccessText, { color: 'white' }]}>
                      Acessar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Ofertas Especiais
          </Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              Ver todas
            </Text>
            <ChevronRight size={16} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specialOffers.map((offer) => (
            <CrossSellCard
              key={offer.id}
              course={offer}
              type="upsell"
              onPress={() => router.push(`/course/${offer.id}`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Mentorship Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Mentoria Individual
        </Text>

        <TouchableOpacity
          style={styles.mentorshipCard}
          onPress={() => router.push('/mentoria-completa')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.mentorshipGradient}
          >
            <View style={styles.mentorshipHeader}>
              <View style={styles.mentorshipIcon}>
                <Text style={styles.mentorshipEmoji}>🎯</Text>
              </View>
              <View style={styles.mentorshipContent}>
                <Text style={styles.mentorshipTitle}>Mentoria Completa</Text>
                <Text style={styles.mentorshipSubtitle}>
                  Acesso a todos os cursos + 3h de assessoria individual
                </Text>
              </View>
            </View>

            <View style={styles.mentorshipPrice}>
              <Text style={styles.mentorshipOriginalPrice}>De R$ 1.200,00</Text>
              <Text style={styles.mentorshipCurrentPrice}>R$ 2.997,00</Text>
              <Text style={styles.mentorshipCashback}>
                + Cashback R$ 100 em Bitcoin
              </Text>
            </View>

            <View style={styles.mentorshipBenefits}>
              <Text style={styles.mentorshipBenefit}>
                ✓ Acesso a todos os cursos
              </Text>
              <Text style={styles.mentorshipBenefit}>
                ✓ 3h de aulas individuais (2 dias)
              </Text>
              <Text style={styles.mentorshipBenefit}>
                ✓ Montagem de carteira inconfiscável
              </Text>
              <Text style={styles.mentorshipBenefit}>
                ✓ Suporte por 1 ano no WhatsApp
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Ações Rápidas
        </Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.quickActionIcon}
            >
              <Play size={24} color="white" />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              Continuar Estudos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.quickActionIcon}
            >
              <Award size={24} color="white" />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              Meus Certificados
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.logoutGradient}
          >
            <LogOut size={20} color="white" />
            <Text style={styles.logoutText}>Sair</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* VSL Modal for Remarketing */}
      <VSLModal
        visible={isVSLModalVisible}
        onClose={hideVSLModal}
        onCTAPress={handleVSLCTAPress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  levelText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  adminButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 12,
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionNoPadding: {
    paddingTop: 0,
    paddingBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  courseCard: {
    width: width * 0.72,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 0,
    overflow: 'hidden',
  },
  courseImageContainer: {
    height: 120,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImageOverlay: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Always white for contrast on gradient cards
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: 'white', // Always white for contrast on gradient cards
    fontWeight: '600',
  },
  students: {
    fontSize: 12,
  },
  courseBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  beginnerBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  advancedBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  intermediateBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  beginnerText: {
    color: '#10B981',
  },
  advancedText: {
    color: '#F59E0B',
  },
  intermediateText: {
    color: '#3B82F6',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    borderWidth: 0,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  subscriptionHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  premiumCTA: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  premiumGradient: {
    padding: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  premiumEmoji: {
    fontSize: 24,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  premiumArrow: {
    marginLeft: 12,
  },
  freeCourseCard: {
    width: width * 0.72,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#10B981',
    overflow: 'hidden',
    position: 'relative',
  },
  freeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  freeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  freePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  freeAccessButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  freeAccessText: {
    fontSize: 14,
    fontWeight: '600',
  },
  freeIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  mentorshipCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  mentorshipGradient: {
    padding: 20,
  },
  mentorshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorshipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mentorshipEmoji: {
    fontSize: 24,
  },
  mentorshipContent: {
    flex: 1,
  },
  mentorshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  mentorshipSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mentorshipPrice: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorshipOriginalPrice: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  mentorshipCurrentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  mentorshipCashback: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  mentorshipBenefits: {
    gap: 8,
  },
  mentorshipBenefit: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
});
