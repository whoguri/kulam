"use client"
import Image from "next/image"

export default function Banner({ title }) {
    return <div className="bg-background relative overflow-hidden">
        <div className="md:max-w-7xl max-w-[90%] mx-auto pt-10 relative z-20">
            <h2 className="md:text-[120px] text-5xl leading-none uppercase md:py-3 py-[10px] font-bold text-text text-right">{title}</h2>
        </div>
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-10 z-10 left-0" />
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180" />
    </div>
}