"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

/** Thin reading-progress bar pinned to the top of the viewport. Decorative. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-[75] h-[3px] origin-left", className)}
    />
  );
}
