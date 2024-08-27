import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (<>
        <div className="bg-background">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-center">
                    <div className="text-white flex gap-5">
                        <button className="border border-white  px-4 py-[6px] rounded-lg gradient-bg">Sign In</button>
                        <button className="border border-white px-4 py-[6px] rounded-lg hover:bg-gradient-to-t from-[#F5BC46] to-[#ee7b31]">Sign Up</button>
                    </div>
                    <div className="flex items-center gap-20">
                        <div className="flex gap-6 text-white">
                            <Link href="/" className="text-xl font-medium">Contact</Link>
                            <Link href="/" className="text-xl font-medium">Services</Link>
                            <Link href="/" className="text-xl font-medium">Profile</Link>
                            <Link href="/" className="text-xl font-medium">Hiring</Link>
                            <Link href="/" className="text-xl font-medium">Discounts</Link>
                            <Link href="/" className="text-xl font-medium">Deals</Link>
                            <Link href="/" className="text-xl font-medium">Polls</Link>
                            <Link href="/" className="text-xl font-medium">Home</Link>
                        </div>
                        <Link href="/">
                            <Image src="/images/logo.png" alt="logo" width={135} height={112} className="w-[110px]" />
                        </Link>
                    </div>
                </div>
                <Image src="/images/header.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" />
                <Image src="/images/header2.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" />
            </div>
        </div>
    </>
    );
}
