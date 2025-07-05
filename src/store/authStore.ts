import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterData, LoginResponse } from '../types/auth';
import { apiService } from '../services/apiService';
import { useEffect } from 'react';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Computed properties
  hasPostingKey: boolean;
  canTrade: boolean;
  isAdmin: boolean;
  
  // Hydratation
  initialize: () => void;
  
  // New method
  forceSync: () => void;
  
  // New method
  saveToStorage: (state: AuthStore) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      // État initial - charger depuis localStorage
      user: (() => {
        try {
          const stored = localStorage.getItem('auth-user');
          return stored ? JSON.parse(stored) : null;
        } catch {
          return null;
        }
      })(),
      token: (() => {
        try {
          const stored = localStorage.getItem('auth-token');
          return stored || null;
        } catch {
          return null;
        }
      })(),
      isAuthenticated: (() => {
        try {
          const stored = localStorage.getItem('auth-authenticated');
          return stored === 'true';
        } catch {
          return false;
        }
      })(),
      isLoading: false,
      error: null,
      
      // Computed properties
      get hasPostingKey() {
        return get().user?.has_posting_key || false;
      },
      
      get canTrade() {
        return get().user?.trading_enabled && get().user?.has_posting_key || false;
      },
      
      get isAdmin() {
        return get().user?.is_admin || false;
      },
      
      // Méthode pour sauvegarder manuellement
      saveToStorage: (state) => {
        try {
          if (state.user) {
            localStorage.setItem('auth-user', JSON.stringify(state.user));
          } else {
            localStorage.removeItem('auth-user');
          }
          
          if (state.token) {
            localStorage.setItem('auth-token', state.token);
          } else {
            localStorage.removeItem('auth-token');
          }
          
          localStorage.setItem('auth-authenticated', state.isAuthenticated.toString());
        } catch (error) {
          console.error('Erreur sauvegarde localStorage:', error);
        }
      },
      
      // Initialisation
      initialize: () => {
        const state = get();
        
        // Si on a un token et un user mais pas l'état authentifié, on le restaure
        if (state.token && state.user && !state.isAuthenticated) {
          set({ isAuthenticated: true });
          state.saveToStorage({ ...state, isAuthenticated: true });
        }
      },
      
      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response: LoginResponse = await apiService.login(credentials);
          
          if (!response || typeof response !== 'object') {
            throw new Error('Réponse du serveur invalide');
          }
          
          if (!response.access_token) {
            throw new Error('Token d\'accès manquant dans la réponse');
          }
          
          if (!response.user) {
            throw new Error('Données utilisateur manquantes dans la réponse');
          }
          
          const newState = {
            user: {
              ...response.user,
              is_admin: response.user.is_admin || response.user.is_superuser || false
            },
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          };
          
          set(newState);
          
          // Sauvegarder manuellement
          get().saveToStorage(newState);
          
          return { success: true };
        } catch (error: any) {
          console.error('Erreur de connexion:', error);
          
          let errorMessage = 'Erreur de connexion inconnue';
          
          if (error.response) {
            errorMessage = error.response.data?.detail || 
                          error.response.data?.message || 
                          `Erreur ${error.response.status}`;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({
            isLoading: false,
            error: errorMessage
          });
          
          return { success: false, error: errorMessage };
        }
      },
      
      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          if (data.password !== data.confirm_password) {
            throw new Error('Les mots de passe ne correspondent pas');
          }
          
          if (data.password.length < 8) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères');
          }
          
          const { confirm_password, ...registerData } = data;
          
          const response = await apiService.register(registerData);
          
          set({
            isLoading: false,
            error: null
          });
          
          return { success: true };
        } catch (error: any) {
          console.error('Registration error:', error);
          
          const errorMessage = error.response?.data?.detail || 
                             error.message || 
                             'Erreur lors de la création du compte';
          
          set({
            isLoading: false,
            error: errorMessage
          });
          
          return { success: false, error: errorMessage };
        }
      },
      
      logout: () => {
        apiService.logout().catch(console.warn);
        
        const newState = {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        };
        
        set(newState);
        
        // Nettoyer le localStorage
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-authenticated');
      },
      
      refreshUser: async () => {
        const state = get();
        
        if (!state.token) {
          return;
        }
        
        try {
          const user = await apiService.getCurrentUser();
          
          set({ 
            user: {
              ...user,
              is_admin: user.is_admin || user.is_superuser || false
            }, 
            isAuthenticated: true 
          });
        } catch (error) {
          console.error('Failed to refresh user:', error);
          get().logout();
        }
      },
      
      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      forceSync: () => {
        const state = get();
        const dataToSave = {
          state: {
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
          },
          version: 1
        };
        
        localStorage.setItem('auth-storage', JSON.stringify(dataToSave));
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

// Hook pour les événements d'authentification
export const useAuthEvents = () => {
  const logout = useAuthStore((state) => state.logout);
  
  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    
    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, [logout]);
  
  return { logout };
};

// Sélecteurs utiles pour les composants
export const useAuth = () => {
  const store = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    hasPostingKey: state.hasPostingKey,
    canTrade: state.canTrade,
    isAdmin: state.isAdmin,
    login: state.login,
    register: state.register,
    logout: state.logout,
    refreshUser: state.refreshUser,
    clearError: state.clearError,
    setLoading: state.setLoading,
    initialize: state.initialize,
    forceSync: state.forceSync,
  }));
  
  return store;
};

// Sélecteur pour l'état d'authentification uniquement
export const useAuthStatus = () => {
  return useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    logout: state.logout,
  }));
};
