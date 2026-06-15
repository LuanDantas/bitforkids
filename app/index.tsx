import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { ArrowRight, Zap } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AnimatedPressable from '@/components/AnimatedPressable';
import GradientButton from '@/components/GradientButton';
import GradientText from '@/components/GradientText';
import AuroraBackground from '@/components/AuroraBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

export default function LandingPage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { login } = useUser();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const handleQuickLogin = async () => {
    const result = await login('root@bitforkids.com', 'root123');
    if (result.success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="light" />
      <AuroraBackground />
      <View style={{ height: insets.top }} />

      <Animated.View entering={FadeIn.duration(600)}>
        <Image
          source={require('../assets/images/hero-banner.png')}
          style={styles.heroBanner}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.body}>
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <GradientText style={[styles.highlight, { fontFamily: fonts.display }]}>
            {t('landing.highlight')}
          </GradientText>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(500)}
          style={[styles.description, { color: colors.text, fontFamily: fonts.body }]}
        >
          {t('landing.description')}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(600).duration(500)}
          style={[styles.emphasis, { color: colors.text, fontFamily: fonts.bodySemiBold }]}
        >
          {t('landing.emphasis')}
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(800).duration(500)} style={styles.ctaWrap}>
          <GradientButton
            label={t('landing.cta')}
            onPress={() => router.push('/auth/login')}
            icon={<ArrowRight size={20} color="#FFFFFF" />}
            iconPosition="right"
          />
        </Animated.View>
      </View>

      {/* TEMP: Quick login button */}
      <AnimatedPressable
        onPress={handleQuickLogin}
        style={[styles.floatingBtn, { bottom: insets.bottom + 16 }]}
      >
        <Zap size={18} color="#fff" fill="#fff" />
        <Text style={[styles.floatingBtnText, { fontFamily: fonts.bodySemiBold }]}>
          Dev Login
        </Text>
      </AnimatedPressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  heroBanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 1402 / 935,
  },
  body: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
  },
  highlight: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 12,
  },
  emphasis: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  ctaWrap: {
    marginTop: 24,
  },
  floatingBtn: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 6 },
    }),
  },
  floatingBtnText: {
    color: '#fff',
    fontSize: 13,
  },
});
