import { fromCurrentSite, placeholder, type Reviewable } from "./types";

export interface Certification extends Reviewable {
  name: string;
  detail?: string;
}

const certReview = (detail: string) =>
  fromCurrentSite(
    `Current site shows this only as a logo (${detail}). Confirm the certification is current, the certifying body, the exact designation and the expiration date. Logos are not used without permission.`,
  );

/** Shown as text, never as third-party logos. */
export const certifications: Certification[] = [
  { name: "MBE / DBE", detail: "Minority / Disadvantaged Business Enterprise", review: certReview("“mbe-dbe-certified”") },
  { name: "SBA WOSB", detail: "Women-Owned Small Business", review: certReview("“SBA WOSB”") },
  { name: "WBENC", detail: "Women’s Business Enterprise National Council", review: certReview("“WBENC”") },
  { name: "WSSC Water", detail: "Program to be confirmed", review: certReview("“WSSC_logo”") },
  { name: "SAM.gov", detail: "System for Award Management registration", review: certReview("“SAM Logo”") },
  { name: "Prince George’s County", detail: "Program to be confirmed", review: certReview("county seal") },
  { name: "MDOT", detail: "Program to be confirmed", review: certReview("“MDOT-LOGO”") },
  { name: "SBE", detail: "Small Business Enterprise", review: certReview("“SBE”") },
];

export interface NaicsCode {
  code: string;
  title: string;
  primary?: boolean;
}

export const naicsReview = fromCurrentSite("NAICS codes listed on the current site. Confirm the list and which code is primary.");

export const naicsCodes: NaicsCode[] = [
  { code: "611430", title: "Professional and Management Development Training", primary: true },
  { code: "541611", title: "Administrative Management and General Management Consulting Services" },
  { code: "541612", title: "Human Resources Consulting Services" },
  { code: "541613", title: "Marketing Consulting Services" },
  { code: "541820", title: "Public Relations Agencies" },
  { code: "611699", title: "All Other Miscellaneous Schools and Instruction" },
  { code: "711510", title: "Independent Artists, Writers, and Performers" },
];

export interface Identifier extends Reviewable {
  label: string;
  value: string;
}

export const identifiers: Identifier[] = [
  {
    label: "CAGE code",
    value: "832J9",
    review: fromCurrentSite("CAGE code from the current site. Confirm it is active in SAM.gov."),
  },
  {
    label: "UEI",
    value: "Pending",
    review: placeholder(
      "The current site lists DUNS 080937507, but the federal government retired DUNS in April 2022 in favour of the SAM.gov Unique Entity ID (UEI). Supply the UEI.",
    ),
  },
];

export const capabilityStatement = {
  href: null as string | null,
  review: placeholder(
    "The current site shows the capability statement as two page images. Supply the current PDF to offer as a download.",
  ),
};
