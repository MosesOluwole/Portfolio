import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/servicePages";
import { site, siteUrl } from "@/content/site";

/** Only canonical, indexable URLs. lastModified reflects real content changes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const home = "2026-10-24";
  return [
    { url: `${siteUrl}/`, lastModified: home },
    ...servicePages.map((p) => ({ url: `${siteUrl}/services/${p.slug}`, lastModified: p.updated })),
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, lastModified: p.updated })),
    { url: `${siteUrl}/privacy`, lastModified: site.privacy.lastUpdated },
  ];
}
