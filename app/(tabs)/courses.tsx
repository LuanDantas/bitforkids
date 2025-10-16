import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CrossSellCard from '@/components/CrossSellCard';
import CashbackBanner from '@/components/CashbackBanner';
import SubscriptionPlan from '@/components/SubscriptionPlan';
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
} from 'lucide-react-native';

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showSubscription, setShowSubscription] = useState(false);
  const router = useRouter();

  const categories = [
    'Todos',
    'Iniciante',
    'Intermediário',
    'Avançado',
    'Trading',
    'DeFi',
    'NFT',
  ];

  const courses = [
    {
      id: 1,
      title: 'Introdução ao Bitcoin',
      description: 'Aprenda os fundamentos do Bitcoin e blockchain',
      instructor: 'Prof. Maria Santos',
      rating: 4.8,
      students: 1250,
      duration: '4h 30min',
      lessons: 24,
      price: 'R$ 149,90',
      isFree: false,
      level: 'Iniciante',
      category: 'Iniciante',
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Trading Avançado de Criptomoedas',
      description: 'Estratégias profissionais para trading',
      instructor: 'Prof. Carlos Lima',
      rating: 4.9,
      students: 890,
      duration: '8h 15min',
      lessons: 42,
      price: 'R$ 299,90',
      isFree: false,
      level: 'Avançado',
      category: 'Trading',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'DeFi: Finanças Descentralizadas',
      description: 'Entenda o mundo das finanças descentralizadas',
      instructor: 'Prof. Ana Costa',
      rating: 4.7,
      students: 650,
      duration: '6h 45min',
      lessons: 32,
      price: 'R$ 199,90',
      isFree: false,
      level: 'Intermediário',
      category: 'DeFi',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      title: 'NFTs e Arte Digital',
      description: 'Criação e comercialização de NFTs',
      instructor: 'Prof. Pedro Silva',
      rating: 4.6,
      students: 420,
      duration: '5h 20min',
      lessons: 28,
      price: 'R$ 179,90',
      isFree: false,
      level: 'Intermediário',
      category: 'NFT',
      image: 'https://images.pexels.com/photos/8370755/pexels-photo-8370755.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasCashback: true,
      cashbackPercentage: 10,
      cashbackAmount: 'R$ 17,99',
    },
    {
      id: 7,
      title: 'Bitcoin para Iniciantes - GRÁTIS',
      description: 'Curso introdutório gratuito sobre Bitcoin e criptomoedas',
      instructor: 'Prof. João Santos',
      rating: 4.5,
      students: 3200,
      duration: '2h 15min',
      lessons: 8,
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
      category: 'Iniciante',
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 8,
      title: 'Carteiras Digitais - Básico GRÁTIS',
      description: 'Aprenda a criar e usar carteiras digitais com segurança',
      instructor: 'Prof. Ana Costa',
      rating: 4.4,
      students: 2800,
      duration: '1h 45min',
      lessons: 6,
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
      category: 'Iniciante',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 9,
      title: 'Blockchain Explicado - GRÁTIS',
      description: 'Entenda como funciona a tecnologia blockchain',
      instructor: 'Prof. Roberto Lima',
      rating: 4.6,
      students: 4100,
      duration: '3h 00min',
      lessons: 10,
      price: 'GRÁTIS',
      isFree: true,
      level: 'Iniciante',
      category: 'Iniciante',
      image: 'https://images.pexels.com/photos/8370755/pexels-photo-8370755.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  // Recommended courses for cross-sell
  const recommendedCourses = [
    {
      id: 5,
      title: 'Carteiras Digitais Seguras',
      instructor: 'Prof. João Santos',
      rating: 4.6,
      students: 750,
      duration: '2h 30min',
      price: 'R$ 99,90',
      originalPrice: 'R$ 129,90',
      discount: 23,
      level: 'Iniciante',
      category: 'Segurança',
    },
    {
      id: 6,
      title: 'Mineração de Criptomoedas',
      instructor: 'Prof. Roberto Lima',
      rating: 4.7,
      students: 520,
      duration: '4h 15min',
      price: 'R$ 189,90',
      level: 'Intermediário',
      category: 'Mineração',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return '#10B981';
      case 'Intermediário':
        return '#F59E0B';
      case 'Avançado':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

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

  if (showSubscription) {
    return (
      <View style={styles.container}>
        <View style={styles.subscriptionHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSubscription(false)}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SubscriptionPlan onSubscribe={handleSubscribe} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1a1a1a', '#2a1a4a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Cursos</Text>
        <Text style={styles.headerSubtitle}>
          Aprenda sobre criptomoedas com especialistas
        </Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cursos..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Course List */}
      <ScrollView style={styles.coursesList} showsVerticalScrollIndicator={false}>
        {/* Cashback Banner for featured course */}
        <CashbackBanner
          cashbackPercentage={20}
          cashbackAmount="R$ 59,98"
          onPress={() => setShowSubscription(true)}
        />

        {/* Premium Subscription Banner */}
        <TouchableOpacity 
          style={styles.subscriptionBanner}
          onPress={() => setShowSubscription(true)}
        >
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.subscriptionGradient}
          >
            <View style={styles.subscriptionContent}>
              <Text style={styles.subscriptionEmoji}>👑</Text>
              <View style={styles.subscriptionText}>
                <Text style={styles.subscriptionTitle}>
                  Acesso ILIMITADO a todos os cursos
                </Text>
                <Text style={styles.subscriptionSubtitle}>
                  Plano anual por apenas R$ 58,33/mês
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Recommended Courses Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>Recomendados para você</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedCourses.map((course) => (
              <CrossSellCard
                key={course.id}
                course={course}
                type="crosssell"
                onPress={() => router.push(`/course/${course.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        {filteredCourses.map((course) => (
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
                <Play size={24} color="white" />
              </LinearGradient>
            </View>
            
            <View style={styles.courseContent}>
              <View style={styles.courseHeader}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <View
                  style={[
                    styles.levelBadge,
                    { backgroundColor: `${getLevelColor(course.level)}20` },
                  ]}
                >
                  <Text
                    style={[
                      styles.levelText,
                      { color: getLevelColor(course.level) },
                    ]}
                  >
                    {course.level}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.courseDescription} numberOfLines={2}>
                {course.description}
              </Text>
              
              <Text style={styles.instructor}>{course.instructor}</Text>
              
              <View style={styles.courseInfo}>
                <View style={styles.infoItem}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.infoText}>{course.rating}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Users size={14} color="#9CA3AF" />
                  <Text style={styles.infoText}>{course.students}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Clock size={14} color="#9CA3AF" />
                  <Text style={styles.infoText}>{course.duration}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <BookOpen size={14} color="#9CA3AF" />
                  <Text style={styles.infoText}>{course.lessons} aulas</Text>
                </View>
              </View>
              
              <View style={styles.courseFooter}>
                <Text style={styles.price}>{course.price}</Text>
                <TouchableOpacity 
                  style={styles.enrollButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push(`/course/${course.id}`);
                  }}
                >
                  <LinearGradient
                    colors={course.isFree ? ['#10B981', '#059669'] : ['#8B5CF6', '#3B82F6']}
                    style={styles.enrollGradient}
                  >
                    <Text style={styles.enrollText}>
                      {course.isFree ? 'Acessar Grátis' : 'Ver Curso'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Cashback indicator for courses that have it */}
            {course.hasCashback && (
              <View style={styles.cashbackIndicator}>
                <Text style={styles.cashbackText}>
                  🎁 {course.cashbackPercentage}% cashback
                </Text>
              </View>
            )}
            
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginLeft: 16,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  categoryTextActive: {
    color: 'white',
  },
  coursesList: {
    flex: 1,
    padding: 20,
  },
  courseCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  courseImageContainer: {
    width: 100,
    height: 120,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImageOverlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseContent: {
    flex: 1,
    padding: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 12,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  instructor: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 12,
  },
  courseInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  enrollButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  enrollGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  enrollText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  recommendedSection: {
    marginBottom: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  cashbackIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cashbackText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
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
  subscriptionHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  subscriptionBanner: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  subscriptionGradient: {
    padding: 16,
  },
  subscriptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  subscriptionText: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subscriptionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});