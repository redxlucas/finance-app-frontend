import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/custom-ui/Modal';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import { ExpenseType } from '@/types/transactions';

const App = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  // Função para adicionar uma despesa
  const handleAddExpense = async (expense: ExpenseType) => {
    try {
      setExpenses((prev) => [
        ...prev,
        { ...expense, id: Date.now(), date: new Date().toISOString() },
      ]);
      alert('Despesa cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  return (
    <div className="p-4">
      <h1>Controle Financeiro</h1>

      {/* Usando o Modal para abrir o formulário de despesas */}
      <Modal
        trigger={<Button>Cadastrar Despesa</Button>}
        title="Adicionar Despesa"
        description="Preencha os detalhes abaixo para adicionar uma nova despesa"
      >
        <ExpenseForm onAdd={handleAddExpense} />
      </Modal>

      {/* Exibindo a lista de despesas */}
      <div>
        <h2>Despesas</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - {expense.amount} - {expense.category} - {expense.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
