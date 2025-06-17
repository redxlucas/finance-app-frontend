import { z } from "zod";

export const transactionSchema = z.object({
    amount: z
        .number({
            invalid_type_error: "Obrigatório",
        })
        .positive("Valor deve ser positivo"),
    transactionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data inválida",
    }),
    description: z.string().optional(),
    transactionType: z.enum(["INCOME", "EXPENSE"]),
    currency: z.enum(["BRL", "USD"]),
    recurrenceType: z.enum(["FIXED", "VARIABLE"]),
    fixedRecurrencePeriodType: z
        .enum([
            "DAILY",
            "WEEKLY",
            "BIWEEKLY",
            "MONTHLY",
            "BIMONTHLY",
            "QUARTERLY",
            "SEMIANNUALLY",
            "ANNUALLY",
        ])
        .optional(),
    recurrenceDayOfMonth: z.number().int().min(1).max(31).optional(),
    recurrenceEndDate: z
        .string()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Data inválida",
        })
        .optional(),
    categoryId: z
        .number({
            invalid_type_error: "Categoria obrigatória",
        })
        .int()
        .positive("Categoria obrigatória"),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
