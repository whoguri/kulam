"use client"
import Image from "next/image"

export default function HomeBanner() {
    return <div className="bg-background relative overflow-hidden">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 relative z-20">
            <div className="flex items-center md:gap-5 gap-2 justify-end">
                <hr className="md:w-44 w-16" />
                <h3 className="md:text-2xl text-base text-end text-primary">Kobe Katz Presents:</h3>
            </div>
            <h2 className="md:text-[120px] text-5xl leading-none uppercase md:py-3 py-[10px] font-bold text-primary text-end">all in one</h2>
            <h3 className="md:text-2xl text-base text-end text-primary">Together We Can Beat The Price</h3>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-5 grid-cols-3 2xl:w-[70%] w-full mx-auto md:gap-6 gap-3 items-center justify-center md:pt-16 pt-10 md:pb-12 pb-8 relative z-20">
                <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">Advertiser 5</button>
                <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">Advertiser 4</button>
                <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">Advertiser 3</button>
                <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">Advertiser 2</button>
                <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">Advertiser 1</button>
            </div>
            <Image src="/images/title.svg" width={50} height={50} className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0" />
        </div>
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-10 z-10 left-0" />
        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180" />
    </div>
}