import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterData, LoginResponse } from '../types/auth';
import { apiService } from '../services/apiService';

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
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        // Computed properties
        get hasPostingKey() {
          return get().user?.has_posting_key || false;
        },
        
        get canTrade() {
          return get().user?.trading_enabled || false;
        },
        
        get isAdmin() {
          return get().user?.is_admin || false;
        },
        
        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          
          try {
            const response: LoginResponse = await apiService.login(credentials);
            
            // Stocker le token et les données utilisateur
            apiService.setAuthToken(response.access_token);
            
            set({
              user: response.user,
              token: response.access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            console.log('Login successful:', { user: response.user, isAuthenticated: true });
            
            return { success: true };
          } catch (error: any) {
            console.error('Login error:', error);
            
            const errorMessage = error.response?.data?.detail || 
                               error.response?.data?.message || 
                               'Erreur de connexion. Vérifiez vos identifiants.';
            
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
            // Validation côté frontend
            if (data.password !== data.confirm_password) {
              throw new Error('Les mots de passe ne correspondent pas');
            }
            
            if (data.password.length < 8) {
              throw new Error('Le mot de passe doit contenir au moins 8 caractères');
            }
            
            // Retirer confirm_password avant d'envoyer au backend
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
          console.log('Logout called');
          
          // Nettoyer les données locales
          apiService.clearAuthToken();
          
          // Appeler l'API de logout (optionnel, même si ça échoue)
          apiService.logout().catch(console.warn);
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null
          });
          
          console.log('Logout completed');
        },
        
        refreshUser: async () => {
          const token = get().token;
          if (!token) return;
          
          try {
            const user = await apiService.getCurrentUser();
            
            set({ user, isAuthenticated: true });
            console.log('User refreshed:', user);
          } catch (error) {
            console.error('Failed to refresh user:', error);
            // Si l'API échoue, on déconnecte l'utilisateur
            get().logout();
          }
        },
        
        clearError: () => set({ error: null }),
        
        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        // Fonction pour hydrater le store depuis localStorage
        onRehydrateStorage: () => (state) => {
          console.log('Rehydrating auth store:', state);
          
          if (state?.token && state?.user) {
            // Restaurer le token dans le service API
            apiService.setAuthToken(state.token);
            
            console.log('Auth restored from storage:', { 
              user: state.user.username, 
              isAuthenticated: state.isAuthenticated 
            });
            
            // Optionnel : rafraîchir les données utilisateur
            // state.refreshUser?.();
          }
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// Hook pour les événements d'authentification
export const useAuthEvents = () => {
  const logout = useAuthStore((state) => state.logout);
  
  // Écouter les événements de déconnexion (expiration de token, etc.)
  if (typeof window !== 'undefined') {
    window.addEventListener('auth:logout', logout);
  }
  
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
