import { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Zap, Shield, Clock, Star } from 'lucide-react';

/**
 * Adros AI Pricing Page
 * Design: Dark SaaS, Space Grotesk headings + DM Sans body
 * Plans: Free, Pro ($99/mo), Enterprise (Custom)
 * Add-on: Done-For-You Setup (USD 997)
 */

function useRevealOnScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '500px 0px 500px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observerRef.current?.observe(el));

    // Immediate fallback - reveal everything after 300ms
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    }, 300);

    return () => {
      clearTimeout(fallback);
      observerRef.current?.disconnect();
    };
  }, []);
}

export default function Pricing() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-[#0c1220] text-white">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.25s; }
        .hero-fade {
          opacity: 0; transform: translateY(20px);
          animation: heroFadeIn 0.7s ease-out forwards;
        }
        .hero-fade-1 { animation-delay: 0.1s; }
        .hero-fade-2 { animation-delay: 0.2s; }
        .hero-fade-3 { animation-delay: 0.3s; }
        @keyframes heroFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container max-w-4xl text-center">
          <p className="hero-fade hero-fade-1 text-sm font-medium text-purple-400 mb-3 tracking-wider uppercase">
            Pricing
          </p>
          <h1
            className="hero-fade hero-fade-2 text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="hero-fade hero-fade-3 text-lg text-gray-400 max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="reveal reveal-delay-1 p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Free Trial</h3>
                <p className="text-sm text-gray-500">7-day trial to explore</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$0</span>
                <span className="text-sm text-gray-500 ml-1">/7 days</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  { text: 'Connect 1 ad account', included: true },
                  { text: 'Basic campaign audit', included: true },
                  { text: 'Limited market research', included: true },
                  { text: 'Up to 5 AI queries/day', included: true },
                  { text: 'Community support', included: true },
                  { text: 'Memory & learning', included: false },
                  { text: 'Auto deploy to ad platforms', included: false },
                ].map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm ${feature.included ? 'text-gray-400' : 'text-gray-600 line-through'}`}>
                    {feature.included ? <Check className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-red-500/60 shrink-0 mt-0.5" />}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-semibold"
              >
                <a href="https://app.adros.ai">Start 7-Day Trial</a>
              </Button>
            </div>

            {/* Pro Plan — Featured */}
            <div className="reveal reveal-delay-2 p-8 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#39FF14] to-cyan-500 text-xs font-semibold text-black">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pro</h3>
                <p className="text-sm text-gray-500">Full AI marketing department</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$99</span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Unlimited ad accounts',
                  'Full marketing loop (Research → Deploy → Learn)',
                  'Access to 3,298 winning ad patterns',
                  'AI creative generation',
                  'Campaign auto-deployment',
                  'Weekly optimization reports',
                  'Memory & learning across sessions',
                  'OpenClaw integration',
                  'Priority support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#45ff26] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group"
              >
                <a href="https://app.adros.ai">
                  Start Pro Plan
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="reveal reveal-delay-3 p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Enterprise</h3>
                <p className="text-sm text-gray-500">For agencies & large teams</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Custom</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Pro',
                  'White-label capabilities',
                  'Multi-client management',
                  'Custom integrations',
                  'Dedicated account manager',
                  'SLA & priority support',
                  'Custom training & onboarding',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-semibold"
              >
                <a href="mailto:hello@adros.ai">Contact Sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DONE-FOR-YOU ADDON
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-[#0a0f1a] to-[#0c1220]">
        <div className="container max-w-5xl">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Optional Add-On</span>
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Done-For-You Setup
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Want us to handle everything? We'll set up your entire AI marketing infrastructure — OpenClaw, Jarvis Memory, security, and hosting — so you can start running ads immediately.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: What's Included */}
              <div className="p-10">
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  What's Included
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: <Zap className="w-4 h-4" />, title: 'Full OpenClaw Installation', desc: 'Complete setup on your VPS or local machine. Configured and tested end-to-end.' },
                    { icon: <Shield className="w-4 h-4" />, title: 'Maximum Security Configuration', desc: 'Hardened security setup with encrypted connections, access controls, and monitoring.' },
                    { icon: <Star className="w-4 h-4" />, title: 'Jarvis Memory Integration', desc: 'AI memory system configured so Adros remembers every campaign, result, and decision.' },
                    { icon: <Clock className="w-4 h-4" />, title: 'Cron Job Scheduling', desc: 'Automated daily audits, weekly reports, and optimization cycles — all pre-configured.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-0.5 text-cyan-400 shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Hosting Options</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <p className="text-sm font-semibold text-white">VPS</p>
                      <p className="text-xs text-gray-500">Cloud-hosted</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <p className="text-sm font-semibold text-white">Offline</p>
                      <p className="text-xs text-gray-500">Self-hosted</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Price & CTA */}
              <div className="p-10 bg-white/[0.02] border-l border-white/5 flex flex-col justify-center items-center text-center">
                <p className="text-sm text-gray-500 mb-2">One-Time Setup Fee</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>USD 997</span>
                </div>
                <p className="text-sm text-gray-500 mb-8">One-time payment. No recurring fees for the setup.</p>

                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all group"
                >
                  <a href="mailto:hello@adros.ai?subject=Done-For-You Setup">
                    Get Done-For-You Setup
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <div className="mt-8 space-y-2 text-xs text-gray-500">
                  <p className="flex items-center justify-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Setup completed within 48 hours</p>
                  <p className="flex items-center justify-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Includes 30-day support</p>
                  <p className="flex items-center justify-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Full documentation provided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0c1220]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What is MCP and how does Adros use it?', a: 'MCP (Model Context Protocol) is a standard that lets AI assistants like Claude, Cursor, and ChatGPT connect to external tools. Adros uses MCP to give your AI assistant direct access to your ad accounts, market research tools, creative generation, and campaign management — all through conversation.' },
              { q: 'Do I need to know how to code?', a: 'No. Adros is designed for marketers, business owners, and agencies. You interact through natural language — just tell your AI assistant what you want, and Adros handles the rest.' },
              { q: 'What ad platforms does Adros support?', a: 'Currently, Adros supports Meta Ads (Facebook & Instagram) and Google Ads. More platforms are coming soon.' },
              { q: 'What is OpenClaw and do I need it?', a: 'OpenClaw is an open-source AI automation framework. When connected to Adros, it enables 24/7 autonomous marketing — scheduled audits, weekly reports, and automated optimizations running on cron jobs. It\'s optional but recommended for hands-off marketing.' },
              { q: 'Is my data secure?', a: 'Yes. Adros uses OAuth for ad account connections (we never store your passwords). With the Done-For-You setup, OpenClaw runs on your own infrastructure — your data never leaves your control.' },
              { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no commitments. Cancel your subscription anytime from your account settings.' },
            ].map((faq, i) => (
              <details
                key={i}
                className="reveal group rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
              >
                <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-white flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-gray-600 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-white/5 bg-[#0a0f1a]">
        <div className="container text-center reveal">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to Automate Your Marketing?
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Start your 7-day free trial today. Credit card required.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#45ff26] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group"
          >
            <a href="https://app.adros.ai">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
