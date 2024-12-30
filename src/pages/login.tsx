'use client'

import { AlertPopUp } from "@/components/Alert/Alert"
import LoginForm from "@/components/Forms/LoginForm"
import { AlertProvider } from "@/context/AlertContext"
import { AuthProvider } from "@/context/AuthContext."
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function LoginPage() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                <AuthProvider>
                    <LoginForm />
                    <AlertPopUp />
                </AuthProvider>
            </AlertProvider>
        </QueryClientProvider>
    )
}