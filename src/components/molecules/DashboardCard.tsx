import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardCardProps = {
    title: string;
    description: string;
    value: string | number;
    footer?: string | React.ReactNode;
    isLoading?: boolean;
};

export function DashboardCard({
    title,
    description,
    value,
    footer,
    isLoading = false,
}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isLoading ? <Skeleton className="h-4 w-32" /> : title}
                </CardTitle>
                <CardDescription>
                    {isLoading ? (
                        <Skeleton className="h-3 w-24" />
                    ) : (
                        description
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="text-primary text-2xl font-semibold">
                {isLoading ? (
                    <Skeleton className="h-6 w-40" />
                ) : (
                    formatValue(value)
                )}
            </CardContent>

            {footer !== undefined && (
                <CardFooter className="text-xs text-muted-foreground">
                    {isLoading ? <Skeleton className="h-3 w-56" /> : footer}
                </CardFooter>
            )}
        </Card>
    );
}

function formatValue(value: string | number): string {
    if (typeof value === "number") {
        return `R$ ${value.toFixed(2)}`;
    }
    return value;
}
