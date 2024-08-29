function ReferralNode({ node }) {
    return (
        <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px' }}>
            <h3>{node.name} ({node.email})</h3>
            {node.referrals.length > 0 && (
                <div>
                    {node.referrals.map(ref => (
                        <ReferralNode key={ref.id} node={ref} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ReferralTree({ tree }) {
    return (
        <div>
            <h1>Referral Tree</h1>
            <ReferralNode node={tree} />
        </div>
    );
}