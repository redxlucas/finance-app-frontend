import { useEffect, useState } from "react";
import { getBalanceData } from "@/services/dashboardService";
import { BalanceData } from "@/types/dashboard";

export function useDashboardData() {
    const [data, setData] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await getBalanceData();
                setData(result);
            } catch (err) {
                setError("Failed to load dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { data, loading, error };
}
