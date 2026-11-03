/**
 * Every claim, name, statistic, testimonial and contact detail carries a review record.
 * - approved:        client has signed off; renders in production builds.
 * - needs-approval:  real content (from the current site or the brief) awaiting sign-off.
 * - placeholder:     content is missing; the slot is shown only in review mode.
 */
export type ContentStatus = "approved" | "needs-approval" | "placeholder";

export type ContentSource = "current-site" | "brief" | "draft-copy" | "placeholder" | "client";

export interface Review {
  status: ContentStatus;
  source: ContentSource;
  /** What the client needs to confirm, correct or supply. */
  note?: string;
}

export interface Reviewable {
  review: Review;
}

export const fromCurrentSite = (note?: string): Review => ({
  status: "needs-approval",
  source: "current-site",
  note,
});

export const fromBrief = (note?: string): Review => ({
  status: "needs-approval",
  source: "brief",
  note,
});

export const draftCopy = (note?: string): Review => ({
  status: "needs-approval",
  source: "draft-copy",
  note,
});

/** Content the client supplied directly for use on the site (e.g., the 2026 bio and headshots). */
export const fromClient = (note?: string): Review => ({
  status: "approved",
  source: "client",
  note,
});

export const placeholder = (note: string): Review => ({
  status: "placeholder",
  source: "placeholder",
  note,
});
