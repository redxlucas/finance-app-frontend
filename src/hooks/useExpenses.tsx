import { useEffect, useState } from 'react';
import { Expense } from '../types/Expense';
import api from '../services/api'

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/expenses/all')
            .then((response) => setExpenses(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const addExpense = async (form: Omit<Expense, 'id' | 'date'>) => {
        const response = await api.post('/expenses', form);
        setExpenses((prev) => [...prev, response.data]);
      };

    return { expenses, addExpense, loading }
}