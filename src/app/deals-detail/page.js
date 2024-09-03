import Layout from "@/components/Layout";
import deals from "@/pages/api/deals";
import Image from "next/image";

export default function DealsDetail() {
    return <Layout title="Deals Detail">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                <div className="text-center text-[46px] font-bold">Title</div>
                <div>
                    <Image src="/images/2.jpeg" alt="deal" height={200} width={200} className="mx-auto" />
                </div>
            </div>
        </div>
    </Layout>
}