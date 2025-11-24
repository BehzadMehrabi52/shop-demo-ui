"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loadUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // آیا کاربر لاگین است؟
  const isLoggedIn = !!user;

  // ذخیره کاربر (فعلاً در localStorage)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("shop-user", JSON.stringify(userData));
  };

  // لاگ‌اوت
  const logout = () => {
    setUser(null);
    localStorage.removeItem("shop-user");
  };

  // بارگذاری از LocalStorage (یا بعداً API)
  const loadUser = () => {
    const saved = localStorage.getItem("shop-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  };

  // هنگام اولین اجرا
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
