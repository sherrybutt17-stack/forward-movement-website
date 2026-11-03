import type { ReactNode } from "react";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}

/** Inner-page hero. The H1 renders immediately (no entrance animation) because it is the LCP element. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-ivory-100">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(115deg,transparent_0,transparent_45%,var(--color-ivory-200)_45%)] md:block" />
      <Container className="relative py-[clamp(3.5rem,7vw,6rem)]">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-h1">{title}</h1>
        {lead ? <div className="mt-6 max-w-2xl text-lead text-slate">{lead}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </div>
  );
}
