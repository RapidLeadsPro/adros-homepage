import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;
    if (!headline || !subheadline || !cta) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
      .fromTo(subheadline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
      .fromTo(cta, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 0.35);

    if (bg) {
      gsap.fromTo(bg, { opacity: 0.6 }, { opacity: 1, duration: 1.2, delay: 0.2 });
    }
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById("final-cta");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-28 overflow-hidden">
      {/* Gradient orbs — stronger, layered */}
      <div ref={bgRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-purple-500/25 rounded-full blur-[100px] motion-safe:animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] motion-safe:animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Stop Hiring Agencies. Start Deploying AI That Actually Runs Your Ads.
        </h1>

        <p
          ref={subheadlineRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Adros audits your campaigns, creates scroll-stopping ads from 3,298 winning patterns, deploys them to Meta & Google, and gets smarter every week. No marketing team required.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToWaitlist}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
          >
            Join the Waitlist — Get Early Access
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-5">
          Free early access for founding members. No credit card required.
        </p>
      </div>
    </section>
  );
}
