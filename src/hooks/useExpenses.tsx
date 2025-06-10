import { useEffect, useState } from "react";
import { ExpenseRequest, ExpenseResponse } from "@/types/expense";
import { ExpenseService } from "@/services/expenseService";
export function useExpenses() {
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ExpenseService.getAll()
            .then(setExpenses)
            .catch((err) => {
                console.error(err);
                setError("Erro ao buscar despesas");
            })
            .finally(() => setLoading(false));
    }, []);

    const addExpense = async (form: ExpenseRequest) => {
        try {
            const newExpense = await ExpenseService.create(form);
            setExpenses((prev) => [...prev, newExpense]);
        } catch (err) {
            console.error(err);
            setError("Erro ao adicionar despesa.");
        }
    };

    return { expenses, addExpense, loading, error };
}
