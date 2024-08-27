"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Banner({ title }) {
    const pathname = usePathname()
    const isHome = pathname === "/"

    return <div className="bg-background">
        <div className="max-w-7xl mx-auto pt-10 relative z-20">
            {isHome &&
                <div className="flex items-center gap-5 justify-end">
                    <hr className="w-44" />
                    <h3 className="text-2xl text-right text-white">Kobe Katz Presents:</h3>
                </div>
            }
            <h2 className="text-[120px] leading-none uppercase py-3 font-bold text-text text-right">all in one</h2>
            {isHome && <h3 className="text-2xl text-right text-white">Together We Can Beat The Price</h3>}

            {isHome && <div className="flex gap-6 items-center justify-center pt-16 pb-12 relative z-20">
                <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 5</button>
                <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 4</button>
                <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 3</button>
                <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 2</button>
                <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 1</button>
            </div>}
            {isHome && <Image src="/images/title.svg" width={50} height={50} className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0" />}
        </div>
    </div>
}