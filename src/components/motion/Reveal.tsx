"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { duration, ease } from "./tokens";

/*
 * Restrained, once-only reveals for below-the-fold content.
 * Never wrap the hero H1 / LCP element. If JavaScript is off or the user prefers reduced motion,
 * CSS in globals.css and the root layout forces [data-reveal] content visible.
 */

const viewport = { once: true, margin: "0px 0px -8% 0px" } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.reveal, ease: ease.out, delay }}
    >
      {children}
    </m.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  stagger?: number;
}

/** Staggers its direct RevealItem children once, as the group scrolls into view. */
export function RevealGroup({ children, className, as = "div", stagger = 0.09 }: RevealGroupProps) {
  const Component = as === "ul" ? m.ul : as === "ol" ? m.ol : m.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component data-reveal className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
