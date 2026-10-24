import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { enquiryApiConfigured } from "@/lib/enquiry";
import s from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name} handles personal information sent through this website.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy notice", description: `How ${site.name} handles personal information sent through this website.` },
};

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function Privacy() {
  const p = site.privacy;
  const usesResend = enquiryApiConfigured();
  const contact = site.email ? (
    <a href={`mailto:${site.email}`} className="textlink">{site.email}</a>
  ) : (
    "the contact details on this website"
  );

  return (
    <article className={s.page}>
      <header className={`wrap ${s.head}`}>
        <h1 className={s.title}>Privacy notice</h1>
        <p className={s.lede}>
          This explains what happens to the information you send me through this website. The short version: I use
          it to reply to you and talk about your project, nothing else. There are no cookies, no analytics and no
          tracking on this site.
        </p>
        <p className={s.updated}>Last updated {fmt(p.lastUpdated)}</p>
      </header>

      <div className={`wrap ${s.body}`}>
        <section className={s.block} aria-labelledby="who">
          <h2 id="who">Who I am</h2>
          <div>
            <p>
              This website belongs to {site.name}, a freelance software engineer based in {site.location}. I&rsquo;m
              the data controller for personal information collected through it, which means I decide how it&rsquo;s
              used and I&rsquo;m responsible for looking after it. You can contact me about anything in this notice
              at {contact}.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="what">
          <h2 id="what">What I collect</h2>
          <div>
            <p>When you send an enquiry, I receive what you enter in the form:</p>
            <ul className={s.list}>
              <li>your name and email address</li>
              <li>your company or business name, if you give one</li>
              <li>the type of project, approximate budget and timeframe you choose</li>
              <li>your description of the project, and anything else you decide to include</li>
            </ul>
            <p>
              If you email me directly, I receive your email address and whatever you write. Please don&rsquo;t send
              passwords, payment details or other sensitive information through the form or by email.
            </p>
            <p>
              Like almost every website, the servers that host this site keep short-lived technical logs — such as
              IP addresses, browser type and the time of each request — to keep the site running and secure. To
              stop the enquiry form being abused, your IP address is also held in memory for up to ten minutes
              when you submit it.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="why">
          <h2 id="why">How I use it, and why I&rsquo;m allowed to</h2>
          <div>
            <p>I use your information to:</p>
            <ul className={s.list}>
              <li>reply to your enquiry and discuss your project</li>
              <li>prepare a proposal or quote if you ask for one</li>
              <li>carry out and manage the work, if you become a client</li>
              <li>keep the records I&rsquo;m legally required to keep, such as for tax</li>
            </ul>
            <p>
              Under UK data protection law, my legal basis for replying to and quoting for your enquiry is that you
              have asked me to take these steps before we enter into a contract. For keeping the website secure and
              following up on a conversation you started, the basis is my legitimate interest in running my
              business. For tax and accounting records, it&rsquo;s a legal obligation.
            </p>
            <p>
              I won&rsquo;t sell your information, add you to a mailing list or send you marketing.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="who-sees">
          <h2 id="who-sees">Who else handles it</h2>
          <div>
            <p>I use a small number of service providers, who process information only on my behalf:</p>
            <ul className={s.list}>
              <li><strong>{p.hostingProvider}</strong> hosts this website and its technical logs.</li>
              <li><strong>{p.emailProvider}</strong> provides the inbox where enquiries arrive.</li>
              {usesResend && (
                <li><strong>Resend</strong> delivers enquiry form submissions to my inbox by email.</li>
              )}
            </ul>
            {!usesResend && (
              <p>
                Submitting the enquiry form opens your own email app, so your message is sent by your email provider
                to my inbox, just like any other email.
              </p>
            )}
            <p>
              Some of these providers may process information outside the UK. Where they do, they rely on
              safeguards recognised under UK law, such as the UK–US data bridge or standard contractual clauses.
            </p>
            <p>
              I&rsquo;ll only share your information with anyone else if the law requires it, or with your
              agreement.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="how-long">
          <h2 id="how-long">How long I keep it</h2>
          <div>
            <p>
              If your enquiry doesn&rsquo;t lead to work together, I delete it within {p.enquiryRetention}. If you
              become a client, I keep project correspondence and records for as long as we&rsquo;re working together,
              and business and tax records for {p.clientRetention} after the project ends, as UK law requires.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="cookies">
          <h2 id="cookies">Cookies</h2>
          <div>
            <p>
              This site doesn&rsquo;t use cookies, doesn&rsquo;t store anything else on your device, and doesn&rsquo;t
              load fonts, scripts or trackers from other companies. That&rsquo;s why you haven&rsquo;t seen a cookie
              banner. If that ever changes, this notice will be updated first.
            </p>
            <p>
              Links to live projects take you to other websites, which have their own privacy policies.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="rights">
          <h2 id="rights">Your rights</h2>
          <div>
            <p>You have the right to ask me to:</p>
            <ul className={s.list}>
              <li>give you a copy of the information I hold about you</li>
              <li>correct anything that&rsquo;s wrong</li>
              <li>delete your information</li>
              <li>stop or limit how I use it, or object to my using it</li>
              <li>give you your information in a format you can take elsewhere</li>
            </ul>
            <p>
              To do any of these, contact me at {contact}. I&rsquo;ll respond within one month. Some rights have
              exceptions — for example, I may need to keep tax records — and if one applies, I&rsquo;ll explain why.
            </p>
          </div>
        </section>

        <section className={s.block} aria-labelledby="complaints">
          <h2 id="complaints">Complaints</h2>
          <div>
            <p>
              If you&rsquo;re unhappy with how I&rsquo;ve handled your information, please tell me first at {contact}{" "}
              so I can put it right. You also have the right to complain to the Information Commissioner&rsquo;s Office
              (ICO), the UK&rsquo;s data protection regulator, at{" "}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="textlink">
                ico.org.uk<span className="visually-hidden"> (opens in a new tab)</span>
              </a>{" "}
              or on 0303 123 1113.
            </p>
          </div>
        </section>

        <p className={s.back}><Link href="/" className="btn btn-ghost">Back to the home page</Link></p>
      </div>
    </article>
  );
}
