import { DashboardCard } from "@/components/molecules/DashboardCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { SkeletonCard } from "../atoms/SkeletonCard";
import { useTranslation } from "react-i18next";

export default function DashboardTotalExpenseCard() {
    const { data, loading, error } = useDashboardData();
    const { t } = useTranslation();

    const variation = data?.balance?.variationPercentage ?? 0;
    const variationFormatted = `${variation >= 0 ? "+" : ""}${variation.toFixed(
        2
    )}%`;

    const footer = data
        ? t("dashboard.cards.totalBalance.footer", {
              variation: variationFormatted,
          })
        : undefined;

    return (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            {loading ? (
                <>
                    <SkeletonCard />
                    {error && (
                        <p className="mt-2 text-sm text-center text-red-500">
                            {t("dashboard.error.loadFailed")}
                        </p>
                    )}
                </>
            ) : error || !data ? (
                <p className="text-sm text-red-500 text-center">
                    {t("dashboard.error.dataUnavailable")}
                </p>
            ) : (
                <DashboardCard
                    title={t("dashboard.cards.totalExpense.title")}
                    description={t("dashboard.cards.totalExpense.description")}
                    value={data.expense.currentMonthTotal}
                    footer={footer}
                    isLoading={false}
                />
            )}
        </div>
    );
}
