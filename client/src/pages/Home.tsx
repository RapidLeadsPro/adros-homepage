import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
// @ts-ignore - Lenis types are incomplete
window.Lenis = Lenis;
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import PainAgitation from "@/components/sections/PainAgitation";
import OpportunityWindow from "@/components/sections/OpportunityWindow";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyAdros from "@/components/sections/WhyAdros";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
    }

    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Animate elements on scroll
    const sections = containerRef.current?.querySelectorAll("[data-animate]");
    
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <SocialProof />
      <PainAgitation />
      <OpportunityWindow />
      <HowItWorks />
      <WhyAdros />
      <FinalCTA />
      <Footer />
    </div>
  );
}
