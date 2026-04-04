import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStudy } from '@/contexts/StudyContext';
import { studyData } from '@/data/studyModules';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trophy,
} from 'lucide-react-native';

export default function LessonScreen() {
  const { id, moduleId } = useLocalSearchParams<{
    id: string;
    moduleId: string;
  }>();
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const { markLessonComplete, isLessonComplete } = useStudy();

  const courseId = Number(id);
  const modId = String(moduleId);

  const course = studyData.find((c) => c.courseId === courseId);
  const module_ = course?.modules.find((m) => m.id === modId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!course || !module_) {
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
          {t('study.moduleNotFound') || 'Modulo nao encontrado'}
        </Text>
      </View>
    );
  }

  const lessons = module_.lessons;
  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;
  const currentQuiz = currentLesson.type === 'quiz' && currentLesson.quiz ? currentLesson.quiz[currentQuizIndex] : null;
  const lessonAlreadyComplete = isLessonComplete(
    courseId,
    modId,
    currentLesson.id
  );

  const resetQuizState = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCurrentQuizIndex(0);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(optionIndex);
    setHasAnswered(true);
  };

  const handleNext = () => {
    // Mark current lesson as complete
    markLessonComplete(courseId, modId, currentLesson.id);

    if (isLastLesson) {
      // Conclude module, go back to study dashboard
      router.back();
      return;
    }

    resetQuizState();
    setCurrentLessonIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (isFirstLesson) return;
    resetQuizState();
    setCurrentLessonIndex((prev) => prev - 1);
  };

  const getOptionStyle = (optionIndex: number) => {
    if (!hasAnswered) {
      return {
        backgroundColor: colors.card,
        borderColor: colors.border,
      };
    }

    const isCorrect = optionIndex === currentQuiz?.correctIndex;
    const isSelected = optionIndex === selectedAnswer;

    if (isCorrect) {
      return {
        backgroundColor: isDark
          ? 'rgba(16, 185, 129, 0.15)'
          : 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10B981',
      };
    }

    if (isSelected && !isCorrect) {
      return {
        backgroundColor: isDark
          ? 'rgba(239, 68, 68, 0.15)'
          : 'rgba(239, 68, 68, 0.1)',
        borderColor: '#EF4444',
      };
    }

    return {
      backgroundColor: colors.card,
      borderColor: colors.border,
      opacity: 0.5,
    };
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!hasAnswered) return null;

    const isCorrect = optionIndex === currentQuiz?.correctIndex;
    const isSelected = optionIndex === selectedAnswer;

    if (isCorrect) {
      return <CheckCircle2 size={20} color="#10B981" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle size={20} color="#EF4444" />;
    }
    return null;
  };

  const progressPercent = ((currentLessonIndex + 1) / lessons.length) * 100;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <AnimatedPressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color={colors.text} />
        </AnimatedPressable>
        <View style={styles.headerCenter}>
          <Text
            style={[styles.headerModuleTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}
            numberOfLines={1}
          >
            {module_.title}
          </Text>
          <Text
            style={[styles.headerLessonCount, { color: colors.textSecondary, fontFamily: fonts.body }]}
          >
            {t('study.lessonOf') || 'Licao'} {currentLessonIndex + 1}{' '}
            {t('study.of') || 'de'} {lessons.length}
          </Text>
        </View>
        {lessonAlreadyComplete && (
          <View style={styles.completedBadge}>
            <CheckCircle2 size={18} color="#10B981" />
          </View>
        )}
      </View>

      {/* Progress bar */}
      <View
        style={[
          styles.lessonProgressBg,
          { backgroundColor: isDark ? '#2a2a2a' : '#E5E7EB' },
        ]}
      >
        <View
          style={[styles.lessonProgressFill, { width: `${progressPercent}%` }]}
        />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        key={currentLessonIndex}
      >
        <AnimatedSection delay={0}>
          {/* Lesson Title */}
          <Text style={[styles.lessonTitle, { color: colors.text, fontFamily: fonts.display }]}>
            {currentLesson.title}
          </Text>

          {/* Text Lesson */}
          {currentLesson.type === 'text' && (
            <View style={styles.textContent}>
              {(currentLesson.content || '')
                .split('\n')
                .filter((p: string) => p.trim().length > 0)
                .map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}
                  >
                    {paragraph.trim()}
                  </Text>
                ))}
            </View>
          )}

          {currentLesson.type === 'video' && (
            <View style={styles.videoContent}>
              <View style={[styles.videoContainer, { backgroundColor: '#000' }]}>
                <Video
                  source={{ uri: currentLesson.videoUrl || '' }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={false}
                />
              </View>
              {currentLesson.content ? (
                <View style={styles.textContent}>
                  {(currentLesson.content || '')
                    .split('\n')
                    .filter((p: string) => p.trim().length > 0)
                    .map((paragraph: string, idx: number) => (
                      <Text
                        key={idx}
                        style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}
                      >
                        {paragraph.trim()}
                      </Text>
                    ))}
                </View>
              ) : null}
            </View>
          )}

          {/* Quiz Lesson */}
          {currentLesson.type === 'quiz' && (
            <View style={styles.quizContent}>
              <View
                style={[
                  styles.questionCard,
                  {
                    backgroundColor: isDark
                      ? 'rgba(139, 92, 246, 0.1)'
                      : 'rgba(139, 92, 246, 0.05)',
                    borderColor: 'rgba(139, 92, 246, 0.2)',
                  },
                ]}
              >
                <Text style={[styles.questionText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                  {currentQuiz?.question}
                </Text>
              </View>

              {/* Options */}
              {((currentQuiz?.options || []) || []).map(
                (option: string, idx: number) => {
                  const optionStyle = getOptionStyle(idx);
                  const icon = getOptionIcon(idx);
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.optionButton, optionStyle]}
                      onPress={() => handleSelectAnswer(idx)}
                      activeOpacity={hasAnswered ? 1 : 0.7}
                      disabled={hasAnswered}
                    >
                      <View style={styles.optionLetterContainer}>
                        <Text
                          style={[
                            styles.optionLetter,
                            {
                              fontFamily: fonts.bodyBold,
                              color:
                                hasAnswered &&
                                idx === currentQuiz?.correctIndex
                                  ? '#10B981'
                                  : hasAnswered &&
                                    idx === selectedAnswer &&
                                    idx !== currentQuiz?.correctIndex
                                  ? '#EF4444'
                                  : colors.textSecondary,
                            },
                          ]}
                        >
                          {optionLetters[idx]}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          { color: colors.text, flex: 1, fontFamily: fonts.body },
                        ]}
                      >
                        {option}
                      </Text>
                      {icon && <View style={styles.optionIcon}>{icon}</View>}
                    </TouchableOpacity>
                  );
                }
              )}

              {/* Feedback after answer */}
              {hasAnswered && (
                <AnimatedSection delay={200}>
                  <View
                    style={[
                      styles.feedbackCard,
                      {
                        backgroundColor:
                          selectedAnswer === currentQuiz?.correctIndex
                            ? isDark
                              ? 'rgba(16, 185, 129, 0.12)'
                              : 'rgba(16, 185, 129, 0.08)'
                            : isDark
                            ? 'rgba(239, 68, 68, 0.12)'
                            : 'rgba(239, 68, 68, 0.08)',
                        borderColor:
                          selectedAnswer === currentQuiz?.correctIndex
                            ? '#10B981'
                            : '#EF4444',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.feedbackTitle,
                        {
                          fontFamily: fonts.bodyBold,
                          color:
                            selectedAnswer === currentQuiz?.correctIndex
                              ? '#10B981'
                              : '#EF4444',
                        },
                      ]}
                    >
                      {selectedAnswer === currentQuiz?.correctIndex
                        ? t('study.correct') || 'Correto!'
                        : t('study.incorrect') || 'Incorreto'}
                    </Text>
                    {selectedAnswer === currentQuiz?.correctIndex ? (
                      <Text
                        style={[
                          styles.feedbackExplanation,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {t('study.correctFeedback') || 'Excelente! Você acertou.'}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.feedbackExplanation,
                          { color: colors.textSecondary, fontFamily: fonts.body },
                        ]}
                      >
                        {t('study.incorrectFeedback') || 'A resposta correta está destacada em verde.'}
                      </Text>
                    )}
                  </View>
                </AnimatedSection>
              )}
            </View>
          )}
        </AnimatedSection>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer Navigation */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              },
              android: { elevation: 8 },
            }),
          },
        ]}
      >
        {/* Previous Button */}
        <AnimatedPressable
          onPress={isFirstLesson ? undefined : handlePrevious}
          style={[
            styles.navButton,
            styles.prevButton,
            {
              backgroundColor: isDark ? '#1a1a1a' : '#F3F4F6',
              opacity: isFirstLesson ? 0.4 : 1,
            },
          ]}
        >
          <ChevronLeft size={18} color={colors.textSecondary} />
          <Text
            style={[styles.navButtonText, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}
          >
            {t('study.previous') || 'Anterior'}
          </Text>
        </AnimatedPressable>

        {/* Next / Conclude Button */}
        {isLastLesson ? (
          <AnimatedPressable
            onPress={
              currentLesson.type === 'quiz' && !hasAnswered
                ? undefined
                : handleNext
            }
            style={[
              styles.navButton,
              styles.concludeButton,
              {
                opacity:
                  currentLesson.type === 'quiz' && !hasAnswered ? 0.5 : 1,
              },
            ]}
          >
            <Trophy size={18} color="#FFF" />
            <Text style={[styles.navButtonText, { color: '#FFF', fontFamily: fonts.bodySemiBold }]}>
              {t('study.concludeModule') || 'Concluir Modulo'}
            </Text>
          </AnimatedPressable>
        ) : (
          <AnimatedPressable
            onPress={
              currentLesson.type === 'quiz' && !hasAnswered
                ? undefined
                : handleNext
            }
            style={[
              styles.navButton,
              styles.nextButton,
              {
                opacity:
                  currentLesson.type === 'quiz' && !hasAnswered ? 0.5 : 1,
              },
            ]}
          >
            <Text style={[styles.navButtonText, { color: '#FFF', fontFamily: fonts.bodySemiBold }]}>
              {t('study.nextLesson') || 'Proxima Licao'}
            </Text>
            <ChevronRight size={18} color="#FFF" />
          </AnimatedPressable>
        )}
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
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 8,
  },
  headerModuleTitle: {
    fontSize: 16,
  },
  headerLessonCount: {
    fontSize: 13,
    marginTop: 2,
  },
  completedBadge: {
    marginLeft: 8,
  },
  lessonProgressBg: {
    height: 4,
  },
  lessonProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  contentContainer: {
    padding: 20,
  },
  lessonTitle: {
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 20,
  },
  textContent: {
    gap: 0,
  },
  videoContent: {
    gap: 16,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
  },
  quizContent: {
    gap: 0,
  },
  questionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 17,
    lineHeight: 26,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  optionLetterContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetter: {
    fontSize: 15,
  },
  optionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  optionIcon: {
    marginLeft: 8,
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 12,
  },
  feedbackTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  feedbackExplanation: {
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 34,
    borderTopWidth: 1,
    gap: 12,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 6,
  },
  prevButton: {},
  nextButton: {
    backgroundColor: '#6366f1',
    flex: 1,
    justifyContent: 'center',
  },
  concludeButton: {
    backgroundColor: '#10B981',
    flex: 1,
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 15,
  },
});
