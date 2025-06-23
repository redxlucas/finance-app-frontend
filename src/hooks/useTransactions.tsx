import { useEffect, useState } from "react";
import { TransactionService } from "@/services/transactionService";
import { TransactionRequest, TransactionResponse } from "@/types/transaction";
import { useTransactionsUpdate } from "@/contexts/TransactionUpdateContext";
export function useTransactions() {
    const [transaction, setTransactions] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { triggerUpdate } = useTransactionsUpdate();
    const { updateCounter } = useTransactionsUpdate();

    useEffect(() => {
        TransactionService.getAll()
            .then((result) => setTransactions(result.content))
            .catch((err) => {
                setError("Erro ao buscar despesas");
            })
            .finally(() => setLoading(false));
    }, [updateCounter]);

    const addTransaction = async (form: TransactionRequest) => {
        try {
            const newTransaction = await TransactionService.create(form);
            setTransactions((prev) => [...prev, newTransaction]);
            triggerUpdate();
        } catch (err) {
            setError("Erro ao adicionar despesa.");
        }
    };

    return { transaction, addTransaction, loading, error };
}
