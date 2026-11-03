import { siteConfig } from "@/config/site";
import { contact } from "@/content/contact";
import { isVisible } from "@/lib/visible";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { ReviewFlag } from "./ReviewFlag";

interface CtaBandProps {
  title?: string;
  body?: string;
}

export function CtaBand({
  title = "Tell us what your team needs to learn next.",
  body = "Share a few details about your goals, audience and timing, and we’ll talk through the options.",
}: CtaBandProps) {
  const showContact = isVisible(contact.review);
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-navy-900 text-ivory-100">
      <Container className="grid gap-8 py-[clamp(3.5rem,7vw,5.5rem)] lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 id="cta-title" className="text-h2 text-ivory-50">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-lead text-navy-100">{body}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <ButtonLink href={siteConfig.primaryCta.href} variant="accent" arrow>
            {siteConfig.primaryCta.label}
          </ButtonLink>
          {showContact ? (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-navy-100 lg:justify-end">
              <span>
                Or call{" "}
                <a href={contact.phone.href} className="text-link">
                  {contact.phone.display}
                </a>
              </span>
              <ReviewFlag review={contact.review} tone="dark" />
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
