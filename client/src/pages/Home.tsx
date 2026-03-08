import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const triggers: ScrollTrigger[] = [];

    // Section-level: animate when section enters viewport (native scroll)
    const sections = container.querySelectorAll('[data-animate="section"]');
    sections.forEach((section) => {
      const t = gsap.fromTo(
        section,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    // Stagger children inside sections that have [data-animate="item"]
    const staggerContainers = container.querySelectorAll("[data-animate-stagger]");
    staggerContainers.forEach((parent) => {
      const items = parent.querySelectorAll('[data-animate="item"]');
      if (items.length === 0) return;
      const t = gsap.fromTo(
        items,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    scrollTriggersRef.current = triggers;
    // Refresh after layout so in-view sections animate immediately
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
      triggers.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
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
