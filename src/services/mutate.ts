'use client'
import { useMutation } from "@tanstack/react-query"
import { createUser, loginUser } from "./api";
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";

const useCreateUser = () => {
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

const useLoginUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert()

    const loginUserMutation = useMutation({
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
            setError("Ocorreu um erro ao fazer login. Tente novamente.");
            setLoading(false);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    return {
        loginUserMutation,
        loading,
        error,
    };
}

export { useCreateUser, useLoginUser };