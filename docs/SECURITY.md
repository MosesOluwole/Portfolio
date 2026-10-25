# Security review

Reviewed 24 October 2026. Proportionate controls for a public, statically
generated portfolio with one form endpoint. No site can be guaranteed secure;
this records what was checked, changed and tested.

## Attack surface (as inspected)

- Next.js 15.5 App Router, statically generated pages, React 19.
- One server endpoint: `POST /api/enquiry` (sends email via Resend when configured).
- No database, user accounts, authentication, cookies, file uploads or admin area.
- No third-party scripts or fonts. Hosted on Cloudflare Workers via OpenNext.
- Secrets: `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`. All are
  server-only (no `NEXT_PUBLIC_` prefix), so none appear in browser bundles.

## Findings and fixes

| Priority | Finding | Fix |
|---|---|---|
| High | PostCSS advisories (GHSA-qx2v-qp2m-jg93 and related) via Next.js's pinned PostCSS 8.4.31. Build-time only; the practical risk is low because only our own CSS is processed. | `overrides` pins PostCSS ^8.5.31. `npm audit`: 0 vulnerabilities. Remove the override after upgrading to a Next.js release that bundles a fixed PostCSS. |
| Medium | No Content-Security-Policy | Enforced CSP matched to the site (all same-origin). Report-only toggle: `CSP_REPORT_ONLY=true`. |
| Medium | No HSTS | `Strict-Transport-Security: max-age=63072000` |
| Medium | API accepted any content type, unbounded bodies and non-string fields; no origin check | JSON-only (415), 32 KB body cap (413), field allow-list with string type checks (422), same-origin check for browser requests (403), 10 s timeout on the email call |
| Medium | Name and company fields allowed control characters. The subject line is built from the name, so CR/LF could reach email headers. | Control characters rejected server-side; subject also collapsed to one line |
| Low | Error logs included the provider's response body | Logs record the status code and error type only |
| Low | Rate-limit map could grow without bound; client IP taken from a spoofable header first | Map pruned; `cf-connecting-ip` (set by Cloudflare) preferred |
| Low | No COOP header; narrow Permissions-Policy | `Cross-Origin-Opener-Policy: same-origin`; Permissions-Policy extended |
| Info | API responses cacheable by default | `Cache-Control: no-store` on `/api/*` |

Already correct: secrets excluded from git (`.env*` ignored; the history scan
found no committed keys); no browser source maps served; `X-Powered-By`
removed; HTML output escapes all user input; JSON-LD escapes `<`; GET on the
API returns 405; generic error messages with no stack traces; honeypot field;
client-side validation duplicated server-side.

## Accepted risks

- **`script-src 'unsafe-inline'`.** Next.js injects inline bootstrap scripts.
  Nonces would require rendering every page per request, which loses static
  generation and the CDN. Accepted because the site renders no user-supplied
  HTML, so there is no stored or reflected XSS path for an inline script to
  exploit.
- **In-memory rate limit.** On serverless hosting each instance keeps its own
  counter, so this slows casual abuse rather than enforcing a global limit.
  For a firm limit, add a firewall rule (below) or a shared store.
- **Honeypot responds "ok".** Bots that fill the hidden field get a success
  response so they don't adapt. Real people never see this.
- **No CAPTCHA.** It isn't justified without observed abuse. Add one, such as
  Cloudflare Turnstile, only if spam gets through; it would need CSP changes.

## Tests performed (local production build)

- `npm run typecheck`, `npm run lint`, `npm run build`: pass. `npm audit`: 0
  vulnerabilities.
- API, with dummy credentials (no valid payload was sent, so no email was
  attempted):
  - cross-site Origin → 403
  - text/plain → 415
  - 40 KB declared and actual bodies → 413
  - malformed JSON and JSON array → 400
  - object in place of a string → 422
  - CRLF in name → 422; CRLF in email → 422
  - `<script>` as project type → 422
  - 5,001-character description → 422
  - honeypot → 200, logged
  - 7 requests from one IP → 5 processed, then 429, 429
  - GET → 405
- Logs: no secrets or personal data.
- Headers present on pages, plus `no-store` on the API.
- CSP: Lighthouse on `/`, a service page and a case study showed no console
  errors or CSP violations, and Best Practices, Accessibility and SEO all
  scored 100. With analytics enabled, the only errors were the local 404 for
  `/_vercel/insights/script.js`, which only exists on Vercel. That needs
  confirming after deployment.
- **Not tested:** the successful Resend send path. It needs real credentials;
  send one real enquiry after deployment.

## Manual steps (hosting and accounts): Cloudflare

1. **Secrets:** add the Resend key in the Worker's *Variables and Secrets* as a
   **Secret** (encrypted), not as plain text.
2. **workers.dev and preview URLs** are disabled in `wrangler.jsonc`;
   `http://` and `www.` are redirected by `cloudflare-worker.js`.
3. **Rate limiting:** in Security → WAF → Rate limiting rules, add one rule
   for `POST /api/enquiry`. The free plan allows one rule.
5. **Resend:** create a sending-only API key restricted to your domain, and
   verify SPF and DKIM. Rotate the key if it's ever exposed.
6. **Accounts:** 2FA on Cloudflare, GitHub, Resend and Gmail; protect the
   `main` branch.
7. **After deploying:** check the headers at securityheaders.com and send one
   real enquiry.
8. **HSTS preload (optional):** only once every subdomain serves HTTPS.

## Ongoing checklist

- Monthly: `npm audit` and `npm outdated`; apply patch releases of Next.js and
  React promptly (security fixes ship as patches).
- Before adding any third-party service: update the CSP, test with
  `CSP_REPORT_ONLY=true`, then enforce.
- Watch Workers logs (Observability) for `[enquiry] rate limit reached` and `honeypot triggered`
  spikes. If spam gets through, consider Turnstile.
- Delete old enquiries from your inbox in line with the privacy notice's
  retention periods.
- Rotate the Resend key if anyone else gains access to the Cloudflare account.
- Re-run this review after adding a database, accounts, uploads or new endpoints.
