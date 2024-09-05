"use client"
import { editorFormats, editorModules } from "helper"
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
export default function HtmlEditor({ isRequired = false, onChange, label, value, setValue, formProps, errors, clearErrors }) {
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }
    return <div className="w-full relative editor min-h-64">
        {label && <label className="text-sm font-bold pb-1">{label}{isRequired ? <span className="text-red-500">*</span> : ""}</label>}
        <ReactQuill
            className="text-start"
            modules={editorModules} formats={editorFormats}
            theme="snow"
            onChange={(e) => {
                if (e && clearErrors) {
                    clearErrors(formProps?.name)
                }
                if (onChange) {
                    onChange(e)
                }
                if (setValue && formProps) {
                    setValue(formProps.name, e)
                }
            }}
            value={value}
        />
        {error && <div className="input-error">{error}</div>}
    </div>
}