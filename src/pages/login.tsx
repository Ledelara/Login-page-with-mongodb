'use client';
import { AlertPopUp } from "@/components/Alert/Alert";
import LoginPage from "@/components/Forms/LoginForm";
import { AlertProvider } from "@/context/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Login() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                <LoginPage />
                <AlertPopUp />
            </AlertProvider>
        </QueryClientProvider>
    )
}