import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="p-4 max-w-full md:max-w-5xl lg:max-w-7xl">
            <h1 className="text-2xl mb-4 font-bold text-foreground">
                Visão Geral
            </h1>
            <h2>Bem-vindo, {user?.name.split(" ")[0]}!</h2>
        </div>
    );
}
