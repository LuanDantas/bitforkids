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
  Moon,
  Sun,
  Globe,
  Volume2,
  VolumeX,
  Smartphone,
  Wifi,
  Battery,
  Shield,
  User,
  Bell,
  CreditCard,
  HelpCircle,
  Info,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { colors, isDark } = useTheme();

  const [settings, setSettings] = useState<GeneralSettings>({
    darkMode: true,
    language: 'pt-BR',
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
  };

  const handleLanguageChange = () => {
    Alert.alert('Idioma', 'Selecione o idioma preferido:', [
      {
        text: 'Português (BR)',
        onPress: () => updateSetting('language', 'pt-BR'),
      },
      {
        text: 'English (US)',
        onPress: () => updateSetting('language', 'en-US'),
      },
      { text: 'Español', onPress: () => updateSetting('language', 'es-ES') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleCurrencyChange = () => {
    Alert.alert('Moeda', 'Selecione a moeda preferida:', [
      { text: 'Real (R$)', onPress: () => updateSetting('currency', 'BRL') },
      { text: 'Dólar ($)', onPress: () => updateSetting('currency', 'USD') },
      { text: 'Euro (€)', onPress: () => updateSetting('currency', 'EUR') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const openHelpCenter = () => {
    Linking.openURL('https://bitforkids.com/help');
  };

  const openAbout = () => {
    Alert.alert(
      'Sobre o App',
      'Bit for Kids v1.0.0\n\nUm aplicativo educativo sobre Bitcoin e criptomoedas para crianças e jovens.\n\nDesenvolvido com ❤️ para educação financeira.',
      [{ text: 'OK' }]
    );
  };

  const settingsCategories = [
    {
      title: 'Aparência',
      icon: Palette,
      color: '#8B5CF6',
      items: [
        {
          key: 'darkMode' as keyof GeneralSettings,
          title: 'Modo Escuro',
          subtitle: 'Usar tema escuro do app',
          type: 'switch',
        },
        {
          key: 'language' as keyof GeneralSettings,
          title: 'Idioma',
          subtitle:
            settings.language === 'pt-BR'
              ? 'Português (BR)'
              : settings.language === 'en-US'
              ? 'English (US)'
              : 'Español',
          type: 'action',
          onPress: handleLanguageChange,
        },
      ],
    },
    {
      title: 'Som e Vibração',
      icon: Volume2,
      color: '#F59E0B',
      items: [
        {
          key: 'soundEffects' as keyof GeneralSettings,
          title: 'Efeitos Sonoros',
          subtitle: 'Reproduzir sons de interface',
          type: 'switch',
        },
        {
          key: 'hapticFeedback' as keyof GeneralSettings,
          title: 'Feedback Tátil',
          subtitle: 'Vibrar ao tocar elementos',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Moeda e Localização',
      icon: Globe,
      color: '#10B981',
      items: [
        {
          key: 'currency' as keyof GeneralSettings,
          title: 'Moeda',
          subtitle:
            settings.currency === 'BRL'
              ? 'Real (R$)'
              : settings.currency === 'USD'
              ? 'Dólar ($)'
              : 'Euro (€)',
          type: 'action',
          onPress: handleCurrencyChange,
        },
      ],
    },
    {
      title: 'Performance',
      icon: Smartphone,
      color: '#3B82F6',
      items: [
        {
          key: 'autoUpdate' as keyof GeneralSettings,
          title: 'Atualização Automática',
          subtitle: 'Baixar atualizações automaticamente',
          type: 'switch',
        },
        {
          key: 'dataSaver' as keyof GeneralSettings,
          title: 'Economia de Dados',
          subtitle: 'Reduzir uso de dados móveis',
          type: 'switch',
        },
        {
          key: 'cacheManagement' as keyof GeneralSettings,
          title: 'Gerenciamento de Cache',
          subtitle: 'Limpar cache automaticamente',
          type: 'switch',
        },
      ],
    },
    {
      title: 'Privacidade',
      icon: Shield,
      color: '#EF4444',
      items: [
        {
          key: 'analytics' as keyof GeneralSettings,
          title: 'Análise de Uso',
          subtitle: 'Enviar dados de uso para melhorias',
          type: 'switch',
        },
        {
          key: 'crashReports' as keyof GeneralSettings,
          title: 'Relatórios de Erro',
          subtitle: 'Enviar relatórios de crashes',
          type: 'switch',
        },
      ],
    },
  ];

  const supportActions = [
    {
      icon: HelpCircle,
      title: 'Central de Ajuda',
      subtitle: 'Encontre respostas para suas dúvidas',
      color: '#10B981',
      onPress: openHelpCenter,
    },
    {
      icon: Info,
      title: 'Sobre o App',
      subtitle: 'Informações sobre o Bit for Kids',
      color: '#8B5CF6',
      onPress: openAbout,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={isDark ? ['#1a1a1a', '#2a1a4a'] as const : ['#8B5CF6', '#3B82F6'] as const} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Configurações</Text>
            <Text style={styles.headerSubtitle}>Preferências gerais</Text>
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
                <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
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
                        <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Suporte</Text>
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
                    <Text style={[styles.supportTitle, { color: colors.text }]}>{action.title}</Text>
                    <Text style={[styles.supportSubtitle, { color: colors.textSecondary }]}>
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
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>Bit for Kids 1.0.0</Text>
          <Text style={[styles.appCopyright, { color: colors.textSecondary }]}>
            Personalize sua experiência com essas configurações.
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    
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
    fontWeight: 'bold',
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
    fontWeight: '600',
    
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
    fontWeight: '600',
    
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
