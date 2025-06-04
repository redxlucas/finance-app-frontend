import { Home, DollarSign, TrendingUp, Turtle } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";

const Aside = () => {
    const links = [
        { href: "/", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
        {
            href: "/expenses",
            label: "Despesas",
            icon: <DollarSign className="h-4 w-4" />,
        },
        {
            href: "/incomes",
            label: "Ganhos",
            icon: <TrendingUp className="h-4 w-4" />,
        },
    ];

    return (
        <aside className="hidden w-64 bg-sidebar lg:block border-r-1 border-sidebar-border">
            <div className="flex h-full flex-col gap-2 p-4">
                <h2 className="text-lg text-foreground font-semibold tracking-tight mb-4 px-2 text-center flex items-center justify-center gap-2">
                    <Turtle className="h-8 w-8 text-primary" />
                    Jabuti
                </h2>
                <nav className="space-y-5">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-input"
                        >
                            {link.icon}
                            {link.label}
                        </a>
                    ))}
                    <ThemeToggle></ThemeToggle>
                    <ModeToggle></ModeToggle>
                </nav>
            </div>
        </aside>
    );
};

export default Aside;
