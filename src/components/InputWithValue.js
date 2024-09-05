"use client"
import Image from "next/image"

export default function InputWithValue({ isRequired,
    icon = "",
    label = "",
    placeholder,
    type = "",
    inputClass = "",
    disabled,
    step,
    onChange, value }) {

    return (<div className="">
        {label && <label className="text-sm font-bold pb-1">{label}{isRequired ? <span className="text-red-500">*</span> : ""}</label>}
        <div className="relative">
            <input step={step} value={value} className={`${inputClass} disabled:bg-gray-200 w-full py-2 px-3 rounded-xl focus-visible:outline-none first-letter:capitalize placeholder:capitalize border border-input text-sm ${icon ? "" : "px-2"} `}
                placeholder={placeholder || label} type={type}
                disabled={disabled} onChange={onChange}
            />
            {icon && <Image src={icon} alt="pen" width={16} height={16} className="absolute top-1/2 -translate-y-1/2 right-1" />}
        </div>
    </div>
    )
}