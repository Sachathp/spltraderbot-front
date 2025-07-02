import React from 'react';
import { User, AlertCircle, Sparkles, UserCheck, Settings, Bell } from 'lucide-react';

export default function AccountPage() {
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
              Informations du compte utilisateur et préférences
            </p>
          </div>
        </div>
      </div>

      {/* Contenu moderne */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-600/10 to-success-600/10 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Gestion de compte avancée</span>
                <Sparkles className="h-6 w-6 text-accent-400 animate-pulse" />
              </h3>
              <p className="text-gray-300 text-lg mt-1">
                Fonctionnalités de compte en cours de développement
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6 border border-primary-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <UserCheck className="h-5 w-5 text-primary-400" />
                <h4 className="text-lg font-semibold text-white">Profil Utilisateur</h4>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Informations personnelles</li>
                <li>• Compte Splinterlands lié</li>
                <li>• Statistiques d'utilisation</li>
                <li>• Historique des connexions</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-accent-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-accent-400" />
                <h4 className="text-lg font-semibold text-white">Préférences</h4>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Thème de l'interface</li>
                <li>• Langue de l'application</li>
                <li>• Format des devises</li>
                <li>• Fuseaux horaires</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 border border-success-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="h-5 w-5 text-success-400" />
                <h4 className="text-lg font-semibold text-white">Notifications</h4>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Alertes de profit</li>
                <li>• Notifications d'achat/vente</li>
                <li>• Rapports quotidiens</li>
                <li>• Alertes système</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 