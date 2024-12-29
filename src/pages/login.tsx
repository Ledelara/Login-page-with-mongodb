'use client'

import { AlertPopUp } from "@/components/Alert/Alert"
import LoginForm from "@/components/Forms/LoginForm"
import { AlertProvider } from "@/context/AlertContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function LoginPage() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                <LoginForm />
                <AlertPopUp />
            </AlertProvider>
        </QueryClientProvider>
    )
}