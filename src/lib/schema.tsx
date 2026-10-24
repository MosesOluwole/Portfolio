import { site, siteUrl } from "@/content/site";

/**
 * Schema.org JSON-LD. Only facts stated elsewhere on the site: no ratings,
 * reviews, street address or invented organisation details.
 */
export const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  service: `${siteUrl}/#service`,
};

const sameAs = [site.linkedinUrl, site.githubUrl, site.barkUrl].filter(Boolean);

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        jobTitle: "Freelance full-stack software engineer",
        url: siteUrl,
        ...(site.email ? { email: `mailto:${site.email}` } : {}),
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        knowsAbout: [
          "Full-stack web development", "Backend development", "API development", "TypeScript", "Node.js",
          "NestJS", "React", "Next.js", "Go", "PHP", "Python", "Django", "PostgreSQL", "AWS",
        ],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: siteUrl,
        name: site.name,
        inLanguage: "en-GB",
        publisher: { "@id": ids.person },
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.service,
        name: `${site.name} — freelance software development`,
        url: siteUrl,
        description: site.seo.description,
        provider: { "@id": ids.person },
        founder: { "@id": ids.person },
        areaServed: { "@type": "Country", name: "United Kingdom" },
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        ...(site.email ? { email: site.email } : {}),
        sameAs,
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
