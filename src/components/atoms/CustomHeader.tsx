import { Button } from "@/components/ui/button";
import { TurtleIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomHeader() {
    const navLinks = [
        { label: "Home", to: "#" },
        { label: "About", to: "#" },
        { label: "Cars", to: "#" },
        { label: "Portfolio", to: "#" },
        { label: "Contact", to: "#" },
    ];

    return (
        <header className="h-20 w-full border-b">
            <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
                <Link to="#" className="flex items-center gap-2">
                    <TurtleIcon className="h-6 w-6" />
                    <span className="sr-only">Car E-commerce</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-4">
                    {navLinks.map(({ label, to }) => (
                        <Link
                            key={label}
                            to={to}
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-xs px-3 py-1.5">
                        Sign in
                    </Button>
                    <Button className="text-xs px-3 py-1.5">Sign Up</Button>
                </div>
            </div>
        </header>
    );
}
