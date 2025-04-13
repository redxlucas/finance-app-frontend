import React, { useState } from 'react';
import Form from '../custom-ui/Form'
import { ExpenseInput } from '@/types/transactions';
import Input from '../custom-ui/Input';

type Props = {
    onAdd: (data: ExpenseInput) => Promise<void>;
  };

export default function ExpenseForm({ onAdd }: Props) {
    const[form, setForm] = useState<ExpenseInput>({
        amount: 0,
        description: '',
        category: ''
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
        <Form title="Cadastrar Despesa" onSubmit={handleSubmit} submitLabel="Cadastrar">
            <h2>Cadastrar Despesas</h2>

            <Input 
                name="amount" 
                type="number" 
                placeholder="Valor" 
                value={form.amount} 
                onChange={handleChange} 
                required 
            />

            <Input
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
            />

            <Input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
            />
        </Form>
    );
}
