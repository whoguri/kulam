"use client"
import Image from "next/image";
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
    return (<>
        <div>
            <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
                <div className="md:flex gap-10 w-full">
                    <div className="md:w-[15%] w-full flex md:flex-col flex-row md:gap-10 gap-3 justify-between  md:mb-0 mb-5">
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Deal 1</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Deal 2</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Deal 3</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Deal 4</div>
                    </div>
                    <div className="md:w-[70%] w-full">
                        <Slider {...settings}>
                            <div className="md:!flex justify-between gap-5 md:p-8 p-4 bg-white rounded-xl">
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
                            </div>
                        </Slider>
                    </div>
                    <div className="md:w-[15%] w-full flex md:flex-col flex-row md:gap-10 gap-3 justify-between md:mt-0 mt-14">
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Text</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Text</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Text</div>
                        <div className="bg-white w-full 2xl:py-9 xl:py-8 py-5 2xl:px-0 xl:px-0 px-3 text-center paragraph rounded-xl">Text</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
