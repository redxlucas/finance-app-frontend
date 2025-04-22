export type Expense = {
    id: number;
    amount: number;
    date: string;
    description: string;
    category: string;
}

export interface Income {
    id: number;
    amount: number;
    recurrence: string;
    category: string;
    description: string;
}