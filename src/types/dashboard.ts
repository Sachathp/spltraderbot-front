import { Currency } from './common';

export interface DashboardMetrics {
  totalInvested: number;
  confirmedRevenue: number;
  pendingRevenue: number;
  confirmedProfits: number;
  pendingProfits: number;
  totalTransactions: number;
  currency: Currency;
  lastUpdated: Date;
}

export interface MetricCard {
  id: string;
  title: string;
  value: number;
  currency: Currency;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  format: 'currency' | 'number' | 'percentage';
}

export interface ActivityStatus {
  isActive: boolean;
  lastScanTime?: Date;
  nextScanTime?: Date;
  scanInterval: number; // en minutes
  isSearching: boolean;
  foundDeals: number;
  errors: number;
} 