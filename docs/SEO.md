# SEO: audit, implementation and plan

Last updated 24 October 2026. Rankings can't be guaranteed; this records what
was verified, what was changed, and what still needs doing.

## 1. Audit findings (before changes)

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | Canonicals, og:url, sitemap and robots.txt all pointed at `http://localhost:3000` | Critical | Fixed: `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production domain |
| 2 | Every page inherited the home page's canonical and og:url (privacy, 404) | High | Fixed: set per page; root sets neither |
| 3 | Only one indexable page for every commercial intent (no service pages) | High | Fixed: 5 service pages |
| 4 | Home H1 didn't state role or location | Medium | Fixed: visible kicker inside the H1 |
| 5 | Service names on the home page weren't headings; six repeated "What I deliver" H3s | Medium | Fixed: names are H3s, labels H4s |
| 6 | Case-study pages had no social image | Medium | Fixed: generated per page |
| 7 | 404 page emitted both `noindex` and `index, follow`, plus a canonical to home | Medium | Fixed |
| 8 | Generic case-study titles ("X case study") | Medium | Fixed: descriptive titles and descriptions |
| 9 | Titles over ~60 and descriptions over ~160 characters | Low | Fixed: all within limits |
| 10 | Sitemap lastmod was the build time on every URL | Low | Fixed: real content dates |
| 11 | `meta keywords` tag (ignored by Google) | Low | Removed |
| 12 | Header logo accessible name didn't match visible text | Low | Fixed |
| 13 | Structured data was a single ProfessionalService | Low | Replaced with Person + WebSite + ProfessionalService graph, plus Service and BreadcrumbList |
| 14 | Casino brand links blocked (403) from the UK | Info | Note added; links marked `nofollow` |
| 15 | No conversion measurement | Medium | Optional cookieless analytics + events added |

Verified fine already: HTTPS-ready, `lang="en-GB"`, statically rendered HTML
(no JS needed to read content), no blocked resources, no cookies, no
third-party requests, permanent (308) redirects for retired URLs.

## 2. Keyword strategy and target pages

No keyword-volume or difficulty tool was available, so **no volumes are
claimed**. Targeting is based on intent and on the live results checked on
24 October 2026:

- Broad queries such as "freelance full stack developer London" are dominated
  by marketplaces (Freelancer, Twine, Arc) and job listings. An individual
  site is unlikely to outrank these soon; **being listed on them** is the
  practical way to appear for that intent.
- Service queries such as "API development services UK" show marketplaces
  (Upwork, Toptal), directories (Clutch, GoodFirms) and agency pages with
  generic copy. Specific, evidenced service pages and directory listings are
  the realistic route.

| Theme | Target page |
|---|---|
| freelance full-stack developer London / UK; freelance software developer | `/` |
| custom web application development; web application developer UK; bespoke business software | `/services/web-application-development` |
| API development services; freelance backend developer UK; Node.js / Golang / TypeScript developer | `/services/api-development` |
| MVP development for startups; build an MVP UK | `/services/mvp-development` |
| business systems integration; business automation developer | `/services/systems-integration` |
| website maintenance; bug fixing; PHP developer UK; fix existing web application | `/services/software-maintenance` |
| Brand/portfolio searches ("DHUB Education website", "AlignCV") | case studies |

Each theme has one page, to avoid pages competing. Once Search Console has a
few weeks of data, replace these hypotheses with the queries that actually
produce impressions.

## 3. Page metadata

| URL | Title | H1 |
|---|---|---|
| `/` | Moses Oluwole — Freelance Full-Stack Developer in London, UK | Freelance full-stack software engineer in London / I build the software your business runs on. |
| `/services/web-application-development` | Custom Web Application Development, UK | Custom web applications, built around how your business actually works |
| `/services/api-development` | Backend & API Development, UK | Backend systems and APIs that keep working as you grow |
| `/services/mvp-development` | MVP Development for Startups and Founders | MVP development: a first version real users can try |
| `/services/systems-integration` | Business Automation & Systems Integration | Connect your systems and stop doing the same work twice |
| `/services/software-maintenance` | Website & App Maintenance and Bug Fixing | Fixing, improving and looking after existing software |
| `/work/aligncv` | AlignCV Case Study: CV-Tailoring SaaS | AlignCV |
| `/work/dhub-education` | DHUB Education Website Case Study | DHUB Education |
| `/work/jordan-care` | Jordan Care Website Case Study | Jordan Care |
| `/work/casino-platforms` | Wildz, Wheelz, Caxino & Spinz Case Study | Commercial casino platforms |
| `/privacy` | Privacy notice | Privacy notice |

Titles get " | Moses Oluwole" appended, except on the home page. Descriptions
live in `src/content/servicePages.ts`, `src/content/projects.ts` and `site.ts`.

Per-brand casino pages were deliberately **not** created: they'd be four
near-duplicates of the same work.

## 4. Technical

- Sitemap: `/sitemap.xml` (`src/app/sitemap.ts`), canonical, indexable URLs only.
- Robots: `/robots.txt` (`src/app/robots.ts`), allows everything except `/api/`.
- Structured data (`src/lib/schema.tsx`): Person, WebSite and ProfessionalService
  on every page; Service on service pages; BreadcrumbList on service and case
  pages. Only stated facts: no address beyond "London", no ratings or reviews.
  All JSON-LD was parsed successfully in testing. **Still to do after
  deployment:** run the live URLs through Google's Rich Results Test and the
  Schema.org validator. FAQPage markup was not added, because Google no longer
  shows FAQ rich results for sites like this one.
- Social images: generated for the home page, each service page and each case
  study (`src/lib/og.tsx`).

## 5. Measured results (Lighthouse 12, mobile, simulated throttling, local production build)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 2.9 s | 0 | 0–10 ms |
| `/work/aligncv` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 0 ms |
| `/services/api-development` | 96 | 100 | 100 | 100 | 2.9 s | 0 | 0 ms |

These are **lab** numbers from a local server. They are not a Core Web Vitals
assessment, which needs real-user field data. LCP is above the 2.5 s "good"
threshold in this simulation; most of it is render delay while fonts load
under simulated 4G. Re-test with PageSpeed Insights on the deployed site.

## 6. Actions only you can do

**Before or at launch**
1. Deploy, and set `NEXT_PUBLIC_SITE_URL` to the final domain (use `https://`).
2. Google Search Console: add a **Domain** property and verify with the DNS
   TXT record at your domain registrar (no code change needed). Submit
   `https://<domain>/sitemap.xml`, then use URL Inspection → Request indexing
   for the home page and the five service pages.
3. Optional analytics: enable Web Analytics in the Vercel dashboard, then set
   `NEXT_PUBLIC_ANALYTICS=vercel` and redeploy. Page views work on the free
   plan; the custom events (`enquiry_sent`, `enquiry_email`, `email_click`,
   `bark_click`) need Vercel Pro. The privacy notice updates itself.
4. Bing Webmaster Tools: import the site from Search Console (two clicks).

**Profiles and links (highest value first)**
1. Ask DHUB Education and Jordan Care for a "Website by Moses Oluwole" footer
   link to your site. These are the most relevant links you can get.
2. LinkedIn: put the site URL in your intro and contact info, add a Services
   section, and post short write-ups of the case studies.
3. GitHub: profile README with a link to the site.
4. Bark: put the site URL on your profile.
5. Free listings with genuine details: Clutch, GoodFirms, Twine, FreeIndex.
   Don't create listings with addresses you don't have.
6. Google Business Profile: only if you meet clients in person at their
   premises or yours. Remote-only service businesses generally aren't
   eligible. Never use a virtual-office address.

## 7. Content plan (quality over volume: about one article a month)

Write from real experience; cite sources for any figures.

1. How much does it cost to build a web application in the UK? Explain what
   drives cost, link to the web-apps service, and avoid made-up price tables.
2. What should an MVP include before launch? Use the AlignCV scoping story;
   link to MVP development.
3. Custom software vs off-the-shelf: an honest decision guide; link to web apps
   and integrations.
4. When does a business need a custom API? Link to backend & API.
5. Zapier or a custom integration? Link to systems integration.
6. Taking over a website another developer built: what to check first. Link
   to maintenance.
7. How to choose a freelance software developer. Link to the process section
   and case studies.

When the first article is ready, add an `/articles` route with Article schema.
Don't build the route before there's content for it.

## 8. 90-day plan

- **Days 1–14:** deploy; set the domain; verify Search Console; submit the
  sitemap; request indexing; run PageSpeed Insights and the Rich Results Test
  on live URLs; set up the profiles and links in section 6.
- **Days 15–30:** add permitted DHUB and Jordan Care screenshots; ask both
  clients for a testimonial and a footer link; confirm that conversion events
  fire; list on Clutch and GoodFirms.
- **Days 31–60:** publish articles 1 and 2; share them on LinkedIn; answer
  relevant questions in developer communities with genuine help, not link
  drops.
- **Days 61–90:** in Search Console, find pages with impressions but low CTR
  and rewrite their titles and descriptions; see which queries actually
  appear, and adjust service-page copy to match; publish article 3; review
  which pages produce enquiries.

## 9. Main risks and opportunities

- **Risk: new domain with no links.** Expect slow movement on competitive
  terms. Links from the client sites and directories matter most early.
- **Risk: marketplaces dominate broad queries.** Use them as channels, not
  just competitors.
- **Risk: few case studies.** Screenshots and testimonials would strengthen
  them considerably.
- **Opportunity:** most competing agency pages are generic. Specific,
  evidenced pages with honest FAQs are a genuine differentiator for
  long-tail and service queries.
- **Opportunity:** your backend and live-platform experience is unusual for a
  freelance site. The API development page leans into it.
