import React, { useState, useEffect, useCallback } from 'react';
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
import { useLanguage } from '@/contexts/LanguageContext';
import {
  paymentsApi,
  PaymentMethod,
  TransactionItem,
} from '@/services/api/payments';
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
  const { colors, fonts, isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('history');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  type CardVM = {
    id: string;
    type: string;
    brand: string;
    last4: string;
    holder: string;
    expiryDate: string;
    isDefault: boolean;
  };
  type TxVM = {
    id: string;
    type: 'purchase' | 'cashback' | 'other';
    description: string;
    amount: number;
    date: string;
    status: string;
    method: string;
  };

  const [paymentMethods, setPaymentMethods] = useState<CardVM[]>([]);
  const [transactions, setTransactions] = useState<TxVM[]>([]);
  const [cashbackCents, setCashbackCents] = useState(0);

  const mapCard = (m: PaymentMethod): CardVM => ({
    id: m.id,
    type: 'credit',
    brand: m.brand,
    last4: m.last4,
    holder: m.holderName,
    expiryDate: `${String(m.expMonth).padStart(2, '0')}/${String(m.expYear).slice(-2)}`,
    isDefault: m.isDefault,
  });

  const load = useCallback(async () => {
    try {
      const [cards, txs, cashback] = await Promise.all([
        paymentsApi.listPaymentMethods(),
        paymentsApi.transactions(),
        paymentsApi.cashback(),
      ]);
      setCashbackCents(cashback.totalEarnedCents);
      const cardById = new Map(cards.map((c) => [c.id, c]));
      setPaymentMethods(cards.map(mapCard));
      setTransactions(
        txs.map((tx: TransactionItem): TxVM => {
          const isPurchase = tx.type === 'PURCHASE';
          const isCashback = tx.type === 'CASHBACK';
          const card = tx.paymentMethodId
            ? cardById.get(tx.paymentMethodId)
            : undefined;
          return {
            id: tx.id,
            type: isPurchase ? 'purchase' : isCashback ? 'cashback' : 'other',
            description: tx.description,
            amount: tx.amountCents / 100,
            date: new Date(tx.createdAt).toLocaleDateString('pt-BR'),
            status: tx.status.toLowerCase(),
            method: isCashback
              ? t('payments.transactionCashback')
              : card
                ? `${card.brand} •••• ${card.last4}`
                : tx.currency,
          };
        })
      );
    } catch {
      setPaymentMethods([]);
      setTransactions([]);
      setCashbackCents(0);
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = {
    totalSpent: transactions
      .filter((tx) => tx.type === 'purchase' && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0),
    cashbackReceived: cashbackCents / 100,
  };

  // Cadastro de cartão será via Stripe (tokenização/PaymentSheet) na frente do
  // gateway — não coletamos número/CVV no app (PCI). Por ora, placeholder.
  const handleAddCard = () => {
    Alert.alert(t('payments.addButton'), t('payments.cardViaStripe'));
  };

  // Define cartão padrão (API + reload)
  const handleSetDefaultCard = async (id: string) => {
    try {
      await paymentsApi.setDefaultPaymentMethod(id);
      await load();
    } catch {
      Alert.alert(t('payments.errorTitle'), t('payments.errorFillAll'));
    }
  };

  // Remove cartão (API + reload)
  const handleRemoveCard = (id: string) => {
    const cardToRemove = paymentMethods.find((card) => card.id === id);

    if (cardToRemove?.isDefault) {
      Alert.alert(t('payments.warningTitle'), t('payments.cannotRemoveDefault'));
      return;
    }

    Alert.alert(
      t('payments.removeCardTitle'),
      t('payments.removeCardMessage')
        .replace('{{brand}}', cardToRemove?.brand || '')
        .replace('{{last4}}', cardToRemove?.last4 || ''),
      [
        { text: t('payments.removeCardCancel'), style: 'cancel' },
        {
          text: t('payments.removeCardConfirm'),
          style: 'destructive',
          onPress: async () => {
            try {
              await paymentsApi.removePaymentMethod(id);
              await load();
              Alert.alert(t('payments.successTitle'), t('payments.cardRemoved'));
            } catch {
              Alert.alert(t('payments.errorTitle'), t('payments.errorFillAll'));
            }
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
        colors={isDark ? ['#0f172a', '#1e293b'] : ['#4f46e5', '#3b82f6']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>{t('payments.headerTitle')}</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <TrendingDown size={24} color="#EF4444" />
          <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            R$ {stats.totalSpent.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('payments.totalSpent')}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <TrendingUp size={24} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
            R$ {stats.cashbackReceived.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.body }]}>
            {t('payments.cashbackReceived')}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: selectedTab === 'history' ? '#6366f1' : colors.card },
          ]}
          onPress={() => setSelectedTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'history' ? '#FFFFFF' : colors.text, fontFamily: fonts.bodySemiBold },
            ]}
          >
            {t('payments.tabHistory')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: selectedTab === 'methods' ? '#6366f1' : colors.card },
          ]}
          onPress={() => setSelectedTab('methods')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'methods' ? '#FFFFFF' : colors.text, fontFamily: fonts.bodySemiBold },
            ]}
          >
            {t('payments.tabMethods')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {selectedTab === 'history' && (
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
              {t('payments.lastTransactions')}
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
                        { color: colors.text, fontFamily: fonts.bodySemiBold },
                      ]}
                    >
                      {transaction.description}
                    </Text>
                    <Text
                      style={[
                        styles.transactionMethod,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {transaction.method}
                    </Text>
                    <Text
                      style={[
                        styles.transactionDate,
                        { color: colors.textSecondary, fontFamily: fonts.body },
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
                        fontFamily: fonts.bodyBold,
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
                      <Text style={[styles.statusText, { fontFamily: fonts.secondaryMedium }]}>{t('payments.statusCompleted')}</Text>
                    </View>
                  )}
                  {transaction.status === 'refunded' && (
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: '#FEF3C7' },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: '#92400E', fontFamily: fonts.secondaryMedium }]}>
                        {t('payments.statusRefunded')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color={colors.primary} />
              <Text style={[styles.downloadText, { color: colors.primary, fontFamily: fonts.bodySemiBold }]}>
                {t('payments.downloadStatement')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedTab === 'methods' && (
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>
                {t('payments.savedCards')}
              </Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
                <Plus size={20} color="white" />
                <Text style={[styles.addButtonText, { fontFamily: fonts.bodySemiBold }]}>{t('payments.addButton')}</Text>
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
                        style={[styles.methodBrand, { color: colors.text, fontFamily: fonts.bodyBold }]}
                      >
                        {method.brand}
                      </Text>
                      {method.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={[styles.defaultText, { fontFamily: fonts.secondaryMedium }]}>{t('payments.defaultBadge')}</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.methodNumber,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      •••• •••• •••• {method.last4}
                    </Text>
                    <Text
                      style={[
                        styles.methodDetails,
                        { color: colors.textSecondary, fontFamily: fonts.body },
                      ]}
                    >
                      {method.holder} • {t('payments.expiresIn')} {method.expiryDate}
                    </Text>
                    {!method.isDefault && (
                      <Text
                        style={[styles.tapToDefault, { color: colors.primary, fontFamily: fonts.bodySemiBold }]}
                      >
                        {t('payments.tapToDefault')}
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
              <Text style={[styles.emptyText, { color: colors.textSecondary, fontFamily: fonts.bodySemiBold }]}>
                {t('payments.multipleCards')}
              </Text>
              <Text
                style={[styles.emptySubtext, { color: colors.textTertiary, fontFamily: fonts.body }]}
              >
                {t('payments.dataEncrypted')}
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
              <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.display }]}>
                {t('payments.addCardTitle')}
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
                <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                  {t('payments.cardNumberLabel')}
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
                <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                  {t('payments.cardNameLabel')}
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
                  <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                    {t('payments.expiryLabel')}
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
                  <Text style={[styles.label, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>
                    {t('payments.cvvLabel')}
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
                <Text style={[styles.submitButtonText, { fontFamily: fonts.bodyBold }]}>{t('payments.addCardButton')}</Text>
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
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
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
  },
  defaultBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
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
  },
  closeButton: {
    padding: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
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
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
