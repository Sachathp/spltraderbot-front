import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Upload, 
  Download, 
  Key, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Globe, 
  Sparkles, 
  Zap,
  Lock,
  User,
  Link as LinkIcon,
  Eye,
  EyeOff,
  RotateCcw,
  Plus,
  X
} from 'lucide-react';

export default function ConfigPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [showActiveKey, setShowActiveKey] = useState(false);
  const [configData, setConfigData] = useState({
    hiveUsername: '',
    activeKey: '',
    decThreshold: 1000,
    rechargePeriod: 24,
    autoRestart: true,
    enableSecurity: true,
    allowHiveTransactions: true,
    enableApiMonitoring: true,
    selectedEndpoints: ['interface', 'validator', 'test-connection', 'activation', 'emergency']
  });

  const steps = [
    { id: 1, title: 'Clé Hive', icon: Key },
    { id: 2, title: 'Paramètres', icon: Settings },
    { id: 3, title: 'Validation', icon: CheckCircle }
  ];

  const apiEndpoints = [
    { id: 'interface', label: 'Interface connectée au backend AutoTrader', url: 'https://autotrader-api.verifier.com/api/validate-key', status: 'active' },
    { id: 'validator', label: 'Validation client', url: 'https://autotrader-api.verifier.com/api/test-connection', status: 'active' },
    { id: 'test-connection', label: 'Test connection', url: 'https://autotrader-api.verifier.com/api/test-connection', status: 'active' },
    { id: 'activation', label: 'Activation client', url: 'https://autotrader-api.verifier.com/api/activation', status: 'active' },
    { id: 'emergency', label: 'Arrêt urgence', url: 'https://autotrader-api.verifier.com/api/emergency-stop', status: 'active' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setConfigData(prev => ({ ...prev, [field]: value }));
  };

  const handleEndpointToggle = (endpointId: string) => {
    setConfigData(prev => ({
      ...prev,
      selectedEndpoints: prev.selectedEndpoints.includes(endpointId)
        ? prev.selectedEndpoints.filter(id => id !== endpointId)
        : [...prev.selectedEndpoints, endpointId]
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header moderne */}
      <div className="page-header">
        <div className="page-header-content">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg blur opacity-30 animate-pulse"></div>
                <Settings className="h-8 w-8 text-accent-400 relative z-10" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Configuration AutoTrader
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Configurez votre bot de trading Splinterlands
            </p>
          </div>
        </div>
      </div>

      {/* Sauvegarde détectée */}
      <div className="glass-card p-6 border border-success-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-success-600 to-success-800 rounded-xl">
              <Save className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Configuration Sauvegarde Détectée</h3>
              <p className="text-gray-300">
                <span className="text-success-400 font-medium">blitzstat</span> • Tier max • 
                <span className="text-warning-400"> Dernière connexion: 01/07/2025 (Il y a 1 jour)</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Upload className="h-5 w-5 mr-2" />
              Restaurer Configuration
            </button>
            <button className="btn-primary">
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle Configuration
            </button>
            <button className="btn-secondary text-danger-400 hover:text-danger-300">
              <X className="h-5 w-5" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Configuration AutoTrader */}
      <div className="glass-card p-8">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Configuration AutoTrader</h2>
          </div>
          <p className="text-gray-300">Configurez votre bot de trading Splinterlands</p>
        </div>

        {/* Étapes de configuration */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    activeStep >= step.id 
                      ? 'bg-gradient-to-r from-accent-600 to-primary-600 border-accent-500 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {activeStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${activeStep >= step.id ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-gradient-to-r from-accent-600 to-primary-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Alerte DEC */}
          <div className="glass-card p-4 bg-warning-500/10 border border-warning-500/20 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-warning-400" />
              <p className="text-warning-300">
                <span className="font-medium">Solde DEC insuffisant (≤ 1000):</span> Merci de recharger le compte pour continuer le trading.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Clé Active Hive */}
      <div className="glass-card p-8">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-warning-600 to-warning-800 rounded-xl">
              <Key className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Configuration Clé Active Hive</h2>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="h-4 w-4 text-warning-400" />
            <p className="text-warning-300 text-sm">
              <span className="font-medium">Important:</span> Utilisez votre clé ACTIVE dédiée pour le trading. Jamais votre clé owner ! La clé active permet les transactions Splinterlands.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom d'utilisateur Hive
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ex: monsurvinam"
                value={configData.hiveUsername}
                onChange={(e) => handleInputChange('hiveUsername', e.target.value)}
                className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Le nom d'utilisateur Hive (sans @)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Clé Active Dédiée
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showActiveKey ? "text" : "password"}
                placeholder="5XXXXX"
                value={configData.activeKey}
                onChange={(e) => handleInputChange('activeKey', e.target.value)}
                className="glass-card w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowActiveKey(!showActiveKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showActiveKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              La clé WIF de 51 caractères commençant par 5
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-4 w-4 text-primary-400" />
            <p className="text-primary-300 text-sm font-medium">
              Nouveau parcours: Votre clé de service sera sélectionnée après validation de votre clé dans l'étape suivante.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button className="btn-primary">
              <CheckCircle className="h-5 w-5 mr-2" />
              Valider la Clé
            </button>
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-danger-600 to-danger-800 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sécurité</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success-400" />
              <span className="text-gray-300">Votre clé active est chiffrée avec AES-256</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success-400" />
              <span className="text-gray-300">Permet les transactions Splinterlands (achat/vente)</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success-400" />
              <span className="text-gray-300">Vous gardez le contrôle total de vos fonds</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success-400" />
              <span className="text-gray-300">Révocation instantanée possible 24/7</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Chiffrement AES-256</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-success-400 text-sm">Actif</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Transactions Hive sécurisées</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-success-400 text-sm">Actif</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Monitoring API</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-success-400 text-sm">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connexion API */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Connexion API</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300 mb-4">Interface connectée au backend AutoTrader :</p>
          
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="flex items-center justify-between p-4 glass-card border border-white/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={configData.selectedEndpoints.includes(endpoint.id)}
                  onChange={() => handleEndpointToggle(endpoint.id)}
                  className="w-4 h-4 text-accent-600 bg-transparent border-gray-600 rounded focus:ring-accent-500 focus:ring-2"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{endpoint.label}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                      <span className="text-success-400 text-xs">Actif</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{endpoint.url}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="btn-secondary">
            <RotateCcw className="h-5 w-5 mr-2" />
            Tester les Connexions
          </button>
          <button className="btn-primary">
            <Save className="h-5 w-5 mr-2" />
            Sauvegarder Configuration
          </button>
        </div>
      </div>
    </div>
  );
} 