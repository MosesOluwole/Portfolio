import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicePage, servicePages } from "@/content/servicePages";
import { getProject } from "@/content/projects";
import { services } from "@/content/services";
import { breadcrumbs, ids, JsonLd } from "@/lib/schema";
import { siteUrl } from "@/content/site";
import EnquiryCta from "@/components/EnquiryCta";
import s from "./service.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getServicePage(slug);
  if (!p) return {};
  const url = `/services/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: { url, title: p.metaTitle, description: p.metaDescription, type: "website" },
    twitter: { title: p.metaTitle, description: p.metaDescription },
  };
}

export default async function ServicePageView({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getServicePage(slug);
  if (!p) notFound();
  const enquiryType = services.find((sv) => sv.id === p.serviceId)?.enquiryType;
  const url = `/services/${p.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${url}#service`,
    name: p.name,
    serviceType: p.name,
    description: p.metaDescription,
    url: `${siteUrl}${url}`,
    provider: { "@id": ids.person },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };

  return (
    <article className={s.page}>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: p.name, path: url }])} />

      <header className={`wrap ${s.head}`}>
        <nav aria-label="Breadcrumb" className={s.crumb}>
          <Link href="/">Home</Link> / <Link href="/#services">Services</Link> / <span aria-current="page">{p.name}</span>
        </nav>
        <h1 className={s.title}>{p.h1}</h1>
        <div className={s.intro}>
          {p.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
        </div>
        <div className={s.ctas}>
          <Link href="/#contact" className="btn btn-primary">Discuss your project</Link>
          <a href="#experience" className="btn btn-ghost">See relevant work</a>
        </div>
      </header>

      <div className="wrap">
        <section className={s.block} aria-labelledby="signs">
          <h2 id="signs">Is this you?</h2>
          <ul className={s.signs}>{p.signs.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        <section className={s.block} aria-labelledby="includes">
          <h2 id="includes">What I can build for you</h2>
          <dl className={s.includes}>
            {p.includes.map((it) => (
              <div key={it.title}><dt>{it.title}</dt><dd>{it.text}</dd></div>
            ))}
          </dl>
        </section>

        <section className={s.block} aria-labelledby="experience" id="experience">
          <h2>Relevant experience</h2>
          <ul className={s.evidence}>
            {p.evidence.map((e) => {
              const proj = getProject(e.project);
              if (!proj) return null;
              return (
                <li key={e.project}>
                  <h3><Link href={`/work/${proj.slug}`}>{proj.name}</Link></h3>
                  <p className={s.evMeta}>{proj.role}, {proj.team.toLowerCase()}</p>
                  <p>{e.text}</p>
                  <p><Link href={`/work/${proj.slug}`} className="textlink">Read the {proj.name} case study</Link></p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.block} aria-labelledby="how">
          <h2 id="how">How it works</h2>
          <div className={s.prose}>
            <p>
              Every project follows the same four stages — discover, define, build, and ship and support — scaled
              to the size of the job. We agree the scope and price in writing before the build starts, you see working
              progress regularly, and you finish with documented software you own.{" "}
              <Link href="/#process" className="textlink">See how I work</Link>.
            </p>
            <p className={s.tech}><span>Technologies</span>{p.technologies}</p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="faqs">
          <h2 id="faqs">Common questions</h2>
          <div className={s.faqs}>
            {p.faqs.map((f) => (
              <details key={f.q}>
                <summary><h3>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={s.block} aria-labelledby="related">
          <h2 id="related">Related services</h2>
          <ul className={s.related}>
            {p.related.map((r) => {
              const rp = getServicePage(r);
              return rp ? <li key={r}><Link href={`/services/${rp.slug}`}>{rp.name}</Link></li> : null;
            })}
          </ul>
        </section>

        <div className={s.foot}>
          <EnquiryCta text="Tell me what you're trying to build." enquiryType={enquiryType} />
        </div>
      </div>
    </article>
  );
}
