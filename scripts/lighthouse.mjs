#!/usr/bin/env node
/**
 * Lighthouse lab audit for the production build.
 *
 *   npm run lighthouse                 # build (indexing allowed), start, audit, stop
 *   SKIP_BUILD=1 npm run lighthouse    # reuse the existing .next build
 *   RUNS=5 PAGES=/,/services npm run lighthouse
 *
 * Builds with ALLOW_INDEXING=true so the SEO category reflects the production configuration
 * (preview builds intentionally send noindex). Runs each page RUNS times per form factor and
 * reports the run with the median Performance score. Reports: reports/lighthouse/.
 *
 * Lab scores vary with hardware and load; they do not prove field Core Web Vitals.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const LIGHTHOUSE_VERSION = "13.6.0";
const PORT = Number(process.env.PORT ?? 3200);
const BASE_URL = `http://localhost:${PORT}`;
const RUNS = Number(process.env.RUNS ?? 3);
const PAGES = (process.env.PAGES ?? "/,/services,/team,/portfolio,/contact").split(",");
const OUT_DIR = join(process.cwd(), "reports", "lighthouse");
const PRESETS = ["mobile", "desktop"];

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [];
  const puppeteer = join(homedir(), ".cache", "puppeteer", "chrome");
  if (existsSync(puppeteer)) {
    for (const dir of readdirSync(puppeteer).sort().reverse()) {
      candidates.push(
        join(puppeteer, dir, "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
      );
    }
  }
  const playwright = join(homedir(), "Library", "Caches", "ms-playwright");
  if (existsSync(playwright)) {
    for (const dir of readdirSync(playwright).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
      candidates.push(
        join(playwright, dir, "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
      );
    }
  }
  candidates.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
  return candidates.find((path) => existsSync(path));
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not start at ${url}`);
}

/** First DOM snippet found in an audit's details (Lighthouse 13 reports the LCP node in lcp-breakdown-insight). */
function findSnippet(node) {
  if (!node || typeof node !== "object") return undefined;
  if (typeof node.snippet === "string") return node.snippet;
  for (const value of Object.values(node)) {
    const found = findSnippet(value);
    if (found) return found;
  }
  return undefined;
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const chromePath = findChrome();
if (!chromePath) {
  console.error("No Chrome found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(1);
}

if (!process.env.SKIP_BUILD) {
  console.log("Building production bundle (ALLOW_INDEXING=true)…");
  const build = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, ALLOW_INDEXING: "true" },
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

mkdirSync(OUT_DIR, { recursive: true });
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore", detached: true });
const stopServer = () => {
  try {
    process.kill(-server.pid);
  } catch {
    // already stopped
  }
};
process.on("exit", stopServer);
process.on("SIGINT", () => process.exit(130));

await waitForServer(BASE_URL);
// Warm the server so the first audit isn't measuring a cold start.
for (const page of PAGES) await fetch(`${BASE_URL}${page}`);

const results = [];
for (const page of PAGES) {
  for (const preset of PRESETS) {
    const runs = [];
    for (let i = 1; i <= RUNS; i++) {
      const name = `${page === "/" ? "home" : page.slice(1).replace(/\//g, "-")}-${preset}-run${i}`;
      const outputBase = join(OUT_DIR, name);
      const args = [
        "-y",
        `lighthouse@${LIGHTHOUSE_VERSION}`,
        `${BASE_URL}${page}`,
        "--output=json",
        "--output=html",
        `--output-path=${outputBase}`,
        "--chrome-flags=--headless=new",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--quiet",
      ];
      if (preset === "desktop") args.push("--preset=desktop");
      process.stdout.write(`Lighthouse ${page} [${preset}] run ${i}/${RUNS}… `);
      const run = spawnSync("npx", args, { env: { ...process.env, CHROME_PATH: chromePath }, encoding: "utf8" });
      if (run.status !== 0) {
        console.log("failed");
        console.error(run.stderr);
        continue;
      }
      const lhr = JSON.parse(readFileSync(`${outputBase}.report.json`, "utf8"));
      const score = (id) => Math.round((lhr.categories[id]?.score ?? 0) * 100);
      const metric = (id) => lhr.audits[id]?.numericValue;
      const entry = {
        page,
        preset,
        run: i,
        report: `${name}.report.html`,
        lighthouseVersion: lhr.lighthouseVersion,
        userAgent: lhr.environment?.hostUserAgent,
        benchmarkIndex: lhr.environment?.benchmarkIndex,
        throttlingMethod: lhr.configSettings?.throttlingMethod,
        throttling: lhr.configSettings?.throttling,
        formFactor: lhr.configSettings?.formFactor,
        scores: {
          performance: score("performance"),
          accessibility: score("accessibility"),
          bestPractices: score("best-practices"),
          seo: score("seo"),
        },
        metrics: {
          fcp: metric("first-contentful-paint"),
          lcp: metric("largest-contentful-paint"),
          tbt: metric("total-blocking-time"),
          cls: metric("cumulative-layout-shift"),
          si: metric("speed-index"),
        },
        lcpElement: findSnippet(lhr.audits["lcp-breakdown-insight"]?.details ?? lhr.audits["largest-contentful-paint-element"]?.details),
      };
      runs.push(entry);
      console.log(`perf ${entry.scores.performance}`);
    }
    if (runs.length === 0) continue;
    const mid = median(runs.map((r) => r.scores.performance));
    const chosen = runs.find((r) => r.scores.performance === mid);
    results.push({ ...chosen, allPerformanceScores: runs.map((r) => r.scores.performance) });
  }
}

stopServer();

const fmtMs = (v) => (v == null ? "–" : `${(v / 1000).toFixed(2)} s`);
const env = results[0];
const lines = [
  "# Lighthouse results (lab)",
  "",
  `- Date: ${new Date().toISOString()}`,
  `- Target: production build (\`next build\` with ALLOW_INDEXING=true, \`next start\`) at ${BASE_URL}`,
  `- Lighthouse: ${env?.lighthouseVersion ?? LIGHTHOUSE_VERSION} (npx lighthouse@${LIGHTHOUSE_VERSION})`,
  `- Browser: ${chromePath}`,
  `- User agent: ${env?.userAgent ?? "–"}`,
  `- Throttling: ${env?.throttlingMethod ?? "simulate"} (Lighthouse defaults: mobile = emulated Moto G Power, slow 4G, 4× CPU slowdown; desktop = --preset=desktop)`,
  `- Runs per page and form factor: ${RUNS}; table shows the median-Performance run`,
  "- Lab scores vary with hardware and machine load. They do not measure field Core Web Vitals.",
  "",
  "| Page | Mode | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS | All Perf runs |",
  "|---|---|---|---|---|---|---|---|---|---|---|",
  ...results.map(
    (r) =>
      `| ${r.page} | ${r.preset} | **${r.scores.performance}** | ${r.scores.accessibility} | ${r.scores.bestPractices} | ${r.scores.seo} | ${fmtMs(r.metrics.fcp)} | ${fmtMs(r.metrics.lcp)} | ${Math.round(r.metrics.tbt ?? 0)} ms | ${(r.metrics.cls ?? 0).toFixed(3)} | ${r.allPerformanceScores.join(", ")} |`,
  ),
  "",
  "LCP elements (median run):",
  "",
  ...results.map((r) => `- ${r.page} [${r.preset}]: \`${(r.lcpElement ?? "–").replace(/`/g, "'").slice(0, 140)}\``),
  "",
];
writeFileSync(join(OUT_DIR, "summary.md"), lines.join("\n"));
writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(results, null, 2));
console.log(`\n${lines.join("\n")}`);
console.log("\nNote: this build allows indexing. Run `npm run build` again before previewing with noindex.");
