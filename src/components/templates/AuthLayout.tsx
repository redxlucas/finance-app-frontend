import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import i18n from "@/lib/i18n";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 relative">
            <Button
                onClick={handleBack}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8 bg-transparent text-secondary-foreground"
                )}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
            </Button>

            {/* Seletor de idioma fixo no canto superior direito */}
            <Select
                value={i18n.language}
                onValueChange={(value) => i18n.changeLanguage(value)}
            >
                <SelectTrigger
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "bg-transparent text-secondary-foreground w-[140px] h-10"
                    )}
                >
                    <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pt">{t("languages.pt")}</SelectItem>
                    <SelectItem value="en">{t("languages.en")}</SelectItem>
                </SelectContent>
            </Select>

            <main className="w-full max-w-md md:max-w-lg lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mt-20">
                {children}
            </main>
        </div>
    );
}
