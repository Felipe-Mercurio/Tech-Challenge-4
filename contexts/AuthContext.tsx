import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name: string;
  level: 'Admin' | 'Professor' | 'Aluno';
  token: string;
};

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: Omit<User, 'token'>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then((stored) => {
      if (stored) setUser(JSON.parse(stored));
    });
  }, []);

  function login(token: string, userData: Omit<User, 'token'>) {
    const userPayload: User = { token, ...userData };
    setUser(userPayload);
    AsyncStorage.setItem('user', JSON.stringify(userPayload));
  }

  function logout() {
    setUser(null);
    AsyncStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
