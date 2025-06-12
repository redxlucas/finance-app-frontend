"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    RowSelectionState,
    getPaginationRowModel,
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
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

import { ExpenseResponse } from "@/types/expense";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function ExpensesTable({
    expenses,
    loading,
}: {
    expenses: ExpenseResponse[];
    loading: boolean;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [typeFilter, setTypeFilter] = React.useState<string>("");
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
        {}
    );

    const columns: ColumnDef<ExpenseResponse>[] = [
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
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => row.original.description,
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => (
                <span>
                    {row.original.type.charAt(0).toUpperCase() +
                        row.original.type.slice(1).toLowerCase()}
                </span>
            ),
            filterFn: (row, columnId, filterValue) => {
                if (!filterValue || filterValue.length === 0) return true;
                return row.getValue(columnId) === filterValue;
            },
        },
        {
            accessorKey: "category.name",
            header: "Categoria",
            cell: ({ row }) => row.original.category?.name ?? "-",
        },
        {
            accessorKey: "date",
            header: "Data",
            cell: ({ row }) => row.original.createdAt ?? "-",
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-right">Valor</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount);

                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        // {
        //     id: "actions",
        //     cell: ({ row }) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //                 <Button variant="ghost" className="h-8 w-8 p-0">
        //                     <span className="sr-only">Open menu</span>
        //                     <MoreHorizontal className="h-4 w-4" />
        //                 </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end">
        //                 <DropdownMenuItem>Editar</DropdownMenuItem>
        //                 <DropdownMenuItem>Excluir</DropdownMenuItem>
        //             </DropdownMenuContent>
        //         </DropdownMenu>
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
    ];

    const table = useReactTable({
        data: expenses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    // Sincroniza typeFilter com columnFilters
    React.useEffect(() => {
        table.getColumn("type")?.setFilterValue(typeFilter);
    }, [typeFilter]);

    if (loading) {
        return <p>Carregando despesas...</p>;
    }

    if (expenses.length === 0) {
        return <p>Nenhuma despesa encontrada.</p>;
    }

    return (
        <div className="w-full">
            <div className="flex items-center space-x-4 py-4">
                <div className="flex flex-1 items-center">
                    <Input
                        placeholder="Filtrar descrição..."
                        value={
                            (table
                                .getColumn("description")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("description")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    {/* <label className="text-sm">Tipo:</label> */}
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
                            <RadioGroupItem
                                value="VARIABLE"
                                id="tipo-variavel"
                            />
                            <label htmlFor="tipo-variavel" className="text-sm">
                                Variável
                            </label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
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
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} transações(s)
                    selecionada(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    );
}
