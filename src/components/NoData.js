export default function NoData({ text }) {
    return <div className="text-center text-background min-h-20 flex items-center justify-center text-3xl">{text || "No Data"}</div>
}