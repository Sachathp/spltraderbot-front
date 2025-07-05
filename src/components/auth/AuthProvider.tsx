import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialiser immédiatement
    initialize();
    setIsHydrated(true);
  }, [initialize]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-300">
            Initialisation de l'application...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
