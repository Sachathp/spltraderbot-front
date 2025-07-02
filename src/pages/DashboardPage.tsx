import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Zap,
  Target,
  Sparkles,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Timer,
  X,
  ExternalLink
} from 'lucide-react';
import { ActivityLog } from '../components/dashboard';
import { LogMessage, LogSettings } from '../types/logs';
import { LogLevel } from '../types/common';

const metrics = [
  {
    id: 'invested',
    title: 'Total Investis',
    value: '$1,250.75',
    rawValue: 1250.75,
    icon: DollarSign,
    gradient: 'from-gray-600 to-gray-800',
    bgGlow: 'shadow-gray-500/20'
  },
  {
    id: 'confirmed-revenue',
    title: 'Revenus Confirmés',
    value: '$1,450.25',
    rawValue: 1450.25,
    change: '+15.9%',
    isPositive: true,
    icon: CheckCircle,
    gradient: 'from-success-600 to-success-800',
    bgGlow: 'shadow-success-500/20'
  },
  {
    id: 'pending-revenue',
    title: 'Revenus En Attente',
    value: '$125.50',
    rawValue: 125.50,
    icon: Timer,
    gradient: 'from-warning-600 to-warning-800',
    bgGlow: 'shadow-warning-500/20'
  },
  {
    id: 'confirmed-profits',
    title: 'Profits Confirmés',
    value: '$199.50',
    rawValue: 199.50,
    change: '+24.7%',
    isPositive: true,
    icon: TrendingUp,
    gradient: 'from-success-600 to-success-800',
    bgGlow: 'shadow-success-500/20'
  },
  {
    id: 'pending-profits',
    title: 'Profits En Attente',
    value: '$45.25',
    rawValue: 45.25,
    icon: Clock,
    gradient: 'from-warning-600 to-warning-800',
    bgGlow: 'shadow-warning-500/20'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    value: '147',
    rawValue: 147,
    change: '+12',
    isPositive: true,
    icon: BarChart3,
    gradient: 'from-primary-600 to-primary-800',
    bgGlow: 'shadow-primary-500/20'
  }
];

export default function DashboardPage() {
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
  
  // État partagé pour les logs
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [settings, setSettings] = useState<LogSettings>({
    soundEnabled: true,
    autoScroll: true,
    maxMessages: 50,
    showOnlyDeals: false,
    levels: [LogLevel.INFO, LogLevel.SUCCESS, LogLevel.WARNING, LogLevel.ERROR],
  });

  const openActivityLog = () => setIsActivityLogOpen(true);
  const closeActivityLog = () => setIsActivityLogOpen(false);

  // Génération de logs factices
  const generateMockLog = (): LogMessage => {
    const messages = [
      {
        level: LogLevel.INFO,
        message: 'Scan du marché: 1,247 cartes analysées',
        category: 'SCAN',
        data: { cardsScanned: 1247, duration: 2.3 },
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Carte achetée: Kelya Frendul (Alpha) - $12.50',
        category: 'PURCHASE',
        data: { card: 'Kelya Frendul', edition: 'Alpha', price: 12.50 },
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Vente réalisée: Djinn Chwala vendu $45.00 (profit: +$12.30)',
        category: 'SALE',
        data: { card: 'Djinn Chwala', salePrice: 45.00, profit: 12.30 },
      },
      {
        level: LogLevel.WARNING,
        message: 'Prix ajusté: Llama Kron (+10% pour concurrence)',
        category: 'PRICE_UPDATE',
      },
      {
        level: LogLevel.ERROR,
        message: 'Limite API atteinte - Retry dans 30s',
        category: 'API_ERROR',
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Connexion API rétablie avec succès',
        category: 'CONNECTION',
      },
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message: randomMessage.message,
      level: randomMessage.level,
      timestamp: new Date(),
      category: randomMessage.category,
      data: randomMessage.data,
    };
  };

  const handleClearLogs = () => {
    setLogs([]);
    const clearLog: LogMessage = {
      id: `clear-${Date.now()}`,
      message: 'Journal d\'activité effacé',
      level: LogLevel.INFO,
      timestamp: new Date(),
      category: 'SYSTEM',
    };
    setLogs([clearLog]);
  };

  // Fermer la modale en cliquant sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeActivityLog();
    }
  };

  // Fermer avec la touche Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeActivityLog();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Logs initiaux
  useEffect(() => {
    const initialLogs: LogMessage[] = [
      {
        id: 'log-1',
        message: 'AutoTrader System v2.1.0 initialisé',
        level: LogLevel.INFO,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        category: 'SYSTEM',
      },
      {
        id: 'log-2',
        message: 'Connexion Splinterlands API établie',
        level: LogLevel.SUCCESS,
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
        category: 'CONNECTION',
      },
      {
        id: 'log-3',
        message: 'Configuration chargée: 15 cartes surveillées',
        level: LogLevel.INFO,
        timestamp: new Date(Date.now() - 1000 * 60 * 13),
        category: 'CONFIG',
        data: { watchedCards: 15 },
      },
    ];
    setLogs(initialLogs);
  }, []);

  // Simulation de logs en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Ajouter un log toutes les 4-7 secondes
      const randomDelay = Math.random() * 3000 + 4000;
      setTimeout(() => {
        const newLog = generateMockLog();
        setLogs(prevLogs => [...prevLogs.slice(-settings.maxMessages + 1), newLog]);
        
        // Notification sonore simulée
        if (settings.soundEnabled && newLog.level === LogLevel.SUCCESS) {
          console.log('🔊 Notification:', newLog.message);
        }
      }, randomDelay);
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.maxMessages, settings.soundEnabled]);

  return (
    <div className="space-y-8">
      {/* Header futuriste */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center space-x-3 mb-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
                  <Sparkles className="h-8 w-8 text-accent-400 relative z-10" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Splinterlands Trading Center
                </h1>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl">
                Système de trading automatique avec intelligence artificielle pour optimiser vos investissements Splinterlands
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="status-badge status-active text-base px-4 py-2">
                <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse mr-3"></div>
                <span className="font-bold">SYSTÈME ACTIF</span>
              </div>
              <div className="glass-card p-4 flex items-center space-x-3">
                <Activity className="h-5 w-5 text-accent-400 animate-pulse" />
                <div className="text-sm">
                  <div className="text-gray-300 font-medium">Dernière analyse</div>
                  <div className="text-gray-400">Il y a 2 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Titre externe */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Journal d'Activité</h2>
      </div>

      {/* Journal d'activité compact avec bouton d'agrandissement */}
      <div className="glass-card p-6 space-y-4">
        {/* Header avec bouton d'agrandissement */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-400">Suivi en temps réel</p>
          </div>
          
          <button
            onClick={openActivityLog}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-600 to-primary-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            title="Agrandir le journal d'activité"
          >
            <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
            <span>Agrandir</span>
          </button>
        </div>
        
        {/* Version compacte du journal d'activité */}
        <div className="h-96">
          <ActivityLog 
            compact 
            logs={logs} 
            settings={settings} 
            setSettings={setSettings}
            onClearLogs={handleClearLogs}
          />
        </div>
      </div>

      {/* Métriques modernes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <div 
              key={metric.id} 
              className="metric-card relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="metric-card-content">
                {/* Icône centrée */}
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} ${metric.bgGlow} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                {/* Titre centré */}
                <p className="text-sm font-medium text-gray-400 mb-2 text-center">
                  {metric.title}
                </p>
                
                {/* Valeur centrée */}
                <p className={`text-2xl font-bold text-center ${
                  metric.id.includes('profit') && metric.isPositive 
                    ? 'value-positive' 
                    : metric.id.includes('profit') && !metric.isPositive
                    ? 'value-negative'
                    : 'value-neutral'
                }`}>
                  {metric.value}
                </p>
                
                {/* Barre de progression (pour certaines métriques) */}
                {(metric.id === 'confirmed-profits' || metric.id === 'transactions') && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${metric.gradient} animate-pulse`}
                        style={{ width: `${Math.min((metric.rawValue / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Badge de changement en bas */}
                {metric.change && (
                  <div className="flex justify-center mt-4">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      metric.isPositive 
                        ? 'bg-success-500/20 text-success-300' 
                        : 'bg-danger-500/20 text-danger-300'
                    }`}>
                      {metric.isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Effet de hover glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${metric.bgGlow} blur`}></div>
            </div>
          );
        })}
      </div>

      {/* Stats avancées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Titre externe */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Performance du Bot</h2>
          </div>

          {/* Performance Overview */}
          <div className="glass-card p-8 space-y-6">
            <div className="text-center">
              <p className="text-gray-400">Dernières 24 heures</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Taux de réussite</span>
                <span className="value-positive">89.2%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-success-600 to-success-400 w-[89%] animate-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">ROI moyen</span>
                <span className="value-positive">+24.7%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-accent-600 to-primary-400 w-[75%] animate-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temps moyen de vente</span>
                <span className="text-gray-300 font-semibold">2h 15m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Titre externe */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-success-600 to-warning-600 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Activité Récente</h2>
          </div>

          {/* Activité récente */}
          <div className="glass-card p-8 space-y-6">
            <div className="text-center">
              <p className="text-gray-400">Actions automatiques</p>
            </div>
            
            <div className="space-y-3">
              {[
                { action: 'Achat', card: 'Chaos Knight', price: '$12.50', profit: '+26%', time: '2 min', type: 'buy' },
                { action: 'Vente', card: 'Venari Wavesmith', price: '$10.00', profit: '+21%', time: '5 min', type: 'sell' },
                { action: 'Analyse', card: 'Pelacor Bandit', price: '$5.50', profit: 'En cours', time: '8 min', type: 'analyze' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'buy' ? 'bg-primary-400' :
                      activity.type === 'sell' ? 'bg-success-400' :
                      'bg-warning-400'
                    } animate-pulse`}></div>
                    <div>
                      <div className="text-white font-medium">{activity.action} • {activity.card}</div>
                      <div className="text-xs text-gray-400">Il y a {activity.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibent">{activity.price}</div>
                    <div className={`text-xs ${activity.profit.includes('+') ? 'text-success-400' : 'text-gray-400'}`}>
                      {activity.profit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modale du Journal d'Activité */}
      {isActivityLogOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-6xl mx-4 h-[90vh] bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 animate-modal-in">
            {/* Header de la modale */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl shadow-lg">
                  <Activity className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Journal d'Activité Complet</h2>
                  <p className="text-gray-400">Suivi en temps réel de toutes les transactions</p>
                </div>
              </div>
              
              <button
                onClick={closeActivityLog}
                className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200 group"
                title="Fermer (Echap)"
              >
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
            
            {/* Contenu de la modale */}
            <div className="p-6 h-full overflow-hidden">
              <div className="h-full overflow-y-auto">
                <ActivityLog 
                  logs={logs} 
                  settings={settings} 
                  setSettings={setSettings}
                  onClearLogs={handleClearLogs}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 