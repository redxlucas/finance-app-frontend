import { DashboardData } from "@/types/dashboard";
import api from "./api";

export async function getData(): Promise<DashboardData> {
    const response = await api.get("/api/dashboard");
    return response.data;
}
