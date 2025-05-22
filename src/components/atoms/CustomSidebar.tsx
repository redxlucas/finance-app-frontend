import React from "react";
import {
    ArrowUpCircleIcon,
    BarChart3,
    Bell,
    Calendar,
    ChevronUp,
    CreditCard,
    Home,
    Inbox,
    LayoutDashboard,
    PieChart,
    Receipt,
    Search,
    Settings,
    Target,
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
    SidebarHeader,
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
    const location = useLocation();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg mb-4 mt-2 text-primary">
                        Jabuti
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
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
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
