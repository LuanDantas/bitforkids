import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Check,
  Trash2,
  Calendar,
  Clock,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  Wallet,
  X,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PaymentsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [selectedTab, setSelectedTab] = useState('history');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      holder: 'João Silva',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'credit',
      brand: 'Mastercard',
      last4: '8888',
      holder: 'João Silva',
      expiryDate: '08/26',
      isDefault: false,
    },
  ]);

  const transactions = [
    {
      id: 1,
      type: 'purchase',
      description: 'Mini Curso GPS Bitcoin',
      amount: 67.0,
      date: '15/01/2024',
      status: 'completed',
      method: 'Visa •••• 4242',
    },
    {
      id: 2,
      type: 'purchase',
      description: 'Curso Autocustódia',
      amount: 97.0,
      date: '10/01/2024',
      status: 'completed',
      method: 'Mastercard •••• 8888',
    },
    {
      id: 3,
      type: 'cashback',
      description: 'Cashback acumulado',
      amount: 20.0,
      date: '10/01/2024',
      status: 'completed',
      method: 'Bitcoin',
    },
    {
      id: 4,
      type: 'purchase',
      description: 'Curso DeFi e Ethereum',
      amount: 397.0,
      date: '05/01/2024',
      status: 'completed',
      method: 'Visa •••• 4242',
    },
    {
      id: 5,
      type: 'purchase',
      description: 'Pacote Completo',
      amount: 790.0,
      date: '01/01/2024',
      status: 'refunded',
      method: 'Visa •••• 4242',
    },
  ];

  const stats = {
    totalSpent: transactions
      .filter((t) => t.type === 'purchase' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    cashbackReceived: transactions
      .filter((t) => t.type === 'cashback')
      .reduce((sum, t) => sum + t.amount, 0),
  };

  // Detect card brand from number
  const getCardBrand = (number: string) => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('34') || number.startsWith('37'))
      return 'American Express';
    return 'Credit Card';
  };

  // Handle add card
  const handleAddCard = () => {
    if (
      !newCard.number ||
      !newCard.holder ||
      !newCard.expiryMonth ||
      !newCard.expiryYear ||
      !newCard.cvv
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validate card number
    if (
      newCard.number.replace(/\s/g, '').length < 13 ||
      newCard.number.replace(/\s/g, '').length > 19
    ) {
      Alert.alert('Erro', 'Número do cartão inválido');
      return;
    }

    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    const brand = getCardBrand(newCard.number);
    const expiryDate = `${newCard.expiryMonth}/${newCard.expiryYear}`;

    const newPaymentMethod = {
      id: Date.now(),
      type: 'credit',
      brand,
      last4,
      holder: newCard.holder,
      expiryDate,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setShowAddModal(false);
    setNewCard({
      number: '',
      holder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    });

    Alert.alert('Sucesso', 'Cartão adicionado com sucesso!');
  };

  // Handle set default card
  const handleSetDefaultCard = (id: number) => {
    const updatedMethods = paymentMethods.map((card) => ({
      ...card,
      isDefault: card.id === id,
    }));
    setPaymentMethods(updatedMethods);
    const card = paymentMethods.find((c) => c.id === id);
    Alert.alert(
      'Sucesso',
      `${card?.brand} •••• ${card?.last4} agora é seu cartão padrão!`
    );
  };

  // Handle remove card
  const handleRemoveCard = (id: number) => {
    const cardToRemove = paymentMethods.find((card) => card.id === id);

    if (cardToRemove?.isDefault) {
      Alert.alert(
        'Aviso',
        'Você não pode remover o cartão padrão. Defina outro cartão como padrão primeiro.'
      );
      return;
    }

    Alert.alert(
      'Remover Cartão',
      `Tem certeza que deseja remover o cartão ${cardToRemove?.brand} •••• ${cardToRemove?.last4}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter((card) => card.id !== id));
            Alert.alert('Sucesso', 'Cartão removido com sucesso!');
          },
        },
      ]
    );
  };

  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamentos</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <TrendingDown size={24} color="#EF4444" />
          <Text style={[styles.statValue, { color: colors.text }]}>
            R$ {stats.totalSpent.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Total Gasto
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <TrendingUp size={24} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text }]}>
            R$ {stats.cashbackReceived.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Cashback
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: selectedTab === 'history' ? '#8B5CF6' : colors.card },
          ]}
          onPress={() => setSelectedTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'history' ? '#FFFFFF' : colors.text },
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: selectedTab === 'methods' ? '#8B5CF6' : colors.card },
          ]}
          onPress={() => setSelectedTab('methods')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'methods' ? '#FFFFFF' : colors.text },
            ]}
          >
            Métodos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {selectedTab === 'history' && (
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Últimas Transações
            </Text>

            {transactions.map((transaction) => (
              <View
                key={transaction.id}
                style={[
                  styles.transactionCard,
                  { backgroundColor: colors.surface },
                ]}
              >
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: `${colors.primary}20` },
                    ]}
                  >
                    {transaction.type === 'purchase' ? (
                      <TrendingDown size={20} color={colors.primary} />
                    ) : (
                      <TrendingUp size={20} color="#10B981" />
                    )}
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text
                      style={[
                        styles.transactionDescription,
                        { color: colors.text },
                      ]}
                    >
                      {transaction.description}
                    </Text>
                    <Text
                      style={[
                        styles.transactionMethod,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {transaction.method}
                    </Text>
                    <Text
                      style={[
                        styles.transactionDate,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {transaction.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === 'purchase'
                            ? '#EF4444'
                            : '#10B981',
                      },
                    ]}
                  >
                    {transaction.type === 'purchase' ? '-' : '+'}R${' '}
                    {transaction.amount.toFixed(2).replace('.', ',')}
                  </Text>
                  {transaction.status === 'completed' && (
                    <View style={styles.statusBadge}>
                      <Check size={12} color="#10B981" />
                      <Text style={styles.statusText}>Concluído</Text>
                    </View>
                  )}
                  {transaction.status === 'refunded' && (
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: '#FEF3C7' },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: '#92400E' }]}>
                        Reembolsado
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color={colors.primary} />
              <Text style={[styles.downloadText, { color: colors.primary }]}>
                Baixar Extrato Completo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedTab === 'methods' && (
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Cartões Salvos
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddModal(true)}
              >
                <Plus size={20} color="white" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>

            {paymentMethods.map((method) => (
              <View
                key={method.id}
                style={[styles.methodCard, { backgroundColor: colors.surface }]}
              >
                <TouchableOpacity
                  style={styles.methodLeft}
                  onPress={() => handleSetDefaultCard(method.id)}
                  disabled={method.isDefault}
                >
                  <View
                    style={[
                      styles.methodIcon,
                      { backgroundColor: `${colors.primary}20` },
                    ]}
                  >
                    <CreditCard size={24} color={colors.primary} />
                  </View>

                  <View style={styles.methodInfo}>
                    <View style={styles.methodHeader}>
                      <Text
                        style={[styles.methodBrand, { color: colors.text }]}
                      >
                        {method.brand}
                      </Text>
                      {method.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultText}>Padrão</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.methodNumber,
                        { color: colors.textSecondary },
                      ]}
                    >
                      •••• •••• •••• {method.last4}
                    </Text>
                    <Text
                      style={[
                        styles.methodDetails,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {method.holder} • Expira em {method.expiryDate}
                    </Text>
                    {!method.isDefault && (
                      <Text
                        style={[styles.tapToDefault, { color: colors.primary }]}
                      >
                        Toque para definir como padrão
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.methodActions}>
                  {method.isDefault && <Check size={24} color="#10B981" />}
                  {!method.isDefault && (
                    <TouchableOpacity
                      onPress={() => handleRemoveCard(method.id)}
                    >
                      <Trash2 size={20} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            <View style={styles.emptyMethods}>
              <Wallet size={48} color={colors.textTertiary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Você pode adicionar múltiplos cartões
              </Text>
              <Text
                style={[styles.emptySubtext, { color: colors.textTertiary }]}
              >
                Seus dados são criptografados e seguros
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Add Card Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Adicionar Cartão
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Número do Cartão
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text },
                  ]}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={colors.textTertiary}
                  value={newCard.number}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(
                      text.replace(/[^0-9]/g, '')
                    );
                    setNewCard({ ...newCard, number: formatted });
                  }}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Nome no Cartão
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text },
                  ]}
                  placeholder="JOÃO SILVA"
                  placeholderTextColor={colors.textTertiary}
                  value={newCard.holder}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, holder: text.toUpperCase() })
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Validade
                  </Text>
                  <View style={styles.expiryRow}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.expiryInput,
                        {
                          backgroundColor: colors.background,
                          color: colors.text,
                        },
                      ]}
                      placeholder="MM"
                      placeholderTextColor={colors.textTertiary}
                      value={newCard.expiryMonth}
                      onChangeText={(text) => {
                        const num = text.replace(/[^0-9]/g, '');
                        if (
                          num === '' ||
                          (parseInt(num) >= 1 && parseInt(num) <= 12)
                        ) {
                          setNewCard({ ...newCard, expiryMonth: num });
                        }
                      }}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <Text
                      style={[styles.expirySeparator, { color: colors.text }]}
                    >
                      /
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        styles.expiryInput,
                        {
                          backgroundColor: colors.background,
                          color: colors.text,
                        },
                      ]}
                      placeholder="AA"
                      placeholderTextColor={colors.textTertiary}
                      value={newCard.expiryYear}
                      onChangeText={(text) => {
                        const num = text.replace(/[^0-9]/g, '');
                        setNewCard({ ...newCard, expiryYear: num });
                      }}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    CVV
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.background,
                        color: colors.text,
                      },
                    ]}
                    placeholder="123"
                    placeholderTextColor={colors.textTertiary}
                    value={newCard.cvv}
                    onChangeText={(text) => {
                      const num = text.replace(/[^0-9]/g, '');
                      setNewCard({ ...newCard, cvv: num });
                    }}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddCard}
              >
                <Text style={styles.submitButtonText}>Adicionar Cartão</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerRight: {
    width: 44,
    height: 44,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'white',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionMethod: {
    fontSize: 12,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    marginTop: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
  },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  methodBrand: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  methodNumber: {
    fontSize: 14,
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 12,
  },
  tapToDefault: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  methodActions: {
    marginLeft: 12,
  },
  emptyMethods: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expiryInput: {
    flex: 1,
  },
  expirySeparator: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
