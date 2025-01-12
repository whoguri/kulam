"use client"
import { ADMIN } from "@/constents/constArray"
import { useState } from "react"
import { useSession } from "next-auth/react"
import Layout from "./Layout"
import WeeklyPostModal from "./WeeklyPostModal"

export default function WeeklyPostComponent({ description }) {
    const { data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [openUser, setOpenUser] = useState(false)

    return <Layout title=" Weekly Post"
        buttonTitle={isAdmin && "edit"}
        onClickButton={() => { setOpenUser(true) }} >

        {openUser && <WeeklyPostModal
            onClose={() => { setOpenUser(false) }}
            onSave={() => { window.location.reload() }}
        />}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                {/* {isAdmin && <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">
                    Hiring <button onClick={() => { setOpenUser(true) }} >
                        edit
                    </button>
                </div>} */}
                <div className="ql-snow">
                    <div className="ql-editor">
                        <div className="ql-direction-rtl" dangerouslySetInnerHTML={{ __html: description || "" }} />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}