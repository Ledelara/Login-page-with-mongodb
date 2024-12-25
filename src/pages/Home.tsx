'use client'
import { useState } from "react";
import useCreateUser from "../../services/mutate";
import { IUser } from "../../Types/types";


export default function HomePage() {
    const { mutate } = useCreateUser();
    const [user, setUser] = useState<IUser>({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        mutate(user);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">Salvar</button>
        </form>
    )
}