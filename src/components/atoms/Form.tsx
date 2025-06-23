import React from "react";
import { Button } from "../ui/button";

type Props = {
    title?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    submitLabel?: string;
    className?: string;
    isLoading?: boolean;
};

export default function Form({
    title,
    onSubmit,
    children,
    submitLabel = "Salvar",
    className,
    isLoading = false,
}: Props) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}

            {children}

            {submitLabel && (
                <Button disabled={isLoading} type="submit">
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin mr-2 h-5 w-5 text-white inline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Loading...
                        </>
                    ) : (
                        submitLabel
                    )}
                </Button>
            )}
        </form>
    );
}
