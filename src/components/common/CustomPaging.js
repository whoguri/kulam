function CustomPaging({ i, index }) {
    return <div className="mx-[2px]">
        <div className={`bg-white ${i === index ? "px-3" : "px-2"} rounded-xl`}>{i + 1}</div>
    </div>
}

export default CustomPaging
