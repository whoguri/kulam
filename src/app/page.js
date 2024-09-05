import Hero from "@/components/home/Hero";
import Header from "@/components/Header"
import HomeBanner from "@/components/home/HomeBanner"
import { APP_NAME } from "@/constents/constArray";
import prisma from "@/lib/prisma";

export const metadata = {
  title: ` ${APP_NAME}`, description: "",
};

export default async function Home() {
  const deals = await prisma.deal.findMany({ take: 5, where: {} })

  return (<>
    <Header />
    <HomeBanner deals={deals} />
    <div className="gradient-bg">
      <Hero />
    </div>
  </>
  );
}

export const dynamic = 'force-dynamic'; 
