import { DashboardCard } from "@/components/molecules/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { SkeletonCard } from "../atoms/SkeletonCard";

export default function DashboardBalanceCard() {
    const { data, loading, error } = useDashboardData();

    if (error || !data) return <p>Failed to load dashboard data.</p>;

    return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            {loading ? (
                <SkeletonCard />
            ) : (
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
                    isLoading={false}
                />
            )}
        </div>
    );
}
