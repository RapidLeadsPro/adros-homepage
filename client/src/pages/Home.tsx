import { useEffect, useRef, useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SpinningLoop, { LOOP_STEPS } from '@/components/SpinningLoop';
import StoneJourney from '@/components/StoneJourney';
import ParticleWave from '@/components/ParticleWave';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Zap, Shield, BarChart3, RefreshCw, Check, X, Minus, Search, Target, Paintbrush, Rocket, Brain, TrendingUp } from 'lucide-react';

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
      { threshold: 0.001, rootMargin: '800px 0px 800px 0px' }
    );
    const init = () => {
      const els = document.querySelectorAll('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)');
      els.forEach((el) => observerRef.current?.observe(el));
    };
    init();
    const t1 = setTimeout(init, 200);
    const t2 = setTimeout(init, 600);
    const t3 = setTimeout(init, 1200);
    const t4 = setTimeout(init, 2500);
    const t5 = setTimeout(init, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); observerRef.current?.disconnect(); };
  }, []);
}

const STONE_IMAGES = LOOP_STEPS.map(s => s.image);
const CHAR_IMAGES = LOOP_STEPS.map(s => s.charImage);

// Pre-generate stable particle data to avoid re-randomizing on every render
const HERO_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = i * 137.5; // golden angle for distribution
  return {
    left: ((seed * 7.3) % 100),
    bottom: ((seed * 3.7) % 40),
    size: 2 + ((seed * 1.3) % 3),
    dur: 4 + ((seed * 0.7) % 8),
    delay: ((seed * 0.5) % 6),
    isGreen: i % 3 !== 0,
    opBase: 0.15 + ((seed * 0.2) % 0.25),
    animIdx: i % 4,
  };
});

export default function Home() {
  useRevealOnScroll();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const handleHoverStep = useCallback((idx: number | null) => { setHoveredStep(idx); }, []);

  // Section refs for StoneJourney scroll tracking
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-[#0c1220] text-white">
      <style>{`
        .reveal { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease-out, transform 0.7s ease-out; }
        .reveal.revealed { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.1s; }
        .reveal-delay-2 { transition-delay:0.2s; }
        .reveal-delay-3 { transition-delay:0.3s; }
        .reveal-delay-4 { transition-delay:0.4s; }
        .reveal-delay-5 { transition-delay:0.5s; }
        .reveal-left { opacity:0; transform:translateX(-30px); transition:opacity 0.7s ease-out, transform 0.7s ease-out; }
        .reveal-left.revealed { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(30px); transition:opacity 0.7s ease-out, transform 0.7s ease-out; }
        .reveal-right.revealed { opacity:1; transform:translateX(0); }
        .reveal-scale { opacity:0; transform:scale(0.95); transition:opacity 0.7s ease-out, transform 0.7s ease-out; }
        .reveal-scale.revealed { opacity:1; transform:scale(1); }
        .hero-fade { opacity:0; transform:translateY(20px); animation:heroFadeIn 0.7s ease-out forwards; }
        .hero-fade-1 { animation-delay:0.1s; }
        .hero-fade-2 { animation-delay:0.2s; }
        .hero-fade-3 { animation-delay:0.35s; }
        .hero-fade-4 { animation-delay:0.5s; }
        .hero-fade-5 { animation-delay:0.65s; }
        .hero-image { opacity:0; transform:translateX(40px) scale(0.97); animation:heroImageIn 0.9s ease-out 0.4s forwards; }
        @keyframes heroFadeIn { to { opacity:1; transform:translateY(0); } }
        @keyframes heroImageIn { to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes pulse-glow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        .pulse-dot { animation:pulse-glow 2s ease-in-out infinite; }
        .step-card-highlight { transition:border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease; }
        .step-card-highlight.active {
          border-color:rgba(57,255,20,0.4) !important;
          background:rgba(57,255,20,0.08) !important;
          box-shadow:0 0 30px rgba(57,255,20,0.15), 0 0 60px rgba(57,255,20,0.05);
        }

      `}</style>

      <Navigation />

      {/* STONE JOURNEY — scroll-driven overlay (desktop only) */}
      <StoneJourney heroRef={heroRef} statsRef={statsRef} problemRef={problemRef} loopRef={loopRef} />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Particle wave floor — 99designs inspired flowing particle stream */}
        <ParticleWave />

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Mobile-only video placeholder — shown above headline */}
          <div className="block lg:hidden relative z-20 mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#39FF14]/15 to-cyan-500/20 rounded-xl blur-lg" />
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/adros-hero-main-kdU57hacLDf5h3bWaYaKni.webp" alt="Adros AI Marketing Command Center" className="relative rounded-xl border border-white/10 shadow-xl shadow-emerald-500/10 w-full" />
              <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                <div className="bg-black/40 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="hero-fade hero-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-[#39FF14] pulse-dot" />
              <span className="text-sm font-medium text-emerald-300">MCP-Powered Marketing AI</span>
            </div>
            <h1 className="hero-fade hero-fade-2 text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your AI Marketing<br />
              <span className="bg-gradient-to-r from-[#39FF14] via-cyan-400 to-blue-500 bg-clip-text text-transparent">Department</span>
            </h1>
            <p className="hero-fade hero-fade-3 text-lg text-gray-400 max-w-xl leading-relaxed">
              Other tools connect your data. Adros runs your marketing. Research your market, plan your strategy, generate scroll-stopping creatives, deploy ads, and learn every week — all on autopilot.
            </p>
            <div className="hero-fade hero-fade-4 flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#50FF30] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group">
                <a href="https://app.adros.ai">Get Started Free<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-semibold" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See How It Works
              </Button>
            </div>
            <div className="hero-fade hero-fade-5 flex items-center gap-6 pt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 2 min setup</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> OAuth secured</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> No coding required</span>
            </div>
          </div>
          <div className="hidden lg:block hero-image">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#39FF14]/15 to-cyan-500/20 rounded-2xl blur-xl" />
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/adros-hero-main-kdU57hacLDf5h3bWaYaKni.webp" alt="Adros AI Marketing Command Center" className="relative rounded-2xl border border-white/10 shadow-2xl shadow-emerald-500/10" />
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                <div className="bg-black/40 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors cursor-pointer">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — Redesigned big hero number style */}
      <section ref={statsRef} className="pt-24 md:pt-48 pb-32 md:pb-64 border-y border-white/5 bg-[#0a0f1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/5 rounded-full blur-[100px]" />
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-10 reveal">
            <p className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-4">The AI Engine Behind Your Growth</p>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-[#39FF14] via-cyan-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3,298</span>
              <span className="text-xl md:text-2xl text-gray-400 font-light">winning ad patterns</span>
            </div>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">analyzed, deconstructed, and ready to power your next campaign across Meta and Google Ads.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto reveal reveal-delay-2">
            {[
              { value: '48+', label: 'MCP Tools', sub: 'Research to deploy' },
              { value: '100%', label: 'Automated Loop', sub: 'Zero manual steps' },
              { value: '0', label: 'Team Required', sub: 'AI handles it all' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#39FF14] to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                <p className="text-sm text-white mt-1 font-medium">{stat.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section ref={problemRef} id="problem-section" className="pb-16 md:pb-24 bg-[#0c1220] pt-48 md:pt-[20rem]">
        <div className="container max-w-4xl">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-medium text-[#39FF14] mb-3 tracking-wider uppercase">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>MCP Connectors Are Not Enough</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Connecting your ad data to AI is step one. But who does the research? The strategy? The creative? The deployment? The learning?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Data Without Strategy', desc: 'MCP connectors give you data access. But data without a plan is just noise.', color: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/15' },
              { title: 'No Creative Engine', desc: 'You still need to write copy, design ads, and test variations manually.', color: 'from-cyan-500/10 to-cyan-500/5', border: 'border-cyan-500/15' },
              { title: 'Zero Memory', desc: "Each session starts from scratch. No learning. No pattern recognition.", color: 'from-yellow-500/10 to-yellow-500/5', border: 'border-yellow-500/15' },
              { title: 'Manual Everything', desc: "Audit, create, deploy, monitor — you're still doing all the work.", color: 'from-red-500/10 to-red-500/5', border: 'border-red-500/15' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} p-6 rounded-xl bg-gradient-to-br ${item.color} border ${item.border} hover:border-opacity-40 transition-colors`}>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex-shrink-0">✕</span>{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* HOW IT WORKS — THE INFINITY POWER LOOP */}
      <section ref={loopRef} id="how-it-works" className="py-20 md:py-44 bg-gradient-to-b from-[#0c1220] to-[#0a0f1a] relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-medium text-cyan-400 mb-3 tracking-wider uppercase">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Infinity Power Loop</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Like the infinity stones that power your business — Adros thinks, plans, creates, deploys, and learns. Every week, the loop gets smarter.</p>
          </div>

          {/* Loop Diagram — generous padding, no clipping */}
          <div className="relative mx-auto mb-12 md:mb-20 p-5 sm:p-[60px] md:p-[80px_60px]" style={{ maxWidth: 720 }}>
            <SpinningLoop onHoverStep={handleHoverStep} highlightedIdx={hoveredStep} />
          </div>

          {/* Steps Detail — stone images as icons, highlight on hover (desktop) */}
          <div className="reveal hidden md:grid grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { num: '01', title: 'Research', desc: 'Deep market analysis, competitor audit, audience insights', color: LOOP_STEPS[0].color },
              { num: '02', title: 'Strategy', desc: 'Positioning, offer architecture, campaign planning', color: LOOP_STEPS[1].color },
              { num: '03', title: 'Create', desc: 'Scroll-stopping ads from 3,298 winning patterns', color: LOOP_STEPS[2].color },
              { num: '04', title: 'Deploy', desc: 'Launch to Meta & Google Ads automatically', color: LOOP_STEPS[3].color },
              { num: '05', title: 'Learn', desc: 'Analyze results, remember, improve next cycle', color: LOOP_STEPS[4].color },
            ].map((step, i) => (
              <div
                key={i}
                className={`step-card-highlight text-center p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] ${hoveredStep === i ? 'active' : ''}`}
                onMouseEnter={() => handleHoverStep(i)}
                onMouseLeave={() => handleHoverStep(null)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mb-3 flex justify-center">
                  <img src={STONE_IMAGES[i]} alt={step.title} className="w-14 h-14 object-contain" style={{ filter: `drop-shadow(0 0 10px ${step.color})` }} />
                </div>
                <div className="text-xs text-gray-600 mb-1 font-mono">{step.num}</div>
                <h3 className="font-semibold text-white mb-1.5 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile step list */}
          <div className="md:hidden space-y-3 max-w-sm mx-auto">
            {[
              { num: '01', title: 'Research', desc: 'Deep market analysis, competitor audit, audience insights' },
              { num: '02', title: 'Strategy', desc: 'Positioning, offer architecture, campaign planning' },
              { num: '03', title: 'Create', desc: 'Scroll-stopping ads from 3,298 winning patterns' },
              { num: '04', title: 'Deploy', desc: 'Launch to Meta & Google Ads automatically' },
              { num: '05', title: 'Learn', desc: 'Analyze results, remember, improve next cycle' },
            ].map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5`}>
                <img src={CHAR_IMAGES[i]} alt={step.title} className="w-10 h-10 object-contain shrink-0" style={{ filter: `drop-shadow(0 0 6px ${LOOP_STEPS[i].color})` }} />
                <div>
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="py-40 bg-[#0c1220]">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wider uppercase">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Everything You Need to Run Ads</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">From market research to creative generation to campaign deployment — Adros handles the entire marketing workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Search className="w-7 h-7" />, color: '#39FF14', title: 'Market Research', desc: 'Deep competitor analysis, audience profiling, and market opportunity mapping. Adros understands your business before running a single ad.' },
              { icon: <Target className="w-7 h-7" />, color: '#06b6d4', title: 'Strategy & Positioning', desc: 'Offer architecture, messaging frameworks, and campaign structures built on consumer psychology — not guesswork.' },
              { icon: <Paintbrush className="w-7 h-7" />, color: '#22C55E', title: 'Creative Generation', desc: 'Scroll-stopping ad creatives powered by 3,298 winning patterns. Headlines, copy, visual direction — all generated.' },
              { icon: <BarChart3 className="w-7 h-7" />, color: '#3B82F6', title: 'Campaign Analysis', desc: '"Which campaigns are bleeding money?" Get instant answers with AI-powered performance analysis across all accounts.' },
              { icon: <Rocket className="w-7 h-7" />, color: '#EF4444', title: 'Auto Deployment', desc: 'Launch campaigns to Meta and Google Ads directly. No manual setup. No copy-paste. Just deploy and go.' },
              { icon: <Brain className="w-7 h-7" />, color: '#D97706', title: 'Memory & Learning', desc: "Adros remembers every campaign, every result, every decision. Next week's strategy is built on this week's data." },
            ].map((cap, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 5)} group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all`}>
                <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${cap.color}15`, color: cap.color }}>
                  {cap.icon}
                </div>
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cap.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPENCLAW INTEGRATION */}
      <section className="py-32 bg-gradient-to-b from-[#0c1220] to-[#0a0f1a]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="reveal-left reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 to-[#39FF14]/15 rounded-2xl blur-xl" />
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/adros-openclaw-integration-8mbBVvmsMxpvNEVTbY42Dn.webp" alt="Adros + OpenClaw Integration" className="relative rounded-2xl border border-white/10" />
              </div>
            </div>
            <div className="reveal-right reveal space-y-6">
              <p className="text-sm font-medium text-cyan-400 tracking-wider uppercase">OpenClaw Integration</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>24/7 Autonomous Marketing</h2>
              <p className="text-gray-400 leading-relaxed">Connect Adros to OpenClaw and your marketing runs itself. Scheduled audits, weekly reports, automated optimizations — all running on cron jobs while you sleep.</p>
              <div className="space-y-4 pt-2">
                {[
                  { icon: <Clock className="w-4 h-4" />, title: 'Scheduled Reports', desc: 'Daily performance checks, weekly strategy reports delivered to Telegram or email' },
                  { icon: <RefreshCw className="w-4 h-4" />, title: 'Cron Job Automation', desc: 'Set it and forget it. Adros runs on schedule — audit, optimize, report, repeat' },
                  { icon: <BarChart3 className="w-4 h-4" />, title: 'Jarvis Memory', desc: 'Every decision, every result, every insight — stored and used to improve next cycle' },
                  { icon: <Shield className="w-4 h-4" />, title: 'Self-Hosted & Secure', desc: 'Runs on your own VPS or local machine. Your data never leaves your control' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 text-cyan-400 shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CONVERSATION */}
      <section className="py-32 bg-[#0c1220]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 reveal">
            <p className="text-sm font-medium text-[#39FF14] mb-3 tracking-wider uppercase">See It In Action</p>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI-Powered Ad Management</h2>
          </div>
          <div className="reveal rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-[#39FF14] to-cyan-500 flex items-center justify-center">
                  <span className="text-black text-[10px] font-bold">A</span>
                </div>
                <span className="text-sm font-medium text-gray-300">Claude + Adros MCP</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#39FF14] pulse-dot" />
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-end">
                <div className="bg-emerald-600/20 border border-emerald-500/20 rounded-xl rounded-br-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-gray-200">I just connected my Meta Ads account. What should I do first?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl rounded-bl-sm px-4 py-3 max-w-lg">
                  <p className="text-sm text-gray-300 mb-3">{"Great! I'll start by understanding your business. Let me ask a few questions, then I'll:"}</p>
                  <div className="space-y-1 text-sm text-gray-400 mb-3">
                    <p className="flex items-center gap-2"><span className="text-[#39FF14]">1.</span> Audit your current campaigns</p>
                    <p className="flex items-center gap-2"><span className="text-[#39FF14]">2.</span> Research your market & competitors</p>
                    <p className="flex items-center gap-2"><span className="text-[#39FF14]">3.</span> Identify what{"'"}s working and what{"'"}s not</p>
                    <p className="flex items-center gap-2"><span className="text-[#39FF14]">4.</span> Generate new ad creatives based on winning patterns</p>
                    <p className="flex items-center gap-2"><span className="text-[#39FF14]">5.</span> Give you a full plan to execute</p>
                  </div>
                  <p className="text-sm text-gray-300">{"What's your business about?"}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-emerald-600/20 border border-emerald-500/20 rounded-xl rounded-br-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-gray-200">I sell premium fitness equipment online. Currently spending $5K/month on Meta Ads.</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl rounded-bl-sm px-4 py-3 max-w-lg">
                  <p className="text-sm text-gray-300 mb-2">Analyzing your account now...</p>
                  <div className="bg-black/30 rounded-lg p-3 text-xs font-mono text-gray-400 space-y-1">
                    <p><span className="text-[#39FF14]">&#10003;</span> Found 12 active campaigns</p>
                    <p><span className="text-yellow-400">!</span> 4 campaigns have ROAS below 1.0x</p>
                    <p><span className="text-[#39FF14]">&#10003;</span> Best performer: &quot;Summer Collection&quot; (ROAS 4.2x)</p>
                    <p><span className="text-red-400">&#10007;</span> No retargeting campaigns found</p>
                    <p><span className="text-cyan-400">&rarr;</span> Generating 6 new ad creatives based on winning patterns...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE — Why Adros */}
      <section className="py-40 bg-gradient-to-b from-[#0c1220] to-[#0a0f1a]">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400">WHY ADROS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The <span className="bg-gradient-to-r from-[#39FF14] to-cyan-400 bg-clip-text text-transparent">smarter</span> way to run marketing
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">See how an AI marketing department compares to doing it yourself or hiring a team.</p>
          </div>
          <div className="reveal rounded-2xl border border-white/5 overflow-x-auto themed-scrollbar">
            <table className="w-full text-sm" style={{ minWidth: 600 }}>
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-gray-400 font-normal w-1/4">Capability</th>
                  <th className="text-center p-4 text-gray-400 font-normal w-1/4">
                    <div>DIY / Freelancer</div>
                    <div className="text-xs text-gray-600 mt-0.5">Manual effort</div>
                  </th>
                  <th className="text-center p-4 text-gray-400 font-normal w-1/4">
                    <div>Marketing Agency</div>
                    <div className="text-xs text-gray-600 mt-0.5">$3K-10K/month</div>
                  </th>
                  <th className="text-center p-4 w-1/4" style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.08), rgba(6,182,212,0.08))' }}>
                    <div className="font-bold text-[#39FF14]">Adros AI</div>
                    <div className="text-xs text-cyan-400 mt-0.5">Fully automated</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Market research depth', diy: '2-3 hours of Googling', agency: 'Basic competitor scan', adros: 'Full 7-deliverable research', highlight: true },
                  { feature: 'Strategy & positioning', diy: 'Trial and error', agency: 'Template frameworks', adros: 'Consumer psych-driven', highlight: true },
                  { feature: 'Ad creative generation', diy: 'Write it yourself', agency: '3-5 variations/month', adros: '50+ from 3,298 patterns', highlight: true },
                  { feature: 'Campaign deployment', diy: 'Manual in Ads Manager', agency: 'Manual with markup', adros: 'Direct API — 1 command', highlight: true },
                  { feature: 'Performance memory', diy: null, agency: 'Spreadsheet tracking', adros: 'Persistent AI memory', highlight: true },
                  { feature: 'Weekly optimization', diy: '4-6 hours/week', agency: 'Monthly reports', adros: 'Autonomous every week', highlight: true },
                  { feature: 'Time to first campaign', diy: '1-2 weeks', agency: '2-4 weeks onboarding', adros: '~30 minutes', highlight: true },
                  { feature: 'Cost', diy: 'Your time (priceless)', agency: '$3,000-10,000/mo', adros: '7-day free trial, then $99/mo', highlight: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-gray-500">{row.diy === null ? <Minus className="w-4 h-4 mx-auto text-gray-700" /> : row.diy}</td>
                    <td className="p-4 text-center text-gray-500">{row.agency}</td>
                    <td className="p-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.05), rgba(6,182,212,0.05))' }}>
                      <span className="text-[#39FF14] font-semibold">{row.adros}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8 reveal">
            <Button asChild size="lg" className="bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#50FF30] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group">
              <a href="https://app.adros.ai">Start Free Today<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-32 bg-[#0c1220]">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-medium text-[#39FF14] mb-3 tracking-wider uppercase">Use Cases</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Built for How You Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="reveal reveal-delay-1 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Brands & Business Owners</h3>
              <p className="text-sm text-gray-400 mb-4">Stop guessing. Let AI handle your entire marketing workflow.</p>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-start gap-2"><span className="text-[#39FF14] mt-0.5">&mdash;</span> Full market research before spending a dollar</li>
                <li className="flex items-start gap-2"><span className="text-[#39FF14] mt-0.5">&mdash;</span> Ad creatives that actually convert</li>
                <li className="flex items-start gap-2"><span className="text-[#39FF14] mt-0.5">&mdash;</span> Weekly optimization without hiring a team</li>
                <li className="flex items-start gap-2"><span className="text-[#39FF14] mt-0.5">&mdash;</span> Memory that compounds your results</li>
              </ul>
            </div>
            <div className="reveal reveal-delay-2 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10">
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Agencies & Freelancers</h3>
              <p className="text-sm text-gray-400 mb-4">Scale operations without scaling your team.</p>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">&mdash;</span> Manage dozens of clients with AI workflows</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">&mdash;</span> Automate audits and reporting via OpenClaw</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">&mdash;</span> Onboard clients faster with unified data access</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">&mdash;</span> Increase margins by saving hours weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK START */}
      <section className="py-32 bg-gradient-to-b from-[#0c1220] to-[#0a0f1a]">
        <div className="container max-w-4xl">
          <div className="text-center mb-16 reveal">
            <p className="text-sm font-medium text-[#39FF14] mb-3 tracking-wider uppercase">Quick Start</p>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get Started in 2 Minutes</h2>
            <p className="text-lg text-gray-400">No downloads, no coding, no configuration. Just connect and start asking.</p>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', title: 'Sign up for Adros and connect your ad accounts', desc: 'Meta Ads, Google Ads — connect via OAuth in seconds.' },
              { num: '2', title: 'Add Adros MCP to your AI assistant', desc: 'Works with Claude, Cursor, ChatGPT, or any MCP-compatible client.' },
              { num: '3', title: 'Start asking: "Audit my campaigns and show me what\'s wrong"', desc: 'Adros researches, plans, creates, and deploys — all from conversation.' },
              { num: '4', title: 'Connect OpenClaw for 24/7 automation (optional)', desc: 'Schedule daily checks, weekly reports, and automated optimizations.' },
            ].map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex gap-5 items-start p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors`}>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#39FF14] to-cyan-500 flex items-center justify-center text-sm font-bold text-black">{step.num}</div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta" className="py-44 bg-gradient-to-b from-[#0a0f1a] to-[#0c1220] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to Replace Your<br />
              <span className="bg-gradient-to-r from-[#39FF14] to-cyan-400 bg-clip-text text-transparent">Marketing Department?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Join businesses that are automating their entire marketing workflow with AI. Start free, upgrade as you grow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#50FF30] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group">
                <a href="https://app.adros.ai">Get Started Free<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-semibold">
                <a href="mailto:hello@adros.ai">Contact Sales</a>
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-6">Credit card required &middot; 7-day free trial &middot; 2 minute setup &middot; Cancel anytime</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
