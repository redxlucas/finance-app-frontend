import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    PaginationState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { TransactionResponse } from "@/types/transaction";
import { TransactionService } from "@/services/transactionService";
import { useTranslation } from "react-i18next";
import { useTransactionsUpdate } from "@/contexts/TransactionUpdateContext";

export function TransactionsTable({
    initialPageSize = 10,
}: {
    initialPageSize?: number;
}) {
    const [transactions, setTransactions] = React.useState<
        TransactionResponse[]
    >([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [typeFilter] = React.useState<string>("");
    const [totalCount, setTotalCount] = React.useState(0);
    const [deletingId, setDeletingId] = React.useState<number | null>(null);
    const { t } = useTranslation();
    const { updateCounter } = useTransactionsUpdate();

    const columns: ColumnDef<TransactionResponse>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "description",
            header: t("transaction.table.columns.description"),
            cell: ({ row }) => row.original.description,
        },
        {
            accessorKey: "recurrenceType",
            header: t("transaction.table.columns.recurrenceType"),
            cell: ({ row }) => {
                const typeKey = row.original.recurrenceType ?? "";
                return (
                    <span>
                        {t(
                            `transaction.type.recurrenceType.${typeKey.toLowerCase()}`
                        )}
                    </span>
                );
            },
        },
        {
            accessorKey: "transactionType",
            header: t("transaction.table.columns.transactionType"),
            cell: ({ row }) => {
                const typeKey = (
                    row.original.transactionType ?? ""
                ).toLowerCase();

                const bgClass = typeKey === "expense" ? "" : "";

                return (
                    <span
                        className={`
                    inline-block
                    px-2
                    py-1
                    rounded
                    
                    text-sm
                    ${bgClass}
                `}
                    >
                        {t(`transaction.type.transactionType.${typeKey}`)}
                    </span>
                );
            },
        },
        {
            accessorKey: "category.name",
            header: t("transaction.table.columns.category"),
            cell: ({ row }) =>
                t(
                    `category.${row.original.category.name
                        .toLowerCase()
                        .replace(/\s+/g, "_")}`
                ),
        },
        {
            accessorKey: "transactionDate",
            header: t("transaction.table.columns.transactionDate"),
            cell: ({ row }) => {
                const dateStr = row.original.transactionDate;
                if (!dateStr) return "-";

                const date = new Date(dateStr);
                if (isNaN(date.getTime())) return "-";

                const i18nLang = localStorage.getItem("i18nextLng") || "pt";

                const locale = i18nLang.startsWith("en") ? "en-US" : "pt-BR";

                const formatted = date.toLocaleDateString(locale, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                return formatted.replace(/\//g, "-");
            },
        },

        {
            accessorKey: "amount",
            header: () => (
                <span className="text-right">
                    {t("transaction.table.columns.amount")}
                </span>
            ),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount);

                return (
                    <span className="text-right font-medium">{formatted}</span>
                );
            },
        },
        {
            id: "actions",
            header: () => <span>{t("transaction.table.columns.actions")}</span>,
            cell: ({ row }) => {
                const transaction = row.original;

                const handleDelete = async () => {
                    if (
                        window.confirm(
                            t("transaction.delete.confirm", {
                                description: transaction.description,
                            })
                        )
                    ) {
                        try {
                            setDeletingId(transaction.id);
                            await TransactionService.delete(transaction.id);
                            setTransactions((prev) =>
                                prev.filter((t) => t.id !== transaction.id)
                            );
                        } catch (error) {
                            alert(t("transaction.delete.error"));
                        } finally {
                            setDeletingId(null);
                        }
                    }
                };

                return (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-xs"
                        disabled={deletingId === transaction.id}
                        aria-label={t("transaction.table.columns.actions")}
                    >
                        {deletingId === transaction.id ? (
                            <svg
                                className="animate-spin h-4 w-4 text-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            <Trash className="h-4 w-4" />
                        )}
                    </Button>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },

        // {
        //     accessorKey: "fixedRecurrencePeriodType",
        //     header: t("transaction.table.columns.fixedRecurrencePeriodType"),
        //     cell: ({ row }) => row.original.fixedRecurrencePeriodType ?? "-",
        // },
        // {
        //     accessorKey: "recurrenceDayOfMonth",
        //     header: t("transaction.table.columns.recurrenceDayOfMonth"),
        //     cell: ({ row }) => row.original.recurrenceDayOfMonth ?? "-",
        // },
        // {
        //     accessorKey: "recurrenceEndDate",
        //     header: t("transaction.table.columns.recurrenceEndDate"),
        //     cell: ({ row }) => row.original.recurrenceEndDate ?? "-",
        // },
    ];

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const sort = sorting.length
                ? sorting
                      .map((s) => `${s.id},${s.desc ? "desc" : "asc"}`)
                      .join(",")
                : undefined;

            const result = await TransactionService.getAll({
                page: pagination.pageIndex,
                size: pagination.pageSize,
                sort,
                recurrenceType: typeFilter || undefined,
            });

            setTransactions(result.content);
            setTotalCount(result.totalCount);
        } catch (err) {
            setError((err as Error).message);
            setTransactions([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, [pagination.pageIndex, pagination.pageSize, sorting, typeFilter]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData, updateCounter]);

    const table = useReactTable({
        data: transactions,
        columns,
        pageCount: Math.ceil(totalCount / pagination.pageSize),
        state: {
            sorting,
            pagination,
        },
        manualPagination: true,
        manualSorting: true,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) return <p>{t("transaction.table.loading")}</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (transactions.length === 0)
        return <p>{t("transaction.table.notFound")}</p>;

    return (
        <div className="w-full">
            {/* <div className="flex items-center space-x-4 py-4">
                <RadioGroup
                    value={typeFilter}
                    onValueChange={(value) => setTypeFilter(value)}
                    className="flex space-x-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="tipo-todos" />
                        <label htmlFor="tipo-todos" className="text-sm">
                            Todos
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FIXED" id="tipo-fixo" />
                        <label htmlFor="tipo-fixo" className="text-sm">
                            Fixa
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="VARIABLE" id="tipo-variavel" />
                        <label htmlFor="tipo-variavel" className="text-sm">
                            Variável
                        </label>
                    </div>
                </RadioGroup>
            </div> */}

            <div className="rounded-md border">
                <Table className="w-full min-w-[600px]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-12 text-center"
                                >
                                    {t("transaction.table.notFound")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {t("transaction.table.selectedCount", {
                        count: table.getFilteredSelectedRowModel().rows.length,
                        total: table.getFilteredRowModel().rows.length,
                    })}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t("transaction.table.pagination.previous")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t("transaction.table.pagination.next")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
