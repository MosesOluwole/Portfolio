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
  email: "",
  /** TODO: full URL of your Bark profile */
  barkUrl: "",
  /** TODO: full LinkedIn profile URL */
  linkedinUrl: "",
  /** TODO: full GitHub profile URL */
  githubUrl: "",

  /**
   * Professional photo for the About section. Put the file in /public
   * (e.g. /public/moses.jpg) and set the path here: "/moses.jpg".
   * Leave empty and the section uses a typographic layout instead.
   */
  photo: "",
  photoAlt: "Moses Oluwole",

  seo: {
    title: "Moses Oluwole — Freelance Full-Stack Software Engineer, London",
    description:
      "Freelance full-stack developer in the UK. I build web applications, APIs, MVPs, dashboards and business automation for small businesses, founders and teams — from first conversation to dependable software.",
    keywords: [
      "freelance full-stack developer UK",
      "freelance software developer London",
      "web application developer",
      "backend developer",
      "API development",
      "custom software development",
      "MVP development for startups",
      "business automation",
    ],
  },
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

/** Keys from `site` that are still empty — used by the dev-only notice. */
export function missingConfig(): string[] {
  const keys = ["email", "barkUrl", "linkedinUrl", "githubUrl"] as const;
  return keys.filter((k) => !site[k]);
}
