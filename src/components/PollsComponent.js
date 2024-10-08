"use client"
import { ADMIN, ADVERTISER, USER } from "@/constents/constArray";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "./Loading";

export default function PollsComponent() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdvertiser = user?.role === ADVERTISER
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [list, getList] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (status !== "authenticated" || isAdvertiser) {
            router.push("/")
        } else if (status === "authenticated") {
            getList()
        }
    }, [status])

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
        // appendDots: dots => (
        //     <div className="p-1" >
        //         <ul className="m-0"> {dots} </ul>
        //     </div>
        // ),
        customPaging: i => (<div className="mx-[2px]">
            <div className={`bg-white ${i === index ? "px-3" : "px-2"} rounded-xl`}>{i + 1}</div>
        </div>)
    };

    if (status === "loading") {
        return <Loading />
    }
    return (<>
        <div>
            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
                <div className="md:w-[70%] w-full mx-auto">
                    {/* {loading ? <Loading /> : ((list && list.length > 0) ? */}
                    <Slider {...settings}>
                        <div className="md:p-8 p-4 bg-white rounded-xl text-end">
                            <h2 className="subheading">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="paragraph">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                        <div className="md:p-8 p-4 bg-white rounded-xl text-end">
                            <h2 className="md:text-4xl text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="paragraph">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                        <div className="md:p-8 p-4 bg-white rounded-xl text-end">
                            <h2 className="md:text-4xl text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="paragraph">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="paragraph">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                    </Slider>
                    {/* : <NoData />)} */}
                </div>
            </div>
        </div>
    </>
    );
}
