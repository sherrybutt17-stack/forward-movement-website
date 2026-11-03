"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";
import { spring } from "@/components/motion/tokens";

/** 3D tilt toward the mouse. Inert for touch; `rm-still` flattens it for reduced motion. */
export function Tilt({ children, max = 7, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), spring.follow);
  const rotateY = useSpring(useMotionValue(0), spring.follow);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("rm-still h-full", className)}
    >
      {children}
    </m.div>
  );
}
