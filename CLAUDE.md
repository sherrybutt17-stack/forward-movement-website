# CLAUDE.md — Forward Movement Website Redesign

@AGENTS.md

> **Source of truth for this project.** Approved plan (2026-11-03) is reproduced below. Keep this file updated when decisions change during the build.

## Non-negotiable rules (read before every change)
- **No invented content.** Never invent staff, titles, bios, programs, client names, testimonials, outcomes, certifications, contracts or performance claims. Missing content = clearly labelled placeholder (`status: 'placeholder'`).
- **Everything unverified is flagged.** All claims/names/stats/contact details live in `src/content/*` with `status` (`approved` | `needs-approval` | `placeholder`) and `source` (`current-site` | `brief` | `placeholder`). Review mode (`NEXT_PUBLIC_REVIEW_MODE`, default `true`) shows visible `<ReviewFlag>` pills; production mode renders only `approved` items. `/review` lists everything pending.
- **Brand name is one setting** — `siteConfig.brandName` in `src/config/site.ts` (default "Forward Movement Enterprises"). The brief said "Forward Movement Entertainment"; this discrepancy stays flagged until the client decides. Never hard-code the brand name elsewhere.
- **CEO headshot:** neutral placeholder only until the client supplies the *updated* approved headshot. Never a stand-in portrait.
- **Forms:** never show success unless the configured endpoint (`CONTACT_FORM_ENDPOINT`) returned 2xx. No secrets in source.
- **Current-site images:** pulled from the Wix site, each flagged "From current site — confirm permission"; no generic stock; no third-party/certification logos without permission.
- **Performance/a11y targets:** Lighthouse Performance ≥ 90 (mobile + desktop), Accessibility/Best Practices/SEO ≥ 95, measured on the production build and reported honestly with test conditions. WCAG 2.2 AA, `prefers-reduced-motion` honoured, content never hidden if animation doesn't run, no animation on the LCP element.
- **Dependencies:** only those in §2 of the plan. Ask before adding anything else.
- **Do not publish/deploy** without client approval and authorized production access.

## Build status (updated 2026-11-03)
- All 5 pages + `/review` + 404 built. Lint, typecheck and build pass; Playwright 59/59 pass; Lighthouse median 100/100/100/100 on all pages, mobile and desktop (`reports/lighthouse/summary.md`).
- Handoff with the client-input list: `docs/HANDOFF.md`. Source text from the old site: `docs/source/current-site-content.md`.
- Deviations from the plan: the headshot drop-in lives at `src/assets/team/` (static import), not `public/`; the copy pass added a sourced "Why it matters" section on Home; the contact form clears errors while typing instead of on blur (blur re-validation shifted the layout and swallowed clicks).
- `npm run lighthouse` leaves an indexing-allowed build in `.next`. Run `npm run build` afterwards for the noindex preview.

## Design concepts round (2026-11-03)
- The user found v1 "too basic / AI-looking" and asked for richer motion and 3 variations. Agreed approach: **3 homepage concepts** at `/concepts/1` (Editorial), `/concepts/2` (Kinetic) and `/concepts/3` (Workshop), each with its own header and footer and a top switcher bar. The user picks one; then it is rolled out across all 5 pages.
- Motion level: "rich but accessible". That allows text mask reveals, SVG line drawing, scroll-linked effects, sticky scroll storytelling, magnetic buttons and a pausable ticker. It rules out scroll hijacking and requires Lighthouse ≥ 90 and reduced-motion and no-JS fallbacks.
- Review flags are **hidden by default**, behind a "Review notes" switch in the top bar (persisted in localStorage). Placeholders for missing content stay visible. `/review` is unchanged.
- Code: `src/components/concepts/{shared,editorial,kinetic,workshop}`; routes in `src/app/(concepts)/concepts/`; concept-only CSS in `concepts.css`. The current site moved into the `src/app/(site)/` route group, and its header and footer live in `SiteChrome`.
- Rules learned the hard way:
  - Read env vars with literal names (`process.env.NEXT_PUBLIC_X`). Dynamic keys are not inlined into client bundles and caused hydration mismatches.
  - Load pre-paint scripts with `next/script` `beforeInteractive`, never a raw `<script>` in `<head>`, which caused intermittent hydration errors.
  - Scroll effects must render identical markup with or without reduced motion; use the CSS classes `rm-still`, `rm-solid` and `rm-draw` for the reduced-motion state.
  - Newsreader is scoped to the `(site)` layout, so concept pages don't preload it.
  - Switcher links use `prefetch={false}`, so one concept doesn't download the others' fonts.
- Verified: 87/87 Playwright tests pass. Lighthouse medians are 100 for Performance, Accessibility and Best Practices on all three concepts, mobile and desktop. Their SEO score of 66 is only the intentional noindex on concept routes.

## Design concepts round 2 (2026-11-03)
- The user removed Editorial ("useless") and asked for five variations, each "much better", with gradients and a premium look. The current set:
  1. Executive (new)
  2. Kinetic (upgraded)
  3. Workshop (upgraded)
  4. Cinematic (new)
  5. Bold color (new)
- Upgrades requested, all of them: bigger motion, richer visuals, more interactivity, polish. Constraint kept: Lighthouse ≥ 90 and no scroll hijacking.
- The user explicitly requested **gradients**, which overrides the brief's "avoid gratuitous gradients". Use brand-colour gradients only (navy/ink glows, gold sheen, coral in Bold) and never the generic purple/blue "AI" gradient. Utilities live in `concepts.css` (`.text-gold-sheen`, `.border-gradient`, `.glass`, `.bg-navy-glow`, `.bg-mist-glow`, `.btn-sheen`, `.grain`).
- New dependency: **lenis** 1.3 (MIT), for smooth scrolling on concept pages only. It is dynamically imported, off for touch and reduced motion, and paused while a dialog locks scroll.
- **Design references:** `references/react-bits` (MIT + Commons Clause) and `references/magicui` (MIT) were cloned at the user's request. They are study material only, never imported. They're excluded from tsconfig, ESLint, Tailwind `@source` and `.gitignore`. Effects adapted from them as lightweight in-house components in `src/components/concepts/shared/`:
  - From React Bits: VariableProximity → `ProximityText`, FlowingMenu → `FlowingRows`, ScrollVelocity → `VelocityMarquee`, TiltedCard → `Tilt`, Stack → `Draggable`, ClickSpark → `ClickSpark`.
  - From Magic UI: AnimatedBeam → `ExecDiagram`, ScrollProgress → `ScrollProgress`.
- Shared interactive component: `FormatPicker`, a "find your format" control. It works without JS via CSS `:has()`, and its recommendations follow the current site's own format descriptions.
- Verified:
  - Playwright 105/105.
  - Lighthouse medians are ≥ 92 everywhere: concepts 1, 2, 3 and 5 score 100 on mobile and desktop; Cinematic scores 92 on mobile (its full-bleed hero photo is the LCP) and 100 on desktop.
  - SEO is 66 on concepts only because of the intentional noindex.

## Design concepts round 3 (2026-11-03)
- The user kept **Executive, Kinetic and Workshop** (Cinematic and Bold color removed) and chose enhancements:
  - All three:
    - **Sticky CTA pill** (`StickyCta`).
    - **4-step needs finder** (`NeedsFinder`), which pre-fills `/contact?need=…` in `ContactForm`.
    - **Chevron photo-mask reveal** (`.chevron-reveal`).
  - Executive:
    - **Interactive diagram**: step buttons, a Motion-driven signal along the route, detail cards.
    - **Dark mode** (`ThemeToggle`). It sets `html[data-exec-theme]`, re-maps colour variables inside `.exec-root`, uses a View Transitions circular wipe, and is persisted by the `prefs` pre-paint script.
  - Kinetic: **ChevronField**, cursor-tracking chevrons (rAF with easing; the loop sleeps when settled).
  - Workshop: **WorkshopScene**, a hand-drawn training-room illustration drawn with CSS strokes.
- "Make animations/transitions smooth":
  - Shared motion tokens live in `src/components/motion/tokens.ts`.
  - `MotionConfig` defaults to a soft spring.
  - Reveals are 0.8s with expo-out easing.
  - Scroll-linked values are smoothed with `useSpring`.
  - Lenis is driven by Motion's `frame` loop.
  - The page transition is a fade and gentle rise on client-side navigation.
  - Hover transitions inside `.concept-smooth` default to 450ms expo-out.
- The no-JS fallback for the needs finder is the CSS-only `FormatPicker` inside `<noscript>`, with `.finder-wrap` hidden.
- Verified:
  - Playwright 94/94, including the finder → contact pre-fill, keyboard diagram steps, dark-mode persistence, axe in dark mode, and the sticky CTA.
  - Lighthouse medians are 100/100/100 for Performance, Accessibility and Best Practices on all three concepts, mobile and desktop.
  - 72-load parallel stress test: 0 hydration errors.

## Workshop dark theme (2026-11-03)
- The user asked for Workshop to be "dark themed, black with gradients". It is now permanently dark (`.workshop-dark` in `concepts.css`), using the same palette re-map technique as Executive's dark mode: navy text becomes chalk-white, paper becomes near-black, white cards become dark gradient surfaces (`.wk-surface`).
- Additions: ember/gold/navy radial glows per section, gold gradient buttons, an ember gradient on "forward." (`.text-ember`), a chalk glow on `WorkshopScene`, and dark-tinted gradient sticky notes. Polaroid frames stay light, as physical objects with `text-ink` captions.
- Approval flags keep their light palette inside the dark theme.
- NeedsFinder fix: the pointer auto-advance only fires if the visitor is still on the step where they clicked; Next cancels any pending auto-advance.
- Verified: Playwright 94/94 (twice). Lighthouse for /concepts/3 is 100/100/100 on mobile and desktop.

## Final concept selection (2026-11-03)
- The user selected **Executive** (`/concepts/1`) and **Workshop** (`/concepts/2`, dark theme). Kinetic was removed, along with its now-unused shared parts (CursorRing, ProximityText, VelocityMarquee, ScrollWords, Ticker).
- **CEO headshot and bio:** client-supplied 2026 photos (`src/assets/team/theresa-proctor-1.jpg`, `-2.jpg`) and bio are in `src/content/team.ts`, marked approved (source "client").
  - Both concepts and the site pages show the real photo automatically once `leader.photo` is set in `src/content/team.ts` (see `src/assets/team/README.md`).
  - Never substitute a generated or stock portrait.
- **GitHub:** the target is `git@github.com:sherrybutt17-stack/<repo>.git`. SSH auth works; `gh` is not installed. The user must create the empty, private repo before the push.

## Commands
`npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npm run typecheck` · `npm run test:e2e` · `npm run lighthouse`

---

# Forward Movement — Website Redesign Mockup: Implementation Plan

## Context
Forward Movement's current site is a single-page Wix build with thin structure: no dedicated team or services pages, a low-res logo, image-only certifications, and a dead analytics tag. The client wants a modern, credible, people-centred redesign with a **Meet the Team** page, a **Services & Programs** page, a slot for the CEO's updated headshot, purposeful motion, and Lighthouse Performance ≥ 90 on mobile and desktop. The deliverable is a complete, working mockup in `/Users/shaheerbutt/Documents/Forward Website`, with every unverified claim visibly flagged for client approval. Nothing is published.

## 1. Inspection findings (report first)
**Repository:** `/Users/shaheerbutt/Documents/Forward Website` is **empty** and not a git repo. There is no existing stack, assets, CMS, forms, scripts or deploy config to preserve, so this is a fresh build.
**Toolchain:** Node 24.17, npm 11.13, pnpm and yarn are available. Chrome for Testing is cached locally (Playwright `chromium-1248` and Puppeteer 150/152), so Lighthouse can run without installing a browser.

**Current live site (forwardmovementent.com), facts only:**
- **Platform:** Wix. Routes are a single-page home (Home, Solutions, About, Portfolio, Contact) plus `/government`, `/corporate`, `/educational-institutions`, `/project-4` (capabilities statement images), and `/copy-of-educational-institutions` (the "5 Tips to Building a Dynamic Culture" lead-magnet thank-you page).
- **Name:** **"Forward Movement Enterprises"** appears everywhere: copy, footer ©, and meta description. The brief says "Forward Movement **Entertainment**", and the domain `forwardmovementent` is ambiguous. **This discrepancy must be flagged.**
- **CEO:** Theresa R. Proctor, Founder & CEO. The site has a full bio: 20+ years of corporate leadership, past board roles (PG Chamber of Commerce, Women of PG, PG Schools Business Alliance, PG County Health Coalition), and memberships in NAWBO and WPEO.
- **Formats:** The site gives copy for Instructor-led, Virtual (microlearning) and Dynamic ("a pleasant interruption in standard training… recommended twice annually").
- **Approach (sourced):** diagnostic assessment / training gap analysis → instructional design team builds a custom curriculum → delivery.
- **Stats:** 250,000+ people trained, 317+ projects completed, established 2016.
- **Proof on sub-pages:** client lists of about 24 government, about 25 corporate and about 20 education names, plus 13 testimonials. Some are first name + initial ("Jessica H."), others are anonymous. Several client names look mistyped: "Capitol One", "Port of Authority of NY & NJ", "Internal Revenue Services", and "Loudon County".
- **Credentials:** shown as image logos (MBE/DBE, SBA WOSB, WBENC, WSSC, SAM, Prince George's County, MDOT, SBE). NAICS codes are 611430, 541611, 541612, 541613, 541820, 611699 and 711510; CAGE is 832J9; DUNS is 080937507. **DUNS was retired federally in April 2022**, so the site should show a UEI instead.
- **Contact:** 12138 Central Ave, Suite 131, Bowie, MD 20721 · 240-389-3577 · theresa@forwardmovementent.com · Facebook · LinkedIn.
- **Brand palette (Wix theme):** navy `#1E2D3B` / `#3D5975`, gold `#EDCD1F`, and a red `#ED1C24` that probably comes from the logo but is unverified. This lines up with the brief's navy, gold and ivory direction.
- **Fonts:** Wix Helvetica and Avenir, which we will not reuse.
- **Analytics:** Universal Analytics `UA-140395684-1`. UA was sunset in 2023, so **nothing is being collected**.
- **Images:** the sandbox blocks the Wix image CDN (`static.wixstatic.com`), so I could not view the logo or photos. Only a 328×100 JPG logo is known.

## 1a. Decisions confirmed by the user
- **Brand name defaults to "Forward Movement Enterprises"** via `siteConfig.brandName`. The Enterprises/Entertainment discrepancy is still flagged on `/review` and in the handoff.
- **Existing proof is shown with flags.** That means the existing client names (as text, never logos) and testimonials, each with a "Needs approval · from current site" marker. A production build with `reviewMode=false` renders only approved items.
- **Current-site assets are pulled in:**
  - **Download:** During the build I'll ask for one-time network permission (sandbox bypass for `static.wixstatic.com` only) to download the original logo and photos into a fresh directory, `assets-intake/current-site/`. I'll verify them with `file`, then look at each one before use.
  - **Process:** Resize to a maximum of 2400px with macOS `sips`, which adds no dependency. Use them in `src/assets/current-site/` as static `next/image` imports, which provide dimensions automatically.
  - **Flag:** Each one gets a flag reading "From current site — confirm permission", plus a source note in `src/content/media.ts`.
  - **Exclude:** Any image that looks like generic stock photography (the three square "solution" images may be stock) is listed in the handoff instead of used. This avoids the brief's "generic handshake" problem.
  - **Alt text** describes only what is visible. Event identity from filenames (for example `speakingdod.jpg` → DoD) is flagged, not asserted.
  - **CEO headshot:** The CEO slot **stays a neutral placeholder** until the updated headshot arrives. The old portrait is not reused there.
  - **Logo:** The logo is a 328×100 JPG. If it reads cleanly in the header at 2x, use it with a "vector logo needed" flag. Otherwise use the typeset wordmark and include the JPG on `/review` for comparison. I'll confirm or drop the red `#ED1C24` accent based on the logo.
  - **LCP:** If a real photo goes in the hero, it gets `preload` with AVIF and `sizes`, and the H1 stays the dominant element above the fold. Whether the photo or the text is the better LCP choice is decided by measurement, not assumption.
- **Asset intake result (2026-11-03):** Only `speaking-dod.jpg` (640×480) could be downloaded from the Wix CDN — further attempts were blocked (the CDN resets automated requests; retrying with a browser user-agent was refused as bot-check circumvention). All other current-site images (logo, USDA/SOFCC speaking photos, sector galleries, capability statement pages) must be supplied by the client/user (e.g., exported from Wix Media Manager) and dropped into `src/assets/current-site/`; they are tracked as pending in `src/content/media.ts` and on `/review`. Mockup uses the typeset wordmark + labelled image slots meanwhile.
- **Dev dependencies:** `@playwright/test` and `@axe-core/playwright` are approved. Lighthouse runs through pinned `npx`.

## 2. Stack & dependency decision
Next.js App Router + TypeScript, with every page statically prerendered and one Server Action for the contact form. Scaffold with `create-next-app@16.4.4` (TypeScript, Tailwind, ESLint, App Router, `src/`). Next 16 notes: Turbopack is the default and `next lint` is removed, so we call `eslint .` directly.

| Package | Role | License | Notes |
|---|---|---|---|
| next 16.4 / react 19.3 | Framework, SSG and Server Actions | MIT | Brief's default for a fresh build |
| tailwindcss 4.3 + @tailwindcss/postcss | Token-based styling via `@theme` CSS variables | MIT | Comes with the scaffold; small token set only |
| motion 14.9 (`motion/react`) | Section reveals, mobile-menu enter/exit, client-nav page fade | MIT | `LazyMotion` + `m` with features **lazy-loaded** (about 5 KB initial) and `strict` mode |
| @radix-ui/react-dialog 1.3 | Mobile nav: focus trap, Escape, focus return, scroll lock | MIT | The **only** Radix primitive. Desktop nav is plain links; FAQ uses native `<details>` (keyboard-accessible and needs no JS) |
| lucide-react 1.66 | About 8 icons (menu, close, arrows, phone, mail, map-pin, check, alert) | ISC | Tree-shaken; always paired with text or `aria-hidden` |
| **dev:** @playwright/test 1.64, @axe-core/playwright 4.14 | Viewport, overflow, keyboard, reduced-motion and axe checks | Apache-2.0 / MPL-2.0 | Dev-only |
| **not installed** | Lighthouse 13.6 runs via pinned `npx lighthouse@13.6.0` | Apache-2.0 | Version recorded in reports |

**Not adopted (reference only):**
- USWDS: we use its form-validation, error-summary and accessibility patterns, not its visual style.
- shadcn/ui: its Button and Card variant pattern is hand-written without `cva`.
- Motion Primitives: at v0.1.0 and stale since March 2025.
- Magic UI: inspiration only.
- web-vitals: only if field monitoring (RUM) is approved; it would then be loaded deferred.
- zod: validation is hand-rolled and shared between client and server.

## 3. Architecture & file layout
```
src/config/site.ts        brandName (single setting, env-overridable), legalName, url, contact, social,
                          reviewMode (NEXT_PUBLIC_REVIEW_MODE, default true), allowIndexing (default false)
src/content/types.ts      ContentStatus = 'approved' | 'needs-approval' | 'placeholder'; Sourced<T> {status, source, note}
src/content/{proof,services,team,portfolio,testimonials,faqs,credentials}.ts   all copy as typed data
src/lib/visible.ts        visible(items): reviewMode ? all : only 'approved'  (unapproved content never ships silently)
src/lib/contact.ts        shared field rules + validate()
src/app/layout.tsx        fonts, skip link, Header/Footer, MotionProvider, <noscript> reveal override, JSON-LD (from settings)
src/app/globals.css       @import tailwind; @theme tokens; base; focus styles; reduced-motion overrides
src/app/{page,services/page,team/page,portfolio/page,contact/page}.tsx
src/app/contact/actions.ts  'use server' submit action
src/app/template.tsx      page fade only on client-side navigation (skipped on first load to protect LCP)
src/app/review/page.tsx   internal content-approval checklist auto-built from content data (noindex, not in nav or sitemap)
src/app/{sitemap,robots}.ts, not-found.tsx, icon
src/components/layout/{Header,MobileNav,Footer,SkipLink}.tsx
src/components/ui/{ButtonLink,Container,Section,Eyebrow,Card,StatList,ReviewFlag,ImageSlot,PendingState,FormField}.tsx
src/components/motion/{MotionProvider,features,Reveal,RevealGroup}.tsx
src/components/contact/ContactForm.tsx
src/assets/team/README.md      drop-in instructions for the CEO headshot
tests/*.spec.ts, playwright.config.ts, scripts/lighthouse.mjs, reports/, docs/HANDOFF.md, .env.example, README.md
```
**Review system:**
- Every claim, name, stat, testimonial and contact detail lives in `src/content` with a `status` and a `source` (`current-site`, `brief`, or `placeholder`).
- In review mode, `<ReviewFlag>` shows a visible text pill such as "Needs approval · from current site". It does not rely on colour alone.
- In production mode, only `approved` items render, and sections with no approved items are hidden.
- `/review` lists every pending item for the client to sign off.

**CEO headshot slot:**
- `team.ts → theresa.photo: null | {src, alt, width, height}`.
- `ImageSlot` renders `next/image` when a photo is present.
- Otherwise it shows a neutral navy panel with a "TP" monogram, labelled "Updated headshot pending". It is never a stand-in portrait.
- To add the photo, drop the file in and set one field.

## 4. Design system (tokens in `@theme`)
- **Colour:**
  - ink `#0F1A24`, navy-900 `#1E2D3B` (brand), navy-700 `#3D5975`, navy-100 `#DCE5EE`
  - gold-400 `#EDCD1F` (brand accent: fills, rules, focus on dark; never text on light)
  - gold-100 `#FBF3C8`
  - ivory-50 `#FCFAF5` and ivory-100 `#F5F0E4` (surfaces)
  - charcoal `#1F2328` (body), slate `#4A5561` (secondary, to be verified at ≥4.5:1)
  - line `#E3DCCB`, success `#1F6F43`, error `#B42318`
  - Checked contrast: gold on navy ≈ 8.8:1; navy on ivory ≈ 12.9:1.
- **Type:** Newsreader (variable serif, display and headings, **preloaded**) + Public Sans (variable sans, body and UI; USWDS's open typeface, not preloaded, using next/font's metric-matched fallback). Latin subset only, using fluid `clamp()` sizes, body 17px/1.65, and a 65ch measure.
- **Layout and shape:**
  - Container 72rem; section padding `clamp(4rem, 8vw, 7.5rem)`.
  - Radius 6px / 12px, one or two soft shadows.
  - Gold rule and chevron "forward" motif as the only decoration, used sparingly.
- **Motion tokens:** ease `cubic-bezier(.22,1,.36,1)`, durations 150/250/450ms.
- **Components:** ButtonLink (primary is navy, or gold on dark; secondary is outline), Card, Eyebrow, StatList (static numbers, no count-up), FormField (label, hint, error, `aria-describedby`), and Section (heading-level aware).

## 5. Pages (draft copy is marked needs-approval)
Sitewide primary CTA: **"Discuss a training need"** → `/contact`. The header has the wordmark (built from the `brandName` setting, with a logo slot for when vector files arrive) and links to Services & Programs, Team, Portfolio and Contact with `aria-current`. Below 1024px the links collapse into the Radix mobile menu.

- **Home `/`:**
  - **Hero:** text-first, and the LCP element is the H1, which has no entrance animation.
    - Eyebrow: "Professional development training · Baltimore–Washington region".
    - H1: "Build the skills that move your organization forward."
    - Subhead from the brief, plus primary and secondary CTAs.
    - A decorative navy/gold panel with an image slot.
  - **Proof strip:** 250,000+ / 317+ / Est. 2016, each flagged.
  - **Three format cards** that deep-link to `/services#…`.
  - **"How we work":** Assess → Design → Deliver, sourced from the current site and flagged.
  - **CEO feature:** headshot slot, short bio, link to `/team`.
  - **Selected portfolio:** sector tiles with sample client names as text (no logos) and one testimonial.
  - **Credentials and procurement snapshot:** certifications as text, NAICS, CAGE, "UEI pending".
  - **Final CTA band**, then the footer: contact, nav, social, and a credentials line.
- **Services `/services`:**
  - Intro and a sticky in-page jump nav (desktop).
  - One section per format:
    - **What it is**, in plain language. Dynamic training becomes "a customized, high-energy session that breaks from routine training to re-engage teams; recommended twice a year".
    - **Who it's for**: sourced where possible, otherwise a placeholder.
    - **Format and logistics**.
    - **What participants experience**.
    - **Next step CTA**.
  - "How engagements work" (assessment → custom curriculum → delivery).
  - "Programs & topics": a labelled pending-content state, because no catalog exists.
  - FAQ using native `<details>`. Show only answers sourced from the site (in-person and virtual, customization, twice-yearly dynamic sessions, service region). Unknowns such as pricing, duration and group size appear only in review mode, as placeholders.
- **Team `/team`:**
  - Theresa's feature profile: headshot slot, title, bio edited for concision without new facts, board roles and memberships.
  - A data-driven team grid. The array is empty, so a `PendingState` reads "Additional team profiles will appear here once names, roles, bios and photos are approved".
- **Portfolio `/portfolio`:**
  - Government, Education and Corporate sections, using the sector descriptions from the current site.
  - Client lists as text in title case, kept as written and with suspected typos flagged rather than corrected.
  - Testimonials attributed only as on the current site.
  - A case-study template (Challenge / Approach / Format delivered / Documented outcomes) shown as labelled placeholders.
  - A "Capability statement (PDF)" slot.
- **Contact `/contact`:**
  - Fields: name (`autocomplete=name`), work email, organization, training need (textarea), and optional phone (`type=tel`), plus a hidden honeypot.
  - Uses `useActionState`, and works without JavaScript.
  - Validation follows the USWDS pattern:
    - On submit, an error summary receives focus and links to each invalid field.
    - Inline errors use `aria-invalid` and `aria-describedby`.
    - The status message is announced via `role=status`.
  - **The server action only reports success when the request to `CONTACT_FORM_ENDPOINT` returns a 2xx.** If no endpoint is configured, it says plainly: "This form isn't connected yet — your message was not sent. Please email or call…".
  - The secret is read from an environment variable and documented in `.env.example`.
  - Contact details are shown with review flags.

## 6. Motion plan (Motion for React)
- **`MotionProvider`:** `LazyMotion` (lazily loaded `domAnimation`, `strict`) plus `MotionConfig reducedMotion="user"`.
- **`Reveal` / `RevealGroup`:** below-the-fold groups only. Each fades from 0 to 1 and rises 16px to 0 over 450ms, staggering 60ms, `whileInView` with `once`.
- **Mobile menu:** `AnimatePresence` with Radix `forceMount`. The overlay fades and the panel slides in over 220ms; focus trap and Escape stay intact.
- **Page fade:** client-side navigation only.
- **Card hover and focus:** CSS transitions (lift 2px, shadow, gold underline). These run without JavaScript.
- **Content never stays hidden:**
  - `<noscript>` CSS and `@media (prefers-reduced-motion: reduce)` force `[data-reveal]` visible with `!important`, which overrides the inline animation styles.
  - Reduced-motion users also get no transforms and instant transitions.
- **Excluded:** scroll hijacking, parallax, background loops, text splitting, and count-ups.

## 7. Performance and SEO measures
- Static prerendering, with client components limited to MobileNav, ContactForm and the Reveal wrappers.
- `next/image` serves AVIF and WebP, with explicit sizes and `sizes`. The LCP image uses `preload` or `priority`; below-the-fold images lazy-load.
- Fonts are self-hosted by `next/font`, with only the display font preloaded.
- No third-party scripts.
- Per-page metadata and Open Graph tags, plus `sitemap.ts` and `robots.ts`.
- A `noindex` toggle via `allowIndexing`. Lighthouse runs with indexing allowed so the SEO score is honest.
- Organization JSON-LD built from site settings.

## 8. Build sequence
0. **Right after approval, save this plan to `/Users/shaheerbutt/Documents/Forward Website/CLAUDE.md`** at the project root. Add a short header naming it the project's source of truth, covering content rules, the review system and performance targets, so later sessions load it automatically. Then keep it updated if decisions change during the build.
1. Scaffold with `create-next-app` in the project root. It's empty except for `CLAUDE.md`; if the scaffolder refuses a non-empty folder, scaffold into a temp subfolder and move the files up. Add the dependencies above and set the `next.config` image formats. If `next/font/google` is blocked by the sandbox at build time, I'll ask for network permission.
2. **Asset intake:**
   - Request one-time network access to download the logo and the photos from the current site into `assets-intake/current-site/`.
   - Inspect each image visually.
   - Resize the keepers with `sips` and move them to `src/assets/current-site/`.
   - Record their source and status in `src/content/media.ts`.

   Then write the tokens in `globals.css`, `site.ts` with `brandName` set to "Forward Movement Enterprises", and the content types and data files. Copy comes from the extracted current-site text, which is also saved for reference at `docs/source/current-site-content.md`.
3. Build the shared UI, Header and MobileNav, Footer, and SkipLink.
4. Build all five pages, plus `/review` and the 404, without motion. Then the contact form and server action.
5. Add `MotionProvider`, Reveal, the mobile-menu animation and the template fade, plus the reduced-motion and `noscript` safeguards.
6. Load the `copywriting` and `cro` skills (Corey Haines' marketingskills) and do a copy pass: specificity, objections and CTA clarity, with no new claims.
7. Run lint, typecheck, build, the Playwright suite, and screenshots that I review visually at each viewport.
8. Run Lighthouse, fix measured bottlenecks, and rerun.
9. Write `docs/HANDOFF.md`.

## 9. Verification
- **Commands:** `npm run lint` (`eslint .`), `npm run typecheck` (`tsc --noEmit`), `npm run build`, `npm run test:e2e`, `npm run lighthouse`.
- **Playwright** runs every route at 320, 375, 768, 1024 and 1440px:
  - No horizontal overflow (`scrollWidth ≤ innerWidth`) and exactly one H1.
  - axe reports no serious or critical violations.
  - No console errors, and full-page screenshots are saved to `reports/screenshots/`.
  - Skip link focuses `<main>`.
  - Mobile menu opens and traps focus; Escape closes it and returns focus.
  - Form: an empty submit shows the error summary and moves focus there; a valid submit with no endpoint shows the not-connected message, never a success.
  - `emulateMedia({reducedMotion:'reduce'})` and JS-disabled runs show all `[data-reveal]` content.
  - At 640px CSS width, as an approximation of 200% zoom, content reflows.
- **Lighthouse 13.6.0:**
  - Run against `next build && next start` on `/`, `/services`, `/team`, `/portfolio` and `/contact`.
  - Each page is tested in mobile mode (default emulation with simulated throttling) and desktop mode (`--preset=desktop`), three runs each, reporting the median.
  - Chrome for Testing runs headless.
  - JSON and HTML reports, plus a summary of URL, Lighthouse and Chrome versions, mode, throttling, scores and LCP/TBT/CLS, are saved to `reports/lighthouse/`.
  - Targets: Performance ≥ 90, Accessibility, Best Practices and SEO ≥ 95. Results are reported exactly as measured, and lab results are noted as no proof of field Core Web Vitals.
- **Manual review:** keyboard-only pass, focus visibility, screen-reader names and states (accessibility tree), and touch targets ≥ 44px.

## 10. Handoff: items requiring client input
1. Brand name: Enterprises or Entertainment.
2. The updated CEO headshot, at least 1200px, with alt text.
3. Logo vector files, and confirmation of the red brand colour.
4. Approval of the three stats.
5. Which certifications are current (with expiry dates), and permission to use their logos.
6. UEI, plus confirmation of CAGE and NAICS.
7. Which client names may be shown, and the typo fixes.
8. Testimonial permission and attribution.
9. Team members' names, roles, bios and photos.
10. A program and topic catalog.
11. Per-format audience, duration, group size and logistics.
12. Confirmation of the Assess → Design → Deliver approach.
13. Case studies with permission.
14. Approved photography with releases.
15. Contact details, the form destination and its recipient.
16. Analytics: GA4 or privacy-friendly, and RUM.
17. Hosting, domain and DNS access, and 301 redirects from the Wix URLs.
18. Whether to keep the "5 Tips" lead magnet and the capability-statement PDF.
19. Social links.
20. FAQ answers.
