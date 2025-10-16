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
import CashbackBanner from '@/components/CashbackBanner';
import CrossSellCard from '@/components/CrossSellCard';
import SubscriptionPlan from '@/components/SubscriptionPlan';
import { useTheme } from '@/contexts/ThemeContext';
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
  const [showSubscription, setShowSubscription] = useState(false);
  const [user] = useState({
    name: 'João Silva',
    level: 'Iniciante',
    progress: 65,
    coursesCompleted: 3,
    certificates: 2,
  });

  const featuredCourses = [
    {
      id: 1,
      title: 'Fundamentos do Bitcoin',
      instructor: 'Prof. Maria Santos',
      rating: 4.8,
      students: 1250,
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'R$ 149,90',
      isFree: false,
      level: 'Iniciante',
    },
    {
      id: 2,
      title: 'Trading Avançado',
      instructor: 'Prof. Carlos Lima',
      rating: 4.9,
      students: 890,
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'R$ 299,90',
      isFree: false,
      level: 'Avançado',
    },
    {
      id: 7,
      title: 'Bitcoin para Iniciantes - GRÁTIS',
      instructor: 'Prof. João Santos',
      rating: 4.5,
      students: 3200,
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
    },
  ];

  // Free courses section
  const freeCourses = [
    {
      id: 7,
      title: 'Bitcoin para Iniciantes',
      instructor: 'Prof. João Santos',
      rating: 4.5,
      students: 3200,
      duration: '2h 15min',
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
    },
    {
      id: 8,
      title: 'Carteiras Digitais - Básico',
      instructor: 'Prof. Ana Costa',
      rating: 4.4,
      students: 2800,
      duration: '1h 45min',
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
    },
    {
      id: 9,
      title: 'Blockchain Explicado',
      instructor: 'Prof. Roberto Lima',
      rating: 4.6,
      students: 4100,
      duration: '3h 00min',
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
    },
  ];

  // Special offers and cross-sell opportunities
  const specialOffers = [
    {
      id: 8,
      title: 'Pacote Iniciante Completo',
      instructor: 'Vários Instrutores',
      rating: 4.9,
      students: 2500,
      duration: '12h 30min',
      price: 'R$ 299,90',
      originalPrice: 'R$ 499,90',
      discount: 40,
      level: 'Iniciante',
      category: 'Pacote',
    },
  ];

  const stats = [
    { icon: TrendingUp, label: 'Progresso', value: `${user.progress}%`, color: '#10B981' },
    { icon: Award, label: 'Certificados', value: user.certificates, color: '#F59E0B' },
    { icon: Users, label: 'Comunidade', value: '12.5k', color: '#3B82F6' },
  ];

  const handleSubscribe = () => {
    Alert.alert(
      'Plano Premium',
      'Redirecionando para o pagamento do plano anual...',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => console.log('Redirect to payment') }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => router.replace('/auth/login')
        }
      ]
    );
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
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        <View style={styles.subscriptionHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSubscription(false)}
          >
            <Text style={[styles.backButtonText, { color: colors.primary }]}>← Voltar</Text>
          </TouchableOpacity>
        </View>
        <SubscriptionPlan onSubscribe={handleSubscribe} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
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
          
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
          >
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
          <Text style={[styles.progressTitle, { color: 'white' }]}>Seu Progresso</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${user.progress}%` }]} />
          </View>
          <Text style={[styles.progressText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{user.progress}% concluído</Text>
        </View>
      </LinearGradient>

      {/* Special Cashback Offer */}
      <View style={styles.section}>
        <CashbackBanner
          cashbackPercentage={25}
          cashbackAmount="R$ 74,98"
          onPress={() => setShowSubscription(true)}
        />
      </View>

      {/* Premium Subscription CTA */}
      <View style={styles.section}>
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
                <Text style={styles.premiumTitle}>Plano Premium Anual</Text>
                <Text style={styles.premiumSubtitle}>
                  Acesso a +50 cursos por apenas R$ 699,90/ano
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
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Featured Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cursos em Destaque</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todos</Text>
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
                  colors={['rgba(139, 92, 246, 0.8)', 'rgba(59, 130, 246, 0.8)']}
                  style={styles.courseImageOverlay}
                >
                  <Play size={32} color="white" />
                </LinearGradient>
              </View>
              
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={[styles.instructor, { color: colors.textSecondary }]}>{course.instructor}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.rating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>{course.rating}</Text>
                  </View>
                  <Text style={[styles.students, { color: colors.textSecondary }]}>
                    {course.students} estudantes
                  </Text>
                </View>
                
                <View style={styles.courseBottom}>
                  <Text style={[styles.price, { color: colors.success }]}>{course.price}</Text>
                  <View style={[styles.levelBadge, 
                    course.level === 'Iniciante' ? styles.beginnerBadge : 
                    course.level === 'Avançado' ? styles.advancedBadge : styles.intermediateBadge
                  ]}>
                    <Text style={[styles.levelText, 
                      course.level === 'Iniciante' ? styles.beginnerText : 
                      course.level === 'Avançado' ? styles.advancedText : styles.intermediateText
                    ]}>
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cursos Gratuitos</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todos</Text>
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
                <Text style={[styles.instructor, { color: colors.textSecondary }]}>{course.instructor}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.rating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={[styles.ratingText, { color: colors.text }]}>{course.rating}</Text>
                  </View>
                  <Text style={[styles.students, { color: colors.textSecondary }]}>
                    {course.students} estudantes
                  </Text>
                </View>
                
                <View style={styles.courseBottom}>
                  <Text style={[styles.freePrice, { color: colors.success }]}>{course.price}</Text>
                  <TouchableOpacity 
                    style={styles.freeAccessButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/course/${course.id}`);
                    }}
                  >
                    <Text style={[styles.freeAccessText, { color: 'white' }]}>Acessar</Text>
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ofertas Especiais</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todas</Text>
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

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.quickActionIcon}
            >
              <Play size={24} color="white" />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: colors.text }]}>Continuar Estudos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.quickActionIcon}
            >
              <Award size={24} color="white" />
            </LinearGradient>
            <Text style={[styles.quickActionText, { color: colors.text }]}>Meus Certificados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.logoutGradient}
          >
            <LogOut size={20} color="white" />
            <Text style={styles.logoutText}>Sair</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
});