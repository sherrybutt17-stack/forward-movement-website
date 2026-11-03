import { fromCurrentSite, placeholder, type Reviewable } from "./types";

export interface Faq extends Reviewable {
  question: string;
  answer: string;
}

/**
 * Answers come only from statements on the current site.
 * Questions without a sourced answer are placeholders (review mode only).
 */
export const faqs: Faq[] = [
  {
    question: "Do you offer in-person and virtual training?",
    answer:
      "Yes. We deliver instructor-led training in person and web-based virtual training, and we also offer dynamic training sessions.",
    review: fromCurrentSite(),
  },
  {
    question: "Is the training customized to our organization?",
    answer:
      "Yes. Engagements begin with a diagnostic assessment or training gap analysis, and our instructional design team customizes the curriculum to your needs.",
    review: fromCurrentSite(),
  },
  {
    question: "How often should we schedule dynamic training?",
    answer: "We recommend dynamic training twice a year.",
    review: fromCurrentSite(),
  },
  {
    question: "Do you work with government agencies?",
    answer:
      "Yes. We work with local, state and federal government clients, as well as private-sector organizations and educational institutions.",
    review: fromCurrentSite(),
  },
  {
    question: "Where are you based, and where do you deliver training?",
    answer:
      "We’re based in the Baltimore–Washington region and deliver professional development to clients across the United States.",
    review: fromCurrentSite("Current site: “based in the Baltimore Washington region … across the nation.”"),
  },
  {
    question: "How long are sessions, and how many people can attend?",
    answer: "Answer pending — client to confirm typical session lengths and group sizes for each format.",
    review: placeholder("Supply typical session lengths and group sizes."),
  },
  {
    question: "How is pricing structured?",
    answer: "Answer pending — client to confirm how engagements are priced or quoted.",
    review: placeholder("Confirm whether and how pricing should be described."),
  },
  {
    question: "Can you provide a capability statement?",
    answer: "Answer pending — client to supply the current capability statement (PDF) for download.",
    review: placeholder("Supply the current capability statement PDF."),
  },
];
