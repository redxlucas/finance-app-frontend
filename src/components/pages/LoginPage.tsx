import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Turtle } from "lucide-react";
import LoginForm from "../organisms/LoginForm";
import { LoginInput } from "@/schemas/loginSchema";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AlertDialogBox } from "../organisms/AlertDialogBox";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"; // ajuste o caminho conforme seu projeto
import i18n from "@/lib/i18n";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, token } = useAuth();
    const [openError, setOpenError] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const { t } = useTranslation();

    async function handleLogin(data: LoginInput) {
        try {
            const token = await loginUser(data);
            login(token);
            navigate("/");
        } catch (err) {
            const titleKey =
                err instanceof Error
                    ? err.message
                    : "auth.error.unexpected.title";
            const descriptionKey =
                err instanceof Error && (err as any).description
                    ? (err as any).description
                    : "auth.error.unexpected.description";

            setErrorTitle(t(titleKey));
            setErrorDescription(t(descriptionKey));
            setOpenError(true);
        }
    }

    const handleBack = () => {
        if (token && token !== "null") {
            navigate("/");
        } else {
            setOpenError(true);
            setErrorTitle(t("auth.error.loginRequired.title"));
            setErrorDescription(t("auth.error.loginRequired.description"));
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 lg:px-16">
            <Button
                onClick={handleBack}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8 bg-transparent text-secondary-foreground"
                )}
            >
                <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar
                </>
            </Button>
            <Select
                value={i18n.language}
                onValueChange={(value) => i18n.changeLanguage(value)}
            >
                <SelectTrigger
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8 bg-transparent text-secondary-foreground w-[140px] h-10 text-sm"
                    )}
                >
                    <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pt">{t("languages.pt")}</SelectItem>
                    <SelectItem value="en">{t("languages.en")}</SelectItem>
                </SelectContent>
            </Select>
            <AlertDialogBox
                open={openError}
                onOpenChange={setOpenError}
                title={errorTitle}
                description={errorDescription}
            />
            <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:px-0 sm:max-w-md md:max-w-lg lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
                <div className="flex flex-col space-y-2 text-center">
                    <Turtle className="mx-auto h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t("auth.login.title")}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t("auth.login.description")}
                    </p>
                </div>
                <LoginForm onAdd={handleLogin} />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        to="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        {t("auth.login.link")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
