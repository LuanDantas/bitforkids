import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PREVIEW_MESSAGE_TYPE, isAllowedPreviewOrigin } from '@/contexts/LanguageContext';
import LandingPage from '../index';
import AboutScreen from '../(tabs)/about';
import DashboardScreen from '../(tabs)/index';
import CoursesScreen from '../(tabs)/courses';
import ProfileScreen from '../(tabs)/profile';
import PortfolioScreen from '../(tabs)/portfolio';
import IndicesScreen from '../(tabs)/indices';
import CourseDetailScreen from '../course/[id]/index';
import StudyScreen from '../course/[id]/study';
import PortfolioDetailScreen from '../portfolio/[id]';
import PaymentsScreen from '../payments';
import NotificationsScreen from '../notifications';
import SettingsScreen from '../settings';
import PrivacyScreen from '../privacy';
import SupportScreen from '../support';
import LoginScreen from '../auth/login';

// Rota usada apenas pela prévia ao vivo do admin (Expo Web embutido em iframe).
// Renderiza a tela real correspondente ao slug, sem o chrome de tabs nem gate de
// auth (UserContext entra em modo-prévia). Os textos são injetados ao vivo via
// postMessage (ver LanguageContext). Telas [id] recebem um id de amostra (?id=1)
// pela URL. common/tabs não têm tela única e não são previewáveis.
const PREVIEW_SCREENS: Record<string, React.ComponentType> = {
  landing: LandingPage,
  home: AboutScreen,
  dashboard: DashboardScreen,
  courses: CoursesScreen,
  courseDetail: CourseDetailScreen,
  study: StudyScreen,
  profile: ProfileScreen,
  portfolio: PortfolioScreen,
  portfolioDetail: PortfolioDetailScreen,
  indices: IndicesScreen,
  payments: PaymentsScreen,
  notifications: NotificationsScreen,
  settings: SettingsScreen,
  privacy: PrivacyScreen,
  auth: LoginScreen,
  support: SupportScreen,
};

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  // O slug pode vir pela rota (dev/deep-link) ou pela mensagem do admin (permite
  // hospedar o web na mesma origem com uma URL fixa, sem rewrite de SPA).
  const [slug, setSlug] = useState(params.slug);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const handler = (event: MessageEvent) => {
      if (!isAllowedPreviewOrigin(event.origin)) return;
      const data = event.data;
      if (data?.type === PREVIEW_MESSAGE_TYPE && typeof data.slug === 'string') {
        setSlug(data.slug);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const Screen = slug ? PREVIEW_SCREENS[slug] : undefined;

  if (!Screen) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          Prévia indisponível para "{slug}".
        </Text>
      </View>
    );
  }

  return <Screen />;
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  fallbackText: { color: '#9ca3af', fontSize: 14, textAlign: 'center' },
});
