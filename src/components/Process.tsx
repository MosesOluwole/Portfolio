import s from "./Process.module.css";

const stages = [
  {
    n: "01",
    name: "Discover",
    text: "We talk through the business, the people who'll use the software, your goals and constraints, and what success looks like.",
    you: "A call, or a written brief if you prefer",
  },
  {
    n: "02",
    name: "Define",
    text: "We agree the scope, requirements, technical approach, deliverables and milestones — in writing, before any build starts.",
    you: "A clear proposal and price",
  },
  {
    n: "03",
    name: "Build",
    text: "I build in manageable stages, show you working progress regularly, and check each part does what it should.",
    you: "Regular updates and things you can try",
  },
  {
    n: "04",
    name: "Ship and support",
    text: "Testing, deployment and documentation, followed by an agreed handover or ongoing maintenance.",
    you: "Live software, and notes on how it works",
  },
];

export default function Process() {
  return (
    <section id="process" className="section on-ink" aria-labelledby="process-title">
      <div className="wrap">
        <div className="sectionHead">
          <p className="label">How I work</p>
          <h2 id="process-title">No surprises, start to finish.</h2>
          <p className="intro">
            The shape depends on the size of the job: a small fix might move through all four stages in a day,
            while a larger build repeats the build stage milestone by milestone.
          </p>
        </div>

        <ol className={s.track}>
          {stages.map((st) => (
            <li key={st.n} className={s.stage}>
              <div className={s.marker} aria-hidden="true"><span>{st.n}</span></div>
              <h3 className={s.name}>{st.name}</h3>
              <p className={s.text}>{st.text}</p>
              <p className={s.you}><span>You get</span>{st.you}</p>
            </li>
          ))}
        </ol>

        <div className={s.principles}>
          <p>Throughout: you always know what&rsquo;s being worked on, what it costs and what&rsquo;s next.</p>
          <p>I build for reliability and maintainability, not just how it looks on launch day.</p>
        </div>
      </div>
    </section>
  );
}
