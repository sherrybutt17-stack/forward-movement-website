"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {siteConfig.nav.map((item) => {
        const current = isCurrent(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center rounded-sm px-3 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-navy-700",
                "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-200 hover:after:scale-x-100",
                current && "after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
