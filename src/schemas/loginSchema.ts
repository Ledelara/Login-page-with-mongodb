import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('Por favor, insira um email válido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})