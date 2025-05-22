import { useExpenses } from "@/hooks/useExpenses";
import ExpenseForm from "@/components/organisms/ExpenseForm";
import { Modal } from "@/components/organisms/Modal";
import { Button } from "@/components/ui/button";
import { ExpensesTable } from "../organisms/ExpensesTable";

export default function ExpensesPage() {
    const { expenses, addExpense, loading } = useExpenses();

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                Despesas
            </h1>

            <Modal
                trigger={<Button>Nova Transação</Button>}
                title="Nova Transação"
                description="Cadastrar uma nova transação"
            >
                <ExpenseForm onAdd={addExpense} />
            </Modal>

            <ExpensesTable expenses={expenses} loading={loading} />
        </div>
    );
}
