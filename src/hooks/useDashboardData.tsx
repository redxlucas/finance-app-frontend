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
        async function loadData() {
            const start = Date.now();
            try {
                const result = await getData();
                setData(result);
            } catch (err) {
                const elapsed = Date.now() - start;
                const minimumDelay = 500;
                const remainingTime = Math.max(0, minimumDelay - elapsed);
                setTimeout(() => {
                    setLoading(false);
                }, remainingTime);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [updateCounter]);

    return { data, loading, error };
}
