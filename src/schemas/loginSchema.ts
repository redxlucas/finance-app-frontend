import { z } from "zod";

export const loginSchema = z.object({
    login: z.string().nonempty("Campo obrigatório"),
    password: z.string().nonempty("Campo obrigatório")
});

export type LoginInput = z.infer<typeof loginSchema>;
