import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  BellOff,
  Smartphone,
  Clock,
  TrendingUp,
  BookOpen,
  Gift,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react-native';
import { useNotifications } from '../hooks/useNotifications';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface NotificationSettings {
  pushNotifications: boolean;
  bitcoinPriceAlerts: boolean;
  dailyPriceUpdates: boolean;
  morningPrice: boolean;
  eveningPrice: boolean;
  motivationMessages: boolean;
  courseReminders: boolean;
  cashbackNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const {
    expoPushToken, 
    scheduleBitcoinPriceNotification,
    scheduleDailyBitcoinPrice,
    scheduleBitcoinMotivation,
    scheduleCourseReminder,
    cancelAllNotifications,
    getScheduledNotifications 
  } = useNotifications();

  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    bitcoinPriceAlerts: true,
    dailyPriceUpdates: true,
    morningPrice: true,
    eveningPrice: false,
    motivationMessages: true,
    courseReminders: true,
    cashbackNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    loadScheduledNotifications();
  }, []);

  const loadScheduledNotifications = async () => {
    try {
      const scheduled = await getScheduledNotifications();
      setScheduledCount(scheduled.length);
    } catch (error) {
      console.error('Error loading scheduled notifications:', error);
    }
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const testNotification = async (type: 'price' | 'motivation' | 'course') => {
    try {
      switch (type) {
        case 'price':
          await scheduleBitcoinPriceNotification(450000, 2.5);
          break;
        case 'motivation':
          await scheduleBitcoinMotivation();
          break;
        case 'course':
          await scheduleCourseReminder('Introdução ao Bitcoin', 0);
          break;
      }
      Alert.alert(t('notifications.testSuccessTitle'), t('notifications.testSuccessMessage'));
      loadScheduledNotifications();
    } catch (error) {
      Alert.alert(t('notifications.testErrorTitle'), t('notifications.testErrorMessage'));
    }
  };

  const clearAllNotifications = () => {
    Alert.alert(
      t('notifications.clearAlertTitle'),
      t('notifications.clearAlertMessage'),
      [
        { text: t('notifications.clearAlertCancel'), style: 'cancel' },
        {
          text: t('notifications.clearAlertConfirm'),
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert(t('notifications.clearSuccessTitle'), t('notifications.clearSuccessMessage'));
          },
        },
      ]
    );
  };

  const notificationCategories = [
    {
      title: t('notifications.categoryPush'),
      icon: Smartphone,
      color: '#3B82F6',
      items: [
        {
          key: 'pushNotifications' as keyof NotificationSettings,
          title: t('notifications.enableNotifications'),
          subtitle: t('notifications.enableNotificationsDesc'),
          enabled: settings.pushNotifications,
        },
        {
          key: 'soundEnabled' as keyof NotificationSettings,
          title: t('notifications.sound'),
          subtitle: t('notifications.soundDesc'),
          enabled: settings.soundEnabled,
        },
        {
          key: 'vibrationEnabled' as keyof NotificationSettings,
          title: t('notifications.vibration'),
          subtitle: t('notifications.vibrationDesc'),
          enabled: settings.vibrationEnabled,
        },
      ],
    },
    {
      title: t('notifications.categoryBitcoin'),
      icon: TrendingUp,
      color: '#F59E0B',
      items: [
        {
          key: 'bitcoinPriceAlerts' as keyof NotificationSettings,
          title: t('notifications.priceAlerts'),
          subtitle: t('notifications.priceAlertsDesc'),
          enabled: settings.bitcoinPriceAlerts,
        },
        {
          key: 'dailyPriceUpdates' as keyof NotificationSettings,
          title: t('notifications.dailyUpdates'),
          subtitle: t('notifications.dailyUpdatesDesc'),
          enabled: settings.dailyPriceUpdates,
        },
        {
          key: 'morningPrice' as keyof NotificationSettings,
          title: t('notifications.morningPrice'),
          subtitle: t('notifications.morningPriceDesc'),
          enabled: settings.morningPrice,
        },
        {
          key: 'eveningPrice' as keyof NotificationSettings,
          title: t('notifications.eveningPrice'),
          subtitle: t('notifications.eveningPriceDesc'),
          enabled: settings.eveningPrice,
        },
        {
          key: 'motivationMessages' as keyof NotificationSettings,
          title: t('notifications.motivationMessages'),
          subtitle: t('notifications.motivationMessagesDesc'),
          enabled: settings.motivationMessages,
        },
      ],
    },
    {
      title: t('notifications.categoryCoursesCashback'),
      icon: BookOpen,
      color: '#10B981',
      items: [
        {
          key: 'courseReminders' as keyof NotificationSettings,
          title: t('notifications.courseReminders'),
          subtitle: t('notifications.courseRemindersDesc'),
          enabled: settings.courseReminders,
        },
        {
          key: 'cashbackNotifications' as keyof NotificationSettings,
          title: t('notifications.cashback'),
          subtitle: t('notifications.cashbackDesc'),
          enabled: settings.cashbackNotifications,
        },
      ],
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
            <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('notifications.headerTitle')}</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>{t('notifications.headerSubtitle')}</Text>
          </View>
          <View style={styles.headerRight}>
            <Bell size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Section */}
        <View style={styles.section}>
          <View style={[styles.statusCard, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIcon}>
                <Bell size={20} color="#10B981" />
              </View>
              <Text style={[styles.statusTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('notifications.statusTitle')}</Text>
            </View>
            <Text style={[styles.statusText, { fontFamily: fonts.body }]}>
              {expoPushToken ? t('notifications.statusActive') : t('notifications.statusInactive')}
            </Text>
            <Text style={[styles.statusSubtext, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {t('notifications.statusScheduled').replace('{{count}}', String(scheduledCount))}
            </Text>
          </View>
        </View>

        {/* Notification Categories */}
        {notificationCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <View key={categoryIndex} style={styles.section}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Icon size={20} color={category.color} />
                </View>
                <Text style={[styles.categoryTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{category.title}</Text>
              </View>

              <View style={[styles.settingsList, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                {category.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={[styles.settingItem, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                    <View style={styles.settingContent}>
                      <Text style={[styles.settingTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.title}</Text>
                      <Text style={[styles.settingSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{item.subtitle}</Text>
                    </View>
                    <Switch
                      value={item.enabled}
                      onValueChange={(value) => updateSetting(item.key, value)}
                      trackColor={{ false: '#374151', true: category.color }}
                      thumbColor={item.enabled ? 'white' : '#9CA3AF'}
                      ios_backgroundColor="#374151"
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Test Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('notifications.testTitle')}</Text>
          <View style={styles.testButtons}>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => testNotification('price')}
            >
              <TrendingUp size={16} color="white" />
              <Text style={[styles.testButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('notifications.testBitcoinPrice')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#6366f1' }]}
              onPress={() => testNotification('motivation')}
            >
              <Gift size={16} color="white" />
              <Text style={[styles.testButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('notifications.testMotivation')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#10B981' }]}
              onPress={() => testNotification('course')}
            >
              <BookOpen size={16} color="white" />
              <Text style={[styles.testButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('notifications.testCourse')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clear All Notifications */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: colors.card }]}
            onPress={clearAllNotifications}
          >
            <BellOff size={20} color="#EF4444" />
            <Text style={[styles.clearButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('notifications.clearAll')}</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('notifications.appVersion')}</Text>
          <Text style={[styles.appCopyright, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('notifications.appCopyright')}
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
  statusCard: {
    
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusTitle: {
    fontSize: 16,

  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    
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
  testButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  testButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  testButtonText: {
    fontSize: 14,
    color: 'white',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#EF4444',
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
