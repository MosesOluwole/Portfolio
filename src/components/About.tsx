import Image from "next/image";
import { site } from "@/content/site";
import s from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${s.about}`} aria-labelledby="about-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.head}>
          <p className={s.label}>About</p>
          <h2 id="about-title" className={s.title}>Hello, I&rsquo;m Moses.</h2>
        </div>

        <div className={s.text}>
          <p className={s.lead}>
            I&rsquo;m a full-stack software engineer in London, and I&rsquo;ve spent more than {site.yearsExperience}{" "}
            years building and looking after software that real businesses depend on.
          </p>
          <p>
            That&rsquo;s ranged from websites I&rsquo;ve built single-handed, to commercial platforms in production
            where I worked in a senior engineering team, to AlignCV, a product I designed, built and run myself.
          </p>
          <p>
            I&rsquo;m strongest on the back end: the APIs, data and business rules everything else relies on. But I
            deliver whole products, interface included, and I care about the parts clients rarely see — whether the
            software solves the actual problem, whether the next developer can understand it, and whether it can grow
            with the business.
          </p>
          <p>
            I&rsquo;ll tell you plainly what something will take. And if something isn&rsquo;t worth building,
            I&rsquo;ll tell you that too.
          </p>
        </div>

        <aside className={s.card} aria-label="At a glance">
          {site.photo ? (
            <Image src={site.photo} alt={site.photoAlt} width={600} height={750} className={s.photo} sizes="(max-width: 860px) 100vw, 30vw" />
          ) : (
            <div className={s.monogram} aria-hidden="true">{site.monogram}</div>
          )}
          <dl className={s.facts}>
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Experience</dt><dd>{site.yearsExperience}+ years</dd></div>
            <div><dt>Strongest at</dt><dd>Back-end engineering and complete full-stack products</dd></div>
            <div><dt>Right now</dt><dd>{site.availability}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
