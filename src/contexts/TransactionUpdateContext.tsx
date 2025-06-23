import { createContext, useContext, useState } from "react";

const TransactionUpdateContext = createContext({
    updateCounter: 0,
    triggerUpdate: () => {},
});

export function TransactionUpdateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [updateCounter, setUpdateCounter] = useState(0);

    function triggerUpdate() {
        setUpdateCounter((prev) => prev + 1);
    }

    return (
        <TransactionUpdateContext.Provider
            value={{ updateCounter, triggerUpdate }}
        >
            {children}
        </TransactionUpdateContext.Provider>
    );
}

export function useTransactionsUpdate() {
    return useContext(TransactionUpdateContext);
}
