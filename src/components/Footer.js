"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname()
    if (pathname === "/membership") {
        return <></>
    }
    const d = new Date();
    let year = d.getFullYear();

    return (<>
        <div className="bg-background">
            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:py-7 py-5">
                <div className="md:flex items-center justify-between text-white">
                    <div className="flex md:gap-5 gap-3 md:justify-start justify-end">
                        <Link href="/privacy-policy" className="2xl:text-lg text-base">פרטיות</Link>
                        <Link href="/terms" className="2xl:text-lg text-base">שאלות נפוצות</Link>
                        <Link href="/copyright-policy" className="2xl:text-lg text-base">מדיניות האתר</Link>
                    </div>

                    <div className="2xl:text-lg text-base md:pt-0 pt-3 md:text-start text-end">@ {year} כוךם בשביל כולם</div>
                    <div className="flex 2xl:gap-5 gap-3 items-center justify-end md:pt-0 pt-5">
                        <a href="https://www.instagram.com/" target="_blank">
                            <img src="/images/insta.svg" alt="insta" width={30} height={30} className="2xl:w-[30px] w-[20px] 2xl:h-[30px] h-[20px]" />
                        </a>

                        <a href="https://www.facebook.com/" target="_blank">
                            <img src="/images/fb.svg" alt="fb" width={15} height={15} className="2xl:w-[25px] w-[18px] 2xl:h-[25px] h-[18px]" />
                        </a>

                        <a href="https://www.twitter.com/" target="_blank">
                            <img src="/images/x.svg" alt="x" width={25} height={25} className="2xl:w-[25px] w-[18px] 2xl:h-[25px] h-[18px]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
