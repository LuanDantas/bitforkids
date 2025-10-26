import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CrossSellCard from '@/components/CrossSellCard';
import CashbackBanner from '@/components/CashbackBanner';
import BundleOffer from '@/components/BundleOffer';
import {
  ArrowLeft,
  Play,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Download,
  Share,
  Heart,
  PlayCircle,
  FileText,
  Video,
  HelpCircle,
  MessageCircle,
  Send,
  UserCircle,
  Shield,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: 'Pedro Almeida',
      date: '2024-01-18',
      question: 'Qual é a diferença entre Bitcoin e Ethereum?',
      answer:
        'Bitcoin é principalmente uma moeda digital focada em transações peer-to-peer, enquanto Ethereum é uma plataforma que permite a criação de contratos inteligentes e aplicações descentralizadas. Ambos usam blockchain, mas com propósitos diferentes.',
      answerBy: 'Prof. Maria Santos',
      answerDate: '2024-01-18',
    },
    {
      id: 2,
      user: 'Juliana Souza',
      date: '2024-01-17',
      question:
        'É necessário comprar um Bitcoin inteiro para começar a investir?',
      answer:
        'Não! Você pode comprar frações de Bitcoin. É possível começar com valores bem pequenos, já que o Bitcoin é divisível até 8 casas decimais (a menor unidade é chamada de Satoshi).',
      answerBy: 'Prof. Maria Santos',
      answerDate: '2024-01-17',
    },
    {
      id: 3,
      user: 'Roberto Dias',
      date: '2024-01-16',
      question: 'Qual carteira vocês recomendam para iniciantes?',
      answer: null,
    },
  ]);

  // Mock course data - in real app, this would come from API
  const course = {
    id: 1,
    title:
      id === '7' || id === '8' || id === '9'
        ? id === '7'
          ? 'Bitcoin para Iniciantes - GRÁTIS'
          : id === '8'
          ? 'Carteiras Digitais - Básico GRÁTIS'
          : 'Blockchain Explicado - GRÁTIS'
        : 'Fundamentos do Bitcoin e Blockchain',
    description:
      id === '7' || id === '8' || id === '9'
        ? id === '7'
          ? 'Curso introdutório gratuito sobre Bitcoin e criptomoedas. Aprenda os conceitos básicos sem custo algum.'
          : id === '8'
          ? 'Aprenda a criar e usar carteiras digitais com segurança. Curso gratuito para iniciantes.'
          : 'Entenda como funciona a tecnologia blockchain de forma simples e gratuita.'
        : 'Um curso completo e abrangente sobre Bitcoin, tecnologia blockchain e o futuro das criptomoedas. Aprenda desde os conceitos básicos até estratégias avançadas de investimento e análise técnica.',
    instructor: {
      name:
        id === '7'
          ? 'Prof. João Santos'
          : id === '8'
          ? 'Prof. Ana Costa'
          : id === '9'
          ? 'Prof. Roberto Lima'
          : 'Prof. Maria Santos',
      bio:
        id === '7'
          ? 'Especialista em educação financeira e criptomoedas, com foco em ensino para iniciantes.'
          : id === '8'
          ? 'Especialista em segurança digital e carteiras de criptomoedas.'
          : id === '9'
          ? 'Desenvolvedor blockchain e educador, especialista em explicar conceitos técnicos de forma simples.'
          : 'Especialista em criptomoedas com mais de 8 anos de experiência no mercado financeiro e blockchain. Formada em Economia pela USP e certificada em Análise Técnica.',
      avatar: id === '7' ? 'JS' : id === '8' ? 'AC' : id === '9' ? 'RL' : 'MS',
      courses: 12,
      students:
        id === '7' ? 3200 : id === '8' ? 2800 : id === '9' ? 4100 : 15000,
      rating: 4.9,
    },
    rating: id === '7' ? 4.5 : id === '8' ? 4.4 : id === '9' ? 4.6 : 4.8,
    reviews: id === '7' ? 156 : id === '8' ? 98 : id === '9' ? 203 : 324,
    students: id === '7' ? 3200 : id === '8' ? 2800 : id === '9' ? 4100 : 1250,
    duration:
      id === '7'
        ? '2h 15min'
        : id === '8'
        ? '1h 45min'
        : id === '9'
        ? '3h 00min'
        : '4h 30min',
    lessons: id === '7' ? 8 : id === '8' ? 6 : id === '9' ? 10 : 24,
    price: id === '7' || id === '8' || id === '9' ? 'GRÁTIS' : 'R$ 149,90',
    originalPrice: id === '7' || id === '8' || id === '9' ? null : 'R$ 199,90',
    isFree: id === '7' || id === '8' || id === '9',
    level: 'Iniciante',
    category: 'Blockchain',
    language: 'Português',
    lastUpdated: '2024',
    certificate: false,
    downloadable: true,
    hasCashback: !(id === '7' || id === '8' || id === '9'),
    cashbackPercentage: !(id === '7' || id === '8' || id === '9') ? 15 : 0,
    cashbackAmount: !(id === '7' || id === '8' || id === '9')
      ? 'R$ 22,49'
      : null,
    objectives: [
      ...(id === '7'
        ? [
            'Entender o que é Bitcoin e como funciona',
            'Conhecer a história das criptomoedas',
            'Aprender conceitos básicos de blockchain',
            'Identificar vantagens e riscos do Bitcoin',
          ]
        : id === '8'
        ? [
            'Criar sua primeira carteira digital',
            'Entender tipos de carteiras (hot e cold)',
            'Aprender práticas de segurança',
            'Fazer backup e recuperação de carteiras',
          ]
        : id === '9'
        ? [
            'Compreender como funciona a blockchain',
            'Entender conceitos de descentralização',
            'Conhecer aplicações da blockchain',
            'Identificar diferentes tipos de blockchain',
          ]
        : [
            'Entender completamente o que é Bitcoin e como funciona',
            'Compreender a tecnologia blockchain e suas aplicações',
            'Aprender a comprar, armazenar e transferir Bitcoin com segurança',
            'Dominar estratégias básicas de investimento em criptomoedas',
            'Conhecer as principais exchanges e carteiras digitais',
            'Entender análise técnica básica para trading',
          ]),
    ],
    requirements: [
      'Conhecimento básico de informática',
      'Acesso à internet',
      'Interesse em aprender sobre tecnologia financeira',
    ],
    modules: [
      {
        id: 1,
        title:
          id === '7'
            ? 'O que é Bitcoin?'
            : id === '8'
            ? 'Introdução às Carteiras'
            : id === '9'
            ? 'Fundamentos da Blockchain'
            : 'Introdução ao Bitcoin',
        lessons: id === '7' ? 3 : id === '8' ? 2 : id === '9' ? 4 : 6,
        duration:
          id === '7'
            ? '45min'
            : id === '8'
            ? '30min'
            : id === '9'
            ? '1h 00min'
            : '1h 15min',
        completed: false,
        lessons_detail: [
          ...(id === '7'
            ? [
                {
                  id: 1,
                  title: 'O que é Bitcoin?',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'História das Criptomoedas',
                  type: 'video',
                  duration: '20min',
                  completed: false,
                },
                {
                  id: 3,
                  title: 'Quiz Básico',
                  type: 'quiz',
                  duration: '10min',
                  completed: false,
                },
              ]
            : id === '8'
            ? [
                {
                  id: 1,
                  title: 'Tipos de Carteiras',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'Criando sua Carteira',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
              ]
            : id === '9'
            ? [
                {
                  id: 1,
                  title: 'O que é Blockchain?',
                  type: 'video',
                  duration: '20min',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'Como funciona?',
                  type: 'video',
                  duration: '25min',
                  completed: false,
                },
                {
                  id: 3,
                  title: 'Aplicações práticas',
                  type: 'video',
                  duration: '10min',
                  completed: false,
                },
                {
                  id: 4,
                  title: 'Quiz Final',
                  type: 'quiz',
                  duration: '5min',
                  completed: false,
                },
              ]
            : [
                {
                  id: 1,
                  title: 'O que é Bitcoin?',
                  type: 'video',
                  duration: '12min',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'História das Criptomoedas',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
                {
                  id: 3,
                  title: 'Como funciona o Bitcoin',
                  type: 'video',
                  duration: '18min',
                  completed: false,
                },
                {
                  id: 4,
                  title: 'Vantagens e Desvantagens',
                  type: 'video',
                  duration: '10min',
                  completed: false,
                },
                {
                  id: 5,
                  title: 'Material de Apoio',
                  type: 'pdf',
                  duration: '5min',
                  completed: false,
                },
                {
                  id: 6,
                  title: 'Quiz - Módulo 1',
                  type: 'quiz',
                  duration: '15min',
                  completed: false,
                },
              ]),
        ],
      },
      ...(!(id === '7' || id === '8' || id === '9')
        ? [
            {
              id: 2,
              title: 'Blockchain e Criptografia',
              lessons: 8,
              duration: '1h 45min',
              completed: false,
              lessons_detail: [
                {
                  id: 7,
                  title: 'Fundamentos da Blockchain',
                  type: 'video',
                  duration: '20min',
                  completed: false,
                },
                {
                  id: 8,
                  title: 'Criptografia e Hashing',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
                {
                  id: 9,
                  title: 'Mineração e Consenso',
                  type: 'video',
                  duration: '25min',
                  completed: false,
                },
                {
                  id: 10,
                  title: 'Tipos de Blockchain',
                  type: 'video',
                  duration: '12min',
                  completed: false,
                },
                {
                  id: 11,
                  title: 'Smart Contracts',
                  type: 'video',
                  duration: '18min',
                  completed: false,
                },
                {
                  id: 12,
                  title: 'Casos de Uso',
                  type: 'video',
                  duration: '10min',
                  completed: false,
                },
                {
                  id: 13,
                  title: 'Exercícios Práticos',
                  type: 'pdf',
                  duration: '10min',
                  completed: false,
                },
                {
                  id: 14,
                  title: 'Avaliação - Módulo 2',
                  type: 'quiz',
                  duration: '15min',
                  completed: false,
                },
              ],
            },
            {
              id: 3,
              title: 'Carteiras e Segurança',
              lessons: 5,
              duration: '1h 00min',
              completed: false,
              lessons_detail: [
                {
                  id: 15,
                  title: 'Tipos de Carteiras',
                  type: 'video',
                  duration: '15min',
                  completed: false,
                },
                {
                  id: 16,
                  title: 'Configurando sua Carteira',
                  type: 'video',
                  duration: '20min',
                  completed: false,
                },
                {
                  id: 17,
                  title: 'Backup e Recuperação',
                  type: 'video',
                  duration: '12min',
                  completed: false,
                },
                {
                  id: 18,
                  title: 'Boas Práticas de Segurança',
                  type: 'video',
                  duration: '8min',
                  completed: false,
                },
                {
                  id: 19,
                  title: 'Teste Final - Segurança',
                  type: 'quiz',
                  duration: '5min',
                  completed: false,
                },
              ],
            },
            {
              id: 4,
              title: 'Estratégias de Investimento',
              lessons: 5,
              duration: '30min',
              completed: false,
              lessons_detail: [
                {
                  id: 20,
                  title: 'Análise Fundamentalista',
                  type: 'video',
                  duration: '8min',
                  completed: false,
                },
                {
                  id: 21,
                  title: 'Análise Técnica Básica',
                  type: 'video',
                  duration: '10min',
                  completed: false,
                },
                {
                  id: 22,
                  title: 'Gerenciamento de Risco',
                  type: 'video',
                  duration: '7min',
                  completed: false,
                },
                {
                  id: 23,
                  title: 'Estratégias de Longo Prazo',
                  type: 'video',
                  duration: '5min',
                  completed: false,
                },
                {
                  id: 24,
                  title: 'Avaliação Final',
                  type: 'quiz',
                  duration: '10min',
                  completed: false,
                },
              ],
            },
          ]
        : []),
    ],
    reviews_sample: [
      {
        id: 1,
        user: 'João Silva',
        rating: 5,
        comment:
          'Excelente curso! Muito didático e completo. Recomendo para quem está começando.',
        date: '2024-01-15',
      },
      {
        id: 2,
        user: 'Ana Costa',
        rating: 5,
        comment:
          'A professora explica muito bem. Consegui entender conceitos que antes eram confusos.',
        date: '2024-01-10',
      },
      {
        id: 3,
        user: 'Carlos Lima',
        rating: 4,
        comment: 'Bom conteúdo, mas poderia ter mais exemplos práticos.',
        date: '2024-01-08',
      },
    ],
  };

  // Cross-sell and Upsell courses
  const crossSellCourses = [
    {
      id: 5,
      title: 'Ethereum e Smart Contracts',
      instructor: 'Prof. Ana Costa',
      rating: 4.7,
      students: 890,
      duration: '3h 45min',
      price: 'R$ 129,90',
      originalPrice: 'R$ 179,90',
      discount: 28,
      level: 'Intermediário',
      category: 'Blockchain',
    },
    {
      id: 6,
      title: 'Análise Técnica para Cripto',
      instructor: 'Prof. Carlos Lima',
      rating: 4.9,
      students: 1200,
      duration: '5h 20min',
      price: 'R$ 199,90',
      level: 'Intermediário',
      category: 'Trading',
    },
  ];

  const upsellCourses = [
    {
      id: 7,
      title: 'Trading Profissional de Bitcoin',
      instructor: 'Prof. Maria Santos',
      rating: 4.8,
      students: 650,
      duration: '8h 30min',
      price: 'R$ 399,90',
      originalPrice: 'R$ 499,90',
      discount: 20,
      level: 'Avançado',
      category: 'Trading',
    },
  ];

  const bundleOffer = {
    id: 1,
    title: 'Pacote Completo Bitcoin Master',
    description:
      'Tudo que você precisa saber sobre Bitcoin, do básico ao avançado, incluindo trading e análise técnica.',
    courses: [
      { id: 1, title: 'Fundamentos do Bitcoin', duration: '4h 30min' },
      { id: 7, title: 'Trading Profissional de Bitcoin', duration: '8h 30min' },
      { id: 6, title: 'Análise Técnica para Cripto', duration: '5h 20min' },
    ],
    originalPrice: 'R$ 749,70',
    bundlePrice: 'R$ 499,90',
    savings: 'R$ 249,80',
    savingsPercentage: 33,
    rating: 4.8,
    totalDuration: '18h 20min',
    features: [
      'Acesso vitalício a todos os cursos',
      'Suporte direto com instrutores',
      'Grupo VIP no Telegram',
      'Atualizações gratuitas',
      'Garantia de 30 dias',
    ],
  };

  const handleEnroll = () => {
    if (enrolled) {
      Alert.alert('Já inscrito', 'Você já está inscrito neste curso!');
      return;
    }

    if (course.isFree) {
      setEnrolled(true);
      Alert.alert('Sucesso!', 'Você agora tem acesso gratuito a este curso!');
      return;
    }

    Alert.alert(
      'Confirmar inscrição',
      `Deseja se inscrever no curso "${course.title}" por ${course.price}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setEnrolled(true);
            Alert.alert('Sucesso!', 'Você foi inscrito no curso com sucesso!');
          },
        },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Compartilhar',
      'Funcionalidade de compartilhamento será implementada'
    );
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Funcionalidade de download será implementada');
  };

  const handleSendQuestion = () => {
    if (newQuestion.trim()) {
      const newQuestionObj = {
        id: questions.length + 1,
        user: 'Você',
        date: new Date().toISOString().split('T')[0],
        question: newQuestion,
        answer: null,
      };
      setQuestions([newQuestionObj, ...questions]);
      setNewQuestion('');
      Alert.alert(
        'Sucesso!',
        'Sua pergunta foi enviada. O instrutor responderá em breve.'
      );
    } else {
      Alert.alert('Atenção', 'Por favor, digite sua pergunta.');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return '#10B981';
      case 'Intermediário':
        return '#F59E0B';
      case 'Avançado':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'pdf':
        return FileText;
      case 'quiz':
        return HelpCircle;
      default:
        return PlayCircle;
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre o curso</Text>
              <Text style={styles.description}>{course.description}</Text>
            </View>

            {/* Objectives */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>O que você vai aprender</Text>
              {course.objectives.map((objective, index) => (
                <View key={index} style={styles.objectiveItem}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.objectiveText}>{objective}</Text>
                </View>
              ))}
            </View>

            {/* Requirements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pré-requisitos</Text>
              {course.requirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.requirementText}>{requirement}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'curriculum':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.contentSummary}>
                <Text style={styles.contentSummaryText}>
                  {course.modules.length} módulos • {course.lessons} aulas •{' '}
                  {course.duration}
                </Text>
              </View>

              {course.modules.map((module) => (
                <View key={module.id} style={styles.moduleItem}>
                  <TouchableOpacity style={styles.moduleHeader}>
                    <View style={styles.moduleIcon}>
                      <BookOpen size={20} color="#8B5CF6" />
                    </View>
                    <View style={styles.moduleInfo}>
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                      <Text style={styles.moduleStats}>
                        {module.lessons} aulas • {module.duration}
                      </Text>
                    </View>
                    {module.completed && (
                      <CheckCircle size={20} color="#10B981" />
                    )}
                  </TouchableOpacity>

                  {/* Lesson Details */}
                  <View style={styles.lessonsList}>
                    {module.lessons_detail.map((lesson) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      return (
                        <TouchableOpacity
                          key={lesson.id}
                          style={styles.lessonItem}
                        >
                          <View style={styles.lessonIcon}>
                            <LessonIcon size={16} color="#9CA3AF" />
                          </View>
                          <View style={styles.lessonInfo}>
                            <Text style={styles.lessonTitle}>
                              {lesson.title}
                            </Text>
                            <Text style={styles.lessonDuration}>
                              {lesson.duration}
                            </Text>
                          </View>
                          {lesson.completed && (
                            <CheckCircle size={16} color="#10B981" />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case 'instructor':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.instructorCard}>
                <View style={styles.instructorHeader}>
                  <View style={styles.instructorAvatar}>
                    <Text style={styles.instructorInitial}>
                      {course.instructor.avatar}
                    </Text>
                  </View>
                  <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>
                      {course.instructor.name}
                    </Text>
                    <View style={styles.instructorStats}>
                      <View style={styles.instructorStat}>
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.instructorStatText}>
                          {course.instructor.rating}
                        </Text>
                      </View>
                      <View style={styles.instructorStat}>
                        <BookOpen size={14} color="#9CA3AF" />
                        <Text style={styles.instructorStatText}>
                          {course.instructor.courses} cursos
                        </Text>
                      </View>
                      <View style={styles.instructorStat}>
                        <Users size={14} color="#9CA3AF" />
                        <Text style={styles.instructorStatText}>
                          {course.instructor.students.toLocaleString()} alunos
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.instructorBio}>
                  {course.instructor.bio}
                </Text>
              </View>
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.reviewsHeader}>
                <View style={styles.reviewsRating}>
                  <Text style={styles.reviewsRatingNumber}>
                    {course.rating}
                  </Text>
                  <View style={styles.reviewsStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        color="#F59E0B"
                        fill={
                          star <= Math.floor(course.rating)
                            ? '#F59E0B'
                            : 'transparent'
                        }
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewsCount}>
                    ({course.reviews} avaliações)
                  </Text>
                </View>
              </View>

              {course.reviews_sample.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewInitial}>
                        {review.user.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <View style={styles.reviewRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            color="#F59E0B"
                            fill={
                              star <= review.rating ? '#F59E0B' : 'transparent'
                            }
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'questions':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Perguntas e Respostas</Text>
              <Text style={styles.sectionSubtitle}>
                Tire suas dúvidas diretamente com o instrutor
              </Text>

              {/* Question Input */}
              <View style={styles.questionInputContainer}>
                <View style={styles.questionInputWrapper}>
                  <MessageCircle size={20} color="#8B5CF6" />
                  <TextInput
                    style={styles.questionInput}
                    placeholder="Digite sua pergunta..."
                    placeholderTextColor="#6B7280"
                    value={newQuestion}
                    onChangeText={setNewQuestion}
                    multiline
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendQuestion}
                >
                  <LinearGradient
                    colors={['#8B5CF6', '#3B82F6']}
                    style={styles.sendButtonGradient}
                  >
                    <Send size={20} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Questions List */}
              <View style={styles.questionsContainer}>
                <Text style={styles.questionsCount}>
                  {questions.length}{' '}
                  {questions.length === 1 ? 'pergunta' : 'perguntas'}
                </Text>

                {questions.map((q) => (
                  <View key={q.id} style={styles.questionCard}>
                    {/* Question */}
                    <View style={styles.questionHeader}>
                      <View style={styles.questionUserAvatar}>
                        <UserCircle size={20} color="#8B5CF6" />
                      </View>
                      <View style={styles.questionUserInfo}>
                        <Text style={styles.questionUser}>{q.user}</Text>
                        <Text style={styles.questionDate}>{q.date}</Text>
                      </View>
                    </View>
                    <Text style={styles.questionText}>{q.question}</Text>

                    {/* Answer */}
                    {q.answer ? (
                      <View style={styles.answerContainer}>
                        <View style={styles.answerHeader}>
                          <View style={styles.answerBadge}>
                            <Shield size={16} color="#10B981" />
                            <Text style={styles.answerBadgeText}>
                              Resposta do Instrutor
                            </Text>
                          </View>
                          <Text style={styles.answerDate}>{q.answerDate}</Text>
                        </View>
                        <View style={styles.answerContent}>
                          <View style={styles.answerAvatarSmall}>
                            <Text style={styles.answerAvatarText}>MS</Text>
                          </View>
                          <View style={styles.answerTextContainer}>
                            <Text style={styles.answerBy}>{q.answerBy}</Text>
                            <Text style={styles.answerText}>{q.answer}</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.pendingAnswer}>
                        <HelpCircle size={16} color="#F59E0B" />
                        <Text style={styles.pendingAnswerText}>
                          Aguardando resposta do instrutor
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case 'offers':
        return (
          <View style={styles.tabContent}>
            {/* Cashback Banner */}
            {course.hasCashback && (
              <View style={styles.section}>
                <CashbackBanner
                  cashbackPercentage={course.cashbackPercentage}
                  cashbackAmount={course.cashbackAmount || 'R$ 0,00'}
                  onPress={() =>
                    Alert.alert(
                      'Cashback',
                      'Você receberá o cashback após a compra!'
                    )
                  }
                />
              </View>
            )}

            {/* Bundle Offer */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Oferta Especial</Text>
              <BundleOffer
                bundle={bundleOffer}
                onPress={() =>
                  Alert.alert(
                    'Bundle',
                    'Redirecionando para o pacote completo...'
                  )
                }
              />
            </View>

            {/* Upsell Courses */}
            {upsellCourses.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Aprimore seus conhecimentos
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {upsellCourses.map((upsellCourse) => (
                    <CrossSellCard
                      key={upsellCourse.id}
                      course={upsellCourse}
                      type="upsell"
                      onPress={() => router.push(`/course/${upsellCourse.id}`)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Cross-sell Courses */}
            {crossSellCourses.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cursos relacionados</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {crossSellCourses.map((crossSellCourse) => (
                    <CrossSellCard
                      key={crossSellCourse.id}
                      course={crossSellCourse}
                      type="crosssell"
                      onPress={() =>
                        router.push(`/course/${crossSellCourse.id}`)
                      }
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1a1a1a', '#2a1a4a']} style={styles.header}>
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
              onPress={() => setLiked(!liked)}
            >
              <Heart
                size={20}
                color={liked ? '#EF4444' : 'white'}
                fill={liked ? '#EF4444' : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.courseHeader}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.8)', 'rgba(59, 130, 246, 0.8)']}
            style={styles.courseImage}
          >
            <Play size={40} color="white" />
          </LinearGradient>

          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.instructor}>por {course.instructor.name}</Text>

            <View style={styles.courseStats}>
              <View style={styles.statItem}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statText}>{course.rating}</Text>
                <Text style={styles.statSubtext}>({course.reviews})</Text>
              </View>

              <View style={styles.statItem}>
                <Users size={16} color="#9CA3AF" />
                <Text style={styles.statText}>
                  {course.students.toLocaleString()}
                </Text>
              </View>

              <View style={styles.statItem}>
                <Clock size={16} color="#9CA3AF" />
                <Text style={styles.statText}>{course.duration}</Text>
              </View>
            </View>

            <View style={styles.courseBadges}>
              <View
                style={[
                  styles.levelBadge,
                  { backgroundColor: `${getLevelColor(course.level)}20` },
                ]}
              >
                <Text
                  style={[
                    styles.levelText,
                    { color: getLevelColor(course.level) },
                  ]}
                >
                  {course.level}
                </Text>
              </View>

              {course.downloadable && (
                <View style={styles.featureBadge}>
                  <Download size={12} color="#10B981" />
                  <Text style={styles.featureText}>Download</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'overview', label: 'Visão Geral' },
            { key: 'curriculum', label: 'Conteúdo' },
            { key: 'instructor', label: 'Instrutor' },
            { key: 'reviews', label: 'Avaliações' },
            { key: 'questions', label: 'Perguntas' },
            { key: 'offers', label: 'Ofertas' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{course.price}</Text>
            {course.originalPrice && (
              <Text style={styles.originalPrice}>{course.originalPrice}</Text>
            )}
          </View>
          <Text style={styles.priceSubtext}>
            {course.isFree ? 'Acesso gratuito' : 'Acesso vitalício'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.enrollButton, enrolled && styles.enrolledButton]}
          onPress={handleEnroll}
        >
          <LinearGradient
            colors={
              enrolled
                ? ['#10B981', '#059669']
                : course.isFree
                ? ['#10B981', '#059669']
                : ['#8B5CF6', '#3B82F6']
            }
            style={styles.enrollGradient}
          >
            {enrolled ? (
              <View style={styles.enrolledContent}>
                <CheckCircle size={20} color="white" />
                <Text style={styles.enrollText}>Inscrito</Text>
              </View>
            ) : (
              <Text style={styles.enrollText}>
                {course.isFree ? 'Acessar Grátis' : 'Inscrever-se'}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    lineHeight: 24,
  },
  instructor: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  courseBadges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  tabsContainer: {
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingBottom: 20,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  objectiveText: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
    lineHeight: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
    marginTop: 7,
  },
  requirementText: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
    lineHeight: 20,
  },
  contentSummary: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  contentSummaryText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  moduleItem: {
    marginBottom: 16,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  moduleStats: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  lessonsList: {
    marginTop: 8,
    paddingLeft: 16,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  instructorCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  instructorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructorInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: 'row',
    gap: 16,
  },
  instructorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorStatText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  instructorBio: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  reviewsHeader: {
    marginBottom: 20,
  },
  reviewsRating: {
    alignItems: 'center',
  },
  reviewsRatingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  reviewsStars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  reviewItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  priceSection: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  originalPrice: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  enrollButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: 16,
  },
  enrolledButton: {},
  enrollGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  enrolledContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  enrollText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
    lineHeight: 20,
  },
  questionInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  questionInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  questionInput: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    backgroundColor: 'transparent',
    minHeight: 40,
  },
  sendButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsContainer: {
    gap: 16,
  },
  questionsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  questionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questionUserInfo: {
    flex: 1,
  },
  questionUser: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  questionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  questionText: {
    fontSize: 15,
    color: '#D1D5DB',
    lineHeight: 22,
    marginBottom: 12,
  },
  answerContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  answerBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  answerDate: {
    fontSize: 11,
    color: '#6B7280',
  },
  answerContent: {
    flexDirection: 'row',
    gap: 10,
  },
  answerAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  answerTextContainer: {
    flex: 1,
  },
  answerBy: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  pendingAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  pendingAnswerText: {
    fontSize: 13,
    color: '#F59E0B',
    fontStyle: 'italic',
  },
});
