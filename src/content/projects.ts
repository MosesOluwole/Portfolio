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

export type Tone = { base: string; tile: string; mark: string };

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
  /** Tone used by the platform visual. */
  tone?: Tone;
  /** For one case study covering several live products (e.g. sister brands). */
  brands?: { name: string; url: string; label: string; tone: Tone }[];
  /** Two or three headline pieces of work, shown in the Selected work section. */
  highlights?: string[];
  /** Search title and description for the case-study page. */
  metaTitle: string;
  metaDescription: string;
  /** Slugs from servicePages.ts this project is evidence for. */
  relatedServices: string[];
  /** ISO date the case study last changed (sitemap). */
  updated: string;
};

export const projects: Project[] = [
  {
    slug: "aligncv",
    metaTitle: "AlignCV Case Study: CV-Tailoring SaaS",
    metaDescription:
      "How I built AlignCV single-handed in Next.js and NestJS: CV parsing, a structured match score, AI rewriting with a provenance check, and DOCX/PDF export.",
    relatedServices: ["mvp-development", "web-application-development", "api-development"],
    updated: "2026-10-24",
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
    metaTitle: "DHUB Education Website Case Study",
    metaDescription:
      "Building DHUB Education's first website as sole developer: course pages, student registration and applications, a content management area and email alerts.",
    relatedServices: ["web-application-development", "api-development"],
    updated: "2026-10-24",
    name: "DHUB Education",
    group: "sole",
    industry: "Education",
    summary:
      "The first website for an education consultancy: course pages, online student registration and applications, and a content area the team manages themselves.",
    role: "Full-stack software developer",
    team: "Sole developer",
    liveUrl: "https://dhubeducation.com/",
    liveLabel: "dhubeducation.com",
    technologies: ["JavaScript", "PHP", "HTML5", "Tailwind CSS", "Bootstrap"],
    overview:
      "DHUB Education helps students explore and apply for study opportunities, including international study. Before this project the organisation had no website; I built its first one from the ground up.",
    challenge:
      "The consultancy needed more than a brochure site. Students had to be able to find courses, register, apply and send enquiries online, and the team needed to keep course and page content up to date without calling a developer for every change. I was the only developer, responsible for every part of it.",
    contribution: [
      "Course pages presenting the organisation's educational programmes",
      "Student registration and application forms, plus general enquiry forms",
      "A content management area so the team can edit website content themselves",
      "The PHP back end, database integration and email notifications for new enquiries and applications",
      "Responsive layouts for desktop and mobile",
      "Testing and production deployment",
    ],
    approach: [
      "PHP back end with database-backed content, so pages and programmes are edited through the admin area rather than in code",
      "Form submissions stored in the database and sent to the team as email notifications, so no enquiry or application depends on someone checking an inbox at the right moment",
      "Front end in HTML5 and JavaScript, styled with Tailwind CSS and Bootstrap",
      "Deployed to shared hosting through cPanel — an affordable setup the organisation can keep running without specialist infrastructure",
    ],
    outcome:
      "The organisation launched with a complete website that presents its programmes, takes enquiries and student applications online, and lets the team manage their own content.",
    screenshot: null,
    visual: "dhub",
  },
  {
    slug: "jordan-care",
    metaTitle: "Jordan Care Website Case Study",
    metaDescription:
      "Building Jordan Care's first website as sole developer: care service pages, enquiry and appointment request forms, an admin area and email notifications.",
    relatedServices: ["web-application-development", "software-maintenance"],
    updated: "2026-10-24",
    name: "Jordan Care",
    group: "sole",
    industry: "Health and social care",
    summary:
      "The first website for a care provider: clear pages for each care service, enquiry and appointment request forms, and an admin area for managing content.",
    role: "Full-stack software developer",
    team: "Sole developer",
    liveUrl: "https://www.jordancare.co.uk/",
    liveLabel: "jordancare.co.uk",
    technologies: ["JavaScript", "PHP", "HTML5", "Tailwind CSS", "Bootstrap"],
    overview:
      "Jordan Care provides home care, dementia care, autism care and live-in care. People looking for care are often doing so at a stressful moment, for themselves or a family member. I designed and built the organisation's first website on my own.",
    challenge:
      "The site had to explain several quite different care services clearly to people who may be anxious and short of time, and make it easy to take the next step — whether that's a question or a request for an appointment. Behind the scenes, the organisation needed to keep its content current without technical help.",
    contribution: [
      "Website design and development, end to end",
      "Service pages for each type of care",
      "Contact and enquiry forms, and appointment request functionality",
      "An admin area for managing website content",
      "PHP form processing, database integration and email notifications",
      "Responsive layouts for mobile and desktop, testing and deployment",
    ],
    approach: [
      "Each care service has its own clearly structured page, with a route to enquire close at hand",
      "Enquiries and appointment requests are processed in PHP, stored in the database and sent to the organisation as email notifications",
      "Database-backed content managed through an admin area, so staff can update the site themselves",
      "Front end in HTML5 and JavaScript with Tailwind CSS and Bootstrap; deployed to shared hosting through cPanel",
    ],
    outcome:
      "The organisation has a working website that presents its services, receives enquiries and appointment requests, and can be kept up to date by its own staff.",
    screenshot: null,
    visual: "jordan",
  },
  {
    slug: "casino-platforms",
    metaTitle: "Wildz, Wheelz, Caxino & Spinz Case Study",
    metaDescription:
      "Senior developer on four live casino brands sharing one platform: an automated content translation workflow, sportsbook integration and production fixes.",
    relatedServices: ["systems-integration", "api-development", "software-maintenance"],
    updated: "2026-10-24",
    name: "Commercial casino platforms",
    group: "team",
    industry: "Online gaming",
    summary:
      "Four live online casino brands running on one shared platform. As part of the senior engineering team I built an automated content translation workflow and integrated the sportsbook into the landing page.",
    role: "Senior software developer",
    team: "Senior engineering team",
    liveUrl: "https://www.wildz.com/en/",
    liveLabel: "wildz.com",
    brands: [
      { name: "Wildz", url: "https://www.wildz.com/en/", label: "wildz.com", tone: { base: "#1f3d2b", tile: "#3f7a52", mark: "#e8f5c8" } },
      { name: "Wheelz", url: "https://www.wheelz.com/en/casino", label: "wheelz.com", tone: { base: "#3a2a1a", tile: "#a8642c", mark: "#ffe9cf" } },
      { name: "Caxino", url: "https://www.caxino.com/en/casino", label: "caxino.com", tone: { base: "#22243a", tile: "#4d55a8", mark: "#dfe2ff" } },
      { name: "Spinz", url: "https://www.spinz.com/en", label: "spinz.com", tone: { base: "#3a1d2c", tile: "#a33d6b", mark: "#ffe0ee" } },
    ],
    highlights: [
      "An automated content translation workflow for brand content",
      "Sportsbook integration on the landing page",
    ],
    technologies: ["Go", "TypeScript", "JavaScript", "Node.js", "AWS"],
    overview:
      "Wildz, Wheelz, Caxino and Spinz are commercial online casino brands serving real players, all running on a shared platform. I worked on them as a senior developer in the engineering team that develops and maintains that platform. The brands and products belong to their operator.",
    challenge:
      "On a shared platform, a change made for one brand can affect all four, and every one of them is live. New functionality had to fit into the existing system, keep behaviour consistent across brands, and not put the stability of live services at risk.",
    contribution: [
      "Implemented a content translation workflow within the existing platform, so brand content can be translated automatically",
      "Integrated the sportsbook experience into the front-end landing page",
      "Back-end services and API integrations",
      "Troubleshooting, production fixes and performance improvements",
      "Production deployments",
    ],
    approach: [
      "Worked across front end and back end with the shared-platform dependencies in mind, so features built once behave consistently on every brand",
      "Built new functionality into the existing platform rather than alongside it, weighing compatibility and reliability for live services",
      "Go and Node.js services with TypeScript and JavaScript, running on AWS",
    ],
    outcome:
      "Automated content translation and the landing-page sportsbook integration shipped to the live platform, alongside other enhancements, production fixes and reliability improvements.",
    screenshot: null,
    visual: "platform",
    tone: { base: "#1f3d2b", tile: "#3f7a52", mark: "#e8f5c8" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const byGroup = (g: ProjectGroup) => projects.filter((p) => p.group === g);
