'use client'

import { AlertPopUp } from "@/components/Alert/Alert";
import LoginPage from "@/components/Forms/LoginForm";
import { AlertProvider } from "@/context/AlertContext";
import { AuthProvider } from "@/context/Auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Login() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AlertProvider>
                    <LoginPage />
                    <AlertPopUp />
                </AlertProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}