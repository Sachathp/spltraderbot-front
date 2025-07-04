import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface NetworkErrorProps {
  onRetry: () => void;
  message?: string;
}

export const NetworkError: React.FC<NetworkErrorProps> = ({ 
  onRetry, 
  message = "Impossible de se connecter au serveur. Vérifiez que le backend est démarré." 
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Erreur de connexion
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {message}
          </p>
          <div className="mt-3">
            <button 
              onClick={onRetry}
              className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
