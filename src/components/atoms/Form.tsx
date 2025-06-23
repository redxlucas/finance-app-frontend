import React from "react";
import { Button } from "../ui/button";

type Props = {
    title?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    submitLabel?: string;
    className?: string;
};

export default function Form({
    title,
    onSubmit,
    children,
    submitLabel = "Salvar",
    className,
}: Props) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}

            {children}

            {submitLabel && <Button>{submitLabel}</Button>}
        </form>
    );
}
