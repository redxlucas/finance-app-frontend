import React from "react";
import {
    ChevronUp,
    CirclePlus,
    LayoutDashboard,
    Receipt,
    Settings,
    Target,
    Turtle,
    User2,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { Link, useLocation } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useExpenses } from "@/hooks/useExpenses";
import { Modal } from "../organisms/Modal";
import ExpenseForm from "../organisms/ExpenseForm";

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Transações",
        url: "/expenses",
        icon: Receipt,
    },
    {
        title: "Metas Financeiras",
        url: "/goals",
        icon: Target,
    },
    // {
    //     title: "Orçamento",
    //     url: "#",
    //     icon: PieChart,
    // },
    // {
    //     title: "Relatórios",
    //     url: "/reports",
    //     icon: BarChart3,
    // },
    // {
    //     title: "Calendário Financeiro",
    //     url: "/calendar",
    //     icon: Calendar,
    // },
    {
        title: "Configurações",
        url: "/settings",
        icon: Settings,
    },
];

export function CustomSidebar() {
    const { expenses, addExpense } = useExpenses();

    const location = useLocation();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-4 mt-2 text-primary flex items-center justify-center gap-2">
                        <Turtle className="!w-6 !h-6" />
                        <span className="text-lg">Jabuti</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="text-sidebar-foreground bg-primary rounded">
                                <TooltipProvider
                                    delayDuration={0}
                                    skipDelayDuration={100}
                                >
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Modal
                                                trigger={
                                                    // <SidebarMenuButton className="py-5 hover:bg-transparent cursor-pointer">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <SidebarMenuButton className="py-5 hover:bg-transparent cursor-pointer">
                                                                <CirclePlus />
                                                                Adicionar
                                                            </SidebarMenuButton>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            side="right"
                                                            className="w-[--radix-popper-anchor-width]"
                                                        >
                                                            <DropdownMenuItem>
                                                                <span>
                                                                    Despesa
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <span>
                                                                    Ganho
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <span>
                                                                    Meta
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                }
                                                title="Nova Transação"
                                                description="Cadastrar uma nova transação"
                                            >
                                                <ExpenseForm
                                                    onAdd={addExpense}
                                                />
                                            </Modal>
                                        </TooltipTrigger>
                                        <TooltipContent side="top"></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarMenuItem>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        className="text-sidebar-font"
                                        asChild
                                        isActive={
                                            item.url === "/"
                                                ? location.pathname === "/"
                                                : location.pathname.startsWith(
                                                      item.url
                                                  )
                                        }
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ModeToggle />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
