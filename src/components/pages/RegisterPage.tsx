import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Turtle } from "lucide-react";
import RegisterForm from "../organisms/RegisterForm";
import { registerUser } from "@/services/authService";
import { RegisterInput } from "@/schemas/registerSchema";
import { useState } from "react";
import { AlertDialogBox } from "../organisms/AlertDialogBox";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    async function handleRegister(data: RegisterInput) {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error) {
            setErrorMessage((error as Error).message);
            setOpenDialog(true);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 lg:px-16">
            <Link
                to="/"
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
            <div className="mx-auto flex w-full flex-col justify-center space-y-4 my-8 sm:px-0 sm:max-w-md md:max-w-lg lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
                <div className="flex flex-col space-y-2 text-center">
                    <Turtle className="mx-auto h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {" "}
                        Cadastre-se aqui
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Cadastre-se para acessar o Jabuti
                    </p>
                </div>
                {/* <UserRegisterForm /> */}
                <RegisterForm onAdd={handleRegister} />
                <p className="text-sm px-8 text-center text-muted-foreground">
                    <Link
                        to="/login"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Já possui uma conta? Entre aqui
                    </Link>
                </p>
            </div>
            <AlertDialogBox
                open={openDialog}
                onOpenChange={setOpenDialog}
                title="Erro ao se registrar"
                description={errorMessage}
            />
        </div>
    );
}
