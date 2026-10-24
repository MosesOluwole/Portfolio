/**
 * PROJECT DATA
 *
 * Every field shown on the site comes from here. Anything not yet
 * confirmed is `null`; the site hides that block (or shows a quiet
 * "to be added" note on case-study pages in development only).
 *
 * Rules kept in this file:
 *  - No invented outcomes, metrics or responsibilities.
 *  - Team projects state the team role and never imply ownership of
 *    the product, brand or business.
 *  - Visuals are original illustrations, labelled as such. To use a
 *    real screenshot you have permission for, drop it in /public/work
 *    and set `screenshot`.
 */

export type ProjectGroup = "independent" | "sole" | "team";

export type Project = {
  slug: string;
  name: string;
  group: ProjectGroup;
  industry: string;
  /** One-line description for indexes and previews. */
  summary: string;
  role: string;
  /** "Sole developer", "Senior engineering team", "Founder & sole engineer" */
  team: string;
  liveUrl: string;
  liveLabel: string;
  technologies: string[];
  overview: string;
  /** The real problem or requirement. null = not yet supplied. */
  challenge: string | null;
  /** What Moses personally delivered. */
  contribution: string[];
  /** Implementation decisions that can be verified. null = not yet supplied. */
  approach: string[] | null;
  /** Measurable result — ONLY with evidence. null = not yet supplied. */
  outcome: string | null;
  /** Optional permitted screenshot in /public/work, e.g. "/work/dhub.webp" */
  screenshot: string | null;
  /** Which illustrative composition to render when there is no screenshot. */
  visual: "aligncv" | "dhub" | "jordan" | "platform";
  /** Tone used by the platform visual so the four gaming entries differ. */
  tone?: { base: string; tile: string; mark: string };
};

export const projects: Project[] = [
  {
    slug: "aligncv",
    name: "AlignCV",
    group: "independent",
    industry: "Careers software",
    summary:
      "A CV-tailoring web app that rewrites a CV for a specific job — and rejects any line it can't trace back to the original.",
    role: "Founder and sole engineer",
    team: "Independent product",
    liveUrl: "https://beta.aligncv.co.uk",
    liveLabel: "beta.aligncv.co.uk",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "NestJS",
      "PostgreSQL",
      "MikroORM",
      "Redis",
      "BullMQ",
      "AWS S3",
      "Tailwind CSS",
      "Zod",
    ],
    overview:
      "AlignCV helps job seekers turn the CV they already have into a version tailored to a specific job description, downloadable as an ATS-friendly DOCX or PDF. It is in private beta.",
    challenge:
      "General-purpose AI tools happily blend a job description into someone's work history, producing CVs that read well but claim experience the person doesn't have. The product had to tailor a CV without ever inventing anything — and prove it, rather than just promise it.",
    contribution: [
      "Product concept, design and the full build, front to back",
      "CV parsing for PDF, DOCX and plain text into structured sections",
      "A structured match score with documented weights, so every point maps to a specific matched or missing requirement",
      "A provenance check: each rewritten line carries a reference to where it came from on the original CV, and anything that can't be traced is discarded before the user sees it",
      "DOCX and PDF generation that keeps the user's own section order in a single-column, ATS-safe layout",
      "Google sign-in, quotas, an admin area, audit logging, and optional bring-your-own AI key encrypted at rest",
    ],
    approach: [
      "TypeScript monorepo with a shared package for types and validation used by both the API and the web app",
      "NestJS API with PostgreSQL via MikroORM, organised into modules for auth, CVs, matching, tailoring, documents, quota and audit",
      "Long-running work (parsing, generation) handled by background jobs on Redis and BullMQ, so the interface stays responsive",
      "Uploaded and generated files stored in S3",
      "Next.js and React front end with TanStack Query",
    ],
    outcome: null,
    screenshot: null,
    visual: "aligncv",
  },
  {
    slug: "dhub-education",
    name: "DHUB Education",
    group: "sole",
    industry: "Education",
    summary:
      "The website for an education consultancy that guides students through studying abroad, from course discovery to applications.",
    role: "Full-stack software developer",
    team: "Sole developer",
    liveUrl: "https://dhubeducation.com/",
    liveLabel: "dhubeducation.com",
    technologies: ["JavaScript", "PHP", "HTML5", "Tailwind CSS", "Bootstrap"],
    overview:
      "DHUB Education presents international study guidance, student application support and course discovery online, giving prospective students a clear route into the consultancy's services.",
    challenge: null,
    contribution: [
      "Designed and built the website independently, owning it from first build to production",
      "Front-end and back-end development",
      "Responsive layouts and interface implementation",
      "Site functionality, testing and production deployment",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "dhub",
  },
  {
    slug: "jordan-care",
    name: "Jordan Care",
    group: "sole",
    industry: "Health and social care",
    summary:
      "A care provider's website that explains home, dementia, autism and live-in care clearly and makes enquiring straightforward.",
    role: "Full-stack software developer",
    team: "Sole developer",
    liveUrl: "https://www.jordancare.co.uk/",
    liveLabel: "jordancare.co.uk",
    technologies: ["JavaScript", "PHP", "HTML5", "Tailwind CSS", "Bootstrap"],
    overview:
      "Jordan Care's website presents the organisation's care services — home care, dementia care, autism care and live-in care — to families and individuals looking for support, often at a stressful moment.",
    challenge: null,
    contribution: [
      "Developed the website end to end as the sole developer",
      "Front-end and back-end implementation",
      "Responsive design, so services are as easy to read on a phone as on a desktop",
      "Site functionality, testing and deployment",
      "A user-friendly structure that presents each care service clearly for prospective clients",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "jordan",
  },
  {
    slug: "wildz",
    name: "Wildz",
    group: "team",
    industry: "Online gaming",
    summary: "A live online casino platform, developed and maintained by a senior engineering team.",
    role: "Senior software developer",
    team: "Senior engineering team",
    liveUrl: "https://www.wildz.com/en/",
    liveLabel: "wildz.com",
    technologies: ["Go", "TypeScript", "JavaScript", "Node.js", "AWS"],
    overview:
      "Wildz is a commercial online casino platform serving real players in production. I worked on it as part of the senior software engineering team; the product and brand belong to its operator.",
    challenge: null,
    contribution: [
      "Front-end and back-end development within the senior engineering team",
      "API integrations and application functionality",
      "Troubleshooting production issues",
      "Production deployments",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "platform",
    tone: { base: "#1f3d2b", tile: "#3f7a52", mark: "#e8f5c8" },
  },
  {
    slug: "wheelz",
    name: "Wheelz",
    group: "team",
    industry: "Online gaming",
    summary: "A live online casino platform, developed and maintained by a senior engineering team.",
    role: "Senior software developer",
    team: "Senior engineering team",
    liveUrl: "https://www.wheelz.com/en/casino",
    liveLabel: "wheelz.com",
    technologies: ["Go", "TypeScript", "JavaScript", "Node.js", "AWS"],
    overview:
      "Wheelz is a commercial online casino platform. I contributed to its development and maintenance as part of the senior engineering team; the product and brand belong to its operator.",
    challenge: null,
    contribution: [
      "Front-end and back-end engineering",
      "API development and integrations",
      "Application enhancements",
      "Troubleshooting and deployments",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "platform",
    tone: { base: "#3a2a1a", tile: "#a8642c", mark: "#ffe9cf" },
  },
  {
    slug: "caxino",
    name: "Caxino",
    group: "team",
    industry: "Online gaming",
    summary: "A live online casino platform, developed and maintained by a senior engineering team.",
    role: "Senior software developer",
    team: "Senior engineering team",
    liveUrl: "https://www.caxino.com/en/casino",
    liveLabel: "caxino.com",
    technologies: ["Go", "TypeScript", "JavaScript", "Node.js", "AWS"],
    overview:
      "Caxino is a commercial online casino platform. I worked within the senior software engineering team that develops and maintains it; the product and brand belong to its operator.",
    challenge: null,
    contribution: [
      "Full-stack development across back-end services and front-end functionality",
      "API and system integrations",
      "Debugging",
      "Production deployments",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "platform",
    tone: { base: "#22243a", tile: "#4d55a8", mark: "#dfe2ff" },
  },
  {
    slug: "spinz",
    name: "Spinz",
    group: "team",
    industry: "Online gaming",
    summary: "A live online casino platform, developed and maintained by a senior engineering team.",
    role: "Senior software developer",
    team: "Senior engineering team",
    liveUrl: "https://www.spinz.com/en",
    liveLabel: "spinz.com",
    technologies: ["Go", "TypeScript", "JavaScript", "Node.js", "AWS"],
    overview:
      "Spinz is a commercial online casino platform. I contributed as part of the senior engineering team responsible for developing and maintaining it; the product and brand belong to its operator.",
    challenge: null,
    contribution: [
      "Front-end and back-end implementation",
      "Go-based service development",
      "API integrations",
      "Troubleshooting and application deployments",
    ],
    approach: null,
    outcome: null,
    screenshot: null,
    visual: "platform",
    tone: { base: "#3a1d2c", tile: "#a33d6b", mark: "#ffe0ee" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const byGroup = (g: ProjectGroup) => projects.filter((p) => p.group === g);
