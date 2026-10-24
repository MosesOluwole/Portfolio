import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import ProjectVisual from "@/components/visuals/ProjectVisual";
import EnquiryCta from "@/components/EnquiryCta";
import { getServicePage } from "@/content/servicePages";
import { breadcrumbs, JsonLd } from "@/lib/schema";
import s from "./case.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `/work/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: p.metaTitle, description: p.metaDescription },
    twitter: { title: p.metaTitle, description: p.metaDescription },
  };
}

const isDev = process.env.NODE_ENV !== "production";

function Missing({ what }: { what: string }) {
  return isDev ? <p className={s.missing}>To be added in src/content/projects.ts: {what}</p> : null;
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length]!;
  const isTeam = p.group === "team";

  return (
    <article className={s.page}>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: `${p.name} case study`, path: `/work/${p.slug}` }])} />
      <header className={`wrap ${s.head}`}>
        <nav aria-label="Breadcrumb" className={s.crumb}><Link href="/">Home</Link> / <Link href="/#work">Selected work</Link> / <span aria-current="page">{p.name}</span></nav>
        <h1 className={s.title}>{p.name}</h1>
        <dl className={s.meta}>
          <div><dt>Industry</dt><dd>{p.industry}</dd></div>
          <div><dt>My role</dt><dd>{p.role}</dd></div>
          <div><dt>Team</dt><dd>{p.team}</dd></div>
          <div>
            <dt>{p.brands ? "Live products" : "Live product"}</dt>
            <dd className={p.brands ? s.brandLinks : undefined}>
              {(p.brands ?? [{ name: p.name, url: p.liveUrl, label: p.liveLabel }]).map((b) => (
                <a key={b.url} href={b.url} target="_blank" rel={p.brands ? "nofollow noopener noreferrer" : "noopener noreferrer"} className="textlink">
                  {b.label}<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      <div className={`wrap ${s.visual}`}>
        <div className={p.visual === "aligncv" ? s.visualInk : s.visualPaper}>
          <div className={p.visual === "aligncv" ? "on-ink" : undefined}>
            <ProjectVisual project={p} priority />
          </div>
        </div>
      </div>

      <div className={`wrap ${s.body}`}>
        {isTeam && (
          <p className={s.disclaimer}>
            {p.brands ? p.brands.map((b) => b.name).join(", ") : p.name} {p.brands ? "are" : "is"} built and run by a
            wider team and owned by {p.brands ? "their" : "its"} operator. This page describes my own contribution as a
            member of the senior engineering team, not the platform as a whole.
            {p.brands ? " The live sites are only available in some countries." : ""}
          </p>
        )}

        <section className={s.block} aria-labelledby="h-overview">
          <h2 id="h-overview">Overview</h2>
          <div><p className={s.lead}>{p.overview}</p></div>
        </section>

        {(p.challenge || isDev) && (
          <section className={s.block} aria-labelledby="h-challenge">
            <h2 id="h-challenge">The challenge</h2>
            <div>{p.challenge ? <p>{p.challenge}</p> : <Missing what="the challenge" />}</div>
          </section>
        )}

        <section className={s.block} aria-labelledby="h-contrib">
          <h2 id="h-contrib">My contribution</h2>
          <div>
            <ul className={s.list}>{p.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </section>

        <section className={s.block} aria-labelledby="h-approach">
          <h2 id="h-approach">Technical approach</h2>
          <div>
            {p.approach ? <ul className={s.list}>{p.approach.map((c) => <li key={c}>{c}</li>)}</ul> : <Missing what="technical approach" />}
            <p className={s.tech}><span>Technologies</span>{p.technologies.join(", ")}</p>
          </div>
        </section>

        {(p.outcome || isDev) && (
          <section className={s.block} aria-labelledby="h-outcome">
            <h2 id="h-outcome">Outcome</h2>
            <div>{p.outcome ? <p>{p.outcome}</p> : <Missing what="a verified outcome (only with evidence)" />}</div>
          </section>
        )}
      </div>

      <div className={`wrap ${s.foot}`}>
        {p.relatedServices.length > 0 && (
          <section className={s.related} aria-labelledby="h-related">
            <h2 id="h-related">Related services</h2>
            <ul>
              {p.relatedServices.map((r) => {
                const sp = getServicePage(r);
                return sp ? <li key={r}><Link href={`/services/${sp.slug}`}>{sp.name}</Link></li> : null;
              })}
            </ul>
          </section>
        )}
        <EnquiryCta />
        <p className={s.next}>
          <span>Next project</span>
          <Link href={`/work/${next.slug}`}>{next.name}</Link>
        </p>
      </div>
    </article>
  );
}
