"use client"
import Image from "next/image"
import { motion } from "framer-motion";

export default function HomeBanner() {
  return (
    <div className="bg-background relative overflow-hidden">
      <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:pt-10 pt-1 relative z-20">
        <div className="flex flex-col items-right md:gap-5 gap-0 items-end ">
          {/* <hr className="md:w-44 w-16" /> */}
          <h3 className="md:text-sm text-sm text-right text-primary">
            קובי כץ מציג
          </h3>
          <motion.h2
            animate={{ scale: [1, 1.2, 0.6, 1, 1], rotate: [0, 3, 0] }}
            transition={{ duration:1.4}}
            className="z-10 xl:text-7xl text-5xl md:text-6xl leading-none uppercase md:py-1  font-bold text-primary text-end"
          >
            כולם בשביל כולם
          </motion.h2>
          <motion.div
            animate={{ scale: [1,.5, 1.1,  1]}}
            transition={{ duration: 1.4 }}
            className="flex flex-col items-end w-full"
          >
            <Image
              src="/images/handshake.jpg"
              alt="logo"
              width={333}
              height={112}
              className="pt-2  "
            />
          </motion.div>
        </div>

        <h3 className="font-thin text-[1.8rem]  md:text-4xl xl:text-[2.4rem] text-end text-secondary tracking-widest pb-10">
          יחד נוזיל את יוקר המחיה
        </h3>

        {/* <div className="grid lg:grid-cols-5 grid-cols-3 2xl:w-[70%] w-full mx-auto md:gap-6 gap-3 items-center justify-center md:pt-16 pt-10 md:pb-12 pb-8 relative z-20">
          <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">
            מפרסם 5
          </button>
          <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">
            מפרסם 4
          </button>
          <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">
            מפרסם 3
          </button>
          <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">
            מפרסם 2
          </button>
          <button className="md:px-4 px-3 py-[6px] md:text-lg text-sm rounded-lg gradient-bg text-white">
            מפרסם 1
          </button>
        </div> */}
        <Image
          src="/images/title.svg"
          width={50}
          height={50}
          className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0 max-h-[70px]"
        />
      </div>
      <Image
        src="/images/title2.svg"
        width={50}
        height={50}
        className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-10 z-10 left-0"
      />
      <Image
        src="/images/title2.svg"
        width={50}
        height={50}
        className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180"
      />
    </div>
  );
}