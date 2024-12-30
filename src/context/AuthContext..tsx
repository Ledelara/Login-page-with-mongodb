'use client';

import React, { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/@types/types";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/services/mutate";

interface AuthContextProps {
  user: IUser | null;
  login: (user: Omit<IUser, "name">) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const { loginUserMutation } = useLoginUser();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (credentials: Omit<IUser, "name">) => {
    try {
      const loggedUser = await loginUserMutation.mutateAsync(credentials);
      setUser(loggedUser);
      localStorage.setItem("token", loggedUser.token || "");
      localStorage.setItem("user", JSON.stringify(loggedUser));
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
