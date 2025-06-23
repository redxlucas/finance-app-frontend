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
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategoriesByType } from "@/services/categoryService";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useTransactionsUpdate } from "@/contexts/TransactionUpdateContext";

type Props = {
    onAdd: (data: TransactionInput) => Promise<void>;
    onClose: () => void;
    type: TransactionInput["transactionType"];
};

function formatDateToLocalISO(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function parseDateFromYMD(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export default function TransactionForm({ onAdd, onClose, type }: Props) {
    const { t } = useTranslation();
    const { triggerUpdate } = useTransactionsUpdate();
    const [categories, setCategories] = useState<Category[]>([]);

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

    useEffect(() => {
        form.reset({
            ...form.getValues(),
            transactionType: type,
        });
    }, [type]);

    useEffect(() => {
        getCategoriesByType(type)
            .then(setCategories)
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error);
            });
    }, [type]);

    async function handleSubmit(data: TransactionInput) {
        try {
            await onAdd(data);
            triggerUpdate();
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
                className="space-y-4"
                submitLabel={t("transaction.form.submit")}
            >
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t("transaction.form.amount")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    value={
                                        field.value === undefined
                                            ? 0
                                            : field.value
                                    }
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "") {
                                            field.onChange(0);
                                        } else {
                                            const num = Number(val);
                                            field.onChange(
                                                isNaN(num) ? 0 : num
                                            );
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t("transaction.form.description")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={t(
                                        "transaction.form.description"
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
                    name="transactionDate"
                    render={({ field }) => {
                        const selectedDate = field.value
                            ? parseDateFromYMD(field.value)
                            : undefined;

                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel>
                                    {t("transaction.form.transactionDate")}
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className={`w-full justify-start text-left font-normal ${
                                                !field.value
                                                    ? "text-muted-foreground"
                                                    : ""
                                            }`}
                                        >
                                            {field.value
                                                ? selectedDate?.toLocaleDateString(
                                                      "pt-BR",
                                                      {
                                                          day: "2-digit",
                                                          month: "2-digit",
                                                          year: "numeric",
                                                      }
                                                  )
                                                : t(
                                                      "transaction.form.transactionDate"
                                                  )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 z-50 pointer-events-auto"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(
                                                        formatDateToLocalISO(
                                                            date
                                                        )
                                                    );
                                                }
                                            }}
                                            disabled={(date) =>
                                                date > new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t("transaction.form.category")}
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                    value={field.value?.toString() ?? ""}
                                >
                                    <SelectTrigger className="text-white">
                                        <SelectValue
                                            placeholder={t(
                                                "transaction.form.category"
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {t(
                                                    `category.${category.name
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "_")}`
                                                )}
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
