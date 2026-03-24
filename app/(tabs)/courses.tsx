import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import {
  ChevronRight,
  Shield,
} from 'lucide-react-native';

const cardShadow = Platform.select({
  ios: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
  android: { elevation: 6 },
  default: {},
}) as any;

const courses = [
  {
    id: 1,
    title: 'Bitcoin — A Evolução do Dinheiro',
    subtitle: 'Construa um patrimônio que nenhum banco ou governo pode controlar. Como comprar, guardar e acumular Bitcoin com segurança.',
    price: '397,00',
    trail: 1,
    image: require('../../assets/images/curso-bitcoin.png'),
  },
  {
    id: 2,
    title: 'Ethereum e Dólar Digital',
    subtitle: 'Como usar criptomoedas no dia a dia e acessar o sistema financeiro da internet — sem bancos e sem CPF.',
    price: '397,00',
    trail: 1,
    image: require('../../assets/images/curso-ethereum.png'),
  },
  {
    id: 3,
    title: 'Autocustódia e Criptomoedas no Dia a Dia',
    subtitle: 'Aprenda a guardar seus ativos com segurança e utilizar aplicativos para pagamentos, transferências e serviços financeiros.',
    price: '397,00',
    trail: 2,
    image: require('../../assets/images/curso-autocustodia.png'),
  },
];

const targetAudience = [
  { emoji: '🏦', title: 'Não quer depender de bancos', desc: 'Cansado de taxas e regras impostas por instituições financeiras.' },
  { emoji: '🚫', title: 'Quer proteger seu patrimônio', desc: 'Guardar dinheiro fora do alcance de bloqueios ou confiscos.' },
  { emoji: '📄', title: 'CPF negativado ou fora do sistema', desc: 'Sem burocracia ou aprovação de instituições.' },
  { emoji: '🔐', title: 'Ser seu próprio banco', desc: 'Mover valores com segurança nas redes descentralizadas.' },
  { emoji: '👨‍👩‍👧', title: 'Pais que pensam no futuro dos filhos', desc: 'Criar uma poupança digital para as próximas gerações.' },
  { emoji: '💼', title: 'Autônomos e empreendedores', desc: 'Proteger capital dos impostos e da instabilidade financeira.' },
  { emoji: '💰', title: 'Cansado da desvalorização', desc: 'Guardar em moedas fortes, como Dólar e Bitcoin.' },
];

function CourseCard({ course, onPress, colors }: any) {
  return (
    <AnimatedPressable
      style={[styles.courseCard, { backgroundColor: colors.card }, cardShadow]}
      onPress={onPress}
    >
      <Image source={course.image} style={styles.courseImage} resizeMode="cover" />
      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
        <Text style={[styles.courseSubtitle, { color: colors.textSecondary }]} numberOfLines={3}>
          {course.subtitle}
        </Text>
        <View style={styles.courseFooter}>
          <View>
            <Text style={styles.priceLabel}>Investimento</Text>
            <Text style={styles.coursePrice}>R$ {course.price}</Text>
          </View>
          <LinearGradient
            colors={['#8B5CF6', '#6D28D9'] as const}
            style={styles.courseBtn}
          >
            <Text style={styles.courseBtnText}>Ver curso</Text>
            <ChevronRight size={16} color="#FFF" />
          </LinearGradient>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default function CoursesScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const trail1 = courses.filter(c => c.trail === 1);
  const trail2 = courses.filter(c => c.trail === 2);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient colors={isDark ? ['#1a1a1a', '#2a1a4a'] as const : ['#8B5CF6', '#3B82F6'] as const} style={styles.header}>
        <Text style={styles.headerTitle}>Nossos Treinamentos</Text>
        <Text style={styles.headerSubtitle}>
          Escolha sua trilha e comece sua jornada rumo à soberania financeira
        </Text>
      </LinearGradient>

      <View style={styles.content}>

        {/* Para quem são */}
        <AnimatedSection>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Para quem são nossos cursos?
        </Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          Para quem quer ter controle total sobre o próprio dinheiro, guardar patrimônio e fazer transações sem depender de bancos, governos ou intermediários.
        </Text>

        {targetAudience.map((item, index) => (
          <View key={index} style={[styles.audienceItem, { backgroundColor: colors.card }]}>
            <Text style={styles.audienceEmoji}>{item.emoji}</Text>
            <View style={styles.audienceContent}>
              <Text style={[styles.audienceTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.audienceDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Trilha 1 */}
        <AnimatedSection>
        <LinearGradient colors={['#F7931A', '#E2761B'] as const} style={styles.trailBadge}>
          <Text style={styles.trailBadgeText}>🟠 TRILHA 1: A Jornada do Iniciante</Text>
        </LinearGradient>
        <Text style={[styles.trailSubtitle, { color: colors.textSecondary }]}>
          Fundamentos das Redes — Teoria e Prática. Ideal para quem está começando agora e precisa dominar a base.
        </Text>

        {trail1.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push(`/course/${course.id}`)}
            colors={colors}
          />
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Trilha 2 */}
        <AnimatedSection>
        <LinearGradient colors={['#3B82F6', '#1D4ED8'] as const} style={styles.trailBadge}>
          <Text style={styles.trailBadgeText}>🔵 TRILHA 2: A Jornada da Soberania</Text>
        </LinearGradient>
        <Text style={[styles.trailSubtitle, { color: colors.textSecondary }]}>
          Domínio Técnico Avançado. Ideal para quem quer focar 100% em liberdade operacional, privacidade e domínio total do capital.
        </Text>

        {trail2.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push(`/course/${course.id}`)}
            colors={colors}
          />
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Garantia */}
        <AnimatedSection>
        <View style={[styles.guaranteeCard, { backgroundColor: colors.card }]}>
          <Shield size={32} color="#10B981" />
          <Text style={[styles.guaranteeTitle, { color: colors.text }]}>
            Garantia Total de 7 Dias
          </Text>
          <Text style={[styles.guaranteeDesc, { color: colors.textSecondary }]}>
            Se não for para você, devolvo 100% do valor. Sem perguntas. A decisão é totalmente sua, o risco é todo meu.
          </Text>
        </View>
        </AnimatedSection>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  audienceItem: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  audienceEmoji: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 4,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    overflow: 'hidden',
  },
  audienceContent: {
    flex: 1,
  },
  audienceTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  audienceDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginVertical: 24,
  },
  trailBadge: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  trailBadgeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  trailSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  courseCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  courseSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 11,
    color: '#8B8B8B',
    marginBottom: 2,
  },
  coursePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  courseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 4,
  },
  courseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  guaranteeCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    ...Platform.select({
      ios: { shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10 },
      android: { elevation: 4 },
    }),
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  guaranteeDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
