# Development notes

Next.js 15 (App Router) + TypeScript + CSS Modules. No UI or animation
libraries: motion is CSS, interactivity is a few small client components.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck + lint + production build
npm run build && npm start
```

Requires Node 20.11+.

## Fill in your details (one place)

| What | Where |
| --- | --- |
| Email, Bark, LinkedIn, GitHub, availability, photo | `src/content/site.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Services | `src/content/services.ts` |
| Technologies | `src/content/capabilities.ts` |
| Budget / timeframe / project-type options | `src/content/enquiry.ts` |
| Testimonials (section hidden while empty) | `src/content/testimonials.ts` |
| Track record and delivery principles | `src/components/Delivery.tsx` |

Empty values are hidden, never rendered as broken links. In `npm run dev`
a banner lists anything still missing, and case-study pages show
"To be added" notes for `null` fields. Neither appears in production.

### Still to supply

- `email`, `barkUrl`, `linkedinUrl`, `githubUrl` in `site.ts`
- For DHUB Education, Jordan Care and the four gaming platforms:
  `challenge`, `approach` and (only with evidence) `outcome` in `projects.ts`
- Optional: a professional photo (`site.photo`), permitted screenshots
  (`/public/work/*.webp` + `screenshot` per project), real testimonials
- Check the sportsbook paragraph in `Delivery.tsx` is worded as you want

## Enquiry form

The form works in one of three honest modes, chosen automatically:

1. **Direct delivery (recommended)** — when `RESEND_API_KEY`,
   `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL` are set, submissions POST to
   `/api/enquiry` and are emailed to you via Resend (reply-to is the
   visitor). Includes server-side validation, a honeypot and a basic rate limit.
2. **Email app** — with only `site.email` set, submitting opens the
   visitor's email app with the enquiry pre-filled. The UI says so.
3. **Not connected** — with neither, the form is replaced by a notice.
   It never pretends to send.

To enable Resend: create an account at resend.com, verify your domain,
create an API key, then copy `.env.example` to `.env.local` (or set the
variables in your host) and fill in the three values. Rebuild after
changing them — the mode is decided at build time.

## SEO

See `docs/SEO.md` for the audit, keyword-to-page map, metadata, test
results, launch checklist and 90-day plan. Service pages live in
`src/content/servicePages.ts`.

## Security

See `docs/SECURITY.md` for the review, accepted risks, tests and the
manual hosting steps (production-only secrets, firewall rule, 2FA).

## Deploy (Cloudflare Workers, via OpenNext)

The site runs on Cloudflare Workers through the OpenNext adapter
(`wrangler.jsonc`, `open-next.config.ts`). `cloudflare-worker.js` is the entry
point: it redirects `http://` and `www.` to `https://mosesoluwole.com`, then
hands every other request to the Next.js worker. `wrangler.jsonc` attaches
both domains to the Worker and turns off the `workers.dev` address and
preview URLs, so none of this depends on dashboard settings.

Note: `npm run preview` emulates the production domain, so on localhost every
page redirects to `https://mosesoluwole.com`. For local testing, use
`npm run dev`, or run `wrangler dev` with a copy of `wrangler.jsonc` that has no
`routes`.

```bash
npm run preview   # build and run locally in the Workers runtime (http://localhost:8787)
npm run deploy    # build and deploy (after `npx wrangler login`)
```

Git-connected deploys (Workers Builds) use:
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Build variable: `NODE_VERSION=22`

The canonical domain defaults to `https://mosesoluwole.com` (`src/content/site.ts`);
set `NEXT_PUBLIC_SITE_URL` only to override it.

Enquiry form (Resend): add `RESEND_API_KEY` (as a secret), `ENQUIRY_TO_EMAIL`
and `ENQUIRY_FROM_EMAIL` in the Worker's **Settings → Variables and Secrets**.
No rebuild is needed: the form calls `GET /api/enquiry` when the page loads,
and switches to direct sending once those are set. The privacy notice is
rendered per request, so it updates too.

For local preview of the API, put them in `.dev.vars` (git-ignored).

`@vercel/analytics` is installed but stays off unless `NEXT_PUBLIC_ANALYTICS=vercel`.
Leave it unset on Cloudflare.

## Notes

- Project visuals are original illustrations and are labelled as such on
  the page. No third-party screenshots or brand assets are included.
- Analytics are not installed. If you add them, prefer a cookieless option
  (e.g. Vercel Web Analytics or Plausible) to avoid needing a consent banner.
- `src/app/opengraph-image.tsx` generates the social sharing image;
  `src/app/icon.svg` is the favicon.
