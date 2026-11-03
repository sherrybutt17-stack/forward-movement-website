import type { CSSProperties } from "react";

interface Stroke {
  d: string;
  delay: number;
  color?: string;
  width?: number;
  opacity?: number;
}

const navy = "var(--color-navy-900)";
const terracotta = "var(--color-terracotta)";
const gold = "var(--color-gold-400)";

/** Drawn in order, like a facilitator sketching live. Each stroke uses pathLength=1 + CSS. */
const strokes: Stroke[] = [
  // floor
  { d: "M24 432 C 160 426, 380 428, 540 432", delay: 0.2, opacity: 0.35 },
  // easel
  { d: "M330 238 L300 428", delay: 0.35 },
  { d: "M450 238 L482 428", delay: 0.42 },
  { d: "M390 238 L392 412", delay: 0.5, opacity: 0.55 },
  { d: "M306 60 h168 a6 6 0 0 1 6 6 v168 a6 6 0 0 1 -6 6 h-168 a6 6 0 0 1 -6 -6 v-168 a6 6 0 0 1 6 -6 z", delay: 0.6 },
  { d: "M296 58 H484", delay: 0.8, width: 6 },
  // chart on the flip chart
  { d: "M322 88 c 12 -5, 24 5, 36 0 s 24 -5, 32 0", delay: 0.95 },
  { d: "M322 104 h70", delay: 1.05, opacity: 0.6 },
  { d: "M322 220 H458", delay: 1.12 },
  { d: "M334 214 V188", delay: 1.2, color: terracotta, width: 12 },
  { d: "M364 214 V172", delay: 1.3, color: terracotta, width: 12 },
  { d: "M394 214 V152", delay: 1.4, color: terracotta, width: 12 },
  { d: "M424 214 V130", delay: 1.5, color: terracotta, width: 12 },
  { d: "M326 180 C 350 170, 384 150, 446 108", delay: 1.7, color: gold, width: 4 },
  { d: "M446 108 l-17 1 M446 108 l-3 16", delay: 1.95, color: gold, width: 4 },
  // facilitator
  { d: "M262 148 a18 18 0 1 1 -36 0 a18 18 0 1 1 36 0", delay: 2.05 },
  { d: "M226 300 C 222 238, 228 196, 244 186 C 260 196, 268 238, 264 300 Z", delay: 2.2 },
  { d: "M236 300 L230 404", delay: 2.35 },
  { d: "M256 300 L262 404", delay: 2.4 },
  { d: "M258 204 C 274 196, 290 184, 312 166", delay: 2.5 },
  { d: "M232 206 C 220 228, 218 248, 222 268", delay: 2.55 },
  // speech bubble
  { d: "M150 64 h70 a12 12 0 0 1 12 12 v26 a12 12 0 0 1 -12 12 h-34 l-14 16 v-16 h-22 a12 12 0 0 1 -12 -12 v-26 a12 12 0 0 1 12 -12 z", delay: 2.7 },
  { d: "M164 86 h44", delay: 2.9, opacity: 0.7 },
  { d: "M164 98 h28", delay: 2.98, opacity: 0.7 },
  // participants (seen from behind)
  { d: "M86 330 a16 16 0 1 1 -32 0 a16 16 0 1 1 32 0", delay: 3.05 },
  { d: "M150 342 a16 16 0 1 1 -32 0 a16 16 0 1 1 32 0", delay: 3.12 },
  { d: "M207 358 a15 15 0 1 1 -30 0 a15 15 0 1 1 30 0", delay: 3.19 },
  { d: "M42 392 C 46 360, 94 360, 98 392", delay: 3.25 },
  { d: "M106 404 C 110 372, 158 372, 162 404", delay: 3.32 },
  { d: "M164 416 C 168 386, 214 386, 218 416", delay: 3.39 },
  // sparkles
  { d: "M516 64 v18 M507 73 h18", delay: 3.55, color: gold, width: 3.5 },
  { d: "M284 26 v12 M278 32 h12", delay: 3.65, color: gold, width: 3.5 },
  { d: "M112 206 v14 M105 213 h14", delay: 3.75, color: gold, width: 3.5 },
];

/**
 * Hand-drawn training-room scene that sketches itself on load (CSS stroke animation, no JS).
 * Decorative: the real photo sits alongside it. Reduced motion shows the finished drawing.
 */
export function WorkshopScene({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 560 470" className={className}>
      {strokes.map((stroke, i) => (
        <path
          key={i}
          d={stroke.d}
          pathLength={1}
          fill="none"
          stroke={stroke.color ?? navy}
          strokeWidth={stroke.width ?? 3}
          strokeOpacity={stroke.opacity ?? 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-stroke"
          style={{ "--draw-delay": `${stroke.delay}s`, animationDuration: stroke.width && stroke.width > 6 ? "0.5s" : "0.9s" } as CSSProperties}
        />
      ))}
    </svg>
  );
}
