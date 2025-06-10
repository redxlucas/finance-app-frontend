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

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, token } = useAuth();
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(data: LoginInput) {
        try {
            const token = await loginUser(data);
            login(token);
            navigate("/");
        } catch (err) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "Usuário ou senha inválidos. Por favor, tente novamente.";
            setErrorMessage(msg);
            setOpenError(true);
        }
    }

    const handleBack = () => {
        if (token && token !== "null") {
            navigate("/");
        } else {
            setOpenError(true);
            setErrorMessage(
                "É necessário se autenticar para acessar o sistema"
            );
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
            <AlertDialogBox
                open={openError}
                onOpenChange={setOpenError}
                title={"Acesso negado"}
                description={errorMessage}
            />
            <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:px-0 sm:max-w-md md:max-w-lg lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
                <div className="flex flex-col space-y-2 text-center">
                    <Turtle className="mx-auto h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Insira seu email e senha para entrar no Jabuti
                    </p>
                </div>
                {/* <UserAuthForm /> */}
                <LoginForm onAdd={handleLogin} />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        to="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Não possui uma conta? Registre-se aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}
