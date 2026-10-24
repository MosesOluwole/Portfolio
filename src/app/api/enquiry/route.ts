import { NextResponse } from "next/server";
import { enquiryApiConfigured, validateEnquiry, type Enquiry } from "@/lib/enquiry";

export const runtime = "nodejs";

// Basic in-memory rate limit (per server instance). Adequate for a
// portfolio; swap for a shared store if you ever need more.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  if (!enquiryApiConfigured()) {
    return NextResponse.json(
      { error: "The enquiry form isn't connected yet. Please email directly instead." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many enquiries from this connection. Try again in a few minutes." }, { status: 429 });
  }

  let body: Partial<Enquiry> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The enquiry couldn't be read. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const e = body as Enquiry;
  const rows: [string, string][] = [
    ["Name", e.name], ["Email", e.email], ["Company", e.company || "—"], ["Project type", e.type],
    ["Budget", e.budget], ["Timeframe", e.timeframe],
  ];
  const html = `
    <h2>New project enquiry</h2>
    <table cellpadding="6">${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`).join("")}</table>
    <h3>Project description</h3>
    <p style="white-space:pre-wrap">${esc(e.description)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${e.description}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [process.env.ENQUIRY_TO_EMAIL],
        reply_to: e.email,
        subject: `Project enquiry: ${e.type} — ${e.name}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Your enquiry couldn't be sent just now. Please try again, or email directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry delivery failed", err);
    return NextResponse.json({ error: "Your enquiry couldn't be sent just now. Please try again, or email directly." }, { status: 502 });
  }
}
