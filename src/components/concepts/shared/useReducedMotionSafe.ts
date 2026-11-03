"use client";

import { useReducedMotion } from "motion/react";

/** True when the visitor prefers reduced motion. Scroll-linked effects use this to stay still. */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
