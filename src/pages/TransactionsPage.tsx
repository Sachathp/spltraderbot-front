import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, DollarSign, Package } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import { Transaction, Edition, TransactionStatus } from '../types';
import { searchTransactions } from '../services/mockData';

interface TransactionStats {
  totalTransactions: number;
  totalInvested: number;
  totalRevenue: number;
  totalProfit: number;
  averageProfit: number;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<TransactionStats>({
    totalTransactions: 0,
    totalInvested: 0,
    totalRevenue: 0,
    totalProfit: 0,
    averageProfit: 0
  });

  // Chargement initial des transactions
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async (filters?: {
    editions: Edition[];
    statuses: TransactionStatus[];
    searchTerm: string;
    limit: number;
  }) => {
    setIsLoading(true);
    try {
      const data = await searchTransactions(filters);
      setTransactions(data);
      calculateStats(data);
    } catch (error) {
      console.error('Erreur lors du chargement des transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (transactionList: Transaction[]) => {
    const totalTransactions = transactionList.length;
    const totalInvested = transactionList.reduce((sum, t) => sum + t.purchasePrice, 0);
    const totalRevenue = transactionList
      .filter(t => t.salePrice)
      .reduce((sum, t) => sum + (t.salePrice || 0), 0);
    const totalProfit = transactionList
      .filter(t => t.netProfit)
      .reduce((sum, t) => sum + (t.netProfit || 0), 0);
    const soldTransactions = transactionList.filter(t => t.netProfit !== undefined);
    const averageProfit = soldTransactions.length > 0 
      ? totalProfit / soldTransactions.length 
      : 0;

    setStats({
      totalTransactions,
      totalInvested,
      totalRevenue,
      totalProfit,
      averageProfit
    });
  };

  const handleFiltersChange = (filters: {
    editions: Edition[];
    statuses: TransactionStatus[];
    searchTerm: string;
    limit: number;
  }) => {
    loadTransactions(filters);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'Total Transactions',
      value: stats.totalTransactions.toString(),
      icon: BarChart3,
      gradient: 'from-primary-600 to-primary-800',
      bgGlow: 'shadow-primary-500/20',
      emoji: '📊'
    },
    {
      title: 'Total Investi',
      value: formatCurrency(stats.totalInvested),
      icon: DollarSign,
      gradient: 'from-gray-600 to-gray-800',
      bgGlow: 'shadow-gray-500/20',
      emoji: '💰'
    },
    {
      title: 'Revenus Totaux',
      value: formatCurrency(stats.totalRevenue),
      icon: Package,
      gradient: 'from-accent-600 to-accent-800',
      bgGlow: 'shadow-accent-500/20',
      emoji: '💸'
    },
    {
      title: 'Profits Totaux',
      value: formatCurrency(stats.totalProfit),
      icon: TrendingUp,
      gradient: stats.totalProfit >= 0 
        ? 'from-success-600 to-success-800' 
        : 'from-danger-600 to-danger-800',
      bgGlow: stats.totalProfit >= 0 
        ? 'shadow-success-500/20' 
        : 'shadow-danger-500/20',
      emoji: stats.totalProfit >= 0 ? '💚' : '❤️'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg blur opacity-30 animate-pulse"></div>
                <BarChart3 className="h-8 w-8 text-primary-400 relative z-10" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Journal des Transactions
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl">
              Historique complet de vos transactions Splinterlands avec filtres avancés et analyses détaillées
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div 
              key={stat.title} 
              className="metric-card relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="metric-card-content">
                {/* Header avec icône */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.bgGlow} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Titre */}
                <p className="text-sm font-medium text-gray-400 mb-2">
                  {stat.title}
                </p>
                
                {/* Valeur */}
                <p className={`text-2xl font-bold ${
                  stat.title.includes('Profit') && stats.totalProfit >= 0
                    ? 'value-positive' 
                    : stat.title.includes('Profit') && stats.totalProfit < 0
                    ? 'value-negative'
                    : 'value-neutral'
                }`}>
                  {stat.value}
                </p>
              </div>
              
              {/* Effet de hover glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${stat.bgGlow} blur`}></div>
            </div>
          );
        })}
      </div>

      {/* Filtres */}
      <TransactionFilters 
        onFiltersChange={handleFiltersChange}
        isLoading={isLoading}
      />

      {/* Tableau des transactions */}
      <TransactionTable 
        transactions={transactions}
        isLoading={isLoading}
      />

      {/* Section d'aide */}
      <div className="glass-card p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">💡</div>
          <h3 className="text-lg font-semibold text-white">Guide d'utilisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <div className="font-medium text-primary-400 text-center">🔍 Filtres</div>
              <ul className="space-y-1">
                <li>• Recherchez par nom de carte</li>
                <li>• Filtrez par édition ou statut</li>
                <li>• Limitez le nombre de résultats</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-accent-400 text-center">📊 Tri</div>
              <ul className="space-y-1">
                <li>• Cliquez sur les colonnes pour trier</li>
                <li>• Tri par profit, date, prix</li>
                <li>• Ordre croissant/décroissant</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-success-400 text-center">📈 Statistiques</div>
              <ul className="space-y-1">
                <li>• Mise à jour automatique</li>
                <li>• Basées sur les filtres actifs</li>
                <li>• Calculs de profits nets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 