/**
 * Site-wide settings. Every page reads the brand name and contact details from here —
 * never hard-code them in components.
 */

// Read env vars with literal names: Next.js only inlines NEXT_PUBLIC_* values into browser
// bundles when the property is written out (process.env.NAME), never via process.env[key].
const clean = (value: string | undefined) => (value && value.trim() !== "" ? value.trim() : undefined);

/**
 * NAMING DISCREPANCY — needs client decision.
 * The current website, footer and bio all say "Forward Movement Enterprises".
 * The redesign brief says "Forward Movement Entertainment".
 * Default follows the live site; override with NEXT_PUBLIC_BRAND_NAME.
 */
const brandName = clean(process.env.NEXT_PUBLIC_BRAND_NAME) ?? "Forward Movement Enterprises";
const shortName = "Forward Movement";

export const siteConfig = {
  brandName,
  shortName,
  /** Wordmark is typeset from the brand name until vector logo files are supplied. */
  wordmark: {
    primary: shortName,
    secondary: brandName.startsWith(shortName) ? brandName.slice(shortName.length).trim() : "",
  },
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.forwardmovementent.com",
  description:
    "Customized professional development for public- and private-sector teams, delivered in person or virtually.",
  /** Review mode shows approval flags and placeholders. Production builds set this to "false". */
  reviewMode: clean(process.env.NEXT_PUBLIC_REVIEW_MODE) !== "false",
  /** Keep search engines out of preview deployments unless explicitly allowed. */
  allowIndexing: clean(process.env.ALLOW_INDEXING) === "true",
  primaryCta: { label: "Discuss a training need", href: "/contact" },
  nav: [
    { label: "Services & Programs", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
