import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useCourses } from '@/hooks/useCourses';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import {
  ChevronRight,
  Shield,
  CheckCircle,
  Users,
  ShieldCheck,
  FileText,
  Key,
  Heart,
  Briefcase,
  TrendingDown,
} from 'lucide-react-native';

const AUDIENCE_ICONS = [Users, ShieldCheck, FileText, Key, Heart, Briefcase, TrendingDown];
// Identidade Landing 6: rotação monocromática indigo → azul → ciano
const AUDIENCE_ACCENTS = ['#6366f1', '#3b82f6', '#06b6d4', '#818cf8', '#60a5fa', '#6366f1', '#3b82f6'];

// Banners locais por curso (legacyId) — fallback quando a API não traz coverUrl
// (offline ou capa ainda não cadastrada). A capa oficial vem de course.coverUrl.
const COURSE_IMAGES: Record<number, any> = {
  1: require('../../assets/images/curso-bitcoin.png'),
  2: require('../../assets/images/curso-ethereum.png'),
  3: require('../../assets/images/curso-autocustodia.png'),
};

const FALLBACK_COURSES = [
  { id: 1, trail: 1 },
  { id: 2, trail: 1 },
  { id: 3, trail: 2 },
];

export default function CoursesScreen() {
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t, locale } = useLanguage();
  const { hasCourseAccess } = useUser();
  const { courses: apiCourses } = useCourses(locale);

  // Dados da API quando disponíveis; fallback para i18n local enquanto carrega/offline.
  const baseCourses =
    apiCourses ??
    FALLBACK_COURSES.map(c => ({
      id: c.id,
      trail: c.trail,
      title: t(`courses.course${c.id}Title`),
      subtitle: t(`courses.course${c.id}Subtitle`),
      price: '397,00',
      coverUrl: null as string | null,
    }));

  const translatedCourses = baseCourses.map(c => ({
    ...c,
    image: c.coverUrl ? { uri: c.coverUrl } : COURSE_IMAGES[c.id],
  }));

  const trail1 = translatedCourses.filter(c => c.trail === 1);
  const trail2 = translatedCourses.filter(c => c.trail === 2);

  return (
    <ScrollView
      style={[s.container, { backgroundColor: colors.background }]}
      contentContainerStyle={s.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#0f172a', '#1e293b'] as const : ['#4f46e5', '#3b82f6'] as const}
        style={s.header}
      >
        <Text style={[s.headerTitle, { fontFamily: fonts.display }]}>{t('courses.headerTitle')}</Text>
        <Text style={[s.headerSubtitle, { fontFamily: fonts.body }]}>{t('courses.headerSubtitle')}</Text>
      </LinearGradient>

      <View style={s.content}>

        {/* Para quem são */}
        <AnimatedSection>
          <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={s.cardHeader}>
              <View style={[s.iconBadge, { backgroundColor: '#6366f120' }]}>
                <Users size={18} color="#6366f1" />
              </View>
              <Text style={[s.cardTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('courses.targetTitle')}</Text>
            </View>
            <View style={[s.cardDivider, { backgroundColor: '#6366f130' }]} />
            <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('courses.targetDesc')}</Text>

            {Array.from({ length: 7 }, (_, i) => {
              const Icon = AUDIENCE_ICONS[i];
              const accent = AUDIENCE_ACCENTS[i];
              return (
                <View key={i} style={s.audienceItem}>
                  <View style={[s.audienceIcon, { backgroundColor: accent + '15' }]}>
                    <Icon size={16} color={accent} />
                  </View>
                  <View style={s.audienceContent}>
                    <Text style={[s.audienceTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t(`courses.target${i + 1}Title`)}</Text>
                    <Text style={[s.audienceDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t(`courses.target${i + 1}Desc`)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </AnimatedSection>

        {/* Trilha 1 */}
        <AnimatedSection>
          <View style={[s.trailCard, { borderColor: 'rgba(99,102,241,0.25)' }]}>
            <LinearGradient colors={['#6366f1', '#3b82f6'] as const} style={s.trailHeader}>
              <Text style={[s.trailLabel, { fontFamily: fonts.secondaryMedium }]}>{t('courses.trail1Badge')}</Text>
            </LinearGradient>
            <View style={s.trailBody}>
              <Text style={[s.trailSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('courses.trail1Subtitle')}</Text>
              {trail1.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  owned={hasCourseAccess(course.id)}
                  onPress={() => router.push(`/course/${course.id}`)}
                  colors={colors}
                  fonts={fonts}
                  t={t}
                />
              ))}
            </View>
          </View>
        </AnimatedSection>

        {/* Trilha 2 */}
        <AnimatedSection>
          <View style={[s.trailCard, { borderColor: 'rgba(59,130,246,0.25)' }]}>
            <LinearGradient colors={['#3b82f6', '#06b6d4'] as const} style={s.trailHeader}>
              <Text style={[s.trailLabel, { fontFamily: fonts.secondaryMedium }]}>{t('courses.trail2Badge')}</Text>
            </LinearGradient>
            <View style={s.trailBody}>
              <Text style={[s.trailSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('courses.trail2Subtitle')}</Text>
              {trail2.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  owned={hasCourseAccess(course.id)}
                  onPress={() => router.push(`/course/${course.id}`)}
                  colors={colors}
                  fonts={fonts}
                  t={t}
                />
              ))}
            </View>
          </View>
        </AnimatedSection>

        {/* Garantia */}
        <AnimatedSection>
          <View style={s.guaranteeCard}>
            <LinearGradient colors={['rgba(99,102,241,0.1)', 'transparent'] as const} style={StyleSheet.absoluteFill} />
            <View style={[s.guaranteeIconCircle, { backgroundColor: '#6366f120' }]}>
              <Shield size={24} color="#6366f1" />
            </View>
            <Text style={[s.guaranteeTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('courses.guaranteeTitle')}</Text>
            <View style={s.accentLine} />
            <Text style={[s.guaranteeDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('courses.guaranteeDesc')}</Text>
            <View style={s.guaranteeBadge}>
              <CheckCircle size={14} color="#6366f1" />
              <Text style={[s.guaranteeBadgeText, { fontFamily: fonts.bodySemiBold }]}>100% seguro</Text>
            </View>
          </View>
        </AnimatedSection>

        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
}

function CourseCard({ course, owned, onPress, colors, fonts, t }: any) {
  return (
    <AnimatedPressable onPress={onPress} style={[s.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image source={course.image} style={s.courseImage} resizeMode="cover" />
      {owned && (
        <View style={s.ownedBadge}>
          <CheckCircle size={12} color="#fff" />
          <Text style={[s.ownedBadgeText, { fontFamily: fonts.secondaryMedium }]}>{t('courses.owned') || 'Adquirido'}</Text>
        </View>
      )}

      <View style={s.courseContent}>
        <Text style={[s.courseTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{course.title}</Text>
        <Text style={[s.courseSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]} numberOfLines={3}>{course.subtitle}</Text>
        <View style={s.courseFooter}>
          {owned ? (
            <View style={[s.coursePriceChip, { backgroundColor: '#6366f120' }]}>
              <CheckCircle size={14} color="#818cf8" />
              <Text style={[s.coursePriceOwned, { fontFamily: fonts.bodySemiBold }]}>{t('courses.owned')}</Text>
            </View>
          ) : (
            <View>
              <Text style={[s.priceLabel, { fontFamily: fonts.secondaryMedium }]}>{t('courses.priceLabel')}</Text>
              <Text style={[s.coursePrice, { fontFamily: fonts.bodyBold }]}>R$ {course.price}</Text>
            </View>
          )}
          <LinearGradient
            colors={owned ? ['#6366f1', '#3b82f6'] as const : ['#4f46e5', '#3b82f6'] as const}
            style={s.courseBtn}
          >
            <Text style={[s.courseBtnText, { fontFamily: fonts.bodySemiBold }]}>{owned ? (t('courses.access') || 'Acessar') : t('courses.viewCourse')}</Text>
            <ChevronRight size={16} color="#FFF" />
          </LinearGradient>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // Header
  header: { paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 },
  headerTitle: { fontSize: 26, color: '#FFF', marginBottom: 4 },
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 22 },

  content: { padding: 16 },

  // Card base
  card: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  iconBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 17, flex: 1 },
  cardDivider: { height: 1, marginBottom: 14 },
  paragraph: { fontSize: 14, lineHeight: 22, marginBottom: 14 },

  // Audience
  audienceItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  audienceIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  audienceContent: { flex: 1 },
  audienceTitle: { fontSize: 14, marginBottom: 2 },
  audienceDesc: { fontSize: 13, lineHeight: 18 },

  // Trail cards
  trailCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginBottom: 14 },
  trailHeader: { padding: 20, paddingBottom: 16 },
  trailLabel: { color: '#FFF', fontSize: 15, letterSpacing: 0.5 },
  trailBody: { padding: 16 },
  trailSubtitle: { fontSize: 14, lineHeight: 20, marginBottom: 14 },

  // Course cards
  courseCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 14, borderWidth: 1 },
  courseImage: { width: '100%', height: 160 },
  ownedBadge: {
    position: 'absolute', top: 12, right: 12, backgroundColor: '#6366f1',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, zIndex: 1,
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  ownedBadgeText: { color: '#FFF', fontSize: 11 },
  courseContent: { padding: 16 },
  courseTitle: { fontSize: 16, marginBottom: 6 },
  courseSubtitle: { fontSize: 13, lineHeight: 20, marginBottom: 14 },
  courseFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: 11, color: '#8B8B8B', marginBottom: 2 },
  coursePrice: { fontSize: 18, color: '#818cf8' },
  coursePriceChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  coursePriceOwned: { fontSize: 13, color: '#818cf8' },
  courseBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, gap: 4 },
  courseBtnText: { color: '#FFF', fontSize: 13 },

  // Guarantee
  guaranteeCard: {
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(99,102,241,0.3)',
    padding: 24, marginBottom: 14, alignItems: 'center', overflow: 'hidden',
  },
  guaranteeIconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  guaranteeTitle: { fontSize: 18, marginBottom: 8 },
  accentLine: { width: 40, height: 3, borderRadius: 2, backgroundColor: '#6366f1', marginBottom: 12 },
  guaranteeDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  guaranteeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14,
    backgroundColor: 'rgba(99,102,241,0.1)', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20,
  },
  guaranteeBadgeText: { color: '#6366f1', fontSize: 13 },
});
