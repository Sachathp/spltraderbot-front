import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Volume2, VolumeX, Activity, Zap, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { LogMessage, LogSettings } from '../../types/logs';
import { LogLevel } from '../../types/common';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [settings, setSettings] = useState<LogSettings>({
    soundEnabled: true,
    autoScroll: true,
    maxMessages: 50,
    showOnlyDeals: false,
    levels: [LogLevel.INFO, LogLevel.SUCCESS, LogLevel.WARNING, LogLevel.ERROR],
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand de nouveaux logs arrivent
  useEffect(() => {
    if (settings.autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, settings.autoScroll]);

  // Génération de logs factices
  const generateMockLog = (): LogMessage => {
    const messages = [
      {
        level: LogLevel.INFO,
        message: 'Scan du marché: 1,247 cartes analysées',
        category: 'SCAN',
        data: { cardsScanned: 1247, duration: 2.3 },
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Carte achetée: Kelya Frendul (Alpha) - $12.50',
        category: 'PURCHASE',
        data: { card: 'Kelya Frendul', edition: 'Alpha', price: 12.50 },
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Vente réalisée: Djinn Chwala vendu $45.00 (profit: +$12.30)',
        category: 'SALE',
        data: { card: 'Djinn Chwala', salePrice: 45.00, profit: 12.30 },
      },
      {
        level: LogLevel.WARNING,
        message: 'Prix ajusté: Llama Kron (+10% pour concurrence)',
        category: 'PRICE_UPDATE',
      },
      {
        level: LogLevel.ERROR,
        message: 'Limite API atteinte - Retry dans 30s',
        category: 'API_ERROR',
      },
      {
        level: LogLevel.SUCCESS,
        message: 'Connexion API rétablie avec succès',
        category: 'CONNECTION',
      },
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message: randomMessage.message,
      level: randomMessage.level,
      timestamp: new Date(),
      category: randomMessage.category,
      data: randomMessage.data,
    };
  };

  // Simulation de logs en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Ajouter un log toutes les 4-7 secondes
      const randomDelay = Math.random() * 3000 + 4000;
      setTimeout(() => {
        const newLog = generateMockLog();
        setLogs(prevLogs => [...prevLogs.slice(-settings.maxMessages + 1), newLog]);
        
        // Notification sonore simulée
        if (settings.soundEnabled && newLog.level === LogLevel.SUCCESS) {
          console.log('🔊 Notification:', newLog.message);
        }
      }, randomDelay);
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.maxMessages, settings.soundEnabled]);

  // Logs initiaux
  useEffect(() => {
    const initialLogs: LogMessage[] = [
      {
        id: 'log-1',
        message: 'AutoTrader System v2.1.0 initialisé',
        level: LogLevel.INFO,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        category: 'SYSTEM',
      },
      {
        id: 'log-2',
        message: 'Connexion Splinterlands API établie',
        level: LogLevel.SUCCESS,
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
        category: 'CONNECTION',
      },
      {
        id: 'log-3',
        message: 'Configuration chargée: 15 cartes surveillées',
        level: LogLevel.INFO,
        timestamp: new Date(Date.now() - 1000 * 60 * 13),
        category: 'CONFIG',
        data: { watchedCards: 15 },
      },
    ];
    setLogs(initialLogs);
  }, []);

  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case LogLevel.SUCCESS:
        return <CheckCircle className="h-4 w-4" />;
      case LogLevel.WARNING:
        return <AlertCircle className="h-4 w-4" />;
      case LogLevel.ERROR:
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLogStyle = (level: LogLevel) => {
    switch (level) {
      case LogLevel.SUCCESS:
        return 'text-success-300 bg-success-500/10 border-success-500/20';
      case LogLevel.WARNING:
        return 'text-warning-300 bg-warning-500/10 border-warning-500/20';
      case LogLevel.ERROR:
        return 'text-danger-300 bg-danger-500/10 border-danger-500/20';
      default:
        return 'text-blue-300 bg-blue-500/10 border-blue-500/20';
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
    const clearLog: LogMessage = {
      id: `clear-${Date.now()}`,
      message: 'Journal d\'activité effacé',
      level: LogLevel.INFO,
      timestamp: new Date(),
      category: 'SYSTEM',
    };
    setLogs([clearLog]);
  };

  const filteredLogs = logs.filter(log => 
    settings.levels.includes(log.level)
  );

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header moderne */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl shadow-lg">
            <Activity className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Journal d'Activité</h3>
            <p className="text-sm text-gray-400">{filteredLogs.length} événements récents</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Toggle Son */}
          <button
            onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            className={`p-2 rounded-lg transition-all duration-200 ${
              settings.soundEnabled
                ? 'bg-primary-500/20 text-primary-300 hover:bg-primary-500/30'
                : 'bg-gray-700/50 text-gray-500 hover:bg-gray-700/70'
            }`}
            title={settings.soundEnabled ? 'Désactiver le son' : 'Activer le son'}
          >
            {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Effacer logs */}
          <button
            onClick={handleClearLogs}
            className="p-2 rounded-lg bg-danger-500/20 text-danger-300 hover:bg-danger-500/30 transition-all duration-200"
            title="Effacer le journal"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Zone de logs avec style moderne */}
      <div 
        ref={scrollRef}
        className="h-80 overflow-y-auto space-y-2 pr-2 custom-scrollbar"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Zap className="h-12 w-12 mx-auto mb-4 text-gray-600 animate-pulse" />
            <p className="text-lg font-medium">En attente d'activité...</p>
            <p className="text-sm">Les événements apparaîtront ici en temps réel</p>
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={log.id}
              className={`p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getLogStyle(log.level)}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {getLogIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold opacity-80">
                        {log.level}
                      </span>
                      {log.category && (
                        <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full font-medium">
                          {log.category}
                        </span>
                      )}
                    </div>
                    <time className="text-xs opacity-60">
                      {formatDistanceToNow(log.timestamp, { 
                        addSuffix: true, 
                        locale: fr 
                      })}
                    </time>
                  </div>
                  
                  <p className="text-sm font-medium leading-relaxed">
                    {log.message}
                  </p>
                  
                  {log.data && (
                    <div className="mt-2 p-2 bg-black/20 rounded-lg">
                      <details className="text-xs">
                        <summary className="cursor-pointer opacity-75 hover:opacity-100 font-medium">
                          Détails technique
                        </summary>
                        <pre className="mt-1 text-xs overflow-x-auto text-gray-400">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer avec statistiques */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success-400 rounded-full"></div>
            <span>{logs.filter(log => log.level === LogLevel.SUCCESS).length} succès</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-warning-400 rounded-full"></div>
            <span>{logs.filter(log => log.level === LogLevel.WARNING).length} alertes</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-danger-400 rounded-full"></div>
            <span>{logs.filter(log => log.level === LogLevel.ERROR).length} erreurs</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span>Auto-scroll:</span>
          <button
            onClick={() => setSettings(prev => ({ ...prev, autoScroll: !prev.autoScroll }))}
            className={`w-8 h-4 rounded-full transition-colors ${
              settings.autoScroll ? 'bg-primary-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
              settings.autoScroll ? 'translate-x-4' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog; 