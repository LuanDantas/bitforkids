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
  Shield,
  Lock,
  Eye,
  EyeOff,
  Database,
  Download,
  Trash2,
  Key,
  UserCheck,
  Globe,
  Smartphone,
  Mail,
  CreditCard,
  FileText,
  AlertTriangle,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrivacySettings {
  profileVisibility: boolean;
  emailNotifications: boolean;
  dataAnalytics: boolean;
  crashReports: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  autoLogout: boolean;
  dataExport: boolean;
  dataDeletion: boolean;
}

export default function PrivacyScreen() {
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();

  const [settings, setSettings] = useState<PrivacySettings>({
    profileVisibility: true,
    emailNotifications: true,
    dataAnalytics: true,
    crashReports: true,
    marketingEmails: false,
    twoFactorAuth: false,
    biometricAuth: false,
    autoLogout: true,
    dataExport: true,
    dataDeletion: true,
  });

  const updateSetting = (key: keyof PrivacySettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDataExport = () => {
    Alert.alert(
      t('privacy.exportAlertTitle'),
      t('privacy.exportAlertMessage'),
      [
        { text: t('privacy.exportAlertCancel'), style: 'cancel' },
        {
          text: t('privacy.exportAlertConfirm'),
          onPress: () => {
            Alert.alert(
              t('privacy.exportSuccessTitle'),
              t('privacy.exportSuccessMessage')
            );
          },
        },
      ]
    );
  };

  const handleDataDeletion = () => {
    Alert.alert(
      t('privacy.deleteAlertTitle'),
      t('privacy.deleteAlertMessage'),
      [
        { text: t('privacy.deleteAlertCancel'), style: 'cancel' },
        {
          text: t('privacy.deleteAlertConfirm'),
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              t('privacy.deleteConfirmTitle'),
              t('privacy.deleteConfirmMessage'),
              [
                { text: t('privacy.deleteConfirmCancel'), style: 'cancel' },
                {
                  text: t('privacy.deleteConfirmButton'),
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert(
                      t('privacy.deleteSuccessTitle'),
                      t('privacy.deleteSuccessMessage')
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://bitforkids.com/privacy-policy');
  };

  const openTermsOfService = () => {
    Linking.openURL('https://bitforkids.com/terms-of-service');
  };

  const privacyCategories = [
    {
      title: t('privacy.categoryProfileVisibility'),
      icon: Eye,
      color: '#3B82F6',
      items: [
        {
          key: 'profileVisibility' as keyof PrivacySettings,
          title: t('privacy.publicProfile'),
          subtitle: t('privacy.publicProfileDesc'),
        },
        {
          key: 'emailNotifications' as keyof PrivacySettings,
          title: t('privacy.emailNotifications'),
          subtitle: t('privacy.emailNotificationsDesc'),
        },
        {
          key: 'marketingEmails' as keyof PrivacySettings,
          title: t('privacy.marketingEmails'),
          subtitle: t('privacy.marketingEmailsDesc'),
        },
      ],
    },
    {
      title: t('privacy.categoryAccountSecurity'),
      icon: Lock,
      color: '#10B981',
      items: [
        {
          key: 'twoFactorAuth' as keyof PrivacySettings,
          title: t('privacy.twoFactorAuth'),
          subtitle: t('privacy.twoFactorAuthDesc'),
        },
        {
          key: 'biometricAuth' as keyof PrivacySettings,
          title: t('privacy.biometricAuth'),
          subtitle: t('privacy.biometricAuthDesc'),
        },
        {
          key: 'autoLogout' as keyof PrivacySettings,
          title: t('privacy.autoLogout'),
          subtitle: t('privacy.autoLogoutDesc'),
        },
      ],
    },
    {
      title: t('privacy.categoryDataAnalytics'),
      icon: Database,
      color: '#6366f1',
      items: [
        {
          key: 'dataAnalytics' as keyof PrivacySettings,
          title: t('privacy.dataAnalytics'),
          subtitle: t('privacy.dataAnalyticsDesc'),
        },
        {
          key: 'crashReports' as keyof PrivacySettings,
          title: t('privacy.crashReports'),
          subtitle: t('privacy.crashReportsDesc'),
        },
      ],
    },
  ];

  const dataActions = [
    {
      icon: Download,
      title: t('privacy.exportData'),
      subtitle: t('privacy.exportDataDesc'),
      color: '#3B82F6',
      onPress: handleDataExport,
    },
    {
      icon: Trash2,
      title: t('privacy.deleteAccount'),
      subtitle: t('privacy.deleteAccountDesc'),
      color: '#EF4444',
      onPress: handleDataDeletion,
    },
  ];

  const securityInfo = [
    {
      icon: Shield,
      title: t('privacy.securityInfo1Title'),
      description: t('privacy.securityInfo1Desc'),
    },
    {
      icon: Lock,
      title: t('privacy.securityInfo2Title'),
      description: t('privacy.securityInfo2Desc'),
    },
    {
      icon: Key,
      title: t('privacy.securityInfo3Title'),
      description: t('privacy.securityInfo3Desc'),
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
            <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('privacy.headerTitle')}</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>{t('privacy.headerSubtitle')}</Text>
          </View>
          <View style={styles.headerRight}>
            <Shield size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('privacy.securityTitle')}</Text>
          {securityInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <View key={index} style={[styles.infoCard, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                <View style={styles.infoIcon}>
                  <Icon size={20} color="#10B981" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={[styles.infoTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{info.title}</Text>
                  <Text style={[styles.infoDescription, { color: colors.textSecondary, fontFamily: fonts.body }]}>{info.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Privacy Categories */}
        {privacyCategories.map((category, categoryIndex) => {
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
                  const isEnabled = settings[item.key];
                  return (
                    <View key={itemIndex} style={[styles.settingItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                      <View style={styles.settingContent}>
                        <Text style={[styles.settingTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.title}</Text>
                        <Text style={[styles.settingSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                          {item.subtitle}
                        </Text>
                      </View>
                      <Switch
                        value={isEnabled}
                        onValueChange={(value) =>
                          updateSetting(item.key, value)
                        }
                        trackColor={{ false: '#374151', true: category.color }}
                        thumbColor={isEnabled ? 'white' : '#9CA3AF'}
                        ios_backgroundColor="#374151"
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Data Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('privacy.manageDataTitle')}</Text>
          <View style={[styles.actionsList, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            {dataActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
                  onPress={action.onPress}
                >
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: `${action.color}20` },
                    ]}
                  >
                    <Icon size={20} color={action.color} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={[styles.actionTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{action.title}</Text>
                    <Text style={[styles.actionSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{action.subtitle}</Text>
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

        {/* Legal Documents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('privacy.legalTitle')}</Text>
          <View style={[styles.legalList, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            <TouchableOpacity
              style={[styles.legalItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
              onPress={openPrivacyPolicy}
            >
              <View style={styles.legalIcon}>
                <FileText size={20} color="#3B82F6" />
              </View>
              <View style={styles.legalContent}>
                <Text style={[styles.legalTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('privacy.privacyPolicy')}</Text>
                <Text style={[styles.legalSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                  {t('privacy.privacyPolicyDesc')}
                </Text>
              </View>
              <ArrowLeft
                size={20}
                color={colors.textSecondary}
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.legalItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
              onPress={openTermsOfService}
            >
              <View style={styles.legalIcon}>
                <FileText size={20} color="#6366f1" />
              </View>
              <View style={styles.legalContent}>
                <Text style={[styles.legalTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('privacy.termsOfService')}</Text>
                <Text style={[styles.legalSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                  {t('privacy.termsOfServiceDesc')}
                </Text>
              </View>
              <ArrowLeft
                size={20}
                color={colors.textSecondary}
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <View style={[styles.supportCard, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.supportIcon}>
              <AlertTriangle size={24} color="#F59E0B" />
            </View>
            <View style={styles.supportContent}>
              <Text style={[styles.supportTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('privacy.helpTitle')}</Text>
              <Text style={[styles.supportDescription, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                {t('privacy.helpDesc')}
              </Text>
            </View>
            <TouchableOpacity style={styles.supportButton}>
              <Mail size={16} color="white" />
              <Text style={[styles.supportButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('privacy.helpContact')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('privacy.appVersion')}</Text>
          <Text style={[styles.appCopyright, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('privacy.appCopyright')}
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    
    marginBottom: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,

    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,

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
  actionsList: {
    
    borderRadius: 12,
    borderWidth: 1,
    
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,

    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,

  },
  legalList: {
    
    borderRadius: 12,
    borderWidth: 1,
    
    overflow: 'hidden',
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    
  },
  legalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  legalContent: {
    flex: 1,
  },
  legalTitle: {
    fontSize: 16,

    marginBottom: 2,
  },
  legalSubtitle: {
    fontSize: 14,

  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    
  },
  supportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,

    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,

  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  supportButtonText: {
    fontSize: 14,
    color: 'white',
  },
  appInfo: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
