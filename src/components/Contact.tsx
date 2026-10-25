import { site } from "@/content/site";
import { enquiryApiConfigured } from "@/lib/enquiry";
import EnquiryForm from "./EnquiryForm";
import s from "./Contact.module.css";

export default function Contact() {
  const mode = enquiryApiConfigured() ? "api" : site.email ? "mailto" : "none";

  return (
    <section id="contact" className={`section on-ink ${s.contact}`} aria-labelledby="contact-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.intro}>
          <h2 id="contact-title" className={s.title}>What are you trying to build?</h2>
          <p className={s.lede}>
            You don&rsquo;t need a technical specification. Tell me what&rsquo;s getting in the way, or what you&rsquo;d
            like to build, and I&rsquo;ll come back with honest thoughts on how to approach it.
          </p>
          <ul className={s.direct}>
            {site.email && (
              <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            )}
            {site.barkUrl && (
              <li><span>Bark</span><a href={site.barkUrl} target="_blank" rel="noopener noreferrer">View my Bark profile<span className="visually-hidden"> (opens in a new tab)</span></a></li>
            )}
            {site.linkedinUrl && (
              <li><span>LinkedIn</span><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">Connect on LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></a></li>
            )}
          </ul>
        </div>
        <div className={s.formCol}>
          <EnquiryForm mode={mode} email={site.email} />
        </div>
      </div>
    </section>
  );
}
