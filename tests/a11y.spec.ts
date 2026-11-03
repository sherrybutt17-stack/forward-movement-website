import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { conceptRoutes, routes } from "./helpers";

const extraRoutes = ["/review", "/this-page-does-not-exist", "/concepts", ...conceptRoutes] as const;

for (const route of [...routes, ...extraRoutes]) {
  for (const width of [375, 1440]) {
    test(`axe: ${route} at ${width}px has no WCAG A/AA violations`, async ({ page }) => {
      // Reduced motion so every reveal is in its final, fully visible state for contrast checks.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const summary = results.violations.map((v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length})`);
      expect(summary).toEqual([]);
    });
  }
}

test("axe: executive concept in dark mode has no WCAG A/AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("fm-exec-theme", "dark"));
  await page.goto("/concepts/1", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-exec-theme", "dark");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
  expect(results.violations.map((v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
});
