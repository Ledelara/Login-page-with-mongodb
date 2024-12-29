'use client';
import { useAuth } from "@/context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "../../services/constants/RouteConstants";
import Login from "@/pages/login";
import Register from "@/pages/register";
import HomePage from "@/pages/Home";

export default function Router() {
    const { isAuthenticated } = useAuth();

    function publicRoute(path: string, element: React.ReactNode) {
        return (
            <Route 
                path={path}
                element={isAuthenticated ? <Navigate to={ROUTE_ENDPOINTS.HOME} /> : element}
            />
        );
    }

    function AuthRoute(path: string, element: React.ReactNode) {
        return (
            <Route 
                path={path}
                element={isAuthenticated ? element : <Navigate to={ROUTE_ENDPOINTS.LOGIN} />}
            />
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {publicRoute(ROUTE_ENDPOINTS.LOGIN, <Login />)}
                {publicRoute(ROUTE_ENDPOINTS.REGISTER, <Register />)}
                {AuthRoute(ROUTE_ENDPOINTS.HOME, <HomePage />)}
            </Routes>
        </BrowserRouter>
    );
}
