export default function SelectBox(props) {
    const { isRequired, label, children, formProps, errors, disabled, onChange, defaultOption, clearErrors, selectboxClass } = props
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }
    return (<div className={` ${selectboxClass}`}>
        {label && <label className={`inline text-sm font-bold pb-1 ${!disabled && "bg-white"}`}>{label}{isRequired ? <span className="text-red-500">*</span> : ""}</label>}
        <div className="relative">
            <select className={`disabled:bg-gray-200 w-full py-2 px-3 rounded-xl focus-visible:outline-none first-letter:capitalize placeholder:capitalize border border-input text-sm`}
                {...formProps} disabled={disabled}
                onChange={(e) => {
                    if (e.target.value && clearErrors) {
                        clearErrors(formProps?.name)
                    }
                    if (onChange) {
                        onChange(e)
                    }
                }}>
                <option value="">{defaultOption || `Select ${label}`}</option>
                {children}
            </select>
        </div>
        {error && <div className="capitalize text-xs font-medium text-red-500 mt-1">{error}</div>}
    </div>
    )
}