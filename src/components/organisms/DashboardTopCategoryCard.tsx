import { useDashboardData } from "@/hooks/useDashboardData";
import { SkeletonCard } from "../atoms/SkeletonCard";
import { TopCategoryCard } from "../molecules/DashboardTopCard";
import { useTranslation } from "react-i18next";

export default function DashboardTopCategoryCard() {
    const { data, loading, error } = useDashboardData();
    const { t } = useTranslation();

    const topCategory = data?.category?.topCategory;

    const hasTopCategory = topCategory !== undefined && topCategory !== null;

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
                            Não foi possível carregar os dados. Por favor, tente
                            novamente.
                        </p>
                    )}
                </>
            ) : error || !data ? (
                <p className="text-sm text-red-500 text-center">
                    Não foi possível carregar os dados do painel.
                </p>
            ) : hasTopCategory ? (
                <TopCategoryCard
                    isLoading={loading}
                    title={t("dashboard.cards.topCategory.title")}
                    description={t("dashboard.cards.topCategory.description")}
                    categoryName={t(
                        `category.${topCategory.name.toLowerCase()}`
                    )}
                    totalAmount={topCategory.total}
                    footer={footer}
                />
            ) : (
                <TopCategoryCard
                    isLoading={false}
                    title={t("dashboard.cards.topCategory.title")}
                    description={t("dashboard.cards.topCategory.description")}
                    categoryName="--"
                    totalAmount={0}
                    footer="--"
                />
            )}
        </div>
    );
}
