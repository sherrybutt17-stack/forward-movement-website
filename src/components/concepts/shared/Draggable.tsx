"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useMotionValue } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

/**
 * Lets mouse users nudge an element around (e.g., sticky notes). Purely playful: content stays
 * readable in place, touch scrolling is untouched, and keyboard users lose nothing.
 */
export function Draggable({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  function down(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if ((event.target as Element).closest("a, button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = { px: event.clientX, py: event.clientY, x: x.get(), y: y.get() };
    setDragging(true);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    x.set(start.current.x + event.clientX - start.current.px);
    y.set(start.current.y + event.clientY - start.current.py);
  }

  function up() {
    start.current = null;
    setDragging(false);
  }

  return (
    <m.div
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      style={{ x, y }}
      data-cursor
      className={cn(
        "rm-still relative h-full",
        dragging ? "z-30 cursor-grabbing select-none" : "cursor-grab",
        className,
      )}
    >
      {children}
    </m.div>
  );
}
