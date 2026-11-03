import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { contact, social } from "@/content/contact";
import { capabilityStatement, certifications, identifiers, naicsReview } from "@/content/credentials";
import { faqs } from "@/content/faqs";
import { media, pendingAssets } from "@/content/media";
import { caseStudiesPending, sectors, testimonials } from "@/content/portfolio";
import { stats } from "@/content/proof";
import { approachReview, formats, programsPending } from "@/content/services";
import { leader, teamPending } from "@/content/team";
import { fromBrief, placeholder, type Review } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { ReviewFlag } from "@/components/ui/ReviewFlag";

export const metadata: Metadata = {
  title: "Content approval checklist",
  robots: { index: false, follow: false },
};

interface Row {
  item: string;
  value?: string;
  review: Review;
}

interface Group {
  title: string;
  rows: Row[];
}

function buildGroups(): Group[] {
  const clientChecks = sectors.flatMap((sector) =>
    sector.clients
      .filter((client) => client.check)
      .map((client) => ({ item: `${sector.name}: ${client.name}`, review: placeholder(client.check!) })),
  );

  return [
    {
      title: "Brand & site settings",
      rows: [
        {
          item: "Brand name",
          value: siteConfig.brandName,
          review: fromBrief(
            "Current site, footer and bio say “Forward Movement Enterprises”; the redesign brief says “Forward Movement Entertainment”. Confirm the correct legal/brand name. Change it in one place: NEXT_PUBLIC_BRAND_NAME or src/config/site.ts.",
          ),
        },
        ...pendingAssets.map((asset) => ({ item: asset.name, value: asset.file, review: asset.review })),
        { item: "Hero training photo", value: "speakingdod.jpg", review: media.trainingSession.review },
        {
          item: "Analytics",
          value: "UA-140395684-1 (current site)",
          review: placeholder(
            "The current site uses Universal Analytics, which Google shut down in 2023 — nothing is being collected. Decide whether to add GA4 or a privacy-friendly alternative, and whether to collect field Core Web Vitals (web-vitals).",
          ),
        },
        {
          item: "“5 Tips to Building a Dynamic Culture” email signup",
          value: "Current-site lead magnet",
          review: placeholder("Not carried over. Decide whether to keep it and where sign-ups should go."),
        },
        {
          item: "Hosting, domain & redirects",
          review: placeholder(
            "Choose hosting (e.g., Vercel/Netlify), provide DNS access, and approve 301 redirects from the old Wix URLs (/government, /corporate, /educational-institutions, /project-4).",
          ),
        },
      ],
    },
    {
      title: "Statistics",
      rows: stats.map((stat) => ({ item: stat.label, value: stat.value, review: stat.review })),
    },
    {
      title: "Services & programs",
      rows: [
        ...formats.flatMap((format) => [
          { item: `${format.name} — description`, review: format.review },
          { item: `${format.name} — who it’s for`, value: format.whoFor.text, review: format.whoFor.review },
          { item: `${format.name} — format & logistics`, value: format.format.text, review: format.format.review },
        ]),
        { item: "Delivery approach (Assess → Design → Deliver)", review: approachReview },
        { item: "Program / topic catalog", review: programsPending },
        ...faqs.map((faq) => ({ item: `FAQ: ${faq.question}`, value: faq.answer, review: faq.review })),
      ],
    },
    {
      title: "Team",
      rows: [
        { item: `${leader.name} — bio`, review: leader.review },
        { item: `${leader.name} — updated headshot`, review: leader.photoReview },
        { item: `${leader.name} — board service & memberships`, review: leader.affiliationsReview },
        { item: "Additional team members", review: teamPending },
      ],
    },
    {
      title: "Portfolio & proof",
      rows: [
        ...sectors.map((sector) => ({ item: `${sector.name} — description`, review: sector.review })),
        { item: "Client lists (all sectors)", review: sectors[0].clientsReview },
        ...clientChecks,
        ...testimonials.map((t) => ({
          item: `Testimonial (${t.sector})${t.attribution ? ` — ${t.attribution}` : ""}`,
          value: t.quote,
          review: t.review,
        })),
        { item: "Case studies", review: caseStudiesPending },
      ],
    },
    {
      title: "Certifications & procurement",
      rows: [
        ...certifications.map((cert) => ({ item: cert.name, value: cert.detail, review: cert.review })),
        { item: "NAICS codes", review: naicsReview },
        ...identifiers.map((id) => ({ item: id.label, value: id.value, review: id.review })),
        { item: "Capability statement PDF", review: capabilityStatement.review },
      ],
    },
    {
      title: "Contact",
      rows: [
        { item: "Address, phone & email", value: `${contact.phone.display} · ${contact.email}`, review: contact.review },
        { item: "Social links", value: social.links.map((l) => l.label).join(", "), review: social.review },
        {
          item: "Contact form destination",
          review: placeholder(
            "Choose where submissions go (e.g., a form service, CRM or email API) and who receives them. The form will not report success until this is configured.",
          ),
        },
      ],
    },
  ];
}

export default function ReviewPage() {
  if (!siteConfig.reviewMode) notFound();

  const groups = buildGroups().map((group) => ({
    ...group,
    rows: group.rows.filter((row) => row.review.status !== "approved"),
  }));
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0);

  return (
    <div className="bg-ivory-50">
      <Container className="py-[clamp(3rem,6vw,5rem)]">
        <p className="eyebrow">Internal · not linked from navigation</p>
        <h1 className="mt-4 text-h1">Content approval checklist</h1>
        <p className="prose-measure mt-5 text-lead text-slate">
          {total} items need client input before launch. Each item is flagged where it appears on the site. Approve an
          item by setting its <code className="rounded-sm bg-ivory-200 px-1.5 text-base">status</code> to{" "}
          <code className="rounded-sm bg-ivory-200 px-1.5 text-base">&quot;approved&quot;</code> in{" "}
          <code className="rounded-sm bg-ivory-200 px-1.5 text-base">src/content</code>. Production builds show only
          approved content.
        </p>

        <nav aria-label="Checklist sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map((group, index) => (
              <li key={group.title}>
                <a
                  href={`#group-${index}`}
                  className="inline-flex min-h-11 items-center rounded-sm border border-navy-200 bg-white px-4 text-[0.9375rem] font-semibold text-navy-900 hover:border-navy-900"
                >
                  {group.title} ({group.rows.length})
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map((group, index) => (
          <section key={group.title} id={`group-${index}`} aria-labelledby={`group-${index}-title`} className="mt-14">
            <h2 id={`group-${index}-title`} className="text-h2">
              {group.title}
            </h2>
            <ol className="mt-6 grid gap-3">
              {group.rows.map((row, rowIndex) => (
                <li key={`${row.item}-${rowIndex}`} className="rounded-md border border-line bg-white p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <h3 className="font-sans text-base font-bold text-navy-900">{row.item}</h3>
                    <ReviewFlag review={row.review} className="shrink-0" />
                  </div>
                  {row.value ? <p className="mt-2 line-clamp-3 text-sm text-slate">{row.value}</p> : null}
                  {row.review.note ? <p className="mt-2 text-[0.9375rem] text-charcoal">{row.review.note}</p> : null}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </Container>
    </div>
  );
}
