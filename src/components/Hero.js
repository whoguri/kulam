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
        arrows: true,
    };
    return (<>
        <div className="gradient-bg">
            <div className="max-w-7xl mx-auto py-10">
                <div className="flex gap-10">
                    <div className="w-[10%] flex flex-col gap-10">
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Deal 1</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Deal 2</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Deal 3</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Deal 4</div>
                    </div>
                    <div className="w-4/5">
                        <Slider {...settings}>
                            <div className="!flex justify-between gap-10 py-8 px-8 bg-white rounded-xl">
                                <div className="w-[30%]">
                                    <Image src="/images/dummy.jfif" alt="dummy" width={225} height={224} className="rounded-xl" />
                                </div>
                                <div className="text-right w-[70%]">
                                    <h2 className="text-[46px] font-bold">Running Banners RTL</h2>
                                    <p className="text-xl font-medium pt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <button className="border border-white text-white px-4 py-[6px] mt-5 rounded-lg gradient-bg">Learn More</button>
                                </div>
                            </div>
                            <div className="!flex justify-between gap-10 py-8 px-8 bg-white rounded-xl">
                                <div className="w-[30%]">
                                    <Image src="/images/dummy.jfif" alt="dummy" width={225} height={224} className="rounded-xl" />
                                </div>
                                <div className="text-right w-[70%]">
                                    <h2 className="text-[46px] font-bold">Running Banners RTL</h2>
                                    <p className="text-xl font-medium pt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <button className="border border-white text-white px-4 py-[6px] mt-5 rounded-lg gradient-bg">Learn More</button>
                                </div>
                            </div>
                            <div className="!flex justify-between gap-10 py-8 px-8 bg-white rounded-xl">
                                <div className="w-[30%]">
                                    <Image src="/images/dummy.jfif" alt="dummy" width={225} height={224} className="rounded-xl" />
                                </div>
                                <div className="text-right w-[70%]">
                                    <h2 className="text-[46px] font-bold">Running Banners RTL</h2>
                                    <p className="text-xl font-medium pt-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    <button className="border border-white text-white px-4 py-[6px] mt-5 rounded-lg gradient-bg">Learn More</button>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="w-[10%] flex flex-col gap-10">
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Text</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Text</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Text</div>
                        <div className="bg-white py-8 text-center text-xl font-medium rounded-xl">Text</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
