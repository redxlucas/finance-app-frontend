import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/organisms/UserAuthForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChevronLeft, Turtle } from "lucide-react";
import LoginForm from "../organisms/LoginForm";
import { LoginInput } from "@/schemas/loginSchema";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(data: LoginInput) {
        try {
            const token = await loginUser(data);
            login(token);
            navigate("/");
        } catch (err) {
            alert((err as Error).message);
        }
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
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
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
