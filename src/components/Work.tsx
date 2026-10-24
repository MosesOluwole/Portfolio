import Link from "next/link";
import { byGroup, getProject } from "@/content/projects";
import ProjectVisual from "./visuals/ProjectVisual";
import PlatformIndex from "./PlatformIndex";
import s from "./Work.module.css";

export default function Work() {
  const aligncv = getProject("aligncv")!;
  const [dhub, jordan] = byGroup("sole");
  const [platforms] = byGroup("team");

  return (
    <section id="work" className={s.work} aria-labelledby="work-title">
      <div className="wrap section" style={{ paddingBottom: 0 }}>
        <div className="sectionHead">
          <p className="label">Selected work</p>
          <h2 id="work-title">Real products, in use today.</h2>
          <p className="intro">
            An independent product I built and run, websites I built single-handed for real businesses, and live
            platforms I worked on as part of a senior engineering team.
          </p>
        </div>
      </div>

      {/* A — Independent product: full dark spread */}
      <div className={`on-ink ${s.spread}`}>
        <div className={`wrap ${s.spreadGrid}`}>
          <div className={s.spreadText}>
            <p className={s.kicker}>Independent product</p>
            <h3 className={s.bigName}>{aligncv.name}</h3>
            <p className={s.summary}>{aligncv.summary}</p>
            <dl className={s.meta}>
              <div><dt>Role</dt><dd>{aligncv.role}</dd></div>
              <div><dt>Status</dt><dd>Private beta</dd></div>
            </dl>
            <p className="techline">{aligncv.technologies.join(", ")}</p>
            <div className={s.actions}>
              <Link href={`/work/${aligncv.slug}`} className="btn btn-primary">Read the AlignCV case study</Link>
              <a href={aligncv.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Visit {aligncv.liveLabel}<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className={s.spreadVisual}>
            <ProjectVisual project={aligncv} />
          </div>
        </div>
      </div>

      {/* B — Sole-developer builds: asymmetric pair */}
      <div className="wrap section">
        <div className={s.groupHead}>
          <h3 className={s.groupTitle}>Built single-handed</h3>
          <p className={s.groupNote}>
            Websites for an education consultancy and a care provider, where I was the only developer — design
            through to deployment.
          </p>
        </div>
        <div className={s.pair}>
          {[dhub, jordan].map((p, i) =>
            p ? (
              <article key={p.slug} className={i === 0 ? s.pairMain : s.pairSide}>
                <ProjectVisual project={p} />
                <div className={s.pairText}>
                  <p className={s.industry}>{p.industry}</p>
                  <h4 className={s.midName}>{p.name}</h4>
                  <p>{p.summary}</p>
                  <p className="techline">{p.team}. {p.technologies.join(", ")}</p>
                  <p className={s.links}>
                    <Link href={`/work/${p.slug}`} className="textlink">Read the {p.name} case study</Link>
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                      {p.liveLabel}<span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </article>
            ) : null,
          )}
        </div>
      </div>

      {/* C — Team platforms: index */}
      <div className={s.indexBand}>
        <div className="wrap section">
          <div className={s.groupHead}>
            <h3 className={s.groupTitle}>Commercial platforms, as part of a team</h3>
            <p className={s.groupNote}>
              Four live online casino brands on one shared platform, where I worked as a senior developer in the
              engineering team that builds and maintains it. The brands belong to their operator.
            </p>
          </div>
          {platforms && <PlatformIndex project={platforms} />}
        </div>
      </div>
    </section>
  );
}
