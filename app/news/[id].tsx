import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  Share,
  Bookmark,
  Heart,
  MessageCircle,
  Eye,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Send,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  User,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'João Silva',
      avatar: 'JS',
      comment: 'Excelente análise! Bitcoin realmente está mostrando força neste momento.',
      timestamp: '2 horas atrás',
      likes: 12,
      dislikes: 1,
      userLiked: false,
      userDisliked: false,
      replies: [
        {
          id: 11,
          user: 'Maria Costa',
          avatar: 'MC',
          comment: 'Concordo! O momentum está muito positivo.',
          timestamp: '1 hora atrás',
          likes: 5,
          dislikes: 0,
          userLiked: false,
          userDisliked: false,
        }
      ]
    },
    {
      id: 2,
      user: 'Carlos Lima',
      avatar: 'CL',
      comment: 'Interessante ver como os ETFs estão impactando o preço. Será que é sustentável?',
      timestamp: '3 horas atrás',
      likes: 8,
      dislikes: 2,
      userLiked: false,
      userDisliked: false,
      replies: []
    },
    {
      id: 3,
      user: 'Ana Santos',
      avatar: 'AS',
      comment: 'Ótima matéria! Vocês sempre trazem conteúdo de qualidade.',
      timestamp: '4 horas atrás',
      likes: 15,
      dislikes: 0,
      userLiked: true,
      userDisliked: false,
      replies: []
    }
  ]);

  // Mock news data - in real app, this would come from API
  const newsData = {
    1: {
      id: 1,
      title: 'Bitcoin atinge nova máxima histórica de $73.000',
      summary: 'A principal criptomoeda do mundo quebra recordes após aprovação de novos ETFs institucionais.',
      content: `
A principal criptomoeda do mundo, Bitcoin, atingiu hoje uma nova máxima histórica de $73.000, superando o recorde anterior estabelecido em 2021. Este movimento representa um aumento de mais de 12% nas últimas 24 horas e consolida a recuperação do mercado de criptomoedas.

## Fatores que impulsionaram a alta

O movimento de alta do Bitcoin pode ser atribuído a diversos fatores fundamentais:

### 1. Aprovação de ETFs Institucionais
A recente aprovação de novos ETFs (Exchange Traded Funds) de Bitcoin pela SEC (Securities and Exchange Commission) dos Estados Unidos tem atraído bilhões de dólares em investimentos institucionais. Grandes gestoras como BlackRock, Fidelity e Vanguard estão oferecendo produtos que permitem exposição ao Bitcoin de forma regulamentada.

### 2. Adoção Corporativa
Empresas como MicroStrategy, Tesla e Square continuam acumulando Bitcoin em seus balanços, demonstrando confiança na criptomoeda como reserva de valor digital. Recentemente, a MicroStrategy anunciou a compra de mais 5.000 Bitcoins.

### 3. Escassez Programada
Com o halving do Bitcoin programado para 2024, a redução na oferta de novas moedas está criando pressão de compra no mercado. Historicamente, os halvings têm sido catalisadores para grandes movimentos de alta.

## Análise Técnica

Do ponto de vista técnico, o Bitcoin rompeu importantes resistências:

- **Resistência de $70.000**: Superada com volume significativo
- **Médias móveis**: Todas as principais médias estão alinhadas de forma bullish
- **RSI**: Indica força, mas ainda não está em território de sobrecompra
- **Volume**: Aumento significativo confirma a legitimidade do movimento

## Perspectivas para o Futuro

Analistas do mercado estão otimistas quanto às perspectivas do Bitcoin:

**"Estamos vendo uma confluência de fatores positivos que podem levar o Bitcoin a patamares ainda mais altos. A próxima resistência importante está em $80.000"**, comenta Maria Santos, analista sênior da CryptoResearch.

### Próximos Níveis de Resistência:
- $75.000 - Resistência psicológica
- $80.000 - Extensão de Fibonacci
- $85.000 - Projeção técnica baseada em padrões históricos

## Impacto no Mercado de Altcoins

O movimento do Bitcoin também está beneficiando outras criptomoedas:

- **Ethereum**: +8.5% nas últimas 24 horas
- **Solana**: +12.3% no mesmo período  
- **Cardano**: +9.8% de valorização

## Considerações de Risco

Apesar do otimismo, é importante considerar os riscos:

1. **Volatilidade**: O Bitcoin continua sendo um ativo volátil
2. **Regulamentação**: Mudanças regulatórias podem impactar o preço
3. **Correções técnicas**: Movimentos de alta podem ser seguidos por correções

## Conclusão

A nova máxima histórica do Bitcoin representa um marco importante para o mercado de criptomoedas. Com o suporte de investidores institucionais e a crescente adoção, o Bitcoin continua consolidando sua posição como "ouro digital".

Investidores devem manter cautela e sempre fazer suas próprias pesquisas antes de tomar decisões de investimento.
      `,
      category: 'Bitcoin',
      author: 'CryptoNews',
      authorBio: 'Equipe especializada em análise de mercado de criptomoedas com mais de 5 anos de experiência.',
      publishedAt: '2 horas atrás',
      readTime: '8 min',
      views: 15420,
      likes: 234,
      comments: 45,
      shares: 67,
      trend: 'up',
      trendValue: '+12.5%',
      tags: ['Bitcoin', 'ETF', 'Máxima Histórica', 'Análise Técnica'],
      relatedNews: [
        { id: 2, title: 'Ethereum 2.0: Staking atinge 32 milhões de ETH', category: 'Ethereum' },
        { id: 4, title: 'DeFi: Total Value Locked ultrapassa $200 bilhões', category: 'DeFi' },
      ]
    }
  };

  const news = newsData[id as keyof typeof newsData] || newsData[1];

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

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    Alert.alert(
      bookmarked ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      bookmarked ? 'Notícia removida da sua lista de favoritos' : 'Notícia salva na sua lista de favoritos'
    );
  };

  const handleShare = () => {
    Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento será implementada');
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'Você',
        avatar: 'VC',
        comment: commentText.trim(),
        timestamp: 'agora',
        likes: 0,
        dislikes: 0,
        userLiked: false,
        userDisliked: false,
        replies: []
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
    }
  };

  const handleCommentLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            userLiked: !comment.userLiked,
            userDisliked: false,
            likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
            dislikes: comment.userDisliked ? comment.dislikes - 1 : comment.dislikes
          };
        } else if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId ? {
                ...reply,
                userLiked: !reply.userLiked,
                userDisliked: false,
                likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
                dislikes: reply.userDisliked ? reply.dislikes - 1 : reply.dislikes
              } : reply
            )
          };
        }
        return comment;
      })
    );
  };

  const TrendIcon = getTrendIcon(news.trend);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleBookmark}
            >
              <Bookmark 
                size={20} 
                color={bookmarked ? "#F59E0B" : "white"} 
                fill={bookmarked ? "#F59E0B" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Article Header */}
        <View style={[styles.articleHeader, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.categoryContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.categoryText, { color: colors.primary }]}>{news.category}</Text>
            </View>
            <View style={styles.trendContainer}>
              <TrendIcon size={14} color={getTrendColor(news.trend)} />
              <Text style={[styles.trendText, { color: getTrendColor(news.trend) }]}>
                {news.trendValue}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>{news.title}</Text>
          <Text style={[styles.summary, { color: colors.textSecondary }]}>{news.summary}</Text>
          
          <View style={styles.articleMeta}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorInitial}>CN</Text>
              </View>
              <View style={styles.authorDetails}>
                <Text style={[styles.authorName, { color: colors.text }]}>{news.author}</Text>
                <Text style={[styles.publishDate, { color: colors.textTertiary }]}>
                  {news.publishedAt} • {news.readTime} de leitura
                </Text>
              </View>
            </View>
            
            <View style={styles.articleStats}>
              <View style={styles.statItem}>
                <Eye size={14} color={colors.textTertiary} />
                <Text style={[styles.statText, { color: colors.textTertiary }]}>
                  {news.views.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <MessageCircle size={14} color={colors.textTertiary} />
                <Text style={[styles.statText, { color: colors.textTertiary }]}>
                  {news.comments}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Article Content */}
        <View style={[styles.articleContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.contentText, { color: colors.text }]}>
            {news.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <Text key={index} style={[styles.heading2, { color: colors.text }]}>
                    {paragraph.replace('## ', '')}{'\n\n'}
                  </Text>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <Text key={index} style={[styles.heading3, { color: colors.text }]}>
                    {paragraph.replace('### ', '')}{'\n\n'}
                  </Text>
                );
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <Text key={index} style={[styles.boldText, { color: colors.text }]}>
                    {paragraph.replace(/\*\*/g, '')}{'\n\n'}
                  </Text>
                );
              } else if (paragraph.startsWith('- ')) {
                return (
                  <Text key={index} style={[styles.listItem, { color: colors.textSecondary }]}>
                    • {paragraph.replace('- ', '')}{'\n'}
                  </Text>
                );
              } else if (paragraph.trim()) {
                return (
                  <Text key={index} style={[styles.paragraph, { color: colors.textSecondary }]}>
                    {paragraph}{'\n\n'}
                  </Text>
                );
              }
              return null;
            })}
          </Text>
        </View>

        {/* Tags */}
        <View style={[styles.tagsSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.tagsTitle, { color: colors.text }]}>Tags:</Text>
          <View style={styles.tagsContainer}>
            {news.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Engagement Actions */}
        <View style={[styles.engagementSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={handleLike}
          >
            <Heart 
              size={20} 
              color={liked ? "#EF4444" : colors.textSecondary} 
              fill={liked ? "#EF4444" : "transparent"}
            />
            <Text style={[styles.engagementText, { color: colors.textSecondary }]}>
              {liked ? news.likes + 1 : news.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.engagementButton}>
            <MessageCircle size={20} color={colors.textSecondary} />
            <Text style={[styles.engagementText, { color: colors.textSecondary }]}>
              {comments.length}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={handleShare}
          >
            <Share size={20} color={colors.textSecondary} />
            <Text style={[styles.engagementText, { color: colors.textSecondary }]}>
              {news.shares}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        <View style={[styles.commentsSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.commentsTitle, { color: colors.text }]}>
            Comentários ({comments.length})
          </Text>
          
          {/* Add Comment */}
          <View style={styles.addCommentContainer}>
            <View style={styles.commentAvatar}>
              <User size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={[styles.commentInput, { 
                  backgroundColor: colors.surface, 
                  borderColor: colors.border,
                  color: colors.text 
                }]}
                placeholder="Adicione um comentário..."
                placeholderTextColor={colors.textTertiary}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: colors.primary }]}
                onPress={handleCommentSubmit}
              >
                <Send size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Comments List */}
          <View style={styles.commentsList}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentInitial}>{comment.avatar}</Text>
                  </View>
                  <View style={styles.commentInfo}>
                    <Text style={[styles.commentUser, { color: colors.text }]}>{comment.user}</Text>
                    <Text style={[styles.commentTime, { color: colors.textTertiary }]}>
                      {comment.timestamp}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.commentMenu}>
                    <MoreHorizontal size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.commentText, { color: colors.textSecondary }]}>
                  {comment.comment}
                </Text>
                
                <View style={styles.commentActions}>
                  <TouchableOpacity
                    style={styles.commentAction}
                    onPress={() => handleCommentLike(comment.id)}
                  >
                    <ThumbsUp 
                      size={14} 
                      color={comment.userLiked ? colors.primary : colors.textTertiary}
                      fill={comment.userLiked ? colors.primary : "transparent"}
                    />
                    <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>
                      {comment.likes}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.commentAction}>
                    <ThumbsDown 
                      size={14} 
                      color={comment.userDisliked ? "#EF4444" : colors.textTertiary}
                      fill={comment.userDisliked ? "#EF4444" : "transparent"}
                    />
                    <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>
                      {comment.dislikes}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.commentAction}>
                    <MessageCircle size={14} color={colors.textTertiary} />
                    <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>
                      Responder
                    </Text>
                  </TouchableOpacity>
                </View>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <View style={styles.repliesContainer}>
                    {comment.replies.map((reply) => (
                      <View key={reply.id} style={styles.replyItem}>
                        <View style={styles.commentHeader}>
                          <View style={styles.replyAvatar}>
                            <Text style={styles.replyInitial}>{reply.avatar}</Text>
                          </View>
                          <View style={styles.commentInfo}>
                            <Text style={[styles.commentUser, { color: colors.text }]}>{reply.user}</Text>
                            <Text style={[styles.commentTime, { color: colors.textTertiary }]}>
                              {reply.timestamp}
                            </Text>
                          </View>
                        </View>
                        
                        <Text style={[styles.commentText, { color: colors.textSecondary }]}>
                          {reply.comment}
                        </Text>
                        
                        <View style={styles.commentActions}>
                          <TouchableOpacity
                            style={styles.commentAction}
                            onPress={() => handleCommentLike(reply.id, true, comment.id)}
                          >
                            <ThumbsUp 
                              size={12} 
                              color={reply.userLiked ? colors.primary : colors.textTertiary}
                              fill={reply.userLiked ? colors.primary : "transparent"}
                            />
                            <Text style={[styles.commentActionText, { color: colors.textTertiary }]}>
                              {reply.likes}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Related News */}
        <View style={[styles.relatedSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.relatedTitle, { color: colors.text }]}>Notícias Relacionadas</Text>
          {news.relatedNews.map((relatedNews) => (
            <TouchableOpacity
              key={relatedNews.id}
              style={styles.relatedItem}
              onPress={() => router.push(`/news/${relatedNews.id}`)}
            >
              <View style={[styles.relatedBadge, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.relatedBadgeText, { color: colors.primary }]}>
                  {relatedNews.category}
                </Text>
              </View>
              <Text style={[styles.relatedText, { color: colors.textSecondary }]}>
                {relatedNews.title}
              </Text>
              <ArrowLeft size={16} color={colors.textTertiary} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  articleHeader: {
    margin: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  categoryContainer: {
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
  categoryText: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 12,
  },
  articleStats: {
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
  articleContent: {
    margin: 20,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagsSection: {
    margin: 20,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  engagementSection: {
    margin: 20,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  engagementText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentsSection: {
    margin: 20,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  commentInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    gap: 16,
  },
  commentItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
  },
  commentMenu: {
    padding: 4,
  },
  commentInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    marginLeft: 52,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 52,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 12,
  },
  repliesContainer: {
    marginLeft: 52,
    marginTop: 12,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(139, 92, 246, 0.3)',
  },
  replyItem: {
    marginBottom: 12,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyInitial: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  relatedSection: {
    margin: 20,
    marginTop: 0,
    marginBottom: 40,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  relatedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  relatedBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  relatedText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
});