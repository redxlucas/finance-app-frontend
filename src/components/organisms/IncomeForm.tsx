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
import { Income } from "@/types/transactions";
import Form from "../atoms/Form";

type Props = {
  onAdd: (data: Income) => Promise<void>;
};

export default function IncomeForm({ onAdd }: Props) {
  const form = useForm<Income>({
    defaultValues: {
      amount: 0,
      recurrence: "",
      description: "",
      category: "",
    },
  });

  async function handleSubmit(data: Income) {
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
          rules={{
            required: "O valor é obrigatório.",
            min: {
              value: 0.01,
              message: "O valor deve ser maior que zero."
            }
          }}
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
          rules={{ required: true}}
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
          rules={{ required: "Este campo é obrigatório" }}
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
          rules={{ required: "Este campo é obrigatório" }}
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
