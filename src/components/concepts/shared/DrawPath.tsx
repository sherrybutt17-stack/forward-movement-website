"use client";

import * as m from "motion/react-m";

interface DrawPathProps {
  d: string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "miter" | "bevel";
  delay?: number;
  duration?: number;
}

/**
 * A decorative SVG stroke that draws itself once when scrolled into view.
 * Markup is identical with or without reduced motion (no hydration mismatch); the `rm-draw`
 * CSS rule shows the finished stroke for people who prefer reduced motion.
 */
export function DrawPath({ d, delay = 0, duration = 1.1, strokeLinecap = "round", strokeLinejoin = "round", className, ...props }: DrawPathProps) {
  return (
    <m.path
      d={d}
      fill="none"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={className ? `rm-draw ${className}` : "rm-draw"}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.01, delay } }}
      {...props}
    />
  );
}
