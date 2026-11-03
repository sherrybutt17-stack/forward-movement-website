"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

/** A connector line that fills as its section scrolls through view. Decorative. */
export function ScrollFill({ className, fillClassName }: { className?: string; fillClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const scrollYProgress = useSpring(raw, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <div ref={ref} aria-hidden="true" className={cn("overflow-hidden", className)}>
      <m.div style={{ scaleX: scrollYProgress }} className={cn("rm-still h-full origin-left", fillClassName)} />
    </div>
  );
}
