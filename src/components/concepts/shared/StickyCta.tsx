"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { spring } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

export interface StickyCtaTheme {
  pill: string;
  card: string;
  muted: string;
  link: string;
}

interface StickyCtaProps {
  label: string;
  href: string;
  contact: { phone: { display: string; href: string }; email: string } | null;
  theme: StickyCtaTheme;
}

/**
 * Appears once the hero is out of view, follows you down the page, expands into a mini contact
 * card on hover or keyboard focus, and steps aside when the footer arrives.
 */
export function StickyCta({ label, href, contact, theme }: StickyCtaProps) {
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > 640));

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { rootMargin: "0px 0px 120px 0px" });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !nearFooter;

  return (
    <AnimatePresence>
      {visible ? (
        <m.aside
          aria-label="Quick contact"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={spring.snappy}
          className="sticky-cta fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6"
        >
          <div className={cn("overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-20px_rgb(15_26_36/0.55)]", theme.card)}>
            {contact ? (
              <div className="sticky-cta-card">
                <div className="overflow-hidden">
                  <div className="px-5 pb-1 pt-5">
                    <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", theme.muted)}>Prefer to talk?</p>
                    <ul className="mt-2 grid">
                      <li>
                        <a href={contact.phone.href} className={cn("inline-flex min-h-11 items-center gap-2 font-semibold", theme.link)}>
                          <Phone aria-hidden="true" className="size-4" /> {contact.phone.display}
                        </a>
                      </li>
                      <li>
                        <a href={`mailto:${contact.email}`} className={cn("inline-flex min-h-11 items-center gap-2 font-semibold [overflow-wrap:anywhere]", theme.link)}>
                          <Mail aria-hidden="true" className="size-4 shrink-0" /> {contact.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
            <Link href={href} className={cn("btn-sheen group flex min-h-14 items-center justify-between gap-3 rounded-[1.75rem] px-6 font-semibold", theme.pill)}>
              {label}
              <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </m.aside>
      ) : null}
    </AnimatePresence>
  );
}
