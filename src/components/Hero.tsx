import { site } from "@/content/site";
import SystemDiagram from "./SystemDiagram";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={`wrap ${s.inner}`}>
        <p className={s.status}>
          <span className={s.dot} aria-hidden="true" />
          {site.availability}
        </p>

        <h1 id="hero-title" className={s.title}>
          <span className={s.kicker}>Freelance full-stack software engineer in London</span>
          <span className={s.line}><span>I build the software</span></span>
          <span className={s.line}><span>your business</span></span>
          <span className={s.line}><span>runs on.</span></span>
        </h1>

        <div className={s.copy}>
          <p className={s.lede}>
            Custom web applications, APIs, MVPs and integrations for UK businesses, founders and teams.
          </p>
          <p className={s.body}>
            {site.yearsExperience}+ years of engineering, from sole-developer builds to live commercial platforms.
            I take a project from the first conversation to software that keeps working long after launch.
          </p>
          <div className={s.ctas}>
            <a href="#work" className="btn btn-ghost">View selected work</a>
            <a href="#contact" className="btn btn-primary">Discuss a project</a>
          </div>
        </div>

        <div className={s.diagram}>
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}
