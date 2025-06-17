import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ModalProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
};

export const Modal = ({
    trigger,
    open,
    onOpenChange,
    title,
    description,
    children,
}: ModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="bg-secondary border-border">
                <DialogHeader>
                    <DialogTitle className="font-bold">{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                {children}

                <DialogClose asChild>
                    <Button
                        variant="default"
                        size="icon"
                        className="absolute top-4 right-4"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
