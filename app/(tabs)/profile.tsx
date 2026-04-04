import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AnimatedPressable from '@/components/AnimatedPressable';
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

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const { user: authUser, logout } = useUser();
  const [user] = useState({
    name: authUser?.name || 'Usuário',
    email: authUser?.email || '',
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
      title: t('profile.menuPaymentsTitle'),
      subtitle: t('profile.menuPaymentsSubtitle'),
      color: '#10B981',
    },
    {
      icon: Bell,
      title: t('profile.menuNotificationsTitle'),
      subtitle: t('profile.menuNotificationsSubtitle'),
      color: '#3B82F6',
    },
    {
      icon: Shield,
      title: t('profile.menuPrivacyTitle'),
      subtitle: t('profile.menuPrivacySubtitle'),
      color: '#6366f1',
    },
    {
      icon: Settings,
      title: t('profile.menuSettingsTitle'),
      subtitle: t('profile.menuSettingsSubtitle'),
      color: '#6B7280',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={isDark ? ['#0f172a', '#1e293b'] as const : ['#4f46e5', '#3b82f6'] as const} style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="white" />
            </View>
            <AnimatedPressable style={styles.editButton}>
              <Edit size={16} color="white" />
            </AnimatedPressable>
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { fontFamily: fonts.display }]}>{user.name}</Text>
            <Text style={[styles.userEmail, { color: 'rgba(255,255,255,0.8)', fontFamily: fonts.body }]}>{user.email}</Text>
            <View style={[styles.levelBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={[styles.levelText, { color: '#FFFFFF', fontFamily: fonts.secondaryMedium }]}>{user.level}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Cashback Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>{t('profile.cashbackTitle')}</Text>
        <View style={styles.cashbackContainer}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.cashbackCard}
          >
            <View style={styles.cashbackHeader}>
              <View style={styles.cashbackIcon}>
                <Coins size={24} color="white" />
              </View>
              <Text style={[styles.cashbackTitle, { fontFamily: fonts.bodySemiBold }]}>{t('profile.cashbackAvailable')}</Text>
            </View>
            <Text style={[styles.cashbackAmount, { fontFamily: fonts.display }]}>
              {user.stats.availableCashback}
            </Text>
            <Text style={[styles.cashbackTotal, { fontFamily: fonts.body }]}>
              {t('profile.cashbackTotal')} {user.stats.totalCashback}
            </Text>
            <AnimatedPressable style={styles.withdrawButton}>
              <Text style={[styles.withdrawText, { fontFamily: fonts.bodyBold }]}>{t('profile.cashbackWithdraw')}</Text>
            </AnimatedPressable>
          </LinearGradient>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>{t('profile.settingsSection')}</Text>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const routes = ['/payments', '/notifications', '/privacy', '/settings'] as const;
            const handlePress = () => {
              router.push(routes[index] as any);
            };

            return (
              <AnimatedPressable
                key={index}
                style={[styles.menuItem, { backgroundColor: colors.card }, menuShadow]}
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
                    <Text style={[styles.menuTitle, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{item.title}</Text>
                    <Text style={[styles.menuSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>{item.subtitle}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </AnimatedPressable>
            );
          })}
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <AnimatedPressable
          style={[styles.logoutButton, { backgroundColor: colors.card }, menuShadow]}
          onPress={() => { logout(); router.replace('/auth/login'); }}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={[styles.logoutText, { fontFamily: fonts.bodySemiBold }]}>{t('profile.logout')}</Text>
        </AnimatedPressable>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={[styles.appVersion, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('profile.appVersion')}</Text>
        <Text style={[styles.appCopyright, { color: colors.textSecondary, fontFamily: fonts.body }]}>
          {t('profile.appCopyright')}
        </Text>
      </View>
    </ScrollView>
  );
}

const menuShadow = Platform.select({
  ios: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  android: { elevation: 4 },
  default: {},
}) as any;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#6366f1',
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
    borderColor: 'rgba(255,255,255,0.3)',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
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
    color: '#6366f1',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    marginBottom: 10,
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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    gap: 8,
  },
  logoutText: {
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
    color: 'white',
  },
  cashbackAmount: {
    fontSize: 32,
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
    color: 'white',
  },
});
