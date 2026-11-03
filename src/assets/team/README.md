# Team photos

- `theresa-proctor-1.jpg`: Dr. Theresa R. Proctor, arms crossed (2026, supplied by the client). Used in the Executive concept.
- `theresa-proctor-2.jpg`: Dr. Theresa R. Proctor, smiling (2026, supplied by the client). Used on the Home and Team pages and in the Workshop concept.

Both are resized from the client's originals (about 3200×4000) to 1800px on the long edge. `next/image` generates responsive AVIF and WebP versions automatically.

## Replacing or adding photos

1. Save the approved photo in this folder (JPEG or PNG, ideally at least 1200px on the long edge; a portrait 4:5 crop works best).
2. Import it in `src/content/team.ts` and set `photo` (and optionally `altPhoto`) on `leader`, or `photo` on a team member.
3. Never use a stand-in, generated or stock portrait for a real person.

## Other team members

Add approved entries to `teamMembers` in `src/content/team.ts` (name, role, initials, photo, summary, bio, review status).
