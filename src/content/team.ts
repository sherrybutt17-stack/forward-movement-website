import type { StaticImageData } from "next/image";
import { siteConfig } from "@/config/site";
import { fromCurrentSite, placeholder, type Review, type Reviewable } from "./types";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export interface Person extends Reviewable {
  name: string;
  role: string;
  initials: string;
  /** null until an approved photo is supplied — renders a neutral placeholder, never a stand-in portrait. */
  photo: Photo | null;
  photoReview: Review;
  summary: string;
  bio: string[];
}

export interface Leader extends Person {
  boards: string[];
  memberships: string[];
  affiliationsReview: Review;
}

/*
 * CEO HEADSHOT SLOT
 * When the client supplies the updated, approved headshot:
 *   1. Save it as  src/assets/team/theresa-proctor.jpg  (at least 1200px on the long edge).
 *   2. Add:        import theresaPhoto from "@/assets/team/theresa-proctor.jpg";
 *   3. Set:        photo: { src: theresaPhoto, alt: "Theresa R. Proctor, Founder and CEO" }
 *   4. Set photoReview to { status: "approved", source: "current-site" } (or similar).
 */
export const leader: Leader = {
  name: "Theresa R. Proctor",
  role: "Founder & Chief Executive Officer",
  initials: "TP",
  photo: null,
  photoReview: placeholder("Updated CEO headshot pending from client (min. 1200px, with permission to publish)."),
  summary:
    "Theresa brings more than 20 years of corporate leadership to her work helping people in government agencies and companies perform at their best.",
  bio: [
    `Theresa R. Proctor is the founder and chief executive officer of ${siteConfig.brandName}. She brings more than 20 years of corporate leadership experience and a commitment to adding value to others that sits at the core of the company’s work.`,
    "In corporate roles, she received several awards and recognition for results, sustainability, problem solving and leading change through influence. She led efforts to strengthen corporate cultures and help self-directed teams work collaboratively, improving operational efficiency.",
    "Theresa has traveled from state to state training employees of mid-size to large companies, helping them reach peak performance and competency.",
  ],
  boards: [
    "Prince George’s Chamber of Commerce",
    "Women of Prince George’s",
    "Prince George’s Schools Business Alliance Committee",
    "Prince George’s County Health Coalition",
  ],
  memberships: [
    "National Association of Women Business Owners (NAWBO)",
    "Women Presidents’ Educational Organization (WPEO)",
  ],
  affiliationsReview: fromCurrentSite(
    "Current site says she “has served on the Board of Directors” of these organizations — confirm which roles are current vs. past, and that memberships are current.",
  ),
  review: fromCurrentSite(
    "Bio condensed from the current site without adding facts (removed “record breaking” and “around the globe”). Confirm or supply an updated bio.",
  ),
};

/** Add approved team members here. Until then the Team page shows a labelled pending state (review mode only). */
export const teamMembers: Person[] = [];

export const teamPending = placeholder(
  "Supply team members’ names, roles, short bios and approved photos (the current site mentions an instructional design team but names no one).",
);
