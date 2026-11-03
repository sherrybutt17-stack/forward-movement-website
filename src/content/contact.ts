import { fromCurrentSite, type Review } from "./types";

const contactReview: Review = fromCurrentSite(
  "Contact details copied from the current site. Confirm they are current and that this email should be public.",
);

export const contact = {
  email: "theresa@forwardmovementent.com",
  phone: { display: "240-389-3577", href: "tel:+12403893577" },
  address: {
    lines: ["12138 Central Avenue, Suite 131", "Bowie, Maryland 20721"],
    region: "Baltimore–Washington region",
  },
  review: contactReview,
};

export const social = {
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/35690359" },
    { label: "Facebook", href: "https://www.facebook.com/forwardmovementent" },
  ],
  review: fromCurrentSite(
    "Social links from the current site (Facebook was a fb.me short link, expanded here). Confirm both profiles are active.",
  ),
};
