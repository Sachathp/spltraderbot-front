import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Transaction, 
  DashboardMetrics, 
  LogMessage, 
  ActivityStatus,
  TransactionFilters,
  ApiResponse,
  PaginationOptions 
} from '../types';
import { 
  mockTransactions, 
  mockDashboardMetrics, 
  mockLogMessages, 
  mockActivityStatus 
} from '../utils/mockData';
import { useAuthStore } from '../store/authStore';

class ApiService {
  private api: AxiosInstance;
  private useMockData: boolean;

  constructor() {
    // Configuration basée sur les variables d'environnement
    this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';
    
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token JWT automatiquement
    this.api.interceptors.request.use(
      (config) => {
        let token = null;
        
        try {
          // Essayer d'abord le store Zustand
          const state = useAuthStore.getState();
          if (state.token) {
            token = state.token;
          } else {
            // Fallback sur localStorage
            const authStorage = localStorage.getItem('auth-storage');
            if (authStorage) {
              const parsed = JSON.parse(authStorage);
              token = parsed.state?.token;
            }
          }
        } catch (e) {
          console.error('Error getting auth token:', e);
        }
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs et l'authentification
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error.response?.status, error.response?.data);
        
        // Gestion des erreurs d'authentification
        if (error.response?.status === 401) {
          console.log('Token invalide/expiré, déconnexion forcée');
          // Déclencher la déconnexion via le store Zustand
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
        
        return Promise.reject(error);
      }
    );
  }

  // === MÉTHODES D'AUTHENTIFICATION ===
  
  setAuthToken(token: string) {
    console.log('setAuthToken appelé avec:', token.substring(0, 20) + '...');
    // Le token est géré par Zustand, mais on peut faire un test ici
    this.testToken(token);
  }

  clearAuthToken() {
    console.log('clearAuthToken appelé');
  }

  // Méthode pour tester un token
  private async testToken(token: string) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'}/auth/test-token`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Test token réussi:', response.data);
    } catch (error) {
      console.error('Test token échoué:', error);
    }
  }

  // Méthode pour basculer entre mock et vraies données
  setUseMockData(useMock: boolean) {
    this.useMockData = useMock;
  }

  // === MÉTHODES EXISTANTES MISES À JOUR ===

  // Méthodes pour les transactions
  async getTransactions(
    filters: Partial<TransactionFilters> = {},
    pagination: PaginationOptions = { page: 1, limit: 50 }
  ): Promise<ApiResponse<{ transactions: Transaction[]; total: number }>> {
    if (this.useMockData) {
      // Simulation de délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredTransactions = [...mockTransactions];
      
      // Appliquer les filtres
      if (filters.searchTerm) {
        filteredTransactions = filteredTransactions.filter(t =>
          t.cardName.toLowerCase().includes(filters.searchTerm!.toLowerCase())
        );
      }
      
      if (filters.statuses && filters.statuses.length > 0) {
        filteredTransactions = filteredTransactions.filter(t =>
          filters.statuses!.includes(t.status)
        );
      }
      
      if (filters.editions && filters.editions.length > 0) {
        filteredTransactions = filteredTransactions.filter(t =>
          filters.editions!.includes(t.edition)
        );
      }
      
      // Pagination
      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          transactions: paginatedTransactions,
          total: filteredTransactions.length
        }
      };
    }

    try {
      // Utiliser les nouveaux endpoints du backend
      const response = await this.api.get('/trading/transactions', {
        params: { 
          skip: (pagination.page - 1) * pagination.limit,
          limit: pagination.limit,
          ...filters 
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération des transactions' };
    }
  }

  // Méthodes pour le dashboard
  async getDashboardMetrics(): Promise<ApiResponse<DashboardMetrics>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        success: true,
        data: mockDashboardMetrics
      };
    }

    try {
      const response = await this.api.get('/trading/summary');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération des métriques' };
    }
  }

  // Méthodes pour les logs
  async getLogs(limit: number = 100): Promise<ApiResponse<LogMessage[]>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        success: true,
        data: mockLogMessages.slice(-limit)
      };
    }

    try {
      // Pour l'instant, on utilise un endpoint simple
      // Plus tard on pourra implémenter un vrai système de logs
      const response = await this.api.get('/monitoring/logs', { params: { limit } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération des logs' };
    }
  }

  // Méthodes pour le statut d'activité
  async getActivityStatus(): Promise<ApiResponse<ActivityStatus>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 150));
      return {
        success: true,
        data: mockActivityStatus
      };
    }

    try {
      const response = await this.api.get('/monitoring/system-status');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération du statut' };
    }
  }

  // Méthodes de contrôle
  async verifyStatus(): Promise<ApiResponse<ActivityStatus>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: { ...mockActivityStatus, lastScanTime: new Date() }
      };
    }

    try {
      const response = await this.api.get('/monitoring/system-status');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la vérification du statut' };
    }
  }

  async clearLogs(): Promise<ApiResponse<boolean>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return { success: true, data: true };
    }

    try {
      await this.api.delete('/monitoring/logs');
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la suppression des logs' };
    }
  }

  // === NOUVELLES MÉTHODES POUR L'AUTHENTIFICATION ===

  async login(credentials: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await this.api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    splinterlands_username?: string;
    splinterlands_posting_key?: string;
  }) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async logout() {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      // Même si l'API échoue, on nettoie localement
      console.warn('Logout API call failed, cleaning up locally');
    }
    this.clearAuthToken();
  }

  async getCurrentUser() {
    console.log('getCurrentUser appelé');
    const response = await this.api.get('/users/me');
    console.log('getCurrentUser réponse:', response.data);
    return response.data;
  }

  async updateUser(userData: any) {
    const response = await this.api.put('/users/me', userData);
    return response.data;
  }

  // === NOUVELLES MÉTHODES POUR LE TRADING ===

  async getTradingOpportunities(limit: number = 10) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        success: true,
        data: [] // Mock opportunities à implémenter plus tard
      };
    }

    try {
      const response = await this.api.get('/trading/opportunities', { params: { limit } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération des opportunités' };
    }
  }

  async startAutoTrading() {
    const response = await this.api.post('/trading/auto-trading/start');
    return response.data;
  }

  async stopAutoTrading() {
    const response = await this.api.post('/trading/auto-trading/stop');
    return response.data;
  }

  async getTradingSummary() {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        success: true,
        data: {
          total_transactions: 25,
          completed_transactions: 20,
          pending_transactions: 3,
          failed_transactions: 2,
          total_profit: 125.50,
          success_rate: 80
        }
      };
    }

    try {
      const response = await this.api.get('/trading/summary');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération du résumé' };
    }
  }

  // === NOUVELLES MÉTHODES POUR LE MONITORING ===

  async healthCheck() {
    const response = await this.api.get('/monitoring/health');
    return response.data;
  }

  async getMetrics() {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        success: true,
        data: {
          requests_per_minute: 45,
          response_time_avg: 120,
          error_rate: 0.02,
          successful_trades: 15,
          failed_trades: 1,
          total_profit: 25.50,
          uptime: "99.9%"
        }
      };
    }

    try {
      const response = await this.api.get('/monitoring/metrics');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la récupération des métriques' };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
