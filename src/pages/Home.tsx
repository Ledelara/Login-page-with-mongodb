'use client'
import { useState } from "react";
import useCreateUser from "../../services/mutate";
import { IUser } from "../../Types/types";
import RegisterForm from "@/components/Forms/RegisterForm";

export default function HomePage() {
    const { createUserMutation, loading } = useCreateUser();
    const [user, setUser] = useState<IUser>({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
        />
    )
}
