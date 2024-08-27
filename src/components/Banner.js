"use client"

import { usePathname } from "next/navigation"

export default function Banner({ title }) {
    const pathname = usePathname()
    const isHome = pathname === "/"
    return <div>
        {isHome && <h3 className="text-2xl">Kobe Katz Presents:</h3>
        }
        <h2 className="text-[120px] leading-none uppercase py-3 font-bold text-text">{title}</h2>
        {isHome && <h3 className="text-2xl">Together We Can Beat The Price</h3>}

    </div>
}