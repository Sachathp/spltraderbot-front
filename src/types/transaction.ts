import { Edition, TransactionStatus, Currency } from './common';

export interface Transaction {
  id: string;
  cardName: string;
  edition: Edition;
  purchasePrice: number;
  salePrice?: number;
  netProfit?: number;
  profitPercentage?: number;
  timeElapsed?: string;
  date: Date;
  status: TransactionStatus;
  isVerified: boolean;
  currency: Currency;
  // Informations supplémentaires de la carte
  cardLevel?: number;
  cardRarity?: string;
  cardImage?: string;
  // Métadonnées de transaction
  purchaseDate: Date;
  saleDate?: Date;
  marketFees?: number;
  taxFees?: number;
}

export interface TransactionFilters {
  editions: Edition[];
  statuses: TransactionStatus[];
  searchTerm?: string;
  currency: Currency;
  dateFrom?: Date;
  dateTo?: Date;
  minProfit?: number;
  maxProfit?: number;
  limit: number;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalInvested: number;
  confirmedRevenue: number;
  pendingRevenue: number;
  confirmedProfits: number;
  pendingProfits: number;
  averageProfit: number;
  successRate: number;
} 