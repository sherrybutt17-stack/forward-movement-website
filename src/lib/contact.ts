/** Contact form rules shared by the client (instant feedback) and the server action (authoritative). */

export const contactFields = ["name", "email", "organization", "need", "phone"] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactStatus = "idle" | "invalid" | "success" | "not-configured" | "error";

export interface ContactState {
  status: ContactStatus;
  errors?: ContactErrors;
  /** Echoed back so a failed submission never loses what the person typed. */
  values?: ContactValues;
}

export const maxLengths: Record<ContactField, number> = {
  name: 120,
  email: 254,
  organization: 160,
  need: 2000,
  phone: 30,
};

export const HONEYPOT_FIELD = "company_website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readValues(formData: FormData): ContactValues {
  const get = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    organization: get("organization"),
    need: get("need"),
    phone: get("phone"),
  };
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Enter your full name.";
  if (!values.email) errors.email = "Enter your work email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter an email address in the correct format, like name@organization.gov.";
  if (!values.organization) errors.organization = "Enter the name of your organization.";
  if (!values.need) errors.need = "Tell us about your training need.";
  else if (values.need.length < 10) errors.need = "Add a little more detail about your training need (at least 10 characters).";

  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "");
    if (!/^[0-9+().\-\s]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)
      errors.phone = "Enter a valid phone number, like 240-555-0100, or leave this field blank.";
  }

  for (const field of contactFields) {
    if (!errors[field] && values[field].length > maxLengths[field]) {
      errors[field] = `Use ${maxLengths[field]} characters or fewer.`;
    }
  }

  return errors;
}
