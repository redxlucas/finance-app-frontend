import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from './components/ExpenseList';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const { expenses, addExpense, loading } = useExpenses();

  return (
    <>
      <div>
        <h1>Jabuti - Suas Finanças</h1>
        <ExpenseForm onAdd={addExpense}/>
        <hr />
        {loading ? <p>Carregando gastos...</p> : <ExpenseList expenses={expenses} />}
      </div>
    </>
  )
}

export default App
