/**
 * ParticleWave — Lightweight CSS-based floor animation
 * 
 * Uses CSS gradients, transforms, and a small number of animated dots
 * to create a premium 3D terrain effect without heavy canvas rendering.
 * Inspired by the RapidFire.AI reference GIF — blue/cyan particle terrain.
 */

export default function ParticleWave() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: '45%', zIndex: 1, overflow: 'hidden' }}
    >
      {/* Base gradient terrain — 3D perspective floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          width: '120%',
          height: '100%',
          background: `
            radial-gradient(ellipse 80% 50% at 60% 70%, rgba(6,182,212,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 40% 80%, rgba(37,99,235,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 90%, rgba(30,64,175,0.08) 0%, transparent 70%)
          `,
          maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
        }}
      />

      {/* Perspective grid lines — creates depth illusion */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '70%',
          perspective: '500px',
          perspectiveOrigin: '50% 30%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-20%',
            width: '140%',
            height: '100%',
            transform: 'rotateX(65deg)',
            transformOrigin: 'bottom center',
            backgroundImage: `
              linear-gradient(to right, rgba(6,182,212,0.06) 1px, transparent 1px),
              linear-gradient(to top, rgba(37,99,235,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 40px',
            animation: 'gridFlow 8s linear infinite',
            maskImage: 'radial-gradient(ellipse 70% 90% at 50% 100%, black 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 50% 100%, black 0%, transparent 80%)',
          }}
        />
      </div>


      {/* Scattered luminous dots — lightweight version of particles */}
      <style>{`
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes horizonPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: var(--dot-alpha); }
          50% { transform: translateY(-8px) scale(1.3); opacity: calc(var(--dot-alpha) * 1.4); }
        }
        @keyframes driftRight {
          0% { transform: translateX(-5px) translateY(0); }
          50% { transform: translateX(5px) translateY(-4px); }
          100% { transform: translateX(-5px) translateY(0); }
        }
      `}</style>

      {/* Particle dots — 40 lightweight CSS dots instead of thousands of canvas particles */}
      {Array.from({ length: 50 }, (_, i) => {
        const seed = i * 137.5;
        const left = ((seed * 7.3) % 100);
        const bottom = ((seed * 2.1) % 45);
        const size = 1.5 + ((seed * 0.4) % 3);
        const dur = 3 + ((seed * 0.7) % 5);
        const delay = ((seed * 0.3) % 4);
        const isBlue = i % 3 !== 0;
        const isBright = i % 7 === 0;
        const alpha = isBright ? 0.6 : (0.15 + ((seed * 0.1) % 0.3));
        const color = isBlue
          ? (isBright ? '147, 197, 253' : '59, 130, 246')
          : (isBright ? '34, 211, 238' : '6, 182, 212');

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              bottom: `${bottom}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: `rgba(${color}, ${alpha})`,
              boxShadow: isBright ? `0 0 ${size * 4}px rgba(${color}, ${alpha * 0.6})` : 'none',
              animation: `floatDot ${dur}s ease-in-out ${delay}s infinite`,
              ['--dot-alpha' as string]: alpha,
            }}
          />
        );
      })}

      {/* Central glow orb — energy source */}
      <div
        style={{
          position: 'absolute',
          right: '25%',
          bottom: '50%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.15) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'horizonPulse 5s ease-in-out infinite',
        }}
      />

      {/* Secondary glow */}
      <div
        style={{
          position: 'absolute',
          left: '30%',
          bottom: '35%',
          width: 120,
          height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 70%)',
          filter: 'blur(12px)',
          animation: 'horizonPulse 6s ease-in-out 1s infinite',
        }}
      />
    </div>
  );
}
