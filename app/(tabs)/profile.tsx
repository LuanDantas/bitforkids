import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  User,
  CreditCard,
  Settings,
  Bell,
  Shield,
  LogOut,
  CreditCard as Edit,
  ChevronRight,
  Gift,
  Coins,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [user] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    level: 'Intermediário',
    joinDate: '2023',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      coursesCompleted: 8,
      hoursStudied: 42,
      certificates: 0,
      currentStreak: 7,
      totalCashback: 'R$ 127,50',
      availableCashback: 'R$ 45,20',
    },
  });

  const menuItems = [
    {
      icon: CreditCard,
      title: 'Pagamentos',
      subtitle: 'Histórico e métodos',
      color: '#10B981',
    },
    {
      icon: Bell,
      title: 'Notificações',
      subtitle: 'Preferências de aviso',
      color: '#3B82F6',
    },
    {
      icon: Shield,
      title: 'Privacidade',
      subtitle: 'Dados e segurança',
      color: '#8B5CF6',
    },
    {
      icon: Settings,
      title: 'Configurações',
      subtitle: 'Preferências gerais',
      color: '#6B7280',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={['#1a1a1a', '#2a1a4a']} style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="white" />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{user.level}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Cashback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meu Cashback</Text>
        <View style={styles.cashbackContainer}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.cashbackCard}
          >
            <View style={styles.cashbackHeader}>
              <View style={styles.cashbackIcon}>
                <Coins size={24} color="white" />
              </View>
              <Text style={styles.cashbackTitle}>Saldo Disponível</Text>
            </View>
            <Text style={styles.cashbackAmount}>
              {user.stats.availableCashback}
            </Text>
            <Text style={styles.cashbackTotal}>
              Total acumulado: {user.stats.totalCashback}
            </Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Resgatar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const handlePress = () => {
              if (item.title === 'Pagamentos') {
                router.push('/payments');
              } else if (item.title === 'Notificações') {
                router.push('/notifications');
              } else if (item.title === 'Privacidade') {
                router.push('/privacy');
              }
            };

            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={handlePress}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <Icon size={20} color={item.color} />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#6B7280" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>Bit for Kids 1.0.0</Text>
        <Text style={styles.appCopyright}>
          © 2025 Bit for Kids. Todos os direitos reservados.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  menuList: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 5,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  logoutButton: {
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
  logoutText: {
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
  cashbackContainer: {
    marginBottom: 8,
  },
  cashbackCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  cashbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cashbackIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  cashbackAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cashbackTotal: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
