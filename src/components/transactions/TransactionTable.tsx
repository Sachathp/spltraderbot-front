import React, { useState, useMemo } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  ShoppingCart,
  Search,
  AlertTriangle
} from 'lucide-react';
import { Transaction, TransactionStatus } from '../../types';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

type SortField = 'cardName' | 'edition' | 'purchasePrice' | 'salePrice' | 'netProfit' | 'profitPercentage' | 'date' | 'timeElapsed';
type SortDirection = 'asc' | 'desc';

const statusConfig = {
  [TransactionStatus.ALL]: { 
    icon: Package, 
    label: 'Tous', 
    color: 'text-gray-400 bg-gray-500/20',
    emoji: '🌟'
  },
  [TransactionStatus.BOUGHT]: { 
    icon: ShoppingCart, 
    label: 'Achetée', 
    color: 'text-blue-400 bg-blue-500/20',
    emoji: '🛒'
  },
  [TransactionStatus.SELLING]: { 
    icon: Package, 
    label: 'En Vente', 
    color: 'text-orange-400 bg-orange-500/20',
    emoji: '📦'
  },
  [TransactionStatus.SOLD]: { 
    icon: CheckCircle, 
    label: 'Vendue', 
    color: 'text-green-400 bg-green-500/20',
    emoji: '✅'
  },
  [TransactionStatus.MARKED_SOLD]: { 
    icon: AlertTriangle, 
    label: 'Marquée Vendue', 
    color: 'text-yellow-400 bg-yellow-500/20',
    emoji: '⚠️'
  }
};

export default function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Gestion des valeurs null/undefined
      if (aValue === null || aValue === undefined) aValue = 0;
      if (bValue === null || bValue === undefined) bValue = 0;

      // Gestion spéciale pour les dates
      if (sortField === 'date') {
        aValue = a.date.getTime();
        bValue = b.date.getTime();
      }

      // Gestion spéciale pour le temps écoulé
      if (sortField === 'timeElapsed') {
        // Convertir le temps en minutes pour le tri
        const convertToMinutes = (timeStr?: string) => {
          if (!timeStr) return 0;
          const match = timeStr.match(/(\d+)h?\s*(\d+)?m?/);
          if (!match) return 0;
          const hours = parseInt(match[1] || '0');
          const minutes = parseInt(match[2] || '0');
          return hours * 60 + minutes;
        };
        aValue = convertToMinutes(a.timeElapsed);
        bValue = convertToMinutes(b.timeElapsed);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [transactions, sortField, sortDirection]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <div className="w-4 h-4" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const StatusBadge = ({ status }: { status: TransactionStatus }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span>{config.emoji}</span>
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </div>
    );
  };

  const ProfitDisplay = ({ netProfit, profitPercentage }: { netProfit?: number; profitPercentage?: number }) => {
    if (netProfit === undefined || profitPercentage === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    const isPositive = netProfit > 0;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';

    return (
      <div className={`${colorClass} font-semibold`}>
        <div>{formatCurrency(netProfit)}</div>
        <div className="text-xs opacity-75">
          {isPositive ? '+' : ''}{profitPercentage.toFixed(1)}%
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="glass-card p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
          <span className="text-gray-400">Chargement des transactions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Header du tableau */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Journal des Transactions</h3>
            <p className="text-sm text-gray-400">
              {sortedTransactions.length} transaction{sortedTransactions.length > 1 ? 's' : ''} trouvée{sortedTransactions.length > 1 ? 's' : ''}
            </p>
          </div>
          
          {totalPages > 1 && (
            <div className="text-sm text-gray-400">
              Page {currentPage} sur {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Tableau responsive */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('cardName')}
              >
                <div className="flex items-center space-x-1">
                  <span>🃏 Carte</span>
                  <SortIcon field="cardName" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('edition')}
              >
                <div className="flex items-center space-x-1">
                  <span>📚 Édition</span>
                  <SortIcon field="edition" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('purchasePrice')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>💰 Prix Achat</span>
                  <SortIcon field="purchasePrice" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('salePrice')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>💸 Prix Vente</span>
                  <SortIcon field="salePrice" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('netProfit')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>💎 Profit NET</span>
                  <SortIcon field="netProfit" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('timeElapsed')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>⏱️ Temps</span>
                  <SortIcon field="timeElapsed" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-200"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>📅 Date</span>
                  <SortIcon field="date" />
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedTransactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className="hover:bg-gray-800/30 transition-colors duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {transaction.cardName[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{transaction.cardName}</div>
                      <div className="text-xs text-gray-400">
                        Niveau {transaction.cardLevel} • {transaction.cardRarity}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                    {transaction.edition}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(transaction.purchasePrice)}
                  </span>
                  {transaction.marketFees && (
                    <div className="text-xs text-gray-400">
                      +{formatCurrency(transaction.marketFees)} frais
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {transaction.salePrice ? (
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(transaction.salePrice)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <ProfitDisplay 
                    netProfit={transaction.netProfit} 
                    profitPercentage={transaction.profitPercentage} 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {transaction.timeElapsed ? (
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-300">
                      <Clock className="w-3 h-3" />
                      <span>{transaction.timeElapsed}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-white">{formatDate(transaction.date)}</div>
                  <div className="text-xs text-gray-400">{formatTime(transaction.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <StatusBadge status={transaction.status} />
                    {transaction.isVerified && (
                      <div title="Vérifié">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} sur {sortedTransactions.length} résultats
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aucun résultat */}
      {sortedTransactions.length === 0 && !isLoading && (
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-white mb-2">Aucune transaction trouvée</h3>
          <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
} 