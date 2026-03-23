import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
      <LinearGradient
        colors={['#8B5CF6', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.emoji}>🌍</Text>
        <Text style={styles.title}>
          O Maravilhoso Mundo das Finanças Descentralizadas e do Bitcoin
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={[styles.description, { color: colors.text }]}>
          Uma nova rede financeira global está surgindo. Uma infraestrutura
          construída diretamente na internet que funciona 24 horas por dia, 7
          dias por semana — sem bancos, sem governos e sem precisar de CPF.
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          Com apenas um celular, um computador e acesso à internet, qualquer
          pessoa pode armazenar valor, enviar dinheiro COMO DÓLAR CRIPTOGRAFADO
          E BITCOIN para qualquer lugar do mundo e acessar serviços financeiros
          diretamente pela rede.
        </Text>

        <Text style={[styles.highlight, { color: colors.text }]}>
          Quem entende como funciona o dinheiro, entende como proteger sua
          liberdade.
        </Text>

        <Text style={[styles.description, { color: colors.text }]}>
          Neste treinamento você aprenderá a usar essa nova rede financeira da
          internet e parar de depender de bancos para controlar o seu próprio
          dinheiro. 🚀
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
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
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
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28,
    marginVertical: 8,
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
