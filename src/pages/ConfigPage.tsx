import React from 'react';
import { Settings, AlertCircle, Sparkles, Zap } from 'lucide-react';

export default function ConfigPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
              <Settings className="h-8 w-8 text-accent-400 relative z-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                ⚙️ Configuration
              </h1>
              <p className="text-lg text-gray-300 mt-2">
                Paramètres de trading automatique et configuration du système
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message de développement moderne */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-warning-600/10 via-accent-600/10 to-primary-600/10 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-warning-600 to-accent-600 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Page en développement</span>
                <Sparkles className="h-6 w-6 text-accent-400 animate-pulse" />
              </h3>
              <p className="text-gray-300 text-lg mt-1">
                Interface de configuration avancée en cours de création
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="glass-card p-6 border border-accent-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-accent-400" />
                <h4 className="text-lg font-semibold text-white">Paramètres de Trading</h4>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Seuils de profit automatiques</li>
                <li>• Fréquence de scan du marché</li>
                <li>• Limites de budget par transaction</li>
                <li>• Filtres par édition de cartes</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-primary-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-primary-400" />
                <h4 className="text-lg font-semibold text-white">Configuration Système</h4>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• API Splinterlands</li>
                <li>• Notifications en temps réel</li>
                <li>• Sauvegarde automatique</li>
                <li>• Mode de trading (conservateur/agressif)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Ces fonctionnalités seront disponibles dans la prochaine version
            </p>
            <button className="btn-secondary">
              <AlertCircle className="h-5 w-5 mr-2" />
              Recevoir une notification à la sortie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 