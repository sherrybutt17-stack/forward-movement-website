"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrainingFormat } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Accessible tabs (roving focus, arrow keys, Home/End) with a sliding gradient indicator.
 * Without JavaScript every panel is shown (see the <noscript> rule in the page).
 */
export function FormatTabs({ formats }: { formats: TrainingFormat[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const last = formats.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Training formats" onKeyDown={onKey} className="exec-tablist relative grid grid-cols-3 rounded-full border border-hairline bg-white p-1.5 shadow-card">
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 rounded-full bg-[linear-gradient(135deg,#1e2d3b,#3d5975)] shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `calc((100% - 0.75rem) / ${formats.length})`, transform: `translateX(${active * 100}%)` }}
        />
        {formats.map((format, i) => (
          <button
            key={format.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "relative z-10 min-h-12 rounded-full px-3 text-sm font-semibold transition-colors duration-300 sm:text-base",
              active === i ? "text-ivory-50" : "text-navy-900 hover:text-navy-700",
            )}
          >
            {format.name.replace(" training", "")}
            <span className="sr-only"> training</span>
          </button>
        ))}
      </div>

      {formats.map((format, i) => (
        <div
          key={format.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          data-tabpanel
          className="mt-8"
        >
          <div className="grid gap-8 rounded-2xl border-gradient bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="ff-mono text-xs uppercase tracking-[0.2em] text-navy-700">
                Format 0{i + 1} / 0{formats.length}
              </p>
              <h3 className="ff-executive mt-3 text-[2.25rem] font-semibold leading-tight tracking-tight text-navy-900">{format.name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-slate">{format.whatItIs}</p>
              {format.benefits ? <p className="mt-4 font-medium text-navy-900">{format.benefits}</p> : null}
              <Link
                href="/contact"
                className="btn-sheen mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1e2d3b,#2a3d50)] px-6 font-semibold text-ivory-50 shadow-lift"
              >
                {format.ctaLabel} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="rounded-xl bg-mist p-6">
              <p className="ff-mono text-xs uppercase tracking-[0.2em] text-navy-700">Participants experience</p>
              <ul className="mt-4 grid gap-3">
                {format.experience.map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400 ring-4 ring-gold-100" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
