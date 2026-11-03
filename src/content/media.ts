import trainingSession from "@/assets/current-site/training-session.jpg";
import { fromCurrentSite, placeholder, type Review } from "./types";

export const media = {
  trainingSession: {
    src: trainingSession,
    alt: "A facilitator presents a slide titled “Social Awareness” to participants seated around a conference table.",
    review: fromCurrentSite(
      "Downloaded from the current site (file “speakingdod.jpg”, 640×480). Confirm the event, permission and photo releases, and supply a higher-resolution original.",
    ),
  },
} as const;

export interface PendingAsset {
  name: string;
  file: string;
  review: Review;
}

/**
 * Current-site images that could not be retrieved automatically (the Wix CDN blocks automated
 * downloads). Export the originals from Wix Media Manager, add them to src/assets/current-site/,
 * then import them above.
 */
export const pendingAssets: PendingAsset[] = [
  {
    name: "Logo",
    file: "Forward-Movement-Logo.jpg (328×100 on site)",
    review: placeholder("Supply vector logo files (SVG/EPS/AI). The site currently uses a typeset wordmark."),
  },
  {
    name: "Speaking photo",
    file: "Speaking USDA 2.jpg",
    review: placeholder("Export original from Wix and confirm event and permission."),
  },
  {
    name: "Speaking photo",
    file: "speakingsofcc.jpeg",
    review: placeholder("Export original from Wix and confirm event and permission."),
  },
  {
    name: "Sector gallery photos",
    file: "Government 1, Corporate 1–3, Educational 1/3/4",
    review: placeholder("Export originals from Wix; confirm permission and photo releases for people shown."),
  },
  {
    name: "Solution images",
    file: "Three square images on the current home page",
    review: placeholder("Review before use — if these are stock photography they will not be used."),
  },
  {
    name: "Capability statement",
    file: "Two page images on /project-4",
    review: placeholder("Supply the current capability statement as a PDF."),
  },
];
