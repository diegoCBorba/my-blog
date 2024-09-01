import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAdmin: false,
    isLogged: false,
    username: '',
    id: 0,
  });

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
