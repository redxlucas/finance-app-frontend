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
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onAdd: (data: LoginInput) => Promise<void>;
}

export default function LoginForm({
    onAdd,
    className,
    ...props
}: UserAuthFormProps) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });

    async function handleSubmit(data: LoginInput) {
        setIsLoading(true);
        const dataToSend = {
            ...data,
        };

        try {
            await onAdd(dataToSend);
            form.reset();
        } catch (error) {
        } finally {
            setIsLoading(false);
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
                        <Button disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin mr-2 h-5 w-5 text-white inline"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                </>
                            ) : (
                                t("auth.login.submit")
                            )}
                        </Button>
                    </div>
                </form>
            </ShadForm>
        </div>
    );
}
