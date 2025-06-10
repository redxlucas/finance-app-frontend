import React from "react";
import { Input as ShadCNInput } from "@/components/ui/input";

type Props = {
    name: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
};

export default function Input({
    name,
    type = "text",
    value,
    placeholder,
    required,
}: Props) {
    return (
        <ShadCNInput
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
            className="appearance-none"
        />
    );
}
