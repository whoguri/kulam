import Image from "next/image";
import Layout from "@/components/Layout"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Profile | ${APP_NAME}`, description: "",
};

export default function Profile() {
    return <Layout title="Profile">
        <div className="max-w-7xl mx-auto py-10 h-screen">
            <div>
                <div className="py-8 px-10 bg-white rounded-xl h-[90vh]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-5">
                            <Image src="/images/user.png" alt="user" height={170} width={170} />
                            <div>
                                <div className="capitalize text-[32px]">Gurwinder Singh</div>
                                <div className="capitalize text-xl">Member Since</div>
                                <div className="capitalize text-xl"> Jan 2024</div>
                            </div>
                        </div>
                        <div>
                            <div className="capitalize text-[32px]">My Balance</div>
                            <div className="capitalize text-xl">2000</div>
                            <div className="text-xl font-semibold text-[#0039CC] underline underline-offset-8 pt-1"> Copy referral link</div>
                        </div>
                    </div>
                    <hr className="border-b border-black mt-5" />
                </div>
            </div>
        </div>
    </Layout>
}