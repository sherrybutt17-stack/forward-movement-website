"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { spring } from "@/components/motion/tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/** Gently pulls its child toward a fine pointer (mouse). Inert for touch and reduced motion. */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const x = useSpring(useMotionValue(0), spring.follow);
  const y = useSpring(useMotionValue(0), spring.follow);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div ref={ref} onPointerMove={move} onPointerLeave={reset} style={{ x, y }} className={className ?? "inline-block"}>
      {children}
    </m.div>
  );
}
