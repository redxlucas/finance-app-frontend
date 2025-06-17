import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    transactionSchema,
    TransactionInput,
} from "@/schemas/transactionsSchema";
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
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ExpenseType } from "@/types/expense";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getAllCategories } from "@/services/categoryService";

type Props = {
    onAdd: (data: TransactionInput) => Promise<void>;
    onClose: () => void;
    // type: TransactionInput["type"]
};

export default function TransactionForm({ onAdd, onClose }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, []);

    const form = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: 0,
            transactionDate: new Date().toISOString().slice(0, 10),
            description: "",
            transactionType: "EXPENSE",
            currency: "BRL",
            recurrenceType: "VARIABLE",
            fixedRecurrencePeriodType: undefined,
            recurrenceDayOfMonth: undefined,
            recurrenceEndDate: undefined,
            categoryId: undefined,
        },
    });

    async function handleSubmit(data: TransactionInput) {
        const dataToSend = {
            ...data,
        };

        try {
            await onAdd(dataToSend);
            alert("Gasto cadastrado com sucesso!");
            form.reset();
            onClose();
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
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="recurrenceType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Recorrência</FormLabel>
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
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                    value={field.value?.toString() ?? ""}
                                >
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(
                                            (category: Category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            )
                                        )}
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
