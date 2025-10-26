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
      'Exportar Dados',
      'Você receberá um email com um link para baixar todos os seus dados em formato JSON.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Exportar',
          onPress: () => {
            Alert.alert(
              'Sucesso',
              'Email de exportação enviado! Verifique sua caixa de entrada.'
            );
          },
        },
      ]
    );
  };

  const handleDataDeletion = () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmação Final',
              'Digite "EXCLUIR" para confirmar a exclusão da sua conta.',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Confirmar',
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert(
                      'Conta Excluída',
                      'Sua conta foi excluída com sucesso.'
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
      title: 'Visibilidade do Perfil',
      icon: Eye,
      color: '#3B82F6',
      items: [
        {
          key: 'profileVisibility' as keyof PrivacySettings,
          title: 'Perfil Público',
          subtitle: 'Permitir que outros usuários vejam seu perfil',
        },
        {
          key: 'emailNotifications' as keyof PrivacySettings,
          title: 'Notificações por Email',
          subtitle: 'Receber emails sobre atividades da conta',
        },
        {
          key: 'marketingEmails' as keyof PrivacySettings,
          title: 'Emails de Marketing',
          subtitle: 'Receber ofertas e novidades por email',
        },
      ],
    },
    {
      title: 'Segurança da Conta',
      icon: Lock,
      color: '#10B981',
      items: [
        {
          key: 'twoFactorAuth' as keyof PrivacySettings,
          title: 'Autenticação de Dois Fatores',
          subtitle: 'Adicionar camada extra de segurança',
        },
        {
          key: 'biometricAuth' as keyof PrivacySettings,
          title: 'Autenticação Biométrica',
          subtitle: 'Usar impressão digital ou Face ID',
        },
        {
          key: 'autoLogout' as keyof PrivacySettings,
          title: 'Logout Automático',
          subtitle: 'Sair automaticamente após inatividade',
        },
      ],
    },
    {
      title: 'Dados e Análises',
      icon: Database,
      color: '#8B5CF6',
      items: [
        {
          key: 'dataAnalytics' as keyof PrivacySettings,
          title: 'Análise de Dados',
          subtitle: 'Permitir coleta de dados para melhorias',
        },
        {
          key: 'crashReports' as keyof PrivacySettings,
          title: 'Relatórios de Erro',
          subtitle: 'Enviar relatórios automáticos de crashes',
        },
      ],
    },
  ];

  const dataActions = [
    {
      icon: Download,
      title: 'Exportar Dados',
      subtitle: 'Baixar todos os seus dados pessoais',
      color: '#3B82F6',
      onPress: handleDataExport,
    },
    {
      icon: Trash2,
      title: 'Excluir Conta',
      subtitle: 'Remover permanentemente sua conta e dados',
      color: '#EF4444',
      onPress: handleDataDeletion,
    },
  ];

  const securityInfo = [
    {
      icon: Shield,
      title: 'Seus dados estão seguros',
      description:
        'Utilizamos criptografia de ponta a ponta para proteger suas informações.',
    },
    {
      icon: Lock,
      title: 'Conformidade com LGPD',
      description:
        'Seguimos rigorosamente a Lei Geral de Proteção de Dados brasileira.',
    },
    {
      icon: Key,
      title: 'Controle total',
      description:
        'Você tem controle completo sobre seus dados e pode excluí-los a qualquer momento.',
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
            <Text style={styles.headerTitle}>Privacidade</Text>
            <Text style={styles.headerSubtitle}>Dados e segurança</Text>
          </View>
          <View style={styles.headerRight}>
            <Shield size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança dos Dados</Text>
          {securityInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <View key={index} style={styles.infoCard}>
                <View style={styles.infoIcon}>
                  <Icon size={20} color="#10B981" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>{info.title}</Text>
                  <Text style={styles.infoDescription}>{info.description}</Text>
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
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>

              <View style={styles.settingsList}>
                {category.items.map((item, itemIndex) => {
                  const isEnabled = settings[item.key];
                  return (
                    <View key={itemIndex} style={styles.settingItem}>
                      <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        <Text style={styles.settingSubtitle}>
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
                        disabled={false}
                        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
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
          <Text style={styles.sectionTitle}>Gerenciar Dados</Text>
          <View style={styles.actionsList}>
            {dataActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.actionItem}
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
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <ArrowLeft
                    size={20}
                    color="#6B7280"
                    style={{ transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Legal Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos Legais</Text>
          <View style={styles.legalList}>
            <TouchableOpacity
              style={styles.legalItem}
              onPress={openPrivacyPolicy}
            >
              <View style={styles.legalIcon}>
                <FileText size={20} color="#3B82F6" />
              </View>
              <View style={styles.legalContent}>
                <Text style={styles.legalTitle}>Política de Privacidade</Text>
                <Text style={styles.legalSubtitle}>
                  Como coletamos e usamos seus dados
                </Text>
              </View>
              <ArrowLeft
                size={20}
                color="#6B7280"
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.legalItem}
              onPress={openTermsOfService}
            >
              <View style={styles.legalIcon}>
                <FileText size={20} color="#8B5CF6" />
              </View>
              <View style={styles.legalContent}>
                <Text style={styles.legalTitle}>Termos de Serviço</Text>
                <Text style={styles.legalSubtitle}>
                  Condições de uso da plataforma
                </Text>
              </View>
              <ArrowLeft
                size={20}
                color="#6B7280"
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <View style={styles.supportCard}>
            <View style={styles.supportIcon}>
              <AlertTriangle size={24} color="#F59E0B" />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Precisa de Ajuda?</Text>
              <Text style={styles.supportDescription}>
                Entre em contato conosco se tiver dúvidas sobre privacidade ou
                segurança.
              </Text>
            </View>
            <TouchableOpacity style={styles.supportButton}>
              <Mail size={16} color="white" />
              <Text style={styles.supportButtonText}>Contatar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Bit for Kids 1.0.0</Text>
          <Text style={styles.appCopyright}>
            Sua privacidade é nossa prioridade. Mantenha suas configurações
            atualizadas.
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
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
  actionsList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
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
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  legalList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
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
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  legalSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#9CA3AF',
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
    fontWeight: '600',
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
