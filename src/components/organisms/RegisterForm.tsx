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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onAdd: (data: RegisterInput) => Promise<void>;
}

export default function RegisterForm({
    onAdd,
    className,
    ...props
}: UserAuthFormProps) {
    const form = useForm<RegisterFormInput>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            completeName: "",
            login: "",
            password: "",
            confirmPassword: "",
            receiveEmails: false,
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
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Seu Nome Completo"
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
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="exemplo@email.com"
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
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder="Crie uma senha segura"
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
                                                Digite sua senha novamente
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder={
                                                        "Repita a senha"
                                                    }
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
                                            Receber e-mails sobre novidades
                                        </FormLabel>
                                        <FormDescription>
                                            Fique por dentro de novos recursos e
                                            produtos e atualizações.
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
                            <Button>Criar Conta</Button>
                        </>
                    </div>
                </form>
            </ShadForm>
        </div>
    );
}
