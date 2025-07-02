import { 
  Transaction, 
  DashboardMetrics, 
  LogMessage, 
  ActivityStatus,
  Edition, 
  TransactionStatus, 
  Currency, 
  LogLevel 
} from '../types';

// Données de test pour les transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    cardName: 'Chaos Knight',
    edition: Edition.CHAOS,
    purchasePrice: 12.50,
    salePrice: 15.75,
    netProfit: 3.25,
    profitPercentage: 26.0,
    timeElapsed: '2h 15m',
    date: new Date('2024-01-15T10:30:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 2,
    cardRarity: 'Epic',
    purchaseDate: new Date('2024-01-15T08:15:00'),
    saleDate: new Date('2024-01-15T10:30:00'),
    marketFees: 0.50,
  },
  {
    id: '2',
    cardName: 'Venari Wavesmith',
    edition: Edition.UNTAMED,
    purchasePrice: 8.25,
    salePrice: 10.00,
    netProfit: 1.75,
    profitPercentage: 21.2,
    timeElapsed: '45m',
    date: new Date('2024-01-15T09:45:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Rare',
    purchaseDate: new Date('2024-01-15T09:00:00'),
    saleDate: new Date('2024-01-15T09:45:00'),
    marketFees: 0.25,
  },
  {
    id: '3',
    cardName: 'Pelacor Bandit',
    edition: Edition.CHAOS,
    purchasePrice: 5.50,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '1h 30m',
    date: new Date('2024-01-15T08:30:00'),
    status: TransactionStatus.SELLING,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Common',
    purchaseDate: new Date('2024-01-15T08:30:00'),
  },
  {
    id: '4',
    cardName: 'Grund',
    edition: Edition.BETA,
    purchasePrice: 25.00,
    salePrice: 30.50,
    netProfit: 5.50,
    profitPercentage: 22.0,
    timeElapsed: '3h 20m',
    date: new Date('2024-01-15T06:10:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Legendary',
    purchaseDate: new Date('2024-01-15T06:10:00'),
    saleDate: new Date('2024-01-15T09:30:00'),
    marketFees: 0.75,
  },
  {
    id: '5',
    cardName: 'Furious Chicken',
    edition: Edition.REWARD,
    purchasePrice: 2.15,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '20m',
    date: new Date('2024-01-15T09:40:00'),
    status: TransactionStatus.BOUGHT,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Common',
    purchaseDate: new Date('2024-01-15T09:40:00'),
  }
];

// Données de test pour le dashboard
export const mockDashboardMetrics: DashboardMetrics = {
  totalInvested: 1250.75,
  confirmedRevenue: 1450.25,
  pendingRevenue: 125.50,
  confirmedProfits: 199.50,
  pendingProfits: 45.25,
  totalTransactions: 147,
  currency: Currency.USD,
  lastUpdated: new Date()
};

// Données de test pour les logs
export const mockLogMessages: LogMessage[] = [
  {
    id: '1',
    message: 'Système démarré avec succès',
    level: LogLevel.SUCCESS,
    timestamp: new Date(Date.now() - 5000),
    category: 'SYSTEM'
  },
  {
    id: '2',
    message: 'Recherche de nouvelles opportunités...',
    level: LogLevel.INFO,
    timestamp: new Date(Date.now() - 3000),
    category: 'SEARCH'
  },
  {
    id: '3',
    message: 'Deal trouvé: Chaos Knight à 12.50$ (profit estimé: 26%)',
    level: LogLevel.SUCCESS,
    timestamp: new Date(Date.now() - 2000),
    category: 'DEAL',
    data: { cardName: 'Chaos Knight', price: 12.50, profit: 26 }
  },
  {
    id: '4',
    message: 'Achat effectué: Chaos Knight',
    level: LogLevel.SUCCESS,
    timestamp: new Date(Date.now() - 1500),
    category: 'PURCHASE'
  },
  {
    id: '5',
    message: 'Mise en vente: Chaos Knight à 15.75$',
    level: LogLevel.INFO,
    timestamp: new Date(Date.now() - 1000),
    category: 'SALE'
  },
  {
    id: '6',
    message: 'Vente confirmée: Chaos Knight (+3.25$ profit)',
    level: LogLevel.SUCCESS,
    timestamp: new Date(Date.now() - 500),
    category: 'SALE'
  }
];

// Données de test pour le statut d'activité
export const mockActivityStatus: ActivityStatus = {
  isActive: true,
  lastScanTime: new Date(Date.now() - 30000),
  nextScanTime: new Date(Date.now() + 30000),
  scanInterval: 1,
  isSearching: false,
  foundDeals: 12,
  errors: 0
}; 