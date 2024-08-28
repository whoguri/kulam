"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getError } from "../../helper"
import Sidebar from "../components/Sidebar"
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function Header() {
    const [sending, setSending] = useState(false)
    const { status } = useSession()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const googleLogin = async () => {
        try {
            setSending(true)
            const res = await signIn("google", { callbackUrl: "/" })
            if (res?.status === 200) {
                window.location.reload()
            }
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
            setSending(false)
        }
    }
    return (<>
        <div className="bg-background md:block hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-center relative z-10">
                    <div className="text-white flex gap-5">
                        <button className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-[1px]"
                            onClick={() => {
                                if (status === "authenticated") {
                                    signOut()
                                } else if (status === "unauthenticated") {
                                    googleLogin()
                                }
                            }}
                            disabled={sending}>
                            <span className="inline-block px-4 py-[6px] rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark">{status === "authenticated" ? "Log out" : "Get Started"}</span>
                        </button>

                        {/* <button className="border border-white px-4 py-[6px] rounded-lg hover:bg-gradient-to-t from-[#F5BC46] to-[#ee7b31]">Sign Up</button> */}
                    </div>
                    <div className="flex items-center gap-20">
                        <div className="flex gap-6 text-white">

                            <Link href="/" className={`text-xl font-medium ${pathname === "/" ? "border-b-2 border-white" : ""}`}>Contact</Link>

                            <Link href="/" className={`text-xl font-medium   ${pathname === "/" ? "border-b-2 border-white" : ""}`}>Services</Link>

                            {status === "authenticated" && <Link href="/profile" className={`text-xl font-medium ${pathname === "/profile" ? "border-b-2 border-white" : ""} `}>Profile</Link>}

                            <Link href="/hiring" className={`text-xl font-medium ${pathname === "/hiring" ? "border-b-2 border-white" : ""}`}>Hiring</Link>

                            <Link href="/" className={`text-xl font-medium ${pathname === "/" ? "border-b-2 border-white" : ""}`}>Discounts</Link>

                            <Link href="/" className={`text-xl font-medium ${pathname === "/" ? "border-b-2 border-white" : ""} `}>Deals</Link>

                            <Link href="/polls" className={`text-xl font-medium ${pathname === "/polls" ? "border-b-2 border-white" : ""} `}>Polls</Link>

                            <Link href="/" className={`text-xl font-medium ${pathname === "/" ? "border-b-2 border-white" : ""} `}>Home</Link>
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

        <div className="md:hidden block bg-background -mb-[1px]">
            <div className="flex justify-between items-start relative z-10 w-full px-3 py-2">
                <Link href="/">
                    <Image src="/images/logo.png" alt="logo" width={70} height={70} />
                </Link>d

                <span className="cursor-pointer md:hidden text-primary " onClick={() => { setOpen(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                    </svg>
                </span>
            </div>
            {/* <Image src="/images/header.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" />
            <Image src="/images/header2.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" /> */}
            <Sidebar open={open} setOpen={setOpen} />

        </div>
    </>
    );
}
