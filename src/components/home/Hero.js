"use client";
import Image from "next/image";
import Slider from "react-slick";
import MobileImageSlider from "./MobileImageSlider";
import DesktopSideImages from "./DesktopSideImages";
import { useState } from "react";
import { useSession } from "next-auth/react";
import GetSubscriptionModal from "../auth/GetSubscriptionModal";

export default function Hero() {
  const [index, setIndex] = useState(0)
  const { status, data } = useSession();
  const sessionUser = data?.user || {};
  const showSubscription = ((sessionUser?.subscriptions || []).length === 0 && status === "authenticated")
  const [openSubsriptionModal, setOpenSubsriptionModal] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4500,
    autoplay: true,
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    afterChange: i => (
      setIndex(i)
    ),
    // appendDots: dots => (
    //   <div className="p-1" >
    //     <ul className="m-0"> {dots} </ul>
    //   </div>
    // ),
    customPaging: i => (<div className="mx-[2px]">
      <div className={`bg-white ${i === index ? "px-3" : "px-2"} rounded-xl`}>{i + 1}</div>
    </div>)
  };

  const PROJECTS = [
    {
      img: "/images/1.png",
      title: "כולם בשביל כולם",
      subtitle:
        "הסיבה להקמת ארגון כולם בשביל כולם הוא לפתור בעיה קיימת שבה כל המחירים מסביב עולים חוץ מהמשכורות ואיך על ידי נתינת  אפשרויות להכנסה נוספת והוזלת העלויות על ידי קנייה כמותית",
    },
    {
      img: "/images/2.png",
      title: "כולם בשביל כולם",
      subtitle:
        "הדרך והסיבה שקוראים לארגון כולם בשביל כולם הוא בגלל שהארגון בנוי על שיתוף פעולה בין כל חברי הארגון גם בהגדלת הארגון על ידי הוספת כל החברים והאנשים שחברי הארגון מכירים וגם בהקשבה לצרכי הארגון ומה הכי בוער להוזיל כרגע",
    },
    {
      img: "/images/3.png",
      title: "כולם בשביל כולם",
      subtitle:
        "כל דבר שקשור בגדילת הארגון וההוזלות יוצר עזרה אמיתית לכולם בהוזלת יוקר המחיה כרגע ההצטרפות למועדון הלקוחות הוא חינם ויתחיל לעלות 10 שח בחודש רק ברגע בוא הארגון יתן הנחות משמעותיות לחבריו שיעלו בהרבה מהעלות החודשית",
    },
    {
      img: "/images/1.png",
      title: "כולם בשביל כולם",
      subtitle:
        "מכיוון שבשביל לייצר הוזלות משמעותיות צריכים ארגון גדול מאוד כלומר אלפים עשרות אלפים ועוד אז קודם כל צריך לייצר את הארגון ולכן פונה לכל מי שאכפת לו מיוקר המחיה להצטרף ולצרף כל מי שהוא מכיר על מנת שנוכל לעזור לכמה שיותר אנשים",
    },
    {
      img: "/images/5.png",
      title: "כולם בשביל כולם",
      subtitle: `הצירוף  לארגון הוא פשוט נרשמים כלקוח חדש והם מקבלים לינק שאפשר לשלוח לכל החברים עם הסבר קצר על החברה אליה מצטרפים שמטרתה הוזלת יוקר המחיה או למי שלא יכול להירשם לבד יש אפשרות לרשום אותו בעצמכם`,
    },
    {
      img: "/images/5.png",
      title: "כולם בשביל כולם",
      subtitle:
        "כל מי שנרשם לארגון נרשם כיחידה משפחתית  וזכאי לכל ההטבות שהארגון נותן יש לציין שארגון בא למטרה לעזור לכולם בכל תחומי החיים ולא רק בקניית מוצרי מזון פרטים תוכלו לראות באתר ולקבל אינפורמציה עם הזמן",
    },
    {
      img: "/images/handshake.jpg",
      title: "כולם בשביל כולם",
      subtitle:
        "מאחל לכולנו שיתוף פעולה מעניין ופורה ושנצליח להגיע לכמה שיותר אנשים כדי שנוכל באמת לשנות את המציאות במדינה בהצלחה לכולנו",
    },
  ];

  const IMAGES_1 = [
    { title: "ביטוחים", img: "1.jpeg" },
    { title: "משכנתאות", img: "2.jpeg" },
    { title: "טיסות", img: "3.jpeg" },
    { title: "בתי מלון", img: "4.jpeg" },
  ];
  const IMAGES_2 = [
    { title: "דלק", img: "5.jpeg" },
    { title: "סופר מרקטים", img: "6.jpeg" },
    { title: "מוצרי אלקטרוניקה", img: "7.jpeg" },
    { title: "רהיטים", img: "8.jpeg" },
  ];

  return (
    <>
      <div>
        {openSubsriptionModal && <GetSubscriptionModal
          onClose={() => {
            setOpenSubsriptionModal(false)
          }} />}

        {showSubscription && <div className="2xl:max-w-7xl xl:max-w-6xl max-w-full mx-auto pt-10">
          <div className="md:p-10 p-4 bg-white bg-opacity-65 rounded-xl md:w-[70%] w-[90%] mx-auto py-7">
            <div className="flex md:flex-row flex-col-reverse items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenSubsriptionModal(true)
                }} className="disabled:pointer-events-none disabled:opacity-80 bg-background px-6 py-2 border border-background text-white rounded-md text-base uppercase hover:bg-white hover:bg-opacity-25 hover:text-background font-semiboldlg md:mt-0 mt-2">הרשמה כחבר</button>

              <div className="md:text-4xl text-xl">הרשמה כחבר כדי להנות מהטבות</div>
            </div>
          </div>
        </div>}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-full mx-auto py-10">
          <div className="md:flex gap-10 w-full">
            <div className="md:w-[15%] w-full flex md:flex-col flex-row md:gap-10 gap-3 justify-between md:mb-0 mb-5 overflow-hidden">
              <DesktopSideImages IMAGES={IMAGES_1} />

              <MobileImageSlider IMAGES={IMAGES_1} />
            </div>
            <div className="md:w-[70%] w-[90%] mx-auto">
              <Slider {...settings}>
                {PROJECTS.map((e, i) => (
                  <div key={i} className="px-[2px]">
                    <div className="min-h-[42px] md:min-h-[500px] md:!flex justify-between gap-5 md:p-8 p-4 bg-white rounded-xl h-96">
                      <div className="md:w-[30%] w-full">
                        <Image
                          src={`${e.img}`}
                          alt={`/images/${i + 1}.png`}
                          width={150}
                          height={200}
                          className="object-fill mx-auto"
                        />
                      </div>
                      <div className="text-end md:w-[70%] w-full md:pt-0 pt-1">
                        <h2 className="subheading">{e.title}</h2>
                        <div className="md:text-xl md:font-thin paragraph 2xl:pt-4 xl:pt-4 pt-2 text-end rtl">
                          {e.subtitle.split("\n\n").map((paragraph, pIndex) => (
                            <p key={pIndex} className="mb-4">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div className="md:!flex justify-between gap-5 md:p-8 p-4 bg-white rounded-xl">
                                <div className="md:w-[30%] w-full">
                                    <Image src="/images/dummy.jfif" alt="dummy" width={225} height={224} className="rounded-xl md:w-[225px] w-full" />
                                </div>
                                <div className="text-end md:w-[70%] w-full md:pt-0 pt-6">
                                    <h2 className="subheading">Running Banners RTL</h2>
                                    <p className="paragraph 2xl:pt-4 xl:pt-4 pt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <button className="border border-white text-white px-4 py-[6px] md:mt-6 mt-4 md:text-lg text-sm rounded-lg gradient-bg">Learn More</button>
                                </div>
                            </div>
                            <div className="md:!flex justify-between gap-5 md:p-8 p-4 bg-white rounded-xl">
                                <div className="md:w-[30%] w-full">
                                    <Image src="/images/dummy.jfif" alt="dummy" width={225} height={224} className="rounded-xl md:w-[225px] w-full" />
                                </div>
                                <div className="text-end md:w-[70%] w-full md:pt-0 pt-6">
                                    <h2 className="subheading">Running Banners RTL</h2>
                                    <p className="paragraph 2xl:pt-4 xl:pt-4 pt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <button className="border border-white text-white px-4 py-[6px] md:mt-6 mt-4 md:text-lg text-sm rounded-lg gradient-bg">Learn More</button>
                                </div>
                            </div> */}
              </Slider>
            </div>
            <div className="md:w-[15%] w-full grid grid-cols-2 md:flex md:flex-col flex-row md:gap-10 gap-3 justify-between md:mt-0 mt-14 overflow-hidden">
              <DesktopSideImages IMAGES={IMAGES_2} />
              <MobileImageSlider IMAGES={IMAGES_2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
