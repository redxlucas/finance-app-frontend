import { Route, Routes } from "react-router-dom";
import ExpensesPage from "./components/pages/Expenses";
import IncomesPage from "@/components/pages/Incomes";
import Dashboard from "./components/pages/Dashboard";
import Layout from "./components/atoms/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="expenses" element={<ExpensesPage />} />
                    <Route path="incomes" element={<IncomesPage />} />
                    <Route path="goals" element={<></>} />
                    <Route path="settings" element={<></>} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
