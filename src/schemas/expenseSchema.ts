import { z } from "zod";

export const expenseSchema = z.object({
    amount: z.coerce.number().positive("O valor deve ser maior que zero"),
    description: z.string().nonempty("Campo obrigatório"),
    type: z.enum(["VARIABLE", "FIXED"]),
    categoryId: z.coerce.number().positive("Campo obrigatório"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
