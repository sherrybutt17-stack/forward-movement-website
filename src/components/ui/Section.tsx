import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const tones = {
  ivory: "bg-ivory-50",
  sand: "bg-ivory-100",
  white: "bg-white",
  navy: "on-dark bg-navy-900 text-ivory-100 [&_h2]:text-ivory-50 [&_h3]:text-ivory-50",
} as const;

interface SectionProps {
  id: string;
  tone?: keyof typeof tones;
  children: ReactNode;
  className?: string;
  /** Use "tight" for sections that sit directly under a hero. */
  spacing?: "default" | "tight";
}

/** A landmark section labelled by its heading (`${id}-title`). */
export function Section({ id, tone = "ivory", spacing = "default", children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        tones[tone],
        spacing === "default" ? "py-[clamp(4rem,8vw,7.5rem)]" : "py-[clamp(3rem,5vw,4.5rem)]",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  flag?: ReactNode;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({ id, eyebrow, title, intro, flag, align = "start", className }: SectionHeaderProps) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={`${id}-title`} className={cn("text-h2", eyebrow && "mt-4")}>
        {title}
      </h2>
      {intro ? <div className="mt-5 text-lead text-slate [.on-dark_&]:text-navy-100">{intro}</div> : null}
      {flag ? <div className="mt-4">{flag}</div> : null}
    </header>
  );
}
