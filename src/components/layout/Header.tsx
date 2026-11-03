import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory-50">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[72rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <ButtonLink href={siteConfig.primaryCta.href}>{siteConfig.primaryCta.label}</ButtonLink>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
