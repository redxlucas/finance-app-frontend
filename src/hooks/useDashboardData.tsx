import { useEffect, useState } from "react";
import { getData } from "@/services/dashboardService";
import { DashboardData } from "@/types/dashboard";
import { useTransactionsUpdate } from "@/contexts/TransactionUpdateContext";

export function useDashboardData() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { updateCounter } = useTransactionsUpdate();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        async function loadData() {
            try {
                const result = await getData();
                setData(result);
                timer = setTimeout(() => {
                    setLoading(false);
                }, 5000);
            } catch (err) {
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        loadData();
        return () => clearTimeout(timer);
    }, [updateCounter]);

    return { data, loading, error };
}
