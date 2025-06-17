import { useTranslation } from "react-i18next";
import { TransactionsTable } from "../organisms/TransactionsTable";

export default function TransactionsPage() {
    const { t } = useTranslation();
    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                {t("transaction.title")}
            </h1>

            <TransactionsTable initialPageSize={10} />
        </div>
    );
}
