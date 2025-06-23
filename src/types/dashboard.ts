type BalanceData = {
    currentBalance: number;
    previousBalance: number;
    variationPercentage: number;
};

type ExpenseData = {
    currentMonthTotal: number;
    previousMonthTotal: number;
    variationPercentage: number;
};

type CategoryData = {
    topCategory: {
        name: string;
        total: number;
    };
    previousTopValue: number;
    variationPercentage: number;
};

type ChartData = {
    date: string;
    expense: number;
    income: number;
    total: number;
};

export type DashboardData = {
    balance: BalanceData;
    expense: ExpenseData;
    category: CategoryData;
    chart: ChartData[];
};
