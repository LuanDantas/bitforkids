import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useStudy } from '@/contexts/StudyContext';
import { studyData } from '@/data/studyModules';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import {
  ArrowLeft,
  CheckCircle,
  Lock,
  BookOpen,
  Clock,
  ChevronRight,
} from 'lucide-react-native';

export default function StudyDashboardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { hasCourseAccess } = useUser();
  const {
    getCourseProgress,
    getModuleProgress,
    isModuleUnlocked,
    isLessonComplete,
  } = useStudy();

  const courseId = Number(id);
  const course = studyData.find((c) => c.courseId === courseId);

  if (!course) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {t('study.courseNotFound') || 'Curso não encontrado'}
        </Text>
      </View>
    );
  }

  const courseProgress = getCourseProgress(courseId);
  const progressPercent = Math.round(courseProgress);

  const getModuleStatus = (moduleId: string) => {
    const progress = getModuleProgress(courseId, moduleId);
    if (!isModuleUnlocked(courseId, moduleId)) return 'locked';
    if (progress.completed >= progress.total && progress.total > 0) return 'completed';
    if (progress.completed > 0) return 'inProgress';
    return 'available';
  };

  const handleModulePress = (moduleId: string) => {
    router.push(`/course/${id}/lesson/${moduleId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={
          isDark
            ? (['#1a1025', '#0a0a0a'] as const)
            : (['#8B5CF6', '#6D28D9'] as const)
        }
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <AnimatedPressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={22} color="#FFF" />
          </AnimatedPressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {course.title}
            </Text>
            <Text style={styles.headerSubtitle}>
              {t('study.yourJourney') || 'Sua jornada de aprendizado'}
            </Text>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <BookOpen size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.progressLabel}>
              {t('study.overallProgress') || 'Progresso geral'}
            </Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Module Trail */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {course.modules.map((mod, index) => {
          const status = getModuleStatus(mod.id);
          const moduleProgress = getModuleProgress(courseId, mod.id);
          const modulePercent = moduleProgress.total > 0 ? Math.round((moduleProgress.completed / moduleProgress.total) * 100) : 0;
          const completedLessons = mod.lessons.filter((l) =>
            isLessonComplete(courseId, mod.id, l.id)
          ).length;
          const totalLessons = mod.lessons.length;
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';
          const isLast = index === course.modules.length - 1;

          return (
            <AnimatedSection key={mod.id} delay={index * 100}>
              <View style={styles.trailItem}>
                {/* Timeline connector */}
                <View style={styles.timelineColumn}>
                  {/* Top line */}
                  {index > 0 && (
                    <View
                      style={[
                        styles.timelineLine,
                        styles.timelineLineTop,
                        {
                          backgroundColor: isLocked
                            ? colors.border
                            : '#8B5CF6',
                        },
                      ]}
                    />
                  )}

                  {/* Status circle */}
                  <View
                    style={[
                      styles.statusCircle,
                      isCompleted && styles.statusCircleCompleted,
                      status === 'inProgress' && styles.statusCircleInProgress,
                      status === 'available' && styles.statusCircleAvailable,
                      isLocked && styles.statusCircleLocked,
                    ]}
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} color="#FFF" />
                    ) : isLocked ? (
                      <Lock size={16} color="#9CA3AF" />
                    ) : (
                      <Text style={styles.statusNumber}>{index + 1}</Text>
                    )}
                  </View>

                  {/* Bottom line */}
                  {!isLast && (
                    <View
                      style={[
                        styles.timelineLine,
                        styles.timelineLineBottom,
                        {
                          backgroundColor:
                            isCompleted ? '#8B5CF6' : colors.border,
                        },
                      ]}
                    />
                  )}
                </View>

                {/* Module Card */}
                <AnimatedPressable
                  onPress={
                    isLocked
                      ? undefined
                      : () => handleModulePress(mod.id)
                  }
                  style={[
                    styles.moduleCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isCompleted
                        ? '#10B981'
                        : status === 'inProgress'
                        ? '#8B5CF6'
                        : colors.border,
                      opacity: isLocked ? 0.5 : 1,
                    },
                    ...Platform.select({
                      ios: [
                        {
                          shadowColor: isCompleted
                            ? '#10B981'
                            : status === 'inProgress'
                            ? '#8B5CF6'
                            : '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: isLocked ? 0.05 : 0.12,
                          shadowRadius: 12,
                        },
                      ],
                      android: [{ elevation: isLocked ? 1 : 4 }],
                      default: [],
                    }),
                  ]}
                >
                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.moduleEmoji}>{mod.emoji}</Text>
                    <View style={styles.cardHeaderText}>
                      <Text
                        style={[styles.moduleTitle, { color: colors.text }]}
                        numberOfLines={2}
                      >
                        {mod.title}
                      </Text>
                    </View>
                    {!isLocked && (
                      <ChevronRight
                        size={20}
                        color={colors.textSecondary}
                      />
                    )}
                  </View>

                  {/* Description */}
                  {mod.description ? (
                    <Text
                      style={[
                        styles.moduleDescription,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {mod.description}
                    </Text>
                  ) : null}

                  {/* Footer info */}
                  <View style={styles.cardFooter}>
                    <View style={styles.lessonCount}>
                      <BookOpen size={14} color={colors.textSecondary} />
                      <Text
                        style={[
                          styles.lessonCountText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {completedLessons}/{totalLessons}{' '}
                        {t('study.lessons') || 'licoes'}
                      </Text>
                    </View>
                    <View style={styles.durationContainer}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text
                        style={[
                          styles.durationText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {mod.lessons.reduce((sum, l) => sum + l.duration, 0)} min
                      </Text>
                    </View>
                  </View>

                  {/* Module progress bar */}
                  {!isLocked && (
                    <View style={styles.moduleProgressContainer}>
                      <View
                        style={[
                          styles.moduleProgressBg,
                          { backgroundColor: isDark ? '#2a2a2a' : '#E5E7EB' },
                        ]}
                      >
                        <View
                          style={[
                            styles.moduleProgressFill,
                            {
                              width: `${modulePercent}%`,
                              backgroundColor: isCompleted
                                ? '#10B981'
                                : '#8B5CF6',
                            },
                          ]}
                        />
                      </View>
                    </View>
                  )}
                </AnimatedPressable>
              </View>
            </AnimatedSection>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  progressSection: {
    marginTop: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    flex: 1,
  },
  progressPercent: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  trailItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineColumn: {
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  timelineLine: {
    width: 3,
    position: 'absolute',
    left: 18.5,
  },
  timelineLineTop: {
    top: 0,
    height: 20,
  },
  timelineLineBottom: {
    bottom: 0,
    top: 52,
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    zIndex: 1,
  },
  statusCircleCompleted: {
    backgroundColor: '#10B981',
  },
  statusCircleInProgress: {
    backgroundColor: '#8B5CF6',
  },
  statusCircleAvailable: {
    backgroundColor: '#8B5CF6',
    opacity: 0.7,
  },
  statusCircleLocked: {
    backgroundColor: '#374151',
  },
  statusNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleCard: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  moduleDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  lessonCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonCountText: {
    fontSize: 13,
    marginLeft: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 13,
    marginLeft: 4,
  },
  moduleProgressContainer: {
    marginTop: 12,
  },
  moduleProgressBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
