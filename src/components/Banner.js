"use client"
import Image from "next/image"

export default function Banner({ title }) {
    return <div className="bg-background relative overflow-hidden">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:pt-6 pt-4 relative z-20">
            <h2 className="2xl:text-[120px] xl:text-8xl text-5xl leading-none uppercase md:pb-10 pb-7 font-bold text-text text-end text-primary">{title}</h2>
        </div>
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-10 z-10 left-0" />
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180" />
    </div>
}