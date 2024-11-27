import { FeaturesSectionDemo } from "./components/AIInterview";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { Hero3 } from "./components/Hero3";
import { Hero4 } from "./components/Hero4";
import { HeroScrollDemo } from "./components/Hero5";
import ScrollBasedVelocityText from "./components/scroll";
import { AnimatedTestimonialsDemo } from "./components/testimonial";
import Hero2 from "./components/ui/Hero2";

export default function Home() {
  return <>
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-x-hidden">
      <Hero />
      <ScrollBasedVelocityText/>
      <Hero2 />
      <Hero3 />
      <Hero4 />
      <HeroScrollDemo/>
      <FeaturesSectionDemo/>
      <AnimatedTestimonialsDemo/>
      <Footer/>
    </main>
  </>
}
