import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { concepts } from "@/components/concepts/shared/concepts";
import { Container } from "@/components/ui/Container";
import { newsreader } from "../../fonts";

export const metadata: Metadata = { title: "Design concepts" };

export default function ConceptsIndex() {
  return (
    <main id="main" tabIndex={-1} className={`${newsreader.variable} flex-1 bg-ivory-50 focus:outline-none`}>
      <Container className="py-[clamp(3rem,8vw,7rem)]">
        <p className="eyebrow">Homepage design directions</p>
        <h1 className="mt-5 max-w-3xl text-h1">Three concepts to choose from</h1>
        <p className="mt-6 max-w-2xl text-lead text-slate">
          Each concept uses the same approved-or-flagged content. Pick one, and it is rolled out across all five pages.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {concepts.map((concept) => (
            <li key={concept.href}>
              <Link
                href={concept.href}
                className="group flex h-full flex-col rounded-md border border-line bg-white p-7 shadow-card transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="font-display text-5xl font-semibold text-navy-700">{concept.number}</span>
                <span className="mt-4 font-display text-h3 font-semibold text-navy-900">{concept.name}</span>
                <span className="mt-2 flex-1 text-slate">{concept.summary}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-900">
                  View concept <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
