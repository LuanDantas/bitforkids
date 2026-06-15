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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';
import { useVSL } from '@/contexts/VSLContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuroraBackground from '@/components/AuroraBackground';
import GradientText from '@/components/GradientText';
import GradientButton from '@/components/GradientButton';

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
  const { colors, isDark, fonts } = useTheme();
  const { t } = useLanguage();
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
      Alert.alert(t('auth.register.errorTitle'), t('auth.register.errorFillAll'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('auth.register.errorTitle'), t('auth.register.errorPasswordMismatch'));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t('auth.register.errorTitle'), t('auth.register.errorPasswordLength'));
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(t('auth.register.errorTitle'), t('auth.register.errorAcceptTerms'));
      return;
    }

    setIsLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        t('auth.register.successTitle'),
        t('auth.register.successMessage'),
        [
          {
            text: t('auth.register.successButton'),
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
      <AuroraBackground />
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
            <GradientText style={[styles.title, { fontFamily: fonts.display }]}>{t('auth.register.title')}</GradientText>
            <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {source === 'vsl'
                ? t('auth.register.subtitleVSL')
                : t('auth.register.subtitleDefault')}
            </Text>
            {source === 'vsl' && plan === 'premium' && (
              <View style={styles.vslBadge}>
                <Text style={[styles.vslBadgeText, { fontFamily: fonts.secondaryMedium }]}>
                  🎯 {t('auth.register.vslBadge')}
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
                style={[styles.input, { color: colors.text, fontFamily: fonts.body }]}
                placeholder={t('auth.register.namePlaceholder')}
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
                style={[styles.input, { color: colors.text, fontFamily: fonts.body }]}
                placeholder={t('auth.register.emailPlaceholder')}
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
                style={[styles.input, { paddingRight: 50, fontFamily: fonts.body }]}
                placeholder={t('auth.register.passwordPlaceholder')}
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
                style={[styles.input, { paddingRight: 50, fontFamily: fonts.body }]}
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
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
              <Text style={[styles.termsText, { fontFamily: fonts.body }]}>
                {t('auth.register.termsPrefix')}
                <Text style={[styles.termsLink, { fontFamily: fonts.bodySemiBold }]}>{t('auth.register.termsLink')}</Text>{t('auth.register.termsAnd')}
                <Text style={[styles.termsLink, { fontFamily: fonts.bodySemiBold }]}>{t('auth.register.privacyLink')}</Text>
              </Text>
            </TouchableOpacity>

            <GradientButton
              label={t('auth.register.registerButton')}
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('auth.register.hasAccount')}</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginText, { fontFamily: fonts.bodySemiBold }]}>{t('auth.register.loginLink')}</Text>
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
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  vslBadgeText: {
    fontSize: 14,
    color: '#818cf8',
    textAlign: 'center',
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
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  termsLink: {
    color: '#6366f1',
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
    color: '#6366f1',
  },
});
