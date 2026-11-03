import { fromCurrentSite, placeholder, type Review, type Reviewable } from "./types";

export type SectorId = "government" | "education" | "corporate";

export interface Client {
  name: string;
  /** Possible spelling/naming issue copied from the current site — confirm rather than silently correct. */
  check?: string;
  /** Shown in the home-page portfolio preview. */
  featured?: boolean;
}

export interface Testimonial extends Reviewable {
  quote: string;
  /** Attribution exactly as on the current site; null where none was given. */
  attribution: string | null;
  sector: SectorId;
}

export interface Sector extends Reviewable {
  id: SectorId;
  name: string;
  /** Short label for cards. */
  short: string;
  description: string;
  clients: Client[];
  clientsReview: Review;
}

const clientsReview = fromCurrentSite(
  "Client list copied from the current site (shown as text, never logos). Confirm each organization may be named publicly and fix flagged spellings.",
);

export const sectors: Sector[] = [
  {
    id: "government",
    name: "Government",
    short: "Local, state and federal agencies",
    description:
      "Long-term training solutions for local, state and federal government, meeting career development needs while building employees’ skills, knowledge and capabilities.",
    review: fromCurrentSite("Sector description from the current /government page."),
    clientsReview,
    clients: [
      { name: "Alexandria Sheriff Department" },
      { name: "Attleboro Housing Authority" },
      { name: "Burlington Board of Health (MA)" },
      { name: "Chesapeake Department of Police" },
      { name: "Comptroller of Maryland" },
      { name: "Department of Army", check: "Likely “Department of the Army”." },
      { name: "Department of Behavioral Health", check: "Which jurisdiction?" },
      { name: "Department of Homeland Security", featured: true },
      { name: "Department of Social Services", check: "Which jurisdiction?" },
      { name: "Environmental Protection Agency (EPA)", featured: true },
      { name: "Federal Bureau of Prisons Chaplaincy" },
      { name: "Federal Railroad Administration" },
      { name: "Internal Revenue Services Office of Supervisors", check: "Likely “Internal Revenue Service”." },
      { name: "Lake County Superior Court (Indiana)" },
      { name: "Loudon County Board of Supervisors (BOS)", check: "Likely “Loudoun County”." },
      { name: "Maryland Department of Transportation (MDOT)", featured: true },
      { name: "National Alcohol Beverage Control", check: "Likely “National Alcohol Beverage Control Association”." },
      { name: "New York State Office of Mental Health" },
      { name: "Newark Housing Authority" },
      { name: "Port of Authority of NY & NJ", check: "Likely “Port Authority of New York and New Jersey”." },
      { name: "Social Security Administration (SSA)", featured: true },
      { name: "State Department", check: "Likely “U.S. Department of State”." },
      { name: "United States National Guard" },
      { name: "Virginia Department of Health" },
    ],
  },
  {
    id: "education",
    name: "Educational institutions",
    short: "Colleges, universities and school systems",
    description:
      "Partnerships with learning environments to develop the leadership skills of faculty, students and administrative teams.",
    review: fromCurrentSite("Sector description from the current /educational-institutions page."),
    clientsReview,
    clients: [
      { name: "Baltimore City Community College" },
      { name: "Berkeley College" },
      { name: "Colgate University" },
      { name: "Columbia University" },
      { name: "District of Columbia Public Schools" },
      { name: "Fairfax County Public Schools" },
      { name: "George Washington University", featured: true },
      { name: "Harvard Medical School" },
      { name: "Howard University", featured: true },
      { name: "Lehman College" },
      { name: "Liberty University" },
      { name: "Morgan State University", featured: true },
      { name: "Norfolk County Public Schools", check: "Confirm exact name (e.g., Norfolk Public Schools)." },
      { name: "Prince George’s County Public Schools", featured: true },
      { name: "University of Lynchburg" },
      { name: "University of MA", check: "Which University of Massachusetts campus?" },
      { name: "University of Maryland University College", check: "Now University of Maryland Global Campus (UMGC)." },
      { name: "University of West GA", check: "Likely “University of West Georgia”." },
      { name: "Virginia Tech" },
      { name: "William & Mary" },
    ],
  },
  {
    id: "corporate",
    name: "Corporate & nonprofit",
    short: "Companies and nonprofit organizations",
    description:
      "Professional development for small to large organizations, starting with a training gap analysis and focused on employee performance and value.",
    review: fromCurrentSite(
      "Sector description condensed from the current /corporate page. Section renamed “Corporate & nonprofit” because the list includes nonprofits — confirm.",
    ),
    clientsReview,
    clients: [
      { name: "Atlanta Hawks" },
      { name: "Capitol One", check: "Likely “Capital One”." },
      { name: "Catholic Charities" },
      { name: "Easterseals" },
      { name: "Georgia Pacific", check: "Official styling is “Georgia-Pacific”." },
      { name: "Goodwill" },
      { name: "HITT Contracting" },
      { name: "Indiana Airport Authority", check: "Confirm exact name (e.g., Indianapolis Airport Authority)." },
      { name: "JBG Corporation", check: "Confirm current name (e.g., JBG SMITH)." },
      { name: "Johnson & Johnson", featured: true },
      { name: "Ken Foods Inc." },
      { name: "M & T Bank", check: "Official styling is “M&T Bank”." },
      { name: "Make A Wish Foundation", check: "Official styling is “Make-A-Wish Foundation”." },
      { name: "Mercedes Benz USA LLC", check: "Official styling is “Mercedes-Benz USA, LLC”." },
      { name: "Merrill Lynch" },
      { name: "Morgan Stanley" },
      { name: "Navy Federal Credit Union", featured: true },
      { name: "Perdue Farms LLC" },
      { name: "St. Mary’s Hospital for Children" },
      { name: "Sunbelt Rentals" },
      { name: "TJX Companies" },
      { name: "T-Mobile", featured: true },
      { name: "UNICEF" },
      { name: "United States Postal Service", check: "Federal entity listed under Corporate on the current site — confirm placement." },
      { name: "United Way", featured: true },
    ],
  },
];

const testimonialReview = (note?: string) =>
  fromCurrentSite(
    note ??
      "Testimonial copied verbatim from the current site. Confirm permission to publish and the attribution format.",
  );

export const testimonials: Testimonial[] = [
  {
    sector: "government",
    quote:
      "Hands down one of the best workshops I have attended. Informative, engaging and fun. Theresa was exceptional, great speaker and motivator. I enjoyed her enthusiasm and success stories.",
    attribution: "Jessica H.",
    review: testimonialReview(),
  },
  {
    sector: "government",
    quote:
      "Theresa is a dynamic and engaging presenter. Her presentation was informative and thought provoking. It was great that she had so much professional experience to draw from. She answered questions thoroughly and used relevant examples. I enjoyed her training.",
    attribution: "Carrie W.",
    review: testimonialReview(
      "Copied from the current site; one sentence about PowerPoint omitted for length. Confirm permission and edit.",
    ),
  },
  {
    sector: "government",
    quote: "Theresa kept it very interactive. She did a phenomenal job.",
    attribution: "Dave W.",
    review: testimonialReview(),
  },
  {
    sector: "government",
    quote:
      "Theresa Proctor was very inspirational and informative! Knowledgeable and made you very comfortable participating in the discussions. I’ve received a new perspective and I will put into practice many of the things I have learned today.",
    attribution: "Heather G.",
    review: testimonialReview("Excerpt of a longer testimonial on the current site. Confirm permission and edit."),
  },
  {
    sector: "education",
    quote:
      "Theresa Proctor was amazing. She held everyone’s attention and included everyone in the discussion. I would definitely recommend this training.",
    attribution: null,
    review: testimonialReview(),
  },
  {
    sector: "education",
    quote:
      "Lots of great takeaways to apply to the everyday office life. I’m inspired to be more assertive in my position to better establish my career path.",
    attribution: null,
    review: testimonialReview("Excerpt of a longer testimonial on the current site. Confirm permission and edit."),
  },
  {
    sector: "education",
    quote:
      "Theresa lives this training life and it shows, she knows how to work with the class through real world issues while keeping it relevant with current workforce solutions.",
    attribution: null,
    review: testimonialReview("Excerpt of a longer testimonial on the current site. Confirm permission and edit."),
  },
  {
    sector: "education",
    quote:
      "The training which could potentially have been very dry and boring was motivational and dynamic. I would take any other training she facilitated.",
    attribution: null,
    review: testimonialReview("Excerpt of a longer testimonial on the current site. Confirm permission and edit."),
  },
  {
    sector: "corporate",
    quote:
      "Theresa was engaging, knowledgeable and passionate. She kept my attention and encouraged participation. She is by far one of the best trainers I have seen and would love to attend another training with her.",
    attribution: null,
    review: testimonialReview(),
  },
  {
    sector: "corporate",
    quote:
      "Theresa was great and gave a lot of great anecdotes that will help the material to stick. I set more goals for myself in this training than I ever have. I am excited to execute starting today.",
    attribution: null,
    review: testimonialReview("Excerpt of a longer testimonial on the current site. Confirm permission and edit."),
  },
  {
    sector: "corporate",
    quote:
      "Wonderful presentation. Concise and well-organized information with steps with practical application that can be used in personal life as well as business.",
    attribution: null,
    review: testimonialReview(),
  },
  {
    sector: "corporate",
    quote:
      "I enjoyed Theresa’s energy and knowledge on the subject. She made me feel welcome as soon as I came in the door. She also answered any questions I had.",
    attribution: null,
    review: testimonialReview(),
  },
];

export interface CaseStudy extends Reviewable {
  title: string;
  sector: SectorId;
  challenge: string;
  approach: string;
  formatDelivered: string;
  outcomes: string;
}

/** No project write-ups exist on the current site. Add approved case studies here. */
export const caseStudies: CaseStudy[] = [];

export const caseStudiesPending = placeholder(
  "Supply 2–3 approved projects: challenge, approach, format delivered and documented outcomes, with permission to name the client (or an anonymized description).",
);
