import React, { useState, useRef } from 'react';
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
  const hiveUsernameRef = useRef<HTMLInputElement>(null);
  const hiveConfigSectionRef = useRef<HTMLDivElement>(null);
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

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      // Scroll vers la section de configuration Hive et focus sur l'input
      setTimeout(() => {
        hiveConfigSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Focus sur l'input après le scroll
        setTimeout(() => {
          hiveUsernameRef.current?.focus();
        }, 300);
      }, 100);
    }
    setActiveStep(stepId);
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

      {/* Configuration sauvegardée (système en développement) */}
      {/* Titre externe */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-success-600 to-success-800 rounded-lg">
          <Save className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Configuration Détectée</h3>
      </div>
      
      <div className="glass-card p-4 border border-success-500/10 bg-success-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-sm text-gray-400">
                <span className="text-success-400 font-medium">blitzstat</span> • Tier max • 
                <span className="text-warning-400"> Dernière connexion: 01/07/2025 (Il y a 1 jour)</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-accent-400">•</span> Système de configurations multiples en développement
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Restaurer</span>
            </button>
            <button className="px-3 py-2 text-sm bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-500 hover:to-primary-500 rounded-lg text-white transition-all duration-200 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle</span>
            </button>
            <button className="px-2 py-2 text-sm bg-white/10 hover:bg-danger-500/20 border border-white/20 hover:border-danger-500/30 rounded-lg text-gray-400 hover:text-danger-300 transition-colors duration-200">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Titre externe */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Configuration AutoTrader</h2>
      </div>

      {/* Configuration AutoTrader */}
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <p className="text-gray-300">Configurez votre bot de trading Splinterlands</p>
        </div>

        {/* Étapes de configuration */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                      activeStep >= step.id 
                        ? 'bg-gradient-to-r from-accent-600 to-primary-600 border-accent-500 text-white hover:from-accent-500 hover:to-primary-500' 
                        : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {activeStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </button>
                  <div className="ml-3">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className={`font-medium transition-colors duration-200 ${
                        activeStep >= step.id ? 'text-white hover:text-gray-200' : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {step.title}
                    </button>
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
        </div>
      </div>

      {/* Titre externe */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-warning-600 to-warning-800 rounded-xl">
          <Key className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Configuration Clé Active Hive</h2>
      </div>

      {/* Configuration Clé Active Hive */}
      <div ref={hiveConfigSectionRef} className="glass-card p-8">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <AlertCircle className="h-4 w-4 text-warning-400" />
          <p className="text-warning-300 text-sm">
            <span className="font-medium">Important:</span> Utilisez votre clé ACTIVE dédiée pour le trading. Jamais votre clé owner ! La clé active permet les transactions Splinterlands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom d'utilisateur Hive
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={hiveUsernameRef}
                type="text"
                placeholder="Ex: monsurvinam"
                value={configData.hiveUsername}
                onChange={(e) => handleInputChange('hiveUsername', e.target.value)}
                className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
                className="glass-card w-full pl-10 pr-12 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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

      {/* Titre externe */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-danger-600 to-danger-800 rounded-xl">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Sécurité & Connexions API</h2>
      </div>

      {/* Sécurité & Connexions API */}
      <div className="glass-card p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        {/* Connexions API intégrées */}
        <div className="border-t border-white/10 pt-6">
         
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-success-400" />
                <div className="flex-1">
                  <span className="text-gray-300 font-medium">{endpoint.label}</span>
                  <p className="text-xs text-gray-500">{endpoint.url}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
} 