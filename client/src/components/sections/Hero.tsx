import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0
    )
      .fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        0.4
      );
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById("final-cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Stop Hiring Agencies. Start Deploying AI That Actually Runs Your Ads.
        </h1>

        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Adros audits your campaigns, creates scroll-stopping ads from 3,298 winning patterns, deploys them to Meta & Google, and gets smarter every week. No marketing team required.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToWaitlist}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Join the Waitlist — Get Early Access
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Free early access for founding members. No credit card required.
        </p>
      </div>
    </section>
  );
}
