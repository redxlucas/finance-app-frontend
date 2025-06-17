import { useState } from "react";
import {
    BanknoteIcon,
    ChevronUp,
    CirclePlus,
    HandCoinsIcon,
    LayoutDashboard,
    Receipt,
    RocketIcon,
    Settings,
    TagIcon,
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
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../atoms/ModeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { GenericDialog } from "../atoms/Dialog";
import TransactionForm from "./TransactionForm";
import { useTransactions } from "@/hooks/useTransactions";

const items = [
    {
        title: "sidebar.dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "sidebar.transactions",
        url: "/transactions",
        icon: Receipt,
    },
    {
        title: "sidebar.goals",
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
        title: "sidebar.settings",
        url: "/settings",
        icon: Settings,
    },
];

export function CustomSidebar() {
    const { addTransaction } = useTransactions();

    const location = useLocation();
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"expense" | "income" | null>(null);

    // const handleSelect = (selectedType: "expense" | "income") => {
    //     setType(selectedType);
    //     setOpen(true);

    //     setTimeout(() => {
    //         setOpen(true);
    //     }, 10);
    // };

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
    };

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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="py-5 hover:bg-transparent cursor-pointer">
                                            <CirclePlus />
                                            {t("sidebar.new")}
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="right"
                                        className="w-[--radix-popper-anchor-width]"
                                        align="start"
                                    >
                                        <DropdownMenuLabel>
                                            {t("sidebar.transactions")}
                                        </DropdownMenuLabel>
                                        {/* <GenericDialog
                                            open={open}
                                            onOpenChange={setOpen}
                                            trigger={
                                                <DropdownMenuItem
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                        setType("expense");
                                                    }}
                                                >
                                                    <BanknoteIcon />
                                                    Despesa
                                                </DropdownMenuItem>
                                            }
                                            title="Nova Despesa"
                                            description="Cadastrar uma nova transação"
                                        >
                                            <ExpenseForm onAdd={addExpense} />
                                        </GenericDialog>

                                        <GenericDialog
                                            open={open}
                                            onOpenChange={setOpen}
                                            trigger={
                                                <DropdownMenuItem
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                        setType("income");
                                                    }}
                                                >
                                                    <HandCoinsIcon />
                                                    Ganho
                                                </DropdownMenuItem>
                                            }
                                            title="Novo Ganho"
                                            description="Cadastrar um novo ganho"
                                        >
                                            <TransactionForm
                                                onAdd={addExpense}
                                                onClose={() => setOpen(false)}
                                            />
                                        </GenericDialog> */}
                                        <>
                                            <DropdownMenuItem
                                                onSelect={(e) => {
                                                    e.preventDefault();
                                                    setType("expense");
                                                    setOpen(true);
                                                }}
                                            >
                                                <BanknoteIcon />
                                                Despesa
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onSelect={(e) => {
                                                    e.preventDefault();
                                                    setType("income");
                                                    setOpen(true);
                                                }}
                                            >
                                                <HandCoinsIcon />
                                                Ganho
                                            </DropdownMenuItem>

                                            <GenericDialog
                                                open={open}
                                                onOpenChange={setOpen}
                                                title={
                                                    type === "expense"
                                                        ? "Nova Despesa"
                                                        : "Novo Ganho"
                                                }
                                                description={
                                                    type === "expense"
                                                        ? "Cadastrar uma nova despesa"
                                                        : "Cadastrar um novo ganho"
                                                }
                                            >
                                                <TransactionForm
                                                    // type={type} // passa o tipo para o form
                                                    onAdd={addTransaction} // ou `addTransaction`, se você tiver uma função genérica
                                                    onClose={() =>
                                                        setOpen(false)
                                                    }
                                                />
                                            </GenericDialog>
                                        </>

                                        <DropdownMenuLabel>
                                            Outros
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <RocketIcon />
                                            Meta
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <TagIcon />
                                            Categoria
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* <Modal
                                    open={open}
                                    onOpenChange={setOpen}
                                    title={
                                        type === "expense"
                                            ? "Nova Despesa"
                                            : type === "income"
                                            ? "Novo Ganho"
                                            : ""
                                    }
                                    description="Cadastrar uma nova transação"
                                >
                                    <ExpenseForm onAdd={addExpense} />
                                </Modal> */}
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
                                            <span>{t(item.title)}</span>
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
                                    <User2 /> {user?.login}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem onSelect={handleLogout}>
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
