import api from './api';
import { ExpenseRequest, ExpenseResponse } from '@/types/expense'

export const ExpenseService = {
    async create(data: ExpenseRequest): Promise<ExpenseResponse> {
        const response = await api.post('/expenses', data);
        return response.data;
    },

    async getAll(): Promise<ExpenseResponse[]> {
        const response = await api.get('/expenses/all');
        return response.data;
    },
}
