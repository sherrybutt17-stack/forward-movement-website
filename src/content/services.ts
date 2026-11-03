import { draftCopy, fromCurrentSite, placeholder, type Review, type Reviewable } from "./types";

export type FormatId = "instructor-led" | "virtual" | "dynamic";

export interface DetailText {
  text: string;
  review: Review;
}

export interface TrainingFormat extends Reviewable {
  id: FormatId;
  name: string;
  /** One-sentence summary used on cards. */
  summary: string;
  whatItIs: string;
  whoFor: DetailText;
  format: DetailText;
  experience: string[];
  /** Organizational benefits stated on the current site, if any. */
  benefits?: string;
  ctaLabel: string;
}

/**
 * The three formats named on the current site. Copy is a plain-language rewrite of the
 * current-site descriptions — no new claims. Unknown logistics are placeholders.
 */
export const formats: TrainingFormat[] = [
  {
    id: "instructor-led",
    name: "Instructor-led training",
    summary:
      "Facilitated sessions built around your organization’s real-world challenges, designed to strengthen initiative, quality and accountability.",
    whatItIs:
      "Live training led by a facilitator. Each curriculum is shaped around the real challenges your people face, pairing practical solutions with a shift in critical thinking that builds initiative, quality, responsibility and achievement.",
    whoFor: {
      text: "Audience details pending — the client to confirm which roles, levels and group sizes this format typically serves.",
      review: placeholder("Confirm intended audiences for instructor-led training."),
    },
    format: {
      text: "Delivered in person by a facilitator. Session length, group size and venue requirements to be confirmed.",
      review: placeholder("Confirm typical session length, group size and on-site requirements."),
    },
    experience: [
      "Work through real-world challenges alongside practical solutions",
      "Build habits around initiative, quality, responsibility and achievement",
      "Interactive discussion that invites everyone to participate",
    ],
    ctaLabel: "Discuss instructor-led training",
    review: fromCurrentSite(
      "Rewritten from the current site’s “Instructor-led Training” description. “Interactive discussion” reflects participant testimonials.",
    ),
  },
  {
    id: "virtual",
    name: "Virtual training",
    summary:
      "Short, web-based microlearning modules that fit around busy schedules and reach teams spread across locations.",
    whatItIs:
      "Online training delivered in short modules — an approach called microlearning — so people can build and retain skills in focused sessions without stepping away from work for long.",
    whoFor: {
      text: "Teams with heavy work schedules, and organizations whose people are spread across multiple states.",
      review: fromCurrentSite("Drawn from the current site’s Virtual Training description."),
    },
    format: {
      text: "Web-based instruction in short modules. Whether sessions are live, self-paced or both — and which platforms are supported — to be confirmed.",
      review: placeholder("Confirm live vs. self-paced delivery, module length and supported platforms."),
    },
    experience: [
      "Short modules designed to support knowledge retention",
      "Instruction that works for visual, auditory and kinesthetic learners",
      "Engagement and collaboration built into each session",
    ],
    benefits: "For your organization: fewer logistics to manage and less time away from work.",
    ctaLabel: "Discuss virtual training",
    review: fromCurrentSite("Rewritten from the current site’s “Virtual Training” description."),
  },
  {
    id: "dynamic",
    name: "Dynamic training",
    summary:
      "A customized, high-energy session that breaks from routine training to re-engage your team — recommended twice a year.",
    whatItIs:
      "Dynamic training is a customized session designed as a welcome change of pace from standard training. Its purpose is to re-energize your team and strengthen engagement, responsibility and initiative. We recommend scheduling it twice a year.",
    whoFor: {
      text: "Organizations that want to lift employee engagement, and teams ready for a break from routine training.",
      review: draftCopy("Inferred from the current site’s Dynamic Training description — confirm."),
    },
    format: {
      text: "Customized for each organization. Delivery options (in person, virtual or both), length and group size to be confirmed.",
      review: placeholder("Confirm delivery options, typical length and group size for dynamic training."),
    },
    experience: [
      "A deliberate change of pace from standard training",
      "Activities focused on engagement, responsibility and initiative",
      "Content customized to your organization",
    ],
    ctaLabel: "Discuss dynamic training",
    review: fromCurrentSite(
      "Plain-language definition of “dynamic training” rewritten from the current site, including the twice-yearly recommendation. Confirm wording.",
    ),
  },
];

export interface ApproachStep extends Reviewable {
  step: string;
  title: string;
  description: string;
}

export const approachReview = fromCurrentSite(
  "Assess → Design → Deliver is summarized from the current site (“diagnostic assessment”, “training gap analysis”, “instructional design team”). Confirm this reflects how engagements run.",
);

export const approach: ApproachStep[] = [
  {
    step: "01",
    title: "Assess",
    description:
      "Every engagement starts with a diagnostic assessment or training gap analysis, so we understand where your people are and where they need to be.",
    review: approachReview,
  },
  {
    step: "02",
    title: "Design",
    description:
      "Our instructional design team builds a curriculum customized to your organization’s needs and performance standards.",
    review: approachReview,
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "We deliver training in the format that fits your team — instructor-led, virtual or dynamic — with real-world challenges at the center.",
    review: approachReview,
  },
];

export interface Program extends Reviewable {
  name: string;
  description: string;
  formats: FormatId[];
}

/** No program or topic catalog exists on the current site. Add approved programs here. */
export const programs: Program[] = [];

export const programsPending = placeholder(
  "Supply the program/topic catalog: names, short descriptions, audiences and available formats.",
);
