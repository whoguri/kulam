import Hero from "@/components/home/Hero";
import Header from "@/components/Header"
import HomeBanner from "@/components/home/HomeBanner"
import { APP_NAME } from "@/constents/constArray";
import prisma from "@/lib/prisma";
import HomePost from "../components/HomePost"
export const metadata = {
  title: ` ${APP_NAME}`, description: "",
};

export default async function Home() {
  const deals = await prisma.deal.findMany({ take: 10, where: {} })
  const data = await prisma.appContent.findFirst({ where: { type: "WEEKLY_POST" } })

  return (<>
    <Header />
    <HomeBanner deals={deals} />
    <div className="gradient-bg">
      <Hero />
      <HomePost description={data?.description} />
    </div>
  </>
  );
}

export const dynamic = 'force-dynamic'; 
