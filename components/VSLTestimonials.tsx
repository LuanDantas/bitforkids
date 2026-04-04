import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Star, Quote } from 'lucide-react-native';

export default function VSLTestimonials() {
  const { colors, fonts } = useTheme();

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Mãe de João, 12 anos',
      text: 'Meu filho sempre teve dificuldade com matemática, mas depois do BitforKids ele não só melhorou as notas como agora me ensina sobre investimentos! Incrível como ele se interessou.',
      rating: 5,
      location: 'São Paulo, SP',
    },
    {
      name: 'Carlos Santos',
      role: 'Pai de Ana, 15 anos',
      text: 'Como pai, sempre me preocupei com o futuro financeiro da minha filha. O BitforKids me deu a tranquilidade de saber que ela está aprendendo sobre dinheiro de forma segura e educativa.',
      rating: 5,
      location: 'Rio de Janeiro, RJ',
    },
    {
      name: 'Ana Costa',
      role: 'Mãe de Pedro, 10 anos',
      text: 'Pedro sempre foi muito curioso sobre Bitcoin porque ouvia falar na TV. Agora ele entende tudo de forma didática e até me explica como funciona o blockchain!',
      rating: 5,
      location: 'Belo Horizonte, MG',
    },
    {
      name: 'Roberto Lima',
      role: 'Pai de Sofia, 14 anos',
      text: 'A metodologia é fantástica! Sofia não só aprendeu sobre criptomoedas como desenvolveu uma mentalidade de poupança que eu nunca consegui ensinar antes.',
      rating: 5,
      location: 'Porto Alegre, RS',
    },
    {
      name: 'Patricia Oliveira',
      role: 'Mãe de Lucas, 11 anos',
      text: 'Lucas sempre foi muito tímido, mas na comunidade VIP ele fez amigos que compartilham os mesmos interesses. Ver ele confiante falando sobre investimentos é emocionante.',
      rating: 5,
      location: 'Salvador, BA',
    },
    {
      name: 'Fernando Alves',
      role: 'Pai de Isabella, 13 anos',
      text: 'O suporte é excepcional! Sempre que tenho dúvidas sobre como abordar algum tema com minha filha, a equipe está pronta para ajudar. Recomendo de olhos fechados.',
      rating: 5,
      location: 'Fortaleza, CE',
    },
  ];

  const stats = [
    { number: '12.500+', label: 'Famílias Atendidas' },
    { number: '4.9/5', label: 'Avaliação Média' },
    { number: '94%', label: 'Melhoria nas Notas' },
    { number: '87%', label: 'Maior Interesse em Estudos' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.display }]}>
          O que dizem os pais sobre o BitforKids
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}>
          Mais de 12.500 famílias já transformaram a educação financeira dos
          seus filhos
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.primary, fontFamily: fonts.display }]}>
                {stat.number}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials Grid */}
      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.testimonialsContainer}>
            {testimonials.map((testimonial, index) => (
              <View
                key={index}
                style={[
                  styles.testimonialCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.testimonialHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={[styles.avatarText, { fontFamily: fonts.bodyBold }]}>
                      {testimonial.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.testimonialInfo}>
                    <Text
                      style={[styles.testimonialName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}
                    >
                      {testimonial.name}
                    </Text>
                    <Text
                      style={[
                        styles.testimonialRole,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {testimonial.role}
                    </Text>
                    <Text
                      style={[
                        styles.testimonialLocation,
                        { color: colors.textSecondary, fontFamily: fonts.secondaryMedium },
                      ]}
                    >
                      {testimonial.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>

                <View style={styles.quoteContainer}>
                  <Quote size={20} color={colors.primary} />
                  <Text
                    style={[
                      styles.testimonialText,
                      { color: colors.textSecondary, fontFamily: fonts.body },
                    ]}
                  >
                    {testimonial.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Success Stories */}
      <View style={styles.section}>
        <Text style={[styles.storiesTitle, { color: colors.text, fontFamily: fonts.display }]}>
          Histórias de Sucesso Reais
        </Text>

        <View style={styles.storiesContainer}>
          <View
            style={[
              styles.storyCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.1)']}
              style={styles.storyGradient}
            >
              <Text style={[styles.storyTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                João, 12 anos
              </Text>
              <Text
                style={[styles.storySubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                De notas baixas em matemática para explicar Bitcoin para a
                família
              </Text>
              <Text style={[styles.storyText, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                "João sempre teve dificuldade com matemática, mas depois de 3
                meses no BitforKids, ele não só melhorou suas notas como agora
                me ensina sobre investimentos. Ele até criou uma 'carteira
                digital' para guardar suas economias!"
              </Text>
              <Text
                style={[styles.storyAuthor, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}
              >
                - Maria Silva, mãe de João
              </Text>
            </LinearGradient>
          </View>

          <View
            style={[
              styles.storyCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)']}
              style={styles.storyGradient}
            >
              <Text style={[styles.storyTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                Sofia, 14 anos
              </Text>
              <Text
                style={[styles.storySubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]}
              >
                Desenvolveu mentalidade de poupança e planejamento financeiro
              </Text>
              <Text style={[styles.storyText, { color: colors.textSecondary, fontFamily: fonts.body }]}>
                "Sofia sempre gastava toda a mesada no primeiro dia. Agora ela
                faz orçamentos, planeja suas compras e até me ajuda a organizar
                as finanças da família. O BitforKids mudou completamente nossa
                relação com o dinheiro."
              </Text>
              <Text
                style={[styles.storyAuthor, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}
              >
                - Roberto Lima, pai de Sofia
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Trust Indicators */}
      <View style={styles.section}>
        <Text style={[styles.trustTitle, { color: colors.text, fontFamily: fonts.display }]}>
          Por que os pais confiam no BitforKids?
        </Text>

        <View style={styles.trustContainer}>
          <View
            style={[
              styles.trustItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.trustEmoji}>🛡️</Text>
            <Text style={[styles.trustItemTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              Conteúdo Seguro
            </Text>
            <Text
              style={[styles.trustItemText, { color: colors.textSecondary, fontFamily: fonts.body }]}
            >
              Todo conteúdo é aprovado por educadores e psicólogos infantis
            </Text>
          </View>

          <View
            style={[
              styles.trustItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.trustEmoji}>🎓</Text>
            <Text style={[styles.trustItemTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              Metodologia Comprovada
            </Text>
            <Text
              style={[styles.trustItemText, { color: colors.textSecondary, fontFamily: fonts.body }]}
            >
              Baseada em estudos científicos sobre educação financeira infantil
            </Text>
          </View>

          <View
            style={[
              styles.trustItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.trustEmoji}>👨‍👩‍👧‍👦</Text>
            <Text style={[styles.trustItemTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              Comunidade Apoiadora
            </Text>
            <Text
              style={[styles.trustItemText, { color: colors.textSecondary, fontFamily: fonts.body }]}
            >
              Mais de 12.500 famílias compartilhando experiências e dicas
            </Text>
          </View>

          <View
            style={[
              styles.trustItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={styles.trustEmoji}>✅</Text>
            <Text style={[styles.trustItemTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              Garantia Total
            </Text>
            <Text
              style={[styles.trustItemText, { color: colors.textSecondary, fontFamily: fonts.body }]}
            >
              30 dias para testar sem compromisso. Se não gostar, devolvemos seu
              dinheiro
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  testimonialsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
  },
  testimonialCard: {
    width: 300,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: 'white',
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    marginBottom: 2,
  },
  testimonialRole: {
    fontSize: 14,
    marginBottom: 2,
  },
  testimonialLocation: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
  storiesTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  storiesContainer: {
    gap: 16,
  },
  storyCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  storyGradient: {
    padding: 20,
  },
  storyTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  storySubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  storyAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  trustTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  trustContainer: {
    gap: 16,
  },
  trustItem: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  trustEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  trustItemTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  trustItemText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
