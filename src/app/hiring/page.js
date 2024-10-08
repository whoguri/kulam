import { APP_NAME } from "@/constents/constArray";
import HiringComponent from "../../components/HiringComponent"
import prisma from "@/lib/prisma";

export const metadata = {
    title: `Hiring | ${APP_NAME}`, description: "",
};

export default async function Hiring() {
    const data = await prisma.appContent.findFirst({ where: { type: "HIRING" } })
    return <div>
        <HiringComponent description={data?.description || ""} />
    </div>
}

export const dynamic = 'force-dynamic'; 