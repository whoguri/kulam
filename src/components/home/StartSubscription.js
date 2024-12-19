"use client"
import { useState } from "react"
import GetSubscriptionModal from "../auth/GetSubscriptionModal";

export default function StartSubscription() {
    const [openSubsriptionModal, setOpenSubsriptionModal] = useState(false);

    return <div>
        {openSubsriptionModal && <GetSubscriptionModal
            onClose={() => {
                setOpenSubsriptionModal(false)
            }} />}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-full mx-auto pt-10">
            <div className="md:p-10 p-4 bg-white bg-opacity-65 rounded-xl md:w-[70%] w-[90%] mx-auto">
                <div className="flex md:flex-row flex-col-reverse items-center justify-between">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenSubsriptionModal(true)
                        }} className="disabled:pointer-events-none disabled:opacity-80 bg-background px-6 py-1 border border-background text-white rounded-md text-base uppercase hover:bg-white hover:bg-opacity-25 hover:text-background font-semiboldlg md:mt-0 mt-2">הרשמה כחבר</button>

                    <div className="md:text-4xl text-xl">
                       הרשם כחבר ותהנה מהטבות
                    </div>
                </div>
            </div>
        </div>
    </div>
}