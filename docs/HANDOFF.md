# Handoff — Forward Movement website redesign mockup

**Date:** 2026-11-03 · **Status:** working review mockup. Not published or deployed.

## 0. Selected homepage concepts (2026-11-03)

Two concepts were selected. Open `/concepts`, or use the switcher bar.

| # | Concept | Highlights |
|---|---|---|
| 1 | **Executive** | Interactive hero diagram: Assess, Design and Deliver open detail cards while a signal glides along the route. Light/dark mode with a circular wipe. Glass panels with cursor parallax. Tabbed format explorer. Procurement panel with copy buttons. |
| 2 | **Workshop** (dark) | Black "chalkboard" theme with ember, gold and navy gradients. A chalk-drawn training-room scene sketches itself. The photo is pinned as a polaroid. Draggable sticky notes and tilting index cards. |

**Shared by both:**
- A 4-step needs finder that pre-fills the contact form.
- A sticky CTA pill and a chevron photo reveal.
- Smooth scrolling and a spring-based motion system.
- Reduced-motion and no-JS fallbacks.

**CEO headshot:** still needed. Add the approved file as `src/assets/team/theresa-proctor.jpg` and set `leader.photo` (two lines, see `src/assets/team/README.md`). It then appears in both concepts and on the Team page.

**Verified:** Playwright 86/86. Lighthouse medians are 100/100/100 (Performance, Accessibility, Best Practices) for both concepts on mobile and desktop.

## 1. What was built

The project folder was empty and the live site runs on Wix, so this is a fresh Next.js 16 + TypeScript project.

| Page | Route | Highlights |
|---|---|---|
| Home | `/` | Text-first hero using the brief's draft headline; proof figures (flagged, static); the problem statement from the current site; three format cards; Assess → Design → Deliver; CEO feature with headshot slot; sector portfolio preview and testimonial; certifications and procurement snapshot; final CTA |
| Services & Programs | `/services` | In-page jump nav; one section per format (what it is, who it's for, format and logistics, participant experience, CTA); how engagements work; program catalog pending state; FAQ |
| Meet the Team | `/team` | Theresa R. Proctor profile (condensed bio, board service, memberships, headshot slot); data-driven team grid with a labelled pending state |
| Portfolio | `/portfolio` | Government, Educational institutions, and Corporate & nonprofit sections with client lists as text and participant feedback; case-study template (Challenge / Approach / Format delivered / Documented outcomes); NAICS table, identifiers, certifications, capability-statement slot |
| Contact | `/contact` | Name, work email, organization, training need, optional phone; USWDS-style error summary; honest status messages; direct contact details; tips on what to include |
| Content checklist | `/review` | Internal, noindex, not in navigation. Generated from the content files; lists every item needing client input |
| 404 | any unknown URL | Helpful links back into the site |

**Design system** (`src/app/globals.css`):
- Brand navy `#1E2D3B` and gold `#EDCD1F` from the current site's theme, plus ivory surfaces and charcoal text.
- Newsreader (display) and Public Sans (body) fonts.
- A small token set; the default Tailwind palette is disabled.

**Dependencies added:**
- `motion`, `@radix-ui/react-dialog` and `lucide-react` (MIT / MIT / ISC).
- Dev only: `@playwright/test` and `@axe-core/playwright` (Apache-2.0 / MPL-2.0).
- Lighthouse runs through pinned `npx` and is not installed.

## 2. Validation results (measured 2026-11-03)

| Check | Result |
|---|---|
| `npm run lint` | Pass, no warnings |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; all routes prerendered as static |
| Playwright (59 tests) | **59 passed.** No horizontal overflow at 320/375/640/768/1024/1440px on all five pages; one H1 per page; touch targets ≥ 44px; no console errors; axe (WCAG 2.0/2.1/2.2 A and AA plus best practices) clean on all pages, including `/review` and 404, at 375 and 1440px; skip link; mobile menu focus trap, Escape and focus return; FAQ keyboard toggling; form error summary and focus; field-level messages; resubmission after correction; no-JS submission; no false success; reveal-on-scroll; reduced motion and no-JS show all content |
| Lighthouse 13.6.0 | **Median of 3 runs: 100 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO) on all five pages, mobile and desktop. See below. |

### Lighthouse conditions and details

The full report is in `reports/lighthouse/summary.md`; per-run HTML and JSON are alongside it.

**Test conditions:**
- **Target:** local production build (`next build` with `ALLOW_INDEXING=true`, then `next start`) on an Apple Silicon Mac.
- **Browser:** headless Chrome for Testing 152.
- **Throttling:** Lighthouse default simulated throttling. Mobile emulates a Moto G Power on slow 4G with a 4× CPU slowdown; desktop uses `--preset=desktop`.

**Mobile results:**
- LCP is 0.76–0.92 s, TBT ≤ 55 ms and CLS ≤ 0.013.
- The LCP element is the H1 or the lead paragraph.

**Desktop results:**
- LCP is 0.21–0.68 s.
- On desktop Home, the LCP element is the preloaded hero photo.

**Variance:**
- Two individual runs out of 60 scored lower: a Home mobile run scored 74 in an earlier pass, and a `/services` mobile run scored 81 in the final pass.
- Both were caused by total-blocking-time spikes, mostly from "unattributable" main-thread time; the same bytes and scripts ran three to four times slower.
- That pattern indicates machine load during those runs, not a regression. The medians are unaffected.

**Page weight (Home, transferred):**
- 358 KiB total: 201 KiB of JavaScript (React/Next runtime, Motion, Radix), 83 KiB of fonts (2 files), 22 KiB of images, and 23 KiB of route prefetches.

**Limits of these numbers:**
- These are lab results. They do not prove field Core Web Vitals, and scores on a deployed host will differ.
- Re-run after deployment, and consider field monitoring (`web-vitals`) if the client approves analytics.

**Manual and automated checks completed:**
- Visual review of screenshots at every viewport.
- Accessibility-tree spot checks: landmarks, the labelled dialog, nav names, and invalid fields with linked error text.
- Production-mode build (`NEXT_PUBLIC_REVIEW_MODE=false`): no flags or placeholders render, and `/review` returns 404.

**Not done:**
- A full manual screen-reader pass with VoiceOver or NVDA.
- Browser zoom to 200%. The automated check approximates it with a 640px-wide viewport.

## 3. Known limits

- **Images:** only one current-site photo could be retrieved. The Wix image CDN resets automated downloads, and further attempts would have meant bypassing bot protection. The logo, the other speaking photos, the sector galleries and the capability statement must be exported from Wix Media Manager and supplied; they are listed in `src/content/media.ts` and on `/review`.
- **Logo:** the site uses a typeset wordmark and a simple chevron mark until vector logo files arrive. The red (`#ED1C24`) in the old Wix theme was not used, pending confirmation against the logo.
- **Contact form:** not connected. It explicitly tells visitors their message was not sent. The only spam protection is a honeypot; the chosen form provider should add rate limiting or a CAPTCHA.
- **The "5 Tips to Building a Dynamic Culture" email signup** from the current site was not carried over, pending a decision.
- **Production mode:** with nothing approved yet, a production build would show only page heroes and CTAs. Approve content before switching review mode off.
- **Analytics:** none added. The current site's Universal Analytics tag stopped collecting in 2023.
- **Version control:** the project is not a git repository. Run `git init` before further work if wanted.

## 4. Exact items requiring client input

All of these also appear, with notes, on `/review`.

1. **Brand name:** "Forward Movement Enterprises" (current site) or "Forward Movement Entertainment" (brief).
2. **Updated CEO headshot:** at least 1200px, with permission to publish. Drop-in steps are in `src/assets/team/README.md`.
3. **Logo:** vector files (SVG, EPS or AI), plus confirmation of brand colours, including whether red is a brand colour.
4. **Statistics:** confirm 250,000+ people trained (and how it's counted), 317+ projects, and established 2016.
5. **Certifications:** which are current (MBE/DBE, SBA WOSB, WBENC, WSSC Water, SAM.gov, Prince George's County, MDOT, SBE), with certifying body, exact designation and expiry date; also whether certification logos may be used.
6. **Procurement identifiers:**
   - UEI: DUNS 080937507 was retired in April 2022.
   - Confirm CAGE 832J9 and the NAICS list, including which code is primary.
7. **Client lists:** permission to name each organization, and corrections to the suspected typos (Capitol One, Port of Authority of NY & NJ, Internal Revenue Services, Loudon County, and others flagged on `/review`).
8. **Testimonials:** permission to publish, attribution format, and approval of the trimmed excerpts.
9. **Team members:** names, roles, short bios and approved photos.
10. **Program and topic catalog:** names, descriptions, audiences and formats.
11. **Per-format details:** audience, session length, group size, and live vs. self-paced and platforms for virtual training.
12. **Approach:** confirm "Assess → Design → Deliver" reflects how engagements run.
13. **Case studies:** 2–3 projects (challenge, approach, format delivered, documented outcomes), with permission or anonymized.
14. **Photography:** approved photos with releases, including higher-resolution originals of current-site photos.
15. **Contact:**
    - Confirm the address, phone and public email.
    - Choose the form destination (form service, CRM or email API) and who receives submissions.
16. **Analytics:** GA4, a privacy-friendly alternative, or none; and whether to collect field Core Web Vitals.
17. **Hosting:** choose a provider, grant DNS and domain access, and approve 301 redirects from the old Wix URLs.
18. **Lead magnet and capability statement:** whether to keep "5 Tips"; supply the current capability statement PDF.
19. **Social links:** confirm the Facebook and LinkedIn profiles are active.
20. **FAQ answers:** session length and group size, pricing approach, capability statement.
21. **Copy approval:** all headlines and body copy are draft, including the brief's suggested headline "Build the skills that move your organization forward."

## 5. Files

- **App, content and components:** `src/` (routes under `src/app`, content under `src/content`, components under `src/components`).
- **Configuration:** `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `playwright.config.ts`, `.env.example`, `.gitignore`, `package.json`.
- **Tests and tooling:** `tests/*.spec.ts`, `scripts/lighthouse.mjs`.
- **Documentation:**
  - `README.md`
  - `CLAUDE.md` (project rules and the approved plan)
  - `docs/HANDOFF.md`
  - `docs/source/current-site-content.md` (verbatim current-site text used as source material)
- **Assets:**
  - `src/assets/current-site/training-session.jpg` (the one retrieved photo)
  - `assets-intake/current-site/` (raw download)
- **Reports:** `reports/lighthouse/` and `reports/screenshots/`.
