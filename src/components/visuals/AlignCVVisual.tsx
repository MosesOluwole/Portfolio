import s from "./visuals.module.css";

const lines = [
  { text: "Maintained the order-tracking service and supported weekly releases.", ref: "Experience 1, line 2", ok: true },
  { text: "Built reporting dashboards used by the operations team.", ref: "Experience 1, line 4", ok: true },
  { text: "Led a department of 30 engineers across four countries.", ref: "Nothing on the CV supports this", ok: false },
];

export default function AlignCVVisual() {
  return (
    <div className={s.acv}>
      <div className={s.acvSource}>
        <span className={s.acvTag}>Original CV</span>
        <p>Worked on the order tracking system and helped with releases.</p>
        <p>Made dashboards for the ops team.</p>
      </div>
      <div className={s.acvArrow}>
        <svg viewBox="0 0 40 120" preserveAspectRatio="none"><path d="M2 2 H20 V118 H38" /></svg>
      </div>
      <div className={s.acvOut}>
        <div className={s.acvHead}>
          <span>Provenance check</span>
          <span>3 generated, 1 rejected</span>
        </div>
        <ul>
          {lines.map((l) => (
            <li key={l.text} className={l.ok ? s.acvOk : s.acvNo}>
              <span className={s.acvMark}>{l.ok ? "Traced" : "Rejected"}</span>
              <span className={s.acvText}>{l.text}</span>
              <span className={s.acvRef}>{l.ref}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
