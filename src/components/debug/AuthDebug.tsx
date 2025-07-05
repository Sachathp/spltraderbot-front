import React from 'react';
import { useAuth } from '../../store/authStore';

export const AuthDebug: React.FC = () => {
  const { user, token, isAuthenticated, isLoading, refreshUser } = useAuth();

  const handleTestToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/test-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Test token:', data);
      alert('Test token: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Test token error:', error);
      alert('Test token error: ' + error);
    }
  };

  const handleRefreshUser = () => {
    refreshUser();
  };

  const handleClearStorage = () => {
    localStorage.removeItem('auth-storage');
    window.location.reload();
  };

  const handleShowStorage = () => {
    const storage = localStorage.getItem('auth-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      console.log('=== CONTENU LOCALSTORAGE ===');
      console.log('Raw:', storage);
      console.log('Parsed:', parsed);
      console.log('State:', parsed.state);
      console.log('Token:', parsed.state?.token);
      console.log('User:', parsed.state?.user);
      console.log('IsAuthenticated:', parsed.state?.isAuthenticated);
      console.log('=== FIN CONTENU ===');
      
      alert('Voir console pour les détails du localStorage');
    } else {
      alert('Aucun localStorage trouvé');
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <p>Authenticated: {isAuthenticated ? '✅' : '❌'}</p>
        <p>Loading: {isLoading ? '⏳' : '✅'}</p>
        <p>User: {user?.username || 'None'}</p>
        <p>Token: {token ? '✅ ' + token.substring(0, 10) + '...' : '❌'}</p>
        <p>LocalStorage: {localStorage.getItem('auth-storage') ? '✅' : '❌'}</p>
      </div>
      <div className="mt-2 space-y-1">
        <button 
          onClick={handleTestToken}
          disabled={!token}
          className="block w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-2 py-1 rounded text-xs"
        >
          Test Token
        </button>
        <button 
          onClick={handleRefreshUser}
          className="block w-full bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
        >
          Refresh User
        </button>
        <button 
          onClick={handleClearStorage}
          className="block w-full bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
        >
          Clear Storage
        </button>
        <button 
          onClick={handleShowStorage}
          className="block w-full bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
        >
          Show Storage
        </button>
      </div>
    </div>
  );
}; 