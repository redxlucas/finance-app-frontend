import { useEffect, useState } from "react";
import { Income } from "../types/expense";
import api from "../services/api";

export function useIncomes() {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/incomes/all")
            .then((response) => setIncomes(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const addIncome = async (form: Omit<Income, "id">) => {
        const response = await api.post("/incomes", form);
        setIncomes((prev) => [...prev, response.data]);
    };

    return { incomes, addIncome, loading };
}
