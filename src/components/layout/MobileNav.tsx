"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { buttonBase } from "@/components/ui/ButtonLink";
import { isCurrent } from "./NavLinks";

const ease = [0.22, 1, 0.36, 1] as const;

/** Radix Dialog provides the focus trap, Escape handling, scroll lock and focus return. */
export function MobileNav({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm px-3 font-semibold lg:hidden",
          triggerClassName ?? "text-navy-900 hover:bg-ivory-100",
        )}
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="max-[360px]:sr-only">Menu</span>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-ink/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <m.div
                className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,90vw)] flex-col overflow-y-auto bg-ivory-50 shadow-lift focus:outline-none"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.24, ease }}
              >
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <Dialog.Title className="font-display text-xl font-semibold text-navy-900">Menu</Dialog.Title>
                  <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                  <Dialog.Close className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm px-3 font-semibold text-navy-900 hover:bg-ivory-100">
                    <X aria-hidden="true" className="size-5" />
                    <span>Close</span>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="px-5 py-4">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        href="/"
                        onClick={close}
                        aria-current={pathname === "/" ? "page" : undefined}
                        className="flex min-h-12 items-center border-b border-line font-display text-2xl font-semibold text-navy-900 aria-[current=page]:text-navy-700 aria-[current=page]:underline aria-[current=page]:decoration-gold-400 aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                      >
                        Home
                      </Link>
                    </li>
                    {siteConfig.nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                          className="flex min-h-12 items-center border-b border-line font-display text-2xl font-semibold text-navy-900 aria-[current=page]:text-navy-700 aria-[current=page]:underline aria-[current=page]:decoration-gold-400 aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto px-5 pb-8 pt-4">
                  <Link
                    href={siteConfig.primaryCta.href}
                    onClick={close}
                    className={cn(buttonBase, "w-full bg-navy-900 text-ivory-50 hover:bg-navy-800")}
                  >
                    {siteConfig.primaryCta.label}
                  </Link>
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
