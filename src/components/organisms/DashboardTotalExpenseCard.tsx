import { DashboardCard } from "@/components/molecules/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { SkeletonCard } from "../atoms/SkeletonCard";

export default function DashboardBalanceCard() {
    const { data, loading, error } = useDashboardData();

    return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            {loading ? (
                <>
                    <SkeletonCard />
                    {error && (
                        <p className="mt-2 text-sm text-center text-red-500">
                            Não foi possível carregar os dados. Por favor, tente
                            novamente.
                        </p>
                    )}
                </>
            ) : error || !data ? (
                <p className="text-sm text-red-500 text-center">
                    Não foi possível carregar os dados do painel.
                </p>
            ) : (
                <DashboardCard
                    title="Total de Despesas"
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
