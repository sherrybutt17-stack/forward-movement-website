import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contact, social } from "@/content/contact";
import { capabilityStatement, certifications, identifiers, naicsCodes, naicsReview } from "@/content/credentials";
import { media } from "@/content/media";
import { sectors } from "@/content/portfolio";
import { stats } from "@/content/proof";
import { approach, approachReview, formats } from "@/content/services";
import { leader } from "@/content/team";
import { fromCurrentSite } from "@/content/types";
import { isVisible, visible } from "@/lib/visible";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Copyable } from "../shared/Copyable";
import { featuredTestimonial } from "../shared/concepts";
import { FormatPicker } from "../shared/FormatPicker";
import { NeedsFinder } from "../shared/NeedsFinder";
import { StickyCta } from "../shared/StickyCta";
import { Magnetic } from "../shared/Magnetic";
import { ScrollProgress } from "../shared/ScrollProgress";
import { SplitWords } from "../shared/SplitWords";
import { ExecDiagram } from "./ExecDiagram";
import { FormatTabs } from "./FormatTabs";
import { plex, plexMono } from "./fonts";
import { ScrollFill } from "./ScrollFill";
import { ThemeToggle } from "./ThemeToggle";

const wrap = "mx-auto w-full max-w-[82rem] px-5 sm:px-8 lg:px-10";
const whyReview = fromCurrentSite("Adapted from the current site’s welcome quote.");

function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("ff-mono inline-flex items-center gap-2 whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.14em] text-navy-700 sm:text-xs sm:tracking-[0.22em]", className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-400 ring-4 ring-gold-100" />
      {children}
    </p>
  );
}

function ExecHeader() {
  const { primary, secondary } = siteConfig.wordmark;
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/85 backdrop-blur-md">
      <div className={cn(wrap, "flex h-[4.5rem] items-center justify-between gap-6")}>
        <Link href="/concepts/1" className="inline-flex min-h-11 items-center gap-3 text-navy-900">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-[linear-gradient(135deg,#1e2d3b,#3d5975)] shadow-card">
            <svg viewBox="0 0 24 24" className="size-4">
              <path d="M6 5 L12 12 L6 19 M13 5 L19 12 L13 19" fill="none" stroke="#edcd1f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block text-[1.05rem] font-semibold tracking-tight">{primary}</span>
            {secondary ? <span className="ff-mono mt-1 block text-[0.625rem] uppercase tracking-[0.24em] text-navy-700">{secondary}</span> : null}
          </span>
          <span className="sr-only"> — home</span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-hairline bg-white/70 p-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-navy-900 transition-colors hover:bg-mist">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={siteConfig.primaryCta.href}
            className="btn-sheen group hidden min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1e2d3b,#2a3d50)] px-5 text-sm font-semibold text-ivory-50 shadow-card lg:inline-flex"
          >
            {siteConfig.primaryCta.label}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <MobileNav triggerClassName="text-navy-900 hover:bg-mist" />
        </div>
      </div>
    </header>
  );
}

export function ExecutiveHome() {
  const visibleStats = visible(stats);
  const cage = identifiers.find((id) => id.label === "CAGE code");
  const uei = identifiers.find((id) => id.label === "UEI");
  const primaryNaics = naicsCodes.find((code) => code.primary);
  const featuredClients = sectors.flatMap((sector) => sector.clients.filter((client) => client.featured).map((client) => client.name));

  return (
    <div className={cn(plex.variable, plexMono.variable, "exec-root concept-smooth ff-executive flex flex-1 flex-col bg-white text-charcoal transition-colors duration-500")}>
      <noscript>
        <style>{".exec-tablist{display:none!important}[data-tabpanel]{display:block!important}.finder-wrap{display:none!important}"}</style>
      </noscript>
      <ScrollProgress className="bg-[linear-gradient(90deg,#3d5975,#edcd1f)]" />
      <ExecHeader />

      <main id="main" tabIndex={-1} className="flex-1 overflow-x-clip focus:outline-none">
        {/* ---------- Hero ---------- */}
        <section aria-labelledby="hero-title" className="bg-mist-glow relative">
          <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,#000,transparent)]" />
          <div className={cn(wrap, "relative grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-16")}>
            <div className="lg:col-span-6">
              <Label>Professional development training</Label>
              <h1 id="hero-title" className="mt-6 text-[clamp(2.7rem,5.6vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-navy-900">
                <SplitWords
                  text="Build the skills that move your organization forward."
                  emphasis={["forward."]}
                  emphasisClassName="text-navy-sheen"
                  stagger={40}
                />
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate">
                Customized professional development for public- and private-sector teams, delivered in person or virtually.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <Link
                    href={siteConfig.primaryCta.href}
                    className="btn-sheen group inline-flex min-h-13 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#1e2d3b,#2a3d50)] px-7 font-semibold text-ivory-50 shadow-lift"
                  >
                    {siteConfig.primaryCta.label}
                    <span className="grid size-7 place-items-center rounded-full bg-gold-400 text-ink transition-transform group-hover:translate-x-0.5">
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                  </Link>
                </Magnetic>
                <Link
                  href="/services"
                  className="border-gradient inline-flex min-h-13 items-center gap-2 rounded-full px-6 font-semibold text-navy-900 shadow-card transition-shadow hover:shadow-lift"
                >
                  Explore services &amp; programs
                </Link>
              </div>
              <ul className="ff-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-navy-700">
                {["Public sector", "Private sector", "Education"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-px w-4 bg-navy-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:col-span-6">
              <ExecDiagram
                steps={isVisible(approachReview) ? approach : []}
                panels={[
                  {
                    id: "photo",
                    depth: 0.6,
                    className: "left-[2%] top-[4%] w-[46%]",
                    content: isVisible(media.trainingSession.review) ? (
                      <div className="glass border-gradient rounded-2xl p-2 shadow-lift">
                        <div className="chevron-reveal relative aspect-[4/3] overflow-hidden rounded-xl">
                          <Image src={media.trainingSession.src} alt={media.trainingSession.alt} fill preload sizes="(min-width: 1024px) 18rem, 45vw" className="object-cover" />
                        </div>
                        <p className="ff-mono px-1.5 pb-1 pt-2 text-[0.6875rem] uppercase tracking-[0.18em] text-navy-700">In session</p>
                      </div>
                    ) : null,
                  },
                  {
                    id: "formats",
                    depth: -0.8,
                    className: "-bottom-[2%] right-0 w-[50%]",
                    content: (
                      <div className="glass border-gradient rounded-2xl p-5 shadow-lift">
                        <p className="ff-mono text-[0.6875rem] uppercase tracking-[0.2em] text-navy-700">Formats</p>
                        <ul className="mt-3 grid gap-2">
                          {formats.map((format, i) => (
                            <li key={format.id} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm font-medium text-navy-900">
                              {format.name.replace(" training", "")}
                              <span className="ff-mono text-xs text-navy-700">0{i + 1}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  },
                  {
                    id: "naics",
                    depth: 1.1,
                    className: "right-[6%] top-[2%]",
                    content:
                      primaryNaics && isVisible(naicsReview) ? (
                        <div className="glass border-gradient rounded-xl px-4 py-3 shadow-card">
                          <p className="ff-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy-700">Primary NAICS</p>
                          <p className="ff-mono mt-0.5 text-lg font-medium text-navy-900">{primaryNaics.code}</p>
                        </div>
                      ) : null,
                  },
                ]}
              />
              <ReviewFlag review={media.trainingSession.review} label="Photo from current site · confirm permission" className="mt-2" />
            </div>
          </div>
        </section>

        {/* ---------- Proof ---------- */}
        {visibleStats.length > 0 ? (
          <section aria-labelledby="numbers-title" className="border-y border-hairline bg-white">
            <h2 id="numbers-title" className="sr-only">
              By the numbers
            </h2>
            <dl className={cn(wrap, "grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0")}>
              {visibleStats.map((stat) => (
                <div key={stat.id} className="flex flex-col px-2 py-10 sm:px-8 sm:first:pl-0">
                  <dt className="ff-mono order-2 mt-3 text-xs uppercase tracking-[0.22em] text-navy-700">{stat.label}</dt>
                  <dd className="text-navy-sheen order-1 text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">{stat.value}</dd>
                  <dd className="order-3 mt-3">
                    <ReviewFlag review={stat.review} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {/* ---------- Clients ---------- */}
        <section aria-labelledby="clients-title" className="py-[clamp(4rem,8vw,7rem)]">
          <div className={wrap}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Label>Selected clients</Label>
                <h2 id="clients-title" className="mt-4 max-w-2xl text-[clamp(2.1rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-900">
                  Trusted by agencies, institutions and companies.
                </h2>
              </div>
              <Link href="/portfolio" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-navy-900">
                View full client lists
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ReviewFlag review={sectors[0].clientsReview} label="Client names from current site · need approval" className="mt-4" />
            <ul className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline sm:grid-cols-2 lg:grid-cols-4">
              {featuredClients.map((name) => (
                <li
                  key={name}
                  className="group relative flex min-h-24 items-center border-b border-r border-hairline px-6 py-5 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:bg-mist"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[linear-gradient(90deg,#edcd1f,#3d5975)] transition-transform duration-500 group-hover:scale-x-100" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Formats explorer ---------- */}
        <section aria-labelledby="formats-title" className="bg-mist-glow py-[clamp(4rem,8vw,7rem)]">
          <div className={wrap}>
            <div className="mx-auto max-w-3xl text-center">
              <Label className="justify-center">Training formats</Label>
              <h2 id="formats-title" className="mt-4 text-[clamp(2.1rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-900">
                Three formats, each customized to your organization.
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-5xl">
              <FormatTabs formats={visible(formats)} />
            </div>
          </div>
        </section>

        {/* ---------- Approach ---------- */}
        {isVisible(approachReview) ? (
          <section aria-labelledby="approach-title" className="on-dark bg-navy-glow relative overflow-hidden py-[clamp(4.5rem,9vw,8rem)] text-navy-100">
            <div aria-hidden="true" className="dot-grid-light absolute inset-0 [mask-image:radial-gradient(60%_70%_at_50%_30%,#000,transparent)]" />
            <div className={cn(wrap, "relative")}>
              <Label className="text-gold-300 [&>span]:ring-gold-400/20">How engagements work</Label>
              <h2 id="approach-title" className="mt-4 max-w-3xl text-[clamp(2.1rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ivory-50">
                From assessment to <span className="text-gold-sheen">delivery</span>.
              </h2>
              <ReviewFlag review={approachReview} tone="dark" className="mt-4" />
              <div className="relative mt-16">
                <div aria-hidden="true" className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-navy-700 md:block" />
                <ScrollFill className="absolute left-0 right-0 top-[1.4rem] hidden h-px md:block" fillClassName="bg-[linear-gradient(90deg,#edcd1f,#f3e389)]" />
                <RevealGroup as="ol" className="relative grid gap-10 md:grid-cols-3">
                  {approach.map((step, i) => (
                    <RevealItem as="li" key={step.step}>
                      <span aria-hidden="true" className="ff-mono grid size-11 place-items-center rounded-full border border-gold-400/60 bg-[radial-gradient(circle_at_30%_30%,#3d5975,#0f1a24)] text-sm text-gold-300 shadow-[0_0_0_6px_rgb(237_205_31/0.08)]">
                        {step.step}
                      </span>
                      <h3 className="mt-6 text-2xl font-semibold text-ivory-50">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-sm leading-relaxed text-navy-100">{step.description}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------- Format picker ---------- */}
        <section aria-labelledby="picker-title" className="py-[clamp(4rem,8vw,7rem)]">
          <div className={wrap}>
            <div className="border-gradient rounded-3xl p-7 shadow-lift sm:p-12">
              <Label>Find your format</Label>
              <h2 id="picker-title" className="mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-navy-900">
                Not sure where to start? Answer four quick questions.
              </h2>
              <div className="finder-wrap mt-8">
                <NeedsFinder
                  name="exec-finder"
                  formats={visible(formats)}
                  theme={{
                    question: "text-navy-900",
                    muted: "text-navy-700",
                    option: "border-hairline bg-white text-navy-900 hover:border-navy-200 has-[:checked]:border-navy-900 has-[:checked]:bg-mist has-[:checked]:shadow-card has-[:focus-visible]:outline-navy-700",
                    track: "bg-mist",
                    bar: "bg-[linear-gradient(90deg,#3d5975,#edcd1f)]",
                    primary: "bg-[linear-gradient(135deg,#1e2d3b,#2a3d50)] text-ivory-50 shadow-card",
                    secondary: "text-navy-900 hover:bg-mist",
                    result: "bg-navy-glow text-ivory-100 shadow-lift",
                    resultTitle: "text-ivory-50",
                    resultBody: "text-navy-100",
                  }}
                />
              </div>
              <noscript>
                <div className="mt-8">
                  <FormatPicker
                    name="exec-need"
                    theme={{
                      legend: "text-navy-900",
                      option: "border-hairline bg-white text-navy-900 has-[:checked]:border-navy-900 has-[:checked]:bg-mist",
                      hint: "text-slate",
                      result: "bg-navy-glow text-ivory-100",
                      resultTitle: "text-ivory-50",
                      resultBody: "text-navy-100",
                      cta: "bg-gold-400 text-ink",
                      link: "text-gold-300",
                    }}
                  />
                </div>
              </noscript>
            </div>
          </div>
        </section>

        {/* ---------- Founder ---------- */}
        {isVisible(leader.review) ? (
          <section aria-labelledby="founder-title" className="bg-mist py-[clamp(4rem,8vw,7rem)]">
            <div className={cn(wrap, "grid gap-12 lg:grid-cols-12 lg:items-center")}>
              <div className="lg:col-span-5">
                <div className="border-gradient relative grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl shadow-lift [--card-bg:var(--color-mist)]">
                  {leader.photo ? (
                    <Image src={leader.photo.src} alt={leader.photo.alt} fill sizes="(min-width: 1024px) 30rem, 90vw" placeholder="blur" className="chevron-reveal object-cover" />
                  ) : (
                    <>
                      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_20%,#dce5ee,transparent_70%),radial-gradient(60%_50%_at_90%_100%,#fbf3c8,transparent_70%)]" />
                      <span aria-hidden="true" className="text-navy-sheen relative text-[clamp(6rem,14vw,10rem)] font-semibold tracking-[-0.05em]">
                        {leader.initials}
                      </span>
                      <span className="ff-mono absolute bottom-5 left-5 rounded-full bg-white/80 px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.2em] text-navy-700 shadow-card">
                        Portrait · pending
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="lg:col-span-7">
                <Label>Leadership</Label>
                <h2 id="founder-title" className="mt-4 text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-navy-900">
                  {leader.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-navy-700">{leader.role}</p>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">{leader.summary}</p>
                {isVisible(leader.affiliationsReview) ? (
                  <ul className="ff-mono mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em]">
                    {["NAWBO member", "WPEO member", `${leader.boards.length} board roles`].map((chip) => (
                      <li key={chip} className="rounded-full border border-hairline bg-white px-3 py-2 text-navy-900 shadow-card">
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ReviewFlag review={leader.review} className="mt-4" />
                {isVisible(featuredTestimonial.review) ? (
                  <figure className="mt-10 border-l-2 border-gold-400 pl-6">
                    <blockquote className="text-lg italic leading-relaxed text-navy-900">“{featuredTestimonial.quote}”</blockquote>
                    <figcaption className="ff-mono mt-3 text-xs uppercase tracking-[0.2em] text-navy-700">— {featuredTestimonial.attribution}, workshop participant</figcaption>
                  </figure>
                ) : null}
                <Link href="/team" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-900">
                  Meet the team <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------- Procurement panel ---------- */}
        <section aria-labelledby="procurement-title" className="py-[clamp(4rem,8vw,7rem)]">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Label>For contracting officers</Label>
                <h2 id="procurement-title" className="mt-4 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-900">
                  Procurement details, ready to copy.
                </h2>
                <p className="mt-4 text-lg text-slate">Identifiers, codes and certifications in one place.</p>
              </div>
              <div className="border-gradient overflow-hidden rounded-3xl shadow-lift lg:col-span-8">
                <dl className="divide-y divide-hairline">
                  {[cage, uei].map((id) =>
                    id && isVisible(id.review) ? (
                      <div key={id.label} className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8">
                        <dt className="ff-mono text-xs uppercase tracking-[0.2em] text-navy-700">{id.label}</dt>
                        <dd className="flex items-center gap-3">
                          <span className="ff-mono text-xl font-medium text-navy-900">{id.value}</span>
                          {id.review.status !== "placeholder" ? (
                            <Copyable value={id.value} label={id.label} className="text-navy-700 hover:bg-mist" />
                          ) : (
                            <ReviewFlag review={id.review} />
                          )}
                        </dd>
                      </div>
                    ) : null,
                  )}
                  {primaryNaics && isVisible(naicsReview) ? (
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 px-6 py-5 sm:px-8">
                        <dt className="ff-mono text-xs uppercase tracking-[0.2em] text-navy-700">Primary NAICS</dt>
                        <dd className="flex items-center gap-3">
                          <span className="ff-mono text-xl font-medium text-navy-900">{primaryNaics.code}</span>
                          <Copyable value={primaryNaics.code} label="Primary NAICS code" className="text-navy-700 hover:bg-mist" />
                        </dd>
                      <dd className="col-span-2">
                        <details className="faq-item mt-3">
                          <summary className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-900">
                            All {naicsCodes.length} NAICS codes <ArrowRight aria-hidden="true" className="faq-icon size-4" />
                          </summary>
                          <ul className="ff-mono mt-2 grid gap-2 text-sm text-charcoal">
                            {naicsCodes.map((code) => (
                              <li key={code.code} className="flex gap-4">
                                <span className="font-medium text-navy-900">{code.code}</span>
                                <span className="font-sans">{code.title}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </dd>
                    </div>
                  ) : null}
                  <div className="px-6 py-5 sm:px-8">
                    <dt className="ff-mono text-xs uppercase tracking-[0.2em] text-navy-700">Certifications</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {visible(certifications).map((cert) => (
                        <span key={cert.name} className="rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-navy-900">
                          {cert.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-mist px-6 py-5 sm:px-8">
                    <dt className="flex items-center gap-2 font-semibold text-navy-900">
                      <FileText aria-hidden="true" className="size-5" /> Capability statement
                    </dt>
                    <dd>
                      {capabilityStatement.href ? (
                        <a href={capabilityStatement.href} className="font-semibold text-navy-900 underline underline-offset-4">
                          Download PDF
                        </a>
                      ) : (
                        <span className="ff-mono text-xs uppercase tracking-[0.18em] text-navy-700">PDF coming soon</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Why + CTA ---------- */}
        <section aria-labelledby="cta-title" className="on-dark bg-navy-glow relative overflow-hidden">
          <div aria-hidden="true" className="dot-grid-light absolute inset-0 [mask-image:radial-gradient(60%_80%_at_70%_40%,#000,transparent)]" />
          <div className={cn(wrap, "relative grid gap-12 py-[clamp(4.5rem,10vw,8rem)] lg:grid-cols-12 lg:items-end")}>
            <div className="lg:col-span-8">
              {isVisible(whyReview) ? (
                <p className="ff-mono text-xs uppercase tracking-[0.22em] text-gold-300">
                  “Your employees represent more than themselves. They represent your organization.”
                </p>
              ) : null}
              <h2 id="cta-title" className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ivory-50">
                Let’s plan your team’s <span className="text-gold-sheen">next step</span>.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <Magnetic>
                <Link
                  href={siteConfig.primaryCta.href}
                  className="btn-sheen group inline-flex min-h-14 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5dc4f,#e2bf12)] px-7 text-lg font-semibold text-ink shadow-lift"
                >
                  {siteConfig.primaryCta.label}
                  <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              {isVisible(contact.review) ? (
                <a href={contact.phone.href} className="ff-mono inline-flex min-h-11 items-center text-sm uppercase tracking-[0.18em] text-navy-100 hover:text-ivory-50">
                  Or call {contact.phone.display}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-hairline bg-white">
        <div className={cn(wrap, "grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4")}>
          <div>
            <p className="text-lg font-semibold text-navy-900">{siteConfig.brandName}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate">Professional development training · {contact.address.region}</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="ff-mono text-xs uppercase tracking-[0.22em] text-navy-700">Explore</h2>
            <ul className="mt-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-navy-900 hover:text-navy-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {isVisible(contact.review) ? (
            <div>
              <h2 className="ff-mono text-xs uppercase tracking-[0.22em] text-navy-700">Contact</h2>
              <address className="mt-3 not-italic leading-relaxed text-navy-900">
                {contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a href={contact.phone.href} className="inline-flex min-h-11 items-center hover:text-navy-700">
                  {contact.phone.display}
                </a>
                <br />
                <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:text-navy-700">
                  {contact.email}
                </a>
              </address>
            </div>
          ) : null}
          {isVisible(social.review) ? (
            <div>
              <h2 className="ff-mono text-xs uppercase tracking-[0.22em] text-navy-700">Follow</h2>
              <ul className="mt-3">
                {social.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-navy-900 hover:text-navy-700">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className={cn(wrap, "ff-mono flex flex-col gap-1 border-t border-hairline py-6 text-xs uppercase tracking-[0.16em] text-navy-700 sm:flex-row sm:justify-between")}>
          <span>© {siteConfig.brandName}</span>
          {primaryNaics && cage ? (
            <span>
              NAICS {primaryNaics.code} · CAGE {cage.value}
            </span>
          ) : null}
        </div>
      </footer>
      <StickyCta
        label={siteConfig.primaryCta.label}
        href={siteConfig.primaryCta.href}
        contact={isVisible(contact.review) ? { phone: contact.phone, email: contact.email } : null}
        theme={{
          card: "glass border-gradient",
          pill: "bg-[linear-gradient(135deg,#1e2d3b,#2a3d50)] text-ivory-50",
          muted: "ff-mono text-navy-700",
          link: "text-navy-900 hover:text-navy-700",
        }}
      />
    </div>
  );
}
