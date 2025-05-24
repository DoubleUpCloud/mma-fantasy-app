"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface UserContextType {
  isLogged: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  isLogged: false,
  isLoading: true
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedCookie = getCookie('is-logged');
      setIsLogged(isLoggedCookie === 'true');
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  return (
    <UserContext.Provider value={{ isLogged, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
