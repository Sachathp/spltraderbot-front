import React, { useState } from 'react';
import { 
  User, 
  AlertTriangle,
  Settings, 
  Download, 
  Trash2,
  TrendingUp,
  Activity,
  Calendar,
  Shield,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function AccountPage() {
  const [showActiveKey, setShowActiveKey] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
                <User className="h-8 w-8 text-accent-400 relative z-10" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Mon Compte
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Gérez vos informations et paramètres de trading
            </p>
          </div>
        </div>
      </div>

      {/* Alerte DEC insuffisant */}
     

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Configuration Actuelle */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Configuration Actuelle</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Nom d'utilisateur:</span>
              <span className="font-medium text-accent-400">blitzstat</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tier:</span>
              <span className="px-2 py-1 bg-gradient-to-r from-danger-600 to-danger-700 rounded text-white text-sm font-medium">MAX</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Budget Quotidien:</span>
              <span className="font-medium text-white">100 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Prix Max par Carte:</span>
              <span className="font-medium text-white">10 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Seuil de Baisse:</span>
              <span className="font-medium text-white">-3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tips Priorité:</span>
              <span className="font-medium text-white">0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dernière Mise à Jour:</span>
              <span className="font-medium text-gray-400">01/07/2025 13:52:15</span>
            </div>
          </div>
        </div>

        {/* Informations du Compte */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-accent-600 to-accent-800 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">📊 Informations du Compte</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Statut:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-success-400">Actif</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Âge Configuration:</span>
              <span className="font-medium text-white">1 jours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Expiration:</span>
              <span className="font-medium text-white">Dans 23 jours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dernière Connexion:</span>
              <span className="font-medium text-white">01/07/2025 13:52:15</span>
            </div>
          </div>
        </div>

        {/* Gestion de la Configuration */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-warning-600 to-warning-800 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">⚙️ Gestion de la Configuration</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Modifier Configuration</span>
            </button>
            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exporter Configuration</span>
            </button>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-500 hover:to-danger-600 rounded-xl text-white font-medium shadow-lg hover:shadow-danger-500/25 hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-danger-500/20 hover:border-danger-400/30 flex items-center justify-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>Supprimer Configuration</span>
            </button>
          </div>
        </div>

        {/* Statistiques de Trading */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-success-600 to-success-800 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">📈 Statistiques de Trading</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Transactions Total:</span>
              <span className="font-medium text-white">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Profit Total:</span>
              <span className="font-medium text-white">0 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dernière Transaction:</span>
              <span className="font-medium text-gray-400">Aucune transaction</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Taux de Réussite:</span>
              <span className="font-medium text-white">0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Sécurité */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-danger-600 to-danger-800 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">🔒 Sécurité</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Clé Active:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-warning-400">Chiffrée localement</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dernière Validation:</span>
              <span className="font-medium text-white">02/07/2025 15:33:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Configuration Expiration:</span>
              <span className="font-medium text-white">31/07/2025</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Vérifier Clé Actuelle</span>
            </button>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-warning-600 to-warning-700 hover:from-warning-500 hover:to-warning-600 rounded-xl text-white font-medium shadow-lg hover:shadow-warning-500/25 hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-warning-500/20 hover:border-warning-400/30 flex items-center justify-center space-x-2">
              <Key className="h-4 w-4" />
              <span>Régénérer Chiffrement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 