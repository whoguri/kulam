"use client"
import HiringModal from "../components/HiringModal"
import { useState } from "react"

export default function HiringComponent({ description }) {
    const [openUser, setOpenUser] = useState(false)

    return <div>
        {openUser && <HiringModal
            onClose={() => { setOpenUser(false) }}
            onSave={() => { window.location.reload() }}
        />}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">
                    Hiring <button onClick={() => { setOpenUser(true) }} >
                        edit
                    </button>
                </div>
                <div className="paragraph text-center">{description} </div>
            </div>
        </div>
    </div>
}