import type { StaticImageData } from "next/image";
import theresaArmsCrossed from "@/assets/team/theresa-proctor-1.jpg";
import theresaSmiling from "@/assets/team/theresa-proctor-2.jpg";
import { siteConfig } from "@/config/site";
import { fromClient, fromCurrentSite, placeholder, type Review, type Reviewable } from "./types";

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
  /** Second approved pose (used where a more formal portrait suits the design). */
  altPhoto: Photo | null;
  credentials: string[];
  /** Short labels for chips and bullets. */
  highlights: string[];
  honors: string[];
  boards: string[];
  memberships: string[];
  affiliationsReview: Review;
}

/*
 * Bio, credentials and headshots supplied by the client ("Dr. Theresa R. Proctor Bio 2026" and
 * two 2026 portraits). Bio text is the client's own, with three typo fixes only:
 * "As a sought-after executive coaches" → "As sought-after…", "solutions delivered sparks" →
 * "solutions … spark", and a stray opening quotation mark removed.
 */
export const leader: Leader = {
  name: "Dr. Theresa R. Proctor",
  role: "Founder & Chief Executive Officer",
  initials: "TP",
  photo: {
    src: theresaSmiling,
    alt: `Dr. Theresa R. Proctor, Founder and CEO of ${siteConfig.brandName}`,
  },
  altPhoto: {
    src: theresaArmsCrossed,
    alt: `Dr. Theresa R. Proctor, Founder and CEO of ${siteConfig.brandName}`,
  },
  photoReview: fromClient("Headshots supplied by the client (2026)."),
  summary:
    "An ICF-credentialed Executive Coach and Learning & Development strategist with more than 25 years of leadership experience, Dr. Theresa helps organizations move from stagnation to sustained excellence and growth.",
  bio: [
    `Dr. Theresa R. Proctor is the Chief Executive Officer of ${siteConfig.brandName}, a premier firm recognized for delivering innovative human capital solutions and transformative leadership development. With more than 25 years of distinguished leadership experience, she is an ICF-credentialed Executive Coach and Learning & Development (L&D) strategist, celebrated for her proven ability to guide organizations from stagnation to sustained excellence and growth.`,
    "A visionary leader and impact-centered professional, Dr. Theresa has built a reputation for designing strategies that not only advance organizational performance but also amplify individual capabilities. She and her team are widely recognized for cultivating thriving workplace cultures, strengthening leadership pipelines and equipping organizations to navigate complexity with agility and confidence.",
    `As sought-after executive coaches and L&D practitioners, ${siteConfig.brandName} partners with global corporations, government agencies and industry-leading organizations. The training and advisory solutions it delivers spark acknowledgement, awareness and action, enabling executives and teams to unlock hidden capacity, enhance decision-making and achieve measurable business impact.`,
    "Her extensive portfolio includes the design and delivery of customized workshops, enterprise leadership programs and culture transformation initiatives that consistently produce tangible outcomes, from improved profitability and performance to stronger employee engagement and retention. Backed by a robust succession of leadership roles, including five senior positions, Dr. Theresa brings an unrivaled depth of hands-on expertise in leadership, communications and customer experience.",
    "A distinguished leader, Dr. Theresa has earned numerous awards and industry accolades for delivering record-setting business results, pioneering innovative solutions and creating sustainable strategies that drive enduring organizational success. Most recently, she was honored as a 2025 Women’s Business Enterprise National Council (WBENC) WBE Star, a national distinction celebrating women business owners whose strategic vision, leadership and community impact propel growth and inspire others. Dr. Theresa and her team are known for their ability to diagnose organizational challenges, architect breakthrough strategies and mobilize cross-functional teams toward transformative growth.",
    "Her coaching clients particularly value her guidance in developing executive presence, emotional intelligence and strategic influence, key levers that strengthen visibility, accelerate career trajectories and expand organizational impact.",
    "Whether through executive coaching, organizational development or enterprise-wide transformation, Dr. Theresa embodies the spirit of growth, resilience and excellence that defines today’s most effective leaders.",
  ],
  credentials: [
    "International Coaching Federation (ICF) – Credentialed Executive Coach",
    "Certified Master Trainer – Association for Talent Development",
    "Certified EQ-i 2.0 and EQ360 Assessor",
    "Certified Diversity & Belonging Facilitator",
    "Certified Culture Facilitator",
    "Certified Virtual Trainer",
  ],
  highlights: ["ICF-credentialed Executive Coach", "ATD Certified Master Trainer", "EQ-i 2.0 & EQ360 Assessor", "2025 WBENC WBE Star"],
  honors: ["2025 WBENC WBE Star"],
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
    "Board service and memberships come from the old website and are not in the 2026 bio — confirm whether to keep them.",
  ),
  review: fromClient("Bio from the client’s 2026 bio document."),
};

/** Add approved team members here. Until then the Team page shows a labelled pending state (review mode only). */
export const teamMembers: Person[] = [];

export const teamPending = placeholder(
  "Supply team members’ names, roles, short bios and approved photos (the current site mentions an instructional design team but names no one).",
);
