export default function HomePost({ description }) {
    return <div>
        {description && <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pb-10">
            <div className="text-4xl text-background text-center font-bold mb-5">Weekly Post</div>
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                {/* {isAdmin && <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">
                    Hiring <button onClick={() => { setOpenUser(true) }} >
                        edit
                    </button>
                </div>} */}
                <div className="ql-snow">
                    <div className="ql-editor">
                        <div className="ql-direction-rtl"
                            dangerouslySetInnerHTML={{ __html: description || "" }} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
}