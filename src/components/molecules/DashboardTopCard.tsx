import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TopCategoryCardProps {
    isLoading: boolean;
    title: string;
    description: string;
    categoryName: string;
    totalAmount: number;
    footer?: string;
}

export function TopCategoryCard({
    isLoading,
    title,
    description,
    categoryName,
    totalAmount,
    footer,
}: TopCategoryCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-sm">
                    {isLoading ? <Skeleton className="h-4 w-40" /> : title}
                </CardTitle>
                <CardDescription>
                    {isLoading ? (
                        <Skeleton className="h-3 w-24" />
                    ) : (
                        description
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="text-lg flex justify-between">
                {isLoading ? (
                    <>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                    </>
                ) : (
                    <>
                        <span className="font-light">{categoryName}</span>
                        <span className="text-primary font-semibold">
                            {formatValue(totalAmount)}
                        </span>
                    </>
                )}
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
                {isLoading ? <Skeleton className="h-3 w-56" /> : footer}
            </CardFooter>
        </Card>
    );
}

function formatValue(value: string | number): string {
    if (typeof value === "number") {
        return `R$ ${value.toFixed(2)}`;
    }
    return value;
}
