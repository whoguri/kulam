
function ReferralNode({ node, level, index, isLast, open, setOpen }) {
    return (<div onClick={() => {
        if (node.referrals.length > 0)
            if (open === index) {
                setOpen(-1)
            } else {
                setOpen(index)
            }
    }} className={`${node.referrals.length > 0 ? "cursor-pointer" : ""} ${(open === index && level === 1) ? "text-background bg-gray-50" : (level === 1 ? "hover:text-background" : "")}  ${level === 1 ? "border-b border-x md:px-6 px-4 md:py-6 py-4 text-xl font-bold" : "text-lg font-normal"}  ${isLast ? "rounded-b-md" : ""} ${index === 0 ? "border-t rounded-t-md" : ""}`}>
        <div className="flex justify-between items-center">
            <div>
                {(level === 1 && node.referrals.length > 0) && <button type="button"
                >
                    <svg className="inline-flex transition-all" style={{ transform: open === index ? "rotate(180deg)" : "rotate(0)" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z" /></svg>
                </button>}
            </div>
            <h3 className={`capitalize text-end ${level === 1 ? "" : ""}`}>{node.name} {node.referrals.length > 0 ? <>({node.referrals.length})</> : ""}</h3>
        </div>
        {open === index && (node.referrals.length > 0 && (
            <div className={`grid grid-cols-1 pt-2 text-black`}>
                {node.referrals.map(ref => (
                    <ReferralNode key={ref.id} node={ref} level={level + 1} open={open} setOpen={setOpen} />
                ))}
            </div>
        ))}
    </div>
    );
}

export default function ReferralTree({ tree, index, isLast, open, setOpen }) {

    return (<ReferralNode node={tree} level={1} index={index} isLast={isLast} open={open} setOpen={setOpen} />
    );
}