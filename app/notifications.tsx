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
      Alert.alert('Sucesso', 'Notificação de teste enviada!');
      loadScheduledNotifications();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar notificação de teste');
    }
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Limpar Notificações',
      'Tem certeza que deseja cancelar todas as notificações agendadas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert('Sucesso', 'Todas as notificações foram canceladas');
          },
        },
      ]
    );
  };

  const notificationCategories = [
    {
      title: 'Notificações Push',
      icon: Smartphone,
      color: '#3B82F6',
      items: [
        {
          key: 'pushNotifications' as keyof NotificationSettings,
          title: 'Ativar Notificações',
          subtitle: 'Receber notificações do app',
          enabled: settings.pushNotifications,
        },
        {
          key: 'soundEnabled' as keyof NotificationSettings,
          title: 'Som',
          subtitle: 'Reproduzir som nas notificações',
          enabled: settings.soundEnabled,
        },
        {
          key: 'vibrationEnabled' as keyof NotificationSettings,
          title: 'Vibração',
          subtitle: 'Vibrar ao receber notificações',
          enabled: settings.vibrationEnabled,
        },
      ],
    },
    {
      title: 'Bitcoin',
      icon: TrendingUp,
      color: '#F59E0B',
      items: [
        {
          key: 'bitcoinPriceAlerts' as keyof NotificationSettings,
          title: 'Alertas de Preço',
          subtitle: 'Notificar mudanças significativas no preço',
          enabled: settings.bitcoinPriceAlerts,
        },
        {
          key: 'dailyPriceUpdates' as keyof NotificationSettings,
          title: 'Atualizações Diárias',
          subtitle: 'Receber preço do Bitcoin diariamente',
          enabled: settings.dailyPriceUpdates,
        },
        {
          key: 'morningPrice' as keyof NotificationSettings,
          title: 'Preço da Manhã',
          subtitle: 'Notificação às 8h',
          enabled: settings.morningPrice,
        },
        {
          key: 'eveningPrice' as keyof NotificationSettings,
          title: 'Preço da Noite',
          subtitle: 'Notificação às 20h',
          enabled: settings.eveningPrice,
        },
        {
          key: 'motivationMessages' as keyof NotificationSettings,
          title: 'Mensagens Motivacionais',
          subtitle: 'Dicas e motivação sobre Bitcoin',
          enabled: settings.motivationMessages,
        },
      ],
    },
    {
      title: 'Cursos e Cashback',
      icon: BookOpen,
      color: '#10B981',
      items: [
        {
          key: 'courseReminders' as keyof NotificationSettings,
          title: 'Lembretes de Curso',
          subtitle: 'Notificar para continuar assistindo',
          enabled: settings.courseReminders,
        },
        {
          key: 'cashbackNotifications' as keyof NotificationSettings,
          title: 'Cashback',
          subtitle: 'Notificar sobre cashback disponível',
          enabled: settings.cashbackNotifications,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1a1a1a', '#2a1a4a']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Notificações</Text>
            <Text style={styles.headerSubtitle}>Preferências de avisos</Text>
          </View>
          <View style={styles.headerRight}>
            <Bell size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Section */}
        <View style={styles.section}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIcon}>
                <Bell size={20} color="#10B981" />
              </View>
              <Text style={styles.statusTitle}>Status das Notificações</Text>
            </View>
            <Text style={styles.statusText}>
              {expoPushToken ? 'Notificações ativas' : 'Notificações desativadas'}
            </Text>
            <Text style={styles.statusSubtext}>
              {scheduledCount} notificação(ões) agendada(s)
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
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              
              <View style={styles.settingsList}>
                {category.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.settingItem}>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Switch
                      value={item.enabled}
                      onValueChange={(value) => updateSetting(item.key, value)}
                      trackColor={{ false: '#374151', true: category.color }}
                      thumbColor={item.enabled ? 'white' : '#9CA3AF'}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Test Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Testar Notificações</Text>
          <View style={styles.testButtons}>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => testNotification('price')}
            >
              <TrendingUp size={16} color="white" />
              <Text style={styles.testButtonText}>Preço Bitcoin</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#8B5CF6' }]}
              onPress={() => testNotification('motivation')}
            >
              <Gift size={16} color="white" />
              <Text style={styles.testButtonText}>Motivação</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#10B981' }]}
              onPress={() => testNotification('course')}
            >
              <BookOpen size={16} color="white" />
              <Text style={styles.testButtonText}>Curso</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clear All Notifications */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAllNotifications}
          >
            <BellOff size={20} color="#EF4444" />
            <Text style={styles.clearButtonText}>Limpar Todas as Notificações</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Bit for Kids 1.0.0</Text>
          <Text style={styles.appCopyright}>
            Configure suas preferências de notificação para uma melhor experiência.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
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
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
    fontWeight: '600',
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
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
    fontWeight: 'bold',
    color: 'white',
  },
  settingsList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
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
    fontWeight: '600',
    color: 'white',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
