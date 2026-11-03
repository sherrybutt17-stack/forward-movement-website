# Team photos

## CEO headshot (updated photo pending from the client)

Until an approved photo is added, the site shows a neutral navy "TP" monogram panel — never a stand-in portrait.

1. Save the approved headshot here as `theresa-proctor.jpg` (JPEG or PNG, at least 1200px on the long edge, portrait 4:5 crop works best).
2. In `src/content/team.ts`, add near the top:
   `import theresaPhoto from "@/assets/team/theresa-proctor.jpg";`
3. Set `photo: { src: theresaPhoto, alt: "Theresa R. Proctor, Founder and CEO" }` on `leader`.
4. Change `photoReview` to `{ status: "approved", source: "current-site" }` once the client has signed off.

`next/image` generates responsive AVIF/WebP versions automatically; no manual resizing is needed.

## Other team members

Add approved entries to `teamMembers` in `src/content/team.ts` (name, role, initials, photo, summary, bio, review status). Photos go in this folder and are imported the same way.
