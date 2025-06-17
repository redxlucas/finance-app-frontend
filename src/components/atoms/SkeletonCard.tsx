import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function SkeletonCard() {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-4 w-32" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-24" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-40" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-3 w-48" />
            </CardFooter>
        </Card>
    );
}
