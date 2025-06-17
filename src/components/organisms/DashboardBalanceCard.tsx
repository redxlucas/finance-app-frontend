import { DashboardCard } from "@/components/molecules/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardBalanceCard() {
    const { data, loading, error } = useDashboardData();

    if (error || !data) return <p>Failed to load dashboard data.</p>;

    return (
        <DashboardCard
            title="Saldo Atual"
            description="Mês de Junho"
            value={data.currentBalance}
            footer={
                data
                    ? `${
                          data.variationPercentage >= 0 ? "+" : ""
                      }${data.variationPercentage.toFixed(
                          2
                      )}% em relação ao mês anterior`
                    : undefined
            }
            isLoading={loading}
        />
    );
}
