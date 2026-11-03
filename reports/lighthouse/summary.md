# Lighthouse results (lab)

- Date: 2026-11-03T02:05:41.220Z
- Target: production build (`next build` with ALLOW_INDEXING=true, `next start`) at http://localhost:3200
- Lighthouse: 13.6.0 (npx lighthouse@13.6.0)
- Browser: /Users/shaheerbutt/.cache/puppeteer/chrome/mac_arm-152.0.7977.42/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing
- User agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36
- Throttling: simulate (Lighthouse defaults: mobile = emulated Moto G Power, slow 4G, 4× CPU slowdown; desktop = --preset=desktop)
- Runs per page and form factor: 3; table shows the median-Performance run
- Lab scores vary with hardware and machine load. They do not measure field Core Web Vitals.

| Page | Mode | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS | All Perf runs |
|---|---|---|---|---|---|---|---|---|---|---|
| /concepts/3 | mobile | **100** | 100 | 100 | 66 | 1.21 s | 1.21 s | 21 ms | 0.000 | 100, 100, 100 |
| /concepts/3 | desktop | **100** | 100 | 100 | 66 | 0.33 s | 0.33 s | 0 ms | 0.000 | 100, 100, 100 |

LCP elements (median run):

- /concepts/3 [mobile]: `<p class="mt-7 max-w-xl text-xl leading-relaxed text-slate">`
- /concepts/3 [desktop]: `<h1 id="hero-title" class="ff-workshop mt-7 text-[clamp(2.9rem,6.6vw,6.25rem)] font-semibold leading-…">`
