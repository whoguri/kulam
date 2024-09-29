"use client";
import Image from "next/image";
import Slider from "react-slick";
import MobileImageSlider from "./MobileImageSlider";
import DesktopSideImages from "./DesktopSideImages";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5500,
    autoplay: true,
    arrows: false,
    pauseOnHover: true, // Stop sliding on hover
    pauseOnFocus: true, // Stop sliding on focus
  };

  const PROJECTS = [
    {
      img: "/images/1.png",
      title: "כולם בשביל כולם",
      subtitle: `.הוזלת יוקר המחיה באמצעות קנייה כמותית והטבות ארגוניות
יצירת הזדמנויות בתחומים שונים על ידי ארגון משותף של משאבים ושירותים

עזרה שיווקית עסקית לכל חבר בארגון המעוניין לקדם את מקצועו דרך אתר החברה, תוך מתן הנחה קבועה של לא פחות מ-10% לחברי הארגון`,
    },
    {
      img: "/images/2.png",
      title: "כולם בשביל כולם",
      subtitle: `יצירת עבודות מותאמות לחברי הארגון לפי חתך גילאים, במאמץ לכוון לעבודות נוספות לשעות הפנאי

מתן שירותים נוספים לחברי הארגון לשיפור איכות החיים ולהוזלתם

חסכון משמעותי בתחומים שונים כגון ביטוחים ודלק, על ידי כוח קנייה גדול ומרוכז`,
    },
    {
      img: "/images/3.png",
      title: "כולם בשביל כולם",
      subtitle: `עלות שותפות נמוכה של 10 ש"ח לחודש, הניתנת למחיקה על ידי צירוף 4 חברים נוספים
(Get Four Pay No More)

הנחות קבועות והוזלות משתנות לחברי הארגון על בסיס קנייה כמותית פעם בשבוע`,
    },
    {
      img: "/images/1.png",
      title: "כולם בשביל כולם",
      subtitle: `שקיפות ניהולית כאשר 5 ש"ח מתוך דמי החברות מוחזרים לחברי הארגון כתמלוגים ו-80% מהחצי השני מיועדים להגדלת ההטבות, והשאר לניהול ותפעול האתר והשטח.

עידוד כלכלי להגדלת הארגון למקסימום חברים, במטרה להגיע למעל חצי מיליון חברים, ואחר כך אפילו להשפיע פוליטית דרך מושבים שיבחרו דמוקרטית על ידי הארגון`,
    },
    {
      img: "/images/5.png",
      title: "כולם בשביל כולם",
      subtitle: `נמשיך לשתף פעולה ולעזור אחד לשני לשפר את איכות החיים של כולנו!`,
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
                        <div className=" md:text-xl md:font-thin paragraph 2xl:pt-4 xl:pt-4 pt-2 text-end rtl">
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
