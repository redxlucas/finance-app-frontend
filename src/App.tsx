import { Route, Routes } from "react-router-dom";
import ExpensesPage from "./components/pages/Expenses";
import IncomesPage from "@/components/pages/Incomes";
import Dashboard from "./components/pages/Dashboard";
import Layout from "./components/atoms/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import { PrivateRoute } from "./components/atoms/PrivateRoute";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
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
