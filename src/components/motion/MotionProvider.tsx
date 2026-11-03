"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { spring } from "./tokens";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * `strict` forbids the heavy `motion` component — use `m` from "motion/react-m".
 * `reducedMotion="user"` disables transform animations for people who prefer reduced motion.
 * The default transition is a soft spring so anything without its own timing still feels smooth.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={spring.soft}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
