"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Image from "next/image";
import Slider from "react-slick";

export default function Polls() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        // autoplay: true,
        arrows: true,
    };
    return (<>
        <Header />
        <Title />
        <div className="gradient-bg">
            <div className="max-w-7xl mx-auto pt-10 pb-20">
                <div className="w-4/5 mx-auto">
                    <Slider {...settings}>
                        <div className="py-8 px-8 bg-white rounded-xl text-right">
                            <h2 className="text-4xl font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting ?industry.</h2>
                            <div className="flex">

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
            </div>
        </div>
        <Footer />
    </>
    );
}
