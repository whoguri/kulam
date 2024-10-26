import { sortArray } from "helper"

function ReferralNode({ node, level, index, isLast, open, setOpen, search }) {
    let referrals = node.referrals || []
    let expend = open === index

    const convertToLowerCase = (v = "") => {
        if (v) {
            return v.toLowerCase() || ""
        }
    }

    if (search && level === 1) {
        let s = convertToLowerCase(search)
        expend = referrals.filter(e => {
            return convertToLowerCase(e.name)?.includes(s) || convertToLowerCase(e.userName)?.includes(s) || convertToLowerCase(e.email)?.includes(s) || e.phone?.includes(s)
        }).length > 0
    }


    return (<div onClick={() => {
        if (referrals.length > 0)
            if (expend) {
                setOpen(-1)
            } else {
                setOpen(index)
            }
    }} className={`${referrals.length > 0 ? "cursor-pointer" : ""} ${(expend && level === 1) ? "text-background bg-gray-50" : (level === 1 ? "hover:text-background" : "")}  ${level === 1 ? "border-b border-x md:px-6 px-4 md:py-6 py-4 text-xl font-bold" : "text-lg font-normal"} ${isLast ? "rounded-b-md" : ""} ${index === 0 ? "border-t rounded-t-md" : ""}`}>
        <div className="flex justify-between items-center">
            <div>
                {(level === 1 && referrals.length > 0 && !search) && <button type="button"  >
                    <svg className="inline-flex transition-all" style={{ transform: expend ? "rotate(180deg)" : "rotate(0)" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z" /></svg>
                </button>}
            </div>
            <h3 className={`capitalize text-end ${level === 1 ? "" : ""}`}><span className="font-normal text-base">{(level === 1 && referrals.length > 0) ? "(" + referrals.length + ") " : ""} ₪2000</span> - {node.name || node.userName} </h3>
        </div>
        {expend && (referrals.length > 0 && (
            <div className={`grid grid-cols-1 pt-2 text-black`}>
                {sortArray(referrals).map(ref => (
                    <ReferralNode key={ref.id} node={ref} level={level + 1} open={open} search={search} setOpen={setOpen} />
                ))}
            </div>
        ))}
    </div>
    );
}

export default function ReferralTree({ tree, index, isLast, open, setOpen, search }) {

    return (<ReferralNode node={tree} level={1} index={index} isLast={isLast} open={open} setOpen={setOpen} search={search} />
    );
}