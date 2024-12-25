'use client'
import { useState } from "react";

export default function HomePage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            alert('Usuário salvo com sucesso!');
            setForm({ name: '', email: '', password: '' });
        } else {
            alert('Erro ao salvar usuário');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nome" onChange={handleChange} value={form.name} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={form.email} />
            <input type="password" name="password" placeholder="Senha" onChange={handleChange} value={form.password} />
            <button type="submit">Salvar</button>
        </form>
    )
}