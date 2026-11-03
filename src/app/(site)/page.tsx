import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { certifications, identifiers, naicsCodes, naicsReview } from "@/content/credentials";
import { media } from "@/content/media";
import { sectors, testimonials } from "@/content/portfolio";
import { stats } from "@/content/proof";
import { approach, approachReview, formats } from "@/content/services";
import { leader } from "@/content/team";
import { fromBrief, fromCurrentSite } from "@/content/types";
import { isVisible, visible } from "@/lib/visible";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FormatIcon } from "@/components/ui/FormatIcon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section, SectionHeader } from "@/components/ui/Section";
import { StatList } from "@/components/ui/StatList";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const headlineReview = fromBrief("Headline and subhead are the brief’s suggested direction — draft, not yet approved.");
const whyReview = fromCurrentSite(
  "Heading adapts the current site’s welcome quote (“…They represent your company.” → “organization”, to include public-sector readers); body condenses its opening paragraph on retention and development.",
);
const certificationsReview = fromCurrentSite(
  "Certifications appear only as logos on the current site. Confirm each is current, with certifying body and expiration date.",
);

export default function HomePage() {
  const featuredTestimonial = testimonials.find((t) => t.attribution === "Jessica H.");
  const cage = identifiers.find((id) => id.label === "CAGE code");
  const uei = identifiers.find((id) => id.label === "UEI");
  const primaryNaics = naicsCodes.find((code) => code.primary);
  const visibleSectors = visible(sectors);

  return (
    <>
      {/* Hero — text-first; the H1 renders immediately with no entrance animation (LCP). */}
      <div className="relative overflow-hidden border-b border-line bg-ivory-100">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-[38%] bg-[linear-gradient(115deg,transparent_0,transparent_30%,var(--color-ivory-200)_30%)] lg:block"
        />
        <Container className="relative grid gap-12 py-[clamp(3.5rem,7vw,6.5rem)] lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Professional development training</p>
            <h1 className="mt-5 text-display">Build the skills that move your organization forward.</h1>
            <p className="mt-6 max-w-xl text-lead text-slate">
              Customized professional development for public- and private-sector teams, delivered in person or virtually.
            </p>
            <ReviewFlag review={headlineReview} label="Draft headline · from brief" className="mt-4" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={siteConfig.primaryCta.href} arrow>
                {siteConfig.primaryCta.label}
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services &amp; programs
              </ButtonLink>
            </div>
          </div>

          {isVisible(media.trainingSession.review) ? (
            <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-2/3 w-2/3 rounded-md bg-gold-400" />
              <ImageSlot
                image={media.trainingSession}
                pendingLabel="Training photo pending"
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 32rem, (min-width: 640px) 36rem, 100vw"
                preload
                className="shadow-lift"
              />
              <figcaption className="relative mt-7 text-sm text-slate">
                <ReviewFlag review={media.trainingSession.review} label="Photo from current site · confirm permission" />
              </figcaption>
            </figure>
          ) : null}
        </Container>
      </div>

      {/* Proof points — static figures, flagged until approved. */}
      {visible(stats).length > 0 ? (
        <section aria-labelledby="proof-title" className="on-dark bg-navy-900">
          <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_3fr] lg:items-end lg:gap-14 lg:py-16">
            <div>
              <h2 id="proof-title" className="text-h3 text-ivory-50">
                By the numbers
              </h2>
              <p className="mt-2 text-navy-100">Public-, private- and education-sector training since 2016.</p>
            </div>
            <StatList stats={stats} />
          </Container>
        </section>
      ) : null}

      {/* The problem, in the client's own words from the current site */}
      {isVisible(whyReview) ? (
        <Section id="why" tone="white">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <SectionHeader
              id="why"
              eyebrow="Why it matters"
              title="Your employees represent more than themselves. They represent your organization."
            />
            <Reveal>
              <p className="text-lead text-charcoal">
                Retention and development are among the biggest challenges facing public- and private-sector employers.
                When change comes, your people need to be equipped to perform to your standards.
              </p>
              <ReviewFlag review={whyReview} className="mt-4" />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* Training formats preview */}
      <Section id="formats">
        <SectionHeader
          id="formats"
          eyebrow="Training formats"
          title="Three ways to develop your people"
          intro="Every engagement is customized to your organization. Choose the format that fits how your team works."
        />
        <RevealGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {visible(formats).map((format) => (
            <RevealItem as="li" key={format.id}>
              <article className="group relative flex h-full flex-col rounded-md border border-line bg-white p-7 shadow-card transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-quint)] focus-within:-translate-y-0.5 focus-within:shadow-lift hover:-translate-y-0.5 hover:shadow-lift">
                <FormatIcon id={format.id} />
                <h3 className="mt-6 text-h3">
                  <Link
                    href={`/services#${format.id}`}
                    className="rounded-sm after:absolute after:inset-0 after:rounded-md focus-visible:outline-offset-4"
                  >
                    {format.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-slate">{format.summary}</p>
                <span aria-hidden="true" className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-900">
                  <span className="underline decoration-gold-400 decoration-2 underline-offset-4">See format details</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <ReviewFlag review={format.review} className="relative mt-4" />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Delivery approach — sourced from the current site, flagged for confirmation. */}
      {isVisible(approachReview) ? (
        <Section id="approach" tone="sand">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeader
              id="approach"
              eyebrow="How we work"
              title="From assessment to delivery"
              intro="A straightforward process that starts with understanding your people."
              flag={<ReviewFlag review={approachReview} />}
            />
            <RevealGroup as="ol" className="grid gap-5">
              {approach.map((step) => (
                <RevealItem as="li" key={step.step}>
                  <div className="flex gap-5 rounded-md border border-line bg-ivory-50 p-6">
                    <span aria-hidden="true" className="font-display text-3xl font-semibold leading-none text-navy-700">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-h3">
                        <span className="sr-only">Step {Number(step.step)}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-slate">{step.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      ) : null}

      {/* CEO feature with headshot slot */}
      {isVisible(leader.review) ? (
        <Section id="founder" tone="white">
          <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal className="mx-auto w-full max-w-sm md:max-w-none">
              <ImageSlot
                image={leader.photo}
                pendingLabel="Updated headshot pending"
                monogram={leader.initials}
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 24rem, 100vw"
              />
            </Reveal>
            <div>
              <SectionHeader id="founder" eyebrow="Meet our founder" title={leader.name} />
              <p className="mt-2 font-semibold text-navy-700">{leader.role}</p>
              <p className="mt-6 max-w-xl text-lead text-charcoal">{leader.summary}</p>
              <ul className="mt-6 grid max-w-xl gap-2 text-slate">
                {leader.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReviewFlag review={leader.review} className="mt-5" />
              <div className="mt-8">
                <ButtonLink href="/team" variant="secondary" arrow>
                  Meet the team
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {/* Selected portfolio */}
      {visibleSectors.length > 0 ? (
        <Section id="portfolio-preview">
          <SectionHeader
            id="portfolio-preview"
            eyebrow="Selected portfolio"
            title="Who we’ve worked with"
            intro="Training for government agencies, educational institutions and private-sector organizations across the country."
            flag={<ReviewFlag review={sectors[0].clientsReview} label="Client names from current site · need approval" />}
          />
          <RevealGroup as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
            {visibleSectors.map((sector) => (
              <RevealItem as="li" key={sector.id}>
                <article className="flex h-full flex-col rounded-md border-t-4 border-navy-900 bg-white p-7 shadow-card">
                  <h3 className="text-h3">{sector.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-navy-700">{sector.short}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-charcoal">
                    {sector.clients
                      .filter((client) => client.featured)
                      .map((client) => (
                        <li key={client.name} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-gold-400" />
                          {client.name}
                        </li>
                      ))}
                  </ul>
                  <Link href={`/portfolio#${sector.id}`} className="text-link mt-6 inline-flex min-h-11 w-fit items-center gap-2">
                    Full client list<span className="sr-only">: {sector.name}</span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
          {featuredTestimonial && isVisible(featuredTestimonial.review) ? (
            <Reveal className="mx-auto mt-14 max-w-3xl">
              <TestimonialCard testimonial={featuredTestimonial} className="border-0 bg-ivory-100 shadow-none sm:p-10" />
            </Reveal>
          ) : null}
        </Section>
      ) : null}

      {/* Credentials & procurement snapshot */}
      <Section id="credentials" tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeader
            id="credentials"
            eyebrow="Certifications & procurement"
            title="Details for contracting teams"
            intro="Certifications, codes and identifiers for public- and private-sector procurement."
          />
          <div className="grid gap-8">
            {visible(certifications).length > 0 ? (
              <div>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">Certifications</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {visible(certifications).map((cert) => (
                    <li
                      key={cert.name}
                      className="rounded-sm border border-line bg-ivory-50 px-3 py-2 text-[0.9375rem] font-semibold text-navy-900"
                    >
                      {cert.name}
                    </li>
                  ))}
                </ul>
                <ReviewFlag review={certificationsReview} className="mt-3" />
              </div>
            ) : null}
            <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {primaryNaics && isVisible(naicsReview) ? (
                <div className="bg-ivory-50 p-5">
                  <dt className="text-sm font-semibold text-slate">Primary NAICS</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-navy-900">{primaryNaics.code}</dd>
                  <dd className="mt-1 text-sm text-slate">{primaryNaics.title}</dd>
                </div>
              ) : null}
              {[cage, uei].map((id) =>
                id && isVisible(id.review) ? (
                  <div key={id.label} className="bg-ivory-50 p-5">
                    <dt className="text-sm font-semibold text-slate">{id.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-navy-900">{id.value}</dd>
                    <dd className="mt-2">
                      <ReviewFlag review={id.review} />
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
            <Link href="/portfolio#capabilities" className="text-link inline-flex min-h-11 w-fit items-center gap-2">
              All NAICS codes and capabilities
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
