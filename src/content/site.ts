/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file first.
 *
 *  Any value left as an empty string ("") is treated as "not
 *  configured": the link or element that uses it is hidden rather
 *  than rendered as a broken link. In development a banner lists
 *  everything still missing (see src/components/ConfigNotice.tsx).
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Moses Oluwole",
  /** Short wordmark used in the header and footer. */
  wordmark: "Moses Oluwole",
  /** Two-letter monogram used in the favicon and small marks. */
  monogram: "MO",
  role: "Full-stack software engineer",
  location: "London, UK",
  /** Shown in the hero and contact sections. Edit freely. */
  availability: "Taking on new freelance projects",
  yearsExperience: 7,

  /** TODO: your public contact email, e.g. "hello@your-domain.co.uk" */
  email: "oluwolemoses@gmail.com",
  /** TODO: full URL of your Bark profile */
  barkUrl: "https://www.bark.com/en/gb/company/moses-oluwole/RdYDZ/",
  /** TODO: full LinkedIn profile URL */
  linkedinUrl: "https://www.linkedin.com/in/moses-oluwole-30b96172/",
  /** TODO: full GitHub profile URL */
  githubUrl: "https://github.com/MosesOluwole",

  /**
   * Professional photo for the About section. Put the file in /public
   * (e.g. /public/moses.jpg) and set the path here: "/moses.jpg".
   * Leave empty and the section uses a typographic layout instead.
   */
  photo: "",
  photoAlt: "Moses Oluwole",

  /**
   * Privacy notice settings (rendered at /privacy). These are YOUR
   * decisions as data controller — check each one is true before launch,
   * and update `lastUpdated` whenever you change the notice.
   */
  privacy: {
    lastUpdated: "2026-10-24",
    /** Where your inbox is hosted (enquiries end up here). */
    emailProvider: "Google (Gmail)",
    /** Where the site is hosted. Change if you don't deploy to Vercel. */
    hostingProvider: "Vercel",
    /** How long enquiries that don't lead to work are kept. */
    enquiryRetention: "12 months",
    /** How long client records are kept after a project ends (tax and legal records). */
    clientRetention: "6 years",
  },

  seo: {
    title: "Moses Oluwole — Freelance Full-Stack Developer in London, UK",
    description:
      "Freelance full-stack software engineer in London with 7+ years' experience. Custom web applications, APIs, MVPs and business integrations for UK small businesses, founders and teams.",
  },
} as const;

/**
 * Canonical origin used for canonical URLs, sitemap, robots.txt, Open Graph
 * and structured data. Set NEXT_PUBLIC_SITE_URL to your real domain
 * (e.g. https://www.mosesoluwole.co.uk). On Vercel, the project's
 * production domain is used automatically if the variable is missing.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  if (process.env.NODE_ENV === "production" && process.env.CI) {
    console.warn("[seo] NEXT_PUBLIC_SITE_URL is not set: canonical URLs will point to localhost.");
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Keys from `site` that are still empty — used by the dev-only notice. */
export function missingConfig(): string[] {
  const keys = ["email", "barkUrl", "linkedinUrl", "githubUrl"] as const;
  return keys.filter((k) => !site[k]);
}
