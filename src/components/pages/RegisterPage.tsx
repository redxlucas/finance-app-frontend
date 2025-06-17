import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Turtle } from "lucide-react";
import RegisterForm from "../organisms/RegisterForm";
import { registerUser } from "@/services/authService";
import { RegisterInput } from "@/schemas/registerSchema";
import { useState } from "react";
import { AlertDialogBox } from "../organisms/AlertDialogBox";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import i18n from "@/lib/i18n";
import { ModeToggle } from "../atoms/ModeToggle";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useTranslation();

    async function handleRegister(data: RegisterInput) {
        try {
            await registerUser(data);
            navigate("/");
        } catch (error) {
            const err = (error as Error).message;

            setErrorTitle(t(`${err}.title`));
            setErrorDescription(t(`${err}.description`));
            setOpenDialog(true);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 lg:px-16">
            <Link
                to="/login"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar
                </>
            </Link>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2">
                <ModeToggle />
                <Select
                    value={i18n.language}
                    onValueChange={(value) => i18n.changeLanguage(value)}
                >
                    <SelectTrigger
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "bg-transparent text-secondary-foreground w-[140px] h-10 text-sm"
                        )}
                    >
                        <SelectValue placeholder="Idioma" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pt">{t("languages.pt")}</SelectItem>
                        <SelectItem value="en">{t("languages.en")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mx-auto flex w-full flex-col justify-center space-y-4 my-8 sm:px-0 sm:max-w-md md:max-w-lg lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
                <div className="flex flex-col space-y-2 text-center">
                    <Turtle className="mx-auto h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t("auth.register.title")}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t("auth.register.description")}
                    </p>
                </div>
                {/* <UserRegisterForm /> */}
                <RegisterForm onAdd={handleRegister} />
                <p className="text-sm px-8 text-center text-muted-foreground">
                    <Link
                        to="/login"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        {t("auth.register.link")}
                    </Link>
                </p>
            </div>
            <AlertDialogBox
                open={openDialog}
                onOpenChange={setOpenDialog}
                title={errorTitle}
                description={errorDescription}
            />
        </div>
    );
}
