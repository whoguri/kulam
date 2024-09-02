import Hero from "@/components/home/Hero";
import Header from "@/components/Header"
import HomeBanner from "@/components/home/HomeBanner"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
  title: ` ${APP_NAME}`, description: "",
};

export default function Home() {
  return (<>
    <Header />
    <HomeBanner />
    <div className="gradient-bg">
      <Hero />
    </div>
  </>
  );
}
