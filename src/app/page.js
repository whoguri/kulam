import Hero from "@/components/Hero";
import Header from "@/components/Header"
import HomeBanner from "@/components/HomeBanner"
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
