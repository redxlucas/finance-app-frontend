import { Category } from "./category";

export type ExpenseType = "VARIABLE" | "FIXED";

export interface ExpenseRequest {
    amount: number;
    // createdAt: string;
    description: string;
    type: ExpenseType
    categoryId: number;
}

export interface ExpenseResponse {
    id: number;
    amount: number;
    createdAt: string;
    type: ExpenseType;
    description: string;
    category: Category | null;
}

export interface Income {
    id: number;
    amount: number;
    recurrence: string;
    category: string;
    description: string;
}