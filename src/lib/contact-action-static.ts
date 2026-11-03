import { readValues, validateContact, type ContactState } from "./contact";

/**
 * Stand-in for the contact server action in the static GitHub Pages build (no server there).
 * Validates like the real action, then reports honestly that nothing was sent.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readValues(formData);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };
  return { status: "not-configured", values };
}
