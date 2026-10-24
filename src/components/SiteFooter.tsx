import Link from "next/link";
import { site } from "@/content/site";
import { servicePages } from "@/content/servicePages";
import s from "./SiteFooter.module.css";

const sections = [
  { id: "work", label: "Selected work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const elsewhere = [
    { label: "LinkedIn", href: site.linkedinUrl },
    { label: "GitHub", href: site.githubUrl },
    { label: "Bark", href: site.barkUrl },
  ].filter((l) => l.href);

  return (
    <footer className={`on-ink ${s.footer}`}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <p className={s.mark}>{site.wordmark}</p>
          <p className={s.desc}>
            Freelance full-stack software engineer in {site.location.split(",")[0]}, building web applications, APIs and
            business software for clients across the UK.
          </p>
        </div>
        <nav aria-label="Footer" className={s.col}>
          <h2 className={s.h}>On this site</h2>
          <ul>{sections.map((l) => <li key={l.id}><Link href={`/#${l.id}`}>{l.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Services" className={s.col}>
          <h2 className={s.h}>Services</h2>
          <ul>{servicePages.map((sp) => <li key={sp.slug}><Link href={`/services/${sp.slug}`}>{sp.name}</Link></li>)}</ul>
        </nav>
        {(site.email || elsewhere.length > 0) && (
          <div className={s.col}>
            <h2 className={s.h}>Get in touch</h2>
            <ul>
              {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<span className="visually-hidden"> (opens in a new tab)</span></a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`wrap ${s.base}`}>
        <p>&copy; {year} {site.name} <span aria-hidden="true">/</span> <Link href="/privacy">Privacy notice</Link></p>
        <p>Designed and built by {site.name.split(" ")[0]}. Products shown belong to their respective owners.</p>
      </div>
    </footer>
  );
}
