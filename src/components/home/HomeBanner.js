"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";

export default function HomeBanner({ deals = [] }) {
  const { status } = useSession()
  const [openAuthModal, setOpenAuthModal] = useState(false)


  return (
    <div className="bg-background relative overflow-hidden">
      {openAuthModal && <AuthModal onClose={() => { setOpenAuthModal(false) }} />}
      <div className="reys"></div>
      <div className="tv"></div>
      <div className="flex flex-col  2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:pt-10 pt-1 relative z-20">
        <div className="flex flex-col items-center xl:items-end md:gap-5 gap-0">
          {/* <hr className="md:w-44 w-16" /> */}
          <h3 className="md:text-sm text-sm md:text-end text-primary tracking-widest">
            קובי כץ מציג
          </h3>

          <motion.h2 animate={{ scale: [1, 1.2, 0.6, 1, 1], rotate: [0, 3, 0] }} transition={{ duration: 1.4 }} className="z-10 xl:text-8xl text-5xl md:text-6xl leading-none uppercase md:py-1 font-bold text-primary text-end">
            כולם בשביל כולם
          </motion.h2>

          <motion.div
            animate={{ scale: [1, 0.5, 1.1, 1] }}
            transition={{ duration: 1.4 }}
          // className="animate-breathing"
          >
            <Image src="/images/handshaketr.png" alt="logo" width={333} height={112} className="pt-2" />
          </motion.div>
        </div>

        <h3 className="text-center xl:text-end z-50 font-thin text-[1.8rem] md:text-4xl text-white tracking-widest pb-4 w-full">
          יחד נוזיל את יוקר המחיה
        </h3>
        <div className="text-white flex flex-col gap-5 pt-0 w-full items-center xl:hidden md:hidden ">
          {status === "unauthenticated" && <button
            className="cursor-pointer mx-auto relative overflow-hidden rounded-lg"
            onClick={() => {
              setOpenAuthModal(true)
            }}>
            <span className="absolute inset-0 w-4 h-4 bg-white animate-sparkle rounded-full transform rotate-45"></span>

            <span className=" inline-block px-8 2xl:py-[6px] xl:py-[6px] py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm">
              {status === "authenticated" ? "יציאה" : "כניסה"}
            </span>
          </button>}
          <p className="text-center 2xl:text-lg xl:text-base text-sm">
            הצטרפו אלינו ותהנו מהטבות והצעות מיוחדות
          </p>

          {/* <button className="border border-white px-4 py-[6px] rounded-lg hover:bg-gradient-to-t from-[#F5BC46] to-[#ee7b31]">Sign Up</button> */}
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-3 2xl:w-[70%] w-full mx-auto md:gap-6 gap-3 items-center justify-center md:pt-16 pt-10 md:pb-12 pb-8 relative z-20" style={{ direction: "rtl" }}>
          {deals.map((e, i) => {
            return <button key={i} className="md:px-4 px-2 md:py-[6px] py-1 md:text-lg text-sm rounded-lg border bg-opacity-20 bg-white text-white animate-breathing">
              <span className="line-clamp-1">{e.name}</span>
            </button>
          })}
        </div>
        <Image src="/images/title.svg" alt="kulam" width={50} height={50} className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0 max-h-[70px]" />
      </div>

      <Image
        src="/images/title2.svg" alt="kulam" width={50} height={50} className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-10 z-10 left-0" />

      <Image
        src="/images/title2.svg" alt="kulam" width={50} height={50} className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180" />
    </div>
  );
}
