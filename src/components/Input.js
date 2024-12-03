"use client"
import Image from "next/image"

export default function Input({ isRequired,
    icon = "",
    label = "",
    placeholder,
    type = "",
    inputClass = "",
    formProps,
    errors,
    disabled,
    step,
    onClickIcon }) {
    let error = "";

    if (errors && formProps?.name) {
        const errorMessage = errors[formProps.name]?.message;
        const errorType = errors[formProps.name]?.type;

        if (errorMessage || ["required", "pattern", "minLength", "maxLength", "min", "max", "validate"].includes(errorType)) {
            error = errorMessage || errorType;
        }
    }

    return (<div>
        {label && <label className="text-sm font-bold pb-1 capitalize">{label}{isRequired ? <span className="text-red-500">*</span> : ""}</label>}
        <div className="relative">
            <input step={step} className={`${inputClass} disabled:bg-gray-200 w-full py-2 px-3 rounded-xl focus-visible:outline-none first-letter:capitalize placeholder:capitalize border border-input text-sm ${icon ? "" : "px-2"} `}
                placeholder={placeholder || label} type={type}
                {...formProps}
                disabled={disabled}
            />
            {icon && <Image onClick={() => {
                if (onClickIcon) {
                    onClickIcon()
                }
            }} src={icon} alt="pen" width={16} height={16} className="cursor-pointer absolute top-1/2 -translate-y-1/2 end-1" />}
        </div>
        {error && <div className="input-error">{error}</div>}

    </div>
    )
}