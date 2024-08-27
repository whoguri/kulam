import Image from "next/image";
import Banner from "./Banner";

export default function Title() {
    return (<>
        <div className="bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto pt-10 relative z-20">
                <div className="text-right text-white">
                    <div className="flex items-center gap-5 justify-end">
                        <hr className="w-44" />
                    </div>
                    <Banner title="all For One" />
                </div>
                <div className="flex gap-6 items-center justify-center pt-16 pb-12 relative z-20">
                    <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 5</button>
                    <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 4</button>
                    <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 3</button>
                    <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 2</button>
                    <button className="px-4 py-[6px] text-lg rounded-lg gradient-bg text-white">Advertiser 1</button>
                </div>
                <Image src="/images/title.svg" width={50} height={50} className="w-[400px] mx-auto absolute bottom-0 right-0 z-10 left-0" />
            </div>
            <Image src="/images/title2.svg" width={50} height={50} className="w-[100px] mx-auto absolute top-10 z-10 left-0" />
            <Image src="/images/title2.svg" width={50} height={50} className="w-[100px] mx-auto absolute top-0 z-10 -right-14 rotate-180" />
        </div>
    </>
    );
}
