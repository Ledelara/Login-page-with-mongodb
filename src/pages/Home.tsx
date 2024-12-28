'use client'
import { AlertPopUp } from "@/components/Alert/Alert";
import RegisterForm from "@/components/Forms/RegisterForm";
import { AlertProvider } from "@/context/AlertContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function HomePage() {
    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
            <AlertProvider>
                <RegisterForm />
                <AlertPopUp />
            </AlertProvider>
        </QueryClientProvider>
    )
}
