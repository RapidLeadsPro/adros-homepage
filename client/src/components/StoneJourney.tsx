import { useEffect, useRef, useState, useCallback } from 'react';
import { LOOP_STEPS } from './SpinningLoop';

/**
 * StoneJourney v7 — Scroll-driven infinity stone animation (Desktop + Mobile)
 * 
 * PHASES:
 *   Phase 0:  Hero floating (scroll = 0)
 *   Phase 1:  Hero → Line formation (scroll 0 → heroEnd)
 *   Phase 1H: Line HOLD — sticky near stats heading, follows page then clamps at top
 *   Phase 2:  Line → Circle transition (starts when line hits top)
 *   Phase 2H: Circle HOLD — sticky at center, follows gap position then clamps at top  
 *   Phase 3:  Exit — stones fall DOWN off screen one by one (starts when circle hits top)
 *   Phase 4:  Gone
 * 
 * KEY PRINCIPLES:
 *   - Line is sticky: follows stats heading, clamps at viewport top
 *   - Circle is sticky: follows gap center, clamps at viewport top  
 *   - Exit: stones fall DOWN (not outward), one by one, SLOWLY
 *   - DO NOT TOUCH: Phase 0, 1, 1H (hero → line) — locked and perfect on desktop
 *   - Mobile: same phases, smaller stones, adjusted positions
 */

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}

function easeInOutCubic(t: number) {
  const c = clamp01(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

function easeOutCubic(t: number) {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

// Hero: stones in the EDGES and CORNERS only — away from text
function getHeroPositions(viewW: number, viewH: number, mobile: boolean) {
  if (mobile) {
    return [
      { x: viewW * 0.08, y: viewH * 0.20 },
      { x: viewW * 0.50, y: viewH * 0.14 },
      { x: viewW * 0.90, y: viewH * 0.22 },
      { x: viewW * 0.88, y: viewH * 0.70 },
      { x: viewW * 0.06, y: viewH * 0.75 },
    ];
  }
  return [
    { x: viewW * 0.06, y: viewH * 0.12 },
    { x: viewW * 0.48, y: viewH * 0.12 },
    { x: viewW * 0.88, y: viewH * 0.14 },
    { x: viewW * 0.94, y: viewH * 0.75 },
    { x: viewW * 0.04, y: viewH * 0.82 },
  ];
}

// Line: horizontal line across the viewport
function getLinePositions(viewW: number, mobile: boolean) {
  const totalWidth = mobile ? viewW * 0.85 : Math.min(viewW * 0.55, 750);
  const startX = (viewW - totalWidth) / 2;
  const gap = totalWidth / 4;
  return Array.from({ length: 5 }, (_, i) => ({
    x: startX + i * gap,
  }));
}

// Circle: positions around a center point
function getCirclePositions(cx: number, cy: number, radius: number) {
  return LOOP_STEPS.map((step) => {
    const rad = (step.angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  });
}

interface StoneJourneyProps {
  heroRef: React.RefObject<HTMLElement | null>;
  statsRef: React.RefObject<HTMLElement | null>;
  problemRef: React.RefObject<HTMLElement | null>;
  loopRef: React.RefObject<HTMLElement | null>;
}

export default function StoneJourney({ heroRef, statsRef, problemRef, loopRef }: StoneJourneyProps) {
  const [isMobile, setIsMobile] = useState(false);
  const posRef = useRef<Array<{ x: number; y: number; scale: number; opacity: number }>>([]);
  const bobRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const render = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const children = el.children;
    const positions = posRef.current;
    for (let i = 0; i < positions.length && i < children.length; i++) {
      const p = positions[i];
      const child = children[i] as HTMLElement;
      child.style.transform = `translate(-50%, -50%) translate(${p.x}px, ${p.y}px) scale(${p.scale})`;
      child.style.opacity = String(Math.max(0, p.opacity));
    }
  }, []);

  const update = useCallback(() => {
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const scrollY = window.scrollY;
    const mobile = viewW < 768;

    const statsEl = statsRef.current;
    const problemEl = problemRef.current;
    if (!statsEl || !problemEl) return;

    // Get actual DOM positions
    const statsTop = statsEl.offsetTop;
    const statsHeight = statsEl.offsetHeight;
    const problemTop = problemEl.offsetTop;

    // Responsive sizes
    const stoneSize = mobile ? 48 : 72;
    const lineClampY = mobile ? 60 : 80;
    const circleClampY = mobile ? 160 : 240;
    const circleR = mobile ? Math.min(viewW * 0.12, 60) : Math.min(viewW * 0.07, 95);
    const problemPadding = mobile ? 192 : 320; // mobile: pt-48 (12rem=192px), desktop: pt-[20rem]

    // ============================================================
    // PHASE 1: Hero → Line (DO NOT TOUCH on desktop)
    // ============================================================
    const heroEnd = mobile ? viewH * 1.4 : viewH * 0.8;
    const toLineT = easeInOutCubic(clamp01(scrollY / heroEnd));

    // LINE_Y: follows stats heading, clamps at top
    const statsHeadingPageY = statsTop + (mobile ? 40 : 80);
    const statsHeadingViewportY = statsHeadingPageY - scrollY;
    const LINE_Y = Math.max(lineClampY, Math.min(statsHeadingViewportY, viewH * 0.4));

    // Line hits top when LINE_Y clamps
    const lineHitsTop = scrollY >= statsTop;

    // ============================================================
    // PHASE 2: Line → Circle
    // ============================================================
    const circleTransitionLength = viewH * 0.6;
    const circleTransitionStart = statsTop;
    const toCircleRaw = lineHitsTop ? clamp01((scrollY - circleTransitionStart) / circleTransitionLength) : 0;
    const toCircleT = easeInOutCubic(toCircleRaw);

    // Circle center: in the gap between stats bottom and problem heading
    const gapStartPageY = statsTop + statsHeight;
    const gapEndPageY = problemTop + problemPadding;
    const circlePageY = gapStartPageY + (gapEndPageY - gapStartPageY) * 0.50;

    // Circle is STICKY: follows page position, clamps at top
    const circleCenterViewportY = circlePageY - scrollY;
    const CIRCLE_Y = Math.max(circleClampY, Math.min(circleCenterViewportY, viewH * 0.45));
    const circleCenterX = viewW / 2;
    const circlePos = getCirclePositions(circleCenterX, CIRCLE_Y, circleR);

    // Circle hits top when CIRCLE_Y clamps
    const circleHitsTopScroll = circlePageY - circleClampY;
    const circleHitsTop = scrollY >= circleHitsTopScroll;
    const circleComplete = toCircleT >= 0.99;

    // ============================================================
    // PHASE 3: Exit — stones fall DOWN off screen, one by one, SLOWLY
    // ============================================================
    const exitStart = circleHitsTopScroll;
    const problemHeadingPageY = problemTop + problemPadding;
    const problemEntersViewport = problemHeadingPageY - viewH;
    const exitMustEndBy = problemEntersViewport - 100;
    const exitLength = Math.max(viewH * 0.4, exitMustEndBy - exitStart);
    const exitRaw = (circleHitsTop && circleComplete) ? clamp01((scrollY - exitStart) / exitLength) : 0;

    // Stagger: each stone starts falling at different times
    const exitStagger = [0.0, 0.06, 0.12, 0.20, 0.28];

    // ============================================================
    // POSITION CALCULATIONS
    // ============================================================
    const heroPos = getHeroPositions(viewW, viewH, mobile);
    const linePos = getLinePositions(viewW, mobile);

    const positions: Array<{ x: number; y: number; scale: number; opacity: number }> = [];

    for (let i = 0; i < 5; i++) {
      let x: number, y: number, scale: number, opacity: number;

      // Exit target: fall straight DOWN off screen
      const exitTargetY = viewH + 200;

      // Check if this stone has started/completed its exit
      const stoneExitStart = exitStagger[i];
      const stoneExitT = clamp01((exitRaw - stoneExitStart) / 0.55);
      const stoneExitEased = easeOutCubic(stoneExitT);
      const stoneExitComplete = stoneExitT >= 0.99;

      if (stoneExitComplete) {
        // Phase 4: Gone
        x = circlePos[i].x;
        y = exitTargetY;
        scale = 0.5;
        opacity = 0;
      } else if (exitRaw > 0 && stoneExitT > 0) {
        // Phase 3: Falling DOWN
        x = circlePos[i].x;
        y = lerp(circlePos[i].y, exitTargetY, stoneExitEased);
        scale = lerp(0.9, 0.5, stoneExitEased);
        opacity = lerp(1, 0, easeInOutCubic(stoneExitT));
      } else if (circleComplete && !circleHitsTop) {
        // Phase 2H: Circle HOLD — sticky, gentle bobbing
        const bobX = Math.sin(bobRef.current + i * 1.3) * (mobile ? 2 : 3);
        const bobY = Math.cos(bobRef.current + i * 0.9) * (mobile ? 1.5 : 2);
        x = circlePos[i].x + bobX;
        y = circlePos[i].y + bobY;
        scale = mobile ? 0.75 : 0.9;
        opacity = 1;
      } else if (circleComplete && circleHitsTop && exitRaw === 0) {
        // Circle hit top but exit hasn't started yet — hold at top
        const bobX = Math.sin(bobRef.current + i * 1.3) * (mobile ? 2 : 3);
        const bobY = Math.cos(bobRef.current + i * 0.9) * (mobile ? 1.5 : 2);
        x = circlePos[i].x + bobX;
        y = circlePos[i].y + bobY;
        scale = mobile ? 0.75 : 0.9;
        opacity = 1;
      } else if (lineHitsTop && toCircleT > 0.005) {
        // Phase 2: Line → Circle transition
        x = lerp(linePos[i].x, circlePos[i].x, toCircleT);
        y = lerp(lineClampY, circlePos[i].y, toCircleT);
        scale = mobile ? 0.75 : 0.9;
        opacity = 1;
      } else if (toLineT >= 0.99) {
        // Phase 1H: Line HOLD (DO NOT TOUCH on desktop)
        const bobX = Math.sin(bobRef.current + i * 1.3) * 2;
        x = linePos[i].x + bobX;
        y = LINE_Y;
        scale = mobile ? 0.75 : 0.9;
        opacity = 1;
      } else if (toLineT > 0.005) {
        // Phase 1: Hero → Line (DO NOT TOUCH on desktop)
        const bobDampen = 1 - toLineT;
        const hx = heroPos[i].x + Math.sin(bobRef.current + i * 1.2) * (mobile ? 6 : 10) * bobDampen;
        const hy = heroPos[i].y + Math.cos(bobRef.current + i * 0.8) * (mobile ? 4 : 6) * bobDampen;
        x = lerp(hx, linePos[i].x, toLineT);
        y = lerp(hy, LINE_Y, toLineT);
        scale = mobile ? 0.75 : 0.9;
        opacity = lerp(0.85, 1, toLineT);
      } else {
        // Phase 0: Hero floating (DO NOT TOUCH on desktop)
        x = heroPos[i].x + Math.sin(bobRef.current + i * 1.2) * (mobile ? 6 : 12);
        y = heroPos[i].y + Math.cos(bobRef.current + i * 0.8) * (mobile ? 4 : 8);
        scale = mobile ? 0.7 : 0.9;
        opacity = 0.85;
      }

      positions.push({ x, y, scale, opacity });
    }

    posRef.current = positions;
    render();
  }, [isMobile, statsRef, problemRef, render]);

  // Animation loop for bobbing
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      bobRef.current += dt * 1.5;
      update();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [update]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  const stoneSize = isMobile ? 48 : 72;

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    >
      {LOOP_STEPS.map((step, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: stoneSize,
            height: stoneSize,
            willChange: 'transform, opacity',
            filter: `drop-shadow(0 0 ${isMobile ? 8 : 14}px rgba(${step.rgb}, 0.8)) drop-shadow(0 0 ${isMobile ? 16 : 28}px rgba(${step.rgb}, 0.4))`,
            opacity: 0,
          }}
        >
          <img
            src={step.image}
            alt={step.label}
            width={stoneSize}
            height={stoneSize}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
