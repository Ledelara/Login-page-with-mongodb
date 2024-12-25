'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "./api";
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";

const useCreateUser = () => {
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert()

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onMutate: () => {
            setLoading(true);
            setError(null);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            console.log("User created:", data);
            setLoading(false);
            showAlert("Usuário criado com sucesso!", "success");
        },
        onError: (error: Error) => {
            console.error("Error creating user:", error);
            setError("Ocorreu um erro ao criar o usuário. Tente novamente.");
            setLoading(false);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    return {
        createUserMutation,
        loading,
        error,
    };
}

export default useCreateUser;