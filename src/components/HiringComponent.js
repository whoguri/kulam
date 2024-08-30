"use client"
import Layout from "@/components/Layout"
import HiringModal from "../components/HiringModal"
import { useState } from "react"

export default function HiringComponent() {
    const [openUser, setOpenUser] = useState(false)

    return <Layout title="hiring">
        {openUser && <HiringModal
            onClose={() => { setOpenUser(true) }}
            closeButton={false}
        />}
        <button
            onClick={() => { setOpenUser(true) }} >
            edit
        </button>

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">Hiring</div>
                <div className="paragraph text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, </div>
            </div>
        </div>
    </Layout>
}