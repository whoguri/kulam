import Hero from "@/components/Hero";
import Header from "@/components/Header"
import HomeBanner from "@/components/HomeBanner"

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
