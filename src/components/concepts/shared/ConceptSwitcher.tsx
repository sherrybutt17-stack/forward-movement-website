"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ReviewNotesToggle } from "@/components/ui/ReviewNotesToggle";
import { concepts } from "./concepts";

/** Thin bar above each concept: switch design directions and toggle review notes. Not part of the final site. */
export function ConceptSwitcher() {
  const pathname = usePathname();
  return (
    <div className="on-dark bg-ink text-ivory-100 print:hidden">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-x-4 px-3 sm:px-6">
        <nav aria-label="Design concepts" className="flex flex-wrap items-center gap-x-3">
        <p className="py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
          <span className="hidden sm:inline">Design </span>concepts
        </p>
        <ul className="flex flex-wrap items-center">
          {concepts.map((concept) => {
            const current = pathname === concept.href;
            return (
              <li key={concept.href}>
                <Link
                  href={concept.href}
                  prefetch={false}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 px-2.5 text-sm font-semibold transition-colors sm:px-3",
                    current ? "text-gold-400" : "text-ivory-100 hover:text-gold-300",
                  )}
                >
                  <span className={cn("grid size-6 place-items-center rounded-full border text-xs", current ? "border-gold-400" : "border-navy-700")}>
                    {concept.number}
                  </span>
                  <span className="hidden sm:inline">{concept.name}</span>
                  <span className="sr-only sm:hidden">{concept.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/" prefetch={false} className="inline-flex min-h-11 items-center px-2.5 text-sm text-navy-200 hover:text-ivory-50 sm:px-3">
              Current
            </Link>
          </li>
        </ul>
        </nav>
        {siteConfig.reviewMode ? (
          <aside aria-label="Review tools">
            <ReviewNotesToggle />
          </aside>
        ) : null}
      </div>
    </div>
  );
}
