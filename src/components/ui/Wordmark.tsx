import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={cn("shrink-0", className ?? "size-10")}>
      <rect width="40" height="40" rx="8" fill="#1E2D3B" />
      <path d="M11 11 L20 20 L11 29" fill="none" stroke="#EDCD1F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 11 L30 20 L21 29" fill="none" stroke="#F5F0E4" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Typeset wordmark built from the brand-name setting (placeholder until vector logo files are supplied). */
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { primary, secondary } = siteConfig.wordmark;
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 rounded-sm sm:gap-3",
        tone === "light" ? "text-navy-900" : "text-ivory-50",
      )}
    >
      <BrandMark className="size-9 sm:size-10" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.125rem] font-semibold tracking-tight sm:text-[1.3rem]">{primary}</span>
        {secondary ? (
          <span
            className={cn(
              "mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
              tone === "light" ? "text-navy-700" : "text-gold-300",
            )}
          >
            {secondary}
          </span>
        ) : null}
        <span className="sr-only"> — home</span>
      </span>
    </Link>
  );
}
