import { siteConfig } from "@/config/site";
import type { Review } from "@/content/types";
import { cn } from "@/lib/cn";

const labels: Record<Review["source"], string> = {
  "current-site": "Needs approval · from current site",
  brief: "Needs approval · from brief",
  "draft-copy": "Draft copy · needs approval",
  placeholder: "Placeholder · client input needed",
};

interface ReviewFlagProps {
  review: Review;
  /** Override the default label. */
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Text-based approval marker. Renders nothing outside review mode or once approved.
 * Hidden until "Review notes" is switched on (see ReviewNotesToggle).
 */
export function ReviewFlag({ review, label, tone = "light", className }: ReviewFlagProps) {
  if (!siteConfig.reviewMode || review.status === "approved") return null;
  const isPlaceholder = review.status === "placeholder";
  return (
    <span
      data-review-flag
      data-review-note
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed px-2.5 py-0.5 text-xs font-semibold leading-5 tracking-normal normal-case",
        tone === "light"
          ? isPlaceholder
            ? "border-navy-700 bg-navy-100 text-navy-900"
            : "border-[#8a7410] bg-gold-100 text-ink"
          : "border-gold-300 bg-navy-950 text-gold-100",
        className,
      )}
    >
      <span aria-hidden="true">{isPlaceholder ? "◇" : "●"}</span>
      {label ?? labels[review.source]}
    </span>
  );
}
