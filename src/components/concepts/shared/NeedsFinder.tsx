"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { AnimatePresence, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { ease } from "@/components/motion/tokens";
import type { FormatId, TrainingFormat } from "@/content/services";
import { cn } from "@/lib/cn";

type Weights = Partial<Record<FormatId, number>>;
interface Option {
  value: string;
  label: string;
  weights?: Weights;
}
interface Step {
  id: "goal" | "location" | "size" | "timing";
  question: string;
  summaryLabel: string;
  options: Option[];
}

/*
 * Recommendations follow the current site's own descriptions of each format:
 * real-world challenges → instructor-led; busy schedules and dispersed teams → virtual;
 * engagement → dynamic. Team size and timing are simply passed on with the enquiry.
 */
const steps: Step[] = [
  {
    id: "goal",
    question: "What’s the main goal?",
    summaryLabel: "Main goal",
    options: [
      { value: "Practical skills for real-world challenges", label: "Practical skills for real-world challenges", weights: { "instructor-led": 3 } },
      { value: "Learning that fits busy schedules", label: "Learning that fits busy schedules", weights: { virtual: 3 } },
      { value: "A lift in engagement and energy", label: "A lift in engagement and energy", weights: { dynamic: 3 } },
    ],
  },
  {
    id: "location",
    question: "Where is your team?",
    summaryLabel: "Team location",
    options: [
      { value: "Mostly in one location", label: "Mostly in one location", weights: { "instructor-led": 1, dynamic: 1 } },
      { value: "Spread across locations", label: "Spread across locations", weights: { virtual: 2 } },
      { value: "A mix of both", label: "A mix of both", weights: { virtual: 1, "instructor-led": 1 } },
    ],
  },
  {
    id: "size",
    question: "Roughly how many people?",
    summaryLabel: "Team size",
    options: [
      { value: "Under 25", label: "Under 25" },
      { value: "25–100", label: "25–100" },
      { value: "More than 100", label: "More than 100" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
  },
  {
    id: "timing",
    question: "When are you hoping to start?",
    summaryLabel: "Timing",
    options: [
      { value: "This quarter", label: "This quarter" },
      { value: "In the next 3–6 months", label: "In the next 3–6 months" },
      { value: "Just exploring", label: "Just exploring" },
    ],
  },
];

export interface FinderTheme {
  root?: string;
  question?: string;
  muted?: string;
  option?: string;
  track?: string;
  bar?: string;
  primary?: string;
  secondary?: string;
  result?: string;
  resultTitle?: string;
  resultBody?: string;
}

function recommend(answers: Record<string, string>, formats: TrainingFormat[]): TrainingFormat {
  const score: Record<string, number> = {};
  for (const step of steps) {
    const option = step.options.find((o) => o.value === answers[step.id]);
    for (const [id, w] of Object.entries(option?.weights ?? {})) score[id] = (score[id] ?? 0) + (w ?? 0);
  }
  return [...formats].sort((a, b) => (score[b.id] ?? 0) - (score[a.id] ?? 0))[0];
}

/**
 * Four quick questions → a suggested starting format and a summary that pre-fills the contact
 * form. Native radios (arrow keys work); mouse/touch picks advance automatically, keyboard
 * users move on with the Next button. Focus follows each step.
 */
export function NeedsFinder({ name, formats, theme = {} }: { name: string; formats: TrainingFormat[]; theme?: FinderTheme }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<number | null>(null);
  const indexRef = useRef(0);
  const done = index >= steps.length;
  const progress = useSpring(0, { stiffness: 160, damping: 26 });

  useEffect(() => {
    progress.set(Math.min(index, steps.length) / steps.length);
  }, [index, progress]);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  function go(next: number) {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
    setDirection(next > indexRef.current ? 1 : -1);
    indexRef.current = next;
    setIndex(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function choose(stepId: string, value: string) {
    setAnswers((current) => ({ ...current, [stepId]: value }));
  }

  // Only real pointer releases advance automatically; keyboard users use the Next button.
  // The timer only advances if the visitor is still on the step where they clicked.
  function pointerPick(event: PointerEvent<HTMLLabelElement>) {
    if (!event.isPrimary) return;
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const pickedAt = indexRef.current;
    advanceTimer.current = window.setTimeout(() => {
      if (indexRef.current === pickedAt) go(pickedAt + 1);
    }, 320);
  }

  const result = done ? recommend(answers, formats) : null;
  const summary = steps.map((step) => `${step.summaryLabel}: ${answers[step.id] ?? "—"}`);
  const contactHref = result
    ? `/contact?need=${encodeURIComponent(`Needs finder answers — ${summary.join("; ")}. Interested in: ${result.name}.`)}`
    : "/contact";
  const step = steps[index];

  return (
    <div className={cn("finder", theme.root)}>
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className={cn("text-sm font-semibold", theme.muted)}>
          {done ? "Your suggestion" : `Step ${index + 1} of ${steps.length}`}
        </p>
        {index > 0 ? (
          <button
            type="button"
            onClick={() => go(done ? steps.length - 1 : index - 1)}
            className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold", theme.secondary)}
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> Back
          </button>
        ) : null}
      </div>
      <div aria-hidden="true" className={cn("mt-3 h-1.5 overflow-hidden rounded-full", theme.track)}>
        <m.div style={{ scaleX: progress }} className={cn("h-full origin-left rounded-full", theme.bar)} />
      </div>

      <div className="relative mt-8 min-h-[22rem]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={done ? "result" : step.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: ease.out }}
          >
            {!done ? (
              <fieldset>
                <legend className="w-full">
                  <div ref={headingRef} tabIndex={-1} className={cn("text-2xl font-semibold leading-tight focus:outline-none sm:text-3xl", theme.question)}>
                    {step.question}
                  </div>
                </legend>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {step.options.map((option) => (
                    <label
                      key={option.value}
                      onPointerUp={pointerPick}
                      className={cn(
                        "flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border-2 px-5 py-4 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2",
                        theme.option,
                      )}
                    >
                      <input
                        type="radio"
                        name={`${name}-${step.id}`}
                        value={option.value}
                        checked={answers[step.id] === option.value}
                        onChange={() => choose(step.id, option.value)}
                        className="size-5 shrink-0 accent-current"
                      />
                      <span className="font-semibold">{option.label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={!answers[step.id]}
                    onClick={() => go(index + 1)}
                    className={cn("btn-sheen inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40", theme.primary)}
                  >
                    {index === steps.length - 1 ? "See my suggestion" : "Next"} <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </fieldset>
            ) : result ? (
              <div ref={headingRef} tabIndex={-1} className={cn("rounded-3xl p-7 focus:outline-none sm:p-9", theme.result)}>
                <p className="text-xs font-bold uppercase tracking-[0.18em]">We’d suggest starting with</p>
                <p className={cn("mt-2 text-3xl font-bold leading-tight sm:text-4xl", theme.resultTitle)}>{result.name}</p>
                <p className={cn("mt-3 max-w-xl leading-relaxed", theme.resultBody)}>{result.summary}</p>
                <ul className={cn("mt-5 grid gap-1 text-sm", theme.resultBody)}>
                  {summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={contactHref} className={cn("btn-sheen inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold", theme.primary)}>
                    Send this to us <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link href={`/services#${result.id}`} className={cn("inline-flex min-h-12 items-center rounded-full px-5 font-semibold underline underline-offset-4", theme.resultBody)}>
                    How it works
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      go(0);
                    }}
                    className={cn("inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold", theme.resultBody)}
                  >
                    <RotateCcw aria-hidden="true" className="size-4" /> Start over
                  </button>
                </div>
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
