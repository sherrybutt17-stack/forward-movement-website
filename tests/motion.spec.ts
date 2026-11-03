import { expect, test } from "@playwright/test";

const allRevealsVisible = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).every(
    (el) => getComputedStyle(el).opacity === "1",
  );

test("reveals run once when content scrolls into view", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const card = page.locator("#formats [data-reveal]").first();
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
});

test("hero H1 (LCP element) is never hidden by animation", async ({ page }) => {
  await page.goto("/");
  const opacity = await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");
  expect(await page.locator("h1").evaluate((el) => el.closest("[data-reveal]"))).toBeNull();
});

test("prefers-reduced-motion: all content is visible without scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/services", "/team", "/portfolio", "/concepts/1", "/concepts/2"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(await page.evaluate(allRevealsVisible), route).toBe(true);
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all content is visible", async ({ page }) => {
    for (const route of ["/", "/services", "/team", "/portfolio", "/concepts/1", "/concepts/2"]) {
      await page.goto(route);
      expect(await page.evaluate(allRevealsVisible), route).toBe(true);
    }
  });
});

test("concept H1s are visible once their CSS entrance finishes", async ({ page }) => {
  for (const route of ["/concepts/1", "/concepts/2"]) {
    await page.goto(route);
    await page.waitForTimeout(2200);
    const hidden = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("h1 .split-word")).filter((el) => {
        const style = getComputedStyle(el);
        return style.opacity !== "1" || (style.transform !== "none" && style.transform !== "matrix(1, 0, 0, 1, 0, 0)");
      }).length,
    );
    expect(hidden, route).toBe(0);
  }
});

test("review notes are hidden by default and revealed by the toggle", async ({ page }) => {
  await page.goto("/concepts/1");
  const visibleFlags = () =>
    page.evaluate(() => Array.from(document.querySelectorAll("[data-review-note]")).filter((el) => getComputedStyle(el).display !== "none").length);
  expect(await visibleFlags()).toBe(0);
  await page.getByRole("button", { name: "Review notes" }).click();
  expect(await visibleFlags()).toBeGreaterThan(0);
  await page.reload();
  expect(await visibleFlags(), "preference persists across reloads").toBeGreaterThan(0);
});

test("without JavaScript the simple format picker replaces the needs finder", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/concepts/1");
  await expect(page.locator(".finder-wrap")).toBeHidden();
  const picker = page.locator(".picker");
  await picker.getByLabel(/Learning that fits busy schedules/).check();
  await expect(picker.locator('[data-result="virtual"]')).toBeVisible();
  await expect(picker.locator('[data-result="dynamic"]')).toBeHidden();
  await context.close();
});

test("executive format tabs work with arrow keys", async ({ page }) => {
  await page.goto("/concepts/1");
  const first = page.getByRole("tab", { name: /Instructor-led/ });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Virtual/ })).toBeFocused();
  await expect(page.getByRole("tab", { name: /Virtual/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Virtual training");
});

test("needs finder: four steps, a recommendation, and a pre-filled contact form", async ({ page }) => {
  await page.goto("/concepts/2", { waitUntil: "networkidle" });
  const finder = page.locator(".finder");
  await finder.scrollIntoViewIfNeeded();
  const next = finder.getByRole("button", { name: /Next|See my suggestion/ });
  await expect(next).toBeDisabled();

  // Mouse users: picking an option advances automatically.
  await finder.getByLabel("A lift in engagement and energy").click();
  await expect(finder.getByText("Step 2 of 4")).toBeVisible();

  // Keyboard users: select with Space, then move on with Next.
  for (const label of ["Mostly in one location", "Under 25", "This quarter"]) {
    const option = finder.getByLabel(label);
    await option.focus();
    await page.keyboard.press("Space");
    await expect(option).toBeChecked();
    await finder.getByRole("button", { name: /Next|See my suggestion/ }).click();
  }
  await expect(finder).toContainText("Dynamic training");
  await finder.getByRole("link", { name: /Send this to us/ }).click();
  await expect(page).toHaveURL(/\/contact\?need=/);
  await expect(page.getByLabel("What training need can we help with?")).toHaveValue(/Main goal: A lift in engagement and energy/);
  await expect(page.getByText("We’ve added your needs-finder answers below.")).toBeVisible();
});

test("executive diagram steps open with the keyboard and close with Escape", async ({ page }) => {
  await page.goto("/concepts/1", { waitUntil: "networkidle" });
  const step = page.getByRole("button", { name: /Step 3: Deliver/ });
  await step.focus();
  await page.keyboard.press("Enter");
  await expect(step).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: "Step 3 details" })).toContainText("Deliver");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("region", { name: "Step 3 details" })).toHaveCount(0);
});

test("executive dark mode toggles and persists", async ({ page }) => {
  await page.goto("/concepts/1");
  const toggle = page.getByRole("button", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-exec-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-exec-theme", "dark");
  await expect(page.getByRole("button", { name: "Dark mode" })).toHaveAttribute("aria-pressed", "true");
});

test("sticky CTA appears after the hero and links to contact", async ({ page }) => {
  await page.goto("/concepts/2", { waitUntil: "networkidle" });
  await expect(page.getByRole("complementary", { name: "Quick contact" })).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 1400));
  const cta = page.getByRole("complementary", { name: "Quick contact" });
  await expect(cta).toBeVisible();
  await expect(cta.getByRole("link", { name: /Discuss a training need/ })).toHaveAttribute("href", "/contact");
});
