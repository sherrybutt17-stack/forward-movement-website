import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Review } from "@/content/types";
import { cn } from "@/lib/cn";
import { ReviewFlag } from "./ReviewFlag";

interface PendingStateProps {
  title: string;
  review: Review;
  children?: ReactNode;
  className?: string;
}

/** Labelled empty state for missing client content. Hidden outside review mode. */
export function PendingState({ title, review, children, className }: PendingStateProps) {
  if (!siteConfig.reviewMode) return null;
  return (
    <div className={cn("rounded-md border-2 border-dashed border-navy-200 bg-white/60 p-6 sm:p-8", className)}>
      <ReviewFlag review={review} />
      <p className="mt-3 font-display text-h3 font-semibold text-navy-900">{title}</p>
      {review.note ? <p className="mt-2 max-w-2xl text-slate">{review.note}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
