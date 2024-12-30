'use client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "@/services/constants/RouteConstants";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/Home";
import { useAuth } from "@/context/AuthContext.";

export default function Router() {
    const { isAuthenticated } = useAuth();

    function publicRoute(path: string, element: React.ReactNode) {
        return (
            <Route
                path={path}
                element={isAuthenticated ? <Navigate to={ROUTE_ENDPOINTS.HOME} replace /> : element}
            />
        );
    }

    function AuthRoute(path: string, element: React.ReactNode) {
        return (
            <Route
                path={path}
                element={isAuthenticated ? element : <Navigate to={ROUTE_ENDPOINTS.LOGIN} replace />}
            />
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {publicRoute(ROUTE_ENDPOINTS.LOGIN, <LoginPage />)}
                {publicRoute(ROUTE_ENDPOINTS.REGISTER, <RegisterPage />)}
                {AuthRoute(ROUTE_ENDPOINTS.HOME, <HomePage />)}
            </Routes>
        </BrowserRouter>
    );
}
