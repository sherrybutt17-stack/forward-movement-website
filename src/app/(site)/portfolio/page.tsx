import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { capabilityStatement, certifications, identifiers, naicsCodes, naicsReview } from "@/content/credentials";
import { caseStudies, caseStudiesPending, sectors, testimonials } from "@/content/portfolio";
import { fromCurrentSite } from "@/content/types";
import { isVisible, visible } from "@/lib/visible";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PendingState } from "@/components/ui/PendingState";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Professional development for local, state and federal agencies, educational institutions and private-sector organizations — plus certifications and procurement details.",
  alternates: { canonical: "/portfolio" },
};

const certificationsReview = fromCurrentSite(
  "Certifications appear only as logos on the current site. Confirm each is current, with certifying body and expiration date.",
);

export default function PortfolioPage() {
  const visibleSectors = visible(sectors);
  const showCaseStudies = caseStudies.length > 0 || siteConfig.reviewMode;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work across government, education and business"
        lead="Professional development for local, state and federal agencies, educational institutions and private-sector organizations."
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {[
              ...visibleSectors.map((s) => ({ href: `#${s.id}`, label: s.name })),
              ...(showCaseStudies ? [{ href: "#case-studies", label: "Case studies" }] : []),
              { href: "#capabilities", label: "Capabilities" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-sm border border-navy-200 bg-ivory-50 px-4 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:border-navy-900 hover:bg-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {visibleSectors.map((sector, index) => {
        const sectorTestimonials = visible(testimonials.filter((t) => t.sector === sector.id));
        return (
          <section
            key={sector.id}
            id={sector.id}
            aria-labelledby={`${sector.id}-title`}
            className={index % 2 === 0 ? "bg-ivory-50" : "bg-white"}
          >
            <Container className="py-[clamp(3.5rem,7vw,6rem)]">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <div>
                  <p className="eyebrow">{sector.short}</p>
                  <h2 id={`${sector.id}-title`} className="mt-4 text-h2">
                    {sector.name}
                  </h2>
                  <p className="mt-5 text-lead text-slate">{sector.description}</p>
                  <ReviewFlag review={sector.review} className="mt-4" />
                </div>

                {isVisible(sector.clientsReview) ? (
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                      Client list
                    </h3>
                    <ul className="mt-4 columns-1 gap-8 sm:columns-2">
                      {sector.clients.map((client) => (
                        <li key={client.name} className="mb-2.5 flex break-inside-avoid gap-3 text-charcoal">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-gold-400" />
                          <span>
                            {client.name}
                            {siteConfig.reviewMode && client.check ? (
                              <span className="mt-0.5 block text-xs font-semibold text-navy-700">
                                Check: {client.check}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ReviewFlag review={sector.clientsReview} className="mt-3" />
                  </div>
                ) : null}
              </div>

              {sectorTestimonials.length > 0 ? (
                <div className="mt-14">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                    Participant feedback
                  </h3>
                  <RevealGroup as="ul" className="mt-5 grid gap-6 md:grid-cols-2">
                    {sectorTestimonials.map((testimonial) => (
                      <RevealItem as="li" key={testimonial.quote.slice(0, 40)}>
                        <TestimonialCard testimonial={testimonial} />
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              ) : null}
            </Container>
          </section>
        );
      })}

      {showCaseStudies ? (
        <Section id="case-studies" tone="sand">
          <SectionHeader
            id="case-studies"
            eyebrow="Case studies"
            title="Selected projects"
            intro="Each project is described by the challenge, our approach, the format delivered and the documented outcomes."
          />
          {caseStudies.length > 0 ? (
            <ul className="mt-12 grid gap-8 lg:grid-cols-2">
              {visible(caseStudies).map((study) => (
                <li key={study.title} className="rounded-md bg-white p-7 shadow-card">
                  <h3 className="text-h3">{study.title}</h3>
                  <dl className="mt-5 grid gap-4">
                    {(
                      [
                        ["Challenge", study.challenge],
                        ["Approach", study.approach],
                        ["Format delivered", study.formatDelivered],
                        ["Documented outcomes", study.outcomes],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label}>
                        <dt className="font-semibold text-navy-900">{label}</dt>
                        <dd className="mt-1 text-slate">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ReviewFlag review={study.review} className="mt-4" />
                </li>
              ))}
            </ul>
          ) : (
            <PendingState title="Case studies pending" review={caseStudiesPending} className="mt-12">
              <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {["Challenge", "Approach", "Format delivered", "Documented outcomes"].map((label) => (
                  <div key={label} className="bg-ivory-50 p-5">
                    <p className="font-display text-lg font-semibold text-navy-900">{label}</p>
                    <p className="mt-1 text-sm text-slate">Client-approved content required</p>
                  </div>
                ))}
              </div>
            </PendingState>
          )}
        </Section>
      ) : null}

      <Section id="capabilities" tone="white">
        <SectionHeader
          id="capabilities"
          eyebrow="Capabilities"
          title="Certifications and procurement details"
          intro="Codes, identifiers and certifications for contracting and procurement teams."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal>
            {isVisible(naicsReview) ? (
              <>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">NAICS codes</h3>
                <table className="mt-4 w-full border-collapse text-left">
                  <caption className="sr-only">NAICS codes</caption>
                  <thead>
                    <tr className="border-b-2 border-navy-900 text-sm text-slate">
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        Code
                      </th>
                      <th scope="col" className="py-2 font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {naicsCodes.map((code) => (
                      <tr key={code.code} className="border-b border-line align-top">
                        <th scope="row" className="py-3 pr-4 font-display text-lg font-semibold text-navy-900">
                          {code.code}
                        </th>
                        <td className="py-3 text-charcoal">
                          {code.title}
                          {code.primary ? (
                            <span className="ml-2 rounded-sm bg-gold-100 px-1.5 py-0.5 text-xs font-semibold text-ink">
                              Primary
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReviewFlag review={naicsReview} className="mt-3" />
              </>
            ) : null}
          </Reveal>

          <Reveal className="grid content-start gap-10">
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">Identifiers</h3>
              <dl className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                {visible(identifiers).map((id) => (
                  <div key={id.label} className="bg-ivory-50 p-5">
                    <dt className="text-sm font-semibold text-slate">{id.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-navy-900">{id.value}</dd>
                    <dd className="mt-2">
                      <ReviewFlag review={id.review} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {visible(certifications).length > 0 ? (
              <div>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                  Certifications
                </h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {visible(certifications).map((cert) => (
                    <li key={cert.name} className="rounded-sm border border-line bg-ivory-50 px-4 py-3">
                      <span className="block font-semibold text-navy-900">{cert.name}</span>
                      {cert.detail ? <span className="block text-sm text-slate">{cert.detail}</span> : null}
                    </li>
                  ))}
                </ul>
                <ReviewFlag review={certificationsReview} className="mt-3" />
              </div>
            ) : null}

            {capabilityStatement.href ? (
              <a href={capabilityStatement.href} className="text-link inline-flex min-h-11 items-center gap-2">
                <FileText aria-hidden="true" className="size-5" />
                Download our capability statement (PDF)
              </a>
            ) : siteConfig.reviewMode ? (
              <div className="flex flex-col gap-2 rounded-md border-2 border-dashed border-navy-200 p-5">
                <p className="flex items-center gap-2 font-semibold text-navy-900">
                  <FileText aria-hidden="true" className="size-5" />
                  Capability statement (PDF)
                </p>
                <ReviewFlag review={capabilityStatement.review} />
              </div>
            ) : null}
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
