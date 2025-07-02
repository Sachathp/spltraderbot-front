import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  X,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { Edition, TransactionStatus } from '../../types';

interface TransactionFiltersProps {
  onFiltersChange: (filters: {
    editions: Edition[];
    statuses: TransactionStatus[];
    searchTerm: string;
    limit: number;
  }) => void;
  isLoading?: boolean;
}

const editionLabels: Record<Edition, string> = {
  [Edition.ALL]: '🌟 Toutes',
  [Edition.ALPHA]: '🥇 Alpha',
  [Edition.BETA]: '🥈 Beta', 
  [Edition.PROMO]: '✨ Promo',
  [Edition.REWARD]: '🏆 Reward',
  [Edition.UNTAMED]: '🌿 Untamed',
  [Edition.DICE]: '🎲 Dice',
  [Edition.GLADIUS]: '⚔️ Gladius',
  [Edition.CHAOS]: '⚡ Chaos Legion',
  [Edition.RIFT]: '🌌 Rift',
  [Edition.SOULBOUND]: '👻 Soulbound',
  [Edition.REBELLION]: '⚔️ Rebellion',
  [Edition.SOULBOUND_RB]: '👻 Soulbound RB',
  [Edition.CONCLAVE]: '🏛️ Conclave',
  [Edition.SOULBOUND_CA]: '👻 Soulbound CA'
};

const statusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.ALL]: '🌟 Tous',
  [TransactionStatus.BOUGHT]: '🛒 Achetées',
  [TransactionStatus.SELLING]: '📦 En Vente',
  [TransactionStatus.SOLD]: '✅ Vendues',
  [TransactionStatus.MARKED_SOLD]: '⚠️ Marquées Vendues'
};

const limitOptions = [
  { value: 50, label: '50 résultats' },
  { value: 100, label: '100 résultats' },
  { value: 200, label: '200 résultats' },
  { value: -1, label: 'Tous les résultats' }
];

export default function TransactionFilters({ onFiltersChange, isLoading }: TransactionFiltersProps) {
  const [selectedEditions, setSelectedEditions] = useState<Edition[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<TransactionStatus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(100);
  const [showEditionDropdown, setShowEditionDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);

  const handleEditionToggle = (edition: Edition) => {
    const newEditions = selectedEditions.includes(edition)
      ? selectedEditions.filter(e => e !== edition)
      : [...selectedEditions, edition];
    
    setSelectedEditions(newEditions);
    applyFilters(newEditions, selectedStatuses, searchTerm, limit);
  };

  const openEditionDropdown = () => {
    setShowEditionDropdown(!showEditionDropdown);
    setShowStatusDropdown(false);
    setShowLimitDropdown(false);
  };

  const openStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
    setShowEditionDropdown(false);
    setShowLimitDropdown(false);
  };

  const openLimitDropdown = () => {
    setShowLimitDropdown(!showLimitDropdown);
    setShowEditionDropdown(false);
    setShowStatusDropdown(false);
  };

  const handleStatusToggle = (status: TransactionStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    
    setSelectedStatuses(newStatuses);
    applyFilters(selectedEditions, newStatuses, searchTerm, limit);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    applyFilters(selectedEditions, selectedStatuses, term, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setShowLimitDropdown(false);
    applyFilters(selectedEditions, selectedStatuses, searchTerm, newLimit);
  };

  const applyFilters = (editions: Edition[], statuses: TransactionStatus[], search: string, resultLimit: number) => {
    onFiltersChange({
      editions,
      statuses,
      searchTerm: search,
      limit: resultLimit === -1 ? 1000 : resultLimit
    });
  };

  const resetFilters = () => {
    setSelectedEditions([]);
    setSelectedStatuses([]);
    setSearchTerm('');
    setLimit(100);
    setShowEditionDropdown(false);
    setShowStatusDropdown(false);
    setShowLimitDropdown(false);
    applyFilters([], [], '', 100);
  };

  const hasActiveFilters = selectedEditions.length > 0 || selectedStatuses.length > 0 || searchTerm.length > 0;

  return (
    <div className="glass-card p-6 space-y-6" style={{ zIndex: 100, position: 'relative' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Filtres Avancés</h3>
            <p className="text-sm text-gray-400">Personnalisez votre recherche de transactions</p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
            disabled={isLoading}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Barre de recherche */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Nom de carte, édition..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Filtre Éditions */}
        <div className="relative" style={{ zIndex: showEditionDropdown ? 10000 : 'auto' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Éditions {selectedEditions.length > 0 && `(${selectedEditions.length})`}
          </label>
          <button
            onClick={openEditionDropdown}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            <span className="text-sm">
              {selectedEditions.length === 0 ? 'Toutes les éditions' : `${selectedEditions.length} sélectionnée(s)`}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showEditionDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showEditionDropdown && (
            <div className="absolute z-[9999] w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto" style={{ position: 'absolute', zIndex: 99999 }}>
              {Object.entries(editionLabels).map(([edition, label]) => (
                <label key={edition} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEditions.includes(edition as Edition)}
                    onChange={() => handleEditionToggle(edition as Edition)}
                    className="mr-3 rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-white">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Statuts */}
        <div className="relative" style={{ zIndex: showStatusDropdown ? 10000 : 'auto' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Statuts {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
          </label>
          <button
            onClick={openStatusDropdown}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            <span className="text-sm">
              {selectedStatuses.length === 0 ? 'Tous les statuts' : `${selectedStatuses.length} sélectionné(s)`}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showStatusDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showStatusDropdown && (
            <div className="absolute z-[9999] w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto" style={{ position: 'absolute', zIndex: 99999 }}>
              {Object.entries(statusLabels).map(([status, label]) => (
                <label key={status} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status as TransactionStatus)}
                    onChange={() => handleStatusToggle(status as TransactionStatus)}
                    className="mr-3 rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-white">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Limite de résultats */}
        <div className="relative" style={{ zIndex: showLimitDropdown ? 10000 : 'auto' }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Limite
          </label>
          <button
            onClick={openLimitDropdown}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            <span className="text-sm">
              {limitOptions.find(opt => opt.value === limit)?.label || '100 résultats'}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showLimitDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showLimitDropdown && (
            <div className="absolute z-[9999] w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl" style={{ position: 'absolute', zIndex: 99999 }}>
              {limitOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLimitChange(option.value)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-white first:rounded-t-lg last:rounded-b-lg"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Indicateur de filtres actifs */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedEditions.map(edition => (
            <span key={edition} className="inline-flex items-center px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
              {editionLabels[edition]}
              <button
                onClick={() => handleEditionToggle(edition)}
                className="ml-1 hover:text-primary-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedStatuses.map(status => (
            <span key={status} className="inline-flex items-center px-2 py-1 bg-accent-500/20 text-accent-300 rounded-full text-xs">
              {statusLabels[status]}
              <button
                onClick={() => handleStatusToggle(status)}
                className="ml-1 hover:text-accent-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
              "{searchTerm}"
              <button
                onClick={() => handleSearchChange('')}
                className="ml-1 hover:text-gray-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
} 