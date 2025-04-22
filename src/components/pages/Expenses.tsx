import { useExpenses } from "@/hooks/useExpenses";
import ExpenseForm from '@/components/organisms/ExpenseForm';
import { Modal } from "@/components/organisms/Modal";
import { Button } from "@/components/ui/button";

export default function ExpensesPage() {
    const { expenses, addExpense, loading } = useExpenses();

    return (
        <div>
          <h1>Despesas</h1>
    
          <Modal
            trigger={<Button>Nova Despesa</Button>}
            title="Nova Despesa"
            description="Cadastre uma nova despesa no sistema"
          >
            <ExpenseForm onAdd={addExpense} />
          </Modal>
    
          {loading ? (
            <p>Carregando despesas...</p>
          ) : (
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  R$ {expense.amount} | {expense.description} | ({expense.category})
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}