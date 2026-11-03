import { Newsreader, Public_Sans } from "next/font/google";

// Display serif for the current-site pages: used by every H1 there (the LCP element), so preloaded.
// Applied only by the (site) layout, 404 and concept index, so concept pages don't download it.
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

// Body/UI sans (USWDS's open typeface), used site-wide. Not preloaded; next/font's
// metric-matched fallback limits layout shift.
export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  preload: false,
});
