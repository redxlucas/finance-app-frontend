import { z } from "zod";

export const registerFormSchema = z.object({
    completeName: z
        .string()
        .nonempty("Nome é obrigatório")
        .refine((val) => val.trim().split(" ").length >= 2, {
            message: "Informe o nome completo",
        }),
    login: z.string().nonempty("Campo obrigatório"),
    password: z.string().min(8, "A senha precisa ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
    receiveEmails: z.boolean().optional(),
});

export const registerSchema = registerFormSchema
    .extend({
        languagePreference: z.enum(["PTBR", "EN"]),
        themePreference: z.enum(["DARK", "LIGHT"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type RegisterFormInput = z.infer<typeof registerFormSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
