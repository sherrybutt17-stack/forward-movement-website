import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contact, social } from "@/content/contact";
import { identifiers, naicsCodes, naicsReview } from "@/content/credentials";
import { isVisible } from "@/lib/visible";
import { Container } from "@/components/ui/Container";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Wordmark } from "@/components/ui/Wordmark";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();
  const primaryNaics = naicsCodes.find((code) => code.primary);
  const cage = identifiers.find((id) => id.label === "CAGE code");
  const showContact = isVisible(contact.review);
  const showSocial = isVisible(social.review);

  return (
    <footer className="on-dark bg-ink text-navy-100">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1.6fr_0.8fr]">
        <div className="max-w-sm">
          <Wordmark tone="dark" />
          <p className="mt-5 text-[0.9375rem] leading-relaxed">
            Professional development training for public- and private-sector teams, delivered in person and virtually from
            the {contact.address.region}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Explore</h2>
          <ul className="mt-4 flex flex-col">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-ivory-50 hover:underline">
                Home
              </Link>
            </li>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-ivory-50 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {showContact ? (
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-300" />
                <address className="not-italic">
                  {contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-300" />
                <a href={contact.phone.href} className="inline-flex min-h-11 items-center hover:text-ivory-50 hover:underline">
                  <span className="sr-only">Phone: </span>
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-300" />
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:text-ivory-50 hover:underline"
                >
                  <span className="sr-only">Email: </span>
                  {contact.email}
                </a>
              </li>
            </ul>
            <ReviewFlag review={contact.review} tone="dark" className="mt-3" />
          </div>
        ) : null}

        {showSocial ? (
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Follow</h2>
            <ul className="mt-4 flex flex-col">
              {social.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center hover:text-ivory-50 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <ReviewFlag review={social.review} tone="dark" className="mt-3" />
          </div>
        ) : null}
      </Container>

      <div className="border-t border-navy-800">
        <Container className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brandName}. All rights reserved.
          </p>
          {isVisible(naicsReview) && primaryNaics && cage && isVisible(cage.review) ? (
            <p>
              NAICS {primaryNaics.code} · CAGE {cage.value}
            </p>
          ) : null}
        </Container>
      </div>
    </footer>
  );
}
