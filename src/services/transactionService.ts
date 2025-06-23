import { TransactionRequest, TransactionResponse } from "@/types/transaction";
import api from "./api";

export interface TransactionQueryParams {
    page?: number;
    size?: number;
    sort?: string;
    recurrenceType?: string;
    description?: string;
}

export interface TransactionApiResponse {
    content: TransactionResponse[];
    totalCount: number;
}

export const TransactionService = {
    async create(data: TransactionRequest): Promise<TransactionResponse> {
        const response = await api.post("/api/transactions", data);
        return response.data;
    },

    async getAll(
        params: TransactionQueryParams = {}
    ): Promise<TransactionApiResponse> {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined)
            queryParams.append("page", params.page.toString());
        if (params.size !== undefined)
            queryParams.append("size", params.size.toString());
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.recurrenceType)
            queryParams.append("recurrenceType", params.recurrenceType);
        if (params.description)
            queryParams.append("description", params.description);

        const response = await api.get(
            `/api/transactions/all?${queryParams.toString()}`
        );

        const data = response.data;

        return {
            content: data.content,
            totalCount: data.totalElements,
        };
    },
    async delete(id: number): Promise<void> {
        await api.delete(`/api/transactions/${id}`);
    },
};
