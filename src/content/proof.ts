import { fromCurrentSite, type Reviewable } from "./types";

export interface Stat extends Reviewable {
  id: string;
  value: string;
  label: string;
}

/** Shown as static text — no count-up animation, so the figures are never distorted. */
export const stats: Stat[] = [
  {
    id: "people-trained",
    value: "250,000+",
    label: "people trained",
    review: fromCurrentSite(
      'Current site: "Over 250,000 people trained." Confirm the figure and how it is counted (e.g., unique participants vs. seats).',
    ),
  },
  {
    id: "projects-completed",
    value: "317+",
    label: "projects completed",
    review: fromCurrentSite('Current site: "Over 317 projects completed." Confirm the current figure.'),
  },
  {
    id: "established",
    value: "2016",
    label: "year established",
    review: fromCurrentSite('Current site: "2016 — Year established." Confirm.'),
  },
];
