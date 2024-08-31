"use client"
import Image from "next/image";
import { title } from "process";
import Slider from "react-slick";

export default function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        arrows: false,
    };
    const PROJECTS = [
      {
        img: "/images/1.jpeg",
        title: "כולם בשביל כולם",
        subtitle: ` הוזלת יוקר המחיה באמצעות קנייה כמותית והטבות ארגוניות.
 יצירת הזדמנויות בתחומים שונים על ידי ארגון משותף של משאבים ושירותים.
עזרה שיווקית עסקית לכל חבר בארגון המעוניין לקדם את מקצועו דרך אתר החברה, תוך מתן הנחה קבועה של לא פחות מ-10% לחברי הארגון.`,
      },
      {
        img: "/images/2.jpeg",
        title: "כולם בשביל כולם",
        subtitle: `יצירת עבודות מותאמות לחברי הארגון לפי חתך גילאים, במאמץ לכוון לעבודות נוספות לשעות הפנאי.
מתן שירותים נוספים לחברי הארגון לשיפור איכות החיים ולהוזלתם.
 חסכון משמעותי בתחומים שונים כגון ביטוחים ודלק, על ידי כוח קנייה גדול ומרוכז.`,
      },
      {
        img: "/images/4.jpeg",
        title: "כולם בשביל כולם",
        subtitle: ` עלות שותפות נמוכה של 10 ש"ח לחודש, הניתנת למחיקה על ידי צירוף 4 חברים נוספים (Get Four Pay No More).
הנחות קבועות והוזלות משתנות לחברי הארגון על בסיס קנייה כמותית פעם בשבוע.`,
      },
      {
        img: "/images/5.jpeg",
        title: "כולם בשביל כולם",
        subtitle: ` שקיפות ניהולית כאשר 5 ש"ח מתוך דמי החברות מוחזרים לחברי הארגון כתמלוגים ו-80% מהחצי השני מיועדים להגדלת ההטבות, והשאר לניהול ותפעול האתר והשטח.
 עידוד כלכלי להגדלת הארגון למקסימום חברים, במטרה להגיע למעל חצי מיליון חברים, ואחר כך אפילו להשפיע פוליטית דרך מושבים שיבחרו דמוקרטית על ידי הארגון.`,
      },
      {
        img: "/images/6.jpeg",
        title: "כולם בשביל כולם",
        subtitle: `נמשיך לשתף פעולה ולעזור אחד לשני לשפר את איכות החיים של כולנו!`,
        },
      
    //   { img: "/images/7.jpeg", title: "כולם בשביל כולם", subtitle: "" },
    //   { img: "/images/8.jpeg", title: "כולם בשביל כולם", subtitle: "" },
    ];
    return (
      <>
        <div>
          <div className="2xl:max-w-7xl xl:max-w-6xl max-w-full mx-auto py-10">
            <div className="md:flex gap-10 w-full">
              <div className="md:w-[15%] w-full flex md:flex-col flex-row md:gap-10 gap-3 justify-between md:mb-0 mb-5 overflow-hidden">
                <div className="md:block hidden">
                  <div className=" flex md:flex-col flex-row md:gap-10 gap-3">
                    <Image
                      src="/images/1.jpeg"
                      alt="1"
                      width={225}
                      height={224}
                      className="rounded-xl md:w-full w-28 h-28  object-cover"
                    />
                    <Image
                      src="/images/2.jpeg"
                      alt="2"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/3.jpeg"
                      alt="3"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/4.jpeg"
                      alt="4"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                  </div>
                </div>
                <div className="md:hidden block">
                  <div className=" slider-to-left flex md:flex-col flex-row md:gap-10 gap-3">
                    <Image
                      src="/images/1.jpeg"
                      alt="1"
                      width={225}
                      height={224}
                      className="rounded-xl md:w-full w-28 h-28  object-cover"
                    />
                    <Image
                      src="/images/2.jpeg"
                      alt="2"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/3.jpeg"
                      alt="3"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/4.jpeg"
                      alt="4"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-[70%] w-[90%] mx-auto">
                <Slider {...settings}>
                  {PROJECTS.map((e, i) => (
                    <div key={i}>
                      <div className="md:!flex justify-between gap-5 md:p-8 p-4 bg-white rounded-xl ">
                        <div className="md:w-[30%] w-full">
                          <Image
                            src={e.img}
                            alt="{e.img}"
                            width={225}
                            height={224}
                            className="rounded-xl md:w-[225px] w-full md:h-[225px] h-[200px] object-cover"
                          />
                        </div>
                        <div className="text-end md:w-[70%] w-full md:pt-0 pt-6">
                          <h2 className="subheading">{e.title}</h2>
                          <p className="paragraph 2xl:pt-4 xl:pt-4 pt-2 rtl text-right">
                            {e.subtitle}
                          </p>
                          {/* <button className="border border-white text-white px-4 py-[6px] md:mt-6 mt-4 md:text-lg text-sm rounded-lg gradient-bg">
                            Learn More
                          </button> */}
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
                <div className="md:block hidden">
                  <div className=" flex md:flex-col flex-row md:gap-10 gap-3">
                    <Image
                      src="/images/5.jpeg"
                      alt="5"
                      width={225}
                      height={224}
                      className="rounded-xl md:w-full w-28 h-28  object-cover"
                    />
                    <Image
                      src="/images/6.jpeg"
                      alt="6"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/7.jpeg"
                      alt="7"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/8.jpeg"
                      alt="8"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                  </div>
                </div>
                <div className="md:hidden block">
                  <div className=" slider-to-left flex md:flex-col flex-row md:gap-10 gap-3">
                    <Image
                      src="/images/5.jpeg"
                      alt="5"
                      width={225}
                      height={224}
                      className="rounded-xl md:w-full w-28 h-28  object-cover"
                    />
                    <Image
                      src="/images/6.jpeg"
                      alt="6"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/7.jpeg"
                      alt="7"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                    <Image
                      src="/images/8.jpeg"
                      alt="8"
                      width={225}
                      height={224}
                      className="rounded-xl w-full h-28 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
