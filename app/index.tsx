import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function LandingPage() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        source={require('../assets/images/hero-banner.png')}
        style={styles.heroBanner}
        resizeMode="cover"
      />

      <View style={styles.body}>
        <Text style={[styles.highlight, { color: '#F7931A' }]}>
          Do Zero à Soberania
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          Aprenda a dominar uma infraestrutura financeira que não exige CPF e
          coloque seu dinheiro sob seu controle total — mesmo começando hoje e
          com pouco para investir.
        </Text>

        <Text style={[styles.emphasis, { color: colors.text }]}>
          O que você aprenderá aqui é algo que a maioria das pessoas só vai
          descobrir quando for tarde demais.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/auth/login')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>Começar Agora</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
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
    height: 300,
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
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
