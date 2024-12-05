import { sortArray } from "helper";
import { useState, useEffect } from "react";
import InfoModal from './InfoModal';
import { currency } from "@/constents/constArray";

function ReferralNodeN({ node, level, search }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const referrals = node.referrals || [];
    const [selectedItem, setSelectedItem] = useState(null)

    const convertToLowerCase = (v = "") => v?.toLowerCase() || "";

    // Determine if node should be expanded based on the search
    const shouldExpand = search
        ? (convertToLowerCase(node.name).includes(search) ||
            convertToLowerCase(node.userName).includes(search) ||
            convertToLowerCase(node.email).includes(search) ||
            node.phone?.includes(search) ||
            referrals.some(e =>
                convertToLowerCase(e.name).includes(search) ||
                convertToLowerCase(e.userName).includes(search) ||
                convertToLowerCase(e.email).includes(search) ||
                e.phone?.includes(search) ||
                e.referrals?.some(e2 =>
                    convertToLowerCase(e2.name).includes(search) ||
                    convertToLowerCase(e2.userName).includes(search) ||
                    convertToLowerCase(e2.email).includes(search) ||
                    e2.phone?.includes(search)
                )
            ))
        : false;

    useEffect(() => {
        if (search) {
            setIsExpanded(shouldExpand);
        }
    }, [search, shouldExpand]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={`border-b ${level === 1 ? "border-x" : ""} ${(isExpanded && referrals.length > 0) ? (level === 2 ? "bg-gray-100" : "bg-gray-50") : ""}`} >
            {selectedItem && <InfoModal onClose={() => { setSelectedItem(null); }} data={selectedItem} />}
            <div className={`flex justify-between items-center md:ps-6 ps-4 ${level === 1 ? "text-xl font-bold md:pe-6 pe-4 md:py-6 py-4" : (level === 2 ? "text-lg font-semibold md:py-3 py-1.5 md:pe-10 pe-6" : "text-base font-medium md:pe-14 pe-8 md:py-1.5 py-0.5 ")}`}>
                <div className="flex">
                    {referrals.length > 0 && (
                        <button type="button" onClick={toggleExpand}>
                            <svg className={`transition-all ${isExpanded ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                                <path fill="currentColor" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z" />
                            </svg>
                        </button>
                    )}
                </div>
                <h3 className="capitalize cursor-pointer" onClick={() => { setSelectedItem(node); }}>
                    <span className="text-[80%] font-normal">
                        {referrals.length > 0 && (
                            <span className="h-6 min-w-6 rounded-full bg-gradient-to-r from-primary to-primary-dark me-2 inline-flex items-center justify-center px-1 py-1 text-white">
                                {referrals.length}
                            </span>
                        )}
                        {currency}2000
                    </span> - {node.name || node.userName}
                </h3>
            </div>
            {isExpanded && referrals.length > 0 && (
                <div className="grid grid-cols-1 text-black border-t">
                    {sortArray(referrals).map(ref => (
                        <ReferralNodeN key={ref.id} node={ref} level={level + 1} search={search} />
                    ))}
                </div>
            )}
        </div>
    );
}



export default function ReferralTree({ tree, search }) {
    return (<ReferralNodeN node={tree} level={1} search={search} />
    );
}
