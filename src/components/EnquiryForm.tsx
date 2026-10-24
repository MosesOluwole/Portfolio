"use client";

import { useEffect, useRef, useState } from "react";
import { budgets, projectTypes, timeframes } from "@/content/enquiry";
import { validateEnquiry, type Enquiry, type FieldErrors } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import s from "./Contact.module.css";

type Mode = "api" | "mailto" | "none";
type Status = "idle" | "sending" | "sent" | "error";

const empty: Enquiry = { name: "", email: "", company: "", type: "", budget: "", timeframe: "", description: "" };

export default function EnquiryForm({ mode, email }: { mode: Mode; email: string }) {
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onType = (ev: Event) => {
      const t = (ev as CustomEvent<string>).detail;
      if (projectTypes.includes(t)) setValues((v) => ({ ...v, type: t }));
    };
    window.addEventListener("enquiry:type", onType);
    const fromUrl = new URLSearchParams(window.location.search).get("enquiry-type");
    if (fromUrl && projectTypes.includes(fromUrl)) setValues((v) => ({ ...v, type: fromUrl }));
    return () => window.removeEventListener("enquiry:type", onType);
  }, []);

  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (mode === "mailto") {
      const body = [
        `Name: ${values.name}`, `Email: ${values.email}`, `Company: ${values.company || "—"}`,
        `Project type: ${values.type}`, `Budget: ${values.budget}`, `Timeframe: ${values.timeframe}`,
        "", values.description,
      ].join("\n");
      track("enquiry_email", { type: values.type, budget: values.budget });
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project enquiry: ${values.type}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      setMessage("Your email app should now be open with the enquiry filled in. Press send there to deliver it.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        track("enquiry_sent", { type: values.type, budget: values.budget });
        setStatus("sent");
        setMessage("Thanks — your enquiry has been sent. I'll reply to the email address you gave.");
        setValues(empty);
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Your enquiry couldn't be sent. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Your enquiry couldn't be sent — check your connection and try again.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (mode === "none") {
    return (
      <div className={s.notice} role="note">
        <p><strong>The enquiry form isn&rsquo;t connected yet.</strong></p>
        <p>
          To enable it, set an email in <code>src/content/site.ts</code> (opens the visitor&rsquo;s email app), or
          configure Resend in <code>.env.local</code> for direct delivery. See the README.
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className={s.success} ref={statusRef} tabIndex={-1} role="status">
        <p className={s.successTitle}>{mode === "api" ? "Enquiry sent." : "Nearly there."}</p>
        <p>{message}</p>
        <button type="button" className="btn btn-ghost" onClick={() => { setStatus("idle"); setMessage(""); }}>
          Write another enquiry
        </button>
      </div>
    );
  }

  const field = (k: keyof Enquiry) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const err = (k: keyof Enquiry) => errors[k] ? <p id={`e-${k}`} className={s.error}>{errors[k]}</p> : null;

  return (
    <form ref={formRef} className={s.form} onSubmit={onSubmit} noValidate aria-describedby="form-privacy">
      {status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className={s.failure}>{message}</div>
      )}

      <div className={s.row2}>
        <div className={s.field}>
          <label htmlFor="f-name">Your name</label>
          <input {...field("name")} type="text" autoComplete="name" required />
          {err("name")}
        </div>
        <div className={s.field}>
          <label htmlFor="f-email">Email address</label>
          <input {...field("email")} type="email" autoComplete="email" required />
          {err("email")}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="f-company">Company or business name <span className={s.opt}>(optional)</span></label>
        <input {...field("company")} type="text" autoComplete="organization" />
        {err("company")}
      </div>

      <div className={s.row3}>
        <div className={s.field}>
          <label htmlFor="f-type">Type of project</label>
          <select {...field("type")} required>
            <option value="" disabled>Choose one</option>
            {projectTypes.map((o) => <option key={o}>{o}</option>)}
          </select>
          {err("type")}
        </div>
        <div className={s.field}>
          <label htmlFor="f-budget">Approximate budget</label>
          <select {...field("budget")} required>
            <option value="" disabled>Choose one</option>
            {budgets.map((o) => <option key={o}>{o}</option>)}
          </select>
          {err("budget")}
        </div>
        <div className={s.field}>
          <label htmlFor="f-timeframe">Timeframe</label>
          <select {...field("timeframe")} required>
            <option value="" disabled>Choose one</option>
            {timeframes.map((o) => <option key={o}>{o}</option>)}
          </select>
          {err("timeframe")}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="f-description">What are you trying to build?</label>
        <p className={s.hint} id="hint-description">Plain English is perfect. What&rsquo;s the problem, and who is it for?</p>
        <textarea {...field("description")} rows={6} required aria-describedby={errors.description ? "e-description hint-description" : "hint-description"} />
        {err("description")}
      </div>

      {/* honeypot */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.submitRow}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending enquiry…" : mode === "api" ? "Send enquiry" : "Send enquiry by email"}
        </button>
        <p id="form-privacy" className={s.privacy}>
          Your details are only used to reply to this enquiry. They&rsquo;re never sold or added to a mailing list.
          See the <a href="/privacy">privacy notice</a>.
          {mode === "mailto" && " Pressing send opens your email app with your enquiry filled in."}
        </p>
      </div>
    </form>
  );
}
