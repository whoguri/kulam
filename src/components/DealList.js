"use client"
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import axios from "axios";
import { getError } from "helper";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DealsList() {
    const { id } = useParams()
    const [deal, setDeal] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (id)
            getDeals()
    }, [id])

    const getDeals = async () => {
        try {
            if (id) {
                const res = await axios.get("/api/deals/" + id)
                setDeal(res.data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    return <Layout title="Deal">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            {loading ? <Loading /> : <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                <div className="text-center md:text-[46px] text-3xl leading-normal font-bold capitalize">{deal.name}</div>
                {deal.image &&
                    <div className="py-4">
                        <Image src={deal.image} alt="deal" height={266} width={350} placeholder="empty" className="mx-auto rounded-md w-auto h-[266px]" />
                    </div>}
                <div className="ql-snow">
                    <div className="ql-editor">
                        <div className="ql-direction-rtl" dangerouslySetInnerHTML={{ __html: deal.description || "" }} />
                    </div>
                </div>
            </div>}
        </div>
    </Layout>
}