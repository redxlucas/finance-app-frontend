export type ExpenseType = {
    id: number;
    amount: number;
    date: string;
    description: string;
    category: string;
}

export type ExpenseInput = Omit<ExpenseType, 'id' | 'date'>;