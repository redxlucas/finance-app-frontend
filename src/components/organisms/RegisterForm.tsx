import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form as ShadForm,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginInput, loginSchema } from "@/schemas/loginSchema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
    RegisterFormInput,
    registerFormSchema,
    RegisterInput,
    registerSchema,
} from "@/schemas/registerSchema";
import { PasswordInput } from "../atoms/PasswordInput";
import { useTranslation } from "react-i18next";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onAdd: (data: RegisterInput) => Promise<void>;
}

export default function RegisterForm({
    onAdd,
    className,
    ...props
}: UserAuthFormProps) {
    const { t } = useTranslation();

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            completeName: "",
            login: "",
            password: "",
            confirmPassword: "",
            receiveEmails: false,
            languagePreference: "PTBR",
            themePreference: "DARK",
        },
    });

    async function handleSubmit(data: RegisterFormInput) {
        const dataToSend = {
            ...data,
            languagePreference: "PTBR" as const,
            themePreference: "DARK" as const,
        };

        try {
            await onAdd(dataToSend);
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
                    className="space-y-2"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="completeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("auth.register.label.completeName")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={t(
                                                "auth.register.placeholder.completeName"
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
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("auth.email")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={t(
                                                "auth.register.placeholder.email"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("auth.password")}
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder={t(
                                                        "auth.register.placeholder.password"
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t(
                                                    "auth.register.label.confirmPassword"
                                                )}
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder={t(
                                                        "auth.register.placeholder.confirmPassword"
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="receiveEmails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>
                                            {t(
                                                "auth.register.label.receiveEmail"
                                            )}
                                        </FormLabel>
                                        <FormDescription>
                                            {t(
                                                "auth.register.placeholder.receiveEmail"
                                            )}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                            className="cursor-pointer"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <>
                            <Button>{t("auth.register.submit")}</Button>
                        </>
                    </div>
                </form>
            </ShadForm>
        </div>
    );
}
