'use client';
import { AuthProvider, useAuth } from "@/context/AuthContext.";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "@/services/constants/RouteConstants";
import { ReactNode } from "react";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/Home";

export default function Router() {
    const { isAuthenticated } = useAuth();

    function publicRoute(path: string, element: ReactNode) {
        return (
            <Route
                path={path}
                element={isAuthenticated ? <Navigate to={ROUTE_ENDPOINTS.HOME} /> : element}
            />
        )
    };

    function AuthRoute(path: string, element: ReactNode) {
        return (
            <Route
                path={path}
                element={isAuthenticated ? element : <Navigate to={ROUTE_ENDPOINTS.LOGIN} />}
            />
        )
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {publicRoute(ROUTE_ENDPOINTS.LOGIN, <LoginPage />)}
                    {publicRoute(ROUTE_ENDPOINTS.REGISTER, <RegisterPage />)}
                    {AuthRoute(ROUTE_ENDPOINTS.HOME, <HomePage />)}
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}