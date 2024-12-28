import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Por favor, insira um email válido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

export type User = z.infer<typeof userSchema>;