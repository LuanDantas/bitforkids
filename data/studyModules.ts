export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'text' | 'quiz' | 'video';
  content: string;
  duration: number; // minutes
  quiz?: QuizQuestion[];
  videoUrl?: string;
}

export interface StudyModule {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseStudyData {
  courseId: number;
  title: string;
  modules: StudyModule[];
}

// ─────────────────────────────────────────────
// Course 1 — Bitcoin
// ─────────────────────────────────────────────

const bitcoinModules: StudyModule[] = [
  {
    id: 'btc-intro',
    title: 'Introdução ao Bitcoin',
    emoji: '🟠',
    description: 'Entenda o que é Bitcoin e por que ele foi criado.',
    lessons: [
      {
        id: 'btc-intro-1',
        title: 'O que é Bitcoin',
        type: 'text',
        duration: 5,
        content: `O Bitcoin é uma moeda digital descentralizada criada em 2009 por uma pessoa (ou grupo) sob o pseudônimo de Satoshi Nakamoto. Diferentemente do real ou do dólar, ele não depende de nenhum governo ou banco central para funcionar.

Pense no Bitcoin como dinheiro da internet. Assim como você envia um e-mail sem precisar dos Correios, o Bitcoin permite enviar valor para qualquer pessoa no mundo sem precisar de um banco como intermediário.

Cada Bitcoin pode ser dividido em 100 milhões de partes menores chamadas "satoshis" (ou "sats"). Isso significa que você não precisa comprar um Bitcoin inteiro — pode comprar frações muito pequenas, acessíveis para qualquer orçamento familiar.

O Bitcoin funciona através de uma rede global de computadores que validam todas as transações. Essa rede é chamada de blockchain, e é ela que garante que ninguém consiga gastar o mesmo Bitcoin duas vezes ou criar Bitcoins falsos.`
      },
      {
        id: 'btc-intro-video',
        title: 'Vídeo: O Bitcoin em 5 minutos',
        type: 'video',
        duration: 5,
        content: 'Assista este vídeo introdutório para entender os conceitos fundamentais do Bitcoin de forma visual e dinâmica.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        id: 'btc-intro-2',
        title: 'Por que o Bitcoin foi criado',
        type: 'text',
        duration: 5,
        content: `O Bitcoin nasceu logo após a crise financeira de 2008, quando grandes bancos ao redor do mundo quebraram e governos tiveram que usar dinheiro público para salvá-los. Milhões de pessoas perderam suas economias e sua confiança no sistema financeiro tradicional.

Satoshi Nakamoto publicou um documento técnico (chamado "whitepaper") em outubro de 2008 descrevendo um "sistema de dinheiro eletrônico ponto-a-ponto". A ideia central era simples: criar uma forma de enviar dinheiro diretamente entre pessoas, sem depender de bancos ou governos.

Um dos problemas que o Bitcoin resolve é a inflação descontrolada. Enquanto governos podem imprimir dinheiro sem limite (diluindo o poder de compra da população), o Bitcoin tem um limite fixo de 21 milhões de unidades. Ninguém pode criar mais do que isso — nunca.

Para famílias, isso é especialmente importante. O dinheiro que você guarda na poupança perde valor ao longo do tempo por causa da inflação. O Bitcoin foi desenhado para ser uma reserva de valor que protege o poder de compra das suas economias ao longo dos anos.`
      },
      {
        id: 'btc-intro-3',
        title: 'Bitcoin vs Dinheiro Tradicional',
        type: 'quiz',
        duration: 4,
        content: `O dinheiro tradicional (como o real brasileiro) é chamado de "moeda fiduciária" — ou seja, seu valor é baseado na confiança que as pessoas depositam no governo que o emite. Já o Bitcoin tem valor baseado em matemática, criptografia e na escassez programada.

Existem diferenças fundamentais entre os dois. O real pode ser impresso em quantidade ilimitada pelo Banco Central, enquanto o Bitcoin tem oferta fixa de 21 milhões. Transferências bancárias podem levar dias e cobrar taxas altas, enquanto o Bitcoin pode ser enviado em minutos para qualquer lugar do mundo.

Outra diferença importante: o dinheiro no banco pode ser congelado pelo governo ou pelo próprio banco. Já o Bitcoin, quando guardado em carteira própria, pertence exclusivamente a você — ninguém pode confiscar ou bloquear.

Para o dia a dia, o real ainda é mais prático para compras rotineiras. Mas como reserva de valor e proteção patrimonial de longo prazo, o Bitcoin tem se mostrado superior, tendo valorizado enormemente desde sua criação.`,
        quiz: [
          {
            question: 'Qual é o limite máximo de Bitcoins que podem existir?',
            options: ['100 milhões', '21 milhões', '1 bilhão', 'Não tem limite'],
            correctIndex: 1,
          },
          {
            question: 'Quem criou o Bitcoin?',
            options: ['Elon Musk', 'Banco Central', 'Satoshi Nakamoto', 'Google'],
            correctIndex: 2,
          },
          {
            question: 'O que é um "satoshi"?',
            options: [
              'Um tipo de carteira',
              'A menor fração do Bitcoin',
              'Uma taxa de transação',
              'Um banco digital',
            ],
            correctIndex: 1,
          },
          {
            question: 'O Bitcoin depende de qual instituição para funcionar?',
            options: ['Banco Central', 'Governo Federal', 'Nenhuma — é descentralizado', 'Visa/Mastercard'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'btc-blockchain',
    title: 'Como funciona a Blockchain',
    emoji: '⛓️',
    description: 'Descubra a tecnologia por trás do Bitcoin.',
    lessons: [
      {
        id: 'btc-blockchain-1',
        title: 'Conceito de Blockchain',
        type: 'text',
        duration: 6,
        content: `A blockchain é como um livro-razão digital público e imutável. Imagine um caderno gigante onde todas as transações de Bitcoin são anotadas, e esse caderno é copiado em milhares de computadores ao redor do mundo. Ninguém pode apagar ou alterar o que já foi escrito.

Cada "página" desse caderno é chamada de "bloco". Cada bloco contém um grupo de transações e é conectado ao bloco anterior por meio de uma impressão digital matemática (chamada hash). Essa conexão forma uma "cadeia de blocos" — daí o nome blockchain.

Se alguém tentasse alterar uma transação em um bloco antigo, a impressão digital mudaria e todos os blocos seguintes ficariam inválidos. Isso torna a blockchain praticamente impossível de ser fraudada, pois seria necessário alterar todos os blocos em mais da metade dos computadores da rede ao mesmo tempo.

A blockchain do Bitcoin é pública, o que significa que qualquer pessoa pode verificar qualquer transação que já aconteceu desde 2009. Essa transparência é uma das grandes vantagens do sistema, pois garante que tudo é auditável.`
      },
      {
        id: 'btc-blockchain-video',
        title: 'Vídeo: Como funciona a Blockchain',
        type: 'video',
        duration: 4,
        content: 'Uma explicação visual de como as transações são registradas e validadas na blockchain do Bitcoin.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
      {
        id: 'btc-blockchain-2',
        title: 'Mineração e Validação',
        type: 'text',
        duration: 6,
        content: `A mineração de Bitcoin é o processo pelo qual novos blocos são adicionados à blockchain. Mineradores são computadores poderosos que competem para resolver problemas matemáticos complexos. O primeiro a resolver ganha o direito de adicionar o próximo bloco e recebe uma recompensa em Bitcoin.

Esse processo é chamado de "Prova de Trabalho" (Proof of Work). Ele garante que adicionar novos blocos requer esforço computacional real, tornando muito caro para alguém tentar manipular a rede. É como se cada bloco fosse selado com um cadeado que levou muito trabalho para ser criado.

A recompensa dos mineradores diminui pela metade a cada quatro anos em um evento chamado "halving". Em 2009, a recompensa era de 50 BTC por bloco. Hoje é bem menor. Esse mecanismo garante que novos Bitcoins entrem em circulação de forma cada vez mais lenta, reforçando a escassez.

Os mineradores também são responsáveis por validar as transações. Quando você envia Bitcoin para alguém, essa transação vai para uma "fila de espera" (mempool) até que um minerador a inclua em um bloco. Transações com taxas mais altas tendem a ser processadas mais rapidamente.

A mineração consome energia, e isso é um tema debatido. Porém, cada vez mais mineradores utilizam energia renovável, e muitos argumentam que a segurança de uma rede financeira global justifica esse consumo energético.`
      },
      {
        id: 'btc-blockchain-3',
        title: 'Transações na Rede',
        type: 'quiz',
        duration: 5,
        content: `Uma transação de Bitcoin funciona de forma simples: você informa o endereço de destino, a quantidade de Bitcoin e uma taxa de rede. Sua carteira então assina digitalmente a transação com sua chave privada, provando que você é o dono daqueles Bitcoins.

A transação é enviada para a rede e fica na mempool esperando ser incluída em um bloco. Depois que um minerador a inclui e o bloco é validado pela rede, a transação recebe uma "confirmação". A maioria dos serviços considera 6 confirmações como definitivas (cerca de 1 hora).

As taxas de transação variam conforme a demanda na rede. Em momentos de muito uso, as taxas podem subir. Já em períodos mais calmos, as taxas ficam bem baixas. Existem também soluções como a Lightning Network, que permite transações quase instantâneas e com taxas mínimas.

Cada transação é transparente e pública. Qualquer pessoa pode verificar no blockchain explorer (como o mempool.space) se uma transação foi confirmada, quanto foi enviado e para qual endereço. Porém, os endereços são códigos alfanuméricos, sem nomes vinculados diretamente.`,
        quiz: [
          {
            question: 'O que é a mempool?',
            options: [
              'Um tipo de carteira',
              'A fila de espera das transações',
              'Um minerador',
              'Uma exchange',
            ],
            correctIndex: 1,
          },
          {
            question: 'Quantas confirmações são geralmente consideradas definitivas?',
            options: ['1', '3', '6', '100'],
            correctIndex: 2,
          },
          {
            question: 'O que é a Lightning Network?',
            options: [
              'Uma rede elétrica para mineração',
              'Uma solução para transações rápidas e baratas',
              'O nome de um minerador',
              'Um tipo de Bitcoin',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'btc-buying',
    title: 'Comprando Bitcoin',
    emoji: '💰',
    description: 'Aprenda como comprar seus primeiros satoshis.',
    lessons: [
      {
        id: 'btc-buying-1',
        title: 'Corretoras vs P2P',
        type: 'text',
        duration: 5,
        content: `Existem duas formas principais de comprar Bitcoin: através de corretoras (exchanges) ou de forma direta entre pessoas (P2P — peer-to-peer). Cada método tem suas vantagens e desvantagens que você precisa conhecer.

As corretoras são plataformas onde você cria uma conta, faz um depósito em reais e pode comprar Bitcoin com facilidade. Exemplos populares no Brasil incluem Mercado Bitcoin, Foxbit, Binance e Coinbase. A vantagem é a praticidade e a liquidez — sempre haverá alguém vendendo.

No modelo P2P, você negocia diretamente com outra pessoa, geralmente usando plataformas que conectam compradores e vendedores (como Bisq ou Paxful). A vantagem é maior privacidade e, às vezes, preços melhores. A desvantagem é que exige mais cuidado para evitar golpes.

Para quem está começando, especialmente famílias, as corretoras regulamentadas no Brasil são geralmente a opção mais segura e prática. Elas exigem verificação de identidade (KYC), o que adiciona uma camada de segurança e conformidade legal.`
      },
      {
        id: 'btc-buying-2',
        title: 'Passo a Passo para Comprar',
        type: 'text',
        duration: 5,
        content: `Comprar Bitcoin pela primeira vez pode parecer complicado, mas o processo é bem simples. Vamos ao passo a passo que qualquer membro da família pode seguir.

Primeiro, escolha uma corretora confiável e crie sua conta. Você precisará fornecer documentos de identidade e comprovante de endereço. Esse processo de verificação (KYC) geralmente leva de algumas horas a poucos dias.

Depois, faça um depósito em reais via Pix ou transferência bancária. A maioria das corretoras aceita depósitos a partir de valores baixos — muitas vezes R$10 ou R$20 já são suficientes para começar. Não existe valor mínimo obrigatório para comprar Bitcoin.

Com o saldo em reais na corretora, basta ir à área de negociação, selecionar Bitcoin (BTC), informar quanto deseja comprar e confirmar a ordem. Em segundos, você terá seus primeiros satoshis. Lembre-se: você não precisa comprar um Bitcoin inteiro.

Uma estratégia muito recomendada para famílias é o DCA (Dollar Cost Averaging) — comprar um valor fixo todo mês, independentemente do preço. Assim, você suaviza as oscilações e constrói patrimônio de forma consistente ao longo do tempo.`
      },
      {
        id: 'btc-buying-3',
        title: 'Segurança na Compra',
        type: 'quiz',
        duration: 4,
        content: `A segurança é fundamental ao comprar Bitcoin. Alguns cuidados simples podem proteger suas economias e as da sua família de golpes e perdas.

Sempre use corretoras reconhecidas e com boa reputação. Verifique se a empresa está registrada e se possui histórico confiável. Desconfie de plataformas desconhecidas que prometem taxas muito abaixo do mercado.

Ative a autenticação de dois fatores (2FA) em todas as suas contas. Prefira usar aplicativos como Google Authenticator ou Authy em vez de SMS, que pode ser interceptado. Isso adiciona uma camada extra de proteção mesmo que sua senha seja comprometida.

Nunca compartilhe suas credenciais com ninguém e tenha cuidado com links em e-mails ou mensagens. Golpes de phishing são comuns no mundo cripto. Sempre acesse a corretora digitando o endereço diretamente no navegador.

Após comprar, considere transferir seus Bitcoins para uma carteira própria. Lembre-se: "not your keys, not your coins" — enquanto seus Bitcoins estão na corretora, tecnicamente é ela que os controla, não você.`,
        quiz: [
          {
            question: 'O que significa DCA?',
            options: [
              'Digital Crypto Asset',
              'Dollar Cost Averaging — compras regulares de valor fixo',
              'Decentralized Crypto Authority',
              'Direct Coin Access',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual o melhor tipo de 2FA para proteger sua conta?',
            options: ['SMS', 'E-mail', 'Aplicativo autenticador (Google Authenticator/Authy)', 'Não precisa de 2FA'],
            correctIndex: 2,
          },
          {
            question: 'O que significa "not your keys, not your coins"?',
            options: [
              'Sem chave, sem cofre',
              'Se você não controla as chaves privadas, não controla seus Bitcoins',
              'Chaves são mais importantes que moedas',
              'Você precisa de uma chave física para ter Bitcoin',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual é o valor mínimo para começar a comprar Bitcoin?',
            options: ['R$1.000', 'Não existe mínimo — pode ser a partir de poucos reais', '1 BTC inteiro', 'R$500'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'btc-custody',
    title: 'Autocustódia',
    emoji: '🔐',
    description: 'Aprenda a guardar seus Bitcoins com segurança.',
    lessons: [
      {
        id: 'btc-custody-1',
        title: 'O que são Carteiras',
        type: 'text',
        duration: 5,
        content: `Uma carteira de Bitcoin (wallet) é um software ou dispositivo que armazena suas chaves privadas — os códigos que provam que você é dono dos seus Bitcoins. Ao contrário do que o nome sugere, a carteira não "guarda" Bitcoin; os Bitcoins estão sempre na blockchain.

Existem dois tipos principais de carteiras: hot wallets (carteiras quentes) e cold wallets (carteiras frias). Hot wallets são aplicativos no celular ou computador, conectados à internet. Cold wallets são dispositivos físicos que ficam desconectados, como os da Ledger ou Trezor.

Quando você cria uma carteira, ela gera uma "frase semente" (seed phrase) — geralmente 12 ou 24 palavras em ordem específica. Essa frase é a chave mestra que permite recuperar todos os seus Bitcoins caso perca o dispositivo. Sem ela, seus Bitcoins ficam inacessíveis para sempre.

Para a família, é essencial que mais de uma pessoa saiba onde a seed phrase está guardada (de forma segura). Muitos Bitcoins já foram perdidos porque o dono faleceu e ninguém tinha acesso às chaves.`
      },
      {
        id: 'btc-custody-video',
        title: 'Vídeo: Configurando sua primeira carteira',
        type: 'video',
        duration: 6,
        content: 'Acompanhe o passo a passo para criar e configurar sua primeira carteira de Bitcoin com segurança.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      {
        id: 'btc-custody-2',
        title: 'Chaves Públicas e Privadas',
        type: 'text',
        duration: 6,
        content: `O Bitcoin usa criptografia de chave pública, um sistema com dois tipos de chave que trabalham juntos. Entender a diferença entre elas é fundamental para a segurança dos seus ativos.

A chave pública é como seu número de conta bancária — você pode compartilhá-la com qualquer pessoa para receber Bitcoin. Dela é derivado o seu endereço de Bitcoin, que é o código que você passa para quem quer te enviar moedas. Compartilhar o endereço é totalmente seguro.

A chave privada é como a senha do seu banco — jamais deve ser compartilhada com ninguém. É ela que permite enviar Bitcoin da sua carteira. Quem tem acesso à sua chave privada tem controle total sobre seus fundos.

A frase semente (seed phrase) é uma representação legível das suas chaves privadas. Com ela, qualquer pessoa pode acessar todos os seus Bitcoins em qualquer dispositivo. Por isso, ela deve ser guardada offline, em local seguro, nunca fotografada ou digitada em sites.

Um conceito importante é que cada carteira pode gerar infinitos endereços a partir de uma única seed phrase. É recomendável usar um endereço diferente para cada transação, aumentando sua privacidade na rede.`
      },
      {
        id: 'btc-custody-3',
        title: 'Hot vs Cold Wallets',
        type: 'quiz',
        duration: 5,
        content: `A escolha entre hot e cold wallet depende do valor que você guarda e de como pretende usar seus Bitcoins. Para a família, o ideal geralmente é usar ambas.

Hot wallets (como BlueWallet, Muun ou Electrum) ficam no celular ou computador e são práticas para transações do dia a dia. Porém, por estarem conectadas à internet, são mais vulneráveis a hackers, malware e falhas do dispositivo.

Cold wallets (como Ledger, Trezor ou Coldcard) são dispositivos físicos dedicados que mantêm suas chaves privadas offline. Mesmo que seu computador esteja infectado por vírus, os Bitcoins na cold wallet continuam seguros. São ideais para guardar economias de longo prazo.

Uma boa estratégia familiar é manter uma quantia pequena na hot wallet para transações rápidas e guardar a maior parte na cold wallet. Pense como dinheiro no bolso (hot) versus dinheiro no cofre (cold).

Independentemente do tipo de carteira escolhida, o backup da seed phrase é o passo mais importante. Anote-a em papel (ou em metal, para resistir a fogo e água) e guarde em local seguro. Nunca armazene digitalmente — nem em foto, nem em arquivo de texto, nem na nuvem.`,
        quiz: [
          {
            question: 'O que é uma seed phrase?',
            options: [
              'A senha da corretora',
              'Um conjunto de 12 ou 24 palavras que recupera sua carteira',
              'O nome da sua carteira',
              'Um código de verificação',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual tipo de carteira é mais segura para guardar grandes valores?',
            options: ['Hot wallet no celular', 'Conta na corretora', 'Cold wallet (hardware)', 'Carteira de papel'],
            correctIndex: 2,
          },
          {
            question: 'É seguro fotografar sua seed phrase?',
            options: [
              'Sim, para ter backup digital',
              'Não — fotos podem ser acessadas por hackers',
              'Sim, se salvar na nuvem',
              'Depende do celular',
            ],
            correctIndex: 1,
          },
          {
            question: 'A chave pública pode ser compartilhada?',
            options: [
              'Nunca',
              'Sim — é como seu número de conta',
              'Apenas com familiares',
              'Apenas com a corretora',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'btc-cycles',
    title: 'Ciclos de Mercado',
    emoji: '📊',
    description: 'Entenda os halvings e como investir com estratégia.',
    lessons: [
      {
        id: 'btc-cycles-1',
        title: 'Halvings e Ciclos',
        type: 'text',
        duration: 6,
        content: `O Bitcoin tem ciclos de mercado que historicamente duram cerca de 4 anos, e o principal catalisador desses ciclos é o halving. O halving é um evento programado no código do Bitcoin que reduz pela metade a recompensa que os mineradores recebem a cada bloco.

Os halvings anteriores aconteceram em 2012, 2016, 2020 e 2024. Em cada um deles, a emissão de novos Bitcoins caiu pela metade, aumentando a escassez. Historicamente, o preço do Bitcoin atingiu novos recordes nos 12 a 18 meses seguintes a cada halving.

Um ciclo típico tem quatro fases: acumulação (preços baixos, pouca atenção), alta (preços sobem gradualmente), euforia (crescimento explosivo, mídia fala muito) e correção (preços caem significativamente). Entender essas fases ajuda a família a manter a calma.

É importante ressaltar que resultados passados não garantem resultados futuros. No entanto, a lógica econômica por trás dos ciclos é sólida: quando a oferta de um ativo diminui e a demanda se mantém ou aumenta, o preço tende a subir. O halving é um choque de oferta programado.

Para famílias, o mais importante não é tentar adivinhar o momento perfeito de compra, mas manter uma estratégia consistente de acumulação ao longo dos ciclos, aproveitando períodos de preços mais baixos para comprar mais.`
      },
      {
        id: 'btc-cycles-2',
        title: 'Estratégia de Longo Prazo',
        type: 'quiz',
        duration: 5,
        content: `A melhor estratégia para famílias é pensar no Bitcoin como uma poupança de longo prazo — um horizonte de pelo menos 4 anos (um ciclo completo) ou mais. Tentar fazer trades de curto prazo é arriscado e geralmente resulta em perdas.

O DCA (Dollar Cost Averaging) é a estratégia mais recomendada: comprar um valor fixo regularmente, seja semanal ou mensalmente. Se você compra R$100 por mês, vai comprar mais Bitcoin quando o preço está baixo e menos quando está alto, obtendo um preço médio favorável ao longo do tempo.

Nunca invista mais do que pode perder. Uma regra comum é alocar entre 1% e 10% do patrimônio em Bitcoin, dependendo da sua tolerância ao risco. O Bitcoin é volátil — pode cair 50% ou mais em semanas — e você precisa estar preparado emocionalmente para isso.

HODL é um termo famoso na comunidade que significa "segurar" seus Bitcoins sem vender, mesmo durante quedas. Historicamente, quem manteve seus Bitcoins por mais de 4 anos sempre teve lucro, independentemente do momento de compra.`,
        quiz: [
          {
            question: 'O que é o halving do Bitcoin?',
            options: [
              'Quando o preço cai pela metade',
              'A redução pela metade da recompensa dos mineradores',
              'Quando a rede divide em duas',
              'Uma taxa cobrada nas transações',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual é o horizonte mínimo recomendado para investir em Bitcoin?',
            options: ['1 mês', '6 meses', '4 anos (um ciclo)', '1 semana'],
            correctIndex: 2,
          },
          {
            question: 'O que significa HODL?',
            options: [
              'Vender no topo',
              'Segurar seus Bitcoins sem vender',
              'Comprar na baixa',
              'Uma exchange',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'btc-legacy',
    title: 'Legado Familiar',
    emoji: '👨‍👩‍👧',
    description: 'Bitcoin como poupança e herança para a família.',
    lessons: [
      {
        id: 'btc-legacy-1',
        title: 'Poupança para Filhos',
        type: 'text',
        duration: 5,
        content: `O Bitcoin pode ser uma ferramenta poderosa de poupança para os filhos. Diferente da caderneta de poupança, que perde para a inflação na maioria dos anos, o Bitcoin tem um histórico de valorização expressiva ao longo de períodos mais longos.

Uma estratégia simples é criar uma carteira dedicada para cada filho e fazer depósitos regulares (mensais ou semanais). Mesmo que os valores sejam pequenos — R$50 ou R$100 por mês — ao longo de 10 ou 15 anos, o efeito pode ser transformador.

Ensinar as crianças sobre Bitcoin desde cedo também é uma forma de educação financeira. Elas aprendem conceitos como escassez, poupança, paciência e tecnologia de forma prática e envolvente. É um presente que vai além do financeiro.

Para maior segurança, use uma cold wallet para a poupança dos filhos e guarde a seed phrase em local seguro que outros membros da família conheçam. Documente o processo para que, mesmo na sua ausência, os fundos sejam acessíveis.

Considere criar um "plano familiar de Bitcoin" — defina quanto investir por mês, quem gerencia as carteiras, onde as seed phrases estão guardadas e quando os filhos terão acesso. Organização é fundamental para que o patrimônio digital cumpra seu papel.`
      },
      {
        id: 'btc-legacy-2',
        title: 'Herança Digital',
        type: 'text',
        duration: 5,
        content: `A herança de Bitcoin é um tema crucial que muitas famílias ignoram. Diferente do dinheiro no banco, que pode ser acessado pelos herdeiros via inventário, o Bitcoin só pode ser acessado por quem tem as chaves privadas. Se essas chaves se perdem, os Bitcoins ficam inacessíveis para sempre.

Estima-se que cerca de 20% de todos os Bitcoins já minerados estejam perdidos permanentemente — muitos porque os donos faleceram sem deixar instruções de acesso. Planejar a herança digital é tão importante quanto fazer um testamento.

Uma solução prática é o esquema de "multisignature" (multisig), onde são necessárias múltiplas chaves para movimentar os fundos. Por exemplo, 2 de 3 chaves: uma com você, uma com seu cônjuge e uma em um cofre. Assim, mesmo que uma chave seja perdida, os fundos continuam acessíveis.

Outra abordagem é criar instruções detalhadas em papel, guardadas em local seguro (como um cofre bancário), explicando passo a passo como acessar os Bitcoins da família. Inclua informações sobre quais carteiras são usadas, onde as seed phrases estão e como restaurar o acesso.

Converse abertamente com a família sobre o assunto. Garanta que pelo menos duas pessoas de confiança saibam que o Bitcoin existe e como acessá-lo. A custódia responsável é um ato de amor e planejamento familiar.`
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Course 2 — Ethereum & Dólar Digital
// ─────────────────────────────────────────────

const ethereumModules: StudyModule[] = [
  {
    id: 'eth-intro',
    title: 'Introdução ao Ethereum',
    emoji: '🔵',
    description: 'Conheça a segunda maior criptomoeda do mundo.',
    lessons: [
      {
        id: 'eth-intro-1',
        title: 'O que é Ethereum',
        type: 'text',
        duration: 5,
        content: `O Ethereum é uma plataforma descentralizada criada por Vitalik Buterin em 2015. Enquanto o Bitcoin foi criado principalmente como dinheiro digital, o Ethereum vai além: ele permite executar programas (chamados smart contracts) diretamente na blockchain.

Pense no Ethereum como um computador mundial que nunca desliga. Qualquer desenvolvedor pode criar aplicações que rodam nessa rede, sem precisar de servidores centralizados. Essas aplicações são chamadas de dApps (aplicações descentralizadas).

A moeda nativa do Ethereum é o Ether (ETH), usado para pagar as taxas de execução (chamadas "gas") dos smart contracts e transações na rede. Diferente do Bitcoin, o Ethereum não tem um limite fixo de oferta, mas desde 2022 implementou um mecanismo que queima parte das taxas, tornando-o potencialmente deflacionário.

O Ethereum é a base de praticamente todo o ecossistema de finanças descentralizadas (DeFi), NFTs e stablecoins. A maioria das inovações em cripto acontece primeiro no Ethereum ou em redes compatíveis com ele.`
      },
      {
        id: 'eth-intro-2',
        title: 'Ethereum vs Bitcoin',
        type: 'text',
        duration: 5,
        content: `Bitcoin e Ethereum são complementares, não concorrentes. Cada um foi projetado com um propósito diferente, e entender isso é fundamental para a família que quer investir com sabedoria.

O Bitcoin é otimizado para ser dinheiro digital — uma reserva de valor descentralizada, segura e escassa. Suas regras são simples de propósito: enviar e receber valor. Essa simplicidade é sua força e o que o torna confiável como "ouro digital".

O Ethereum é otimizado para ser uma plataforma de aplicações — um ecossistema programável onde contratos inteligentes executam automaticamente. Sua flexibilidade permite criar desde moedas estáveis até mercados financeiros inteiros sem intermediários.

Em 2022, o Ethereum migrou do sistema Proof of Work (como o Bitcoin) para Proof of Stake, reduzindo seu consumo de energia em mais de 99%. No Proof of Stake, os validadores trancam seus ETH como garantia em vez de usar poder computacional.

Para famílias, uma boa estratégia é ter Bitcoin como reserva de valor principal e Ethereum para acessar o ecossistema DeFi e stablecoins. Os dois se complementam e servem a propósitos diferentes no portfólio.`
      },
      {
        id: 'eth-intro-3',
        title: 'Ecossistema Ethereum',
        type: 'text',
        duration: 5,
        content: `O ecossistema Ethereum é vasto e diversificado. Milhares de projetos e aplicações são construídos sobre a rede, oferecendo serviços financeiros, entretenimento, governança e muito mais — tudo de forma descentralizada.

Os principais setores do ecossistema incluem DeFi (finanças descentralizadas), que oferece empréstimos, poupança e trocas sem bancos; NFTs (tokens não fungíveis), que representam propriedade digital de arte, colecionáveis e mais; e DAOs (organizações autônomas descentralizadas), que permitem governança comunitária.

Redes Layer 2, como Arbitrum, Optimism e Polygon, foram criadas para tornar o Ethereum mais rápido e barato. Elas processam transações fora da rede principal e registram o resultado no Ethereum, mantendo a segurança mas com taxas muito menores.

Para quem está começando, as stablecoins no Ethereum são provavelmente o primeiro contato mais útil. Ter dólares digitais (USDC ou USDT) na blockchain permite proteger-se da desvalorização do real e acessar serviços financeiros globais sem sair de casa.

O ecossistema evolui rapidamente, e novos projetos surgem constantemente. É importante pesquisar bem antes de interagir com qualquer protocolo e começar com valores pequenos até ganhar confiança e experiência.`
      },
    ],
  },
  {
    id: 'eth-contracts',
    title: 'Smart Contracts',
    emoji: '📝',
    description: 'Entenda os contratos inteligentes que rodam sozinhos.',
    lessons: [
      {
        id: 'eth-contracts-1',
        title: 'O que são Smart Contracts',
        type: 'text',
        duration: 6,
        content: `Smart contracts (contratos inteligentes) são programas que rodam automaticamente na blockchain quando condições predefinidas são atendidas. Imagine um contrato que se executa sozinho, sem precisar de advogado, cartório ou juiz.

Um exemplo simples: você pode criar um smart contract que diga "quando a data for 1º de janeiro, envie 0.1 ETH para o endereço do meu filho". Na data programada, a transferência acontece automaticamente, sem que ninguém precise apertar nenhum botão.

Smart contracts são imutáveis — uma vez publicados na blockchain, não podem ser alterados. Isso garante que as regras sejam cumpridas exatamente como programadas, sem que nenhuma das partes possa trapacear. Porém, isso também significa que bugs no código podem ser explorados.

Na prática, smart contracts são a base de tudo que existe no ecossistema DeFi. Corretoras descentralizadas (DEX), protocolos de empréstimo, stablecoins e até seguros — tudo funciona através de smart contracts que executam automaticamente, 24 horas por dia, 7 dias por semana.

É importante entender que interagir com smart contracts envolve riscos. Contratos mal programados ou maliciosos podem drenar seus fundos. Sempre verifique se o protocolo foi auditado e tem boa reputação antes de usar.`
      },
      {
        id: 'eth-contracts-2',
        title: 'Exemplos Práticos de Smart Contracts',
        type: 'quiz',
        duration: 5,
        content: `Vamos ver exemplos concretos de como smart contracts funcionam no dia a dia e como eles podem beneficiar famílias que usam cripto.

Uniswap é uma corretora descentralizada (DEX) que funciona inteiramente com smart contracts. Não existe empresa, sede ou funcionários — apenas código na blockchain que permite trocar uma criptomoeda por outra. Qualquer pessoa pode usar, 24h por dia.

Aave é um protocolo de empréstimos. Você deposita cripto como garantia e pode tomar empréstimos automaticamente, sem análise de crédito ou burocracia. Os juros são definidos por oferta e demanda, em tempo real. Se a garantia cair demais, o contrato liquida automaticamente.

Para famílias, um uso prático de smart contracts é o staking: travar seus ETH em um contrato que ajuda a validar a rede e receber recompensas em troca, similar a juros de poupança, mas geralmente com rendimentos maiores.

Outro exemplo é o uso de carteiras multisig via smart contracts — a família pode criar uma carteira que requer assinatura de 2 de 3 membros para movimentar fundos, adicionando segurança coletiva ao patrimônio digital.`,
        quiz: [
          {
            question: 'O que é um smart contract?',
            options: [
              'Um contrato feito por um advogado digital',
              'Um programa que executa automaticamente na blockchain',
              'Um acordo verbal entre criptomoedas',
              'Uma assinatura digital',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é uma DEX?',
            options: [
              'Uma corretora centralizada',
              'Uma corretora descentralizada baseada em smart contracts',
              'Um tipo de carteira',
              'Uma criptomoeda',
            ],
            correctIndex: 1,
          },
          {
            question: 'Smart contracts podem ser alterados depois de publicados?',
            options: [
              'Sim, a qualquer momento',
              'Sim, com autorização do governo',
              'Não — são imutáveis',
              'Apenas pelo criador',
            ],
            correctIndex: 2,
          },
          {
            question: 'O que é staking de ETH?',
            options: [
              'Vender ETH a preço alto',
              'Travar ETH para ajudar a validar a rede e ganhar recompensas',
              'Comprar ETH parcelado',
              'Minerar ETH com computadores',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'eth-stablecoins',
    title: 'Stablecoins e Dólar Digital',
    emoji: '💵',
    description: 'Proteja-se da inflação com dólar na blockchain.',
    lessons: [
      {
        id: 'eth-stablecoins-1',
        title: 'O que são Stablecoins',
        type: 'text',
        duration: 5,
        content: `Stablecoins são criptomoedas projetadas para manter um valor estável, geralmente atreladas ao dólar americano. Enquanto o Bitcoin pode oscilar 10% em um dia, uma stablecoin como USDC mantém seu valor próximo de US$1,00 o tempo todo.

Elas funcionam como "dólares digitais" que vivem na blockchain. Você pode enviar, receber e guardar USDC ou USDT da mesma forma que faz com qualquer criptomoeda, mas sem a volatilidade. Para famílias brasileiras, é uma forma acessível de ter exposição ao dólar.

Existem diferentes tipos de stablecoins: as colateralizadas por reservas (USDC, USDT), onde cada token é teoricamente lastreado por dólar real em um banco; as cripto-colateralizadas (DAI), lastreadas por outras criptomoedas; e as algorítmicas, que usam mecanismos de oferta/demanda.

O USDC é emitido pela Circle e é considerado um dos mais transparentes, com auditorias regulares. O USDT (Tether) é o mais utilizado em termos de volume, mas historicamente enfrentou mais questionamentos sobre suas reservas.`
      },
      {
        id: 'eth-stablecoins-2',
        title: 'Como Usar Stablecoins no Brasil',
        type: 'text',
        duration: 5,
        content: `Para famílias brasileiras, as stablecoins oferecem benefícios concretos. O principal deles é a proteção cambial: com o real se desvalorizando historicamente frente ao dólar, manter parte das economias em dólares digitais preserva o poder de compra.

Comprar stablecoins é simples. Nas principais corretoras brasileiras, você pode comprar USDC ou USDT diretamente com reais via Pix. Outra opção é comprar ETH e trocá-lo por stablecoins em uma DEX como Uniswap. Os custos são geralmente baixos.

Para enviar dinheiro para o exterior (remessas), stablecoins são muito mais baratas e rápidas que transferências bancárias internacionais. Em vez de pagar taxas de 3-5% e esperar dias, você pode enviar USDC em minutos com taxas mínimas.

É importante guardar suas stablecoins em redes com taxas mais baixas. No Ethereum Layer 1, uma transação pode custar vários dólares. Já em redes Layer 2 (como Arbitrum ou Polygon), as mesmas transações custam centavos. A maioria das corretoras já permite saques nessas redes.

Atenção: stablecoins não são protegidas pelo FGC (Fundo Garantidor de Créditos) como depósitos bancários. O risco, embora pequeno nas principais stablecoins, é que a empresa emissora não tenha as reservas prometidas. Diversificar entre USDC e DAI pode reduzir esse risco.`
      },
      {
        id: 'eth-stablecoins-3',
        title: 'DREX e o Futuro do Real Digital',
        type: 'quiz',
        duration: 5,
        content: `O DREX é o projeto de Real Digital do Banco Central do Brasil — uma versão tokenizada do real que rodará em uma blockchain controlada pelo governo. É diferente das stablecoins descentralizadas e é importante entender as distinções.

O DREX será emitido e controlado pelo Banco Central, funcionando como um real digital "oficial". Ele usará tecnologia de blockchain (provavelmente baseada em Ethereum/Hyperledger), mas será permissionado — apenas instituições autorizadas poderão validar transações.

As vantagens do DREX incluem maior eficiência em pagamentos, possibilidade de programar transações (como smart contracts para compra de imóveis) e inclusão financeira. Porém, ele também permite maior controle governamental sobre o dinheiro, incluindo potencial de rastreio e bloqueio de transações.

Para a família, é importante entender que stablecoins descentralizadas (USDC, DAI) e o DREX servem a propósitos diferentes. Stablecoins oferecem liberdade e privacidade; o DREX oferece conveniência e regulamentação. Ter ambos pode ser a melhor estratégia.

O DREX ainda está em fase de testes e deve ser lançado gradualmente. Quando estiver disponível, será integrado aos bancos e instituições financeiras tradicionais, tornando a experiência transparente para o usuário final.`,
        quiz: [
          {
            question: 'O que é uma stablecoin?',
            options: [
              'Uma criptomoeda que sempre sobe',
              'Uma criptomoeda com valor estável, geralmente atrelada ao dólar',
              'Um tipo de Bitcoin',
              'Uma moeda do governo',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual a principal vantagem de stablecoins para brasileiros?',
            options: [
              'Ganhar rendimentos altos',
              'Proteção contra a desvalorização do real',
              'Anonimato total',
              'Não pagar impostos',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é o DREX?',
            options: [
              'Uma stablecoin descentralizada',
              'O projeto de Real Digital do Banco Central',
              'Uma corretora de criptomoedas',
              'Um tipo de Bitcoin brasileiro',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual rede tem taxas mais baratas para transações de stablecoins?',
            options: [
              'Ethereum Layer 1',
              'Bitcoin',
              'Redes Layer 2 (Arbitrum, Polygon)',
              'Todas custam o mesmo',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'eth-defi',
    title: 'DeFi na Prática',
    emoji: '🏦',
    description: 'Aprenda a usar finanças descentralizadas.',
    lessons: [
      {
        id: 'eth-defi-1',
        title: 'O que é DeFi',
        type: 'text',
        duration: 6,
        content: `DeFi (Finanças Descentralizadas) é um ecossistema de serviços financeiros que funciona sem bancos, corretoras ou qualquer intermediário. Tudo roda em smart contracts na blockchain, acessível a qualquer pessoa com internet e uma carteira cripto.

Imagine poder pegar um empréstimo, aplicar dinheiro, fazer câmbio ou comprar seguros sem precisar ir ao banco, sem análise de crédito e sem burocracia. É exatamente isso que o DeFi oferece. Funciona 24h por dia, 7 dias por semana, sem feriados.

Os principais serviços DeFi incluem: corretoras descentralizadas (DEX) para trocar tokens; protocolos de empréstimo para ganhar juros ou tomar empréstimos; pools de liquidez onde você fornece seus tokens e ganha taxas; e yield farming, onde você maximiza rendimentos em múltiplos protocolos.

O valor total travado em DeFi (TVL) já ultrapassou dezenas de bilhões de dólares, mostrando a confiança crescente nesse sistema. Porém, DeFi ainda é um setor em desenvolvimento, com riscos significativos que precisam ser compreendidos.

Para famílias, o DeFi mais prático é depositar stablecoins em protocolos confiáveis para ganhar rendimentos, similar a um CDB mas na blockchain. Protocolos como Aave e Compound oferecem essa possibilidade com rendimentos que variam conforme o mercado.`
      },
      {
        id: 'eth-defi-2',
        title: 'Rendimentos em DeFi',
        type: 'text',
        duration: 5,
        content: `Ganhar rendimentos em DeFi é uma das aplicações mais populares para famílias que já possuem criptomoedas. Em vez de deixar seus ativos parados na carteira, você pode colocá-los para trabalhar e gerar renda passiva.

A forma mais simples é o "lending" (empréstimo): você deposita seus tokens (como USDC) em um protocolo como Aave ou Compound, e outros usuários pagam juros para tomar esses tokens emprestados. Seus rendimentos são proporcionais ao que você depositou e variam conforme a oferta e demanda.

Outra opção é fornecer liquidez em DEXs como Uniswap. Você deposita pares de tokens (por exemplo, ETH e USDC) em um "pool de liquidez" e recebe uma porcentagem de todas as taxas de negociação. Esse processo requer mais conhecimento por causa do risco de "impermanent loss".

O staking de ETH é provavelmente a opção mais segura para iniciantes. Você deposita seus ETH para ajudar a validar a rede Ethereum e recebe recompensas em troca. Plataformas como Lido permitem fazer staking com qualquer quantidade de ETH.

Cuidado com rendimentos muito altos. Se um protocolo promete retornos de 100% ao ano ou mais, provavelmente é insustentável ou um golpe. Rendimentos de 3-8% ao ano em stablecoins são considerados razoáveis e sustentáveis no ecossistema atual.`
      },
      {
        id: 'eth-defi-3',
        title: 'Riscos e Segurança em DeFi',
        type: 'quiz',
        duration: 5,
        content: `DeFi oferece oportunidades incríveis, mas também carrega riscos significativos que toda família deve entender antes de investir. Conhecer esses riscos é fundamental para proteger o patrimônio.

O principal risco é o de smart contract: bugs no código podem ser explorados por hackers para drenar fundos. Bilhões de dólares já foram roubados de protocolos DeFi. Para se proteger, use apenas protocolos auditados, com histórico longo e TVL alto.

Outro risco é o de liquidez: em momentos de pânico no mercado, pode ser difícil retirar seus fundos rapidamente, especialmente de protocolos menores. Sempre mantenha uma reserva em stablecoins fora de DeFi para emergências.

O risco de stablecoin também existe: se a stablecoin que você usa perder a paridade com o dólar (como aconteceu com UST em 2022), seus investimentos podem ser severamente afetados. Prefira stablecoins comprovadas como USDC e DAI.

Uma regra de ouro para famílias: nunca coloque em DeFi mais do que está disposto a perder completamente. Comece com valores pequenos, aprenda o funcionamento de cada protocolo e só aumente a exposição quando tiver confiança e experiência suficientes.`,
        quiz: [
          {
            question: 'O que é TVL em DeFi?',
            options: [
              'Total de Vendas Líquidas',
              'Total Value Locked — valor total travado no protocolo',
              'Taxa de Variação Líquida',
              'Tipo de Validação de Liquidez',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual rendimento anual em stablecoins é considerado razoável?',
            options: ['50-100%', '3-8%', '200%+', '0%'],
            correctIndex: 1,
          },
          {
            question: 'Qual o principal risco de DeFi?',
            options: [
              'O governo proibir',
              'Bugs em smart contracts explorados por hackers',
              'A internet cair',
              'Inflação do dólar',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual protocolo é usado para staking líquido de ETH?',
            options: ['Uniswap', 'Aave', 'Lido', 'Bitcoin'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'eth-daily',
    title: 'Cripto no Dia a Dia',
    emoji: '💳',
    description: 'Use criptomoedas em compras e pagamentos.',
    lessons: [
      {
        id: 'eth-daily-1',
        title: 'Pagamentos com Cripto',
        type: 'text',
        duration: 5,
        content: `Usar criptomoedas para pagamentos do dia a dia está se tornando cada vez mais acessível no Brasil. Diversas empresas e estabelecimentos já aceitam Bitcoin e outras criptos, e existem soluções que facilitam esse uso.

Cartões de débito cripto, oferecidos por empresas como Binance e Crypto.com, permitem usar seus criptoativos em qualquer estabelecimento que aceite Visa ou Mastercard. Os saldos em cripto são convertidos automaticamente em reais no momento da compra.

A Lightning Network do Bitcoin permite pagamentos instantâneos com taxas mínimas. Alguns estabelecimentos no Brasil já aceitam pagamentos via Lightning, especialmente em grandes cidades. Aplicativos como Wallet of Satoshi tornam o processo simples.

Para stablecoins, é cada vez mais comum transferir USDC ou USDT via redes como Polygon, com taxas quase zero. Muitos freelancers e prestadores de serviço já aceitam pagamento em stablecoins, especialmente para trabalhos internacionais.

É importante lembrar que no Brasil, pagamentos em cripto são tributáveis. Quando você converte cripto em reais (ou em bens/serviços), isso pode gerar obrigação de declarar e, em alguns casos, pagar imposto sobre ganho de capital.`
      },
      {
        id: 'eth-daily-2',
        title: 'Remessas Internacionais',
        type: 'text',
        duration: 5,
        content: `Uma das aplicações mais práticas de criptomoedas para famílias é o envio de dinheiro para o exterior (remessas). Transferências bancárias internacionais tradicionais são caras, lentas e burocráticas. Cripto muda isso completamente.

Enviar stablecoins (como USDC) para alguém em outro país custa centavos em redes Layer 2 e leva minutos. Compare com uma transferência bancária internacional que cobra de 2% a 5% em taxas e pode levar de 1 a 5 dias úteis.

Para famílias com parentes no exterior, esse uso é transformador. Se um filho está estudando fora, os pais podem enviar USDC que pode ser convertido em moeda local via corretoras em qualquer país. O processo é rápido, barato e transparente.

Empresas como Wise e Remitly já oferecem boas taxas para remessas, mas cripto vai além: não tem limites de horário, não depende de bancos abertos e funciona em feriados. Além disso, o destinatário pode optar por manter os fundos em dólar digital ou converter para moeda local.

Para usar essa estratégia, ambos (remetente e destinatário) precisam ter carteiras cripto e acesso a uma corretora no país de destino para converter stablecoins em moeda local, se necessário.`
      },
      {
        id: 'eth-daily-3',
        title: 'Impostos e Regulamentação',
        type: 'text',
        duration: 5,
        content: `No Brasil, criptomoedas são tributadas e precisam ser declaradas no Imposto de Renda. Ignorar essa obrigação pode gerar multas e problemas legais. Entender as regras básicas protege a família e evita surpresas.

Operações em corretoras brasileiras acima de R$30.000 por mês são reportadas automaticamente à Receita Federal. Para corretoras no exterior, o próprio contribuinte deve declarar operações acima de R$30.000 mensais. Desde 2023, transferências entre carteiras próprias também precisam ser reportadas.

Ganhos de capital na venda de criptomoedas são tributados quando as vendas no mês ultrapassam R$35.000. A alíquota varia de 15% a 22,5% sobre o lucro, conforme o valor do ganho. Vendas abaixo de R$35.000 mensais são isentas de imposto sobre ganho de capital.

Todas as criptomoedas devem ser declaradas na ficha "Bens e Direitos" do IR, pelo custo de aquisição. Isso inclui Bitcoin, Ethereum, stablecoins e tokens DeFi. Ferramentas como Koinly e CoinTracker ajudam a calcular impostos automaticamente.

A regulamentação cripto no Brasil tem avançado com o Marco Legal das Criptomoedas (Lei 14.478/2022), que estabeleceu regras para prestadores de serviços de ativos virtuais. É importante acompanhar as atualizações, pois as regras podem mudar.`
      },
    ],
  },
  {
    id: 'eth-custody',
    title: 'Autocustódia Ethereum',
    emoji: '🔐',
    description: 'Gerencie suas chaves Ethereum com segurança.',
    lessons: [
      {
        id: 'eth-custody-1',
        title: 'Carteiras para Ethereum',
        type: 'text',
        duration: 5,
        content: `A autocustódia no Ethereum funciona de forma similar ao Bitcoin, mas com algumas particularidades importantes. A carteira Ethereum armazena não apenas ETH, mas todos os tokens e NFTs que existem nessa rede.

A MetaMask é a carteira mais popular do ecossistema Ethereum. Disponível como extensão de navegador e aplicativo mobile, ela permite interagir com dApps, DeFi e todo o ecossistema Web3. Porém, por ser uma hot wallet, não é ideal para grandes valores.

Para valores maiores, a combinação ideal é uma hardware wallet (Ledger ou Trezor) conectada à MetaMask. Assim, você tem a praticidade da MetaMask para interagir com DeFi, mas as chaves privadas ficam seguras no dispositivo físico.

Uma diferença importante do Ethereum: ao interagir com smart contracts, você concede "aprovações" (allowances) que permitem ao contrato movimentar seus tokens. É crucial revisar e revogar aprovações de protocolos que você não usa mais, usando ferramentas como revoke.cash.

Carteiras alternativas como Rainbow, Zerion e Rabby oferecem interfaces mais amigáveis e algumas funcionalidades adicionais de segurança, como alertas de transações suspeitas. Explore diferentes opções e escolha a que melhor se adapta ao uso da família.`
      },
      {
        id: 'eth-custody-2',
        title: 'Segurança no Ecossistema Ethereum',
        type: 'quiz',
        duration: 5,
        content: `O ecossistema Ethereum tem vetores de ataque específicos que não existem no Bitcoin. Conhecer esses riscos é essencial para manter seus ativos seguros.

O golpe mais comum é o phishing via dApps falsos. Sites que imitam protocolos populares (como uma Uniswap falsa) pedem para você conectar sua carteira e assinar transações que drenam todos os seus tokens. Sempre verifique a URL antes de conectar sua carteira.

"Approval scams" são outro perigo: ao interagir com um contrato malicioso, você pode dar permissão ilimitada para ele movimentar seus tokens. Sempre use aprovações limitadas (apenas o valor necessário) e revogue aprovações antigas regularmente no revoke.cash.

Airdrops falsos são comuns: tokens desconhecidos aparecem na sua carteira e, ao tentar vendê-los, você interage com um smart contract malicioso que drena seus fundos. A regra é simples: nunca interaja com tokens que apareceram sozinhos na sua carteira.

Para famílias, a melhor prática é manter a maior parte dos fundos em uma cold wallet, usar uma hot wallet apenas com valores pequenos para DeFi, e sempre simular transações antes de confirmá-las usando ferramentas como Tenderly ou a funcionalidade de simulação do Rabby.`,
        quiz: [
          {
            question: 'O que são "approvals" no Ethereum?',
            options: [
              'Confirmações de transação',
              'Permissões que você concede a smart contracts para movimentar seus tokens',
              'Aprovação do governo para usar cripto',
              'Confirmação de identidade',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual a carteira Ethereum mais popular?',
            options: ['BlueWallet', 'MetaMask', 'Electrum', 'Wallet of Satoshi'],
            correctIndex: 1,
          },
          {
            question: 'O que fazer com tokens desconhecidos que aparecem na sua carteira?',
            options: [
              'Vendê-los imediatamente',
              'Ignorar — nunca interagir com eles',
              'Transferir para outra carteira',
              'Pesquisar o preço e decidir',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual ferramenta serve para revogar aprovações de smart contracts?',
            options: ['MetaMask', 'revoke.cash', 'Uniswap', 'Aave'],
            correctIndex: 1,
          },
          {
            question: 'Qual a configuração mais segura para usar DeFi?',
            options: [
              'MetaMask no celular',
              'Hardware wallet conectada à MetaMask',
              'Conta na corretora',
              'Carteira de papel',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Course 3 — Autocustódia Avançada
// ─────────────────────────────────────────────

const custodyModules: StudyModule[] = [
  {
    id: 'cust-fundamentals',
    title: 'Fundamentos da Autocustódia',
    emoji: '🔑',
    description: 'Por que e como custodiar seus próprios ativos.',
    lessons: [
      {
        id: 'cust-fundamentals-1',
        title: 'Por que Autocustódia é Importante',
        type: 'text',
        duration: 5,
        content: `"Not your keys, not your coins" é o lema mais importante do mundo cripto. Autocustódia significa que você, e somente você, tem controle total sobre suas criptomoedas. Ninguém pode congelar, confiscar ou bloquear seus fundos.

A história está repleta de exemplos que reforçam essa necessidade. A exchange Mt. Gox perdeu 850.000 Bitcoins dos clientes em 2014. A FTX colapsou em 2022, deixando milhões de usuários sem acesso a seus fundos. Confiar suas criptos a terceiros sempre envolve risco de contraparte.

Quando seus Bitcoins ou ETH estão em uma corretora, tecnicamente pertencem à corretora. Você tem apenas uma promessa de que poderá sacá-los. Em caso de falência, hack ou problemas regulatórios, essa promessa pode não ser cumprida.

A autocustódia coloca você no controle. Seus ativos estão diretamente na blockchain, protegidos por criptografia matemática. Nenhum governo, empresa ou hacker pode acessá-los sem suas chaves privadas.

Para famílias, a autocustódia é especialmente importante porque envolve o patrimônio de todos. Um planejamento cuidadoso de como gerenciar e transmitir as chaves garante que os ativos digitais estarão seguros para as próximas gerações.`
      },
      {
        id: 'cust-fundamentals-2',
        title: 'Seed Phrases e Backups',
        type: 'text',
        duration: 6,
        content: `A seed phrase (frase semente) é o elemento mais crítico da autocustódia. Essas 12 ou 24 palavras são a representação humana da sua chave privada mestra, e com elas qualquer pessoa pode acessar todos os seus fundos em qualquer dispositivo.

A geração da seed phrase deve ser feita offline, em um dispositivo confiável. Hardware wallets geram a seed de forma segura, sem nunca expô-la à internet. Nunca gere sua seed em um site web ou aplicativo desconhecido.

O backup da seed phrase deve ser físico — nunca digital. Anotar em papel é o mínimo. Para maior durabilidade, grave em placas de metal (aço ou titânio) que resistem a fogo, água e corrosão. Produtos como Cryptosteel ou Billfodl são projetados para esse fim.

Guarde o backup em local seguro: cofre pessoal, cofre bancário ou distribuído entre locais diferentes. Considere a regra 3-2-1: 3 cópias, em 2 tipos de mídia diferentes, com 1 cópia em local geograficamente separado.

Nunca armazene sua seed phrase digitalmente: nem em fotos, documentos, e-mails, notas do celular ou nuvem. Hackers usam malware específico para buscar padrões de seed phrases em dispositivos comprometidos. Uma única foto pode custar todo o seu patrimônio.`
      },
      {
        id: 'cust-fundamentals-3',
        title: 'Tipos de Carteiras',
        type: 'quiz',
        duration: 5,
        content: `Existem diversos tipos de carteiras cripto, cada uma com diferentes níveis de segurança, praticidade e indicações de uso. Entender as diferenças é fundamental para escolher a combinação certa para a família.

Carteiras custodiais são aquelas onde um terceiro (como uma corretora) guarda suas chaves. São práticas, mas você depende da empresa. Carteiras não-custodiais são aquelas onde você controla as chaves — podem ser hot (software) ou cold (hardware).

Carteiras de papel são a forma mais simples de cold storage: as chaves são impressas em papel e nunca tocam um computador. São seguras contra hackers, mas vulneráveis a danos físicos e erros humanos.

Carteiras multisig (multi-assinatura) exigem mais de uma chave para autorizar transações. Por exemplo, uma configuração "2 de 3" precisa de 2 assinaturas de um total de 3 chaves. Isso adiciona segurança e é ideal para famílias ou empresas.

Carteiras com timelock permitem programar um período de espera antes de transações serem executadas. Se alguém obtiver acesso à sua carteira, o timelock dá tempo para você agir e mover os fundos antes que o atacante consiga.`,
        quiz: [
          {
            question: 'O que aconteceu com a exchange FTX?',
            options: [
              'Foi comprada pela Binance',
              'Colapsou e clientes perderam acesso aos fundos',
              'Se tornou a maior do mundo',
              'Foi regulamentada pelo governo',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual é a regra 3-2-1 de backup?',
            options: [
              '3 senhas, 2 carteiras, 1 exchange',
              '3 cópias, 2 tipos de mídia, 1 cópia em local separado',
              '3 Bitcoins, 2 Ethereum, 1 stablecoin',
              '3 tentativas, 2 confirmações, 1 validação',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é uma carteira multisig?',
            options: [
              'Uma carteira com múltiplas moedas',
              'Uma carteira que exige múltiplas assinaturas para transações',
              'Uma carteira com várias senhas',
              'Uma carteira conectada a múltiplas exchanges',
            ],
            correctIndex: 1,
          },
          {
            question: 'É seguro guardar a seed phrase em foto no celular?',
            options: [
              'Sim, se o celular tiver senha',
              'Sim, se usar nuvem privada',
              'Não — malware pode detectar e roubar',
              'Sim, se apagar depois',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'cust-hot',
    title: 'Hot Wallets',
    emoji: '📱',
    description: 'Carteiras de software para uso diário.',
    lessons: [
      {
        id: 'cust-hot-1',
        title: 'Melhores Hot Wallets',
        type: 'text',
        duration: 5,
        content: `Hot wallets são carteiras que ficam conectadas à internet, geralmente como aplicativos no celular ou extensões no navegador. São práticas para o dia a dia, mas exigem cuidados de segurança por estarem sempre online.

Para Bitcoin, as melhores opções incluem BlueWallet (interface simples e suporte a Lightning Network), Muun (fácil de usar, com Lightning integrado) e Electrum (mais avançada, com recursos como coin control e multisig).

Para Ethereum e tokens ERC-20, MetaMask é a mais popular e compatível com praticamente todo o ecossistema DeFi. Rabby é uma alternativa com funcionalidades de segurança adicionais, como simulação de transações. Rainbow e Zerion oferecem interfaces bonitas e intuitivas.

Carteiras multi-chain como Trust Wallet e Exodus permitem gerenciar Bitcoin, Ethereum e dezenas de outras criptomoedas em um único aplicativo. São convenientes, mas carteiras especializadas geralmente oferecem melhor segurança e mais recursos.

Ao escolher uma hot wallet, priorize: código aberto (para que a comunidade possa auditar), histórico sem incidentes de segurança, equipe de desenvolvimento ativa e boa reputação na comunidade. Evite carteiras desconhecidas, mesmo que prometam recursos extras.`
      },
      {
        id: 'cust-hot-2',
        title: 'Boas Práticas com Hot Wallets',
        type: 'quiz',
        duration: 5,
        content: `Usar hot wallets com segurança requer disciplina e boas práticas. Seguindo regras simples, você pode minimizar significativamente os riscos de perder seus fundos.

Regra número um: mantenha apenas valores pequenos em hot wallets — o equivalente ao "dinheiro na carteira do bolso". Grandes valores devem ficar em cold storage. Se você não ficaria confortável andando pela rua com esse valor no bolso, não deveria estar em uma hot wallet.

Mantenha o sistema operacional e os aplicativos sempre atualizados. Atualizações frequentemente corrigem vulnerabilidades de segurança. Use um celular dedicado para cripto, se possível, ou pelo menos não instale aplicativos suspeitos no mesmo dispositivo.

Faça backup da seed phrase imediatamente ao criar a carteira e teste a recuperação antes de enviar fundos significativos. Muitas pessoas perdem cripto porque nunca verificaram se o backup realmente funciona.

Nunca conecte sua hot wallet principal a sites desconhecidos ou dApps não verificados. Considere ter uma "carteira burner" — uma carteira separada com valor mínimo — para testar novos protocolos e sites antes de usar sua carteira principal.`,
        quiz: [
          {
            question: 'Quanto valor deve ser mantido em uma hot wallet?',
            options: [
              'Todo o patrimônio cripto',
              'Apenas valores pequenos, como dinheiro no bolso',
              'Pelo menos 50% dos fundos',
              'Qualquer valor, pois é totalmente seguro',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é uma "carteira burner"?',
            options: [
              'Uma carteira que queima tokens',
              'Uma carteira separada com valor mínimo para testar dApps',
              'Uma carteira que para de funcionar',
              'Um tipo de cold wallet',
            ],
            correctIndex: 1,
          },
          {
            question: 'Qual carteira Bitcoin tem suporte integrado à Lightning Network?',
            options: ['Electrum', 'MetaMask', 'BlueWallet / Muun', 'Trust Wallet'],
            correctIndex: 2,
          },
          {
            question: 'Quando deve ser feito o backup da seed phrase?',
            options: [
              'Depois de acumular bastante saldo',
              'Imediatamente ao criar a carteira',
              'Uma vez por mês',
              'Apenas quando trocar de celular',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'cust-cold',
    title: 'Cold Wallets',
    emoji: '🛡️',
    description: 'Hardware wallets para proteção máxima.',
    lessons: [
      {
        id: 'cust-cold-1',
        title: 'Escolhendo uma Hardware Wallet',
        type: 'text',
        duration: 6,
        content: `Hardware wallets são dispositivos físicos projetados exclusivamente para armazenar chaves privadas offline. São consideradas o padrão ouro em segurança para autocustódia de criptomoedas.

A Ledger (modelos Nano S Plus e Nano X) é a mais popular do mercado. Suporta mais de 5.500 criptoativos e se integra com MetaMask e outros softwares. O Nano X tem Bluetooth para uso com celular. A Ledger usa um chip de segurança certificado (Secure Element).

A Trezor (modelos Safe 3 e Safe 5) é a rival direta da Ledger e foi a primeira hardware wallet do mercado. Seu software é totalmente de código aberto, o que é vantajoso para transparência. O Safe 5 tem tela colorida touchscreen.

A Coldcard é considerada a opção mais segura para bitcoiners puristas. É exclusiva para Bitcoin, tem recursos avançados como air-gapped operation (nunca precisa conectar ao computador) e é totalmente de código aberto. Porém, é menos amigável para iniciantes.

Ao comprar uma hardware wallet, sempre compre diretamente do fabricante ou de revendedores autorizados. Nunca compre de terceiros em marketplaces, pois o dispositivo pode ter sido adulterado. Na entrega, verifique se a embalagem está lacrada e sem sinais de violação.`
      },
      {
        id: 'cust-cold-2',
        title: 'Configurando e Usando Cold Wallets',
        type: 'quiz',
        duration: 5,
        content: `Configurar uma hardware wallet pela primeira vez requer atenção e paciência. Um setup bem feito é a base da segurança do seu patrimônio digital.

Ao inicializar o dispositivo, ele gerará uma seed phrase de 24 palavras. Anote cada palavra com cuidado, na ordem correta, em papel ou placa de metal. Verifique duas vezes. O dispositivo pedirá para confirmar algumas palavras — esse é seu primeiro teste de backup.

Configure um PIN forte no dispositivo. Sem o PIN, ninguém pode acessar a carteira mesmo tendo o dispositivo físico. Algumas hardware wallets permitem configurar um "PIN de coação" que abre uma carteira falsa caso você seja forçado a desbloquear.

Para enviar criptomoedas, conecte a hardware wallet ao computador ou celular, use o software oficial (Ledger Live, Trezor Suite) para preparar a transação, e confirme no dispositivo verificando o endereço e valor na tela do hardware. Nunca confie apenas na tela do computador.

Atualize o firmware do dispositivo regularmente, sempre através do software oficial. Atualizações corrigem vulnerabilidades e adicionam suporte a novos ativos. Após atualizar, verifique se seus fundos continuam acessíveis antes de guardar o dispositivo.`,
        quiz: [
          {
            question: 'Onde deve-se comprar uma hardware wallet?',
            options: [
              'No Mercado Livre pelo menor preço',
              'Diretamente do fabricante ou revendedores autorizados',
              'De um amigo que não usa mais',
              'Em qualquer loja de eletrônicos',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é um "PIN de coação" em hardware wallets?',
            options: [
              'O PIN principal do dispositivo',
              'Um PIN que apaga todos os dados',
              'Um PIN que abre uma carteira falsa caso você seja forçado',
              'Um PIN de backup',
            ],
            correctIndex: 2,
          },
          {
            question: 'Qual hardware wallet é exclusiva para Bitcoin e considerada a mais segura?',
            options: ['Ledger Nano X', 'Trezor Safe 5', 'Coldcard', 'MetaMask Hardware'],
            correctIndex: 2,
          },
          {
            question: 'Por que verificar a transação na tela da hardware wallet?',
            options: [
              'Para ver o saldo',
              'Porque a tela do computador pode ser manipulada por malware',
              'Para ligar o Bluetooth',
              'Não é necessário verificar',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'cust-security',
    title: 'Segurança Avançada',
    emoji: '⚠️',
    description: 'Proteja-se contra ameaças sofisticadas.',
    lessons: [
      {
        id: 'cust-security-1',
        title: 'Ataques Comuns e Como se Proteger',
        type: 'text',
        duration: 6,
        content: `Conhecer os principais tipos de ataques é a primeira linha de defesa para proteger seu patrimônio em criptomoedas. Hackers usam diversas técnicas, mas a maioria explora erros humanos, não falhas tecnológicas.

Phishing é o ataque mais comum: e-mails, mensagens ou sites falsos que imitam serviços legítimos (corretoras, carteiras) para roubar suas credenciais ou seed phrase. Sempre verifique URLs com cuidado e nunca insira sua seed em sites.

SIM swap é quando criminosos clonam seu chip de celular, obtendo acesso ao seu número e, consequentemente, a códigos de verificação por SMS. Para se proteger, use autenticação por aplicativo (Google Authenticator/Authy) em vez de SMS e considere um número dedicado para cripto.

Malware e keyloggers podem capturar tudo que você digita, incluindo senhas e seed phrases. Mantenha seu sistema atualizado, use antivírus confiável e, idealmente, tenha um computador dedicado para transações cripto. Nunca digite sua seed phrase em um computador.

Ataques de "wrench" ($5 wrench attack) são ameaças físicas — quando alguém te força fisicamente a entregar suas criptos. Para se proteger, use carteiras com plausible deniability (carteiras ocultas), PINs de coação e nunca divulgue publicamente quanto possui em cripto.`
      },
      {
        id: 'cust-security-2',
        title: 'Passphrase e Carteiras Ocultas',
        type: 'text',
        duration: 5,
        content: `A passphrase (às vezes chamada de "25ª palavra") é um recurso avançado de segurança que adiciona uma camada extra de proteção à sua seed phrase. Ela cria uma carteira completamente diferente e oculta, derivada da mesma seed.

Funciona assim: sua seed phrase de 24 palavras gera a carteira "padrão". Se você adicionar uma passphrase (qualquer texto ou frase), uma carteira completamente nova é criada. Sem saber a passphrase exata, é impossível saber que essa segunda carteira existe.

Esse recurso é poderoso para "plausible deniability" — negação plausível. Se forçado a abrir sua carteira, você pode usar a seed sem passphrase, que terá apenas uma pequena quantia de "isca". Os fundos reais estarão na carteira com passphrase, invisíveis.

Cuidado: a passphrase é sensível a maiúsculas, minúsculas, espaços e caracteres especiais. "Bitcoin" e "bitcoin" geram carteiras completamente diferentes. Se você esquecer a passphrase exata, perderá acesso aos fundos permanentemente.

Para famílias, a passphrase deve ser memorizada por pelo menos duas pessoas e, idealmente, ter um backup separado da seed phrase. Nunca guarde seed e passphrase no mesmo local — isso anularia o benefício de segurança.`
      },
      {
        id: 'cust-security-3',
        title: 'Plano de Segurança Familiar',
        type: 'quiz',
        duration: 5,
        content: `Criar um plano de segurança familiar é essencial para garantir que o patrimônio em criptomoedas esteja protegido contra todas as ameaças — digitais, físicas e imprevistos da vida.

O plano deve responder a perguntas fundamentais: quem tem acesso às chaves? Onde estão os backups? O que acontece se o titular principal ficar incapacitado? Como os herdeiros acessam os fundos? Quanto está em cada carteira?

Documente (em papel, guardado em local seguro) todas as carteiras da família, quais ativos cada uma contém, onde as seed phrases estão guardadas e as instruções passo a passo para acessar os fundos. Atualize esse documento sempre que fizer mudanças significativas.

Considere usar um esquema Shamir Secret Sharing (SSS), que divide a seed phrase em partes distribuídas entre familiares ou locais. Por exemplo, dividir em 3 partes onde qualquer 2 são suficientes para reconstruir a seed completa.

Teste o plano periodicamente. Peça a um familiar para seguir as instruções e verificar se consegue acessar os fundos (sem realmente movimentá-los). Se houver dificuldade, simplifique o processo. A segurança só é eficaz se for praticável.`,
        quiz: [
          {
            question: 'O que é uma passphrase (25ª palavra)?',
            options: [
              'A última palavra da seed phrase',
              'Uma camada extra que cria uma carteira oculta a partir da mesma seed',
              'A senha da hardware wallet',
              'Um código de recuperação do fabricante',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é Shamir Secret Sharing?',
            options: [
              'Um tipo de criptomoeda',
              'Um método que divide a seed em partes distribuídas',
              'Um protocolo de pagamento',
              'Uma exchange descentralizada',
            ],
            correctIndex: 1,
          },
          {
            question: 'Onde guardar seed phrase e passphrase?',
            options: [
              'Juntas no mesmo cofre',
              'Em locais separados, nunca juntas',
              'Na nuvem, em contas diferentes',
              'No mesmo papel, para não perder',
            ],
            correctIndex: 1,
          },
          {
            question: 'O que é "plausible deniability" em cripto?',
            options: [
              'Negar que possui cripto nas redes sociais',
              'Ter uma carteira oculta que ninguém sabe que existe',
              'Esconder o celular',
              'Usar nome falso na corretora',
            ],
            correctIndex: 1,
          },
          {
            question: 'Com que frequência o plano de segurança deve ser testado?',
            options: [
              'Nunca — basta criar uma vez',
              'Periodicamente, com familiares tentando seguir as instruções',
              'Apenas quando mudar de carteira',
              'A cada 10 anos',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'cust-payments',
    title: 'Apps e Pagamentos',
    emoji: '💳',
    description: 'Use seus criptoativos no mundo real.',
    lessons: [
      {
        id: 'cust-payments-1',
        title: 'Cartões Cripto no Brasil',
        type: 'text',
        duration: 5,
        content: `Cartões cripto permitem gastar seus criptoativos em qualquer estabelecimento que aceite Visa ou Mastercard. No momento da compra, o saldo em cripto é automaticamente convertido em reais. Para a família, é uma ponte entre o mundo cripto e o dia a dia.

A Binance oferece o Binance Card, que permite gastar saldos em BTC, ETH, BNB e diversas stablecoins. O cashback varia conforme o nível de uso e pode chegar a 8% em BNB. Funciona com bandeira Visa e pode ser usado em compras online e físicas.

A Crypto.com tem um dos programas de cartão mais robustos, com diferentes níveis baseados no staking de CRO. Os benefícios incluem cashback, acesso a lounges de aeroporto e reembolso em streaming. Porém, alguns benefícios exigem travar valores significativos.

Para quem quer uma opção mais simples, a Bitrefill permite comprar gift cards de centenas de lojas brasileiras usando Bitcoin ou Lightning Network. Você pode comprar créditos para iFood, Uber, Amazon, Netflix e muito mais, diretamente da sua carteira.

Ao usar cartões cripto, lembre-se que cada conversão de cripto para real pode gerar um evento tributável. Mantenha registros de todas as transações para facilitar a declaração de imposto de renda.`
      },
      {
        id: 'cust-payments-2',
        title: 'Lightning Network na Prática',
        type: 'text',
        duration: 5,
        content: `A Lightning Network é uma rede de segunda camada construída sobre o Bitcoin que permite pagamentos instantâneos com taxas mínimas. Enquanto uma transação normal de Bitcoin pode levar 10 minutos e custar vários reais, na Lightning é instantâneo e custa centavos.

Para usar a Lightning, você precisa de uma carteira compatível. As mais populares incluem Wallet of Satoshi (a mais fácil para iniciantes), Phoenix (não-custodial, boa para privacidade), BlueWallet (com funcionalidade Lightning integrada) e Breez (focada em pagamentos).

Na prática, pagar com Lightning funciona como Pix: o recebedor gera um QR code (chamado "invoice"), você escaneia com sua carteira e o pagamento é processado em menos de um segundo. Muitos estabelecimentos no Brasil já aceitam, especialmente em São Paulo e Rio.

A Lightning Network também permite "streaming de pagamentos" — enviar satoshis em tempo real. Isso é usado em plataformas de podcast (como Fountain), onde ouvintes enviam sats diretamente aos criadores enquanto ouvem os episódios.

Para famílias, a Lightning é ideal para pagamentos pequenos e cotidianos: comprar café, pagar almoço, presentear parentes com satoshis. Mantenha uma quantia modesta na carteira Lightning e use-a como um "Pix descentralizado" no dia a dia.`
      },
      {
        id: 'cust-payments-3',
        title: 'Pagamentos com Stablecoins',
        type: 'text',
        duration: 5,
        content: `Pagamentos com stablecoins estão se tornando cada vez mais populares, especialmente para transações maiores e internacionais. A estabilidade do valor (atrelado ao dólar) elimina a preocupação com volatilidade que existe ao pagar com Bitcoin ou ETH.

Para enviar stablecoins com custo mínimo, use redes Layer 2 como Polygon, Arbitrum ou Base. Uma transferência de USDC na Polygon custa frações de centavo e é confirmada em segundos. Compare com os custos de 1-5 dólares no Ethereum Layer 1.

Freelancers e profissionais que trabalham para empresas internacionais cada vez mais recebem em stablecoins. O processo é simples: o empregador envia USDC para sua carteira, e você pode converter para reais em uma corretora via Pix. O custo total é significativamente menor que transferências bancárias internacionais.

Alguns apps brasileiros já integram stablecoins de forma transparente. O Nubank, por exemplo, oferece compra de USDC diretamente pelo aplicativo. Exchanges como Mercado Bitcoin e Foxbit permitem sacar stablecoins para carteiras próprias com facilidade.

Para a família, uma boa prática é manter uma reserva de emergência em stablecoins, separada dos investimentos em Bitcoin e ETH. Essa reserva combina a estabilidade do dólar com a acessibilidade e liberdade da blockchain — disponível 24 horas, sem limites de saque ou burocracias bancárias.`
      },
    ],
  },
];

export const studyData: CourseStudyData[] = [
  {
    courseId: 1,
    title: 'Bitcoin',
    modules: bitcoinModules,
  },
  {
    courseId: 2,
    title: 'Ethereum & Dólar Digital',
    modules: ethereumModules,
  },
  {
    courseId: 3,
    title: 'Autocustódia Avançada',
    modules: custodyModules,
  },
];
