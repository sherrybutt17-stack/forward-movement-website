import { expect, test } from "@playwright/test";

test("skip link is the first focusable element and moves focus to main content", async ({ page }) => {
  await page.goto("/services");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test("desktop navigation marks the current page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/portfolio");
  const primary = page.getByRole("navigation", { name: "Primary" });
  await expect(primary.getByRole("link", { name: "Portfolio" })).toHaveAttribute("aria-current", "page");
  await expect(primary.getByRole("link", { name: "Team" })).not.toHaveAttribute("aria-current", "page");
});

test("mobile menu: opens, traps focus, closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Services & Programs" })).toBeVisible();

  // Focus stays inside the dialog while tabbing.
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const inside = await dialog.evaluate((el) => el.contains(document.activeElement));
    expect(inside).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile menu link navigates and closes the menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Team" }).click();
  await expect(page).toHaveURL(/\/team$/);
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("The people behind");
});

test("FAQ disclosures work with the keyboard", async ({ page }) => {
  await page.goto("/services#faq");
  const summary = page.locator("details.faq-item summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details.faq-item").first()).toHaveAttribute("open", "");
});
