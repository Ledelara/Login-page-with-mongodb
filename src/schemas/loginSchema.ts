import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email('o email deve ser válido.')
        .min(1, 'o email é obrigatório.'),
    password: z
        .string()   
        .min(1, 'a senha é obrigatória.')
})