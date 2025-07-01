import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { ChartAreaInteractive } from "../organisms/AreaChart";
import DashboardBalanceCard from "../organisms/DashboardBalanceCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingPage } from "./LoadingPage";
import DashboardTotalExpenseCard from "../organisms/DashboardTotalExpenseCard";
import DashboardTopCategoryCard from "../organisms/DashboardTopCategoryCard";

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { data, loading } = useDashboardData();

    const noTransaction = data?.chart?.length === 0;

    return (
        <LoadingPage loading={loading}>
            <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
                <h1 className="text-2xl mb-4 font-bold text-foreground">
                    {t("dashboard.title")}
                </h1>
                <h2 className="mb-6">
                    {t("dashboard.description", {
                        user: user?.name.split(" ")[0],
                    })}
                </h2>
                {noTransaction ? (
                    <div className="text-muted-foreground mb-6">
                        {t("dashboard.noTransaction")}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <DashboardBalanceCard />
                            <DashboardTotalExpenseCard />
                            <DashboardTopCategoryCard />
                        </div>

                        <div className="mb-6">
                            <ChartAreaInteractive />
                        </div>
                    </>
                )}
            </div>
        </LoadingPage>
    );
}
