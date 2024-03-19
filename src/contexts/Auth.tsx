

import React, { createContext, useContext, ReactNode, useState } from 'react';

export type User = {
    username: string;
    email: string;
    userType: string;
    orgName?: string;
    id: number;
}

interface AuthContextType {
  user: User | null;
  login: (userDetails: User, jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userDetails: User, jwt: string) => {
    setUser(userDetails);
    localStorage.setItem('JWT', jwt);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('JWT');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
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
