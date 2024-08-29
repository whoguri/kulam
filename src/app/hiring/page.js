import Layout from "@/components/Layout"
import { APP_NAME } from "../../../src/constents/constArray"

export const metadata = {
    title: `Hiring | ${APP_NAME}`, description: "",
};


export default function Hiring() {
    return <Layout title="hiring">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl h-[80vh] md:w-[70%] w-full mx-auto ">
                <div className="capitalize md:text-[46px] text-3xl font-bold text-center md:pb-8 pb-4"> Lorem Ipsum</div>
                <div className="md:text-xl text-base font-medium text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, </div>
            </div>
        </div>
    </Layout>
}