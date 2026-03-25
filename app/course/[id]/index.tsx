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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Shield,
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
  sections: { title: string; emoji: string; items: string[] }[];
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
      trailColor: ['#F7931A', '#E2761B'] as const,
      trailLabel: t('courseDetail.course1.trailLabel'),
      sections: [
        {
          title: '🟠 ' + t('courseDetail.course1.section1Title'),
          emoji: '',
          items: [
            '🛡️ ' + t('courseDetail.course1.section1Item1'),
            '📈 ' + t('courseDetail.course1.section1Item2'),
            '💰 ' + t('courseDetail.course1.section1Item3'),
            '🌍 ' + t('courseDetail.course1.section1Item4'),
            '🚫 ' + t('courseDetail.course1.section1Item5'),
            '👨‍👩‍👧 ' + t('courseDetail.course1.section1Item6'),
            '🧓 ' + t('courseDetail.course1.section1Item7'),
            '📊 ' + t('courseDetail.course1.section1Item8'),
            '🧠 ' + t('courseDetail.course1.section1Item9'),
            '📅 ' + t('courseDetail.course1.section1Item10'),
          ],
        },
        {
          title: '🔐 ' + t('courseDetail.course1.section2Title'),
          emoji: '',
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
          title: '📚 ' + t('courseDetail.course1.section3Title'),
          emoji: '',
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
          title: '🏦 ' + t('courseDetail.course1.section4Title'),
          emoji: '',
          items: [
            t('courseDetail.course1.section4Item1'),
            t('courseDetail.course1.section4Item2'),
            t('courseDetail.course1.section4Item3'),
            t('courseDetail.course1.section4Item4'),
            t('courseDetail.course1.section4Item5'),
            t('courseDetail.course1.section4Item6'),
            '🌍 ' + t('courseDetail.course1.section4Item7'),
            '🔐 ' + t('courseDetail.course1.section4Item8'),
            '⚡ ' + t('courseDetail.course1.section4Item9'),
          ],
        },
        {
          title: '👣 ' + t('courseDetail.course1.section5Title'),
          emoji: '',
          items: [
            '✔ ' + t('courseDetail.course1.section5Item1'),
            '✔ ' + t('courseDetail.course1.section5Item2'),
            '✔ ' + t('courseDetail.course1.section5Item3'),
            '✔ ' + t('courseDetail.course1.section5Item4'),
          ],
        },
        {
          title: '👨‍👩‍👧 ' + t('courseDetail.course1.section6Title'),
          emoji: '',
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
      trailColor: ['#627EEA', '#3B5998'] as const,
      trailLabel: t('courseDetail.course2.trailLabel'),
      sections: [
        {
          title: '🌐 ' + t('courseDetail.course2.section1Title'),
          emoji: '',
          items: [
            t('courseDetail.course2.section1Item1'),
            t('courseDetail.course2.section1Item2'),
            t('courseDetail.course2.section1Item3'),
          ],
        },
        {
          title: '💵 ' + t('courseDetail.course2.section2Title'),
          emoji: '',
          items: [
            '🔵 ' + t('courseDetail.course2.section2Item1'),
            '🔗 ' + t('courseDetail.course2.section2Item2'),
            '💵 ' + t('courseDetail.course2.section2Item3'),
            '🏦 ' + t('courseDetail.course2.section2Item4'),
            '🌐 ' + t('courseDetail.course2.section2Item5'),
            '📱 ' + t('courseDetail.course2.section2Item6'),
            '🔐 ' + t('courseDetail.course2.section2Item7'),
            t('courseDetail.course2.section2Item8'),
          ],
        },
        {
          title: '💳 ' + t('courseDetail.course2.section3Title'),
          emoji: '',
          items: [
            '💸 ' + t('courseDetail.course2.section3Item1'),
            '🌎 ' + t('courseDetail.course2.section3Item2'),
            '💳 ' + t('courseDetail.course2.section3Item3'),
            '📲 ' + t('courseDetail.course2.section3Item4'),
            '⚡ ' + t('courseDetail.course2.section3Item5'),
          ],
        },
        {
          title: '💵 ' + t('courseDetail.course2.section4Title'),
          emoji: '',
          items: [
            t('courseDetail.course2.section4Item1'),
            '🌎 ' + t('courseDetail.course2.section4Item2'),
            '⚡ ' + t('courseDetail.course2.section4Item3'),
            '📱 ' + t('courseDetail.course2.section4Item4'),
            '💳 ' + t('courseDetail.course2.section4Item5'),
            t('courseDetail.course2.section4Item6'),
          ],
        },
        {
          title: '🔐 ' + t('courseDetail.course2.section5Title'),
          emoji: '',
          items: [
            t('courseDetail.course2.section5Item1'),
            t('courseDetail.course2.section5Item2'),
            t('courseDetail.course2.section5Item3'),
            '🚫 ' + t('courseDetail.course2.section5Item4'),
            '🚫 ' + t('courseDetail.course2.section5Item5'),
            '🚫 ' + t('courseDetail.course2.section5Item6'),
          ],
        },
        {
          title: '🎯 ' + t('courseDetail.course2.section6Title'),
          emoji: '',
          items: [
            '✔ ' + t('courseDetail.course2.section6Item1'),
            '✔ ' + t('courseDetail.course2.section6Item2'),
            '✔ ' + t('courseDetail.course2.section6Item3'),
            '✔ ' + t('courseDetail.course2.section6Item4'),
            '✔ ' + t('courseDetail.course2.section6Item5'),
            '✔ ' + t('courseDetail.course2.section6Item6'),
            '✔ ' + t('courseDetail.course2.section6Item7'),
          ],
        },
        {
          title: '👣 ' + t('courseDetail.course2.section7Title'),
          emoji: '',
          items: [
            '💵 ' + t('courseDetail.course2.section7Item1'),
            '🌎 ' + t('courseDetail.course2.section7Item2'),
            '📱 ' + t('courseDetail.course2.section7Item3'),
            '🔄 ' + t('courseDetail.course2.section7Item4'),
            '🏦 ' + t('courseDetail.course2.section7Item5'),
            '🔐 ' + t('courseDetail.course2.section7Item6'),
            '🚫 ' + t('courseDetail.course2.section7Item7'),
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
      trailColor: ['#3B82F6', '#1D4ED8'] as const,
      trailLabel: t('courseDetail.course3.trailLabel'),
      sections: [
        {
          title: '🟠 ' + t('courseDetail.course3.section1Title'),
          emoji: '',
          items: [
            t('courseDetail.course3.section1Item1'),
            t('courseDetail.course3.section1Item2'),
            '🚫 ' + t('courseDetail.course3.section1Item3'),
            '🚫 ' + t('courseDetail.course3.section1Item4'),
            '🚫 ' + t('courseDetail.course3.section1Item5'),
            t('courseDetail.course3.section1Item6'),
          ],
        },
        {
          title: '🔑 ' + t('courseDetail.course3.section2Title'),
          emoji: '',
          items: [
            '🔐 ' + t('courseDetail.course3.section2Item1'),
            '💻 ' + t('courseDetail.course3.section2Item2'),
            '📱 ' + t('courseDetail.course3.section2Item3'),
            '🛡️ ' + t('courseDetail.course3.section2Item4'),
          ],
        },
        {
          title: '📲 ' + t('courseDetail.course3.section3Title'),
          emoji: '',
          items: [
            '📱 ' + t('courseDetail.course3.section3Item1'),
            '🔐 ' + t('courseDetail.course3.section3Item2'),
            t('courseDetail.course3.section3Item3'),
          ],
        },
        {
          title: '🛡️ ' + t('courseDetail.course3.section4Title'),
          emoji: '',
          items: [
            '⚠️ ' + t('courseDetail.course3.section4Item1'),
            '⚠️ ' + t('courseDetail.course3.section4Item2'),
            '⚠️ ' + t('courseDetail.course3.section4Item3'),
          ],
        },
        {
          title: '📱 ' + t('courseDetail.course3.section5Title'),
          emoji: '',
          items: [
            '💸 ' + t('courseDetail.course3.section5Item1'),
            '📄 ' + t('courseDetail.course3.section5Item2'),
            '💳 ' + t('courseDetail.course3.section5Item3'),
            '🌎 ' + t('courseDetail.course3.section5Item4'),
            '📲 ' + t('courseDetail.course3.section5Item5'),
            '⚡ ' + t('courseDetail.course3.section5Item6'),
            t('courseDetail.course3.section5Item7'),
          ],
        },
        {
          title: '🎯 ' + t('courseDetail.course3.section6Title'),
          emoji: '',
          items: [
            '✔️ ' + t('courseDetail.course3.section6Item1'),
            '✔️ ' + t('courseDetail.course3.section6Item2'),
            '✔️ ' + t('courseDetail.course3.section6Item3'),
            '✔️ ' + t('courseDetail.course3.section6Item4'),
            '✔️ ' + t('courseDetail.course3.section6Item5'),
            '✔️ ' + t('courseDetail.course3.section6Item6'),
          ],
        },
        {
          title: '🏦 ' + t('courseDetail.course3.section7Title'),
          emoji: '',
          items: [
            '🔐 ' + t('courseDetail.course3.section7Item1'),
            '🌍 ' + t('courseDetail.course3.section7Item2'),
            '⚡ ' + t('courseDetail.course3.section7Item3'),
            '📱 ' + t('courseDetail.course3.section7Item4'),
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

function FAQItem({ item, colors }: { item: FAQ; colors: any }) {
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
      style={[faqStyles.item, { backgroundColor: colors.card }]}
      onPress={toggle}
    >
      <View style={faqStyles.questionRow}>
        <Text style={[faqStyles.question, { color: colors.text }]}>{item.q}</Text>
        <Animated.View style={chevronStyle}>
          <ChevronDown size={18} color="#8B5CF6" />
        </Animated.View>
      </View>
      {open && (
        <Animated.View style={answerStyle}>
          <Text style={[faqStyles.answer, { color: colors.textSecondary }]}>{item.a}</Text>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
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

        {/* Trail badge */}
        <View style={styles.contentPadding}>
          <LinearGradient colors={course.trailColor} style={styles.trailBadge}>
            <Text style={styles.trailBadgeText}>{course.trailLabel}</Text>
          </LinearGradient>

          <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.courseSubtitle, { color: colors.textSecondary }]}>{course.subtitle}</Text>

          {/* Extra content */}
          {course.extraContent.map((text, i) => (
            <Text key={i} style={[styles.paragraph, { color: colors.text }]}>{text}</Text>
          ))}

          <View style={styles.divider} />

          {hasAccess ? (
            <>
              {/* Full content — user has access */}
              {course.sections.map((section, sIdx) => (
                <AnimatedSection key={sIdx}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                  {section.items.map((item, iIdx) => (
                    <View key={iIdx} style={styles.sectionItem}>
                      <Text style={[styles.sectionItemText, { color: colors.text }]}>{item}</Text>
                    </View>
                  ))}
                  <View style={styles.divider} />
                </AnimatedSection>
              ))}

              {/* FAQ */}
              {course.faq.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>{'❓ ' + t('courseDetail.faqTitle')}</Text>
                  {course.faq.map((item, idx) => (
                    <FAQItem key={idx} item={item} colors={colors} />
                  ))}
                  <View style={styles.divider} />
                </>
              )}
            </>
          ) : (
            <>
              {/* Paywall — user doesn't have access */}
              <View style={[styles.paywallCard, { backgroundColor: colors.card, borderColor: '#8B5CF6' }]}>
                <Text style={styles.paywallEmoji}>🔒</Text>
                <Text style={[styles.paywallTitle, { color: colors.text }]}>
                  {t('courseDetail.paywallTitle') || 'Conteúdo exclusivo para alunos'}
                </Text>
                <Text style={[styles.paywallDesc, { color: colors.textSecondary }]}>
                  {t('courseDetail.paywallDesc') || 'Adquira este curso para ter acesso completo a todas as aulas, materiais e conteúdo exclusivo.'}
                </Text>
              </View>
              <View style={styles.divider} />
            </>
          )}

          {/* Guarantee */}
          <View style={[styles.guaranteeCard, { backgroundColor: colors.card }]}>
            <Shield size={28} color="#10B981" />
            <Text style={[styles.guaranteeTitle, { color: colors.text }]}>{t('courseDetail.guaranteeTitle')}</Text>
            <Text style={[styles.guaranteeDesc, { color: colors.textSecondary }]}>
              {t('courseDetail.guaranteeDesc')}
            </Text>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.card }]}>
        {hasAccess ? (
          <>
            <Text style={[styles.footerLabel, { color: '#10B981', fontSize: 14, fontWeight: '600' }]}>✅ {t('courseDetail.courseOwned')}</Text>
            <AnimatedPressable onPress={() => router.push(`/course/${id}/study`)}>
              <View style={[styles.buyBtn, { backgroundColor: '#10B981' }]}>
                <Text style={styles.buyBtnText}>{t('courseDetail.accessCourse')}</Text>
              </View>
            </AnimatedPressable>
          </>
        ) : (
          <>
            <View>
              <Text style={styles.footerLabel}>{t('courseDetail.investmentLabel')}</Text>
              <Text style={styles.footerPrice}>R$ {course.price},00</Text>
            </View>
            <AnimatedPressable onPress={handleBuy}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9'] as const} style={styles.buyBtn}>
                <Text style={styles.buyBtnText}>{t('courseDetail.buyButton')}</Text>
              </LinearGradient>
            </AnimatedPressable>
          </>
        )}
      </View>
    </View>
  );
}

const faqStyles = StyleSheet.create({
  item: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
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
    padding: 20,
  },
  trailBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  trailBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  courseSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionItem: {
    paddingLeft: 4,
    marginBottom: 8,
  },
  sectionItemText: {
    fontSize: 15,
    lineHeight: 22,
  },
  paywallCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 16,
  },
  paywallEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  paywallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  paywallDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  guaranteeCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  guaranteeTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
  },
  guaranteeDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
    fontWeight: 'bold',
    color: '#10B981',
  },
  buyBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
