import React from 'react'

type Props = { 
    name: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

export default function Input({ name, type="text", value, placeholder, required }: Props) {
    return (
        <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
        />
    );
}