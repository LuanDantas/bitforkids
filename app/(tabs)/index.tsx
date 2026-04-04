import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import GlassCard from '@/components/GlassCard';
import AuroraBackground from '@/components/AuroraBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useStudy } from '@/contexts/StudyContext';
import { studyData } from '@/data/studyModules';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronRight,
  Play,
  Sparkles,
  TrendingUp,
  HelpCircle,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.65;
const CARD_SPACING = 12;

const COURSES = [
  {
    id: 1,
    titleKey: 'home.course1Title',
    subtitleKey: 'home.course1Subtitle',
    image: require('../../assets/images/curso-bitcoin.png'),
    trailColors: ['#F7931A', '#E2761B'] as const,
  },
  {
    id: 2,
    titleKey: 'home.course2Title',
    subtitleKey: 'home.course2Subtitle',
    image: require('../../assets/images/curso-ethereum.png'),
    trailColors: ['#3B82F6', '#1D4ED8'] as const,
  },
  {
    id: 3,
    titleKey: 'home.course3Title',
    subtitleKey: 'home.course3Subtitle',
    image: require('../../assets/images/curso-autocustodia.png'),
    trailColors: ['#3B82F6', '#1D4ED8'] as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { user, hasCourseAccess } = useUser();
  const { getCourseProgress, getProgress } = useStudy();

  const heroCourse = useMemo(() => {
    const buildResult = (course: typeof COURSES[0], progress: number, isResuming: boolean) => {
      const study = studyData.find((s) => s.courseId === course.id);
      const details = getProgress(course.id);
      let lastModuleTitle = '';
      let lastLessonTitle = '';
      if (isResuming && study && details.lastModule) {
        const mod = study.modules.find((m) => m.id === details.lastModule);
        if (mod) {
          lastModuleTitle = mod.title;
          const lesson = mod.lessons.find((l) => l.id === details.lastLesson);
          if (lesson) lastLessonTitle = lesson.title;
        }
      }
      return { ...course, progress, isResuming, lastModuleTitle, lastLessonTitle };
    };

    // Priority 1: In-progress course
    for (const course of COURSES) {
      const progress = getCourseProgress(course.id);
      const details = getProgress(course.id);
      if (progress > 0 && progress < 100 && details.lastModule) {
        return buildResult(course, progress, true);
      }
    }
    // Priority 2: First course with access and 0% progress
    for (const course of COURSES) {
      if (hasCourseAccess(course.id) && getCourseProgress(course.id) === 0) {
        return buildResult(course, 0, false);
      }
    }
    // Fallback: Course 1
    return buildResult(COURSES[0], 0, false);
  }, [getCourseProgress, getProgress, hasCourseAccess]);

  const quickLinks = [
    {
      key: 'welcome',
      icon: Sparkles,
      title: t('dashboard.welcomeCard'),
      subtitle: t('dashboard.welcomeCardSub'),
      color: '#6366f1',
      onPress: () => router.push('/(tabs)/about' as any),
    },
    {
      key: 'indices',
      icon: TrendingUp,
      title: t('dashboard.indicesCard'),
      subtitle: t('dashboard.indicesCardSub'),
      color: '#3b82f6',
      onPress: () => router.push('/(tabs)/indices'),
    },
    {
      key: 'support',
      icon: HelpCircle,
      title: t('dashboard.supportCard'),
      subtitle: t('dashboard.supportCardSub'),
      color: '#10B981',
      onPress: () => router.push('/support' as any),
    },
  ];

  const trail1Courses = COURSES.filter((c) => c.id <= 2);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO — full-width image with gradient fade */}
        <View style={[styles.heroWrapper, { backgroundColor: colors.background }]}>
          <Image
            source={heroCourse.image}
            style={styles.heroBgImage}
            resizeMode="contain"
          />
          {/* Single gradient: tint top + fade to background at bottom */}
          <LinearGradient
            colors={[
              'rgba(15,23,42,0.35)',
              'rgba(15,23,42,0.5)',
              colors.background,
            ] as const}
            locations={[0, 0.45, 0.85]}
            style={styles.heroGradient}
          />

          {/* Content over the image */}
          <View style={[styles.heroContent, { paddingTop: insets.top + 24 }]}>
            {/* Greeting pill */}
            <AnimatedSection>
              <View style={styles.greetingPill}>
                <Text
                  style={[
                    styles.greetingText,
                    { fontFamily: fonts.bodySemiBold },
                  ]}
                >
                  {t('dashboard.greeting')} {user?.name ?? ''}! 👋
                </Text>
              </View>
            </AnimatedSection>

            {/* Course title */}
            <AnimatedSection delay={100}>
              <View style={styles.heroCourseBlock}>
                <Text
                  style={[
                    styles.heroTitle,
                    { fontFamily: fonts.display },
                  ]}
                >
                  {t(heroCourse.titleKey)}
                </Text>

                {/* Continue watching info */}
                {heroCourse.isResuming && heroCourse.lastModuleTitle ? (
                  <View style={styles.heroSubtitleRow}>
                    <Text
                      style={[
                        styles.heroSubtitle,
                        { fontFamily: fonts.body },
                      ]}
                    >
                      {t('dashboard.continueWatching')} |{' '}
                    </Text>
                    <Text
                      style={[
                        styles.heroSubtitleBold,
                        { fontFamily: fonts.bodyBold },
                      ]}
                    >
                      {heroCourse.lastModuleTitle}
                    </Text>
                  </View>
                ) : null}

                {/* CTA button */}
                <AnimatedPressable
                  onPress={() => router.push(`/course/${heroCourse.id}/study`)}
                  style={styles.heroCTA}
                >
                  <LinearGradient
                    colors={['#F59E0B', '#F97316'] as const}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.heroCTAGradient}
                  >
                    <Play size={18} color="#fff" fill="#fff" />
                    <Text
                      style={[
                        styles.heroCTAText,
                        { fontFamily: fonts.bodyBold },
                      ]}
                    >
                      {heroCourse.isResuming
                        ? t('dashboard.continueCourse')
                        : t('dashboard.startCourse')}
                    </Text>
                  </LinearGradient>
                </AnimatedPressable>
              </View>
            </AnimatedSection>
          </View>
        </View>

        {/* Rest of page — sits right after the fade */}
        <AuroraBackground />

        {/* CAROUSEL 1 - QUICK ACCESS */}
        <AnimatedSection delay={200}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, fontFamily: fonts.displaySemiBold },
            ]}
          >
            {t('dashboard.quickAccessTitle')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            snapToAlignment="start"
            contentContainerStyle={styles.carouselContent}
          >
            {quickLinks.map((link) => (
              <AnimatedPressable
                key={link.key}
                onPress={link.onPress}
                style={{ width: CARD_WIDTH, marginRight: CARD_SPACING }}
              >
                <GlassCard style={styles.quickCard}>
                  <View
                    style={[
                      styles.quickIconContainer,
                      { backgroundColor: `${link.color}20` },
                    ]}
                  >
                    <link.icon size={22} color={link.color} />
                  </View>
                  <Text
                    style={[
                      styles.quickTitle,
                      { color: colors.text, fontFamily: fonts.bodySemiBold },
                    ]}
                  >
                    {link.title}
                  </Text>
                  <Text
                    style={[
                      styles.quickSubtitle,
                      {
                        color: colors.textSecondary,
                        fontFamily: fonts.body,
                      },
                    ]}
                  >
                    {link.subtitle}
                  </Text>
                  <ChevronRight
                    size={16}
                    color={colors.textTertiary}
                    style={styles.quickChevron}
                  />
                </GlassCard>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </AnimatedSection>

        {/* CAROUSEL 2 - TRAIL 1 */}
        <AnimatedSection delay={300}>
          <View style={styles.trailHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: fonts.displaySemiBold },
              ]}
            >
              {t('dashboard.trail1Title')}
            </Text>
            <Text
              style={[
                styles.trailSubtitle,
                { color: colors.textSecondary, fontFamily: fonts.body },
              ]}
            >
              {t('dashboard.trail1Subtitle')}
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            snapToAlignment="start"
            contentContainerStyle={styles.carouselContent}
          >
            {trail1Courses.map((course) => {
              const progress = getCourseProgress(course.id);
              return (
                <AnimatedPressable
                  key={course.id}
                  onPress={() => router.push(`/course/${course.id}`)}
                  style={{ width: CARD_WIDTH, marginRight: CARD_SPACING }}
                >
                  <GlassCard style={styles.courseCard} borderRadius={16}>
                    <View style={{ margin: -16 }}>
                      <Image
                        source={course.image}
                        style={styles.courseImage}
                        resizeMode="cover"
                      />
                      <View style={styles.courseInfo}>
                        <Text
                          style={[
                            styles.courseTitle,
                            {
                              color: colors.text,
                              fontFamily: fonts.bodySemiBold,
                            },
                          ]}
                          numberOfLines={2}
                        >
                          {t(course.titleKey)}
                        </Text>
                        {progress > 0 && (
                          <View style={styles.courseProgressContainer}>
                            <View
                              style={[
                                styles.courseProgressBar,
                                { backgroundColor: colors.border },
                              ]}
                            >
                              <View
                                style={[
                                  styles.courseProgressFill,
                                  { width: `${progress}%` },
                                ]}
                              />
                            </View>
                            <Text
                              style={[
                                styles.courseProgressText,
                                {
                                  color: colors.textTertiary,
                                  fontFamily: fonts.bodySemiBold,
                                },
                              ]}
                            >
                              {progress}%
                            </Text>
                          </View>
                        )}
                        <View style={styles.courseFooter}>
                          <LinearGradient
                            colors={course.trailColors}
                            style={styles.trailBadge}
                          >
                            <Text style={[styles.trailBadgeText, { fontFamily: fonts.secondaryMedium }]}>
                              {t('dashboard.trail1Title')}
                            </Text>
                          </LinearGradient>
                          <ChevronRight size={16} color="#6366f1" />
                        </View>
                      </View>
                    </View>
                  </GlassCard>
                </AnimatedPressable>
              );
            })}
          </ScrollView>
        </AnimatedSection>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  android: {
    elevation: 6,
  },
  default: {},
}) as any;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero wrapper
  heroWrapper: {
    position: 'relative',
    width: '100%',
    height: 420,
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    zIndex: 2,
  },

  // Greeting pill
  greetingPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30, 27, 75, 0.85)',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  greetingText: {
    fontSize: 15,
    color: '#fff',
  },

  // Course block inside hero
  heroCourseBlock: {
    marginTop: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 12,
  },
  heroSubtitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  heroSubtitleBold: {
    color: '#F59E0B',
    fontSize: 14,
  },
  heroCTA: {
    alignSelf: 'flex-start',
  },
  heroCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  heroCTAText: {
    color: '#fff',
    fontSize: 17,
  },

  // Section title
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Carousel
  carouselContent: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },

  // Quick access cards
  quickCard: {
    minHeight: 120,
  },
  quickIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  quickSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  quickChevron: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  // Trail header
  trailHeader: {
    marginTop: 24,
    marginBottom: 4,
  },
  trailSubtitle: {
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Course cards
  courseCard: {
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  courseProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  courseProgressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  courseProgressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6366f1',
  },
  courseProgressText: {
    fontSize: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trailBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  trailBadgeText: {
    color: '#fff',
    fontSize: 11,
  },
});
