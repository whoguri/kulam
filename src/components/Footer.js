import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const d = new Date();
    let year = d.getFullYear();

    return (<>
        <div className="bg-background">
            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:py-7 py-5">
                <div className="md:flex items-center justify-between text-white">
                    <div className="flex md:gap-5 gap-3">
                        <Link href="/privacy-policy" className="md:text-lg text-sm">Privacy Policy</Link>
                        <Link href="/terms" className="md:text-lg text-sm">Terms</Link>
                        <Link href="/copyright-policy" className="md:text-lg text-sm">Copyright Policy</Link>
                    </div>
                    <div className="md:text-lg text-sm md:pt-0 pt-3">@ {year} KULAM</div>
                    <div className="flex md:gap-5 gap-3 items-center md:pt-0 pt-5">
                        <Link href="/">
                            <Image src="/images/insta.svg" alt="insta" width={30} height={30} className="md:w-[30px] w-[20px] md:h-[30px] h-[20px]" />
                        </Link>
                        <Link href="/">
                            <Image src="/images/fb.svg" alt="fb" width={15} height={15} className="md:w-[25px] w-[18px] md:h-[25px] h-[18px]" />
                        </Link>
                        <Link href="/">
                            <Image src="/images/x.svg" alt="x" width={25} height={25} className="md:w-[25px] w-[18px] md:h-[25px] h-[18px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
