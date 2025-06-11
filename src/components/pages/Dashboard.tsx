import { useAuth } from "@/contexts/AuthContext";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                Visão Geral
            </h1>
            <h2>{t("welcomeMessage", { user: user?.name.split(" ")[0] })}</h2>
        </div>
    );
}
