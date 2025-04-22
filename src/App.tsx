import { Route, Routes } from "react-router-dom";
import ExpensesPage from "./components/pages/Expenses";
import IncomesPage from "@/components/pages/Incomes"
import Dashboard from "./components/pages/Dashboard";
import Layout from "./components/atoms/Layout";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}/>
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="incomes" element={<IncomesPage />} />
        </Route>  
      </Routes>
    </>
  )
}

export default App
