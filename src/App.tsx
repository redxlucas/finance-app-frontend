import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Layout from "./components/atoms/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import { PrivateRoute } from "./components/atoms/PrivateRoute";
import SettingsPage from "./components/pages/SettingsPage";
import TransactionsPage from "./components/pages/TransactionsPage";

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
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="goals" element={<></>} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
