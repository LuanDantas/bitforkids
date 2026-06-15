import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Settings,
  Palette,
  Globe,
  Volume2,
  Smartphone,
  Shield,
  HelpCircle,
  Info,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface GeneralSettings {
  darkMode: boolean;
  language: string;
  currency: string;
  soundEffects: boolean;
  hapticFeedback: boolean;
  autoUpdate: boolean;
  dataSaver: boolean;
  cacheManagement: boolean;
  analytics: boolean;
  crashReports: boolean;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, fonts, isDark, setDarkMode } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const [settings, setSettings] = useState<GeneralSettings>({
    darkMode: false,
    language: locale,
    currency: 'BRL',
    soundEffects: true,
    hapticFeedback: true,
    autoUpdate: true,
    dataSaver: false,
    cacheManagement: true,
    analytics: true,
    crashReports: true,
  });

  const updateSetting = (
    key: keyof GeneralSettings,
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'darkMode' && typeof value === 'boolean') {
      setDarkMode(value);
    }
    if (key === 'language' && typeof value === 'string') {
      setLocale(value as 'pt-BR' | 'en-US' | 'es-ES');
    }
  };

  const handleLanguageChange = () => {
    Alert.alert(t('settings.languageAlertTitle'), t('settings.languageAlertMessage'), [
      {
        text: t('settings.languagePortuguese'),
        onPress: () => updateSetting('language', 'pt-BR'),
      },
      {
        text: t('settings.languageEnglish'),
        onPress: () => updateSetting('language', 'en-US'),
      },
      { text: t('settings.languageSpanish'), onPress: () => updateSetting('language', 'es-ES') },
      { text: t('settings.cancel'), style: 'cancel' },
    ]);
  };

  const handleCurrencyChange = () => {
    Alert.alert(t('settings.currencyAlertTitle'), t('settings.currencyAlertMessage'), [
      { text: t('settings.currencyBRL'), onPress: () => updateSetting('currency', 'BRL') },
      { text: t('settings.currencyUSD'), onPress: () => updateSetting('currency', 'USD') },
      { text: t('settings.currencyEUR'), onPress: () => updateSetting('currency', 'EUR') },
      { text: t('settings.cancel'), style: 'cancel' },
    ]);
  };

  const openHelpCenter = () => {
    Linking.openURL('https://bitforkids.com/help');
  };

  const openAbout = () => {
    Alert.alert(
      t('settings.aboutAlertTitle'),
      t('settings.aboutAlertMessage'),
      [{ text: t('common.ok') }]
    );
  };

  const settingsCategories = [
    {
      title: t('settings.categoryAppearance'),
      icon: Palette,
      color: '#6366f1',
      items: [
        {
          key: 'language' as keyof GeneralSettings,
          title: t('settings.language'),
          subtitle:
            settings.language === 'pt-BR'
              ? t('settings.languagePortuguese')
              : settings.language === 'en-US'
              ? t('settings.languageEnglish')
              : t('settings.languageSpanish'),
          type: 'action',
          onPress: handleLanguageChange,
        },
      ],
    },
    {
      title: t('settings.categorySoundVibration'),
      icon: Volume2,
      color: '#F59E0B',
      items: [
        {
          key: 'soundEffects' as keyof GeneralSettings,
          title: t('settings.soundEffects'),
          subtitle: t('settings.soundEffectsDesc'),
          type: 'switch',
        },
        {
          key: 'hapticFeedback' as keyof GeneralSettings,
          title: t('settings.hapticFeedback'),
          subtitle: t('settings.hapticFeedbackDesc'),
          type: 'switch',
        },
      ],
    },
    {
      title: t('settings.categoryCurrencyLocation'),
      icon: Globe,
      color: '#10B981',
      items: [
        {
          key: 'currency' as keyof GeneralSettings,
          title: t('settings.currency'),
          subtitle:
            settings.currency === 'BRL'
              ? t('settings.currencyBRL')
              : settings.currency === 'USD'
              ? t('settings.currencyUSD')
              : t('settings.currencyEUR'),
          type: 'action',
          onPress: handleCurrencyChange,
        },
      ],
    },
    {
      title: t('settings.categoryPerformance'),
      icon: Smartphone,
      color: '#3B82F6',
      items: [
        {
          key: 'autoUpdate' as keyof GeneralSettings,
          title: t('settings.autoUpdate'),
          subtitle: t('settings.autoUpdateDesc'),
          type: 'switch',
        },
        {
          key: 'dataSaver' as keyof GeneralSettings,
          title: t('settings.dataSaver'),
          subtitle: t('settings.dataSaverDesc'),
          type: 'switch',
        },
        {
          key: 'cacheManagement' as keyof GeneralSettings,
          title: t('settings.cacheManagement'),
          subtitle: t('settings.cacheManagementDesc'),
          type: 'switch',
        },
      ],
    },
    {
      title: t('settings.categoryPrivacy'),
      icon: Shield,
      color: '#EF4444',
      items: [
        {
          key: 'analytics' as keyof GeneralSettings,
          title: t('settings.analytics'),
          subtitle: t('settings.analyticsDesc'),
          type: 'switch',
        },
        {
          key: 'crashReports' as keyof GeneralSettings,
          title: t('settings.crashReports'),
          subtitle: t('settings.crashReportsDesc'),
          type: 'switch',
        },
      ],
    },
  ];

  const supportActions = [
    {
      icon: HelpCircle,
      title: t('settings.helpCenter'),
      subtitle: t('settings.helpCenterDesc'),
      color: '#10B981',
      onPress: openHelpCenter,
    },
    {
      icon: Info,
      title: t('settings.aboutApp'),
      subtitle: t('settings.aboutAppDesc'),
      color: '#6366f1',
      onPress: openAbout,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={isDark ? ['#0f172a', '#1e293b'] as const : ['#4f46e5', '#3b82f6'] as const} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('settings.headerTitle')}</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>{t('settings.headerSubtitle')}</Text>
          </View>
          <View style={styles.headerRight}>
            <Settings size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Settings Categories */}
        {settingsCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <View key={categoryIndex} style={styles.section}>
              <View style={styles.categoryHeader}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: `${category.color}20` },
                  ]}
                >
                  <Icon size={20} color={category.color} />
                </View>
                <Text style={[styles.categoryTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{category.title}</Text>
              </View>

              <View style={[styles.settingsList, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                {category.items.map((item, itemIndex) => {
                  const isEnabled =
                    typeof settings[item.key] === 'boolean'
                      ? (settings[item.key] as boolean)
                      : false;

                  return (
                    <View key={itemIndex} style={[styles.settingItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                      <View style={styles.settingContent}>
                        <Text style={[styles.settingTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.title}</Text>
                        <Text style={[styles.settingSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                          {item.subtitle}
                        </Text>
                      </View>

                      {item.type === 'switch' ? (
                        <Switch
                          value={isEnabled}
                          onValueChange={(value) =>
                            updateSetting(item.key, value)
                          }
                          trackColor={{
                            false: '#374151',
                            true: category.color,
                          }}
                          thumbColor={isEnabled ? 'white' : '#9CA3AF'}
                          ios_backgroundColor="#374151"
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={item.onPress}
                        >
                          <ArrowLeft
                            size={20}
                            color={colors.textSecondary}
                            style={{ transform: [{ rotate: '180deg' }] }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('settings.supportTitle')}</Text>
          <View style={[styles.supportList, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            {supportActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.supportItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
                  onPress={action.onPress}
                >
                  <View
                    style={[
                      styles.supportIcon,
                      { backgroundColor: `${action.color}20` },
                    ]}
                  >
                    <Icon size={20} color={action.color} />
                  </View>
                  <View style={styles.supportContent}>
                    <Text style={[styles.supportTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{action.title}</Text>
                    <Text style={[styles.supportSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                      {action.subtitle}
                    </Text>
                  </View>
                  <ArrowLeft
                    size={20}
                    color={colors.textSecondary}
                    style={{ transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('settings.appVersion')}</Text>
          <Text style={[styles.appCopyright, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('settings.appCopyright')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,

    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
  },
  settingsList: {
    
    borderRadius: 12,
    borderWidth: 1,
    
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,

    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,

  },
  actionButton: {
    padding: 8,
  },
  supportList: {
    
    borderRadius: 12,
    borderWidth: 1,
    
    overflow: 'hidden',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,

    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 14,

  },
  appInfo: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    
    textAlign: 'center',
  },
});
