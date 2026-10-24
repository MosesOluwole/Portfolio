import s from "./visuals.module.css";

/** A student's route through the service: explore, apply, get support. */
export default function DhubVisual() {
  const steps = ["Explore courses", "Apply", "Get support"];
  return (
    <div className={s.dhub}>
      <div className={s.dhubBar}>
        <span className={s.dhubSearch}>Search courses and destinations</span>
        <span className={s.dhubBtn}>Search</span>
      </div>
      <div className={s.dhubCards}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={s.dhubCard}>
            <span className={s.dhubImg} />
            <span className={s.skelW} />
            <span className={s.skelS} />
          </div>
        ))}
      </div>
      <ol className={s.dhubRoute}>
        {steps.map((t, i) => (
          <li key={t}><span className={s.dhubNum}>{i + 1}</span>{t}</li>
        ))}
      </ol>
    </div>
  );
}
