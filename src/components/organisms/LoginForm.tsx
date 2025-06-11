import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form as ShadForm,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginInput, loginSchema } from "@/schemas/loginSchema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { PasswordInput } from "../atoms/PasswordInput";
import { useTranslation } from "react-i18next";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onAdd: (data: LoginInput) => Promise<void>;
}

export default function LoginForm({
    onAdd,
    className,
    ...props
}: UserAuthFormProps) {
    const { t } = useTranslation();
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });

    async function handleSubmit(data: LoginInput) {
        const dataToSend = {
            ...data,
        };

        try {
            await onAdd(dataToSend);
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <ShadForm {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    title=""
                    className="space-y-4"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("auth.email")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={t(
                                                "auth.login.emailPlaceholder"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("auth.password")}</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            type="password"
                                            placeholder={t(
                                                "auth.login.passwordPlaceholder"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button>Entrar</Button>
                    </div>
                </form>
            </ShadForm>
        </div>
    );
}
