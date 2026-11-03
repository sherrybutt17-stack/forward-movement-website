import type { Testimonial } from "@/content/portfolio";
import { cn } from "@/lib/cn";
import { ReviewFlag } from "./ReviewFlag";

export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-md border border-line bg-white p-6 shadow-card", className)}>
      <svg aria-hidden="true" viewBox="0 0 32 24" className="h-6 w-8 text-gold-400">
        <path
          fill="currentColor"
          d="M0 24V14.4C0 6.6 4.2 1.8 12 0l1.4 3C9 4.6 7 7.3 6.8 11H12v13H0Zm19 0V14.4C19 6.6 23.2 1.8 31 0l1 3c-4.4 1.6-6.4 4.3-6.6 8H31v13H19Z"
        />
      </svg>
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-charcoal">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-5 flex flex-col gap-2 text-sm text-slate">
        <span className="font-semibold text-navy-900">{testimonial.attribution ?? "Training participant"}</span>
        <ReviewFlag review={testimonial.review} />
      </figcaption>
    </figure>
  );
}
