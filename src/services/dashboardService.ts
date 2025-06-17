import { BalanceData } from "@/types/dashboard";
import api from "./api";

export async function getBalanceData(): Promise<BalanceData> {
    const response = await api.get("/api/dashboard/balance");
    return response.data;
}
