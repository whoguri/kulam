import InputWithValue from "./InputWithValue"
export default function MultiInput({ label, items, setItems, buttonName, gridCols, containerClass = "" }) {
    return (<div className={` relative ${containerClass}`}>
        <div className={"flex gap-x-2 md:gap-x-4 w-full leading-none items-start " + (gridCols === 1 ? " flex-col" : "")}>
            <div className="w-[100px] laptop:mb-4 mb-3  relative shrink-0">
                <label className="text-sm font-bold pb-1">{label} </label>
                <button
                    className=" disabled:bg-gray-200 w-full py-2  rounded-xl focus-visible:outline-none first-letter:capitalize placeholder:capitalize border border-input text-sm px-2 "
                    type="button"
                    onClick={() => {
                        setItems((ar) => [...ar, ""])
                    }}>
                    +
                </button>
                <div>
                </div>
            </div>
            <div className={`w-full grid grid-cols-${gridCols || "2"} items-start md:gap-y-2 gap-y-0.5 md:gap-x-4 gap-x-[10px]`}>
                {items.map((e, index) => <InputWithValue
                    key={index}
                    label={`${buttonName} ${index + 1}`}
                    placeholder={`${buttonName} ${index + 1}`}
                    value={e}
                    isRemove={true}
                    onRemoveClick={() => {
                        const value = items.filter((el) => el !== e)
                        setItems(value)
                    }}
                    onChange={(e) => {
                        const value = e.target.value
                        items[index] = value
                        setItems((ar) => [...items,])
                    }}
                />
                )}
            </div>
        </div>
    </div>)
}