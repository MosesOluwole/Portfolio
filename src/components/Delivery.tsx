import { testimonials } from "@/content/testimonials";
import s from "./Delivery.module.css";

/**
 * Credibility from verified facts only. Edit `record` and `practices`
 * freely — but keep every line something you can stand behind.
 */
const record = [
  { what: "Years of professional software engineering", detail: "7+" },
  { what: "Live business websites built as sole developer", detail: "DHUB Education, Jordan Care" },
  { what: "Live commercial platforms, senior engineering team", detail: "Wildz, Wheelz, Caxino, Spinz" },
  { what: "Independent product designed, built and run", detail: "AlignCV, in private beta" },
];

const practices = [
  { title: "Scope in writing first", text: "Before any build starts, we agree what's included, what isn't, and what it costs." },
  { title: "Honest estimates", text: "If I'm unsure how long something will take, I'll say so, and explain why." },
  { title: "Progress you can see", text: "Regular updates and working software to try, rather than silence until a deadline." },
  { title: "Built to be handed over", text: "Readable code and documentation, so you're never dependent on one person — including me." },
];

export default function Delivery() {
  return (
    <section id="credibility" className="section" aria-labelledby="delivery-title">
      <div className="wrap">
        <div className="sectionHead">
          <p className="label">Track record</p>
          <h2 id="delivery-title">What you can count on.</h2>
        </div>

        <div className={s.grid}>
          <div className={s.record}>
            <h3 className={s.h3}>The record</h3>
            <dl>
              {record.map((r) => (
                <div key={r.what} className={s.row}>
                  <dt>{r.what}</dt>
                  <dd>{r.detail}</dd>
                </div>
              ))}
            </dl>
            <p className={s.sportsbook}>
              Earlier in my career I worked as an engineer on a sportsbook product that reportedly achieved around
              €5 million in turnover in its first quarter. That was a result for the whole business and team; my part
              was the engineering.
            </p>
          </div>

          <div className={s.practices}>
            <h3 className={s.h3}>How I approach delivery</h3>
            <ul>
              {practices.map((p) => (
                <li key={p.title}>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className={s.testimonials} aria-labelledby="testimonials-title">
            <h3 id="testimonials-title" className={s.h3}>What clients say</h3>
            <ul>
              {testimonials.map((t) => (
                <li key={t.name}>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <p className={s.cite}>
                    {t.name}
                    {t.role || t.company ? <span>{[t.role, t.company].filter(Boolean).join(", ")}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
