import React from 'react';
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
  Timer
} from 'lucide-react';
import { ActivityLog } from '../components/dashboard';

const metrics = [
  {
    id: 'invested',
    title: 'Total Investis',
    value: '$1,250.75',
    rawValue: 1250.75,
    icon: DollarSign,
    gradient: 'from-gray-600 to-gray-800',
    bgGlow: 'shadow-gray-500/20',
    emoji: '💰'
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
    bgGlow: 'shadow-success-500/20',
    emoji: '✅'
  },
  {
    id: 'pending-revenue',
    title: 'Revenus En Attente',
    value: '$125.50',
    rawValue: 125.50,
    icon: Timer,
    gradient: 'from-warning-600 to-warning-800',
    bgGlow: 'shadow-warning-500/20',
    emoji: '📦'
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
    bgGlow: 'shadow-success-500/20',
    emoji: '💚'
  },
  {
    id: 'pending-profits',
    title: 'Profits En Attente',
    value: '$45.25',
    rawValue: 45.25,
    icon: Clock,
    gradient: 'from-warning-600 to-warning-800',
    bgGlow: 'shadow-warning-500/20',
    emoji: '⏳'
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
    bgGlow: 'shadow-primary-500/20',
    emoji: '📊'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header futuriste */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
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
            
            <div className="flex items-center space-x-6 mt-6 lg:mt-0">
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
                {/* Header avec icône */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{metric.emoji}</span>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.gradient} ${metric.bgGlow} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {metric.change && (
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
                  )}
                </div>
                
                {/* Titre */}
                <p className="text-sm font-medium text-gray-400 mb-2">
                  {metric.title}
                </p>
                
                {/* Valeur */}
                <p className={`text-2xl font-bold ${
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
              </div>
              
              {/* Effet de hover glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${metric.bgGlow} blur`}></div>
            </div>
          );
        })}
      </div>

      {/* Journal d'activité en temps réel */}
      <ActivityLog />

      {/* Stats avancées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Overview */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Performance du Bot</h3>
              <p className="text-gray-400">Dernières 24 heures</p>
            </div>
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

        {/* Activité récente */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-success-600 to-warning-600 rounded-xl shadow-lg">
              <Zap className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Activité Récente</h3>
              <p className="text-gray-400">Actions automatiques</p>
            </div>
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
  );
} 