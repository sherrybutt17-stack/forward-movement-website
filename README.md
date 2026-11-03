# Forward Movement — website redesign (review mockup)

A five-page marketing site for Forward Movement: Home, Services & Programs, Meet the Team, Portfolio and Contact. It is built with Next.js 16 (App Router, TypeScript), Tailwind CSS 4, Motion for React and one Radix primitive. Every page is statically prerendered.

> **Status: review mockup, not for publication.** Copy is draft. Every statistic, client name, testimonial, credential and contact detail is flagged until the client approves it. See `/review` and `docs/HANDOFF.md`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; defaults work for the mockup
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test:e2e` | Playwright tests against the production build (run `npm run build` first). `SCREENSHOTS=1` saves full-page screenshots to `reports/screenshots/`. |
| `npm run lighthouse` | Builds with indexing allowed, runs Lighthouse 13.6.0 (mobile and desktop, 3 runs each) and writes `reports/lighthouse/summary.md`. Run `npm run build` again afterwards to restore the preview's noindex build. |

## Editing content

All content lives in typed files in `src/content/`, not in components.

| What | File |
|---|---|
| Brand name, URL, navigation, review and indexing switches | `src/config/site.ts` and env vars |
| Statistics | `src/content/proof.ts` |
| Training formats, approach, programs | `src/content/services.ts` |
| FAQs | `src/content/faqs.ts` |
| CEO profile, team members | `src/content/team.ts` |
| Sectors, client lists, testimonials, case studies | `src/content/portfolio.ts` |
| Certifications, NAICS, CAGE/UEI, capability statement | `src/content/credentials.ts` |
| Contact details and social links | `src/content/contact.ts` |
| Photos and pending assets | `src/content/media.ts` |

Each item has a `review` record with a `status` of `approved`, `needs-approval` or `placeholder`.

- **Review mode** (`NEXT_PUBLIC_REVIEW_MODE` unset or `"true"`) shows everything, with visible flags. It also shows a banner and the `/review` checklist.
- **Production mode** (`NEXT_PUBLIC_REVIEW_MODE="false"`) renders only `approved` items. Sections with nothing approved are hidden, and `/review` returns 404.

To approve an item, change its `review` to `{ status: "approved", source: "…" }`.

### CEO headshot

See `src/assets/team/README.md`. Until a photo is supplied, a neutral "TP" monogram panel is shown, never a stand-in portrait.

### Brand name

The current site says **Forward Movement Enterprises**; the redesign brief says **Forward Movement Entertainment**. The name is a single setting: set `NEXT_PUBLIC_BRAND_NAME`, or change the default in `src/config/site.ts`.

## Contact form

The form posts to a Server Action (`src/app/contact/actions.ts`), which validates the input again on the server.

- It reports success **only** if `CONTACT_FORM_ENDPOINT` accepts the JSON POST with a 2xx response.
- With no endpoint configured, it tells the visitor the message was **not** sent and offers the phone number and email instead.
- Credentials stay server-side in environment variables (`CONTACT_FORM_ENDPOINT`, optional `CONTACT_FORM_TOKEN`).
- The form works without JavaScript.

## Motion and accessibility

- **Motion:** Motion for React with `LazyMotion` and lazily loaded features. Reveals run once, below the fold only, and never on the H1 (the LCP element). `prefers-reduced-motion` and disabled JavaScript both force all content visible, and both are covered by tests.
- **Mobile menu:** Radix Dialog, which provides the focus trap, Escape to close, and focus return.
- **FAQs:** native `<details>`.
- **Accessibility features:**
  - Skip link, landmarks, one H1 per page, and visible focus styles.
  - A USWDS-style error summary on the contact form.
  - Touch targets of at least 44px.
- **Verification:** the Playwright suite (`tests/`) checks these at 320, 375, 640, 768, 1024 and 1440px and runs axe.

## Design concepts

Five homepage directions live at `/concepts/1` to `/concepts/5`, with an overview at `/concepts`. See `docs/HANDOFF.md`. Concept-only code lives in `src/components/concepts/` and `src/app/(concepts)/`. `references/` holds cloned design libraries (React Bits, Magic UI) for study only; nothing there is imported or built.

## Hosting

Any Node.js host that runs `next start` works, for example Vercel or Netlify. Static export isn't used because the contact form needs a server action and `next/image` needs optimization. Keep `ALLOW_INDEXING` unset on preview deployments.
