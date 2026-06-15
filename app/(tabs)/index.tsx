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
const CARD_WIDTH = SCREEN_WIDTH * 0.5;
const CARD_SPACING = 12;

const COURSES = [
  {
    id: 1,
    titleKey: 'home.course1Title',
    subtitleKey: 'home.course1Subtitle',
    image: require('../../assets/images/curso-bitcoin.png'),
  },
  {
    id: 2,
    titleKey: 'home.course2Title',
    subtitleKey: 'home.course2Subtitle',
    image: require('../../assets/images/curso-ethereum.png'),
  },
  {
    id: 3,
    titleKey: 'home.course3Title',
    subtitleKey: 'home.course3Subtitle',
    image: require('../../assets/images/curso-autocustodia.png'),
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
      titleBold: t('dashboard.welcomeCardBold'),
      cta: t('dashboard.welcomeCardCta'),
      accent: colors.primary,
      onPress: () => router.push('/(tabs)/about' as any),
    },
    {
      key: 'indices',
      icon: TrendingUp,
      title: t('dashboard.indicesCard'),
      titleBold: t('dashboard.indicesCardBold'),
      cta: t('dashboard.indicesCardCta'),
      accent: colors.secondary,
      onPress: () => router.push('/(tabs)/indices'),
    },
    {
      key: 'support',
      icon: HelpCircle,
      title: t('dashboard.supportCard'),
      titleBold: t('dashboard.supportCardBold'),
      cta: t('dashboard.supportCardCta'),
      accent: colors.tertiary,
      onPress: () => router.push('/support' as any),
    },
  ];

  const trail1Courses = COURSES.filter((c) => c.id <= 2);
  const trail2Courses = COURSES.filter((c) => c.id === 3);

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
                        { color: colors.accentLight, fontFamily: fonts.bodyBold },
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
                    colors={colors.gradientPrimary}
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

        <View style={{ height: 32 }} />

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
                <View style={styles.quickCard}>
                  {/* Icon circle with glow */}
                  <View style={styles.quickIconRing}>
                    <View style={[styles.quickIconCircle, { shadowColor: link.accent }]}>
                      <link.icon size={28} color={link.accent} />
                    </View>
                  </View>
                  {/* Title */}
                  <Text
                    style={[
                      styles.quickTitle,
                      { color: '#fff', fontFamily: fonts.body },
                    ]}
                  >
                    {link.title}
                  </Text>
                  <Text
                    style={[
                      styles.quickTitleBold,
                      { color: '#fff', fontFamily: fonts.display },
                    ]}
                  >
                    {link.titleBold}
                  </Text>
                  {/* Accent line */}
                  <View style={[styles.quickAccentLine, { backgroundColor: link.accent }]} />
                  {/* CTA button */}
                  <View style={[styles.quickCta, { borderColor: link.accent }]}>
                    <ChevronRight size={16} color="#fff" />
                    <Text
                      style={[
                        styles.quickCtaText,
                        { color: '#fff', fontFamily: fonts.bodySemiBold },
                      ]}
                    >
                      {link.cta}
                    </Text>
                  </View>
                </View>
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
                  onPress={() => router.push(progress > 0 ? `/course/${course.id}/study` : `/course/${course.id}`)}
                  style={{ width: CARD_WIDTH, marginRight: CARD_SPACING }}
                >
                  <View style={styles.courseCard}>
                    {/* Image on top */}
                    <Image
                      source={course.image}
                      style={styles.courseImage}
                    />
                    {/* Content below */}
                    <View style={styles.courseContent}>
                      <Text
                        style={[
                          styles.courseTitle,
                          { fontFamily: fonts.display },
                        ]}
                        numberOfLines={2}
                      >
                        {t(course.titleKey)}
                      </Text>
                      {/* Progress bar */}
                      <View style={styles.courseProgressRow}>
                        <View style={styles.courseProgressBar}>
                          <View
                            style={[
                              styles.courseProgressFill,
                              {
                                width: `${progress}%`,
                                backgroundColor: colors.primary,
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.courseProgressText,
                            { fontFamily: fonts.bodySemiBold },
                          ]}
                        >
                          {progress}%
                        </Text>
                      </View>
                      <View style={[styles.courseCta, { borderColor: colors.primary }]}>
                        <Play size={14} color="#fff" fill="#fff" />
                        <Text
                          style={[
                            styles.courseCtaText,
                            { fontFamily: fonts.bodySemiBold },
                          ]}
                        >
                          {progress > 0 ? t('dashboard.continueCourse') : t('dashboard.startCourse')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AnimatedPressable>
              );
            })}
          </ScrollView>
        </AnimatedSection>

        {/* CAROUSEL 3 - TRAIL 2 */}
        <AnimatedSection delay={400}>
          <View style={styles.trailHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: fonts.displaySemiBold },
              ]}
            >
              {t('dashboard.trail2Title')}
            </Text>
            <Text
              style={[
                styles.trailSubtitle,
                { color: colors.textSecondary, fontFamily: fonts.body },
              ]}
            >
              {t('dashboard.trail2Subtitle')}
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
            {trail2Courses.map((course) => {
              const progress = getCourseProgress(course.id);
              return (
                <AnimatedPressable
                  key={course.id}
                  onPress={() => router.push(progress > 0 ? `/course/${course.id}/study` : `/course/${course.id}`)}
                  style={{ width: CARD_WIDTH, marginRight: CARD_SPACING }}
                >
                  <View style={styles.courseCard}>
                    <Image
                      source={course.image}
                      style={styles.courseImage}
                    />
                    <View style={styles.courseContent}>
                      <Text
                        style={[
                          styles.courseTitle,
                          { fontFamily: fonts.display },
                        ]}
                        numberOfLines={2}
                      >
                        {t(course.titleKey)}
                      </Text>
                      <View style={styles.courseProgressRow}>
                        <View style={styles.courseProgressBar}>
                          <View
                            style={[
                              styles.courseProgressFill,
                              {
                                width: `${progress}%`,
                                backgroundColor: colors.primary,
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.courseProgressText,
                            { fontFamily: fonts.bodySemiBold },
                          ]}
                        >
                          {progress}%
                        </Text>
                      </View>
                      <View style={[styles.courseCta, { borderColor: colors.primary }]}>
                        <Play size={14} color="#fff" fill="#fff" />
                        <Text
                          style={[
                            styles.courseCtaText,
                            { fontFamily: fonts.bodySemiBold },
                          ]}
                        >
                          {progress > 0 ? t('dashboard.continueCourse') : t('dashboard.startCourse')}
                        </Text>
                      </View>
                    </View>
                  </View>
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
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.35)',
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
    color: '#818cf8',
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
    backgroundColor: 'rgba(30, 27, 75, 0.9)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  quickIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quickIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  quickTitle: {
    fontSize: 22,
    textAlign: 'center',
  },
  quickTitleBold: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 12,
  },
  quickAccentLine: {
    width: 48,
    height: 3,
    borderRadius: 2,
    marginBottom: 14,
    alignSelf: 'center',
  },
  quickCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  quickCtaText: {
    fontSize: 14,
  },

  // Trail header
  trailHeader: {
    marginTop: 40,
    marginBottom: 4,
  },
  trailSubtitle: {
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Course cards — image as background
  courseCard: {
    backgroundColor: 'rgba(30, 27, 75, 0.9)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 130,
  },
  courseContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 20,
    lineHeight: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  courseProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    marginBottom: 14,
  },
  courseProgressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  courseProgressFill: {
    height: 4,
    borderRadius: 2,
  },
  courseProgressText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  courseCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  courseCtaText: {
    color: '#fff',
    fontSize: 14,
  },
});
