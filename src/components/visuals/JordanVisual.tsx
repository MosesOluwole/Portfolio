import s from "./visuals.module.css";

/** A phone-width layout, drawn with drafting dimensions: services first, enquiry always one tap away. */
export default function JordanVisual() {
  const services = ["Home care", "Dementia care", "Autism care", "Live-in care"];
  return (
    <div className={s.jc}>
      <div className={s.jcPhone}>
        <div className={s.jcTop}><span className={s.skelS} /><span className={s.jcMenu} /></div>
        <div className={s.jcHero}><span className={s.skelW} /><span className={s.skelW} style={{ width: "60%" }} /></div>
        <ul>
          {services.map((t) => (<li key={t}>{t}<span>›</span></li>))}
        </ul>
        <div className={s.jcEnquire}>Make an enquiry</div>
      </div>
      <div className={s.jcDims}>
        <span className="anno">375 px</span>
        <span className="anno">readable at every width</span>
      </div>
    </div>
  );
}
