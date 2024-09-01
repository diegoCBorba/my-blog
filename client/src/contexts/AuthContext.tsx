import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useProfile } from '@/hooks/auth/useProfile';

interface AuthContextProps {
  isAdmin: boolean;
  isLogged: boolean;
  username: string;
  id: number;
  setAuthInfo: (info: AuthInfo) => void;
}

interface AuthInfo {
  isAdmin: boolean;
  isLogged: boolean;
  username: string;
  id: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: profile, isLoading, error } = useProfile();

  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAdmin: false,
    isLogged: false,
    username: '',
    id: 0,
  });
  useEffect(() => {
    if (profile && !isLoading && !error) {
      setAuthInfo({
        isAdmin: profile.isAdmin,
        isLogged: true,
        username: profile.username,
        id: profile.userId,
      });
    }
  }, [profile, isLoading, error]);

  return (
    <AuthContext.Provider value={{ ...authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
