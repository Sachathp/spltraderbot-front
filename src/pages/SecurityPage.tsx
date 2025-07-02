import React from 'react';
import { Shield, AlertCircle, Sparkles, Lock, Key, Eye, Fingerprint } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
                <Shield className="h-8 w-8 text-accent-400 relative z-10" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Sécurité
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Paramètres de sécurité et authentification avancée
            </p>
          </div>
        </div>
      </div>

      {/* Status de sécurité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-success-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-success-600 to-success-800 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Statut de Sécurité</h3>
              <p className="text-success-300 text-sm">Niveau de protection : Élevé</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Connexion sécurisée</span>
              <span className="status-badge status-active text-xs">ACTIF</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Chiffrement des données</span>
              <span className="status-badge status-active text-xs">AES-256</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Authentification 2FA</span>
              <span className="status-badge status-selling text-xs">À CONFIGURER</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 border border-warning-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-warning-600 to-warning-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Recommandations</h3>
              <p className="text-warning-300 text-sm">Actions suggérées</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Activer l'authentification à deux facteurs</li>
            <li>• Configurer les alertes de sécurité</li>
            <li>• Réviser les permissions API</li>
            <li>• Mettre à jour le mot de passe</li>
          </ul>
        </div>
      </div>

      {/* Fonctionnalités de sécurité */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 via-danger-600/10 to-warning-600/10 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-600 to-danger-600 rounded-xl shadow-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Fonctionnalités de sécurité avancées</span>
                <Sparkles className="h-6 w-6 text-accent-400 animate-pulse" />
              </h3>
              <p className="text-gray-300 text-lg mt-1">
                Protection de niveau enterprise pour vos fonds
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="glass-card p-6 border border-accent-500/20 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-800 rounded-xl flex items-center justify-center mb-4">
                <Key className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Clés API</h4>
              <p className="text-gray-300 text-sm">Gestion sécurisée des accès Splinterlands</p>
            </div>
            
            <div className="glass-card p-6 border border-primary-500/20 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Monitoring</h4>
              <p className="text-gray-300 text-sm">Surveillance en temps réel des activités</p>
            </div>
            
            <div className="glass-card p-6 border border-success-500/20 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-success-600 to-success-800 rounded-xl flex items-center justify-center mb-4">
                <Fingerprint className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Biométrie</h4>
              <p className="text-gray-300 text-sm">Authentification par empreinte digitale</p>
            </div>
            
            <div className="glass-card p-6 border border-warning-500/20 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-warning-600 to-warning-800 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Protection</h4>
              <p className="text-gray-300 text-sm">Chiffrement bout-en-bout des données</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Interface de sécurité avancée en cours de développement
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary">
                <Shield className="h-5 w-5 mr-2" />
                Activer 2FA
              </button>
              <button className="btn-secondary">
                <Lock className="h-5 w-5 mr-2" />
                Audit de sécurité
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 