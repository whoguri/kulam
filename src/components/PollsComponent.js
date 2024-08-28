"use client"
import Slider from "react-slick";

export default function PollsComponent() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        // autoplay: true,
        arrows: false,
    };
    return (<>
        <div className="gradient-bg">
            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
                <div className="md:w-[70%] w-full mx-auto">
                    <Slider {...settings}>
                        <div className="md:py-8 py-4 md:px-8 px-4 bg-white rounded-xl text-end">
                            <h2 className="md:text-4xl text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-bold">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                        <div className="md:py-8 py-4 md:px-8 px-4 bg-white rounded-xl text-end">
                            <h2 className="md:text-4xl text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-bold">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                        <div className="md:py-8 py-4 md:px-8 px-4 bg-white rounded-xl text-end">
                            <h2 className="md:text-4xl text-xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="py-6">
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-bold">Opt yes 1</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end my-2">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 2</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                                <div className="flex gap-7 items-center justify-end">
                                    <h2 className="md:text-[22px] text-sm font-medium">Opt yes 3</h2>
                                    <input type="radio" className="border border-background py-3 px-3 rounded-full" />
                                </div>
                            </div>
                            <button className="border border-white gradient-bg md:py-[6px] py-1 md:px-10 px-5 rounded-lg text-white md:text-lg text-sm font-medium">Skip</button>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    </>
    );
}
