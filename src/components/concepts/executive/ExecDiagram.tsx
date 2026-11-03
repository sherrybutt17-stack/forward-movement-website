"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, animate, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { ease, spring } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

const VIEW = { w: 560, h: 530 };
const ROUTE = "M60 440 C 190 440, 200 270, 300 260 S 430 120, 510 96";
const NODES = [
  { x: 60, y: 440, label: "ASSESS", above: false },
  { x: 300, y: 260, label: "DESIGN", above: true },
  { x: 510, y: 96, label: "DELIVER", above: false },
];
/** Where each step's detail card sits, relative to the diagram. */
const CARD_POSITION = ["left-[4%] bottom-[24%]", "left-[2%] top-[4%]", "right-[0%] top-[30%]"];

interface Step {
  step: string;
  title: string;
  description: string;
}

interface Panel {
  id: string;
  className: string;
  depth: number;
  content: ReactNode;
}

function Layer({ depth, mx, my, dimmed, className, children }: { depth: number; mx: MotionValue<number>; my: MotionValue<number>; dimmed: boolean; className?: string; children: ReactNode }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <m.div style={{ x, y }} className={cn("rm-still absolute transition-opacity duration-500", dimmed && "opacity-25", className)}>
      {children}
    </m.div>
  );
}

/**
 * Interactive hero diagram. Hover or click a step (Assess / Design / Deliver) and the gold
 * signal glides along the route to it while a detail card opens. Glass panels drift with the
 * mouse at different depths. Keyboard: Tab to a step, Enter/Space to open, Escape to close.
 */
export function ExecDiagram({ panels, steps }: { panels: Panel[]; steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fractions = useRef([0, 0.5, 1]);
  const [active, setActive] = useState<number | null>(null);
  const progress = useMotionValue(0);
  const mx = useSpring(useMotionValue(0), spring.follow);
  const my = useSpring(useMotionValue(0), spring.follow);

  const point = (p: number) => {
    const path = pathRef.current;
    if (!path) return { x: NODES[0].x, y: NODES[0].y };
    return path.getPointAtLength(p * path.getTotalLength());
  };
  const cx = useTransform(progress, (p) => point(p).x);
  const cy = useTransform(progress, (p) => point(p).y);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    // Find where each node sits along the route.
    fractions.current = NODES.map((node) => {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= 240; i++) {
        const pt = path.getPointAtLength((i / 240) * total);
        const d = Math.hypot(pt.x - node.x, pt.y - node.y);
        if (d < bestDist) {
          bestDist = d;
          best = i / 240;
        }
      }
      return best;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.set(1);
      return;
    }
    const intro = animate(progress, 1, { duration: 2.6, ease: ease.inOut, delay: 1.1 });
    return () => intro.stop();
  }, [progress]);

  function select(index: number | null) {
    setActive(index);
    if (index === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animate(progress, fractions.current[index], reduce ? { duration: 0 } : { duration: 0.9, ease: ease.out });
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 24);
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 24);
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && active !== null) {
      select(null);
    }
  }

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => (mx.set(0), my.set(0))} onKeyDown={onKey} className="relative aspect-[1.05] w-full">
      <svg aria-hidden="true" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d5975" />
            <stop offset="60%" stopColor="#1e2d3b" />
            <stop offset="100%" stopColor="#edcd1f" />
          </linearGradient>
          <radialGradient id="halo" cx="0.62" cy="0.42" r="0.6">
            <stop offset="0%" style={{ stopColor: "var(--color-navy-100)", stopOpacity: 0.95 }} />
            <stop offset="55%" style={{ stopColor: "var(--color-mist)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-white)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="node" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#3d5975" />
            <stop offset="100%" stopColor="#0f1a24" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <circle cx="330" cy="240" r="250" fill="url(#halo)" />
        {[80, 150, 220].map((r) => (
          <circle key={r} cx="330" cy="240" r={r} fill="none" style={{ stroke: "var(--color-navy-200)" }} strokeWidth="1" strokeDasharray="2 6" />
        ))}
        <path d={ROUTE} fill="none" style={{ stroke: "var(--color-hairline)" }} strokeWidth="14" strokeLinecap="round" />
        <path
          ref={pathRef}
          d={ROUTE}
          fill="none"
          stroke="url(#route)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          className="draw-stroke"
          style={{ "--draw-delay": "300ms" } as CSSProperties}
        />
        <m.circle r="14" cx={cx} cy={cy} fill="#edcd1f" opacity={0.45} filter="url(#glow)" className="rm-hide" />
        <m.circle r="7" cx={cx} cy={cy} fill="#edcd1f" />
        {NODES.map((node, i) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="22" fill="url(#node)" />
            <circle
              cx={node.x}
              cy={node.y}
              r={active === i ? 36 : 31}
              fill="none"
              stroke="#edcd1f"
              strokeOpacity={active === i ? 1 : 0.55}
              strokeWidth={active === i ? 2.5 : 1.5}
              className="transition-all duration-500"
            />
            <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#fcfaf5" fontFamily="var(--font-plex-mono), monospace">
              0{i + 1}
            </text>
            <text
              x={node.x}
              y={node.above ? node.y - 48 : node.y + 60}
              textAnchor="middle"
              fontSize="12"
              letterSpacing="2.5"
              style={{ fill: "var(--color-navy-700)" }}
              fontFamily="var(--font-plex-mono), monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {panels.map((panel) => (
        <Layer key={panel.id} depth={panel.depth} mx={mx} my={my} dimmed={active !== null} className={panel.className}>
          {panel.content}
        </Layer>
      ))}

      {NODES.map((node, i) => (
        <button
          key={node.label}
          type="button"
          aria-expanded={active === i}
          aria-controls="exec-step-card"
          onClick={() => select(active === i ? null : i)}
          onPointerEnter={(event) => event.pointerType === "mouse" && select(i)}
          style={{ left: `${(node.x / VIEW.w) * 100}%`, top: `${(node.y / VIEW.h) * 100}%` }}
          className="absolute z-10 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          <span className="sr-only">
            Step {i + 1}: {steps[i]?.title} — {active === i ? "hide" : "show"} details
          </span>
        </button>
      ))}

      <AnimatePresence>
        {active !== null && steps[active] ? (
          <m.div
            key={active}
            id="exec-step-card"
            role="region"
            aria-label={`Step ${active + 1} details`}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: ease.out }}
            className={cn("glass border-gradient absolute z-20 w-[min(19rem,62%)] rounded-2xl p-5 shadow-lift", CARD_POSITION[active])}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="ff-mono text-[0.6875rem] uppercase tracking-[0.2em] text-navy-700">Step 0{active + 1} / 03</p>
              <button type="button" onClick={() => select(null)} className="-m-2 grid size-11 shrink-0 place-items-center rounded-full text-navy-700 hover:bg-mist">
                <X aria-hidden="true" className="size-4" />
                <span className="sr-only">Close details</span>
              </button>
            </div>
            <p className="-mt-3 text-2xl font-semibold tracking-tight text-navy-900">{steps[active].title}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{steps[active].description}</p>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
