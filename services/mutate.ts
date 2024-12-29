'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, loginUser } from "./api";
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";

const useCreateUser = () => {
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert();

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
            showAlert("Ocorreu um erro ao criar o usuário. Tente novamente.", "error");
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

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onMutate: () => {
            setLoading(true);
            setError(null);
        },
        onSuccess: (data) => {
            console.log("User logged in:", data);
            setLoading(false);
            showAlert("Usuário logado com sucesso!", "success");
        },
        onError: (error: Error) => {
            console.error("Error logging in:", error);
            setError("Ocorreu um erro ao logar. Tente novamente.");
            setLoading(false);
            showAlert("Ocorreu um erro ao logar. Tente novamente.", "error");
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    return {
        loginMutation,
        loading,
        error,
    };
}

export { useCreateUser, useLogin };
