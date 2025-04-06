import React, { useState } from 'react';
import { Expense } from '../types/Expense';

export default function ExpenseForm() {
    const[form, setForm] = useState<Expense>({
        amount: 0,
        date: '',
        description: '',
        category: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const{ name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value,
        }));
    }

    return (
        <form>
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
                name="date"
                type="datetime-local"
                value={form.date}
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
            />

            <button type="submit">Cadastrar</button>
        </form>
    );
}