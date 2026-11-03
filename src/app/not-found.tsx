import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ReviewBar } from "@/components/ui/ReviewNotesToggle";
import { newsreader } from "./fonts";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={`${newsreader.variable} flex flex-1 flex-col`}>
    {siteConfig.reviewMode ? <ReviewBar /> : null}
    <SiteChrome>
    <div className="bg-ivory-100">
      <Container className="py-[clamp(4rem,10vw,8rem)]">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-5 max-w-3xl text-h1">We couldn’t find that page.</h1>
        <p className="mt-6 max-w-xl text-lead text-slate">
          The page may have moved during our website update. Try one of these instead:
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Services &amp; Programs
          </ButtonLink>
          <ButtonLink href={siteConfig.primaryCta.href} variant="secondary">
            {siteConfig.primaryCta.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
    </SiteChrome>
    </div>
  );
}
