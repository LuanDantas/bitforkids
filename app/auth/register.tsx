import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react-native';
import { useVSL } from '@/contexts/VSLContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { source, plan } = useLocalSearchParams();
  const { trackVSLConversion, resetSessionFlag } = useVSL();

  // Track VSL conversion when user comes from VSL
  React.useEffect(() => {
    if (source === 'vsl') {
      trackVSLConversion('register');
    }
  }, [source, trackVSLConversion]);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos e condições');
      return;
    }

    setIsLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso! Você será redirecionado para a plataforma.',
        [
          {
            text: 'Continuar',
            onPress: () => {
              // Track purchase conversion if coming from VSL with premium plan
              if (source === 'vsl' && plan === 'premium') {
                trackVSLConversion('purchase');
              }
              // Reset VSL session flag on successful registration
              resetSessionFlag();
              router.replace('/(tabs)');
            },
          },
        ]
      );
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {source === 'vsl'
                ? 'Você está a um passo de transformar a educação financeira do seu filho!'
                : 'Junte-se à nossa comunidade de aprendizado'}
            </Text>
            {source === 'vsl' && plan === 'premium' && (
              <View style={styles.vslBadge}>
                <Text style={styles.vslBadgeText}>
                  🎯 Você escolheu o Plano Premium - Acesso completo garantido!
                </Text>
              </View>
            )}
          </View>

          {/* Registration Form */}
          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
              <View style={styles.inputIcon}>
                <User size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Nome completo"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
              <View style={styles.inputIcon}>
                <Mail size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
              <View style={styles.inputIcon}>
                <Lock size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Senha"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
              <View style={styles.inputIcon}>
                <Lock size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Confirmar senha"
                placeholderTextColor={colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked,
                ]}
              >
                {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                Aceito os{' '}
                <Text style={styles.termsLink}>Termos e Condições</Text> e a{' '}
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                style={styles.registerGradient}
              >
                <Text style={styles.registerText}>
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginText}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  vslBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  vslBadgeText: {
    fontSize: 14,
    color: '#F59E0B',
    textAlign: 'center',
    fontWeight: '600',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    paddingVertical: 16,
    paddingRight: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  termsLink: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  registerGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  loginText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});
