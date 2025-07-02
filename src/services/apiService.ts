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

class ApiService {
  private api: AxiosInstance;
  private useMockData = true; // Passer à false quand le backend sera prêt

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteurs pour gérer les erreurs
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

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
      const response = await this.api.get('/transactions', {
        params: { ...filters, ...pagination }
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
      const response = await this.api.get('/dashboard/metrics');
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
      const response = await this.api.get('/logs', { params: { limit } });
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
      const response = await this.api.get('/status');
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
      const response = await this.api.post('/verify-status');
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
      await this.api.delete('/logs');
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la suppression des logs' };
    }
  }

  // Méthode pour basculer entre mock et vraies données
  setUseMockData(useMock: boolean) {
    this.useMockData = useMock;
  }
}

export const apiService = new ApiService();
export default apiService; 