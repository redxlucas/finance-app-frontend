import { z } from "zod";

export const incomeSchema = z.object({
    amount: z.coerce.number().positive("O valor deve ser maior que zero"),
    recurrence: z.string().nonempty("Campo obrigatório"),
    description: z.string().nonempty("Campo obrigatório"),
    category: z.string().nonempty("Campo obrigatório"),
});

export type IncomeInput = z.infer<typeof incomeSchema>;
