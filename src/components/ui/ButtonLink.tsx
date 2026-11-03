import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-navy-900 text-ivory-50 hover:bg-navy-800 shadow-card hover:shadow-lift",
  accent: "bg-gold-400 text-ink hover:bg-gold-300 shadow-card hover:shadow-lift",
  secondary: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-ivory-50",
  "secondary-dark": "border-2 border-ivory-100 text-ivory-50 hover:bg-ivory-50 hover:text-navy-900",
} as const;

export const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-base font-semibold leading-tight transition-[background-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)] hover:-translate-y-px active:translate-y-0";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", arrow = false, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonBase, variants[variant], className)}>
      {children}
      {arrow ? <ArrowRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={2.25} /> : null}
    </Link>
  );
}
