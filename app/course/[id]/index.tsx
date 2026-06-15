import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import GradientText from '@/components/GradientText';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  ArrowLeft,
  ChevronDown,
  Shield,
  BookOpen,
  MessageCircle,
  Lock,
  CheckCircle,
} from 'lucide-react-native';

interface FAQ {
  q: string;
  a: string;
}

interface CourseData {
  title: string;
  subtitle: string;
  price: string;
  image: any;
  trailColor: readonly [string, string];
  trailLabel: string;
  sections: { title: string; items: string[] }[];
  extraContent: string[];
  faq: FAQ[];
}

function getCourseData(t: (key: string) => string): Record<string, CourseData> {
  return {
    '1': {
      title: t('courseDetail.course1.title'),
      subtitle: t('courseDetail.course1.subtitle'),
      price: '397',
      image: require('../../../assets/images/curso-bitcoin.png'),
      trailColor: ['#6366f1', '#3b82f6'] as const,
      trailLabel: t('courseDetail.course1.trailLabel'),
      sections: [
        {
          title: t('courseDetail.course1.section1Title'),
          items: [
            t('courseDetail.course1.section1Item1'),
            t('courseDetail.course1.section1Item2'),
            t('courseDetail.course1.section1Item3'),
            t('courseDetail.course1.section1Item4'),
            t('courseDetail.course1.section1Item5'),
            t('courseDetail.course1.section1Item6'),
            t('courseDetail.course1.section1Item7'),
            t('courseDetail.course1.section1Item8'),
            t('courseDetail.course1.section1Item9'),
            t('courseDetail.course1.section1Item10'),
          ],
        },
        {
          title: t('courseDetail.course1.section2Title'),
          items: [
            t('courseDetail.course1.section2Item1'),
            t('courseDetail.course1.section2Item2'),
            t('courseDetail.course1.section2Item3'),
            t('courseDetail.course1.section2Item4'),
            t('courseDetail.course1.section2Item5'),
            t('courseDetail.course1.section2Item6'),
          ],
        },
        {
          title: t('courseDetail.course1.section3Title'),
          items: [
            t('courseDetail.course1.section3Item1'),
            t('courseDetail.course1.section3Item2'),
            t('courseDetail.course1.section3Item3'),
            t('courseDetail.course1.section3Item4'),
            t('courseDetail.course1.section3Item5'),
            t('courseDetail.course1.section3Item6'),
            t('courseDetail.course1.section3Item7'),
            t('courseDetail.course1.section3Item8'),
            t('courseDetail.course1.section3Item9'),
            t('courseDetail.course1.section3Item10'),
            t('courseDetail.course1.section3Item11'),
          ],
        },
        {
          title: t('courseDetail.course1.section4Title'),
          items: [
            t('courseDetail.course1.section4Item1'),
            t('courseDetail.course1.section4Item2'),
            t('courseDetail.course1.section4Item3'),
            t('courseDetail.course1.section4Item4'),
            t('courseDetail.course1.section4Item5'),
            t('courseDetail.course1.section4Item6'),
            t('courseDetail.course1.section4Item7'),
            t('courseDetail.course1.section4Item8'),
            t('courseDetail.course1.section4Item9'),
          ],
        },
        {
          title: t('courseDetail.course1.section5Title'),
          items: [
            t('courseDetail.course1.section5Item1'),
            t('courseDetail.course1.section5Item2'),
            t('courseDetail.course1.section5Item3'),
            t('courseDetail.course1.section5Item4'),
          ],
        },
        {
          title: t('courseDetail.course1.section6Title'),
          items: [
            t('courseDetail.course1.section6Item1'),
            t('courseDetail.course1.section6Item2'),
            t('courseDetail.course1.section6Item3'),
            t('courseDetail.course1.section6Item4'),
            t('courseDetail.course1.section6Item5'),
          ],
        },
      ],
      extraContent: [
        t('courseDetail.course1.extra1'),
        t('courseDetail.course1.extra2'),
      ],
      faq: [
        { q: t('courseDetail.course1.faq1q'), a: t('courseDetail.course1.faq1a') },
        { q: t('courseDetail.course1.faq2q'), a: t('courseDetail.course1.faq2a') },
        { q: t('courseDetail.course1.faq3q'), a: t('courseDetail.course1.faq3a') },
        { q: t('courseDetail.course1.faq4q'), a: t('courseDetail.course1.faq4a') },
        { q: t('courseDetail.course1.faq5q'), a: t('courseDetail.course1.faq5a') },
        { q: t('courseDetail.course1.faq6q'), a: t('courseDetail.course1.faq6a') },
        { q: t('courseDetail.course1.faq7q'), a: t('courseDetail.course1.faq7a') },
        { q: t('courseDetail.course1.faq8q'), a: t('courseDetail.course1.faq8a') },
        { q: t('courseDetail.course1.faq9q'), a: t('courseDetail.course1.faq9a') },
        { q: t('courseDetail.course1.faq10q'), a: t('courseDetail.course1.faq10a') },
        { q: t('courseDetail.course1.faq11q'), a: t('courseDetail.course1.faq11a') },
      ],
    },
    '2': {
      title: t('courseDetail.course2.title'),
      subtitle: t('courseDetail.course2.subtitle'),
      price: '397',
      image: require('../../../assets/images/curso-ethereum.png'),
      trailColor: ['#3b82f6', '#06b6d4'] as const,
      trailLabel: t('courseDetail.course2.trailLabel'),
      sections: [
        {
          title: t('courseDetail.course2.section1Title'),
          items: [
            t('courseDetail.course2.section1Item1'),
            t('courseDetail.course2.section1Item2'),
            t('courseDetail.course2.section1Item3'),
          ],
        },
        {
          title: t('courseDetail.course2.section2Title'),
          items: [
            t('courseDetail.course2.section2Item1'),
            t('courseDetail.course2.section2Item2'),
            t('courseDetail.course2.section2Item3'),
            t('courseDetail.course2.section2Item4'),
            t('courseDetail.course2.section2Item5'),
            t('courseDetail.course2.section2Item6'),
            t('courseDetail.course2.section2Item7'),
            t('courseDetail.course2.section2Item8'),
          ],
        },
        {
          title: t('courseDetail.course2.section3Title'),
          items: [
            t('courseDetail.course2.section3Item1'),
            t('courseDetail.course2.section3Item2'),
            t('courseDetail.course2.section3Item3'),
            t('courseDetail.course2.section3Item4'),
            t('courseDetail.course2.section3Item5'),
          ],
        },
        {
          title: t('courseDetail.course2.section4Title'),
          items: [
            t('courseDetail.course2.section4Item1'),
            t('courseDetail.course2.section4Item2'),
            t('courseDetail.course2.section4Item3'),
            t('courseDetail.course2.section4Item4'),
            t('courseDetail.course2.section4Item5'),
            t('courseDetail.course2.section4Item6'),
          ],
        },
        {
          title: t('courseDetail.course2.section5Title'),
          items: [
            t('courseDetail.course2.section5Item1'),
            t('courseDetail.course2.section5Item2'),
            t('courseDetail.course2.section5Item3'),
            t('courseDetail.course2.section5Item4'),
            t('courseDetail.course2.section5Item5'),
            t('courseDetail.course2.section5Item6'),
          ],
        },
        {
          title: t('courseDetail.course2.section6Title'),
          items: [
            t('courseDetail.course2.section6Item1'),
            t('courseDetail.course2.section6Item2'),
            t('courseDetail.course2.section6Item3'),
            t('courseDetail.course2.section6Item4'),
            t('courseDetail.course2.section6Item5'),
            t('courseDetail.course2.section6Item6'),
            t('courseDetail.course2.section6Item7'),
          ],
        },
        {
          title: t('courseDetail.course2.section7Title'),
          items: [
            t('courseDetail.course2.section7Item1'),
            t('courseDetail.course2.section7Item2'),
            t('courseDetail.course2.section7Item3'),
            t('courseDetail.course2.section7Item4'),
            t('courseDetail.course2.section7Item5'),
            t('courseDetail.course2.section7Item6'),
            t('courseDetail.course2.section7Item7'),
          ],
        },
      ],
      extraContent: [
        t('courseDetail.course2.extra1'),
      ],
      faq: [
        { q: t('courseDetail.course2.faq1q'), a: t('courseDetail.course2.faq1a') },
        { q: t('courseDetail.course2.faq2q'), a: t('courseDetail.course2.faq2a') },
        { q: t('courseDetail.course2.faq3q'), a: t('courseDetail.course2.faq3a') },
        { q: t('courseDetail.course2.faq4q'), a: t('courseDetail.course2.faq4a') },
        { q: t('courseDetail.course2.faq5q'), a: t('courseDetail.course2.faq5a') },
        { q: t('courseDetail.course2.faq6q'), a: t('courseDetail.course2.faq6a') },
        { q: t('courseDetail.course2.faq7q'), a: t('courseDetail.course2.faq7a') },
        { q: t('courseDetail.course2.faq8q'), a: t('courseDetail.course2.faq8a') },
        { q: t('courseDetail.course2.faq9q'), a: t('courseDetail.course2.faq9a') },
        { q: t('courseDetail.course2.faq10q'), a: t('courseDetail.course2.faq10a') },
        { q: t('courseDetail.course2.faq11q'), a: t('courseDetail.course2.faq11a') },
        { q: t('courseDetail.course2.faq12q'), a: t('courseDetail.course2.faq12a') },
      ],
    },
    '3': {
      title: t('courseDetail.course3.title'),
      subtitle: t('courseDetail.course3.subtitle'),
      price: '397',
      image: require('../../../assets/images/curso-autocustodia.png'),
      trailColor: ['#6366f1', '#3b82f6'] as const,
      trailLabel: t('courseDetail.course3.trailLabel'),
      sections: [
        {
          title: t('courseDetail.course3.section1Title'),
          items: [
            t('courseDetail.course3.section1Item1'),
            t('courseDetail.course3.section1Item2'),
            t('courseDetail.course3.section1Item3'),
            t('courseDetail.course3.section1Item4'),
            t('courseDetail.course3.section1Item5'),
            t('courseDetail.course3.section1Item6'),
          ],
        },
        {
          title: t('courseDetail.course3.section2Title'),
          items: [
            t('courseDetail.course3.section2Item1'),
            t('courseDetail.course3.section2Item2'),
            t('courseDetail.course3.section2Item3'),
            t('courseDetail.course3.section2Item4'),
          ],
        },
        {
          title: t('courseDetail.course3.section3Title'),
          items: [
            t('courseDetail.course3.section3Item1'),
            t('courseDetail.course3.section3Item2'),
            t('courseDetail.course3.section3Item3'),
          ],
        },
        {
          title: t('courseDetail.course3.section4Title'),
          items: [
            t('courseDetail.course3.section4Item1'),
            t('courseDetail.course3.section4Item2'),
            t('courseDetail.course3.section4Item3'),
          ],
        },
        {
          title: t('courseDetail.course3.section5Title'),
          items: [
            t('courseDetail.course3.section5Item1'),
            t('courseDetail.course3.section5Item2'),
            t('courseDetail.course3.section5Item3'),
            t('courseDetail.course3.section5Item4'),
            t('courseDetail.course3.section5Item5'),
            t('courseDetail.course3.section5Item6'),
            t('courseDetail.course3.section5Item7'),
          ],
        },
        {
          title: t('courseDetail.course3.section6Title'),
          items: [
            t('courseDetail.course3.section6Item1'),
            t('courseDetail.course3.section6Item2'),
            t('courseDetail.course3.section6Item3'),
            t('courseDetail.course3.section6Item4'),
            t('courseDetail.course3.section6Item5'),
            t('courseDetail.course3.section6Item6'),
          ],
        },
        {
          title: t('courseDetail.course3.section7Title'),
          items: [
            t('courseDetail.course3.section7Item1'),
            t('courseDetail.course3.section7Item2'),
            t('courseDetail.course3.section7Item3'),
            t('courseDetail.course3.section7Item4'),
            t('courseDetail.course3.section7Item5'),
          ],
        },
      ],
      extraContent: [
        t('courseDetail.course3.extra1'),
      ],
      faq: [],
    },
  };
}

function FAQItem({ item, colors, fonts }: { item: FAQ; colors: any; fonts: any }) {
  const [open, setOpen] = useState(false);
  const rotation = useSharedValue(0);
  const answerOpacity = useSharedValue(0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const answerStyle = useAnimatedStyle(() => ({
    opacity: answerOpacity.value,
  }));

  const toggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    rotation.value = withTiming(willOpen ? 180 : 0, { duration: 250 });
    answerOpacity.value = withTiming(willOpen ? 1 : 0, { duration: 250 });
  };

  return (
    <AnimatedPressable
      style={faqStyles.itemWrapper}
      onPress={toggle}
    >
      <View style={[faqStyles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={faqStyles.questionRow}>
          <Text style={[faqStyles.question, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.q}</Text>
          <Animated.View style={chevronStyle}>
            <ChevronDown size={18} color="#6366f1" />
          </Animated.View>
        </View>
        {open && (
          <Animated.View style={answerStyle}>
            <Text style={[faqStyles.answer, { color: colors.textSecondary, fontFamily: fonts.body }]}>{item.a}</Text>
          </Animated.View>
        )}
      </View>
    </AnimatedPressable>
  );
}

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { t } = useLanguage();
  const { hasCourseAccess, purchaseCourse } = useUser();

  const courseId = parseInt(id || '1', 10);
  const hasAccess = hasCourseAccess(courseId);

  const courseDataMap = getCourseData(t);
  const course = courseDataMap[id || '1'];
  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>{t('courseDetail.courseNotFound')}</Text>
      </View>
    );
  }

  const handleBuy = () => {
    Alert.alert(
      t('courseDetail.buyAlertTitle'),
      t('courseDetail.buyAlertMessage').replace('{{title}}', course.title).replace('{{price}}', course.price),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('courseDetail.buyButton'),
          onPress: () => {
            purchaseCourse(courseId);
            Alert.alert('✅', t('courseDetail.purchaseSuccess') || 'Curso adquirido com sucesso!');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={course.image} style={styles.bannerImage} resizeMode="cover" />
          <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent'] as const} style={styles.bannerTopGradient} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Course info */}
        <View style={styles.contentPadding}>
          {/* Header — badge + title + subtitle */}
          <View style={[styles.headerCard, { borderColor: course.trailColor[0] + '40' }]}>
            <LinearGradient
              colors={[course.trailColor[0] + '15', 'transparent'] as const}
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient colors={course.trailColor} style={styles.trailBadge}>
              <Text style={[styles.trailBadgeText, { fontFamily: fonts.secondaryMedium }]}>{course.trailLabel}</Text>
            </LinearGradient>
            <GradientText style={[styles.courseTitle, { fontFamily: fonts.display }]}>{course.title}</GradientText>
            <View style={[styles.accentLine, { backgroundColor: course.trailColor[0] }]} />
            <Text style={[styles.courseSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{course.subtitle}</Text>
          </View>

          {/* Description — quote style with left accent bar */}
          {course.extraContent.length > 0 && (
            <View style={[styles.descriptionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.descriptionAccent, { backgroundColor: course.trailColor[0] }]} />
              <View style={styles.descriptionContent}>
                <BookOpen size={20} color={course.trailColor[0]} style={{ marginBottom: 10 }} />
                {course.extraContent.map((text, i) => (
                  <Text key={i} style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body, marginBottom: i < course.extraContent.length - 1 ? 12 : 0 }]}>{text}</Text>
                ))}
              </View>
            </View>
          )}

          {hasAccess ? (
            <>
              {/* Content sections — each with unique visual */}
              {course.sections.map((section, sIdx) => {
                const sectionColors = [
                  '#6366f1', '#3b82f6', '#06b6d4', '#818cf8', '#60a5fa', '#6366f1',
                ];
                const accent = sectionColors[sIdx % sectionColors.length];
                return (
                  <AnimatedSection key={sIdx}>
                    <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                      {/* Section header with number badge */}
                      <View style={styles.sectionHeader}>
                        <View style={[styles.sectionNumberBadge, { backgroundColor: accent + '20' }]}>
                          <Text style={[styles.sectionNumber, { color: accent, fontFamily: fonts.bodyBold }]}>{sIdx + 1}</Text>
                        </View>
                        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{section.title}</Text>
                      </View>
                      <View style={[styles.sectionDivider, { backgroundColor: accent + '30' }]} />
                      {/* Items with accent bullet */}
                      {section.items.map((item, iIdx) => (
                        <View key={iIdx} style={styles.sectionItem}>
                          <View style={[styles.itemBullet, { backgroundColor: accent }]} />
                          <Text style={[styles.sectionItemText, { color: colors.textSecondary, fontFamily: fonts.body }]}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </AnimatedSection>
                );
              })}

              {/* FAQ */}
              {course.faq.length > 0 && (
                <View style={styles.faqSection}>
                  <View style={styles.faqHeader}>
                    <View style={[styles.faqIconCircle, { backgroundColor: '#6366f120' }]}>
                      <MessageCircle size={20} color="#6366f1" />
                    </View>
                    <Text style={[styles.sectionTitleOutside, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('courseDetail.faqTitle')}</Text>
                  </View>
                  {course.faq.map((item, idx) => (
                    <FAQItem key={idx} item={item} colors={colors} fonts={fonts} />
                  ))}
                </View>
              )}
            </>
          ) : (
            <>
              {/* Paywall */}
              <View style={[styles.paywallCard, { borderColor: '#6366f140' }]}>
                <LinearGradient
                  colors={['rgba(99,102,241,0.08)', 'transparent'] as const}
                  style={StyleSheet.absoluteFill}
                />
                <View style={[styles.paywallIconCircle, { backgroundColor: '#6366f115' }]}>
                  <Lock size={28} color="#6366f1" />
                </View>
                <Text style={[styles.paywallTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                  {t('courseDetail.paywallTitle') || 'Conteúdo exclusivo para alunos'}
                </Text>
                <Text style={[styles.paywallDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                  {t('courseDetail.paywallDesc') || 'Adquira este curso para ter acesso completo a todas as aulas, materiais e conteúdo exclusivo.'}
                </Text>
              </View>
            </>
          )}

          {/* Guarantee */}
          <View style={styles.guaranteeCard}>
            <LinearGradient
              colors={['rgba(99,102,241,0.1)', 'transparent'] as const}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.guaranteeIconCircle, { backgroundColor: '#6366f120' }]}>
              <Shield size={24} color="#6366f1" />
            </View>
            <Text style={[styles.guaranteeTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('courseDetail.guaranteeTitle')}</Text>
            <View style={[styles.accentLine, { backgroundColor: '#6366f1', marginBottom: 10 }]} />
            <Text style={[styles.guaranteeDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {t('courseDetail.guaranteeDesc')}
            </Text>
            <View style={styles.guaranteeBadge}>
              <CheckCircle size={14} color="#6366f1" />
              <Text style={[styles.guaranteeBadgeText, { fontFamily: fonts.bodySemiBold }]}>100% seguro</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.card }]}>
        {hasAccess ? (
          <>
            <Text style={[styles.footerLabel, { color: colors.accentLight, fontSize: 14, fontFamily: fonts.bodySemiBold }]}>✅ {t('courseDetail.courseOwned')}</Text>
            <AnimatedPressable onPress={() => router.push(`/course/${id}/study`)}>
              <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buyBtn}>
                <Text style={[styles.buyBtnText, { fontFamily: fonts.bodyBold }]}>{t('courseDetail.accessCourse')}</Text>
              </LinearGradient>
            </AnimatedPressable>
          </>
        ) : (
          <>
            <View>
              <Text style={[styles.footerLabel, { fontFamily: fonts.secondaryMedium }]}>{t('courseDetail.investmentLabel')}</Text>
              <Text style={[styles.footerPrice, { fontFamily: fonts.bodyBold }]}>R$ {course.price},00</Text>
            </View>
            <AnimatedPressable onPress={handleBuy}>
              <LinearGradient colors={['#4f46e5', '#3b82f6'] as const} style={styles.buyBtn}>
                <Text style={[styles.buyBtnText, { fontFamily: fonts.bodyBold }]}>{t('courseDetail.buyButton')}</Text>
              </LinearGradient>
            </AnimatedPressable>
          </>
        )}
      </View>
    </View>
  );
}

const faqStyles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 8,
  },
  item: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bannerContainer: {
    position: 'relative',
    height: 260,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTopGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPadding: {
    padding: 16,
  },

  // Header card
  headerCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    marginBottom: 14,
    overflow: 'hidden',
  },
  trailBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  trailBadgeText: {
    color: '#FFF',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontSize: 26,
    marginBottom: 12,
    lineHeight: 34,
  },
  accentLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: 12,
  },
  courseSubtitle: {
    fontSize: 15,
    lineHeight: 24,
  },

  // Description card — quote style
  descriptionCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  descriptionAccent: {
    width: 4,
  },
  descriptionContent: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
  },

  // Content section cards
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumber: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 17,
    flex: 1,
  },
  sectionDivider: {
    height: 1,
    marginBottom: 14,
  },
  sectionTitleOutside: {
    fontSize: 20,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  itemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  sectionItemText: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },

  // FAQ section
  faqSection: {
    marginBottom: 14,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  faqIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Paywall card
  paywallCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    marginBottom: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  paywallIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  paywallTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  paywallDesc: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Guarantee card
  guaranteeCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
    padding: 24,
    marginBottom: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  guaranteeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  guaranteeTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  guaranteeDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  guaranteeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    backgroundColor: 'rgba(99,102,241,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  guaranteeBadgeText: {
    color: '#6366f1',
    fontSize: 13,
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
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 8 },
    }),
  },
  footerLabel: {
    fontSize: 12,
    color: '#8B8B8B',
  },
  footerPrice: {
    fontSize: 22,
    color: '#818cf8',
  },
  buyBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buyBtnText: {
    color: '#FFF',
    fontSize: 16,
  },
});
