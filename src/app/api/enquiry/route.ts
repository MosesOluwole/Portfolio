import { NextResponse } from "next/server";
import {
  enquiryApiConfigured, enquiryConfig, enquiryMissingConfig, MAX_BODY_BYTES, validateEnquiry, type Enquiry,
} from "@/lib/enquiry";
import { siteUrl } from "@/content/site";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/* ── Rate limiting ────────────────────────────────────────────────
   In-memory, per server instance: 5 attempts per IP per 10 minutes.
   On serverless hosting each instance has its own memory, so this slows
   casual abuse rather than guaranteeing a global limit. Pair it with the
   host's firewall rate limiting (see docs/SECURITY.md). */
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function clientIp(req: Request) {
  // Cloudflare sets cf-connecting-ip to the real client and overwrites any value a client sends.
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Browsers always send Origin on cross-site POSTs; reject anything not from this site. */
function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still subject to every other check
  try {
    const o = new URL(origin).host;
    const allowed = new Set([new URL(siteUrl).host, req.headers.get("host") ?? ""]);
    allowed.add(`www.${new URL(siteUrl).host}`);
    return allowed.has(o);
  } catch {
    return false;
  }
}

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const oneLine = (v: string) => v.replace(/[\r\n\t]+/g, " ").trim();

const FIELDS = ["name", "email", "company", "type", "budget", "timeframe", "description"] as const;

/**
 * GET → { configured, missing }. Read at runtime by the form, so connecting
 * Resend only needs the Worker's runtime settings, not a rebuild. `missing`
 * lists setting NAMES only (they're documented publicly), never values.
 */
export async function GET() {
  const missing = enquiryMissingConfig();
  return json({ configured: missing.length === 0, missing });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Requests must come from this website." }, 403);

  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ error: "Send the enquiry as JSON." }, 415);
  }

  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return json({ error: "The enquiry is too large." }, 413);

  if (rateLimited(clientIp(req))) {
    console.warn("[enquiry] rate limit reached");
    return json({ error: "Too many enquiries from this connection. Try again in a few minutes." }, 429);
  }

  if (!enquiryApiConfigured()) {
    console.warn(`[enquiry] direct delivery not configured; missing: ${enquiryMissingConfig().join(", ")}`);
    return json({ error: "The enquiry form isn't connected yet. Please email directly instead." }, 503);
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) return json({ error: "The enquiry is too large." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ error: "The enquiry couldn't be read. Refresh the page and try again." }, 400);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ error: "The enquiry couldn't be read. Refresh the page and try again." }, 400);
  }
  const body = raw as Record<string, unknown>;

  // Honeypot: real people never fill this hidden field. Respond as a success so bots don't adapt.
  if (typeof body.website === "string" && body.website.length > 0) {
    console.warn("[enquiry] honeypot triggered");
    return json({ ok: true });
  }

  // Allow-list fields and require strings; anything else is ignored.
  const e = {} as Enquiry;
  for (const f of FIELDS) {
    const v = body[f];
    if (v !== undefined && typeof v !== "string") return json({ errors: { [f]: "Invalid value." } }, 422);
    e[f] = typeof v === "string" ? v : "";
  }
  e.name = e.name.trim();
  e.email = e.email.trim();
  e.company = e.company.trim();

  const errors = validateEnquiry(e);
  if (Object.keys(errors).length) return json({ errors }, 422);

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

  const cfg = enquiryConfig();
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: cfg.from,
        to: [cfg.to],
        reply_to: e.email,
        subject: oneLine(`Project enquiry: ${e.type} — ${e.name}`).slice(0, 200),
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Log the status and Resend's error name only: bodies can echo addresses.
      let reason = "";
      try { reason = String(((await res.json()) as { name?: string }).name ?? ""); } catch { /* ignore */ }
      const hint = res.status === 401 ? " (API key invalid)" : res.status === 403 ? " (sending domain not verified, or key lacks access)" : res.status === 422 ? " (invalid from/to address)" : "";
      console.error(`[enquiry] email provider rejected the message (HTTP ${res.status}${reason ? `, ${reason}` : ""})${hint}`);
      return json({ error: "Your enquiry couldn't be sent just now. Please try again, or email directly." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error(`[enquiry] email delivery failed: ${err instanceof Error ? err.name : "unknown error"}`);
    return json({ error: "Your enquiry couldn't be sent just now. Please try again, or email directly." }, 502);
  }
}
