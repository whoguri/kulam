"use client"
import { ADMIN, ADVERTISER, USER } from "@/constents/constArray";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading";
import Layout from "../Layout";
import axios from "axios";
import { getError } from "helper";
import { toast } from "react-toastify";
import NoData from "../NoData";

export default function PollsComponent() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdvertiser = user?.role !== ADVERTISER
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [index, setIndex] = useState(0)
    const [allDone, setAllDone] = useState(false)

    useEffect(() => {
        if (status !== "authenticated" || isAdvertiser) {
            router.push("/")
        } else if (status === "authenticated") {
            getList()
        }
    }, [status])

    const getList = async () => {
        try {
            setLoading(true)
            let url = `/api/polls/my-polls`
            const res = await axios.get(url)
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
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
    return (<Layout title="סקרים">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            <div className="md:w-[70%] w-full mx-auto">
                {loading ? <Loading /> : ((list && list.length > 0) ? <>
                    {list.length === 1 ? <Item e={list[0]} onClickSkip={() => {
                        setAllDone(true)
                        setList([])
                    }} /> :
                        <Slider {...settings}>
                            {list.map((e, i) => {
                                return <Item e={e} key={e.id}
                                    onClickSkip={() => {
                                        if ((list.length - 1) === i) {
                                            setList([])
                                            setAllDone(true)
                                        } else {
                                            setList(list.filter((l, idx) => idx !== i))
                                        }
                                    }} />
                            })}
                        </Slider>}
                </> : (allDone ? <AllDone /> : <NoData />))}
            </div>
        </div>
    </Layout>
    );
}

const Item = ({ e, onClickSkip }) => {
    let id = e.id
    const [selc, setSelc] = useState("")

    const onSave = async (id) => {
        if (!selc) {
            toast.error("Select Option")
            return
        }
        try {
            axios.put(`/api/polls/${id}/answer`, { answer: selc })
        } catch (e) { }
        onClickSkip()
        setSelc("")
    }
    return <div className="md:p-8 p-4 bg-white rounded-xl text-end">
        <h2 className="subheading">{e.question}</h2>
        <div className="py-6">
            {e.options.map((o, i) => {
                return <label htmlFor={o} key={o} className="cursor-pointer flex gap-7 items-center justify-end">
                    <h2 className="paragraph">{o}</h2>
                    <input onChange={(e) => {
                        const v = e.target.value
                        setSelc(v)
                    }} type="radio" name={id} id={o} value={o} className="border border-background py-3 px-3 rounded-full" />
                </label>
            })}
        </div>
        <button
            onClick={() => {
                setSelc("")
                onClickSkip()
            }}
            className="border border-transparent md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-background md:text-lg text-sm font-medium me-2 hover:bg-slate-50">Skip</button>
        <button onClick={() => {
            onSave(id)
        }} className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Save</button>
    </div>
}

const AllDone = () => {
    return <div className="text-center min-h-[50vh] md:p-8 p-4 bg-white rounded-xl flex justify-center items-center">
        <div>
            <div className="mb-8">
                <svg className="h-32 w-32 mx-auto" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><radialGradient id="notoPartyingFace0" cx="63.59" cy="3189.09" r="50.659" gradientTransform="translate(0 -3114)" gradientUnits="userSpaceOnUse"><stop offset=".5" stop-color="#fde030" /><stop offset=".92" stop-color="#f7c02b" /><stop offset="1" stop-color="#f4a223" /></radialGradient><path fill="url(#notoPartyingFace0)" d="M63.6 124.8c-24.81 0-51.6-15.56-51.6-49.71s26.79-49.71 51.6-49.71c13.78 0 26.5 4.53 35.93 12.8c10.22 9.08 15.65 21.88 15.65 36.91s-5.43 27.75-15.65 36.82c-9.43 8.27-22.24 12.89-35.93 12.89" /><path fill="#eb8f00" d="M106.19 45.54c4.88 8.1 7.38 17.42 7.21 26.88c0 15-5.43 27.75-15.65 36.82c-9.43 8.27-22.23 12.89-35.93 12.89c-16.06 0-32.93-6.53-42.84-20.4c9.57 15.71 27.56 23.07 44.62 23.07c13.69 0 26.5-4.62 35.93-12.89c10.22-9.08 15.65-21.79 15.65-36.82c0-11.33-3.09-21.4-8.99-29.55" /><radialGradient id="notoPartyingFace1" cx="69.633" cy="-1087.726" r="19.436" gradientTransform="matrix(.98 0 0 -.88 -34.44 -882.08)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ed7770" /><stop offset=".9" stop-color="#ed7770" stop-opacity="0" /></radialGradient><ellipse cx="33.8" cy="71.6" fill="url(#notoPartyingFace1)" opacity="0.8" rx="17.5" ry="16.5" /><radialGradient id="notoPartyingFace2" cx="126.52" cy="-1042.59" r="19.43" gradientTransform="matrix(1 0 0 -1 0 130)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ed7770" /><stop offset=".9" stop-color="#ed7770" stop-opacity="0" /></radialGradient><ellipse cx="94.2" cy="71.6" fill="url(#notoPartyingFace2)" opacity="0.8" rx="17.5" ry="16.5" /><ellipse cx="24" cy="15" fill="#ff00a2" rx="7" ry="5" /><ellipse cx="49.56" cy="25.38" fill="#fd3b3b" rx="4.2" ry="5.5" transform="rotate(-45.001 49.56 25.383)" /><ellipse cx="72.51" cy="18.21" fill="#0ef" rx="8.4" ry="3.9" transform="rotate(-37.74 72.513 18.21)" /><ellipse cx="22.71" cy="81.68" fill="#0048ff" rx="2.9" ry="6.5" transform="rotate(-30 22.703 81.682)" /><ellipse cx="96.5" cy="110.5" fill="#f63bbe" rx="3.5" ry="5.5" /><ellipse cx="115.38" cy="57.1" fill="#0c0" rx="6.5" ry="2" transform="rotate(-35.143 115.374 57.095)" /><ellipse cx="19.19" cy="116.02" fill="#0048ff" rx="2.5" ry="6" transform="rotate(-33.269 19.189 116.022)" /><ellipse cx="15" cy="99" fill="#7acded" rx="6" ry="2.5" transform="rotate(-4.052 15.016 99)" /><ellipse cx="24.01" cy="86.7" fill="#ff82b2" rx="7.2" ry="1.7" transform="rotate(-3.801 24.036 86.763)" /><linearGradient id="notoPartyingFace3" x1="82.19" x2="119.38" y1="-902.726" y2="-902.726" gradientTransform="matrix(1 0 0 -1 0 -820)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#004054" /><stop offset=".99" stop-color="#45a4ff" /></linearGradient><path fill="url(#notoPartyingFace3)" d="M118.9 78.2c-.85-2.94-2.88-5.4-5.6-6.8c-4.6-2.5-10.36-.79-12.85 3.81c-.02.03-.03.06-.05.09a8.08 8.08 0 0 0 3.3 10.9c1.55.87 3.37 1.12 5.1.7c1.78-.4 3.28-1.57 4.1-3.2c.89-1.88.81-4.08-.2-5.9a5.17 5.17 0 0 0-4.2-2.8c-1.03-.02-1.87.8-1.89 1.83c-.01.93.67 1.73 1.59 1.87c.51.03.97.34 1.2.8c.35.71.42 1.54.2 2.3a2.45 2.45 0 0 1-1.7 1.3c-.81.21-1.67.1-2.4-.3c-1-.53-1.75-1.43-2.1-2.5c-.3-1.1-.19-2.27.3-3.3a5.55 5.55 0 0 1 3.4-2.8c1.47-.42 3.03-.28 4.4.4c1.79.98 3.12 2.64 3.7 4.6c.61 1.97.39 4.1-.6 5.9c-1.9 3.6-5.6 6-11 6c-3.1 0-21.55-.5-21.55-.5l.22 4.6l21.13-.3c6.3 0 11.5-2.5 14.5-8.1c1.58-2.58 1.94-5.73 1-8.6" /><path fill="#7f0099" d="M70 93c.61.65 1.08 1.41 1.4 2.24l11.45-.07c0-1.5-.2-3-.2-4.6c-3-.1-9.18-.2-11.1-.27a5.76 5.76 0 0 1-1.61 2.7z" /><path fill="#ff4545" d="m104.8 54.8l3.5.5l.9-3.5l.5-2L89.6 47c9.1 6.9 14.6 7.8 15.2 7.8m16.1-49.4l-8.1 4.6l-2 1.1l8.4 1.2c.6-2.5 1.7-6.9 1.7-6.9M103 15.5l-8.3 4.7l21.7 3.1l1.4-5.7zM79.3 28.9h-.1l34.5 5l1.3-5.3l-28.1-4zm2.9 11.5l28.8 4.1l1.4-5.4l-34.7-5c.4 1.1 1.6 3.3 4.5 6.3" /><path fill="#ff9c9c" d="m86.9 24.6l28.1 4l1.4-5.3l-21.7-3.1zm31.7-10.1s.3-1.4.5-2.1l-8.4-1.2l-7.8 4.4l14.8 2.1zm-42.3 16l1.1 3.2c.04.18.11.35.2.5l34.7 5l1.3-5.3L79.1 29zm12.9 16.2c.1.1.3.2.4.3l20.1 2.9l1.3-5.3l-28.8-4.1c2.19 2.22 4.53 4.29 7 6.2" /><circle cx="120.8" cy="6.5" r="4.8" fill="#c93737" /><path fill="#422b0d" d="M71.84 91.83a7.52 7.52 0 0 0 2.57-5c.28-1.95-.3-3.92-1.6-5.4c-2.33-3.06-8.81-2.3-8.81-2.3c-1.74.07-3.75.9-3.5 2.9a3.27 3.27 0 0 0 2.42 2.29c2.56.61 6.21 0 6.31 2.6c.12 2.92-4.36 1.72-4.72 4.81s4.72 2.68 4.72 4.81c0 1.63-1.67 1.91-3.43 2.28c-1.51.31-4.41.78-4.64 2.51s.76 3.86 4.84 3.24c6.42-1 8.58-4.49 8.58-6.65c.04-2.34-.96-4.57-2.74-6.09m-21.98-26.4l-.15-.19l-.4-.51l-.51-.55c-.2-.22-.44-.46-.68-.7c-.25-.24-.51-.47-.79-.68c-.25-.19-.51-.36-.79-.51c-.19-.11-.4-.19-.62-.23a.7.7 0 0 0-.2 0h-.08h.18h-.52c-.13 0 0 0 0 0h.07c.08 0 0 0 0 0a.2.2 0 0 0-.11 0c-.22.04-.43.12-.62.23c-.28.15-.54.32-.79.51c-.26.2-.53.44-.79.68c-.49.48-.92 1-1.22 1.31l-.48.57l-.22.25a3.995 3.995 0 0 1-5.29.57c-1.05-.73-1.59-2-1.39-3.27c0 0 .07-.38.25-1c.28-.96.68-1.88 1.18-2.74c.78-1.42 1.84-2.67 3.11-3.67c.87-.66 1.83-1.19 2.86-1.56c.28-.11.58-.2.87-.27c.33-.1.66-.17 1-.22l.58-.08h2.22c.31 0 .63.08.94.13a10.9 10.9 0 0 1 4.64 2.04c1.29.98 2.38 2.21 3.18 3.62c.29.49.55 1.01.76 1.54c.19.44.33.91.45 1.26s.11.52.15.69v.23a3.54 3.54 0 0 1-3.01 3.99c-.04.01-.08.01-.11.01c-1.39.21-2.8-.34-3.67-1.45m37.14 0l-.15-.19l-.4-.51l-.45-.55c-.2-.22-.44-.46-.68-.7c-.25-.24-.51-.47-.79-.68c-.25-.19-.51-.36-.79-.51c-.19-.11-.4-.19-.61-.23a.7.7 0 0 0-.2 0h-.08h.15h-.52c-.14 0 0 0 0 0h.07c.08 0 0 0 0 0h-.11c-.21.04-.42.12-.61.23c-.28.15-.54.32-.79.51c-.28.21-.54.44-.79.68c-.5.48-.92 1-1.23 1.31l-.48.57l-.22.25a3.995 3.995 0 0 1-5.29.57c-1.05-.73-1.59-2-1.39-3.27c0 0 .07-.38.26-1c.25-.97.62-1.91 1.1-2.79c.8-1.41 1.89-2.64 3.18-3.62c.87-.66 1.84-1.19 2.87-1.56c.28-.11.57-.2.86-.27c.33-.1.66-.17 1-.22l.58-.08h2.22c.32 0 .63.08.94.13c1.69.29 3.28.98 4.65 2c1.29.98 2.37 2.21 3.18 3.62c.29.49.54 1.01.75 1.54q.27.615.45 1.26q.105.345.15.69v.23a3.51 3.51 0 0 1-2.98 3.98c-.04.01-.08.01-.13.02c-1.4.22-2.82-.31-3.72-1.41" /></svg>
            </div>
            <div className="heading">All Done</div>
        </div>
    </div>
}