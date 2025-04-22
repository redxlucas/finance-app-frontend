import { Modal } from "@/components/organisms/Modal";
import { Button } from "@/components/ui/button";
import { useIncomes } from "@/hooks/useIncomes";
import IncomeForm from "../organisms/IncomeForm";

export default function IncomesPage() {
    const { incomes, addIncome, loading } = useIncomes();

    return (
        <div>
          <h1>Ganhos</h1>
    
          <Modal
            trigger={<Button>Novo Gasto</Button>}
            title="Novo Ganho"
            description="Cadastre um novo ganho no sistema"
          >
            <IncomeForm onAdd={addIncome} />
          </Modal>

          {loading ? (
            <p>Carregando ganhos...</p>
          ) : (
            <ul>
              {incomes.map((income) => (
                <li key={income.id}>
                  R$ {income.amount} | {income.description} | ({income.category})
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}