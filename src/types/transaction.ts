import { Edition, TransactionStatus, Currency } from './common';

// Énumérations synchronisées avec le backend
export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface Transaction {
  id: string;
  user_id: number;
  card_name: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  
  // Prix et montants
  purchase_price: number;
  sale_price?: number;
  quantity: number;
  
  // Profits calculés
  net_profit?: number;
  profit_percentage?: number;
  
  // Informations de la carte
  card_uid?: string;
  edition: Edition;
  card_level?: number;
  card_rarity?: string;
  card_foil?: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  purchase_date?: string;
  sale_date?: string;
  
  // Métadonnées
  is_verified: boolean;
  market_fees?: number;
  platform_fees?: number;
  notes?: string;
  
  // Propriétés calculées côté frontend (pour compatibilité)
  cardName: string;  // alias pour card_name
  purchasePrice: number;  // alias pour purchase_price
  salePrice?: number;  // alias pour sale_price
  netProfit?: number;  // alias pour net_profit
  profitPercentage?: number;  // alias pour profit_percentage
  date: Date;  // calculé depuis created_at
  timeElapsed?: string;  // calculé côté frontend
  currency: Currency;
  isVerified: boolean;  // alias pour is_verified
  purchaseDate: Date;  // calculé depuis purchase_date
  saleDate?: Date;  // calculé depuis sale_date
  marketFees?: number;  // alias pour market_fees
  taxFees?: number;  // alias pour platform_fees
}

export interface TransactionFilters {
  editions?: Edition[];
  statuses?: TransactionStatus[];
  transaction_types?: TransactionType[];
  searchTerm?: string;
  currency?: Currency;
  dateFrom?: Date;
  dateTo?: Date;
  minProfit?: number;
  maxProfit?: number;
  minPrice?: number;
  maxPrice?: number;
  verified_only?: boolean;
  limit?: number;
}

export interface TransactionSummary {
  total_transactions: number;
  completed_transactions: number;
  pending_transactions: number;
  failed_transactions: number;
  total_invested: number;
  total_revenue: number;
  total_profit: number;
  average_profit: number;
  success_rate: number;
  daily_profit: number;
  monthly_profit: number;
  
  // Propriétés pour compatibilité frontend
  totalTransactions: number;
  confirmedRevenue: number;
  pendingRevenue: number;
  confirmedProfits: number;
  pendingProfits: number;
  averageProfit: number;
}

export interface TransactionCreate {
  card_name: string;
  transaction_type: TransactionType;
  purchase_price: number;
  quantity: number;
  card_uid?: string;
  edition: Edition;
  card_level?: number;
  card_rarity?: string;
  card_foil?: boolean;
  notes?: string;
}

export interface TransactionUpdate {
  sale_price?: number;
  status?: TransactionStatus;
  sale_date?: string;
  notes?: string;
  is_verified?: boolean;
}

// Types pour les opportunités de trading
export interface TradingOpportunity {
  id: string;
  card_name: string;
  edition: Edition;
  current_price: number;
  target_price: number;
  potential_profit: number;
  profit_percentage: number;
  confidence_score: number;
  market_volume: number;
  last_seen: string;
  card_level?: number;
  card_rarity?: string;
  card_foil?: boolean;
  
  // Métadonnées pour l'analyse
  price_history: PricePoint[];
  market_analysis: MarketAnalysis;
}

export interface PricePoint {
  price: number;
  timestamp: string;
  volume?: number;
}

export interface MarketAnalysis {
  trend: 'BULLISH' | 'BEARISH' | 'STABLE';
  volatility: number;
  support_level: number;
  resistance_level: number;
  volume_trend: 'INCREASING' | 'DECREASING' | 'STABLE';
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WATCH';
}

// Types pour les statistiques avancées
export interface TradingStats {
  period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  start_date: string;
  end_date: string;
  
  // Statistiques de base
  total_transactions: number;
  successful_trades: number;
  failed_trades: number;
  pending_trades: number;
  
  // Performances financières
  total_invested: number;
  total_revenue: number;
  net_profit: number;
  roi_percentage: number;
  
  // Métriques de performance
  win_rate: number;
  average_hold_time: number;
  best_trade_profit: number;
  worst_trade_loss: number;
  
  // Analyse par édition
  edition_performance: EditionPerformance[];
  
  // Tendances
  profit_trend: PricePoint[];
  trade_volume_trend: PricePoint[];
}

export interface EditionPerformance {
  edition: Edition;
  total_trades: number;
  success_rate: number;
  total_profit: number;
  average_profit: number;
  roi_percentage: number;
}

// Fonction utilitaire pour transformer les données backend en format frontend
export function transformTransactionFromAPI(apiTransaction: any): Transaction {
  return {
    ...apiTransaction,
    // Aliases pour compatibilité
    cardName: apiTransaction.card_name,
    purchasePrice: apiTransaction.purchase_price,
    salePrice: apiTransaction.sale_price,
    netProfit: apiTransaction.net_profit,
    profitPercentage: apiTransaction.profit_percentage,
    isVerified: apiTransaction.is_verified,
    marketFees: apiTransaction.market_fees,
    taxFees: apiTransaction.platform_fees,
    
    // Conversions de dates
    date: new Date(apiTransaction.created_at),
    purchaseDate: apiTransaction.purchase_date ? new Date(apiTransaction.purchase_date) : new Date(apiTransaction.created_at),
    saleDate: apiTransaction.sale_date ? new Date(apiTransaction.sale_date) : undefined,
    
    // Calculs côté frontend
    timeElapsed: calculateTimeElapsed(apiTransaction.created_at, apiTransaction.sale_date),
    currency: Currency.USD, // Par défaut, à adapter selon les besoins
  };
}

function calculateTimeElapsed(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffMs = end.getTime() - start.getTime();
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}j ${remainingHours}h`;
  }
  
  return `${hours}h ${minutes}m`;
}
