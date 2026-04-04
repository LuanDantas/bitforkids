import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  Play,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Download,
  Share,
  Heart,
  PlayCircle,
  FileText,
  Video,
  MessageCircle,
  UserCircle,
  Shield,
  Zap,
  Crown,
  Target,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Gift,
  ArrowRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MentoriaCompletaScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const mentorship = {
    id: 'mentoria-completa',
    title: 'Mentoria Completa Bitcoin para Famílias',
    subtitle: 'Transforme seu filho em um jovem investidor consciente',
    instructor: 'Dani Spitaletti',
    instructorTitle: 'Especialista em Educação Financeira Infantil',
    instructorImage:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    students: 1250,
    duration: '6 meses',
    price: 'R$ 2.997,00',
    originalPrice: 'R$ 4.997,00',
    discount: 40,
    level: 'Personalizado',
    category: 'Mentoria',
    description:
      'Mentoria completa e personalizada para ensinar Bitcoin e educação financeira para toda a família.',
    image:
      'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    hasCashback: true,
    cashbackPercentage: 15,
    cashbackAmount: 'R$ 449,55',
  };

  const features = [
    {
      icon: '🎯',
      title: 'Plano Personalizado',
      description: 'Estratégia customizada baseada no perfil da sua família',
    },
    {
      icon: '📞',
      title: 'Sessões 1:1',
      description: '4 sessões individuais de 60 minutos por mês',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Para Toda Família',
      description: 'Conteúdo adaptado para diferentes idades',
    },
    {
      icon: '📚',
      title: 'Material Exclusivo',
      description: 'Livros, guias e ferramentas práticas',
    },
    {
      icon: '💬',
      title: 'Suporte Contínuo',
      description: 'Acesso direto ao mentor via WhatsApp',
    },
  ];

  const modules = [
    {
      id: 1,
      title: 'Fundamentos do Bitcoin',
      duration: '2 semanas',
      lessons: 8,
      description:
        'Entenda o que é Bitcoin, como funciona e por que é importante',
      topics: [
        'O que é Bitcoin e por que existe',
        'Como funciona a blockchain',
        'Diferença entre Bitcoin e dinheiro tradicional',
        'História e evolução do Bitcoin',
      ],
    },
    {
      id: 2,
      title: 'Educação Financeira Infantil',
      duration: '3 semanas',
      lessons: 12,
      description:
        'Ensine seus filhos sobre dinheiro de forma prática e divertida',
      topics: [
        'Conceitos básicos de dinheiro',
        'Poupança e investimento para crianças',
        'Como explicar inflação para crianças',
        'Jogos e atividades práticas',
      ],
    },
    {
      id: 3,
      title: 'Prática com Carteiras',
      duration: '2 semanas',
      lessons: 6,
      description: 'Aprenda a usar carteiras Bitcoin de forma segura',
      topics: [
        'Tipos de carteiras Bitcoin',
        'Como criar uma carteira segura',
        'Enviando e recebendo Bitcoin',
        'Boas práticas de segurança',
      ],
    },
    {
      id: 4,
      title: 'Estratégias de Investimento',
      duration: '3 semanas',
      lessons: 10,
      description: 'Desenvolva uma estratégia de investimento para sua família',
      topics: [
        'DCA (Dollar Cost Averaging)',
        'Gestão de risco familiar',
        'Planejamento de longo prazo',
        'Como ensinar investimento para crianças',
      ],
    },
    {
      id: 5,
      title: 'Implementação Prática',
      duration: '4 semanas',
      lessons: 15,
      description: 'Coloque tudo em prática com acompanhamento personalizado',
      topics: [
        'Primeira compra de Bitcoin',
        'Configuração de carteiras familiares',
        'Estratégia de poupança familiar',
        'Monitoramento e ajustes',
      ],
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Mãe de João, 12 anos',
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'A mentoria transformou completamente a forma como nossa família vê o dinheiro. Meu filho agora entende Bitcoin melhor que muitos adultos!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Carlos Santos',
      role: 'Pai de Ana, 10 anos',
      image:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Excelente metodologia! O Dani conseguiu explicar conceitos complexos de forma simples e envolvente para toda a família.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Ana Costa',
      role: 'Mãe de Pedro, 14 anos',
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Vale cada centavo investido! Meu filho agora tem uma visão muito mais madura sobre investimentos e planejamento financeiro.',
      rating: 5,
    },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            {/* Description */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
                Sobre a Mentoria
              </Text>
              <Text
                style={[styles.description, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                {mentorship.description}
              </Text>
            </View>

            {/* Features */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
                O que você recebe
              </Text>
              <View style={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <View
                    key={index}
                    style={[
                      styles.featureCard,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        width: '48%',
                      },
                    ]}
                  >
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <Text style={[styles.featureTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                      {feature.title}
                    </Text>
                    <Text
                      style={[
                        styles.featureDescription,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {feature.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Instructor */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
                Seu Mentor
              </Text>
              <View
                style={[
                  styles.instructorCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Image
                  source={{ uri: mentorship.instructorImage }}
                  style={styles.instructorImage}
                />
                <View style={styles.instructorInfo}>
                  <Text style={[styles.instructorName, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                    {mentorship.instructor}
                  </Text>
                  <Text
                    style={[
                      styles.instructorTitle,
                      { color: colors.textSecondary, fontFamily: fonts.body },
                    ]}
                  >
                    {mentorship.instructorTitle}
                  </Text>
                  <View style={styles.instructorStats}>
                    <View style={styles.stat}>
                      <Star size={16} color="#F59E0B" fill="#F59E0B" />
                      <Text
                        style={[
                          styles.statText,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {mentorship.rating}/5
                      </Text>
                    </View>
                    <View style={styles.stat}>
                      <Users size={16} color={colors.textSecondary} />
                      <Text
                        style={[
                          styles.statText,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {mentorship.students} alunos
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      case 'curriculum':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
              Programa Completo
            </Text>
            {modules.map((module) => (
              <View
                key={module.id}
                style={[
                  styles.moduleCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.moduleHeader}>
                  <View style={styles.moduleNumber}>
                    <Text style={[styles.moduleNumberText, { fontFamily: fonts.bodyBold }]}>{module.id}</Text>
                  </View>
                  <View style={styles.moduleInfo}>
                    <Text style={[styles.moduleTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                      {module.title}
                    </Text>
                    <Text
                      style={[
                        styles.moduleDescription,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {module.description}
                    </Text>
                    <View style={styles.moduleMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color={colors.textSecondary} />
                        <Text
                          style={[
                            styles.metaText,
                            { color: colors.textSecondary, fontFamily: fonts.body },
                          ]}
                        >
                          {module.duration}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <PlayCircle size={14} color={colors.textSecondary} />
                        <Text
                          style={[
                            styles.metaText,
                            { color: colors.textSecondary, fontFamily: fonts.body },
                          ]}
                        >
                          {module.lessons} aulas
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.topicsContainer}>
                  {module.topics.map((topic, index) => (
                    <View key={index} style={styles.topicItem}>
                      <CheckCircle size={16} color="#10B981" />
                      <Text
                        style={[
                          styles.topicText,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {topic}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );

      case 'testimonials':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
              O que nossos alunos dizem
            </Text>
            {testimonials.map((testimonial) => (
              <View
                key={testimonial.id}
                style={[
                  styles.testimonialCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.testimonialHeader}>
                  <Image
                    source={{ uri: testimonial.image }}
                    style={styles.testimonialImage}
                  />
                  <View style={styles.testimonialInfo}>
                    <Text
                      style={[styles.testimonialName, { color: colors.text, fontFamily: fonts.displaySemiBold }]}
                    >
                      {testimonial.name}
                    </Text>
                    <Text
                      style={[
                        styles.testimonialRole,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {testimonial.role}
                    </Text>
                    <View style={styles.testimonialRating}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          color="#F59E0B"
                          fill="#F59E0B"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.testimonialText,
                    { color: colors.textSecondary, fontFamily: fonts.body },
                  ]}
                >
                  "{testimonial.text}"
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const handleEnroll = () => {
    // Implementar lógica de inscrição
    console.log('Enrolling in mentorship');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setLiked(!liked)}
          >
            <Heart
              size={24}
              color={liked ? '#EF4444' : colors.text}
              fill={liked ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: mentorship.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.badgeContainer}>
                <Text style={[styles.badge, { fontFamily: fonts.secondaryMedium }]}>🎯 MENTORIA EXCLUSIVA</Text>
              </View>
              <Text style={[styles.heroTitle, { fontFamily: fonts.display }]}>{mentorship.title}</Text>
              <Text style={[styles.heroSubtitle, { fontFamily: fonts.body }]}>{mentorship.subtitle}</Text>
              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={[styles.heroStatText, { fontFamily: fonts.bodyMedium }]}>{mentorship.rating}</Text>
                </View>
                <View style={styles.heroStat}>
                  <Users size={16} color="white" />
                  <Text style={[styles.heroStatText, { fontFamily: fonts.bodyMedium }]}>{mentorship.students}</Text>
                </View>
                <View style={styles.heroStat}>
                  <Clock size={16} color="white" />
                  <Text style={[styles.heroStatText, { fontFamily: fonts.bodyMedium }]}>{mentorship.duration}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Cashback Banner */}
        {mentorship.hasCashback && (
          <View style={styles.section}>
            <View style={styles.cashbackBanner}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.cashbackGradient}
              >
                <View style={styles.cashbackContent}>
                  <Gift size={24} color="white" />
                  <View style={styles.cashbackText}>
                    <Text style={[styles.cashbackTitle, { fontFamily: fonts.bodySemiBold }]}>
                      Cashback Disponível!
                    </Text>
                    <Text style={[styles.cashbackSubtitle, { fontFamily: fonts.body }]}>
                      Ganhe {mentorship.cashbackPercentage}% de volta (
                      {mentorship.cashbackAmount})
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'overview', label: 'Visão Geral' },
              { key: 'curriculum', label: 'Programa' },
              { key: 'testimonials', label: 'Depoimentos' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  selectedTab === tab.key && styles.activeTab,
                  selectedTab === tab.key && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      fontFamily: fonts.bodySemiBold,
                      color:
                        selectedTab === tab.key
                          ? 'white'
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { fontFamily: fonts.display }]}>{mentorship.price}</Text>
            {mentorship.originalPrice && (
              <Text style={[styles.originalPrice, { fontFamily: fonts.body }]}>
                {mentorship.originalPrice}
              </Text>
            )}
          </View>
          <Text style={[styles.priceSubtext, { fontFamily: fonts.body }]}>
            Pagamento único • Acesso vitalício
          </Text>
        </View>

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
          <LinearGradient
            colors={['#4f46e5', '#3b82f6']}
            style={styles.enrollGradient}
          >
            <Text style={[styles.enrollText, { fontFamily: fonts.bodyBold }]}>INICIAR MENTORIA</Text>
            <ArrowRight size={18} color="white" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  badgeContainer: {
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 12,
    color: 'white',
    alignSelf: 'flex-start',
  },
  heroTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 20,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroStatText: {
    fontSize: 14,
    color: 'white',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  cashbackBanner: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cashbackGradient: {
    padding: 16,
  },
  cashbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cashbackText: {
    flex: 1,
  },
  cashbackTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  cashbackSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  instructorCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  moduleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  moduleNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleNumberText: {
    fontSize: 14,
    color: 'white',
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  moduleMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  topicsContainer: {
    gap: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicText: {
    fontSize: 14,
    flex: 1,
  },
  testimonialCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  testimonialImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    marginBottom: 2,
  },
  testimonialRole: {
    fontSize: 14,
    marginBottom: 4,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceSection: {
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  enrollButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  enrollGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  enrollText: {
    fontSize: 16,
    color: 'white',
  },
});
