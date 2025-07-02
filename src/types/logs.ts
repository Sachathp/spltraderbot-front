import { LogLevel } from './common';

export interface LogMessage {
  id: string;
  message: string;
  level: LogLevel;
  timestamp: Date;
  category?: string;
  data?: any;
}

export interface LogSettings {
  soundEnabled: boolean;
  autoScroll: boolean;
  maxMessages: number;
  minDealThreshold?: number;
  showOnlyDeals: boolean;
  levels: LogLevel[];
}

export interface SystemStatus {
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  message: string;
  lastActivity: Date;
  uptime: number;
  version: string;
} 