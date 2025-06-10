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
import Form from "@/components/atoms/Form";
import { expenseSchema, ExpenseInput } from "@/schemas/expenseSchema";
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ExpenseType } from "@/types/expense";

type Props = {
    onAdd: (data: ExpenseInput) => Promise<void>;
};

const categories = [
    { id: 1, name: "Streaming" },
    { id: 2, name: "Alimentação" },
    { id: 3, name: "Transporte" },
];

export default function ExpenseForm({ onAdd }: Props) {
    const form = useForm<ExpenseInput>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            amount: 0,
            description: "",
            type: "VARIABLE",
            categoryId: 0,
        },
    });

    async function handleSubmit(data: ExpenseInput) {
        const dataToSend = {
            ...data,
            categoryId: Number(data.categoryId),
        };

        try {
            await onAdd(dataToSend);
            alert("Gasto cadastrado com sucesso!");
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ShadForm {...form}>
            <Form
                onSubmit={form.handleSubmit(handleSubmit)}
                title=""
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Descrição"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Valor"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Despesa</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value: string) =>
                                        field.onChange(value as ExpenseType)
                                    }
                                    value={field.value ?? ""}
                                >
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="VARIABLE">
                                            Variável
                                        </SelectItem>
                                        <SelectItem value="FIXED">
                                            Fixa
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value?.toString() ?? ""}
                                >
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </ShadForm>
    );
}
