import { IUser } from "@/@types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('authToken');
                setUser(null);
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (token: string) => {
        localStorage.setItem('authToken', token);
        await fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };