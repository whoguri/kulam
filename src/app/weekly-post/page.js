import { APP_NAME } from "@/constents/constArray";
import prisma from "@/lib/prisma";
import WeeklyPostComponent from "@/components/WeeklyPostComponent";

export const metadata = {
    title: `Weekly Post | ${APP_NAME}`, description: "",
};

export default async function WeeklyPost() {
    const data = await prisma.appContent.findFirst({ where: { type: "WEEKLY_POST" } })
    return <div>
        <WeeklyPostComponent description={data?.description || ""} />
    </div>
}

export const dynamic = 'force-dynamic'; 