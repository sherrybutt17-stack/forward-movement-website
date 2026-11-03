"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { submitContact } from "@/app/(site)/contact/actions";
import {
  HONEYPOT_FIELD,
  contactFields,
  maxLengths,
  readValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { buttonBase } from "@/components/ui/ButtonLink";

const initialState: ContactState = { status: "idle" };

interface ContactFormProps {
  /** Direct contact details offered when the form can't send. null if not approved for display. */
  fallback: { email: string; phone: { display: string; href: string } } | null;
}

export function ContactForm({ fallback }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const errors: ContactErrors = clientErrors ?? (state.status === "invalid" ? (state.errors ?? {}) : {});
  const errorEntries = contactFields.filter((field) => errors[field]).map((field) => [field, errors[field]!] as const);
  const values = state.values;

  // Pre-fill the training need from the needs finder (/contact?need=...), only if the field is empty.
  const prefillNote = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const need = new URLSearchParams(window.location.search).get("need");
    const field = document.getElementById("need") as HTMLTextAreaElement | null;
    if (need && field && !field.value) {
      field.value = need.slice(0, maxLengths.need);
      if (prefillNote.current) prefillNote.current.hidden = false;
    }
  }, []);

  // Move focus to the outcome of a server round-trip so it is announced and visible.
  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
    else if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateContact(readValues(new FormData(event.currentTarget)));
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      requestAnimationFrame(() => summaryRef.current?.focus());
    } else {
      setClientErrors(null);
    }
  }

  // Errors are only added on submit. While someone types a correction, that field's error clears
  // as soon as it is valid. (Re-validating on blur would shift the layout mid-click and swallow the submit.)
  function handleInput(event: FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLInputElement).name as ContactField;
    if (!errors[field]) return;
    const stillInvalid = validateContact(readValues(new FormData(event.currentTarget)))[field];
    if (!stillInvalid) {
      const next = { ...errors };
      delete next[field];
      setClientErrors(next);
    }
  }

  const focusField = (field: ContactField) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(field)?.focus();
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} onInput={handleInput} noValidate className="grid min-w-0 gap-6">
      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          aria-labelledby="error-summary-title"
          className="rounded-md border-l-4 border-error bg-white p-5 shadow-card [overflow-wrap:anywhere] focus:outline-3 focus:outline-offset-2 focus:outline-error"
        >
          <h2 id="error-summary-title" className="flex items-center gap-2 font-sans text-lg font-bold text-error">
            <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
            There {errorEntries.length === 1 ? "is a problem with 1 field" : `are problems with ${errorEntries.length} fields`}
          </h2>
          <ul className="mt-3 grid gap-1.5">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`} onClick={focusField(field)} className="font-semibold text-error underline underline-offset-2">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="focus:outline-none empty:hidden">
        {state.status === "success" ? (
          <StatusMessage tone="success" title="Thank you — your request has been sent.">
            We received your message and will follow up using the email address you provided.
          </StatusMessage>
        ) : null}
        {state.status === "not-configured" ? (
          <StatusMessage tone="error" title="This form isn’t connected yet, so your request was not sent.">
            {fallback ? (
              <>
                Please email <a href={`mailto:${fallback.email}`} className="font-semibold underline">{fallback.email}</a> or
                call <a href={fallback.phone.href} className="font-semibold underline">{fallback.phone.display}</a>. Your
                details are still filled in below.
              </>
            ) : (
              "Please try again later. Your details are still filled in below."
            )}
          </StatusMessage>
        ) : null}
        {state.status === "error" ? (
          <StatusMessage tone="error" title="Your request could not be sent.">
            {fallback ? (
              <>
                Please try again, or email <a href={`mailto:${fallback.email}`} className="font-semibold underline">{fallback.email}</a>{" "}
                or call <a href={fallback.phone.href} className="font-semibold underline">{fallback.phone.display}</a>.
              </>
            ) : (
              "Please try again in a few minutes."
            )}
          </StatusMessage>
        ) : null}
      </div>

      <p className="text-sm text-slate">All fields are required unless marked optional.</p>
      <p ref={prefillNote} hidden role="status" className="rounded-md bg-gold-100 px-4 py-3 text-sm text-ink">
        We’ve added your needs-finder answers below. Edit them as you like.
      </p>

      <Field
        id="name"
        label="Full name"
        error={errors.name}
        input={(props) => (
          <input {...props} type="text" autoComplete="name" defaultValue={values?.name} maxLength={maxLengths.name} />
        )}
      />
      <Field
        id="email"
        label="Work email"
        error={errors.email}
        input={(props) => (
          <input
            {...props}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            defaultValue={values?.email}
            maxLength={maxLengths.email}
          />
        )}
      />
      <Field
        id="organization"
        label="Organization"
        error={errors.organization}
        input={(props) => (
          <input
            {...props}
            type="text"
            autoComplete="organization"
            defaultValue={values?.organization}
            maxLength={maxLengths.organization}
          />
        )}
      />
      <Field
        id="need"
        label="What training need can we help with?"
        hint="For example: the team or roles involved, your goals, a preferred format, and timing."
        error={errors.need}
        input={(props) => <textarea {...props} rows={6} defaultValue={values?.need} maxLength={maxLengths.need} />}
      />
      <Field
        id="phone"
        label="Phone"
        optional
        error={errors.phone}
        input={(props) => (
          <input {...props} type="tel" autoComplete="tel" defaultValue={values?.phone} maxLength={maxLengths.phone} />
        )}
      />

      {/* Honeypot for bots — hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            buttonBase,
            "w-full bg-navy-900 text-ivory-50 hover:bg-navy-800 disabled:cursor-wait disabled:opacity-70 sm:w-auto",
          )}
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}

interface FieldInputProps {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  className: string;
}

interface FieldProps {
  id: ContactField;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  input: (props: FieldInputProps) => ReactNode;
}

function Field({ id, label, hint, optional = false, error, input }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-semibold text-navy-900">
        {label}
        {optional ? <span className="font-normal text-slate"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-slate">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-semibold text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
      {input({
        id,
        name: id,
        required: optional ? undefined : true,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: cn(
          "min-h-12 w-full rounded-sm border-2 bg-white px-4 py-3 text-base text-charcoal transition-colors placeholder:text-slate",
          "focus:border-navy-900 focus:outline-3 focus:outline-offset-2 focus:outline-navy-700",
          error ? "border-error" : "border-navy-200 hover:border-navy-700",
        ),
      })}
    </div>
  );
}

function StatusMessage({ tone, title, children }: { tone: "success" | "error"; title: string; children: ReactNode }) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert;
  return (
    <div
      className={cn(
        "rounded-md border-l-4 bg-white p-5 shadow-card",
        tone === "success" ? "border-success" : "border-error",
      )}
    >
      <p className={cn("flex items-center gap-2 text-lg font-bold", tone === "success" ? "text-success" : "text-error")}>
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        {title}
      </p>
      <p className="mt-2 text-charcoal [overflow-wrap:anywhere]">{children}</p>
    </div>
  );
}
