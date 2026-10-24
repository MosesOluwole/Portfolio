import { services } from "@/content/services";
import EnquiryLink from "./EnquiryLink";
import s from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.aside}>
          <p className={s.label}>Services</p>
          <h2 id="services-title" className={s.title}>What you can hire me for.</h2>
          <p className={s.intro}>
            Most projects start with a problem rather than a technology. Open any of these to see what it involves
            and who it suits.
          </p>
          <p className={s.unsure}>
            Not sure which one fits? <a href="#contact" className="textlink">Describe the problem instead</a>.
          </p>
        </div>

        <div className={s.list}>
          {services.map((sv, i) => (
            <details key={sv.id} className={s.item} open={i === 0}>
              <summary className={s.summary}>
                <span className={s.itemTitle}>{sv.title}</span>
                <span className={s.toggle} aria-hidden="true" />
              </summary>
              <div className={s.body}>
                <p className={s.problem}>{sv.problem}</p>
                <div className={s.cols}>
                  <div>
                    <h3 className={s.h}>What I deliver</h3>
                    <ul className={s.deliver}>
                      {sv.deliver.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className={s.h}>Suited to</h3>
                    <p>{sv.suitedTo}</p>
                    <h3 className={s.h} style={{ marginTop: "1.25rem" }}>Next step</h3>
                    <p>
                      {sv.nextStep}{" "}
                      <EnquiryLink type={sv.enquiryType} className="textlink">Start an enquiry</EnquiryLink>
                    </p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
