import React, { useState } from 'react';
import { Expense } from '../types/Expense';

type Props = {
    onAdd: (expense: Omit<Expense, 'id' | 'date'>) => Promise<void>;
  };

export default function ExpenseForm({ onAdd }: Props) {
    const[form, setForm] = useState<Expense>({
        amount: 0,
        description: '',
        category: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const{ name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'amount' 
                ? value === '' ? 0 : parseFloat(value) 
                : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await onAdd(form);
            alert("Gasto cadastrado com sucesso!")
            setForm({
                amount: 0,
                description: '',
                category: '',
            });
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Despesas</h2>

            <input 
                name="amount" 
                type="number" 
                placeholder="Valor" 
                value={form.amount} 
                onChange={handleChange} 
                required 
            />

            <input
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
            />

            <input  
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
            />

            <button type="submit">Cadastrar</button>
        </form>
    );
}
