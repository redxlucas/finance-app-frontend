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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onAdd: (data: LoginInput) => Promise<void>;
}

export default function LoginForm({
    onAdd,
    className,
    ...props
}: UserAuthFormProps) {
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
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="E-mail"
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
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            type="password"
                                            placeholder="Senha"
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
