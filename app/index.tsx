import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AnimatedPressable from '@/components/AnimatedPressable';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

export default function LandingPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="light" />
      <View style={{ height: insets.top }} />

      <Animated.View entering={FadeIn.duration(600)}>
        <Image
          source={require('../assets/images/hero-banner.png')}
          style={styles.heroBanner}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.body}>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(500)}
          style={[styles.highlight, { color: '#F7931A' }]}
        >
          Do Zero à Soberania
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(500)}
          style={[styles.description, { color: colors.text }]}
        >
          Aprenda a dominar uma infraestrutura financeira que não exige CPF e
          coloque seu dinheiro sob seu controle total — mesmo começando hoje e
          com pouco para investir.
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(600).duration(500)}
          style={[styles.emphasis, { color: colors.text }]}
        >
          O que você aprenderá aqui é algo que a maioria das pessoas só vai
          descobrir quando for tarde demais.
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(800).duration(500)}>
          <AnimatedPressable onPress={() => router.push('/auth/login')}>
            <LinearGradient
              colors={['#8B5CF6', '#6D28D9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaText}>Começar Agora</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </AnimatedPressable>
        </Animated.View>
      </View>
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
    fontWeight: 'bold',
    lineHeight: 34,
    marginBottom: 12,
  },
  emphasis: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 6 },
    }),
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
