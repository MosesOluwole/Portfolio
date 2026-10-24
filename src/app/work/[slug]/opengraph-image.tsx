import { getProject, projects } from "@/content/projects";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({ kicker: `Case study — ${p?.industry ?? ""}`, title: p?.name ?? "Case study", footer: p ? `${p.role}, ${p.team.toLowerCase()}` : undefined });
}
