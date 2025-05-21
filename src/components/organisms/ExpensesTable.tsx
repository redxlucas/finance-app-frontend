import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ExpenseResponse } from "@/types/expense";

export function ExpensesTable({
    expenses,
    loading,
}: {
    expenses: ExpenseResponse[];
    loading: boolean;
}) {
    if (loading) {
        return <p>Carregando despesas...</p>;
    }

    if (expenses.length === 0) {
        return <p>Nenhuma despesa encontrada.</p>;
    }

    return (
        <div className="w-full overflow-x-auto mt-4 bg-secondary border-1 border-border rounded">
            <Table className="w-full min-w-[600px]">
                <TableHeader>
                    <TableRow className="border-border">
                        <TableHead>Valor (R$)</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow
                            key={expense.id}
                            className="hover:bg-border border-border"
                        >
                            <TableCell>{expense.amount.toFixed(2)}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>
                                {expense.category?.name ?? "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
