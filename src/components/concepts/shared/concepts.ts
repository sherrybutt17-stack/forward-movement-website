import { testimonials } from "@/content/portfolio";

export const concepts = [
  {
    href: "/concepts/1",
    number: "1",
    name: "Executive",
    summary: "Premium consultancy feel for government and corporate buyers: precise grid, layered panels, animated line-art diagrams, refined micro-interactions.",
  },
  {
    href: "/concepts/2",
    number: "2",
    name: "Workshop",
    summary: "Dark chalkboard take on a facilitator’s workshop: chalk-drawn scene, ember and gold gradients, draggable notes, tilting index cards and doodles that draw themselves.",
  },
] as const;

export const featuredTestimonial = testimonials.find((t) => t.attribution === "Jessica H.")!;
