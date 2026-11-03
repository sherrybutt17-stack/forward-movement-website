import { expect, test } from "@playwright/test";
import { conceptRoutes, routes, scrollThrough, slug, trackErrors, viewports } from "./helpers";

for (const route of [...routes, ...conceptRoutes]) {
  for (const width of viewports) {
    test(`${route} at ${width}px: no overflow, one H1, no console errors`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);
      await expect(page.locator("h1")).toHaveCount(1);

      // Interactive controls in navigation, header, footer and forms meet the ~44px target.
      const small = await page.evaluate(() => {
        const selector = "header a, header button, nav a, footer a, form button, form input:not([tabindex='-1']), form textarea";
        return Array.from(document.querySelectorAll<HTMLElement>(selector))
          .filter((el) => el.offsetParent !== null)
          .map((el) => ({ text: (el.textContent || el.getAttribute("name") || "").trim().slice(0, 40), h: el.getBoundingClientRect().height }))
          .filter((item) => item.h > 0 && item.h < 44);
      });
      expect(small, "touch targets under 44px").toEqual([]);

      if (process.env.SCREENSHOTS) {
        // Reduced motion renders every reveal in its final state, so full-page captures show all content.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await scrollThrough(page);
        await page.screenshot({ path: `reports/screenshots/${slug(route)}-${width}.png`, fullPage: true });
      }

      expect(errors).toEqual([]);
    });
  }
}
