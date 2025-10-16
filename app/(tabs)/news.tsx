import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  TrendingUp,
  Clock,
  ExternalLink,
  Filter,
  Search,
  Bookmark,
  Share,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react-native';

export default function NewsScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = [
    'Todas',
    'Bitcoin',
    'Ethereum',
    'DeFi',
    'NFT',
    'Regulação',
    'Mercado',
    'Tecnologia',
  ];

  const newsData = [
    {
      id: 1,
      title: 'Bitcoin atinge nova máxima histórica de $73.000',
      summary: 'A principal criptomoeda do mundo quebra recordes após aprovação de novos ETFs institucionais.',
      category: 'Bitcoin',
      author: 'CryptoNews',
      publishedAt: '2 horas atrás',
      readTime: '3 min',
      views: 15420,
      trend: 'up',
      trendValue: '+12.5%',
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: false,
      isPremium: false,
    },
    {
      id: 2,
      title: 'Ethereum 2.0: Staking atinge 32 milhões de ETH',
      summary: 'A rede Ethereum continua crescendo com mais validadores participando do consenso proof-of-stake.',
      category: 'Ethereum',
      author: 'BlockchainToday',
      publishedAt: '4 horas atrás',
      readTime: '5 min',
      views: 8930,
      trend: 'up',
      trendValue: '+8.2%',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: true,
      isPremium: false,
    },
    {
      id: 3,
      title: 'Brasil regulamenta uso de criptomoedas como meio de pagamento',
      summary: 'Nova legislação estabelece diretrizes claras para uso comercial de ativos digitais no país.',
      category: 'Regulação',
      author: 'CriptoJurídico',
      publishedAt: '6 horas atrás',
      readTime: '7 min',
      views: 12150,
      trend: 'neutral',
      trendValue: '0%',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: false,
      isPremium: true,
    },
    {
      id: 4,
      title: 'DeFi: Total Value Locked ultrapassa $200 bilhões',
      summary: 'Protocolos de finanças descentralizadas continuam atraindo capital institucional e retail.',
      category: 'DeFi',
      author: 'DeFiPulse',
      publishedAt: '8 horas atrás',
      readTime: '4 min',
      views: 6780,
      trend: 'up',
      trendValue: '+15.3%',
      image: 'https://images.pexels.com/photos/8370755/pexels-photo-8370755.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: false,
      isPremium: false,
    },
    {
      id: 5,
      title: 'NFTs: Mercado de arte digital movimenta $2.5 bi em janeiro',
      summary: 'Coleções de arte digital continuam populares apesar da volatilidade do mercado cripto.',
      category: 'NFT',
      author: 'NFTStats',
      publishedAt: '12 horas atrás',
      readTime: '6 min',
      views: 4520,
      trend: 'down',
      trendValue: '-5.8%',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: true,
      isPremium: false,
    },
    {
      id: 6,
      title: 'Análise Técnica: Bitcoin pode testar suporte de $65.000',
      summary: 'Especialistas apontam níveis críticos de suporte e resistência para as próximas semanas.',
      category: 'Mercado',
      author: 'TradingView',
      publishedAt: '1 dia atrás',
      readTime: '8 min',
      views: 9840,
      trend: 'down',
      trendValue: '-3.2%',
      image: 'https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg?auto=compress&cs=tinysrgb&w=400',
      isBookmarked: false,
      isPremium: true,
    },
  ];

  const filteredNews = selectedCategory === 'Todas' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return ArrowUp;
      case 'down':
        return ArrowDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleBookmark = (newsId: number) => {
    // Handle bookmark functionality
    console.log('Bookmark news:', newsId);
  };

  const handleShare = (newsId: number) => {
    // Handle share functionality
    console.log('Share news:', newsId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Notícias Cripto</Text>
        <Text style={styles.headerSubtitle}>
          Fique por dentro do mundo das criptomoedas
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Search size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: colors.textSecondary },
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News List */}
      <ScrollView 
        style={styles.newsList} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Featured News */}
        {filteredNews.length > 0 && (
          <TouchableOpacity 
            style={[styles.featuredNews, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(`/news/${filteredNews[0].id}`)}
          >
            <View style={styles.featuredImageContainer}>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.8)', 'rgba(59, 130, 246, 0.8)']}
                style={styles.featuredImageOverlay}
              >
                <TrendingUp size={32} color="white" />
              </LinearGradient>
              {filteredNews[0].isPremium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              )}
            </View>
            
            <View style={styles.featuredContent}>
              <View style={styles.featuredHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>
                    {filteredNews[0].category}
                  </Text>
                </View>
                <View style={styles.trendContainer}>
                  {(() => {
                    const TrendIcon = getTrendIcon(filteredNews[0].trend);
                    return (
                      <TrendIcon 
                        size={14} 
                        color={getTrendColor(filteredNews[0].trend)} 
                      />
                    );
                  })()}
                  <Text style={[styles.trendText, { color: getTrendColor(filteredNews[0].trend) }]}>
                    {filteredNews[0].trendValue}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.featuredTitle, { color: colors.text }]}>
                {filteredNews[0].title}
              </Text>
              <Text style={[styles.featuredSummary, { color: colors.textSecondary }]}>
                {filteredNews[0].summary}
              </Text>
              
              <View style={styles.featuredMeta}>
                <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                  {filteredNews[0].author} • {filteredNews[0].publishedAt}
                </Text>
                <View style={styles.metaActions}>
                  <View style={styles.metaItem}>
                    <Eye size={14} color={colors.textTertiary} />
                    <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                      {filteredNews[0].views.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={colors.textTertiary} />
                    <Text style={[styles.metaText, { color: colors.textTertiary }]}>
                      {filteredNews[0].readTime}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Regular News Items */}
        {filteredNews.slice(1).map((news) => {
          const TrendIcon = getTrendIcon(news.trend);
          return (
            <TouchableOpacity 
              key={news.id} 
              style={[styles.newsItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/news/${news.id}`)}
            >
              <View style={styles.newsImageContainer}>
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.6)', 'rgba(59, 130, 246, 0.6)']}
                  style={styles.newsImageOverlay}
                >
                  <ExternalLink size={20} color="white" />
                </LinearGradient>
                {news.isPremium && (
                  <View style={styles.premiumBadgeSmall}>
                    <Text style={styles.premiumTextSmall}>P</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.newsContent}>
                <View style={styles.newsHeader}>
                  <View style={[styles.categoryBadgeSmall, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.categoryBadgeTextSmall, { color: colors.primary }]}>
                      {news.category}
                    </Text>
                  </View>
                  <View style={styles.trendContainer}>
                    <TrendIcon size={12} color={getTrendColor(news.trend)} />
                    <Text style={[styles.trendTextSmall, { color: getTrendColor(news.trend) }]}>
                      {news.trendValue}
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
                  {news.title}
                </Text>
                <Text style={[styles.newsSummary, { color: colors.textSecondary }]} numberOfLines={2}>
                  {news.summary}
                </Text>
                
                <View style={styles.newsMeta}>
                  <Text style={[styles.metaTextSmall, { color: colors.textTertiary }]}>
                    {news.author} • {news.publishedAt}
                  </Text>
                  <View style={styles.newsActions}>
                    <TouchableOpacity 
                      style={styles.actionIcon}
                      onPress={() => handleBookmark(news.id)}
                    >
                      <Bookmark 
                        size={16} 
                        color={news.isBookmarked ? colors.warning : colors.textTertiary}
                        fill={news.isBookmarked ? colors.warning : 'transparent'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionIcon}
                      onPress={() => handleShare(news.id)}
                    >
                      <Share size={16} color={colors.textTertiary} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.newsStats}>
                  <View style={styles.statItem}>
                    <Eye size={12} color={colors.textTertiary} />
                    <Text style={[styles.statText, { color: colors.textTertiary }]}>
                      {news.views.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={12} color={colors.textTertiary} />
                    <Text style={[styles.statText, { color: colors.textTertiary }]}>
                      {news.readTime}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Load More Button */}
        <TouchableOpacity style={[styles.loadMoreButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.loadMoreText, { color: colors.primary }]}>
            Carregar mais notícias
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginLeft: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: 'white',
  },
  newsList: {
    flex: 1,
    padding: 20,
  },
  featuredNews: {
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  featuredImageOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  featuredContent: {
    padding: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 26,
  },
  featuredSummary: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
  },
  metaActions: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newsItem: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  newsImageContainer: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  newsImageOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadgeSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumTextSmall: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  newsContent: {
    flex: 1,
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryBadgeTextSmall: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendTextSmall: {
    fontSize: 10,
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 20,
  },
  newsSummary: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaTextSmall: {
    fontSize: 12,
  },
  newsActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
  newsStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  loadMoreButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
  },
  loadMoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
});