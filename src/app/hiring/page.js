import { APP_NAME } from "@/constents/constArray";
import HiringComponent from "../../components/HiringComponent"
import prisma from "@/lib/prisma";
import Layout from "@/components/Layout";

export const metadata = {
    title: `Hiring | ${APP_NAME}`, description: "",
};

export default async function Hiring() {
    const data = await prisma.appContent.findFirst({ where: { type: "HIRING" } })
    return <Layout title="hiring">
        <HiringComponent description={data?.description || ""} />
    </Layout>
}

export const dynamic = 'force-dynamic'; 