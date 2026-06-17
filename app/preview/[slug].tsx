import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
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
  const { slug } = useLocalSearchParams<{ slug: string }>();
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
