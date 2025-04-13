import React from 'react'

type Props = {
    title: string;
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    submitLabel?: string;
    className?: string;
};

export default function Form({ title, onSubmit, children, submitLabel = 'Salvar', className }: Props) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {title && <h2>{title}</h2>}

            {children}

            {submitLabel && (
                <button type="submit">
                    {submitLabel}
                </button>
            )}
        </form>
    );
}