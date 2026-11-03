import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/content/contact";
import { placeholder } from "@/content/types";
import { isVisible } from "@/lib/visible";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ReviewFlag } from "@/components/ui/ReviewFlag";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a training need for your team. Share your goals, audience and timing, and we’ll talk through instructor-led, virtual and dynamic training options.",
  alternates: { canonical: "/contact" },
};

const formDestinationReview = placeholder(
  "No approved form destination yet. Set CONTACT_FORM_ENDPOINT (and CONTACT_FORM_TOKEN if needed) once the client chooses where submissions go.",
);

export default function ContactPage() {
  const showContact = isVisible(contact.review);
  const formConfigured = Boolean(process.env.CONTACT_FORM_ENDPOINT?.trim());

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss a training need"
        lead="Tell us about your team and what you’d like to achieve. A few details help us prepare for a useful first conversation."
      />

      <section aria-label="Contact form and details" className="bg-ivory-50">
        <Container className="grid gap-12 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="relative min-w-0 rounded-md border border-line bg-ivory-100 p-6 sm:p-10">
            <h2 className="text-h3">Send a request</h2>
            {!formConfigured ? (
              <ReviewFlag review={formDestinationReview} label="Form not connected · needs approved destination" className="mt-3" />
            ) : null}
            <div className="mt-6">
              <ContactForm fallback={showContact ? { email: contact.email, phone: contact.phone } : null} />
            </div>
          </div>

          <aside aria-labelledby="direct-contact-title" className="grid min-w-0 content-start gap-10">
            {showContact ? (
              <div>
                <h2 id="direct-contact-title" className="text-h3">
                  Prefer to talk?
                </h2>
                <ul className="mt-5 grid gap-4">
                  <li className="flex items-center gap-3">
                    <Phone aria-hidden="true" className="size-5 shrink-0 text-navy-700" />
                    <a href={contact.phone.href} className="text-link inline-flex min-h-11 items-center">
                      <span className="sr-only">Phone: </span>
                      {contact.phone.display}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail aria-hidden="true" className="size-5 shrink-0 text-navy-700" />
                    <a href={`mailto:${contact.email}`} className="text-link inline-flex min-h-11 items-center [overflow-wrap:anywhere]">
                      <span className="sr-only">Email: </span>
                      {contact.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-navy-700" />
                    <address className="not-italic text-charcoal">
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </li>
                </ul>
                <ReviewFlag review={contact.review} className="mt-4" />
              </div>
            ) : (
              <h2 id="direct-contact-title" className="sr-only">
                Before you get in touch
              </h2>
            )}

            <div className="rounded-md border-l-4 border-gold-400 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold text-navy-900">Helpful details to include</h3>
              <ul className="mt-4 grid gap-2.5 text-charcoal">
                {[
                  "Who the training is for — team, roles and approximate number of people",
                  "What you want people to do differently afterward",
                  "Preferred format: instructor-led, virtual or dynamic (or not sure yet)",
                  "Timing, location and any deadlines",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
