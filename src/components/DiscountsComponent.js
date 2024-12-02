"use client"
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { toast } from "react-toastify";
import { chunkArray, getError } from "helper";
import DiscountsModal from "./DiscountsModal"
import { ADMIN, ADVERTISER } from "@/constents/constArray";
import Loading from "./Loading";
import { useSession } from "next-auth/react";
import Layout from "./Layout";
import NoData from "./NoData";
import Link from "next/link";
import Image from "next/image";

export default function DiscountsComponent() {
    const { data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const isAdvertiser = user?.role === ADVERTISER
    const [openDiscount, setOpenDiscount] = useState(false)
    const [selId, setSelId] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        getList()
    }, [])


    const getList = async () => {
        try {
            const res = await axios.get("/api/discounts")
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.error(e)
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
        // autoplay: true,
        arrows: false,
        afterChange: i => (
            setIndex(i)
        ),
        customPaging: i => (<div className="mx-[2px]">
            <div className={`bg-white ${i === index ? "px-3" : "px-2"} rounded-xl`}>{i + 1}</div>
        </div>)
    };

    const chunkedList = chunkArray((list || []), 12);
    return <Layout title="הנחות"
        buttonTitle={isAdmin && "add"}
        onClickButton={() => { setOpenDiscount(true) }} >

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

                {loading ? <Loading /> : ((list && list.length > 0) ?
                    (chunkedList.length === 1 ?
                        <><div className="!grid md:grid-cols-4 grid-cols-2 2xl:gap-5 xl:gap-5 gap-4">
                            {chunkedList[0].map((e, i) => <Item isAdmin={isAdmin} isAdvertiser={isAdvertiser} setSelId={setSelId}
                                setOpenDiscount={setOpenDiscount} e={e} i={i} key={i} />)}
                        </div>

                        </> :
                        <Slider {...settings}>
                            {chunkedList.map((chunk, chunkIndex) => (
                                <div key={chunkIndex} className="!grid md:grid-cols-4 grid-cols-2 2xl:gap-5 xl:gap-5 gap-4">
                                    {chunk.map((e, i) => <Item isAdmin={isAdmin} isAdvertiser={isAdvertiser} setSelId={setSelId}
                                        setOpenDiscount={setOpenDiscount} e={e} i={i} key={i} />)}
                                </div>))}
                        </Slider>)
                    :
                    <NoData />)}
            </div>
        </div>
    </Layout >
}

function Item({ isAdmin, isAdvertiser, setSelId, setOpenDiscount, e, i }) {
    return <div key={i} className="group relative bg-white overflow-hidden text-center rounded-lg">
        {(isAdmin || isAdvertiser) && <button type="button" className="z-[2] absolute end-2 top-2 inline-flex justify-center items-center p-1 rounded-lg border border-primary-dark text-primary-dark 2xl:text-base text-sm"
            onClick={() => {
                setSelId(e.id)
                setOpenDiscount(true)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
        </button>}

        <Link href={`/discounts/${e.id}`} className="block" >
            <Image src={e.image || "/placeholder.webp"} width={200} height={200} className="group-hover:scale-110 transition-all w-full h-36 object-cover object-center" placeholder="empty" />
            <div className="group">
                <div className="absolute inset-0 top-24 bg-background bg-opacity-70 group-hover:hidden pb-3 pt-[2px]">
                    <h2 className="text-base font-bold text-white">₪{e.amount}</h2>
                    <p className="text-base font-semibold text-white leading-[1]">{e.name}</p>
                </div>
            </div>
            <div className="group-hover:opacity-100 opacity-0 absolute inset-0 bg-background bg-opacity-70 text-white flex justify-center items-center flex-col transition-all duration-300">
                <h2 className="subheading">₪{e.amount}</h2>
                <p className="paragraph">{e.name}</p>
            </div>
        </Link>
    </div>
}