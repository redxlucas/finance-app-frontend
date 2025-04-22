import { Home, DollarSign, TrendingUp, Turtle } from "lucide-react";

const Aside = () => {
  const links = [
    { href: "/", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { href: "/expenses", label: "Despesas", icon: <DollarSign className="h-4 w-4" /> },
    { href: "/incomes", label: "Ganhos", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <aside className="hidden w-64 bg-gray-300/40 lg:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold tracking-tight mb-4 px-2 text-center flex items-center justify-center gap-2">
            <Turtle className="h-8 w-8 text-black" />
            Jabuti
        </h2>
        <nav className="space-y-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Aside;