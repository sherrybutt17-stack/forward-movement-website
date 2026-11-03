"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "fm-exec-theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-exec-theme"] });
  return () => observer.disconnect();
}

/**
 * Light/dark switch for the Executive concept. The new theme wipes in as a circle from the
 * button (View Transitions API); browsers without it, and reduced-motion users, switch instantly.
 */
export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.execTheme === "dark",
    () => false,
  );

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = !dark;
    const apply = () => {
      if (next) document.documentElement.dataset.execTheme = "dark";
      else delete document.documentElement.dataset.execTheme;
      try {
        localStorage.setItem(KEY, next ? "dark" : "light");
      } catch {
        // preference lasts for this page only
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      aria-pressed={dark}
      onClick={toggle}
      className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-hairline bg-white text-navy-900 shadow-card transition-colors hover:bg-mist"
    >
      <Sun aria-hidden="true" className={`absolute size-5 transition-all duration-500 ${dark ? "-translate-y-8 rotate-90 opacity-0" : "opacity-100"}`} />
      <Moon aria-hidden="true" className={`absolute size-5 transition-all duration-500 ${dark ? "opacity-100" : "translate-y-8 -rotate-90 opacity-0"}`} />
      <span className="sr-only">Dark mode</span>
    </button>
  );
}
