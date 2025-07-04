// Types pour l'authentification - synchronisés avec le backend

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  
  // Configuration Splinterlands
  splinterlands_username?: string;
  has_posting_key: boolean;
  
  // Paramètres de trading
  trading_enabled: boolean;
  max_investment_per_card: number;
  minimum_profit_percentage: number;
  auto_trading_enabled: boolean;
  daily_budget: number;
  budget_used_today: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  splinterlands_username?: string;
  splinterlands_posting_key?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UpdateUserData {
  email?: string;
  splinterlands_username?: string;
  splinterlands_posting_key?: string;
  trading_enabled?: boolean;
  max_investment_per_card?: number;
  minimum_profit_percentage?: number;
  auto_trading_enabled?: boolean;
  daily_budget?: number;
}

// Types pour les préférences utilisateur
export interface TradingPreferences {
  trading_enabled: boolean;
  max_investment_per_card: number;
  minimum_profit_percentage: number;
  auto_trading_enabled: boolean;
  daily_budget: number;
  preferred_editions: string[];
  excluded_cards: string[];
  max_holding_time_hours: number;
}

// Types pour la validation des formulaires
export interface FormErrors {
  [key: string]: string;
}

export interface AuthFormState {
  data: LoginCredentials | RegisterData;
  errors: FormErrors;
  isSubmitting: boolean;
}
