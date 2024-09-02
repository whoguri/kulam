"use client"
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "helper";
import DiscountsModal from "./DiscountsModal";
import { useSession } from "next-auth/react";
import { ADMIN } from "../constents/constArray"
import Layout from "./Layout";
import Loading from "./Loading"
import NoData from "./NoData";

export default function DiscountsComponent() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN

    const [openDiscount, setOpenDiscount] = useState(false)
    const [selId, setSelId] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        try {
            const res = await axios.get("/api/discounts")
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        arrows: false,
    };
    if (status === "loading") {
        return <Loading />
    }
    return <Layout title="Discounts">
        <div>

            {openDiscount && <DiscountsModal
                id={selId}
                onClose={() => {
                    setSelId("")
                    setOpenDiscount(false)
                }}
                onSave={() => { getList() }}
            />}

            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
                <div className="md:w-[70%] w-full mx-auto">
                    {isAdmin && <div className="capitalize heading text-center 2xl:pb-8 xl:pb-6 pb-4">
                        <button onClick={() => { setOpenDiscount(true) }} >
                            Add Discount
                        </button>
                    </div>}
                    {loading ? <Loading /> : ((list && list.length > 0) ? <Slider {...settings}>
                        <div>
                            <div className="!grid md:grid-cols-4 grid-cols-2 2xl:gap-5 xl:gap-5 gap-4">
                                {list.map((e, i) => <div key={i} className="bg-white 2xl:py-8 xl:py-7 py-7 2xl:px-0 xl:px-0 px-3 text-center rounded-lg cursor-pointer"
                                    onClick={() => {
                                        setSelId(e.id)
                                        setOpenDiscount(true)
                                    }}>
                                    <h2 className="subheading">{e.amount}</h2>
                                    <p className="paragraph 2xl:pt-3 xl:pt-2 pt-2">{e.name}</p>
                                </div>)}
                            </div>
                        </div>
                        <div>
                            <div className="!grid md:grid-cols-4 grid-cols-2 2xl:gap-5 xl:gap-5 gap-4">
                                {list.map((e, i) => <div key={i} className="bg-white 2xl:py-8 xl:py-7 py-7 2xl:px-0 xl:px-0 px-3 text-center rounded-lg cursor-pointer"
                                    onClick={() => {
                                        // if(isAdmin){
                                        setSelId(e.id)
                                        setOpenDiscount(true)
                                        // }
                                    }}>
                                    <h2 className="subheading">{e.amount}</h2>
                                    <p className="paragraph 2xl:pt-3 xl:pt-2 pt-2">{e.name}</p>
                                </div>)}
                            </div>
                        </div>
                    </Slider> : <NoData />)}
                </div>?
            </div>
        </div>
    </Layout>
}
