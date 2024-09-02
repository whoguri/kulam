import { APP_NAME } from "@/constents/constArray";
import prisma from "@/lib/prisma";
import ServiceComponent from "../../components/ServiceComponent"

export const metadata = {
    title: `Services | ${APP_NAME}`, description: "",
};

export default async function Services() {
    const data = await prisma.appContent.findFirst({ where: { type: "SERVICES" } })
    return <div>
        <ServiceComponent description={data?.description || ""} />
    </div>
}

export const dynamic = 'force-dynamic'; 