import { Expense } from '../types/Expense';

interface Props {
    expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {

    return (
        <div>
            <h2>Gastos Cadastrados</h2>
            {expenses.length === 0 ? (
                <p>Nenhuma despesa cadastrada</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Gastos</th>
                            <th>Data</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.amount.toFixed(2)}</td>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}