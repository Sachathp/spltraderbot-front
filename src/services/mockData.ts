import { Transaction, TransactionStatus, Edition, Currency } from '../types';

// Données de test pour les transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    cardName: 'Chaos Knight',
    edition: Edition.CHAOS,
    purchasePrice: 12.50,
    salePrice: 15.75,
    netProfit: 3.25,
    profitPercentage: 26,
    timeElapsed: '2h 15m',
    date: new Date('2024-01-15T10:30:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 2,
    cardRarity: 'Epic',
    purchaseDate: new Date('2024-01-15T08:15:00'),
    saleDate: new Date('2024-01-15T10:30:00'),
    marketFees: 0.79,
    taxFees: 0.16
  },
  {
    id: '2',
    cardName: 'Venari Wavesmith',
    edition: Edition.UNTAMED,
    purchasePrice: 8.00,
    salePrice: 10.00,
    netProfit: 2.00,
    profitPercentage: 25,
    timeElapsed: '1h 45m',
    date: new Date('2024-01-15T09:15:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Common',
    purchaseDate: new Date('2024-01-15T07:30:00'),
    saleDate: new Date('2024-01-15T09:15:00'),
    marketFees: 0.50,
    taxFees: 0.10
  },
  {
    id: '3',
    cardName: 'Pelacor Bandit',
    edition: Edition.CHAOS,
    purchasePrice: 5.50,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '3h 22m',
    date: new Date('2024-01-15T06:00:00'),
    status: TransactionStatus.SELLING,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Rare',
    purchaseDate: new Date('2024-01-15T06:00:00'),
    marketFees: 0.28
  },
  {
    id: '4',
    cardName: 'Djinn Chwala',
    edition: Edition.UNTAMED,
    purchasePrice: 25.00,
    salePrice: 32.50,
    netProfit: 7.50,
    profitPercentage: 30,
    timeElapsed: '45m',
    date: new Date('2024-01-15T11:00:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 3,
    cardRarity: 'Legendary',
    purchaseDate: new Date('2024-01-15T10:15:00'),
    saleDate: new Date('2024-01-15T11:00:00'),
    marketFees: 1.63,
    taxFees: 0.33
  },
  {
    id: '5',
    cardName: 'Kelya Frendul',
    edition: Edition.CHAOS,
    purchasePrice: 15.25,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '1h 10m',
    date: new Date('2024-01-15T10:45:00'),
    status: TransactionStatus.SELLING,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 2,
    cardRarity: 'Legendary',
    purchaseDate: new Date('2024-01-15T09:35:00'),
    marketFees: 0.76
  },
  {
    id: '6',
    cardName: 'Grund',
    edition: Edition.BETA,
    purchasePrice: 45.00,
    salePrice: 52.00,
    netProfit: 7.00,
    profitPercentage: 15.6,
    timeElapsed: '4h 30m',
    date: new Date('2024-01-15T05:30:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 4,
    cardRarity: 'Legendary',
    purchaseDate: new Date('2024-01-15T01:00:00'),
    saleDate: new Date('2024-01-15T05:30:00'),
    marketFees: 2.60,
    taxFees: 0.52
  },
  {
    id: '7',
    cardName: 'Flesh Golem',
    edition: Edition.UNTAMED,
    purchasePrice: 3.25,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '2h 45m',
    date: new Date('2024-01-15T08:00:00'),
    status: TransactionStatus.SELLING,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Common',
    purchaseDate: new Date('2024-01-15T05:15:00'),
    marketFees: 0.16
  },
  {
    id: '8',
    cardName: 'Uriel the Purifier',
    edition: Edition.CHAOS,
    purchasePrice: 18.75,
    salePrice: 22.50,
    netProfit: 3.75,
    profitPercentage: 20,
    timeElapsed: '1h 20m',
    date: new Date('2024-01-15T12:15:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 2,
    cardRarity: 'Legendary',
    purchaseDate: new Date('2024-01-15T10:55:00'),
    saleDate: new Date('2024-01-15T12:15:00'),
    marketFees: 1.13,
    taxFees: 0.23
  },
  {
    id: '9',
    cardName: 'Windeku',
    edition: Edition.DICE,
    purchasePrice: 7.80,
    salePrice: undefined,
    netProfit: undefined,
    profitPercentage: undefined,
    timeElapsed: '25m',
    date: new Date('2024-01-15T12:00:00'),
    status: TransactionStatus.BOUGHT,
    isVerified: false,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Epic',
    purchaseDate: new Date('2024-01-15T11:35:00'),
    marketFees: 0.39
  },
  {
    id: '10',
    cardName: 'Mantoid',
    edition: Edition.UNTAMED,
    purchasePrice: 4.50,
    salePrice: 5.25,
    netProfit: 0.75,
    profitPercentage: 16.7,
    timeElapsed: '3h 15m',
    date: new Date('2024-01-15T08:45:00'),
    status: TransactionStatus.SOLD,
    isVerified: true,
    currency: Currency.USD,
    cardLevel: 1,
    cardRarity: 'Rare',
    purchaseDate: new Date('2024-01-15T05:30:00'),
    saleDate: new Date('2024-01-15T08:45:00'),
    marketFees: 0.26,
    taxFees: 0.05
  }
];

// Données de test pour les filtres
export const mockEditions = Object.values(Edition);
export const mockStatuses = Object.values(TransactionStatus);

// Fonction pour simuler un délai d'API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction pour simuler une recherche avec filtres
export const searchTransactions = async (
  filters: {
    editions?: Edition[];
    statuses?: TransactionStatus[];
    searchTerm?: string;
    limit?: number;
  } = {}
): Promise<Transaction[]> => {
  await delay(500); // Simuler un délai d'API
  
  let filtered = [...mockTransactions];
  
  if (filters.editions && filters.editions.length > 0) {
    filtered = filtered.filter(t => filters.editions!.includes(t.edition));
  }
  
  if (filters.statuses && filters.statuses.length > 0) {
    filtered = filtered.filter(t => filters.statuses!.includes(t.status));
  }
  
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(t => 
      t.cardName.toLowerCase().includes(term) ||
      t.edition.toLowerCase().includes(term)
    );
  }
  
  if (filters.limit && filters.limit > 0) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
}; 