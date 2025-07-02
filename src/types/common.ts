export enum Currency {
  USD = 'USD',
  DEC = 'DEC'
}

export enum Edition {
  ALL = 'ALL',
  ALPHA = 'ALPHA',
  BETA = 'BETA',
  PROMO = 'PROMO',
  REWARD = 'REWARD',
  UNTAMED = 'UNTAMED',
  DICE = 'DICE',
  GLADIUS = 'GLADIUS',
  CHAOS = 'CHAOS',
  RIFT = 'RIFT',
  SOULBOUND = 'SOULBOUND',
  REBELLION = 'REBELLION',
  SOULBOUND_RB = 'SOULBOUND_RB',
  CONCLAVE = 'CONCLAVE',
  SOULBOUND_CA = 'SOULBOUND_CA'
}

export enum TransactionStatus {
  ALL = 'ALL',
  SOLD = 'SOLD', // ✅ Vraiment vendues
  SELLING = 'SELLING', // 📦 En vente
  BOUGHT = 'BOUGHT', // 🛒 Achetées seulement
  MARKED_SOLD = 'MARKED_SOLD' // ⚠️ Marquées vendues (ancien)
}

export enum LogLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total?: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
} 