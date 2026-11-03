"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

/** Hand-drawn route between the three steps; draws as the section scrolls through view. */
export function ApproachPath({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="size-full">
        <m.path
          d="M40 70 C 180 10, 300 120, 420 60 S 680 10, 800 64 S 1060 120, 1160 50"
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth="3"
          strokeLinecap="round"
          className="rm-draw"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
