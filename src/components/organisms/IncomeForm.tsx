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
import Form from "../atoms/Form";
import { incomeSchema, IncomeInput } from "@/schemas/incomeSchema";

type Props = {
  onAdd: (data: IncomeInput) => Promise<void>;
};

export default function IncomeForm({ onAdd }: Props) {
  const form = useForm<IncomeInput>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: 0,
      recurrence: "",
      description: "",
      category: "",
    },
  });

  async function handleSubmit(data: IncomeInput) {
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
          name="recurrence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recorrência de Ganho</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Recorrência" {...field} />
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
