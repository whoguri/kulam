import Layout from "@/components/Layout";
import Image from "next/image";

export default function DealsDetail() {
    return <Layout title="Deals Detail">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                <div className="text-center text-[46px] font-bold">Title</div>
                <div className="py-4">
                    <Image src="/images/2.jpeg" alt="deal" height={200} width={350} className="mx-auto rounded-md object-contain" />
                </div>
                <div className="paragraph 2xl:pt-4 xl:pt-4 pt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, </div>
            </div>
        </div>
    </Layout>
}