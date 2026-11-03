import { siteConfig } from "@/config/site";
import type { Review, Reviewable } from "@/content/types";

/** In review mode everything renders (with flags); in production only approved content does. */
export function isVisible(review: Review): boolean {
  return siteConfig.reviewMode || review.status === "approved";
}

export function visible<T extends Reviewable>(items: readonly T[]): T[] {
  return items.filter((item) => isVisible(item.review));
}
