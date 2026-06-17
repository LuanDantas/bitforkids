import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PREVIEW_MESSAGE_TYPE, isAllowedPreviewOrigin } from '@/contexts/LanguageContext';
import LandingPage from '../index';
import AboutScreen from '../(tabs)/about';

// Rota usada apenas pela prévia ao vivo do admin (Expo Web embutido em iframe).
// Renderiza a tela real correspondente ao slug, sem o chrome de tabs nem gate de
// auth. Os textos são injetados ao vivo via postMessage (ver LanguageContext).
const PREVIEW_SCREENS: Record<string, React.ComponentType> = {
  landing: LandingPage,
  home: AboutScreen,
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
