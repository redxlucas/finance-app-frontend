import { useExpenses } from "@/hooks/useExpenses";
import { ExpensesTable } from "../organisms/ExpensesTable";

export default function ExpensesPage() {
    const { expenses, loading } = useExpenses();

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                Transações
            </h1>

            <ExpensesTable expenses={expenses} loading={loading} />
        </div>
    );
}
