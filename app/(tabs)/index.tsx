import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import VSLModal from '@/components/VSLModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useVSL } from '@/contexts/VSLContext';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Globe,
  AlertTriangle,
  Shield,
  Rocket,
  Lock,
  Bitcoin,
  Target,
  CreditCard,
  CheckCircle,
  Lightbulb,
  BookOpen,
  ChevronRight,
  Settings,
  LogOut,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

function SectionTitle({ emoji, title, color }: { emoji: string; title: string; color: string }) {
  return (
    <View style={sectionStyles.titleRow}>
      <Text style={sectionStyles.emoji}>{emoji}</Text>
      <Text style={[sectionStyles.title, { color }]}>{title}</Text>
    </View>
  );
}

function BulletItem({ emoji, title, description, textColor, descColor }: { emoji: string; title: string; description: string; textColor: string; descColor: string }) {
  return (
    <View style={sectionStyles.bulletItem}>
      <Text style={sectionStyles.bulletEmoji}>{emoji}</Text>
      <View style={sectionStyles.bulletContent}>
        <Text style={[sectionStyles.bulletTitle, { color: textColor }]}>{title}</Text>
        <Text style={[sectionStyles.bulletDesc, { color: descColor }]}>{description}</Text>
      </View>
    </View>
  );
}

function CourseTrailCard({ id, title, subtitle, price, image, onPress, colors }: any) {
  return (
    <TouchableOpacity style={[sectionStyles.courseCard, { backgroundColor: colors.card }]} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={sectionStyles.courseImage} resizeMode="cover" />
      <View style={sectionStyles.courseInfo}>
        <Text style={[sectionStyles.courseTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[sectionStyles.courseSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>{subtitle}</Text>
        <View style={sectionStyles.courseFooter}>
          <Text style={sectionStyles.coursePrice}>R$ {price}</Text>
          <ChevronRight size={18} color="#8B5CF6" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const {
    shouldShowVSL,
    showVSLModal,
    hideVSLModal,
    isVSLModalVisible,
  } = useVSL();

  useEffect(() => {
    if (shouldShowVSL) {
      const timer = setTimeout(() => showVSLModal(), 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldShowVSL]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={{ height: insets.top }} />
        <Image
          source={require('../../assets/images/hero-banner.png')}
          style={styles.heroBanner}
          resizeMode="contain"
        />
        <View style={styles.heroTextBox}>
          <Text style={[styles.heroText, { color: colors.text }]}>
            Aprenda a dominar uma infraestrutura financeira que não exige CPF e coloque seu dinheiro sob seu controle total — mesmo começando hoje e com pouco para investir.
          </Text>
          <Text style={styles.heroHighlight}>
            O que você aprenderá aqui é algo que a maioria das pessoas só vai descobrir quando for tarde demais.
          </Text>
        </View>

        <View style={styles.content}>

          {/* BEM-VINDO */}
          <SectionTitle emoji="🌐" title="Bem-vindo à Rede Financeira do Futuro" color={colors.text} />
          <Text style={[styles.sectionSubtitle, { color: '#8B5CF6' }]}>
            Chega de depender de bancos para usar o seu próprio dinheiro.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            O objetivo da BITFORKIDS e do DEFI-BIT é simples: libertar você da dependência de instituições financeiras e do controle estatal, permitindo que você assuma a soberania total sobre seu patrimônio. Sem precisar de documentos ou CPF.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Tudo o que você precisa é de um computador ou celular e acesso à internet.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Estamos vivendo uma das maiores transformações da história do dinheiro. Pela primeira vez, redes como Bitcoin e Ethereum permitem que qualquer pessoa armazene valor, movimente dinheiro globalmente e utilize serviços financeiros diretamente pela internet, sem precisar pedir permissão para usar o próprio dinheiro.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Em nossos treinamentos, você vai aprender como usar Bitcoin para preservar valor, utilizar dólar digital para transações globais e manter seus ativos em autocustódia, onde somente você tem controle. Trata-se de uma nova infraestrutura financeira aberta e resistente à censura, onde seu dinheiro não pode ser bloqueado, congelado ou confiscado por bancos ou governos.
          </Text>

          <View style={styles.divider} />

          {/* ARMADILHA */}
          <SectionTitle emoji="🌍" title="O Sistema Financeiro é uma Armadilha" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            O modelo tradicional não foi criado para a sua liberdade, mas para ditar as regras de como você deve viver. Se você não se encaixa nos padrões impostos, você é excluído.
          </Text>
          <BulletItem emoji="📋" title="Exclusão e Burocracia" description="Exigem CPF limpo, comprovantes de residência e pilhas de documentos. Sem a papelada, o banco te nega o direito de movimentar o que é seu." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📉" title="Inflação" description='Governos imprimem dinheiro sem parar, aplicando um "imposto invisível" que corrói seu poder de compra todos os anos.' textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔒" title="Risco de Confisco" description="Seu saldo bancário pode ser bloqueado ou confiscado por decisões políticas ou judiciais em segundos. No banco, o dinheiro não é seu — é apenas uma promessa." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="👁️" title="Vigilância Total" description="Cada transação é rastreada, vigiada e reportada. Não existe privacidade no seu consumo." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🏦" title="Dependência de Terceiros" description='Você precisa de permissão para tudo. Se o banco decidir que sua transação é "suspeita", ele bloqueia seu acesso sem aviso.' textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="⚖️" title="Regras Unilaterais" description="Taxas, limites e horários de transferência são impostos sem que você possa questionar." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* INIMIGO */}
          <SectionTitle emoji="🛑" title='O Inimigo: A "Coleira Digital"' color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Além da inflação, o sistema bancário é a maior ferramenta de abuso de poder dos governos. O Estado tem acesso total ao rastro da sua vida financeira, drenando recursos através de impostos automáticos antes mesmo que você possa reagir.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            A conta bancária funciona como uma "coleira digital": sob qualquer pretexto, o governo pode congelar seus bens e tornar seu patrimônio um refém. No sistema atual, o Estado não precisa bater à sua porta para confiscar o que é seu; ele faz isso com um clique.
          </Text>

          <View style={styles.divider} />

          {/* SOLUÇÃO */}
          <SectionTitle emoji="🚀" title="A Solução: Fim da Coleira Digital" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            A tecnologia desse novo sistema de finanças devolve o poder a quem ele pertence: você. Ao eliminar intermediários como bancos, eliminamos a necessidade de permissão.
          </Text>
          <BulletItem emoji="🛡️" title="Soberania contra o Confisco" description="Na rede descentralizada, você detém a posse real. Não há autoridade central capaz de bloquear sua conta judicialmente." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📊" title="Imunidade à Inflação" description="Com oferta fixa e imutável (21 milhões), o Bitcoin é a defesa definitiva contra a impressão desenfreada de moeda." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="💵" title="Estabilidade Global com Dólar Criptografado" description="Utilize stablecoins para manter seu poder de compra em dólar, fora do alcance de restrições bancárias ou da desvalorização do Real." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔓" title="Privacidade e Liberdade" description='Um ambiente aberto onde seu direito de transacionar não depende de "ficha limpa" ou autorização de gerentes.' textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🚫" title="Resistência a Impostos Abusivos" description="Ao retirar seu patrimônio do sistema tradicional, você interrompe a drenagem arbitrária de recursos." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🌍" title="Transações Sem Fronteiras" description="Envie qualquer valor para qualquer lugar do mundo em minutos, sem justificativas." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* AUTOCUSTÓDIA */}
          <SectionTitle emoji="🔐" title="A Chave para Tudo: A Autocustódia" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            A verdadeira saída para o abuso estatal começa na autocustódia. Enquanto seu patrimônio estiver em bancos ou corretoras, você está apenas pedindo permissão para usar o que é seu.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            A autocustódia é o ato de mover seus ativos para uma carteira onde só você possui a chave privada. É aqui que a "coleira" é rompida: quando você detém a custódia, seu patrimônio torna-se impossível de ser bloqueado ou censurado.
          </Text>
          <Text style={[styles.highlightText, { color: colors.text }]}>
            Se você não guarda suas chaves, você não é o dono do seu dinheiro; você é apenas um usuário sob vigilância.
          </Text>
          <View style={styles.noNeedRow}>
            <Text style={styles.noNeedItem}>❌ bancos</Text>
            <Text style={styles.noNeedItem}>❌ intermediários</Text>
            <Text style={styles.noNeedItem}>❌ autorização</Text>
            <Text style={styles.noNeedItem}>❌ CPF</Text>
          </View>

          <View style={styles.divider} />

          {/* REDES DA NOVA ECONOMIA */}
          <SectionTitle emoji="🟠" title="As Redes da Nova Economia" color={colors.text} />
          <View style={[styles.networkCard, { backgroundColor: colors.card, borderColor: '#F7931A' }]}>
            <Text style={styles.networkEmoji}>🟠</Text>
            <Text style={[styles.networkTitle, { color: colors.text }]}>Rede Bitcoin</Text>
            <Text style={[styles.networkDesc, { color: colors.textSecondary }]}>
              O dinheiro da nova economia digital. Escasso e descentralizado, focado em reserva de valor.
            </Text>
          </View>
          <View style={[styles.networkCard, { backgroundColor: colors.card, borderColor: '#627EEA' }]}>
            <Text style={styles.networkEmoji}>🔵</Text>
            <Text style={[styles.networkTitle, { color: colors.text }]}>Rede Ethereum</Text>
            <Text style={[styles.networkDesc, { color: colors.textSecondary }]}>
              A infraestrutura para o sistema financeiro descentralizado (DeFi), onde você utiliza dólares digitais para pagamentos, transferências e serviços financeiros, tudo via internet.
            </Text>
          </View>

          <View style={styles.divider} />

          {/* O QUE VAI DOMINAR */}
          <SectionTitle emoji="🎯" title="O que você vai dominar" color={colors.text} />
          <BulletItem emoji="🛡️" title="Blindagem Patrimonial" description="Proteja o suor do seu trabalho contra o efeito corrosivo da inflação e a desvalorização cambial." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🟠" title="Domínio do Bitcoin" description='Opere a rede do "ouro digital" com segurança absoluta.' textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🌐" title="Inteligência em DeFi" description="Desvende as Finanças Descentralizadas e como um sistema financeiro funciona sem gerente de conta." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🌍" title="Liberdade de Movimentação Global" description="Transferências internacionais e pagamentos sem fronteiras, taxas abusivas ou bloqueios." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="💵" title="Dólar Digital na Prática" description="Utilize stablecoins para preservar seu poder de compra com total liquidez e autonomia." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔐" title="Maestria em Autocustódia" description="O método definitivo para guardar suas próprias chaves e garantir que apenas você tenha acesso aos seus ativos." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🚫" title="Infraestrutura Sem Permissões" description="Um ecossistema onde você não precisa apresentar documentos ou pedir permissão para transacionar." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* POR QUE PARA VOCÊ */}
          <SectionTitle emoji="🎯" title="Por que nossos treinamentos são para você?" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Nosso foco é a sua soberania pessoal. Nossos cursos foram desenhados para resolver seus problemas reais:
          </Text>
          <BulletItem emoji="🏦" title="Romper a dependência bancária" description="Aprenda a ser o seu próprio banco, sem precisar de permissão para mover o que é seu." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🛡️" title="Blindar o patrimônio" description="Proteja o seu futuro contra o confisco, a censura e decisões políticas arbitrárias." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔒" title="Conquistar a privacidade" description="Transacione e guarde valores sem precisar expor seu CPF ou solicitar autorização estatal." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔐" title="Dominar a autocustódia" description="Tire seu dinheiro do alcance de terceiros, corretoras ou governos." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📖" title="Simplificar o complexo" description="Traduzimos o Bitcoin e o universo DeFi para que qualquer leigo entenda e aplique hoje mesmo." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="⚠️" title="Evitar erros fatais" description="Treine o olhar para identificar golpes, evitar armadilhas e manter a segurança absoluta do seu capital." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* CRIPTO NO DIA A DIA */}
          <SectionTitle emoji="💳" title="Liberdade Real: Cripto no seu Dia a Dia" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Ensinamos como usar essa tecnologia na prática, com a mesma facilidade de um app de banco:
          </Text>
          <BulletItem emoji="💸" title="Pagamentos e Recebimentos" description="Diretos e sem intermediários." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="💳" title="Cartões Cripto" description="Gaste seu saldo em cripto ou dólar no comércio." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📄" title="Boletos e Contas" description="Quite despesas usando sua carteira digital." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🌎" title="Transferências Globais" description="Instantâneas e sem burocracias." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📱" title="Apps e Carteiras" description="Transforme seu saldo em um ativo líquido para uso diário." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* FEITO PARA VOCÊ */}
          <SectionTitle emoji="✅" title="Feito para você: Comece agora com segurança" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Não é preciso ser especialista nem ter grandes fortunas.
          </Text>
          <BulletItem emoji="👣" title="Para iniciantes" description="Passo a passo do básico ao avançado." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="💰" title="Acessibilidade" description="Comece com pouco dinheiro." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🚫" title="Sem intermediários" description='Você nunca precisará "dar o seu dinheiro" para ninguém.' textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🔐" title="Controle total" description="Domínio completo da sua carteira e autocustódia." textColor={colors.text} descColor={colors.textSecondary} />

          <View style={styles.divider} />

          {/* POR QUE APRENDER COMIGO */}
          <SectionTitle emoji="💡" title="Por que aprender comigo?" color={colors.text} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            O meu curso promove uma virada de chave: a transição de "usuário" para "proprietário". Eu traduzo o complexo para o simples, focando em:
          </Text>
          <BulletItem emoji="💪" title="Mudança de Postura" description="Deixe de pedir permissão para existir financeiramente." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="🧠" title="Domínio Técnico" description="Veja o dinheiro como um ativo sob seu controle direto." textColor={colors.text} descColor={colors.textSecondary} />
          <BulletItem emoji="📚" title="Didática Acessível" description="Ensino finanças e DeFi para leigos, focando em segurança e liberdade." textColor={colors.text} descColor={colors.textSecondary} />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Eu não ensino apenas "onde clicar"; eu ensino como se libertar. Se você busca resultado prático, segurança e o fim da dependência bancária, eu vou te mostrar o caminho mais curto e seguro para você ser, finalmente, o dono do seu próprio patrimônio.
          </Text>

          <View style={styles.divider} />

          {/* NOSSOS TREINAMENTOS */}
          <SectionTitle emoji="📚" title="Nossos Treinamentos: Escolha sua Trilha" color={colors.text} />

          {/* Trilha 1 */}
          <LinearGradient colors={['#F7931A', '#E2761B'] as const} style={styles.trailBadge}>
            <Text style={styles.trailBadgeText}>🟠 TRILHA 1: A Jornada do Iniciante</Text>
          </LinearGradient>
          <Text style={[styles.trailDesc, { color: colors.textSecondary }]}>
            Ideal para quem está começando agora e precisa dominar a base, desde os conceitos até a aplicação prática.
          </Text>

          <CourseTrailCard
            id={1}
            title="Bitcoin — A Evolução do Dinheiro"
            subtitle="Construa um patrimônio que nenhum banco ou governo pode controlar."
            price="397,00"
            image={require('../../assets/images/curso-bitcoin.png')}
            onPress={() => router.push('/course/1')}
            colors={colors}
          />
          <CourseTrailCard
            id={2}
            title="Ethereum e Dólar Digital"
            subtitle="Como usar criptomoedas no dia a dia e acessar o sistema financeiro da internet."
            price="397,00"
            image={require('../../assets/images/curso-ethereum.png')}
            onPress={() => router.push('/course/2')}
            colors={colors}
          />

          {/* Trilha 2 */}
          <LinearGradient colors={['#3B82F6', '#1D4ED8'] as const} style={[styles.trailBadge, { marginTop: 24 }]}>
            <Text style={styles.trailBadgeText}>🔵 TRILHA 2: A Jornada da Soberania</Text>
          </LinearGradient>
          <Text style={[styles.trailDesc, { color: colors.textSecondary }]}>
            Ideal para quem já possui conhecimento e quer focar 100% em liberdade operacional, privacidade e domínio total do capital.
          </Text>

          <CourseTrailCard
            id={3}
            title="Autocustódia e Criptomoedas no Dia a Dia"
            subtitle="Aprenda a guardar seus ativos com segurança e utilizar criptomoedas na prática."
            price="397,00"
            image={require('../../assets/images/curso-autocustodia.png')}
            onPress={() => router.push('/course/3')}
            colors={colors}
          />

          {/* Garantia */}
          <View style={[styles.guaranteeCard, { backgroundColor: colors.card }]}>
            <Text style={styles.guaranteeEmoji}>✅</Text>
            <Text style={[styles.guaranteeTitle, { color: colors.text }]}>Garantia Total de 7 Dias</Text>
            <Text style={[styles.guaranteeDesc, { color: colors.textSecondary }]}>
              Se não for para você, devolvo 100% do valor. Sem perguntas. A decisão é totalmente sua, o risco é todo meu.
            </Text>
          </View>

          <View style={styles.divider} />

          {/* MANIFESTO */}
          <View style={[styles.manifestoCard, { backgroundColor: '#1a0a2e' }]}>
            <Text style={styles.manifestoTitle}>
              A Sua Liberdade Financeira Começa no Momento em que Você Decide Parar de Pedir Permissão.
            </Text>
            <Text style={styles.manifestoText}>
              Enquanto o seu patrimônio estiver dentro de um banco ou de uma corretora, a verdade é uma só: você não tem dinheiro, você tem um pedido de permissão. Você acredita que é o dono, mas o sistema apenas te concede o privilégio de usar o que é seu enquanto você se mantém dentro das linhas que eles traçaram.
            </Text>
            <Text style={styles.manifestoText}>
              A liberdade financeira não virá de um gerente de conta, de uma decisão judicial ou de uma política governamental. Ela exige uma mudança de postura brutal e o primeiro passo prático dessa nova era é a autocustódia.
            </Text>
            <Text style={styles.manifestoText}>
              A autocustódia é o divisor de águas: é o momento em que você retira o seu patrimônio das mãos de terceiros e assume, pessoalmente, a guarda das suas chaves privadas. É a decisão de parar de delegar o controle da sua vida para quem lucra com a sua dependência.
            </Text>
            <Text style={styles.manifestoHighlight}>
              É hora de parar de pedir permissão para existir financeiramente e tomar o controle total.
            </Text>
          </View>

          <View style={styles.divider} />

          {/* QUEM SOU EU */}
          <SectionTitle emoji="👩‍💼" title="Quem sou eu" color={colors.text} />
          <Image
            source={require('../../assets/images/dani-profile.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={[styles.profileName, { color: colors.text }]}>Dani Spitaletti</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Estou no universo das criptomoedas e finanças descentralizadas desde 2021, estudando e utilizando na prática as tecnologias que estão transformando o sistema financeiro global.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            O principal motivo que me levou a entrar nesse mercado foi a busca por mais autonomia financeira e proteção do patrimônio. Queria aprender a não depender de bancos, evitar os riscos de bloqueios de contas, censura financeira e também encontrar uma forma de proteger o dinheiro contra a inflação.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Desde então, venho estudando e aplicando ferramentas que permitem às pessoas:
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            🔐 guardar patrimônio em autocustódia{'\n'}
            🌍 movimentar dinheiro globalmente{'\n'}
            💵 utilizar dólar digital e criptomoedas{'\n'}
            ⚡ acessar serviços financeiros diretamente pela internet
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Sem depender de bancos ou intermediários.
          </Text>

          <Text style={[styles.subSectionTitle, { color: colors.text }]}>🎯 Minha missão</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Simplificar o acesso a esse novo sistema financeiro, mostrando que qualquer pessoa pode aprender a utilizar essas tecnologias de forma segura e consciente. Acredito que o conhecimento sobre Bitcoin, blockchain e finanças descentralizadas representa uma das maiores transformações da história do dinheiro.
          </Text>

          <Text style={[styles.subSectionTitle, { color: colors.text }]}>🚀 Por que criei estes treinamentos</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Criei estes treinamentos para ajudar pessoas que desejam proteger seu patrimônio, reduzir a dependência do sistema bancário tradicional, aprender a utilizar criptomoedas com segurança e conquistar mais autonomia sobre o próprio dinheiro. Tudo explicado de forma simples, clara e acessível, mesmo para quem está começando do zero.
          </Text>

          <View style={styles.divider} />

          {/* FAMÍLIA */}
          <SectionTitle emoji="👨‍👩‍👧" title="Família e futuro" color={colors.text} />
          <Image
            source={require('../../assets/images/dani-family.png')}
            style={styles.familyImage}
            resizeMode="cover"
          />
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Mais do que investir, aprender sobre Bitcoin e autocustódia também é uma forma de cuidar do futuro da família. Muitos pais procuram uma maneira segura de construir uma poupança para os filhos, mas vivem em um sistema onde o dinheiro perde valor ao longo do tempo.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Com as tecnologias descentralizadas é possível construir uma reserva digital guardada em autocustódia, fora do alcance de bloqueios ou confiscos. Assim, pais e mães podem começar desde cedo a criar uma poupança inconfiscável, preservando valor ao longo dos anos e deixando para seus filhos não apenas um patrimônio, mas também o conhecimento sobre soberania financeira.
          </Text>

          {/* AÇÕES RÁPIDAS */}
          <View style={styles.divider} />
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: colors.card }]}
              onPress={() => router.push('/settings')}
            >
              <Settings size={20} color="#8B5CF6" />
              <Text style={[styles.quickActionText, { color: colors.text }]}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: colors.card }]}
              onPress={() => router.replace('/auth/login')}
            >
              <LogOut size={20} color="#EF4444" />
              <Text style={[styles.quickActionText, { color: '#EF4444' }]}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <VSLModal
        visible={isVSLModalVisible}
        onClose={hideVSLModal}
        onCTAPress={() => {
          hideVSLModal();
          router.push('/auth/register');
        }}
      />
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 4,
  },
  bulletEmoji: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 2,
  },
  bulletContent: {
    flex: 1,
  },
  bulletTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  bulletDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  courseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroBanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 1402 / 935,
  },
  heroTextBox: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  heroText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  heroHighlight: {
    color: '#F7931A',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginVertical: 24,
  },
  noNeedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  noNeedItem: {
    fontSize: 15,
    color: '#EF4444',
    fontWeight: '600',
  },
  networkCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  networkEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  networkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  networkDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  trailBadge: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  trailBadgeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  trailDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  guaranteeCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  guaranteeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  guaranteeDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  manifestoCard: {
    borderRadius: 12,
    padding: 24,
  },
  manifestoTitle: {
    color: '#F7931A',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 28,
  },
  manifestoText: {
    color: '#E5E5E5',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  manifestoHighlight: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 8,
  },
  profileImage: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  familyImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
