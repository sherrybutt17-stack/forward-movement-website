import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contact, social } from "@/content/contact";
import { certifications, identifiers, naicsCodes } from "@/content/credentials";
import { media } from "@/content/media";
import { sectors, testimonials } from "@/content/portfolio";
import { stats } from "@/content/proof";
import { approach, approachReview, formats, type FormatId } from "@/content/services";
import { leader } from "@/content/team";
import { fromCurrentSite } from "@/content/types";
import { isVisible, visible } from "@/lib/visible";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { DrawPath } from "../shared/DrawPath";
import { Draggable } from "../shared/Draggable";
import { FormatPicker } from "../shared/FormatPicker";
import { NeedsFinder } from "../shared/NeedsFinder";
import { StickyCta } from "../shared/StickyCta";
import { ScrollProgress } from "../shared/ScrollProgress";
import { Tilt } from "../shared/Tilt";
import { Magnetic } from "../shared/Magnetic";
import { SplitWords } from "../shared/SplitWords";
import { caveat, fraunces } from "./fonts";
import { ApproachPath } from "./Motion";
import { WorkshopScene } from "./WorkshopScene";

const wrap = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12";
const whyReview = fromCurrentSite("Adapted from the current site’s welcome quote and opening paragraph.");

/* Hand-drawn doodles for each format (decorative). */
const doodles: Record<FormatId, string[]> = {
  "instructor-led": ["M14 14 h52 v34 h-52 z", "M40 48 v10 M28 70 l12 -12 l12 12", "M22 24 h22 M22 32 h34 M22 40 h16"],
  virtual: ["M16 18 h48 v32 h-48 z", "M8 58 h64 l-6 -8 h-52 z", "M28 34 l8 -6 l8 6 l8 -6"],
  dynamic: ["M44 8 l-20 34 h18 l-6 30 l24 -38 h-18 z", "M12 20 l6 4 M10 44 l7 -1 M66 60 l7 3 M68 18 l-6 5"],
};

const noteColors = [
  "bg-[linear-gradient(160deg,#3a3216,#221d0d)]",
  "bg-[linear-gradient(160deg,#1c3046,#111d2a)]",
  "bg-[linear-gradient(160deg,#21331f,#141f13)]",
  "bg-[linear-gradient(160deg,#3d241c,#241510)]",
];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

function Scribble({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("ff-hand text-[1.6rem] leading-none text-terracotta-700", className)}>{children}</p>;
}

function WorkshopHeader() {
  const { primary, secondary } = siteConfig.wordmark;
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-paper/95 backdrop-blur-sm">
      <div className={cn(wrap, "flex h-[4.5rem] items-center justify-between gap-6")}>
        <Link href="/concepts/2" className="group relative inline-flex min-h-11 flex-col justify-center text-navy-900">
          <span className="ff-workshop text-[1.45rem] font-semibold leading-none tracking-tight">{primary}</span>
          <svg aria-hidden="true" viewBox="0 0 200 12" className="mt-1 h-2 w-full text-gold-400" preserveAspectRatio="none">
            <path d="M2 8 C 50 2, 120 12, 198 4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{secondary ? ` ${secondary}` : ""} — home</span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center font-semibold text-navy-900 hover:text-terracotta-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.primaryCta.href}
            className="btn-sheen hidden min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f8e27a,#edcd1f_50%,#d9b510)] text-ink px-5 font-semibold shadow-[3px_3px_0_var(--color-terracotta)] transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            {siteConfig.primaryCta.label}
          </Link>
          <MobileNav triggerClassName="text-navy-900 hover:bg-ivory-200" />
        </div>
      </div>
    </header>
  );
}

export function WorkshopHome() {
  const visibleStats = visible(stats);
  const notes = visible(testimonials).slice(0, 4);
  const cage = identifiers.find((id) => id.label === "CAGE code");
  const uei = identifiers.find((id) => id.label === "UEI");
  const primaryNaics = naicsCodes.find((code) => code.primary);

  return (
    <div className={cn(fraunces.variable, caveat.variable, "workshop-dark concept-smooth graph-paper flex flex-1 flex-col text-charcoal")}>
      <noscript>
        <style>{".finder-wrap{display:none!important}"}</style>
      </noscript>
      <ScrollProgress className="bg-[linear-gradient(90deg,#c2502e,#edcd1f)]" />
      <WorkshopHeader />

      <main id="main" tabIndex={-1} className="flex-1 overflow-x-clip focus:outline-none">
        {/* ---------- Hero ---------- */}
        <section aria-labelledby="hero-title" className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_55%_at_82%_32%,rgb(237_205_31/0.16),transparent_70%),radial-gradient(38%_50%_at_8%_85%,rgb(194_80_46/0.28),transparent_70%),radial-gradient(50%_40%_at_50%_0%,rgb(61_89_117/0.45),transparent_75%)]" />
          <div className={cn(wrap, "relative grid gap-14 pb-20 pt-12 lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-20")}>
            <div className="relative lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white/70 px-4 py-1.5 text-sm font-semibold text-navy-900">
                <span aria-hidden="true" className="size-2 rounded-full bg-terracotta" />
                Professional development training
              </p>
              <svg aria-hidden="true" viewBox="0 0 60 60" className="pointer-events-none absolute right-[4%] top-6 hidden size-12 text-gold-400 lg:block">
                <DrawPath d="M30 6 L35 24 L54 26 L39 37 L44 55 L30 44 L16 55 L21 37 L6 26 L25 24 Z" stroke="currentColor" strokeWidth={3} delay={1.4} />
              </svg>
              <h1
                id="hero-title"
                className="ff-workshop mt-7 text-[clamp(2.9rem,6.6vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-navy-900"
              >
                <SplitWords
                  text="Build the skills that move your organization forward."
                  emphasis={["forward."]}
                  emphasisClassName="text-ember pr-[0.12em] italic"
                  emphasisDecoration={
                    <svg aria-hidden="true" viewBox="0 0 300 120" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[10%] -inset-y-[18%] h-[136%] w-[120%] overflow-visible">
                      <path
                        pathLength={1}
                        className="draw-stroke"
                        style={{ "--draw-delay": "950ms" } as CSSProperties}
                        d="M150 8 C 60 6, 8 30, 12 62 C 16 98, 110 114, 190 108 C 262 102, 296 76, 288 46 C 280 18, 220 4, 140 12"
                        fill="none"
                        stroke="var(--color-terracotta)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                />
              </h1>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-slate">
                Customized professional development for public- and private-sector teams, delivered in person or virtually.
              </p>
              <div className="relative mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic>
                  <Link
                    href={siteConfig.primaryCta.href}
                    className="btn-sheen inline-flex min-h-13 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f8e27a,#edcd1f_50%,#d9b510)] text-ink px-7 text-lg font-semibold shadow-[4px_4px_0_var(--color-terracotta),0_18px_50px_-18px_rgb(237_205_31/0.55)] transition-transform hover:-translate-y-0.5"
                  >
                    {siteConfig.primaryCta.label}
                    <ArrowRight aria-hidden="true" className="size-5" />
                  </Link>
                </Magnetic>
                <Link href="/services" className="relative inline-flex min-h-11 items-center px-2 text-lg font-semibold text-navy-900">
                  Explore services &amp; programs
                  <svg aria-hidden="true" viewBox="0 0 200 10" preserveAspectRatio="none" className="absolute -bottom-0.5 left-2 h-2 w-[calc(100%-1rem)] text-gold-400">
                    <path d="M2 6 C 60 2, 130 9, 198 4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </Link>
                <Scribble className="absolute -bottom-12 left-6 hidden -rotate-6 sm:block lg:-bottom-14">↑ start here</Scribble>
              </div>
            </div>

            {isVisible(media.trainingSession.review) ? (
              <figure className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
                <WorkshopScene className="w-full [filter:drop-shadow(0_0_6px_rgb(255_255_255/0.14))]" />
                <div className="absolute -bottom-6 right-0 w-[48%] sm:-bottom-8">
                  <div aria-hidden="true" className="absolute inset-0 -rotate-[8deg] bg-[#f4f1ea] p-2 pb-10 shadow-[0_20px_40px_-18px_rgb(0_0_0/0.8)]">
                    <div className="aspect-[4/3] bg-[repeating-linear-gradient(45deg,#ebe6dc_0,#ebe6dc_10px,#e0d9cc_10px,#e0d9cc_20px)]" />
                    <span className="ff-hand absolute bottom-2 left-3 text-lg text-[#5b6672]">photo to come</span>
                  </div>
                  <div className="relative rotate-3 bg-[#f4f1ea] p-2 pb-10 shadow-[0_24px_50px_-18px_rgb(0_0_0/0.85)] transition-transform duration-700 hover:rotate-0">
                    <span aria-hidden="true" className="tape -top-3 left-1/2 w-16 -translate-x-1/2 -rotate-6" />
                    <div className="chevron-reveal relative aspect-[4/3] overflow-hidden bg-navy-100">
                      <Image src={media.trainingSession.src} alt={media.trainingSession.alt} fill preload sizes="(min-width: 1024px) 15rem, 45vw" className="object-cover" />
                    </div>
                    <figcaption className="ff-hand absolute bottom-2 left-3 text-xl text-ink">In the room</figcaption>
                  </div>
                </div>
                <div className="mt-14 flex justify-end">
                  <ReviewFlag review={media.trainingSession.review} label="Photo from current site · confirm permission" />
                </div>
              </figure>
            ) : null}
          </div>
        </section>

        {/* ---------- Flip chart numbers ---------- */}
        {visibleStats.length > 0 ? (
          <section aria-labelledby="numbers-title" className="pb-20">
            <div className={wrap}>
              <div className="wk-surface relative -rotate-[0.6deg] rounded-sm px-6 pb-12 pt-14 sm:px-12">
                <svg aria-hidden="true" viewBox="0 0 30 80" className="absolute -top-6 left-10 h-20 w-8 text-navy-200">
                  <path d="M10 70 V16 a8 8 0 0 1 16 0 V62 a12 12 0 0 1 -24 0 V22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute -bottom-8 right-8 hidden size-28 text-terracotta/15 sm:block">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="9" />
                  <circle cx="64" cy="57" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div aria-hidden="true" className="absolute inset-x-0 top-4 flex justify-center gap-24">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-4 rounded-full border-2 border-navy-200 bg-paper" />
                  ))}
                </div>
                <h2 id="numbers-title" className="ff-hand text-center text-[2rem] text-terracotta-700">
                  By the numbers
                </h2>
                <dl className="mt-8 grid gap-10 sm:grid-cols-3">
                  {visibleStats.map((stat, i) => (
                    <div key={stat.id} className="flex flex-col items-center text-center">
                      <dt className="order-2 mt-2 font-semibold text-slate">{stat.label}</dt>
                      <dd className="ff-workshop relative order-1 text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none text-navy-900">
                        {stat.value}
                        <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-3 w-full">
                          <DrawPath d="M4 10 C 50 4, 120 14, 196 6" stroke="var(--color-gold-400)" strokeWidth={6} delay={0.15 * i} />
                        </svg>
                      </dd>
                      <dd className="order-3 mt-3">
                        <ReviewFlag review={stat.review} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------- Why it matters ---------- */}
        {isVisible(whyReview) ? (
          <section aria-labelledby="why-title" className="py-[clamp(3.5rem,8vw,7rem)]">
            <div className={cn(wrap, "max-w-[64rem]")}>
              <Scribble className="-rotate-2">why it matters →</Scribble>
              <h2 id="why-title" className="ff-workshop mt-4 text-[clamp(2.1rem,4.4vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-navy-900">
                Your employees represent more than themselves. They represent{" "}
                <span className="marker sd-marker [--marker:var(--color-gold-300)]">your organization.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate">
                Retention and development are among the biggest challenges facing public- and private-sector employers. When
                change comes, your people need to be equipped to perform to your standards.
              </p>
              <ReviewFlag review={whyReview} className="mt-4" />
            </div>
          </section>
        ) : null}

        {/* ---------- Formats as index cards ---------- */}
        <section aria-labelledby="formats-title" className="relative py-[clamp(3.5rem,8vw,7rem)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_0%_60%,rgb(194_80_46/0.18),transparent_70%),radial-gradient(35%_50%_at_100%_20%,rgb(61_89_117/0.35),transparent_70%)]" />
          <div className={cn(wrap, "relative")}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 id="formats-title" className="ff-workshop text-[clamp(2.3rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-navy-900">
                Three ways to develop your people
              </h2>
              <Scribble className="rotate-2 md:mb-2">
                not sure which?{" "}
                <Link href="/contact" className="underline decoration-2 underline-offset-4">
                  just ask
                </Link>
              </Scribble>
            </div>
            <RevealGroup as="ul" className="mt-14 grid gap-8 md:grid-cols-3">
              {visible(formats).map((format, i) => (
                <RevealItem as="li" key={format.id}>
                  <Tilt max={6}>
                  <article
                    className={cn(
                      "group relative flex h-full flex-col bg-white px-7 pb-8 pt-10 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_26px_50px_-24px_rgb(0_0_0/0.9)] transition-[transform,box-shadow] duration-300 focus-within:-translate-y-1.5 focus-within:rotate-0 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_0_0_1px_rgb(237_205_31/0.35),0_30px_60px_-24px_rgb(237_205_31/0.25)]",
                      ["-rotate-[1.5deg]", "rotate-1", "-rotate-[0.8deg]"][i],
                      "bg-[repeating-linear-gradient(transparent_0,transparent_31px,rgb(61_89_117/0.14)_31px,rgb(61_89_117/0.14)_32px)] bg-[length:100%_32px] bg-origin-content",
                    )}
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-6 h-px bg-terracotta/60" />
                    <svg aria-hidden="true" viewBox="0 0 80 80" className="size-16 text-navy-900">
                      {doodles[format.id].map((d, j) => (
                        <DrawPath key={j} d={d} stroke="currentColor" strokeWidth={3} delay={0.2 + j * 0.25} duration={0.8} />
                      ))}
                    </svg>
                    <h3 className="ff-workshop mt-6 text-[1.85rem] font-semibold leading-tight text-navy-900">
                      <Link href={`/services#${format.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {format.name}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-slate">{format.summary}</p>
                    <span aria-hidden="true" className="ff-hand mt-6 text-[1.5rem] text-terracotta-700 transition-transform duration-300 group-hover:translate-x-1">
                      see details →
                    </span>
                    <ReviewFlag review={format.review} className="relative mt-3" />
                  </article>
                  </Tilt>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ---------- Find your format (flip chart) ---------- */}
        <section aria-labelledby="picker-title" className="py-[clamp(2rem,5vw,4rem)]">
          <div className={wrap}>
            <div className="wk-surface relative rotate-[0.4deg] rounded-sm p-7 sm:p-12">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#c2502e,#edcd1f,#3d5975)]" />
              <Scribble className="-rotate-1">quick quiz →</Scribble>
              <h2 id="picker-title" className="ff-workshop mt-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-navy-900">
                Which format fits your team? Four quick questions.
              </h2>
              <div className="finder-wrap mt-8">
                <NeedsFinder
                  name="workshop-finder"
                  formats={visible(formats)}
                  theme={{
                    question: "ff-workshop text-navy-900",
                    muted: "ff-hand text-xl text-terracotta-700",
                    option: "rounded-xl border-dashed border-navy-900/25 bg-paper text-navy-900 hover:border-navy-900/60 has-[:checked]:border-solid has-[:checked]:border-terracotta has-[:checked]:bg-rose-100 has-[:focus-visible]:outline-navy-700",
                    track: "bg-ivory-200",
                    bar: "bg-[linear-gradient(90deg,#c2502e,#edcd1f)]",
                    primary: "bg-[linear-gradient(135deg,#f8e27a,#edcd1f_50%,#d9b510)] text-ink shadow-[3px_3px_0_var(--color-terracotta)]",
                    secondary: "text-navy-900 hover:bg-ivory-100",
                    result: "-rotate-[0.6deg] bg-[linear-gradient(150deg,#2f2913,#1d1a0f)] text-navy-900 shadow-[0_0_0_1px_rgb(237_205_31/0.25),0_24px_50px_-24px_rgb(0_0_0/0.9)]",
                    resultTitle: "ff-workshop font-semibold text-navy-900",
                    resultBody: "text-charcoal",
                  }}
                />
              </div>
              <noscript>
                <div className="mt-8">
                  <FormatPicker
                    name="workshop-need"
                    theme={{
                      legend: "text-navy-900",
                      option: "border-dashed border-navy-900/25 bg-paper text-navy-900 has-[:checked]:border-terracotta",
                      hint: "text-slate",
                      result: "bg-gold-100 text-navy-900",
                      resultTitle: "text-navy-900",
                      resultBody: "text-charcoal",
                      cta: "bg-[linear-gradient(135deg,#f8e27a,#edcd1f_50%,#d9b510)] text-ink",
                      link: "text-terracotta-700",
                    }}
                  />
                </div>
              </noscript>
            </div>
          </div>
        </section>

        {/* ---------- Approach: a hand-drawn route ---------- */}
        {isVisible(approachReview) ? (
          <section aria-labelledby="approach-title" className="py-[clamp(3.5rem,8vw,7rem)]">
            <div className={wrap}>
              <h2 id="approach-title" className="ff-workshop text-center text-[clamp(2.3rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-navy-900">
                How we work together
              </h2>
              <div className="mt-3 flex justify-center">
                <ReviewFlag review={approachReview} />
              </div>
              <div className="relative mt-14">
                <ApproachPath className="absolute inset-x-0 top-2 hidden h-28 w-full md:block" />
                <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
                  {approach.map((step, i) => (
                    <li key={step.step} className="flex flex-col items-center text-center">
                      <span className="relative grid size-24 place-items-center rounded-full bg-paper">
                        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full">
                          <DrawPath
                            d="M50 6 C 22 6, 6 26, 8 52 C 10 78, 32 95, 56 93 C 82 91, 96 70, 93 45 C 90 20, 70 5, 44 9"
                            stroke="var(--color-navy-900)"
                            strokeWidth={3}
                            delay={0.25 * i}
                          />
                        </svg>
                        <span aria-hidden="true" className="ff-workshop text-4xl font-semibold text-terracotta-700">
                          {i + 1}
                        </span>
                      </span>
                      <h3 className="ff-workshop mt-5 text-3xl font-semibold text-navy-900">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-xs leading-relaxed text-slate">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------- Sticky-note testimonials ---------- */}
        {notes.length > 0 ? (
          <section aria-labelledby="notes-title" className="relative py-[clamp(3.5rem,8vw,7rem)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_85%_50%,rgb(61_89_117/0.32),transparent_70%),radial-gradient(35%_45%_at_10%_30%,rgb(237_205_31/0.08),transparent_70%)]" />
            <div className={cn(wrap, "relative")}>
              <h2 id="notes-title" className="ff-workshop text-[clamp(2.3rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-navy-900">
                What participants wrote
              </h2>
              <ReviewFlag review={notes[0].review} className="mt-3" />
              <Scribble className="mt-3 hidden rotate-1 lg:block">psst — you can drag these around ↓</Scribble>
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {notes.map((note, i) => (
                  <li key={note.quote.slice(0, 30)}>
                    <Draggable>
                    <figure
                      className={cn(
                        "relative h-full p-6 pt-9 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_24px_44px_-20px_rgb(0_0_0/0.9)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]",
                        noteColors[i % noteColors.length],
                        tilts[i % tilts.length],
                      )}
                    >
                      <span aria-hidden="true" className="absolute left-1/2 top-3 size-4 -translate-x-1/2 rounded-full bg-terracotta shadow-[0_2px_3px_rgb(0_0_0/0.25)]" />
                      <blockquote className="text-[1.0625rem] leading-relaxed text-charcoal">
                        <p>“{note.quote}”</p>
                      </blockquote>
                      <figcaption className="ff-hand mt-4 text-[1.5rem] text-navy-900">— {note.attribution ?? "workshop participant"}</figcaption>
                    </figure>
                    </Draggable>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* ---------- Clients ---------- */}
        <section aria-labelledby="clients-title" className="py-[clamp(3.5rem,8vw,7rem)]">
          <div className={wrap}>
            <h2 id="clients-title" className="ff-workshop text-[clamp(2.3rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-navy-900">
              Who’s been in the room
            </h2>
            <ReviewFlag review={sectors[0].clientsReview} label="Client names from current site · need approval" className="mt-3" />
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {visible(sectors).map((sector) => (
                <div key={sector.id} className="wk-surface rounded-sm border-2 border-dashed border-navy-900/15 p-7">
                  <h3 className="ff-workshop text-2xl font-semibold text-navy-900">{sector.name}</h3>
                  <ul className="mt-5 grid gap-3">
                    {sector.clients
                      .filter((client) => client.featured)
                      .map((client) => (
                        <li key={client.name} className="flex gap-3 text-charcoal">
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0">
                            <DrawPath d="M4 13 l5 5 L20 5" stroke="var(--color-terracotta)" strokeWidth={3} duration={0.5} />
                          </svg>
                          {client.name}
                        </li>
                      ))}
                  </ul>
                  <Link href={`/portfolio#${sector.id}`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4">
                    Full list<span className="sr-only">: {sector.name}</span> <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Founder polaroid ---------- */}
        {isVisible(leader.review) ? (
          <section aria-labelledby="founder-title" className="relative py-[clamp(3.5rem,8vw,7rem)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_25%_50%,rgb(237_205_31/0.12),transparent_70%),radial-gradient(35%_50%_at_90%_80%,rgb(194_80_46/0.16),transparent_70%)]" />
            <div className={cn(wrap, "relative grid gap-14 md:grid-cols-12 md:items-center")}>
              <figure className="mx-auto w-full max-w-sm md:col-span-5">
                <div className="relative -rotate-2 bg-[#f4f1ea] p-3 pb-16 shadow-[0_24px_50px_-18px_rgb(0_0_0/0.85)]">
                  <span aria-hidden="true" className="tape left-1/2 -top-3 -translate-x-1/2 -rotate-3" />
                  {leader.photo ? (
                    <div className="chevron-reveal relative aspect-[4/5] overflow-hidden">
                      <Image src={leader.photo.src} alt={leader.photo.alt} fill sizes="(min-width: 768px) 24rem, 90vw" placeholder="blur" className="object-cover" />
                    </div>
                  ) : (
                    <div className="grid aspect-[4/5] place-items-center bg-[repeating-linear-gradient(45deg,#ebe6dc_0,#ebe6dc_10px,#e0d9cc_10px,#e0d9cc_20px)]">
                      <span aria-hidden="true" className="ff-workshop text-[7rem] font-semibold italic text-ink/80">
                        {leader.initials}
                      </span>
                    </div>
                  )}
                  <figcaption className="ff-hand absolute bottom-4 left-5 text-[1.6rem] text-ink">
                    {leader.photo ? leader.name : "portrait coming soon"}
                  </figcaption>
                </div>
              </figure>
              <div className="md:col-span-7">
                <Scribble className="-rotate-1">meet our founder</Scribble>
                <h2 id="founder-title" className="ff-workshop mt-3 text-[clamp(2.6rem,5.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy-900">
                  {leader.name}
                </h2>
                <p className="mt-2 text-lg font-semibold text-terracotta-700">{leader.role}</p>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate">{leader.summary}</p>
                {isVisible(leader.affiliationsReview) ? (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {["NAWBO member", "WPEO member", `${leader.boards.length} board roles`].map((chip, i) => (
                      <li key={chip} className={cn("px-3 py-1.5 text-sm font-semibold text-navy-900", noteColors[i % noteColors.length], tilts[i % tilts.length])}>
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ReviewFlag review={leader.review} className="mt-4" />
                <Link href="/team" className="mt-8 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4">
                  Meet the team <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------- Credentials ---------- */}
        <section aria-labelledby="credentials-title" className="pb-[clamp(3.5rem,8vw,7rem)]">
          <div className={wrap}>
            <div className="wk-surface rounded-sm p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <h2 id="credentials-title" className="ff-workshop text-3xl font-semibold text-navy-900 lg:col-span-3">
                  Certifications &amp; codes
                </h2>
                <ul className="flex flex-wrap gap-2 lg:col-span-6">
                  {visible(certifications).map((cert) => (
                    <li key={cert.name} className="rounded-full border-2 border-navy-900 px-3 py-1 text-sm font-semibold text-navy-900">
                      {cert.name}
                    </li>
                  ))}
                </ul>
                <dl className="flex flex-wrap gap-6 lg:col-span-3 lg:justify-end">
                  {primaryNaics ? (
                    <div>
                      <dt className="text-sm font-semibold text-slate">NAICS</dt>
                      <dd className="ff-workshop text-2xl font-semibold text-navy-900">{primaryNaics.code}</dd>
                    </div>
                  ) : null}
                  {[cage, uei].map((id) =>
                    id && isVisible(id.review) ? (
                      <div key={id.label}>
                        <dt className="text-sm font-semibold text-slate">{id.label}</dt>
                        <dd className="ff-workshop text-2xl font-semibold text-navy-900">{id.value}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section aria-labelledby="cta-title" className="on-dark border-t border-white/10 bg-[radial-gradient(55%_70%_at_50%_0%,rgb(194_80_46/0.38),transparent_70%),radial-gradient(45%_60%_at_85%_100%,rgb(237_205_31/0.16),transparent_70%),radial-gradient(40%_50%_at_10%_100%,rgb(61_89_117/0.45),transparent_70%),#07090c] text-ivory-100">
          <div className={cn(wrap, "py-[clamp(4.5rem,10vw,8rem)] text-center")}>
            <h2 id="cta-title" className="ff-workshop mx-auto max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ivory-50">
              Let’s map out your team’s{" "}
              <span className="relative inline-block">
                next session.
                <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-4 w-full">
                  <DrawPath d="M4 12 C 80 4, 180 18, 296 8" stroke="var(--color-gold-400)" strokeWidth={6} />
                </svg>
              </span>
            </h2>
            <div className="mt-12 flex flex-col items-center gap-5">
              <Magnetic>
                <Link
                  href={siteConfig.primaryCta.href}
                  className="btn-sheen inline-flex min-h-14 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f5dc4f,#e2bf12)] px-8 text-lg font-semibold text-ink shadow-[4px_4px_0_var(--color-ivory-50)] transition-transform hover:-translate-y-0.5"
                >
                  {siteConfig.primaryCta.label}
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>
              </Magnetic>
              {isVisible(contact.review) ? (
                <a href={contact.phone.href} className="inline-flex min-h-11 items-center text-slate underline underline-offset-4 hover:text-ivory-50">
                  or call {contact.phone.display}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-navy-900/10">
        <div className={cn(wrap, "grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4")}>
          <div>
            <p className="ff-workshop text-2xl font-semibold text-navy-900">{siteConfig.wordmark.primary}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Professional development training from the {contact.address.region}.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className="ff-hand text-[1.6rem] text-terracotta-700">explore</h2>
            <ul className="mt-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-terracotta-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {isVisible(contact.review) ? (
            <div>
              <h2 className="ff-hand text-[1.6rem] text-terracotta-700">say hello</h2>
              <address className="mt-2 not-italic leading-relaxed">
                {contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a href={contact.phone.href} className="inline-flex min-h-11 items-center hover:text-terracotta-700">
                  {contact.phone.display}
                </a>
                <br />
                <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:text-terracotta-700">
                  {contact.email}
                </a>
              </address>
            </div>
          ) : null}
          {isVisible(social.review) ? (
            <div>
              <h2 className="ff-hand text-[1.6rem] text-terracotta-700">follow along</h2>
              <ul className="mt-2">
                {social.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-terracotta-700">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className={cn(wrap, "flex flex-col gap-1 border-t border-navy-900/10 py-6 text-sm text-slate sm:flex-row sm:justify-between")}>
          <span>© {siteConfig.brandName}. All rights reserved.</span>
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
          card: "wk-surface",
          pill: "bg-[linear-gradient(135deg,#f8e27a,#edcd1f_50%,#d9b510)] text-ink",
          muted: "ff-hand text-lg normal-case tracking-normal text-terracotta-700",
          link: "text-navy-900 hover:text-terracotta-700",
        }}
      />
    </div>
  );
}
