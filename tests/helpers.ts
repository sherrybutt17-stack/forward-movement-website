import type { Page } from "@playwright/test";

export const routes = ["/", "/services", "/team", "/portfolio", "/contact"] as const;
export const conceptRoutes = ["/concepts/1", "/concepts/2"] as const;
export const viewports = [320, 375, 640, 768, 1024, 1440] as const;

export const slug = (route: string) => (route === "/" ? "home" : route.slice(1).replace(/\//g, "-"));

/** Collect console errors and uncaught exceptions for the page's lifetime. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

/** Scroll through the page so once-only reveal animations run before screenshots. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}
