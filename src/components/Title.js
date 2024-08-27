import Image from "next/image";
export default function Title() {
    return (<>
        <div className="bg-background relative overflow-hidden">

            <div className="max-w-7xl mx-auto pt-10 relative z-20">

            </div>
            <Image src="/images/title2.svg" width={50} height={50} className="w-[100px] mx-auto absolute top-10 z-10 left-0" />
            <Image src="/images/title2.svg" width={50} height={50} className="w-[100px] mx-auto absolute top-0 z-10 -right-14 rotate-180" />
        </div>
    </>
    );
}
