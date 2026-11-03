import { expect, test } from "@playwright/test";

test("empty submit shows an error summary, focuses it, and marks fields invalid", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send request" }).click();

  const summary = page.getByRole("heading", { name: /There are problems with 4 fields/ });
  await expect(summary).toBeVisible();
  await expect(page.locator("[aria-labelledby='error-summary-title']")).toBeFocused();

  for (const label of ["Full name", "Work email", "Organization", "What training need can we help with?"]) {
    await expect(page.getByLabel(label)).toHaveAttribute("aria-invalid", "true");
  }
  await expect(page.getByLabel(/Phone/)).not.toHaveAttribute("aria-invalid", "true");

  // Error links move focus to the field.
  await page.getByRole("link", { name: "Enter your work email address." }).click();
  await expect(page.getByLabel("Work email")).toBeFocused();
});

test("invalid email and phone get specific messages", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("not-an-email");
  await page.getByLabel("Organization").fill("Example Agency");
  await page.getByLabel("What training need can we help with?").fill("Leadership training for new supervisors.");
  await page.getByLabel(/Phone/).fill("abc");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Enter an email address in the correct format", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Enter a valid phone number", { exact: false }).first()).toBeVisible();
});

test("valid submit without a configured endpoint says it was NOT sent (no false success)", async ({ page }) => {
  test.skip(Boolean(process.env.CONTACT_FORM_ENDPOINT), "An endpoint is configured in this environment.");
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test.person@example.gov");
  await page.getByLabel("Organization").fill("Example Agency");
  await page.getByLabel("What training need can we help with?").fill("Leadership training for new supervisors.");
  await page.getByRole("button", { name: "Send request" }).click();

  const status = page.getByRole("status");
  await expect(status).toContainText("This form isn’t connected yet, so your request was not sent.");
  await expect(status).toBeFocused();
  await expect(page.getByText("your request has been sent")).toHaveCount(0);
  // Entered values are preserved.
  await expect(page.getByLabel("Organization")).toHaveValue("Example Agency");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("form still submits and reports the honest not-connected state", async ({ page }) => {
    test.skip(Boolean(process.env.CONTACT_FORM_ENDPOINT), "An endpoint is configured in this environment.");
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Work email").fill("test.person@example.gov");
    await page.getByLabel("Organization").fill("Example Agency");
    await page.getByLabel("What training need can we help with?").fill("Leadership training for new supervisors.");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("This form isn’t connected yet, so your request was not sent.")).toBeVisible();
  });
});

test("after a failed submit, correcting the fields and resubmitting works", async ({ page }) => {
  test.skip(Boolean(process.env.CONTACT_FORM_ENDPOINT), "An endpoint is configured in this environment.");
  await page.goto("/contact");
  await page.getByLabel("Work email").fill("bad-email");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("#error-summary-title")).toBeVisible();

  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test.person@example.gov");
  await page.getByLabel("Organization").fill("Example Agency");
  await page.getByLabel("What training need can we help with?").fill("Leadership training for new supervisors.");
  // Errors clear as fields are corrected, before the click.
  await expect(page.locator("#error-summary-title")).toHaveCount(0);

  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("This form isn’t connected yet, so your request was not sent.");
});

test("status and error messages never cause horizontal overflow on small screens", async ({ page }) => {
  test.skip(Boolean(process.env.CONTACT_FORM_ENDPOINT), "An endpoint is configured in this environment.");
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/contact");
  await page.getByLabel("Work email").fill("a-very-long-invalid-email-address-without-at-sign.example.gov");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("#error-summary-title")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);

  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test.person@example.gov");
  await page.getByLabel("Organization").fill("Example Agency");
  await page.getByLabel("What training need can we help with?").fill("Leadership training for new supervisors.");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("not sent");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});
