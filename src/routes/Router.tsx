'use client';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "@/services/constants/RouteConstants";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import HomePage from "@/pages/Home";
import { useAuth } from "@/context/AuthContext.";

export default function Router() {
    const { isAuthenticated, isInitialized } = useAuth();

    console.log('Autenticado: ', isAuthenticated);
    console.log('Inicializado: ', isInitialized);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTE_ENDPOINTS.LOGIN}
                    element={isAuthenticated ? <Navigate to={ROUTE_ENDPOINTS.HOME} /> : <LoginPage />}
                />
                <Route
                    path={ROUTE_ENDPOINTS.REGISTER}
                    element={isAuthenticated ? <Navigate to={ROUTE_ENDPOINTS.HOME} /> : <RegisterPage />}
                />
                <Route
                    path={ROUTE_ENDPOINTS.HOME}
                    element={isAuthenticated ? <HomePage /> : <Navigate to={ROUTE_ENDPOINTS.LOGIN} />}
                />
            </Routes>
        </BrowserRouter>
    );
}
