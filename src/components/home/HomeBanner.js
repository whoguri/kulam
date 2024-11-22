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
      {openAuthModal && (
        <AuthModal
          onClose={() => {
            setOpenAuthModal(false);
          }}
        />
      )}
      <div className="reys"></div>
      <div className="tv"></div>
      <div className="flex flex-col  2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:pt-10 pt-1 relative z-20">
        <div className="flex flex-col items-center xl:items-end md:gap-5 gap-0">
          {/* <hr className="md:w-44 w-16" /> */}
          <h3 className="md:text-sm text-sm md:text-end text-primary tracking-widest">
            קובי כץ מציג
          </h3>

          <motion.h2
            animate={{ scale: [1, 1.2, 0.6, 1, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 1.4 }}
            className="z-10 xl:text-8xl text-5xl md:text-6xl leading-none uppercase md:py-1 font-bold text-primary text-end"
          >
            כולם בשביל כולם
          </motion.h2>

          <motion.div
            animate={{ scale: [1, 0.5, 1.1, 1] }}
            transition={{ duration: 1.4 }}
            // className="animate-breathing"
          >
            <Image
              src="/images/handshaketr.png"
              alt="logo"
              width={333}
              height={112}
              className="pt-2"
            />
          </motion.div>
        </div>

        <h3 className="text-center xl:text-end z-50 font-thin text-[1.8rem] md:text-4xl text-white tracking-widest pb-4 w-full">
          יחד נוזיל את יוקר המחיה
        </h3>
        {/* <div className="text-right rt text-white l">
          <p>
            כל הנתונים מתייחסים למצב בו משלמים את המינימום החודשי של 10 שח לחודש
            ומתחיל מהיום הראשון שהחברות במועדון תעלה כסף ותתחיל לחסוך כסף
            משמעותי לחברי האירגון
          </p>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              const content = document.getElementById("moreContent");
              if (content) {
                content.style.display =
                  content.style.display === "none" ? "block" : "none";
              }
              const button = document.getElementById("readMoreButton");
              if (button) {
                button.textContent =
                  button.textContent === "קרא עוד" ? "הסתר" : "קרא עוד";
              }
            }}
            id="readMoreButton"
          >
            קרא עוד
          </button>
          <div id="moreContent" style={{ display: "none" }}>
            <p>במידה ומשלמים יותר גם הבונוס גדל בהתאמה:</p>
            <p>דור 1 25% מוגבל ל-100 איש לכן 250 שח</p>
            <p>דור 2 15% מוגבל ל-1,000 איש לכן 1,500 שח</p>
            <p>דור 3 10% מוגבל ל-10,000 איש לכן 10,000 שח</p>
            <p>סך הכל 3 דורות 11,750 שח</p>
            <p>תוכנית התגמולים:</p>
            <p>
              הדרך בה אני מחלק 50% מהכנסות הארגון לכל האנשים שעוזרים ביום יום
              להגדלתו והדרך ליצור מזה גם כסף:
            </p>
            <p>
              1. 25% על הדור הראשון (כלומר צרופים אישיים למועדון) עד 100 אנשים
              (100×2.5=250)
            </p>
            <p>
              2. 15% על הדור השני (אנשים שמצרפים האישיים צירפו למועדון) עד 1,000
              איש (1,000×1.5=1,500)
            </p>
            <p>
              3. 10% על הדור השלישי (מצורפים שצורפו על ידי מצורפים של מצורפים
              אישיים בארגון) עד 10,000 איש (10,000×1=10,000)
            </p>
            <p>
              4. בונוס שייכנס בעתיד הרחוק יותר כרגע אין צורך לייחס לו חשיבות -
              10% מסך הנקודות של הרגל הקטנה בעסק (העסק בנוי בצורה בינארית כל אדם
              בארגון מקבל שתי זוגות רגליים בהם הוא מצרף אנשים, ועל מנת לתגמל
              אנשים על איזון בין שני המרכזים העסקיים שלהם אני מתגמל על פי הרגל
              הקטנה). בונוס זה אינו מוגבל בסכום לעת עתה ובונוס זה כרגע במצב
              ניסיוני.
            </p>
            <p>בעתיד בכולם בשביל כולם:</p>
            <p>
              נגיע לכל החנויות ולאנשים פרטיים, נעזור לכולם בהוזלת הסחורות
              המגיעות לחנויות ולקונה הפרטי.
            </p>
          </div>
        </div> */}
        <div className="scroll-container ">
                <div
                  className="scroll-content grid lg:grid-cols-5 grid-cols-3 2xl:w-[70%] w-full mx-auto md:gap-6 gap-3 items-center justify-center md:pt-16 pt-10 md:pb-12 pb-8 relative z-20"
                  style={{ direction: "rtl" }}
                >
                  {deals.map((e, i) => {
                    return (
                      <button
                        key={i}
                        className="px-10 py-5 md:py-[6px] text-2xl md:text-lg  rounded-lg border bg-opacity-20 bg-white text-white animate-breathing flex-none"
                      >
                        <span className="line-clamp-1">{e.name}</span>
                      </button>
                    );
                  })}
                </div>
        </div>
        <img
          src="/images/title.svg"
          alt="kulam"
          width={50}
          height={50}
          className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0 max-h-[70px]"
        />
      </div>

      <img
        src="/images/title2.svg"
        alt="kulam"
        width={50}
        height={50}
        className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-10 z-10 left-0"
      />

      <img
        src="/images/title2.svg"
        alt="kulam"
        width={50}
        height={50}
        className="md:w-[100px] w-[60px] max-h-20 mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180"
      />
    </div>
  );
}
