import dynamic from "next/dynamic"
import { editorFormats, editorModules } from "../../helper"
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


export default function HtmlEditor(
    { isRequired = false, readOnly = false, inlineLabel = false, onChange, label, value, setValue, formProps, errors, clearErrors, containerClass = "" }
) {
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }
    return <div className={`editor w-full mb-4 relative ${containerClass}`}>
        {inlineLabel ?
            <label className="inline absolute left-1.5 top-4 px-1 bg-white capitalize pb-1 !font-bold text-xs z-[1]">{label}{isRequired && <span className="text-red-500">*</span>}</label>
            : <label className="inline absolute left-1.5 -top-2 px-1 bg-white capitalize pb-1 font-medium text-xs z-[1]">{label}{isRequired && <span className="text-red-500">*</span>}</label>}

        <QuillNoSSRWrapper modules={editorModules} formats={editorFormats} theme="snow"
            // readOnly={readOnly}

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
        {error && <div className="capitalize text-xs font-medium text-red-500 mt-1">{error}</div>}

    </div>
}