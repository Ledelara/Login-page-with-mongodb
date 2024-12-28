import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

interface AuthContextType {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = jwt_decode(token);
        setUser(userData as { id: string; email: string });
      } catch (error) {
        console.error("Token inválido", error);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = jwt_decode(token);
    setUser(userData as { id: string; email: string });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
