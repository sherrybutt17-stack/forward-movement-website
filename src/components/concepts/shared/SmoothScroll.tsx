"use client";

import { useEffect } from "react";
import { cancelFrame, frame } from "motion/react";

/**
 * Inertial smooth scrolling (Lenis) for concept pages. Loaded after hydration in its own chunk.
 * Off for touch devices and reduced motion; paused while a dialog locks scrolling (mobile menu).
 * Native scroll position is kept in sync, so sticky sections and scroll-linked effects still work.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let destroyed = false;
    let cleanup = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, anchors: { offset: -88 }, autoRaf: false });
      const tick = (data: { timestamp: number }) => lenis.raf(data.timestamp);
      frame.update(tick, true);
      const observer = new MutationObserver(() => {
        if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
        else lenis.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked", "style"] });
      cleanup = () => {
        cancelFrame(tick);
        observer.disconnect();
        lenis.destroy();
      };
    });
    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);
  return null;
}
