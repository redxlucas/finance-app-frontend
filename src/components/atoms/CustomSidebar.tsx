import {
    Banknote,
    BanknoteArrowDownIcon,
    BanknoteArrowUpIcon,
    BanknoteIcon,
    ChevronUp,
    CirclePlus,
    HandCoinsIcon,
    LayoutDashboard,
    Receipt,
    ReceiptIcon,
    Rocket,
    RocketIcon,
    Settings,
    TagIcon,
    Target,
    TrendingDownIcon,
    TrendingUpIcon,
    Turtle,
    User2,
    Wallet,
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useExpenses } from "@/hooks/useExpenses";
import { Modal } from "../organisms/Modal";
import ExpenseForm from "../organisms/ExpenseForm";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";

const items = [
    {
        title: "sidebar.dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "sidebar.transactions",
        url: "/expenses",
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
    const { addExpense } = useExpenses();

    const location = useLocation();
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

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
                                                                {t(
                                                                    "sidebar.new"
                                                                )}
                                                            </SidebarMenuButton>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            side="right"
                                                            className="w-[--radix-popper-anchor-width]"
                                                            align="start"
                                                        >
                                                            <DropdownMenuLabel>
                                                                {t(
                                                                    "sidebar.transactions"
                                                                )}
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuGroup>
                                                                <DropdownMenuItem>
                                                                    <BanknoteIcon />
                                                                    Despesa
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <HandCoinsIcon />
                                                                    Ganho
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="mx-1" />
                                                            </DropdownMenuGroup>
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
