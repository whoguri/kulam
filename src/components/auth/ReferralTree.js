function ReferralNode({ node, level, index, isLast }) {
    return (<div className={`border-x px-6 py-6 ${isLast && "rounded-b-md"} ${index === 0 ? "border-t rounded-t-md" : ""} ${level !== 2 ? "border-b" : "border rounded-md"}`}>
        <h3 className={`capitalize ${level === 1 ? "pb-4" : ""}`}>{node.name} {node.referrals.length > 0 ? <>({node.referrals.length})</> : ""}</h3>
        {node.referrals.length > 0 && (
            <div className={`grid ${level === 1 ? "md:grid-cols-3 grid-cols-1 text-center" : ""}`}>
                {node.referrals.map(ref => (
                    <ReferralNode key={ref.id} node={ref} level={level + 1} />
                ))}
            </div>
        )}
    </div>
    );
}

export default function ReferralTree({ tree, index, isLast }) {
    return (<ReferralNode node={tree} level={1} index={index} isLast={isLast} />
    );
}