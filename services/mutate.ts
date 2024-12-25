'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "./api";

const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            console.log("User created:", data);
        },
        onError: (error: Error) => {
            console.error("Error creating user:", error);
        },
    })
}

export default useCreateUser;

