import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { leader, teamMembers, teamPending } from "@/content/team";
import { isVisible, visible } from "@/lib/visible";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHero } from "@/components/ui/PageHero";
import { PendingState } from "@/components/ui/PendingState";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: `Meet the people behind ${siteConfig.brandName}, led by founder and CEO ${leader.name}.`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const members = visible(teamMembers);
  const showTeamSection = members.length > 0 || siteConfig.reviewMode;

  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        title={`The people behind ${siteConfig.shortName}`}
        lead={`Our work is led by founder and CEO ${leader.name}, an ICF-credentialed Executive Coach, together with an instructional design team that builds each curriculum around the organization it serves.`}
      />

      {isVisible(leader.review) ? (
        <section aria-labelledby="leader-title" className="bg-white">
          <Container className="grid gap-12 py-[clamp(3.5rem,7vw,6rem)] md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <ImageSlot
                image={leader.photo}
                pendingLabel="Updated headshot pending"
                monogram={leader.initials}
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 26rem, 100vw"
                className="mx-auto max-w-sm md:max-w-none"
              />
              <ReviewFlag review={leader.photoReview} className="mt-3" />
            </div>

            <div>
              <p className="eyebrow">Founder &amp; CEO</p>
              <h2 id="leader-title" className="mt-4 text-h1">
                {leader.name}
              </h2>
              <p className="mt-3 text-lead font-semibold text-navy-700">{leader.role}</p>
              <ReviewFlag review={leader.review} className="mt-4" />

              <div className="prose-measure mt-8 grid gap-5 text-[1.0625rem] leading-relaxed text-charcoal">
                {leader.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                  Credentials &amp; certifications
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {leader.credentials.map((credential) => (
                    <li key={credential} className="flex gap-3 text-charcoal">
                      <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                      {credential}
                    </li>
                  ))}
                </ul>
                {leader.honors.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {leader.honors.map((honor) => (
                      <li key={honor} className="rounded-full bg-gold-100 px-4 py-2 text-sm font-semibold text-ink">
                        {honor}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {isVisible(leader.affiliationsReview) ? (
                <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                      Board service
                    </h3>
                    <ul className="mt-4 grid gap-2.5">
                      {leader.boards.map((board) => (
                        <li key={board} className="flex gap-3 text-charcoal">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                          {board}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-navy-700">
                      Memberships
                    </h3>
                    <ul className="mt-4 grid gap-2.5">
                      {leader.memberships.map((membership) => (
                        <li key={membership} className="flex gap-3 text-charcoal">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-400" />
                          {membership}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ReviewFlag review={leader.affiliationsReview} className="sm:col-span-2" />
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {showTeamSection ? (
        <Section id="team" tone="sand">
          <SectionHeader
            id="team"
            eyebrow="Our team"
            title="The team behind every program"
            intro="Profiles of the people who design and deliver each engagement."
          />
          {members.length > 0 ? (
            <RevealGroup as="ul" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((person) => (
                <RevealItem as="li" key={person.name}>
                  <article className="h-full rounded-md bg-white p-5 shadow-card">
                    <ImageSlot
                      image={person.photo}
                      pendingLabel="Photo pending"
                      monogram={person.initials}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
                    />
                    <h3 className="mt-5 text-h3">{person.name}</h3>
                    <p className="mt-1 font-semibold text-navy-700">{person.role}</p>
                    <p className="mt-3 text-slate">{person.summary}</p>
                    <ReviewFlag review={person.review} className="mt-3" />
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <PendingState title="Additional team profiles pending" review={teamPending} className="mt-12">
              <ul className="grid gap-5 sm:grid-cols-3" aria-label="Example team card layout">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="rounded-md bg-ivory-50 p-4">
                    <div aria-hidden="true" className="aspect-[4/5] rounded-sm bg-navy-100" />
                    <p className="mt-4 font-display text-lg font-semibold text-navy-900">Name pending</p>
                    <p className="text-sm text-slate">Role · Short bio · Approved photo</p>
                  </li>
                ))}
              </ul>
            </PendingState>
          )}
        </Section>
      ) : null}

      <CtaBand title="Bring this team to your organization." />
    </>
  );
}
