import { Input } from "@material-tailwind/react";
import React from "react";

export default function CustomInput({
    label,
    id,
    value,
    onChange,
    color,
    errors,
    className,
    type = "text",
    disabled = false,
}) {
    return (
        <div className="flex flex-col w-full mr-4 ">
            <div className={`lg:w-full ml-0 ${className}`}>
                <Input
                    label={label}
                    id={id}
                    value={value}
                    onChange={onChange}
                    color={color}
                    type={type}
                    disabled={disabled}
                />
            </div>
            {errors && (
                <p className="text-red-500 text-sm ml-0 mt-3">{errors}</p>
            )}
        </div>
    );
}
