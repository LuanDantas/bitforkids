import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, BookOpen, DollarSign, TrendingUp, Plus, ChartBar as BarChart3, Settings, FileText, UserCheck, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdminScreen() {
  const { fonts } = useTheme();
  const [stats] = useState({
    totalUsers: 1250,
    activeCourses: 12,
    monthlyRevenue: 48750,
    newSignups: 89,
  });

  const recentActivity = [
    {
      id: 1,
      type: 'user',
      message: 'João Silva completou o curso "Bitcoin Básico"',
      time: '2 min atrás',
    },
    {
      id: 2,
      type: 'payment',
      message: 'Nova compra: R$ 199,90 - Curso Trading Avançado',
      time: '5 min atrás',
    },
    {
      id: 3,
      type: 'course',
      message: 'Curso "DeFi Essencials" foi publicado',
      time: '1 hora atrás',
    },
    {
      id: 4,
      type: 'user',
      message: '5 novos usuários se cadastraram',
      time: '2 horas atrás',
    },
  ];

  const quickActions = [
    {
      title: 'Novo Curso',
      subtitle: 'Criar curso',
      icon: Plus,
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
    },
    {
      title: 'Usuários',
      subtitle: 'Gerenciar usuários',
      icon: Users,
      color: '#3B82F6',
      gradient: ['#3B82F6', '#1D4ED8'],
    },
    {
      title: 'Relatórios',
      subtitle: 'Ver analytics',
      icon: BarChart3,
      color: '#6366f1',
      gradient: ['#4f46e5', '#3b82f6'],
    },
    {
      title: 'Configurações',
      subtitle: 'Sistema',
      icon: Settings,
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return UserCheck;
      case 'payment':
        return DollarSign;
      case 'course':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return '#10B981';
      case 'payment':
        return '#3B82F6';
      case 'course':
        return '#6366f1';
      default:
        return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>Painel Administrativo</Text>
        <Text style={[styles.headerSubtitle, { fontFamily: fonts.body }]}>
          Gerencie sua plataforma de ensino
        </Text>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users size={24} color="#3B82F6" />
            </View>
            <Text style={[styles.statValue, { fontFamily: fonts.display }]}>{stats.totalUsers.toLocaleString()}</Text>
            <Text style={[styles.statLabel, { fontFamily: fonts.body }]}>Usuários Totais</Text>
            <Text style={[styles.statChange, { fontFamily: fonts.bodySemiBold }]}>+{stats.newSignups} este mês</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <BookOpen size={24} color="#10B981" />
            </View>
            <Text style={[styles.statValue, { fontFamily: fonts.display }]}>{stats.activeCourses}</Text>
            <Text style={[styles.statLabel, { fontFamily: fonts.body }]}>Cursos Ativos</Text>
            <Text style={[styles.statChange, { fontFamily: fonts.bodySemiBold }]}>+2 esta semana</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <DollarSign size={24} color="#6366f1" />
            </View>
            <Text style={[styles.statValue, { fontFamily: fonts.display }]}>
              R$ {(stats.monthlyRevenue / 1000).toFixed(1)}k
            </Text>
            <Text style={[styles.statLabel, { fontFamily: fonts.body }]}>Receita Mensal</Text>
            <Text style={[styles.statChange, { fontFamily: fonts.bodySemiBold }]}>+15.3% vs mês anterior</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={24} color="#F59E0B" />
            </View>
            <Text style={[styles.statValue, { fontFamily: fonts.display }]}>87%</Text>
            <Text style={[styles.statLabel, { fontFamily: fonts.body }]}>Taxa Conclusão</Text>
            <Text style={[styles.statChange, { fontFamily: fonts.bodySemiBold }]}>+5% esta semana</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.display }]}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionIcon}
                >
                  <Icon size={24} color="white" />
                </LinearGradient>
                <Text style={[styles.actionTitle, { fontFamily: fonts.displaySemiBold }]}>{action.title}</Text>
                <Text style={[styles.actionSubtitle, { fontFamily: fonts.body }]}>{action.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: fonts.display }]}>Atividade Recente</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { fontFamily: fonts.bodySemiBold }]}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          {recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);
            
            return (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: `${color}20` }]}>
                  <Icon size={16} color={color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityMessage, { fontFamily: fonts.body }]}>{activity.message}</Text>
                  <Text style={[styles.activityTime, { fontFamily: fonts.secondaryMedium }]}>{activity.time}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Revenue Chart Placeholder */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.display }]}>Receita dos Últimos 7 Dias</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color="#6B7280" />
            <Text style={[styles.chartPlaceholderText, { fontFamily: fonts.body }]}>
              Gráfico de receita seria exibido aqui
            </Text>
          </View>
        </View>
      </View>

      {/* Top Courses */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontFamily: fonts.display }]}>Cursos Mais Populares</Text>
        <View style={styles.coursesList}>
          {[
            { name: 'Fundamentos do Bitcoin', sales: 234, revenue: 'R$ 34.866,00' },
            { name: 'Trading Avançado', sales: 156, revenue: 'R$ 46.784,00' },
            { name: 'DeFi Essenciais', sales: 89, revenue: 'R$ 17.811,00' },
          ].map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <View style={styles.courseInfo}>
                <Text style={[styles.courseName, { fontFamily: fonts.bodySemiBold }]}>{course.name}</Text>
                <Text style={[styles.courseStats, { fontFamily: fonts.body }]}>
                  {course.sales} vendas • {course.revenue}
                </Text>
              </View>
              <View style={styles.coursePosition}>
                <Text style={[styles.positionText, { fontFamily: fonts.bodyBold }]}>#{index + 1}</Text>
              </View>
            </View>
          ))}
        </View>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#10B981',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  coursesList: {
    gap: 12,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  courseStats: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  coursePosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionText: {
    fontSize: 14,
    color: 'white',
  },
});