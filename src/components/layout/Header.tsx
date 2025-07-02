import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  User, 
  Shield, 
  Zap,
  Activity,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Journal', href: '/', icon: BarChart3, emoji: '📊' },
  { name: 'Configuration', href: '/config', icon: Settings, emoji: '⚙️' },
  { name: 'Mon Compte', href: '/account', icon: User, emoji: '👤' },
  { name: 'Sécurité', href: '/security', icon: Shield, emoji: '🔒' },
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
                          : 'text-gray-400 group-hover:text-gray-200 group-hover:scale-110'
                      )} />
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className={clsx(
                        'font-medium text-sm transition-colors duration-200',
                        isActive 
                          ? 'text-accent-300' 
                          : 'text-gray-300 group-hover:text-white'
                      )}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Indicateur actif */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
            
            {/* Indicateur de statut */}
            <div className="ml-6 flex items-center space-x-3">
              <div className="status-badge status-active">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs font-semibold">ACTIF</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 