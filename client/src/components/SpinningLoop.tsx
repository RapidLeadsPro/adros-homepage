import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * SpinningLoop — The Infinity Power Loop (五行 Edition)
 * 
 * 5 element stones: 金(Metal/White), 水(Water/Blue), 木(Wood/Green), 火(Fire/Red), 土(Earth/Brown)
 * - Entire assembly (ring + stones + labels) rotates slowly together
 * - Labels counter-rotate so text stays upright
 * - Hover on a stone pauses the entire spin and enlarges that stone
 * - Particle effects around the loop for energy feel
 * - Animated background for the section (nebula/energy)
 * - No box mask — overflow visible everywhere
 * - Responsive: smaller on mobile
 */

export const LOOP_STEPS = [
  {
    label: 'Research',
    element: '金',
    angle: -90,
    color: '#E8E8F0',
    rgb: '232, 232, 240',
    glowColor: 'rgba(232, 232, 240, 0.6)',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/stone-metal-white-v2-KWVkSq6a2TBzYD2Ax9KTzW.webp',
    charImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/char-jin-metal-gTMpjuddp5prddHdkYxgy6.webp',
  },
  {
    label: 'Strategy',
    element: '水',
    angle: -18,
    color: '#3B82F6',
    rgb: '59, 130, 246',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/stone-water-blue-DmS4QNkXTVDL8mExoGfJ79.webp',
    charImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/char-shui-water-KVTSye8GBuTxircEKqQ4wF.webp',
  },
  {
    label: 'Create',
    element: '木',
    angle: 54,
    color: '#22C55E',
    rgb: '34, 197, 94',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/stone-wood-green-v2-6Hj9yHusNBsmVtNKYGXwHm.webp',
    charImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/char-mu-wood-6vmmmxHcyvJ6PqsjSgkefb.webp',
  },
  {
    label: 'Deploy',
    element: '火',
    angle: 126,
    color: '#EF4444',
    rgb: '239, 68, 68',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/stone-fire-red-aahLbafrUUczA5qdtULwzK.webp',
    charImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/char-huo-fire-HyLdn5KzHDtvpwngbKVi6N.webp',
  },
  {
    label: 'Learn',
    element: '土',
    angle: 198,
    color: '#D97706',
    rgb: '217, 119, 6',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/stone-earth-brown-9d8GrzzjuBnszPbPnAFCZK.webp',
    charImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663026787945/aZUQtAvb75tn6TBhk4gLPF/char-tu-earth-NdExfgsgaPbGkbTxDb2ayu.webp',
  },
];

// Generate particle data once (deterministic)
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = i * 137.5;
  return {
    angle: (i / 30) * 360 + ((seed * 1.7) % 15),
    distance: 0.8 + ((seed * 0.3) % 0.5),
    size: 1.5 + ((seed * 0.2) % 3),
    speed: 12 + ((seed * 0.5) % 30),
    delay: -((seed * 0.3) % 20),
    opacity: 0.15 + ((seed * 0.1) % 0.4),
    colorIdx: i % 5,
  };
});

// Background nebula particles (larger, slower, more diffuse)
const NEBULA_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const seed = i * 89.3;
  return {
    x: ((seed * 3.7) % 100),
    y: ((seed * 5.3) % 100),
    size: 80 + ((seed * 2.1) % 200),
    dur: 8 + ((seed * 0.4) % 12),
    delay: -((seed * 0.6) % 10),
    colorIdx: i % 5,
  };
});

interface SpinningLoopProps {
  onHoverStep?: (index: number | null) => void;
  highlightedIdx?: number | null;
}

export default function SpinningLoop({ onHoverStep, highlightedIdx }: SpinningLoopProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05, rootMargin: '200px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleHover = useCallback((idx: number | null) => {
    if (isMobile) return;
    setHoveredIdx(idx);
    onHoverStep?.(idx);
  }, [onHoverStep, isMobile]);

  // Responsive sizing — bigger on desktop
  const W = isMobile ? 280 : 600;
  const R = isMobile ? 95 : 210;
  const C = W / 2;
  const STONE = isMobile ? 48 : 88;
  const LABEL_R = R + (isMobile ? 42 : 62);
  const activeIdx = hoveredIdx ?? highlightedIdx ?? null;
  const paused = activeIdx !== null;

  return (
    <div
      ref={ref}
      className="relative mx-auto"
      style={{
        width: W, height: W,
        overflow: 'visible',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes spinAll {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.65; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.85; }
        }
        @keyframes particlePulse {
          0%, 100% { opacity: 0.15; transform: scale(0.7); }
          50% { opacity: 0.55; transform: scale(1.4); }
        }
        @keyframes nebulaDrift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.04; }
          33% { transform: translate(15px, -10px) scale(1.1); opacity: 0.08; }
          66% { transform: translate(-10px, 15px) scale(0.95); opacity: 0.05; }
        }
      `}</style>

      {/* ═══ ANIMATED BACKGROUND — nebula energy field ═══ */}
      <div className="absolute pointer-events-none" style={{ inset: '-80%', overflow: 'visible' }}>
        {NEBULA_PARTICLES.map((np, i) => {
          const step = LOOP_STEPS[np.colorIdx];
          return (
            <div key={`neb-${i}`} className="absolute rounded-full" style={{
              left: `${np.x}%`,
              top: `${np.y}%`,
              width: np.size,
              height: np.size,
              background: `radial-gradient(circle, rgba(${step.rgb}, 0.08) 0%, rgba(${step.rgb}, 0.02) 40%, transparent 70%)`,
              filter: 'blur(30px)',
              animation: `nebulaDrift ${np.dur}s ease-in-out ${np.delay}s infinite`,
            }} />
          );
        })}
      </div>

      {/* Ambient background glow — does NOT spin */}
      <div className="absolute pointer-events-none" style={{
        inset: '-60%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.05) 0%, rgba(34,211,238,0.03) 25%, rgba(239,68,68,0.02) 40%, transparent 60%)',
        filter: 'blur(80px)',
      }} />

      {/* ═══ PARTICLE FIELD — orbiting energy particles ═══ */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
        {PARTICLES.map((p, i) => {
          const step = LOOP_STEPS[p.colorIdx];
          const pR = R * p.distance;
          return (
            <div
              key={`p-${i}`}
              style={{
                position: 'absolute',
                left: C, top: C,
                width: 0, height: 0,
                animation: `spinAll ${p.speed}s linear ${p.delay}s infinite`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: pR, top: 0,
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: step.color,
                  boxShadow: `0 0 ${p.size * 4}px rgba(${step.rgb}, 0.7)`,
                  animation: `particlePulse ${2 + (i % 3)}s ease-in-out ${-(i % 5)}s infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ═══ SPINNING ASSEMBLY — ring + stones + labels all rotate together ═══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
          animation: `spinAll 55s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          transformOrigin: 'center center',
        }}
      >
        {/* SVG Ring */}
        <svg viewBox={`0 0 ${W} ${W}`} className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="tg5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8E8F0" />
              <stop offset="20%" stopColor="#3B82F6" />
              <stop offset="40%" stopColor="#22C55E" />
              <stop offset="60%" stopColor="#EF4444" />
              <stop offset="80%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#E8E8F0" />
            </linearGradient>
            <filter id="g1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="g2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="g3" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="22" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="b" /></feMerge></filter>
          </defs>

          {/* Widest glow */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="url(#tg5)" strokeWidth="32" filter="url(#g3)" opacity="0.15"
            style={{ animation: 'pulseRing 4s ease-in-out infinite' }} />
          {/* Medium glow */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="url(#tg5)" strokeWidth="16" filter="url(#g2)" opacity="0.35"
            style={{ animation: 'pulseRing 4s ease-in-out infinite' }} />
          {/* Main track — thick and prominent */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="url(#tg5)" strokeWidth="6" filter="url(#g1)" opacity="0.95" />
          {/* Inner deco */}
          <circle cx={C} cy={C} r={R - 22} fill="none" stroke="url(#tg5)" strokeWidth="0.8" strokeDasharray="5 18" opacity="0.2" />
          {/* Outer deco */}
          <circle cx={C} cy={C} r={R + 22} fill="none" stroke="url(#tg5)" strokeWidth="0.8" strokeDasharray="4 22" opacity="0.15" />
        </svg>

        {/* Stone nodes — spin with the ring */}
        {LOOP_STEPS.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const cx = C + R * Math.cos(rad);
          const cy = C + R * Math.sin(rad);
          const isHovered = activeIdx === i;

          // Label position
          const lx = C + LABEL_R * Math.cos(rad);
          const ly = C + LABEL_R * Math.sin(rad);

          return (
            <div key={i} style={{ overflow: 'visible' }}>
              {/* Glow backdrop */}
              <div style={{
                position: 'absolute',
                left: cx, top: cy,
                width: STONE + 30, height: STONE + 30,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${step.rgb}, ${isHovered ? 0.7 : 0.35}) 0%, rgba(${step.rgb}, ${isHovered ? 0.25 : 0.08}) 50%, transparent 70%)`,
                animation: `glowPulse 4s ease-in-out ${i * 0.5}s infinite`,
                animationPlayState: paused ? 'paused' : 'running',
                zIndex: 5,
                transition: 'background 0.3s ease',
                pointerEvents: 'none',
              }} />

              {/* Stone image — hoverable */}
              <div
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleHover(null)}
                style={{
                  position: 'absolute',
                  left: cx, top: cy,
                  width: STONE, height: STONE,
                  transform: `translate(-50%,-50%) scale(${isHovered ? 1.4 : 1})`,
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease',
                  zIndex: 15,
                  cursor: 'pointer',
                  filter: `drop-shadow(0 0 ${isHovered ? 24 : 16}px rgba(${step.rgb}, ${isHovered ? 1 : 0.8})) drop-shadow(0 0 ${isHovered ? 48 : 32}px rgba(${step.rgb}, ${isHovered ? 0.6 : 0.4}))`,
                  pointerEvents: 'auto',
                }}
              >
                <img src={step.image} alt={step.label} width={STONE} height={STONE}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} loading="eager" />
              </div>

              {/* Label — counter-rotate so text stays upright */}
              <div
                style={{
                  position: 'absolute',
                  left: lx, top: ly,
                  transform: 'translate(-50%,-50%)',
                  fontSize: isMobile ? 11 : (isHovered ? 16 : 14),
                  fontWeight: 800,
                  color: step.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.12em',
                  textShadow: `0 0 24px rgba(${step.rgb}, ${isHovered ? 1 : 0.7}), 0 0 48px rgba(${step.rgb}, ${isHovered ? 0.6 : 0.3})`,
                  whiteSpace: 'nowrap',
                  zIndex: 15,
                  pointerEvents: 'none',
                  transition: 'font-size 0.3s ease',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  animation: `spinAll 55s linear infinite reverse`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center label — does NOT spin */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20 }}>
        <span className="font-extrabold tracking-[0.3em] uppercase" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isMobile ? 14 : 22,
          background: 'linear-gradient(135deg, #E8E8F0, #3B82F6, #22C55E)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>ADROS</span>
        <span className="text-gray-400 tracking-[0.15em] uppercase mt-1 text-center leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 8 : 11 }}>
          Your &lsquo;infinity stones&rsquo;<br />for marketing
        </span>
      </div>
    </div>
  );
}
