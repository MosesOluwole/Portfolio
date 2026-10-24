import { getServicePage, servicePages } from "@/content/servicePages";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Service";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getServicePage(slug);
  return ogImage({ kicker: "Freelance software development", title: p?.name ?? "Services" });
}
