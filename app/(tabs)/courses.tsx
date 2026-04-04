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
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import GlassCard from '@/components/GlassCard';
import {
  ChevronRight,
  Shield,
} from 'lucide-react-native';

const cardShadow = Platform.select({
  ios: { shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
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

function CourseCard({ course, onPress, colors, fonts, t, owned }: any) {
  return (
    <AnimatedPressable
      style={[styles.courseCard, { backgroundColor: colors.card }, cardShadow]}
      onPress={onPress}
    >
      <Image source={course.image} style={styles.courseImage} resizeMode="cover" />
      {owned && (
        <View style={styles.ownedBadge}>
          <Text style={[styles.ownedBadgeText, { fontFamily: fonts.secondaryMedium }]}>✅ {t('courses.owned') || 'Adquirido'}</Text>
        </View>
      )}
      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{course.title}</Text>
        <Text style={[styles.courseSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]} numberOfLines={3}>
          {course.subtitle}
        </Text>
        <View style={styles.courseFooter}>
          <View>
            {owned ? (
              <Text style={[styles.coursePrice, { color: '#10B981', fontFamily: fonts.bodyBold }]}>✅</Text>
            ) : (
              <>
                <Text style={[styles.priceLabel, { fontFamily: fonts.secondaryMedium }]}>{t('courses.priceLabel')}</Text>
                <Text style={[styles.coursePrice, { fontFamily: fonts.bodyBold }]}>R$ {course.price}</Text>
              </>
            )}
          </View>
          <LinearGradient
            colors={owned ? ['#10B981', '#059669'] as const : ['#4f46e5', '#3b82f6'] as const}
            style={styles.courseBtn}
          >
            <Text style={[styles.courseBtnText, { fontFamily: fonts.bodyBold }]}>{owned ? (t('courses.access') || 'Acessar') : t('courses.viewCourse')}</Text>
            <ChevronRight size={16} color="#FFF" />
          </LinearGradient>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default function CoursesScreen() {
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const { hasCourseAccess } = useUser();

  const translatedCourses = courses.map(c => {
    const courseKey = `course${c.id}` as 'course1' | 'course2' | 'course3';
    return {
      ...c,
      title: t(`courses.${courseKey}Title`),
      subtitle: t(`courses.${courseKey}Subtitle`),
    };
  });

  const translatedAudience = targetAudience.map((item, index) => {
    const idx = index + 1;
    return {
      ...item,
      title: t(`courses.target${idx}Title`),
      desc: t(`courses.target${idx}Desc`),
    };
  });

  const trail1 = translatedCourses.filter(c => c.trail === 1);
  const trail2 = translatedCourses.filter(c => c.trail === 2);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient colors={isDark ? ['#0f172a', '#1e293b'] as const : ['#4f46e5', '#3b82f6'] as const} style={styles.header}>
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('courses.headerTitle')}</Text>
        <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>
          {t('courses.headerSubtitle')}
        </Text>
      </LinearGradient>

      <View style={styles.content}>

        {/* Para quem são */}
        <AnimatedSection>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
          {t('courses.targetTitle')}
        </Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
          {t('courses.targetDesc')}
        </Text>

        {translatedAudience.map((item, index) => (
          <GlassCard key={index} style={styles.audienceItem}>
            <Text style={styles.audienceEmoji}>{item.emoji}</Text>
            <View style={styles.audienceContent}>
              <Text style={[styles.audienceTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.title}</Text>
              <Text style={[styles.audienceDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{item.desc}</Text>
            </View>
          </GlassCard>
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Trilha 1 */}
        <AnimatedSection>
        <LinearGradient colors={['#F7931A', '#E2761B'] as const} style={styles.trailBadge}>
          <Text style={[styles.trailBadgeText, { fontFamily: fonts.bodyBold }]}>🟠 {t('courses.trail1Badge')}</Text>
        </LinearGradient>
        <Text style={[styles.trailSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
          {t('courses.trail1Subtitle')}
        </Text>

        {trail1.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push(`/course/${course.id}`)}
            colors={colors}
            fonts={fonts}
            t={t}
            owned={hasCourseAccess(course.id)}
          />
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Trilha 2 */}
        <AnimatedSection>
        <LinearGradient colors={['#3B82F6', '#1D4ED8'] as const} style={styles.trailBadge}>
          <Text style={[styles.trailBadgeText, { fontFamily: fonts.bodyBold }]}>🔵 {t('courses.trail2Badge')}</Text>
        </LinearGradient>
        <Text style={[styles.trailSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
          {t('courses.trail2Subtitle')}
        </Text>

        {trail2.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push(`/course/${course.id}`)}
            colors={colors}
            fonts={fonts}
            t={t}
            owned={hasCourseAccess(course.id)}
          />
        ))}
        </AnimatedSection>

        <View style={styles.divider} />

        {/* Garantia */}
        <AnimatedSection>
        <GlassCard style={styles.guaranteeCard}>
          <Shield size={32} color="#10B981" />
          <Text style={[styles.guaranteeTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            {t('courses.guaranteeTitle')}
          </Text>
          <Text style={[styles.guaranteeDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('courses.guaranteeDesc')}
          </Text>
        </GlassCard>
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
    marginBottom: 8,
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
  ownedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  ownedBadgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 17,
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
  },
  guaranteeCard: {
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10 },
      android: { elevation: 4 },
    }),
  },
  guaranteeTitle: {
    fontSize: 18,
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
