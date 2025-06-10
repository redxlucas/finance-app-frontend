import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ModalProps = {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
};

export const Modal = ({
    trigger,
    title,
    description,
    children,
}: ModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

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
