import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Shield,
} from 'lucide-react-native';

interface FAQ {
  q: string;
  a: string;
}

interface CourseData {
  title: string;
  subtitle: string;
  price: string;
  image: any;
  trailColor: readonly [string, string];
  trailLabel: string;
  sections: { title: string; emoji: string; items: string[] }[];
  extraContent: string[];
  faq: FAQ[];
}

const courseDataMap: Record<string, CourseData> = {
  '1': {
    title: 'Bitcoin — A Evolução do Dinheiro',
    subtitle: 'Do zero ao avançado. Construa um patrimônio que nenhum banco ou governo pode controlar.',
    price: '397',
    image: require('../../assets/images/curso-bitcoin.png'),
    trailColor: ['#F7931A', '#E2761B'] as const,
    trailLabel: 'Trilha 1 — Jornada do Iniciante',
    sections: [
      {
        title: '🟠 O que o Bitcoin pode fazer por você',
        emoji: '',
        items: [
          '🛡️ Blindagem contra a inflação — Proteja o poder de compra do seu dinheiro.',
          '📈 Reserva de valor de longo prazo — Construa uma base financeira sólida que atravessa gerações.',
          '💰 Poupança inconfiscável — Comece hoje, mesmo com pequenos aportes.',
          '🌍 Blindagem patrimonial — Retire parte do capital do sistema financeiro tradicional.',
          '🚫 Proteção contra bloqueios — Elimine a vulnerabilidade a bloqueios de contas.',
          '👨‍👩‍👧 Proteção familiar — Garanta um patrimônio soberano para sua família.',
          '🧓 Aposentadoria independente — Construa uma alternativa real para o seu futuro.',
          '📊 Inteligência de mercado — Entenda os ciclos do Bitcoin.',
          '🧠 Controle emocional — Evite decisões impulsivas.',
          '📅 Estratégia de longo prazo — Saia da especulação e torne-se um investidor.',
        ],
      },
      {
        title: '🔐 Autocustódia — o verdadeiro poder do Bitcoin',
        emoji: '',
        items: [
          'No mundo do Bitcoin existe uma regra fundamental: "Se você não controla suas chaves, você não controla seu dinheiro."',
          'O que são carteiras digitais (wallets)',
          'Como funcionam chaves públicas e privadas',
          'Como escolher a carteira ideal',
          'Como guardar seus Bitcoins com segurança absoluta',
          'Quando usar corretoras e quando retirar seus ativos',
        ],
      },
      {
        title: '📚 O que você vai aprender',
        emoji: '',
        items: [
          'O que é Bitcoin e por que ele foi criado',
          'Como funciona a blockchain',
          'Como funcionam as transações',
          'O papel da mineração',
          'Por que existem apenas 21 milhões de Bitcoins',
          'Como comprar Bitcoin com segurança',
          'Como usar corretoras e P2P',
          'Como armazenar Bitcoin corretamente em autocustódia',
          'Como utilizar chaves públicas e privadas',
          'Como evitar golpes e erros comuns',
          'Como entender os ciclos de mercado',
        ],
      },
      {
        title: '🏦 Torne-se seu próprio banco',
        emoji: '',
        items: [
          'Comprar Bitcoin com segurança',
          'Guardar seus ativos sob sua própria custódia',
          'Proteger seu patrimônio da inflação',
          'Evitar golpes e erros comuns',
          'Entender os ciclos do mercado',
          'Construir uma reserva financeira soberana',
          '🌍 Mover dinheiro globalmente',
          '🔐 Guardar patrimônio em autocustódia',
          '⚡ Utilizar uma rede financeira que funciona 24 horas por dia',
        ],
      },
      {
        title: '👣 Este curso foi criado para iniciantes',
        emoji: '',
        items: [
          '✔ Nunca comprou Bitcoin',
          '✔ Quer começar com pouco dinheiro',
          '✔ Busca segurança para proteger o patrimônio',
          '✔ Quer aprender de forma simples e prática',
        ],
      },
      {
        title: '👨‍👩‍👧 O Legado da Família',
        emoji: '',
        items: [
          'Proteção contra a desvalorização: O Bitcoin preserva valor através das décadas.',
          'Patrimônio Inconfiscável: Um ativo que não depende de governos ou bancos.',
          'Soberania Digital: Mais do que dinheiro, você transfere conhecimento.',
          'Imunidade Sistêmica: Proteção contra crises políticas e instabilidade.',
          'Um Ato de Amor e Responsabilidade: Uma ferramenta de liberdade financeira real.',
        ],
      },
    ],
    extraContent: [
      'Bitcoin: um novo sistema financeiro — O Bitcoin é uma rede financeira global que funciona sem bancos e sem autoridades centrais. Ele permite que qualquer pessoa armazene riqueza de forma independente, transfira dinheiro globalmente e participe de uma rede financeira aberta.',
      'Existe um limite matemático programado no código: apenas 21 milhões de Bitcoins existirão. Essa escassez digital é o que torna o Bitcoin um dos ativos mais sólidos da era digital.',
    ],
    faq: [
      { q: 'Preciso entender de tecnologia?', a: 'Não. O curso foi criado para pessoas que estão começando do zero.' },
      { q: 'Quanto preciso para começar?', a: 'Você pode comprar frações de Bitcoin. É possível começar com valores pequenos.' },
      { q: 'Como eu compro Bitcoin?', a: 'No curso você aprenderá diferentes formas: corretoras de criptomoedas e compra P2P (direto entre pessoas).' },
      { q: 'Bitcoin não é arriscado?', a: 'O curso ensina uma abordagem de longo prazo, mostrando como evitar erros comuns e construir reserva de valor com estratégia.' },
      { q: 'O que é autocustódia?', a: 'Autocustódia significa que somente você controla seus Bitcoins. No curso você aprenderá como utilizar carteiras digitais (wallets) para armazenar seus ativos com segurança.' },
      { q: 'Posso perder meus Bitcoins?', a: 'Se você aprender autocustódia corretamente, seus Bitcoins ficam sob seu controle. O curso ensina boas práticas de segurança.' },
      { q: 'O Bitcoin é legal?', a: 'Sim. O Bitcoin é uma tecnologia aberta utilizada por milhões de pessoas no mundo inteiro.' },
      { q: 'O curso ensina como guardar Bitcoin com segurança?', a: 'Sim. Você aprenderá como funcionam as carteiras digitais e como utilizá-las com segurança.' },
      { q: 'Bitcoin pode ser usado como reserva de valor?', a: 'Sim. O curso ensina como muitas pessoas utilizam Bitcoin como reserva de valor no longo prazo.' },
      { q: 'Posso acessar o curso de qualquer lugar?', a: 'Sim. O curso é 100% online e pode ser acessado de qualquer lugar do mundo.' },
      { q: 'Tem garantia?', a: 'Sim. Garantia total de 7 dias. Se não for para você, devolvo 100% do valor.' },
    ],
  },
  '2': {
    title: 'Ethereum, Dólar Digital e Finanças Descentralizadas',
    subtitle: 'Como usar criptomoedas no dia a dia e acessar o sistema financeiro da internet.',
    price: '397',
    image: require('../../assets/images/curso-ethereum.png'),
    trailColor: ['#627EEA', '#3B5998'] as const,
    trailLabel: 'Trilha 1 — Jornada do Iniciante',
    sections: [
      {
        title: '🌐 O sistema financeiro da internet',
        emoji: '',
        items: [
          'Se o Bitcoin representa o dinheiro da nova economia, a Ethereum representa o sistema financeiro onde esse dinheiro circula.',
          'A rede Ethereum permite criar aplicações financeiras que funcionam diretamente na blockchain através de smart contracts (contratos inteligentes).',
          'Exchanges descentralizadas, empréstimos digitais, aplicações financeiras globais, pagamentos internacionais e movimentação de dólar digital — tudo funcionando diretamente na internet.',
        ],
      },
      {
        title: '💵 O que você vai aprender',
        emoji: '',
        items: [
          '🔵 O que é a rede Ethereum e como funciona',
          '🔗 O que são smart contracts (contratos inteligentes)',
          '💵 O que são stablecoins (dólar digital)',
          '🏦 Diferença entre corretoras centralizadas e descentralizadas',
          '🌐 Como funcionam as finanças descentralizadas (DeFi)',
          '📱 Como utilizar criptomoedas no dia a dia',
          '🔐 Como utilizar autocustódia para controlar seus ativos',
          'Aplicações: Uniswap (corretora) e Aave (empréstimos)',
        ],
      },
      {
        title: '💳 Usando criptomoedas no dia a dia',
        emoji: '',
        items: [
          '💸 Enviar e receber dinheiro para qualquer lugar do mundo',
          '🌎 Realizar transferências internacionais rapidamente',
          '💳 Utilizar cartões vinculados a criptomoedas',
          '📲 Pagar contas e serviços utilizando dólar digital',
          '⚡ Movimentar dinheiro diretamente pela blockchain',
        ],
      },
      {
        title: '💵 Entenda o dólar digital (Stablecoins)',
        emoji: '',
        items: [
          'Stablecoins são criptomoedas pareadas ao valor do dólar.',
          '🌎 Enviar dólares para qualquer lugar do mundo',
          '⚡ Realizar transferências rápidas',
          '📱 Movimentar dinheiro diretamente pela blockchain',
          '💳 Realizar pagamentos digitais',
          'Exemplos: USDT, USDC, DAI',
        ],
      },
      {
        title: '🔐 Autocustódia: controle real sobre seu dinheiro',
        emoji: '',
        items: [
          'Como utilizar carteiras digitais (wallets)',
          'Como guardar seus ativos com segurança',
          'Como manter controle total sobre seus fundos',
          '🚫 Nenhum banco controla seu dinheiro',
          '🚫 Nenhum governo pode congelar seus ativos',
          '🚫 Ninguém pode acessar seus fundos sem sua autorização',
        ],
      },
      {
        title: '🎯 Ao final deste treinamento',
        emoji: '',
        items: [
          '✔ Entender como funciona a rede Ethereum',
          '✔ Utilizar dólar digital (stablecoins)',
          '✔ Enviar e receber dinheiro globalmente pela blockchain',
          '✔ Utilizar criptomoedas no dia a dia',
          '✔ Operar em corretoras centralizadas e descentralizadas',
          '✔ Acessar aplicações DeFi como Aave e Uniswap',
          '✔ Manter seus ativos em autocustódia com segurança',
        ],
      },
      {
        title: '👣 Para quem é este treinamento',
        emoji: '',
        items: [
          '💵 Quer aprender a usar dólar digital (stablecoins)',
          '🌎 Quer enviar e receber dinheiro globalmente',
          '📱 Quer utilizar criptomoedas no dia a dia',
          '🔄 Quer entender exchanges descentralizadas e DeFi',
          '🏦 Quer acessar serviços financeiros sem depender de bancos',
          '🔐 Quer aprender autocustódia',
          '🚫 Quer um sistema financeiro que não exige CPF',
        ],
      },
    ],
    extraContent: [
      'O Bitcoin criou o dinheiro da nova economia. A Ethereum criou o sistema financeiro que funciona na internet. Aprender a utilizar essas duas tecnologias significa entender como o dinheiro do futuro funciona.',
    ],
    faq: [
      { q: 'Preciso entender de tecnologia para usar Ethereum ou DeFi?', a: 'Não. Este treinamento foi criado para pessoas começando do zero.' },
      { q: 'O que é Ethereum?', a: 'Ethereum é uma rede blockchain que permite criar aplicações financeiras que funcionam diretamente na internet, sem depender de bancos.' },
      { q: 'O que são stablecoins (dólar digital)?', a: 'Stablecoins são criptomoedas com valor pareado ao dólar. Exemplos: USDT, USDC, DAI.' },
      { q: 'Preciso ter conta em banco ou CPF para usar DeFi?', a: 'Não. Basta ter uma carteira digital (wallet) para utilizar aplicações descentralizadas.' },
      { q: 'O que são finanças descentralizadas (DeFi)?', a: 'São aplicações financeiras que funcionam diretamente na blockchain: troca de criptomoedas, empréstimos e aplicações, sem depender de bancos.' },
      { q: 'O que é uma DEX (exchange descentralizada)?', a: 'É uma plataforma que permite trocar criptomoedas diretamente na blockchain, sem intermediários.' },
      { q: 'O que é o protocolo Aave?', a: 'Aave é uma plataforma de empréstimos descentralizados que funciona diretamente na blockchain.' },
      { q: 'Posso usar criptomoedas no dia a dia?', a: 'Sim. No treinamento você aprenderá como enviar dinheiro, usar cartões cripto, pagar contas e fazer transferências.' },
      { q: 'O que é autocustódia?', a: 'Autocustódia significa que somente você controla suas chaves e seus ativos digitais.' },
      { q: 'DeFi é seguro?', a: 'As tecnologias blockchain são seguras, mas é importante saber utilizá-las. O curso ensina como identificar protocolos confiáveis e evitar golpes.' },
      { q: 'Posso perder dinheiro usando DeFi?', a: 'Como qualquer sistema financeiro, existem riscos. O treinamento ensina boas práticas de segurança e uso responsável.' },
      { q: 'Posso acessar o curso de qualquer lugar?', a: 'Sim. O treinamento é 100% online.' },
    ],
  },
  '3': {
    title: 'Autocustódia e Criptomoedas no Dia a Dia',
    subtitle: 'Aprenda a guardar seus ativos com segurança e utilizar criptomoedas na prática.',
    price: '397',
    image: require('../../assets/images/curso-autocustodia.png'),
    trailColor: ['#3B82F6', '#1D4ED8'] as const,
    trailLabel: 'Trilha 2 — Jornada da Soberania',
    sections: [
      {
        title: '🟠 O que é autocustódia?',
        emoji: '',
        items: [
          'Autocustódia significa que você mesmo guarda e controla suas criptomoedas, sem depender de bancos, corretoras ou terceiros.',
          'Quem possui a chave privada controla o dinheiro.',
          '🚫 Nenhum banco controla seu dinheiro',
          '🚫 Nenhuma instituição pode bloquear seus ativos',
          '🚫 Ninguém pode acessar seus fundos sem sua autorização',
          'Seu patrimônio passa a existir diretamente na blockchain, sob seu controle.',
        ],
      },
      {
        title: '🔑 O que você vai aprender',
        emoji: '',
        items: [
          '🔐 O que são chaves privadas e chaves públicas',
          '💻 O que é uma wallet (carteira digital)',
          '📱 Diferença entre hot wallet e cold wallet',
          '🛡️ Como proteger suas chaves e seus ativos',
        ],
      },
      {
        title: '📲 Tipos de carteiras',
        emoji: '',
        items: [
          '📱 Hot Wallets — carteiras conectadas à internet',
          '🔐 Cold Wallets — carteiras offline para maior segurança',
          'Quando utilizar cada uma delas.',
        ],
      },
      {
        title: '🛡️ Segurança na autocustódia',
        emoji: '',
        items: [
          '⚠️ Como evitar golpes e fraudes',
          '⚠️ Como proteger sua seed phrase (frase de recuperação)',
          '⚠️ Como fazer backups seguros',
        ],
      },
      {
        title: '📱 Aplicativos para usar criptomoedas no dia a dia',
        emoji: '',
        items: [
          '💸 Enviar e receber PIX',
          '📄 Pagar boletos',
          '💳 Utilizar cartão de débito global',
          '🌎 Movimentar dinheiro internacionalmente',
          '📲 Pagar serviços e compras do dia a dia',
          '⚡ Converter criptomoedas automaticamente no momento do pagamento',
          'Pagar compras no Brasil e no exterior, utilizar cartão internacional sem IOF e movimentar dinheiro globalmente.',
        ],
      },
      {
        title: '🎯 Ao final deste treinamento',
        emoji: '',
        items: [
          '✔️ Criar e configurar sua própria carteira',
          '✔️ Guardar Bitcoin e criptomoedas com segurança',
          '✔️ Proteger suas chaves privadas',
          '✔️ Evitar erros comuns que fazem pessoas perderem dinheiro',
          '✔️ Utilizar aplicativos para pagamentos e transferências',
          '✔️ Movimentar dinheiro sem depender de bancos',
        ],
      },
      {
        title: '🏦 Torne-se seu próprio banco',
        emoji: '',
        items: [
          '🔐 Controle seu patrimônio',
          '🌍 Mova dinheiro globalmente',
          '⚡ Utilize redes financeiras descentralizadas',
          '📱 Realize pagamentos no dia a dia',
          'Tenha privacidade e liberdade. Sem depender de bancos.',
        ],
      },
    ],
    extraContent: [
      'Não é apenas sobre tecnologia — É sobre liberdade financeira. Quando você entende autocustódia, você deixa de depender de instituições para controlar o que é seu. Você passa a ter controle real sobre o seu dinheiro.',
    ],
    faq: [],
  },
};

function FAQItem({ item, colors }: { item: FAQ; colors: any }) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      style={[faqStyles.item, { backgroundColor: colors.card }]}
      onPress={() => setOpen(!open)}
      activeOpacity={0.7}
    >
      <View style={faqStyles.questionRow}>
        <Text style={[faqStyles.question, { color: colors.text }]}>{item.q}</Text>
        {open ? <ChevronUp size={18} color="#8B5CF6" /> : <ChevronDown size={18} color="#8B5CF6" />}
      </View>
      {open && <Text style={[faqStyles.answer, { color: colors.textSecondary }]}>{item.a}</Text>}
    </TouchableOpacity>
  );
}

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const course = courseDataMap[id || '1'];
  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Curso não encontrado</Text>
      </View>
    );
  }

  const handleBuy = () => {
    Alert.alert('Compra', `Redirecionando para pagamento do curso: ${course.title}\nValor: R$ ${course.price},00`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={course.image} style={styles.bannerImage} resizeMode="cover" />
          <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent'] as const} style={styles.bannerTopGradient} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Trail badge */}
        <View style={styles.contentPadding}>
          <LinearGradient colors={course.trailColor} style={styles.trailBadge}>
            <Text style={styles.trailBadgeText}>{course.trailLabel}</Text>
          </LinearGradient>

          <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.courseSubtitle, { color: colors.textSecondary }]}>{course.subtitle}</Text>

          {/* Extra content */}
          {course.extraContent.map((text, i) => (
            <Text key={i} style={[styles.paragraph, { color: colors.text }]}>{text}</Text>
          ))}

          <View style={styles.divider} />

          {/* Sections */}
          {course.sections.map((section, sIdx) => (
            <View key={sIdx}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
              {section.items.map((item, iIdx) => (
                <View key={iIdx} style={styles.sectionItem}>
                  <Text style={[styles.sectionItemText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
              <View style={styles.divider} />
            </View>
          ))}

          {/* FAQ */}
          {course.faq.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>❓ Perguntas Frequentes</Text>
              {course.faq.map((item, idx) => (
                <FAQItem key={idx} item={item} colors={colors} />
              ))}
              <View style={styles.divider} />
            </>
          )}

          {/* Guarantee */}
          <View style={[styles.guaranteeCard, { backgroundColor: colors.card }]}>
            <Shield size={28} color="#10B981" />
            <Text style={[styles.guaranteeTitle, { color: colors.text }]}>Garantia Total de 7 Dias</Text>
            <Text style={[styles.guaranteeDesc, { color: colors.textSecondary }]}>
              Se não for para você, devolvo 100% do valor. Sem perguntas.
            </Text>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.card }]}>
        <View>
          <Text style={styles.footerLabel}>Investimento</Text>
          <Text style={styles.footerPrice}>R$ {course.price},00</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBuy}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9'] as const} style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>Garantir Acesso</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const faqStyles = StyleSheet.create({
  item: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bannerContainer: {
    position: 'relative',
    height: 260,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTopGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPadding: {
    padding: 20,
  },
  trailBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  trailBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  courseSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionItem: {
    paddingLeft: 4,
    marginBottom: 8,
  },
  sectionItemText: {
    fontSize: 15,
    lineHeight: 22,
  },
  guaranteeCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  guaranteeTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
  },
  guaranteeDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 34,
    borderTopWidth: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: '#8B8B8B',
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10B981',
  },
  buyBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
