"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getError } from "../../helper";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { ADVERTISER } from "@/constents/constArray";

export default function Header() {
  const [sending, setSending] = useState(false);
  const { status, data } = useSession();
  const user = data?.user || {}
  const isAdvertiser = user?.role === ADVERTISER

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const googleLogin = async () => {
    try {
      setSending(true);
      const res = await signIn("google", { callbackUrl: "/" });
      if (res?.status === 200) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      toast.error(getError(e));
      setSending(false);
    }
  };

  const MENU = [
    { title: "ראשי", link: "/" },
    { title: "דילים", link: "/deals" },
    { title: "הנחות", link: "/discounts" },
    { title: "דרושים", link: "/hiring" },
    { title: "שירותים", link: "/services" },
    { title: "צור קשר", link: "/contact" },

  ]
  if (status === "authenticated") {
    MENU.splice(1, 0, { title: "הגדרות", link: "/profile" })
  }

  if (status === "authenticated" && !isAdvertiser) {
    MENU.splice(2, 0, { title: "סקרים", link: "/polls" })

  }

  return (
    <>
      <div className="bg-background md:block hidden">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto relative z-10">
          <div className="flex justify-between items-center relative z-10">
            <div className="text-white flex gap-5 pt-5">
              <button
                className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-[1px]"
                onClick={() => {
                  if (status === "authenticated") {
                    signOut();
                  } else if (status === "unauthenticated") {
                    googleLogin();
                  }
                }}
                disabled={sending}>
                <span className="inline-block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm">
                  {status === "authenticated" ? "יציאה" : "כניסה"}
                </span>
              </button>

              {/* <button className="border border-white px-4 py-[6px] rounded-lg hover:bg-gradient-to-t from-[#F5BC46] to-[#ee7b31]">Sign Up</button> */}
            </div>
            <div className="flex items-center gap-0 pt-2">
              <div className="flex gap-6 text-white cursor-pointer flex-row-reverse">
                {MENU.map((e, i) => {
                  return <Link key={i} href={e.link}
                    className={`2xl:text-xl xl:text-lg text-base font-medium capitalize ${pathname === e.link ? "border-b-2 border-white" : ""}`}>{e.title}
                  </Link>
                })}

              </div>
              <Link href="/">
                <Image src="/images/logo.jpeg" alt="logo" width={135} height={112} className="w-[110px] md:hidden" />
              </Link>
            </div>
          </div>

          <Image
            src="/images/header.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0 max-h-[71px]" />

          <Image src="/images/header2.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0 max-h-[71px]" />
        </div>
      </div>

      <div className="md:hidden block bg-background -mb-[1px]">
        <div className="flex justify-between items-start relative z-10 w-full px-3 py-2">
          <Link href="/">
            <Image src="/images/logo.jpeg" alt="logo" width={70} height={70} />
          </Link>

          <span
            className="cursor-pointer md:hidden text-primary"
            onClick={() => {
              setOpen(true);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" /></svg> </span>
        </div>
        {/* <Image src="/images/header.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" />
            <Image src="/images/header2.svg" width={50} height={30} className="w-[350px] absolute top-0 mx-auto inset-0" /> */}
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
