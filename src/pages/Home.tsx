'use client'
import { useState } from "react";
import useCreateUser from "../../services/mutate";
import { IUser } from "../../Types/types";
import RegisterForm from "@/components/Forms/RegisterForm";
import { userSchema } from "@/schemas/userSchema";

export default function HomePage() {
    const { createUserMutation, loading } = useCreateUser();
    const [user, setUser] = useState<IUser>({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErros] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = userSchema.safeParse(user);

        if (!result.success) {
            const fieldErrors = result.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {} as Record<string, string>);
            setErros(fieldErrors);
            return;
        }

        setErros({});
        createUserMutation.mutate(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <RegisterForm
            values={user}
            onSubmit={handleSubmit}
            onChange={handleChange}
            disabled={loading}
            errors={errors}
        />
    )
}
