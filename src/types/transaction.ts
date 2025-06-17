// export type Transaction = {
//     id: number;
//     amount: number;
//     createdAt: string;
//     transactionDate: string;
//     description?: string;
//     transactionType: "INCOME" | "EXPENSE";
//     currency: "BRL" | "USD";
//     recurrenceType: "FIXED" | "VARIABLE";
//     fixedRecurrencePeriodType?:
//         | "DAILY"
//         | "WEEKLY"
//         | "BIWEEKLY"
//         | "MONTHLY"
//         | "BIMONTHLY"
//         | "QUARTERLY"
//         | "SEMIANNUALLY"
//         | "ANNUALLY";
//     recurrenceDayOfMonth?: number;
//     recurrenceEndDate?: string;

//     category: {
//         id: number;
//         name: string;
//     };
// };

export type TransactionRequest = {
    amount: number;
    transactionDate: string; // ISO string
    description?: string;
    transactionType: "INCOME" | "EXPENSE";
    currency: "BRL" | "USD";
    recurrenceType: "FIXED" | "VARIABLE";
    fixedRecurrencePeriodType?:
        | "DAILY"
        | "WEEKLY"
        | "BIWEEKLY"
        | "MONTHLY"
        | "BIMONTHLY"
        | "QUARTERLY"
        | "SEMIANNUALLY"
        | "ANNUALLY";
    recurrenceDayOfMonth?: number;
    recurrenceEndDate?: string;
    categoryId: number;
};

export type TransactionResponse = {
    id: number;
    amount: number;
    createdAt: string;
    transactionDate: string;
    description?: string;
    transactionType: "INCOME" | "EXPENSE";
    currency: "BRL" | "USD";
    recurrenceType: "FIXED" | "VARIABLE";
    fixedRecurrencePeriodType?:
        | "DAILY"
        | "WEEKLY"
        | "BIWEEKLY"
        | "MONTHLY"
        | "BIMONTHLY"
        | "QUARTERLY"
        | "SEMIANNUALLY"
        | "ANNUALLY";
    recurrenceDayOfMonth?: number;
    recurrenceEndDate?: string;
    category: {
        id: number;
        name: string;
    };
};
