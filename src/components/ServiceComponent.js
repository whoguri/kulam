"use client"
import ServiceModal from "../components/ServiceModal"
import { useEffect, useState } from "react"
import { ADMIN } from "../constents/constArray"
import { useSession } from "next-auth/react"
import Loading from "./Loading"

export default function ServiceComponent({ description }) {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [openUser, setOpenUser] = useState(false)
    const [loading, setLoading] = useState(false)

    if (status === "loading") {
        return <Loading />
    }
    return <div>
        {openUser && <ServiceModal
            onClose={() => { setOpenUser(false) }}
            onSave={() => { window.location.reload() }}
        />}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                {isAdmin && <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">
                    Service <button onClick={() => { setOpenUser(true) }} >
                        edit
                    </button>
                </div>}

                {loading ? <Loading /> : <div className="ql-editor">
                    <div className="" dangerouslySetInnerHTML={{ __html: description || "" }}></div>
                </div>}
            </div>
        </div>
    </div>
}