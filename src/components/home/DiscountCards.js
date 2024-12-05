"use client"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "helper";
import Link from "next/link";
import Image from "next/image";
import { currency } from "@/constents/constArray";

export default function DiscountCards() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const totalWidth = slider.scrollWidth / 2; // Total width of all images in the slider

        slider.style.setProperty("--total-width", `${totalWidth}px`);

        const clone = slider.innerHTML; // Clone the content
        slider.innerHTML += clone; // Append the cloned content

        const animation = slider.animate(
            [
                { transform: "translateX(0)" },
                { transform: `translateX(-${totalWidth}px)` },
            ],
            {
                duration: 1000 * (list.length + 5), // 10 seconds
                iterations: Infinity,
                easing: "linear",
            }
        );

        return () => {
            animation.cancel(); // Clean up the animation on component unmount
        };
    }, [list]);

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
    return <div className="overflow-x-hidden relative w-full">
        <div
            className=" flex w-full mx-auto md:gap-6 gap-3 items-center justify-center md:pt-16 pt-10 md:pb-12 pb-8  z-20"
            style={{ direction: "rtl" }} ref={sliderRef}>
            {loading ? "" : (list || []).map((e, i) => <Item e={e} i={i} key={i} />)}
        </div>
    </div>
}

function Item({ e, i }) {
    return <div key={i} className="md:w-[250px] w-[200px] shrink-0 group relative bg-white overflow-hidden text-center rounded-lg">
        <Link href={`/discounts/${e.id}`} className="block">
            <Image src={e.image || "/placeholder.webp"} width={200} height={200} className="group-hover:scale-110 transition-all w-full h-36 object-cover object-center" placeholder="empty" />
            <div className="group">
                <div className="absolute inset-0 top-24 bg-background bg-opacity-70 group-hover:hidden pb-3 pt-[2px]">
                    <h2 className="text-base font-bold text-white">{currency}{e.amount}</h2>
                    <p className="text-base font-semibold text-white leading-[1]">{e.name}</p>
                </div>
            </div>
            <div className="group-hover:opacity-100 opacity-0 absolute inset-0 bg-background bg-opacity-70 text-white flex justify-center items-center flex-col transition-all duration-300">
                <h2 className="subheading">{currency}{e.amount}</h2>
                <p className="paragraph">{e.name}</p>
            </div>
        </Link>
    </div>
}