import Layout from "@/components/Layout";
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Privacy policy | ${APP_NAME}`, description: "",
};

export default function PrivacyPolicy() {
    return <Layout title="privacy policy">
        <div className="md:max-w-7xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto">
                <div className="capitalize md:text-[46px] text-3xl font-bold text-center md:pb-10 pb-5">Privacy Policy</div>
                <div className="text-xs font-medium text-end md:pb-10 pb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, </div>

                <div className="text-xs font-medium text-end md:pb-10 pb-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                </div>

                <div className="text-xs font-medium text-end md:pb-10 pb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
            </div>
        </div>
    </Layout>
}