import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/faqs";
import { approach, approachReview, formats, programs, programsPending } from "@/content/services";
import { isVisible, visible } from "@/lib/visible";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { FormatIcon } from "@/components/ui/FormatIcon";
import { PageHero } from "@/components/ui/PageHero";
import { PendingState } from "@/components/ui/PendingState";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Services & Programs",
  description:
    "Instructor-led, virtual and dynamic training for public- and private-sector teams — customized to your organization, from assessment to delivery.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const visibleFormats = visible(formats);
  const visibleFaqs = visible(faqs);
  const showPrograms = programs.length > 0 || siteConfig.reviewMode;

  const jumpLinks = [
    ...visibleFormats.map((f) => ({ href: `#${f.id}`, label: f.name })),
    ...(isVisible(approachReview) ? [{ href: "#engagements", label: "How engagements work" }] : []),
    ...(showPrograms ? [{ href: "#programs", label: "Programs & topics" }] : []),
    ...(visibleFaqs.length > 0 ? [{ href: "#faq", label: "Questions" }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Services & programs"
        title="Training built around your people and your goals"
        lead="Customized professional development for public- and private-sector teams. Explore our three training formats, how engagements work, and how to get started."
      >
        <nav aria-label="On this page">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {jumpLinks.map((link) => (
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

      {/* One section per training format */}
      {visibleFormats.map((format, index) => (
        <section
          key={format.id}
          id={format.id}
          aria-labelledby={`${format.id}-title`}
          className={index % 2 === 0 ? "bg-ivory-50" : "bg-white"}
        >
          <Container className="grid gap-10 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <FormatIcon id={format.id} />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                Format {index + 1} of {visibleFormats.length}
              </p>
              <h2 id={`${format.id}-title`} className="mt-2 text-h2">
                {format.name}
              </h2>
              <p className="mt-5 text-lead text-slate">{format.summary}</p>
              <ReviewFlag review={format.review} className="mt-4" />
              <div className="mt-8">
                <ButtonLink href={siteConfig.primaryCta.href} arrow>
                  {format.ctaLabel}
                </ButtonLink>
              </div>
            </div>

            <Reveal>
              <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line">
                <div className="bg-white p-6 sm:p-7">
                  <dt className="font-display text-xl font-semibold text-navy-900">What it is</dt>
                  <dd className="mt-2 text-charcoal">{format.whatItIs}</dd>
                </div>
                {isVisible(format.whoFor.review) ? (
                  <div className="bg-white p-6 sm:p-7">
                    <dt className="font-display text-xl font-semibold text-navy-900">Who it’s for</dt>
                    <dd className="mt-2 text-charcoal">{format.whoFor.text}</dd>
                    <dd className="mt-3">
                      <ReviewFlag review={format.whoFor.review} />
                    </dd>
                  </div>
                ) : null}
                {isVisible(format.format.review) ? (
                  <div className="bg-white p-6 sm:p-7">
                    <dt className="font-display text-xl font-semibold text-navy-900">Format &amp; logistics</dt>
                    <dd className="mt-2 text-charcoal">{format.format.text}</dd>
                    <dd className="mt-3">
                      <ReviewFlag review={format.format.review} />
                    </dd>
                  </div>
                ) : null}
                <div className="bg-white p-6 sm:p-7">
                  <dt className="font-display text-xl font-semibold text-navy-900">What participants experience</dt>
                  <dd className="mt-3">
                    <ul className="grid gap-2.5">
                      {format.experience.map((item) => (
                        <li key={item} className="flex gap-3 text-charcoal">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {format.benefits ? <p className="mt-4 font-semibold text-navy-900">{format.benefits}</p> : null}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </Container>
        </section>
      ))}

      {/* How engagements work */}
      {isVisible(approachReview) ? (
        <Section id="engagements" tone="navy">
          <SectionHeader
            id="engagements"
            eyebrow="How engagements work"
            title="Every program starts with your people"
            intro="We don’t start with a catalog. We start by understanding your organization."
            flag={<ReviewFlag review={approachReview} tone="dark" />}
          />
          <RevealGroup as="ol" className="mt-12 grid gap-6 md:grid-cols-3">
            {approach.map((step) => (
              <RevealItem as="li" key={step.step}>
                <div className="h-full rounded-md border border-navy-700 bg-navy-950 p-7">
                  <span aria-hidden="true" className="font-display text-4xl font-semibold text-gold-400">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-h3">
                    <span className="sr-only">Step {Number(step.step)}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-navy-100">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ) : null}

      {/* Programs & topics — no catalog exists yet */}
      {showPrograms ? (
        <Section id="programs" tone="sand">
          <SectionHeader
            id="programs"
            eyebrow="Programs & topics"
            title="Programs and topics"
            intro="Specific programs and topics will be listed here, with the audiences and formats each one supports."
          />
          {programs.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible(programs).map((program) => (
                <li key={program.name} className="rounded-md border border-line bg-white p-6 shadow-card">
                  <h3 className="text-h3">{program.name}</h3>
                  <p className="mt-2 text-slate">{program.description}</p>
                  <ReviewFlag review={program.review} className="mt-3" />
                </li>
              ))}
            </ul>
          ) : (
            <PendingState title="Program catalog pending" review={programsPending} className="mt-10">
              <ul className="grid gap-4 sm:grid-cols-3" aria-label="Example program card layout">
                {["Program name", "Program name", "Program name"].map((label, i) => (
                  <li key={i} className="rounded-md border border-line bg-ivory-50 p-5">
                    <p className="font-display text-lg font-semibold text-navy-900">{label}</p>
                    <p className="mt-1 text-sm text-slate">Audience · Formats available · Short description</p>
                  </li>
                ))}
              </ul>
            </PendingState>
          )}
        </Section>
      ) : null}

      {/* FAQ — native disclosure, keyboard-operable without JavaScript */}
      {visibleFaqs.length > 0 ? (
        <Section id="faq">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeader
              id="faq"
              eyebrow="Questions"
              title="Frequently asked questions"
              intro="Answers drawn from our current materials. More detail is available when you get in touch."
            />
            <div className="divide-y divide-line border-y border-line">
              {visibleFaqs.map((faq) => (
                <details key={faq.question} className="faq-item group">
                  <summary className="flex min-h-14 items-center justify-between gap-6 py-4 font-display text-xl font-semibold text-navy-900 hover:text-navy-700">
                    {faq.question}
                    <Plus aria-hidden="true" className="faq-icon size-5 shrink-0 text-navy-700" />
                  </summary>
                  <div className="pb-6 pr-10">
                    <p className="text-charcoal">{faq.answer}</p>
                    <ReviewFlag review={faq.review} className="mt-3" />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand title="Not sure which format fits?" body="Tell us about your team and goals, and we’ll recommend a starting point." />
    </>
  );
}
