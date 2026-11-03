"use server";

import { HONEYPOT_FIELD, readValues, validateContact, type ContactState } from "@/lib/contact";

/**
 * Contact form submission.
 * Reports success ONLY when the configured endpoint accepts the request (2xx).
 * With no CONTACT_FORM_ENDPOINT set, it says so plainly — no false success.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readValues(formData);

  // Honeypot: real visitors never see or fill this field.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "error", values };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT?.trim();
  if (!endpoint) {
    return { status: "not-configured", values };
  }

  const token = process.env.CONTACT_FORM_TOKEN?.trim();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...values,
        source: "website-contact-form",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      return { status: "error", values };
    }
    return { status: "success" };
  } catch {
    return { status: "error", values };
  }
}
