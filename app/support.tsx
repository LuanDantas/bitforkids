import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuroraBackground from '@/components/AuroraBackground';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import GlassCard from '@/components/GlassCard';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

function FAQItem({
  question,
  answer,
  colors,
  fonts,
}: {
  question: string;
  answer: string;
  colors: any;
  fonts: any;
}) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedPressable onPress={() => setOpen(!open)}>
      <GlassCard style={styles.faqCard}>
        <View style={styles.faqHeader}>
          <Text
            style={[
              styles.faqQuestion,
              { color: colors.text, fontFamily: fonts.bodySemiBold },
            ]}
          >
            {question}
          </Text>
          {open ? (
            <ChevronUp size={18} color={colors.textTertiary} />
          ) : (
            <ChevronDown size={18} color={colors.textTertiary} />
          )}
        </View>
        {open && (
          <Text
            style={[
              styles.faqAnswer,
              { color: colors.textSecondary, fontFamily: fonts.body },
            ]}
          >
            {answer}
          </Text>
        )}
      </GlassCard>
    </AnimatedPressable>
  );
}

export default function SupportScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const faqs = [
    { q: t('support.faq1Question'), a: t('support.faq1Answer') },
    { q: t('support.faq2Question'), a: t('support.faq2Answer') },
    { q: t('support.faq3Question'), a: t('support.faq3Answer') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AuroraBackground />
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top + 8 }} />

        {/* Header */}
        <View style={styles.header}>
          <AnimatedPressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.surface }]}
          >
            <ArrowLeft size={20} color={colors.text} />
          </AnimatedPressable>
          <Text
            style={[
              styles.headerTitle,
              { color: colors.text, fontFamily: fonts.display },
            ]}
          >
            {t('support.title')}
          </Text>
        </View>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary, fontFamily: fonts.body },
          ]}
        >
          {t('support.subtitle')}
        </Text>

        {/* Email contact */}
        <AnimatedSection delay={100}>
          <AnimatedPressable
            onPress={() =>
              Linking.openURL(`mailto:${t('support.email')}`)
            }
          >
            <GlassCard style={styles.contactCard}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: 'rgba(99, 102, 241, 0.15)' },
                ]}
              >
                <Mail size={22} color="#6366f1" />
              </View>
              <View style={styles.contactInfo}>
                <Text
                  style={[
                    styles.contactTitle,
                    { color: colors.text, fontFamily: fonts.bodySemiBold },
                  ]}
                >
                  {t('support.emailTitle')}
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    { color: '#6366f1', fontFamily: fonts.body },
                  ]}
                >
                  {t('support.email')}
                </Text>
                <Text
                  style={[
                    styles.contactNote,
                    { color: colors.textTertiary, fontFamily: fonts.body },
                  ]}
                >
                  {t('support.responseTime')}
                </Text>
              </View>
            </GlassCard>
          </AnimatedPressable>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection delay={200}>
          <Text
            style={[
              styles.faqTitle,
              { color: colors.text, fontFamily: fonts.displaySemiBold },
            ]}
          >
            {t('support.faqTitle')}
          </Text>
          <View style={styles.faqList}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                colors={colors}
                fonts={fonts}
              />
            ))}
          </View>
        </AnimatedSection>

        <View style={{ height: 40 }} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  // Contact
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 14,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    marginBottom: 2,
  },
  contactNote: {
    fontSize: 12,
  },

  // FAQ
  faqTitle: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  faqList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  faqCard: {
    paddingVertical: 14,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
