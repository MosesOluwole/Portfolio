import { capabilities } from "@/content/capabilities";
import s from "./Capabilities.module.css";

const core = ["TypeScript", "JavaScript", "Node.js", "NestJS", "React", "Next.js", "AWS", "REST APIs", "SQL databases", "PHP", "Python and Django"];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section" aria-labelledby="cap-title">
      <div className="wrap">
        <div className="sectionHead">
          <p className="label">Technical capabilities</p>
          <h2 id="cap-title">The specification.</h2>
          <p className="intro">For the technically minded, or anyone checking I can work with what you already have.</p>
        </div>

        <p className={s.core}>
          <span className="visually-hidden">Strongest technologies: {core.join(", ")}</span>
          {core.map((c, i) => (
            <span key={c} className={s.item} aria-hidden="true">
              {c}{i < core.length - 1 ? <span className={s.sep}>/</span> : null}
            </span>
          ))}
        </p>

        <table className={s.sheet}>
          <caption className="visually-hidden">Technologies grouped by area</caption>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">What it&rsquo;s for</th><th scope="col">Technologies</th></tr>
          </thead>
          <tbody>
            {capabilities.map((g) => (
              <tr key={g.group}>
                <th scope="row">{g.group}</th>
                <td className={s.use}>{g.useFor}</td>
                <td>{g.items.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
