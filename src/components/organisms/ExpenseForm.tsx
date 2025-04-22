import { useForm } from "react-hook-form";
import {
  Form as ShadForm,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Expense } from "@/types/transactions";
import Form from "@/components/atoms/Form";

type Props = {
  onAdd: (data: Expense) => Promise<void>;
};

export default function ExpenseForm({ onAdd }: Props) {
  const form = useForm<Expense>({
    defaultValues: {
      amount: 0,
      description: "",
      category: "",
    },
  });

  async function handleSubmit(data: Expense) {
    try {
      await onAdd(data);
      alert("Gasto cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ShadForm {...form}>
        <Form onSubmit={form.handleSubmit(handleSubmit)} title="Cadastrar" className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Valor" {...field} />
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
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </ShadForm>
  );
}
