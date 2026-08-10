import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/types';
import { authService } from '../services/api/authService';
import { storageService } from '../services/storageService';

interface AuthContextType {
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await authService.verifyToken();
        if (user) {
          setCurrentUser(user);
        } else {
          storageService.clearSession();
        }
      } catch (error) {
        console.error('Session restoration failed:', error);
        storageService.clearSession();
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const login = (token: string, user: UserProfile) => {
    storageService.saveAccessToken(token);
    setCurrentUser(user);
  };

  const logout = () => {
    storageService.clearSession();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      isAuthenticated: !!currentUser,
      isLoading,
      isInitialized,
      login,
      logout,
    }}>
      {/* Show nothing or a full screen loader until initialized to prevent flashing */}
      {!isInitialized ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
