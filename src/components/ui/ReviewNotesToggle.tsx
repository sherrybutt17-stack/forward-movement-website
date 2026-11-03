"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "fm-review-notes";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-review-notes"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.reviewNotes === "on";
const getServerSnapshot = () => false;

/**
 * Review tools: approval flags are hidden by default so the mockup reads as a finished site;
 * this switch reveals every flag. Placeholders for missing content always stay visible.
 * Rendered inline inside a top bar so it never covers page content.
 */
export function ReviewNotesToggle() {
  const on = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !on;
    if (next) document.documentElement.dataset.reviewNotes = "on";
    else delete document.documentElement.dataset.reviewNotes;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // storage unavailable; preference lasts for this page only
    }
  }

  return (
    <div className="flex items-center text-sm text-ivory-50">
      <button
        type="button"
        aria-pressed={on}
        onClick={toggle}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2.5 font-semibold hover:text-gold-300 focus-visible:outline-gold-400"
      >
        <span
          aria-hidden="true"
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-gold-400" : "bg-navy-700"}`}
        >
          <span
            className={`absolute left-0 top-0.5 size-4 rounded-full bg-ivory-50 transition-transform ${on ? "translate-x-4.5" : "translate-x-0.5"}`}
          />
        </span>
        Review notes
      </button>
      <Link
        href="/review"
        className="inline-flex min-h-11 items-center rounded-sm px-2.5 font-semibold text-gold-300 hover:text-gold-400 focus-visible:outline-gold-400"
      >
        Checklist
      </Link>
    </div>
  );
}

/** Slim bar above the current-site pages (review mode only). */
export function ReviewBar() {
  return (
    <aside aria-label="Review tools" className="on-dark bg-ink print:hidden">
      <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-x-4 px-3 sm:px-6">
        <p className="py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
          Draft mockup<span className="hidden sm:inline"> · not for publication</span>
        </p>
        <ReviewNotesToggle />
      </div>
    </aside>
  );
}
