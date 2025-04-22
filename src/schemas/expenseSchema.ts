import { z } from "zod";

export const expenseSchema = z.object({
    amount: z.coerce.number().positive("O valor deve ser maior que zero"),
    description: z.string().nonempty("Campo obrigatório"),
    category: z.string().nonempty("Campo obrigatório"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
