import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  User, 
  Zap,
  Activity,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Sparkles, color: 'text-accent-400', hoverColor: 'group-hover:text-accent-300' },
  { name: 'Journal', href: '/transactions', icon: BarChart3, color: 'text-primary-400', hoverColor: 'group-hover:text-primary-300' },
  { name: 'Configuration', href: '/config', icon: Settings, color: 'text-warning-400', hoverColor: 'group-hover:text-warning-300' },
  { name: 'Mon Compte', href: '/account', icon: User, color: 'text-success-400', hoverColor: 'group-hover:text-success-300' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="modern-header sticky top-0 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo futuriste */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl blur opacity-20 group-hover:opacity-40 animate-glow"></div>
                <div className="relative p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-2xl shadow-2xl group-hover:shadow-accent-500/50 transition-all duration-300">
                  <Zap className="h-8 w-8 text-white animate-float" />
                </div>
              </div>
              <div className="group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                    AutoTrader
                  </h1>
                  <Sparkles className="h-5 w-5 text-accent-400 animate-pulse" />
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Activity className="h-3 w-3 text-success-400 animate-pulse" />
                  <p className="text-sm text-gray-400 font-medium">
                    Splinterlands Trading Bot
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation futuriste */}
          <nav className="flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'nav-item group relative',
                    isActive ? 'nav-item-active' : ''
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {isActive && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
                      )}
                      <Icon className={clsx(
                        'h-5 w-5 relative z-10 transition-all duration-200',
                        isActive 
                          ? 'text-accent-300 scale-110' 
                          : `${item.color} ${item.hoverColor} group-hover:scale-110`
                      )} />
                    </div>
                    <span className={clsx(
                      'font-medium text-sm transition-colors duration-200 hidden md:block',
                      isActive 
                        ? 'text-accent-300' 
                        : 'text-gray-300 group-hover:text-white'
                    )}>
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Indicateur actif */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
            
            {/* Section authentification */}
            <div className="ml-6 flex items-center space-x-3">
              <AuthSection />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Composant pour gérer l'authentification
function AuthSection() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-500"></div>
        <span className="text-sm text-gray-400">Chargement...</span>
      </div>
    );
  }
  
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="status-badge status-active">
          <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse mr-2"></div>
          <span className="text-xs font-semibold">CONNECTÉ</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-success-600 to-success-700 rounded-lg blur opacity-20"></div>
              <User className="h-5 w-5 text-success-400 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {user.username}
              </span>
              <span className="text-xs text-gray-400">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="glass-card px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600/20 border border-red-600/30 hover:border-red-600/50 transition-all duration-200 flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">Déconnexion</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-3">
      <div className="status-badge bg-yellow-600/20 border-yellow-600/30">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
        <span className="text-xs font-semibold text-yellow-400">MODE DÉMO</span>
      </div>
      <Link
        to="/login"
        className="glass-card px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-accent-500/25"
      >
        <User className="h-4 w-4" />
        <span>Se connecter</span>
      </Link>
    </div>
  );
}