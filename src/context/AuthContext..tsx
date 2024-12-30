'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser, ILoginResponse } from "@/@types/types";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/services/mutate";

interface AuthContextProps {
    user: IUser | null;
    login: (credentials: Omit<IUser, "name">) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();
    const { loginUserMutation } = useLoginUser();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.email) {
                    setUser(user);
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Erro ao processar o usuário salvo:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }

        setIsInitialized(true);
    }, []);

    const login = async (credentials: Omit<IUser, "name">) => {
        try {
            const response: ILoginResponse = await loginUserMutation.mutateAsync(credentials);

            if (!response.token || !response.user) {
                throw new Error("Resposta inválida da API");
            }

            setUser(response.user);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

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

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

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
