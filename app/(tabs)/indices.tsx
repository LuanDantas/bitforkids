import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Search,
  Wallet,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  DollarSign,
  Calendar,
  ChevronLeft,
  Clock,
} from 'lucide-react-native';
import LineChart from '@/components/charts/LineChart';
import Svg, { Polyline, Circle } from 'react-native-svg';

const cryptos = [
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A' },
  { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627EEA' },
  { id: 'SOL', name: 'Solana', icon: '◎', color: '#9945FF' },
  { id: 'BNB', name: 'BNB', icon: 'B', color: '#F3BA2F' },
  { id: 'XRP', name: 'XRP', icon: 'X', color: '#23292F' },
  { id: 'ADA', name: 'Cardano', icon: 'A', color: '#0033AD' },
];

// Enhanced Line Chart Component for Cards with Axes and Scroll
const EnhancedCardChart = ({
  data,
  color,
}: {
  data: { label: string; value: number }[];
  color: string;
}) => {
  const { colors: themeColors } = useTheme();
  const chartWidth = Math.max(600, data.length * 60); // Make it scrollable
  const chartHeight = 140;
  const padding = 40;
  const chartInnerWidth = chartWidth - padding * 2;
  const chartInnerHeight = chartHeight - padding * 2;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  // Round to nice numbers for Y axis
  const yMax = Math.ceil(maxValue * 1.1);
  const yMin = Math.floor(minValue * 0.9);
  const yRange = yMax - yMin;
  const yStep = yRange / 5;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartInnerWidth;
    const y = padding + ((yMax - item.value) / yRange) * chartInnerHeight;
    return { x, y, value: item.value, label: item.label };
  });

  const pointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={{ marginTop: 12, height: 200 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={{ maxWidth: '100%' }}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View style={{ width: chartWidth, height: 190 }}>
          {/* Y Axis Labels */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: chartHeight,
              width: padding,
              justifyContent: 'space-between',
            }}
          >
            {[...Array(6)].map((_, i) => {
              const value = yMax - yStep * i;
              return (
                <Text
                  key={i}
                  style={{
                    fontSize: 10,
                    color: themeColors.textTertiary,
                    textAlign: 'right',
                    paddingRight: 8,
                  }}
                >
                  {value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </Text>
              );
            })}
          </View>

          {/* Chart Area */}
          <View
            style={{
              position: 'absolute',
              left: padding,
              top: 0,
              width: chartInnerWidth,
              height: chartHeight,
            }}
          >
            <LinearGradient
              colors={[color + '20', color + '05', 'transparent']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 8,
              }}
            />

            {/* Y Axis Grid Lines */}
            <Svg width={chartInnerWidth} height={chartHeight}>
              {[...Array(6)].map((_, i) => {
                const y = (i / 5) * chartInnerHeight;
                return (
                  <Polyline
                    key={i}
                    points={`0,${y} ${chartInnerWidth},${y}`}
                    stroke={themeColors.border}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Main Line */}
              <Polyline
                points={pointsString}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((point, index) => (
                <React.Fragment key={index}>
                  <Circle
                    cx={point.x - padding}
                    cy={point.y}
                    r="5"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                  />
                </React.Fragment>
              ))}
            </Svg>

            {/* X Axis Labels */}
            <View
              style={{
                position: 'absolute',
                bottom: -30,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
            >
              {data.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    color: themeColors.textTertiary,
                    width: chartInnerWidth / data.length - 5,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Helper functions for currency and date formatting
const formatCurrency = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numbers = value.replace(/[^\d.]/g, '');
  // Split into integer and decimal parts
  const parts = numbers.split('.');
  // Format integer part with commas
  const integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Return formatted currency
  return parts.length > 1
    ? `$${integer}.${parts[1].slice(0, 2)}`
    : `$${integer}`;
};

const parseCurrency = (value: string): string => {
  // Remove dollar sign, commas, and spaces
  return value.replace(/[$,\s]/g, '');
};

const formatDateInput = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  // Add slashes
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

const calculateQuantity = (amount: string, price: string): string => {
  const amountNum = parseFloat(parseCurrency(amount)) || 0;
  const priceNum = parseFloat(parseCurrency(price)) || 0;
  if (priceNum === 0) return '0.0000';
  const quantity = amountNum / priceNum;
  return quantity.toFixed(4);
};

export default function PortfolioScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletsList, setShowWalletsList] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    'deposit' | 'withdrawal' | null
  >(null);

  // Form fields for transaction
  const [transactionForm, setTransactionForm] = useState({
    crypto: '',
    wallet: '',
    price: '',
    date: '',
    amount: '',
    quantity: '',
  });

  // Mock data
  const [wallets, setWallets] = useState([
    {
      id: '1',
      name: 'Carteira Principal',
      totalValue: 15420.5,
      change: 12.5,
      profit: 1850.75,
      chartData: [
        { label: 'Jan', value: 12000 },
        { label: 'Fev', value: 12800 },
        { label: 'Mar', value: 13200 },
        { label: 'Abr', value: 13800 },
        { label: 'Mai', value: 14200 },
        { label: 'Jun', value: 14500 },
        { label: 'Jul', value: 14800 },
        { label: 'Ago', value: 15000 },
        { label: 'Set', value: 15150 },
        { label: 'Out', value: 15300 },
        { label: 'Nov', value: 15400 },
        { label: 'Dez', value: 15420.5 },
      ],
    },
    {
      id: '2',
      name: 'Trading',
      totalValue: 8250.25,
      change: -3.2,
      profit: -264.1,
      chartData: [
        { label: 'Jan', value: 9000 },
        { label: 'Fev', value: 8800 },
        { label: 'Mar', value: 8600 },
        { label: 'Abr', value: 8700 },
        { label: 'Mai', value: 8500 },
        { label: 'Jun', value: 8300 },
        { label: 'Jul', value: 8350 },
        { label: 'Ago', value: 8200 },
        { label: 'Set', value: 8150 },
        { label: 'Out', value: 8300 },
        { label: 'Nov', value: 8250 },
        { label: 'Dez', value: 8250.25 },
      ],
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: '1',
      crypto: 'BTC',
      currentPrice: 73250.45,
      quantity: 0.15,
      investment: 10000,
      balance: 10987.57,
      avgPrice: 66666.67,
      profit: 987.57,
      profitPercent: 9.88,
      trend: 'high',
    },
    {
      id: '2',
      crypto: 'ETH',
      currentPrice: 3845.67,
      quantity: 1.5,
      investment: 5000,
      balance: 5768.51,
      profit: 768.51,
      profitPercent: 15.37,
      trend: 'high',
    },
    {
      id: '3',
      crypto: 'SOL',
      currentPrice: 198.34,
      quantity: 25,
      investment: 3000,
      balance: 4958.5,
      profit: 1958.5,
      profitPercent: 65.28,
      trend: 'high',
    },
  ]);

  const portfolioStats = {
    totalAportes: 15000,
    aportesChange: 5.2,
    totalBalance: 21714.58,
    balanceChange: -8.5,
    totalProfit: 3714.58,
    profitChange: 32.8,
  };

  const calculateTrend = (value: number) => {
    if (value > 5)
      return { label: 'Alta Forte', color: '#10B981', icon: TrendingUp };
    if (value < -5)
      return { label: 'Baixa Forte', color: '#EF4444', icon: TrendingDown };
    return { label: 'Neutro', color: '#F59E0B', icon: Minus };
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleAddWallet = () => {
    if (!newWalletName.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da carteira');
      return;
    }

    const newWallet = {
      id: Date.now().toString(),
      name: newWalletName,
      totalValue: 0,
      change: 0,
      profit: 0,
      chartData: [
        { label: 'Jan', value: 0 },
        { label: 'Fev', value: 0 },
        { label: 'Mar', value: 0 },
        { label: 'Abr', value: 0 },
        { label: 'Mai', value: 0 },
        { label: 'Jun', value: 0 },
        { label: 'Jul', value: 0 },
        { label: 'Ago', value: 0 },
        { label: 'Set', value: 0 },
        { label: 'Out', value: 0 },
        { label: 'Nov', value: 0 },
        { label: 'Dez', value: 0 },
      ],
    };

    setWallets([...wallets, newWallet]);
    setNewWalletName('');
    setShowWalletModal(false);
    Alert.alert('Sucesso', 'Carteira criada com sucesso!');
  };

  const handleEditWallet = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    setNewWalletName(wallet?.name || '');
    setShowWalletModal(true);
    // In a real app, you would update the specific wallet
  };

  const handleDeleteWallet = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta carteira?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setWallets(wallets.filter((w) => w.id !== id));
          },
        },
      ]
    );
  };

  const handleAddTransaction = () => {
    if (
      !transactionForm.crypto ||
      !transactionForm.wallet ||
      !transactionForm.price ||
      !transactionForm.amount
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Parse currency values (remove $ and commas)
    const priceValue = parseFloat(parseCurrency(transactionForm.price));
    const amountValue = parseFloat(parseCurrency(transactionForm.amount));
    const quantityValue = parseFloat(transactionForm.quantity);

    const newTransaction = {
      id: Date.now().toString(),
      crypto: transactionForm.crypto,
      currentPrice: priceValue,
      quantity: quantityValue,
      investment: amountValue,
      balance: amountValue,
      avgPrice: priceValue,
      profit: 0,
      profitPercent: 0,
      trend: 'neutral' as const,
    };

    setTransactions([...transactions, newTransaction]);

    // Reset form
    setTransactionForm({
      crypto: '',
      wallet: '',
      price: '',
      date: '',
      amount: '',
      quantity: '',
    });
    setShowTransactionModal(false);
    setSelectedTransactionType(null);
    Alert.alert('Sucesso', 'Transação cadastrada com sucesso!');
  };

  const renderPortfolioCards = () => {
    const cards = [
      {
        title: 'Aportes',
        value: `$${portfolioStats.totalAportes.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}`,
        change: portfolioStats.aportesChange,
        trend: calculateTrend(portfolioStats.aportesChange),
        chartData: [
          { label: 'Jan', value: 12000 },
          { label: 'Fev', value: 12500 },
          { label: 'Mar', value: 13000 },
          { label: 'Abr', value: 13500 },
          { label: 'Mai', value: 14000 },
          { label: 'Jun', value: 14500 },
          { label: 'Jul', value: 15000 },
          { label: 'Ago', value: 14800 },
          { label: 'Set', value: 14600 },
          { label: 'Out', value: 14900 },
          { label: 'Nov', value: 15100 },
          { label: 'Dez', value: 15000 },
        ],
      },
      {
        title: 'Saldo',
        value: `$${portfolioStats.totalBalance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}`,
        change: portfolioStats.balanceChange,
        trend: calculateTrend(portfolioStats.balanceChange),
        chartData: [
          { label: 'Jan', value: 25000 },
          { label: 'Fev', value: 24500 },
          { label: 'Mar', value: 24000 },
          { label: 'Abr', value: 23500 },
          { label: 'Mai', value: 23000 },
          { label: 'Jun', value: 22500 },
          { label: 'Jul', value: 22000 },
          { label: 'Ago', value: 21500 },
          { label: 'Set', value: 21000 },
          { label: 'Out', value: 21800 },
          { label: 'Nov', value: 21500 },
          { label: 'Dez', value: 21714 },
        ],
      },
      {
        title: 'Lucro',
        value: `$${portfolioStats.totalProfit.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}`,
        change: portfolioStats.profitChange,
        trend: calculateTrend(portfolioStats.profitChange),
        chartData: [
          { label: 'Jan', value: 2000 },
          { label: 'Fev', value: 2200 },
          { label: 'Mar', value: 2500 },
          { label: 'Abr', value: 2800 },
          { label: 'Mai', value: 3100 },
          { label: 'Jun', value: 3400 },
          { label: 'Jul', value: 3650 },
          { label: 'Ago', value: 3700 },
          { label: 'Set', value: 3680 },
          { label: 'Out', value: 3750 },
          { label: 'Nov', value: 3730 },
          { label: 'Dez', value: 3714 },
        ],
      },
    ];

    return (
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const TrendIcon = card.trend.icon;
          const chartColor = card.change >= 0 ? '#10B981' : '#EF4444';
          return (
            <View
              key={index}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text
                  style={[styles.cardTitle, { color: colors.textSecondary }]}
                >
                  {card.title}
                </Text>
                <View style={styles.cardTrend}>
                  <TrendIcon size={14} color={card.trend.color} />
                  <Text
                    style={[styles.cardTrendText, { color: card.trend.color }]}
                  >
                    {card.change > 0 ? '+' : ''}
                    {card.change.toFixed(1)}%
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardValue, { color: colors.text }]}>
                {card.value}
              </Text>
              <View style={styles.cardChart}>
                <EnhancedCardChart data={card.chartData} color={chartColor} />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderTransactionsTable = () => {
    return (
      <View
        style={[
          styles.tableContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.tableTitle, { color: colors.text }]}>
          Lucros e Prejuízos
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Crypto
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Preço atual
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Qtde
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Aporte
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Saldo
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                $ Médio
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Lucro
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                % Lucro
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Trend
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { color: colors.textSecondary },
                ]}
              >
                Ações
              </Text>
            </View>

            {transactions.map((transaction) => {
              const crypto = cryptos.find((c) => c.id === transaction.crypto);
              const profitColor =
                transaction.profit >= 0 ? '#10B981' : '#EF4444';
              const trend = calculateTrend(transaction.profitPercent);
              const TrendIcon = trend.icon;

              return (
                <View key={transaction.id} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cryptoCell, { color: colors.text }]}>
                      {crypto?.icon} {transaction.crypto}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      $
                      {transaction.currentPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      {transaction.quantity}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      $
                      {transaction.investment.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      $
                      {transaction.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      $
                      {(transaction.avgPrice || 0).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.cellText,
                        { color: profitColor, fontWeight: 'bold' },
                      ]}
                    >
                      {transaction.profit >= 0 ? '+' : ''}$
                      {transaction.profit.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.percentageBadge,
                        {
                          backgroundColor: profitColor + '20',
                          color: profitColor,
                        },
                      ]}
                    >
                      {transaction.profitPercent >= 0 ? '+' : ''}
                      {transaction.profitPercent.toFixed(2)}%
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <View
                      style={[
                        styles.trendBadge,
                        { backgroundColor: trend.color + '20' },
                      ]}
                    >
                      <TrendIcon size={12} color={trend.color} />
                      <Text style={[styles.trendText, { color: trend.color }]}>
                        {trend.label}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, styles.actionsCell]}>
                    <TouchableOpacity style={styles.actionButton}>
                      <BarChart3 size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        router.push(`/portfolio/${transaction.id}`)
                      }
                    >
                      <Eye size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2a1a4a'] : ['#8B5CF6', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Portfólio</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie seus investimentos em criptomoedas
        </Text>

        {/* Search and Icons */}
        <View style={styles.topActions}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            ]}
          >
            <Search size={20} color="white" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowWalletsList(true)}
            >
              <Wallet size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Filter size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowTransactionModal(true)}
            >
              <Plus size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Portfolio Stats Cards */}
        <View style={styles.section}>{renderPortfolioCards()}</View>

        {/* Transactions Table */}
        <View style={styles.section}>{renderTransactionsTable()}</View>
      </ScrollView>

      {/* Wallet Modal */}
      <Modal visible={showWalletModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Cadastro de carteira
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Digite o nome da carteira"
              placeholderTextColor={colors.textTertiary}
              value={newWalletName}
              onChangeText={setNewWalletName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.surface || '#f3f4f6',
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setShowWalletModal(false);
                  setNewWalletName('');
                }}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    { color: colors.text || '#000000' },
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleAddWallet}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Wallets List Modal */}
      <Modal visible={showWalletsList} animationType="slide">
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <LinearGradient
            colors={['#1a1a1a', '#2a1a4a']}
            style={styles.modalHeader}
          >
            <TouchableOpacity onPress={() => setShowWalletsList(false)}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Carteiras</Text>
            <View style={{ width: 24 }} />
          </LinearGradient>

          <ScrollView style={styles.walletsList}>
            {wallets.map((wallet) => {
              const profitColor = wallet.profit >= 0 ? '#10B981' : '#EF4444';
              const TrendIcon = wallet.change >= 0 ? TrendingUp : TrendingDown;

              return (
                <View
                  key={wallet.id}
                  style={[
                    styles.walletCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.walletHeader}>
                    <Text style={[styles.walletName, { color: colors.text }]}>
                      {wallet.name}
                    </Text>
                    <View style={styles.walletActions}>
                      <TouchableOpacity
                        onPress={() => handleEditWallet(wallet.id)}
                      >
                        <Edit size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteWallet(wallet.id)}
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.walletStats}>
                    <Text style={[styles.walletValue, { color: colors.text }]}>
                      $
                      {wallet.totalValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <View
                      style={[
                        styles.walletProfitBadge,
                        { backgroundColor: profitColor + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.walletProfitText,
                          { color: profitColor },
                        ]}
                      >
                        {wallet.profit >= 0 ? '+' : ''}$
                        {wallet.profit.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.walletChart}>
                    <EnhancedCardChart
                      data={wallet.chartData}
                      color={profitColor}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.addWalletButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => {
              setShowWalletsList(false);
              setShowWalletModal(true);
            }}
          >
            <Plus size={24} color="white" />
            <Text style={styles.addWalletText}>Adicionar Carteira</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Transaction Type Selection Modal */}
      <Modal
        visible={showTransactionModal && !selectedTransactionType}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Tipo de Transação
            </Text>
            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setSelectedTransactionType('deposit')}
            >
              <Plus size={24} color={colors.primary} />
              <Text
                style={[styles.transactionTypeText, { color: colors.text }]}
              >
                Aporte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setSelectedTransactionType('withdrawal')}
            >
              <Minus size={24} color="#EF4444" />
              <Text
                style={[styles.transactionTypeText, { color: colors.text }]}
              >
                Retirada
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                backgroundColor: '#8B5CF6',
              }}
              onPress={() => {
                setShowTransactionModal(false);
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Transaction Form Modal */}
      <Modal
        visible={selectedTransactionType !== null}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, maxHeight: '90%' },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Cadastrar Aporte
            </Text>

            {/* Crypto Selector */}
            <Text style={[styles.label, { color: colors.text }]}>Moeda</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cryptoSelector}
            >
              {cryptos.map((crypto) => (
                <TouchableOpacity
                  key={crypto.id}
                  style={[
                    styles.cryptoOption,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                    transactionForm.crypto === crypto.id && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    setTransactionForm({
                      ...transactionForm,
                      crypto: crypto.id,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.cryptoOptionIcon,
                      {
                        color:
                          transactionForm.crypto === crypto.id
                            ? 'white'
                            : crypto.color,
                      },
                    ]}
                  >
                    {crypto.icon}
                  </Text>
                  <Text
                    style={[
                      styles.cryptoOptionText,
                      {
                        color:
                          transactionForm.crypto === crypto.id
                            ? 'white'
                            : colors.text,
                      },
                    ]}
                  >
                    {crypto.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Wallet Selector */}
            <Text style={[styles.label, { color: colors.text }]}>Carteira</Text>
            <TouchableOpacity
              style={[
                styles.select,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setShowWalletPicker(true)}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: transactionForm.wallet
                      ? colors.text
                      : colors.textTertiary,
                  },
                ]}
              >
                {transactionForm.wallet || 'Selecione uma carteira'}
              </Text>
            </TouchableOpacity>

            {/* Price */}
            <Text style={[styles.label, { color: colors.text }]}>
              Preço da moeda (USD)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="$0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.price}
              onChangeText={(text) => {
                const formatted = formatCurrency(text);
                setTransactionForm((prev) => ({
                  ...prev,
                  price: formatted,
                  quantity: calculateQuantity(prev.amount, formatted),
                }));
              }}
            />

            {/* Date */}
            <Text style={[styles.label, { color: colors.text }]}>
              Data do aporte
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={{
                  color: transactionForm.date
                    ? colors.text
                    : colors.textTertiary,
                  fontSize: 16,
                }}
              >
                {transactionForm.date || 'DD/MM/YYYY'}
              </Text>
            </TouchableOpacity>

            {/* Amount */}
            <Text style={[styles.label, { color: colors.text }]}>
              Valor aportado (USD)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="$0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.amount}
              onChangeText={(text) => {
                const formatted = formatCurrency(text);
                setTransactionForm((prev) => ({
                  ...prev,
                  amount: formatted,
                  quantity: calculateQuantity(formatted, prev.price),
                }));
              }}
            />

            {/* Quantity */}
            <Text style={[styles.label, { color: colors.text }]}>
              Quantidade de moedas
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface + '80',
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Calculado automaticamente"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={transactionForm.quantity}
              onChangeText={() => {}}
              editable={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.surface || '#f3f4f6',
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setSelectedTransactionType(null);
                  setShowTransactionModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    { color: colors.text || '#000000' },
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleAddTransaction}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Wallet Picker Modal */}
      <Modal
        visible={showWalletPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWalletPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Selecione uma carteira
            </Text>

            <ScrollView style={{ maxHeight: 400 }}>
              {wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  style={[
                    styles.walletPickerOption,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                    transactionForm.wallet === wallet.name && {
                      backgroundColor: colors.primary + '20',
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => {
                    setTransactionForm({
                      ...transactionForm,
                      wallet: wallet.name,
                    });
                    setShowWalletPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.walletPickerText,
                      {
                        color:
                          transactionForm.wallet === wallet.name
                            ? colors.primary
                            : colors.text,
                      },
                    ]}
                  >
                    {wallet.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: colors.surface || '#f3f4f6',
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setShowWalletPicker(false)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.text || '#000000' },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Selecionar data
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 16,
                maxHeight: 300,
              }}
            >
              {/* Days of month */}
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Dia do mês
                </Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => {
                        const now = new Date();
                        const selectedDate = `${day
                          .toString()
                          .padStart(2, '0')}/${(now.getMonth() + 1)
                          .toString()
                          .padStart(2, '0')}/${now.getFullYear()}`;
                        setTransactionForm((prev) => ({
                          ...prev,
                          date: selectedDate,
                        }));
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: colors.surface || '#f3f4f6',
                  borderWidth: 1,
                  borderColor: colors.border,
                  marginTop: 16,
                },
              ]}
              onPress={() => setShowDatePicker(false)}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  { color: colors.text || '#000000' },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  topActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardChart: {
    alignItems: 'flex-start',
    marginTop: 8,
    maxHeight: 200,
    overflow: 'hidden',
  },
  tableContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  table: {
    minWidth: 800,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    marginBottom: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    width: 100,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tableCell: {
    width: 100,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
  cryptoCell: {
    fontSize: 14,
    fontWeight: '600',
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionsCell: {
    flexDirection: 'row',
    gap: 8,
    width: 80,
  },
  actionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  walletsList: {
    flex: 1,
    padding: 20,
  },
  walletCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletActions: {
    flexDirection: 'row',
    gap: 16,
  },
  walletStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  walletProfitBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  walletProfitText: {
    fontSize: 14,
    fontWeight: '600',
  },
  walletChart: {
    minHeight: 200,
    marginTop: 8,
    overflow: 'hidden',
  },
  addWalletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    gap: 8,
  },
  addWalletText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  transactionTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 8,
  },
  transactionTypeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cryptoSelector: {
    marginBottom: 16,
  },
  cryptoOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 80,
  },
  cryptoOptionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  cryptoOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  select: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  selectText: {
    fontSize: 16,
  },
  walletPickerOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  walletPickerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
});
