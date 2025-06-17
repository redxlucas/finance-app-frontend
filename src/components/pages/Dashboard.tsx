import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { ChartAreaInteractive } from "../organisms/AreaChart";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import DashboardBalanceCard from "../organisms/DashboardBalanceCard";
import DashboardTotalExpenseCard from "../organisms/DashboardTotalExpenseCard";

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                Visão Geral
            </h1>
            <h2 className="mb-6">
                {t("welcomeMessage", { user: user?.name.split(" ")[0] })}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <DashboardBalanceCard />
                <DashboardTotalExpenseCard />
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Total de Despesas</CardTitle>
                        <CardDescription>Mês de Junho</CardDescription>
                    </CardHeader>
                    <CardContent className="text-primary text-2xl font-semibold">
                        R$ 1347,22
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                        <span>
                            <span className="text-primary">+ 19,88%</span> em
                            relação ao mês anterior
                        </span>
                    </CardFooter>
                </Card> */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Maior Despesa por Categoria
                        </CardTitle>
                        <CardDescription>Mês de Junho</CardDescription>
                    </CardHeader>
                    <CardContent className="text-lg flex justify-between">
                        <span className="font-light">Alimentação</span>
                        <span className="text-primary font-semibold">
                            R$ 890,00
                        </span>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                        <span>
                            {" "}
                            <span className="text-red-300">- 56,21%</span> em
                            relação ao mês anterior
                        </span>
                    </CardFooter>
                </Card>
            </div>

            <div className="mb-6">
                <ChartAreaInteractive />
            </div>
        </div>
    );
}
