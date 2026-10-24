/**
 * SERVICE PAGES (/services/<slug>)
 *
 * One page per distinct hiring intent, so pages don't compete with each
 * other in search. Evidence must point at real case studies; FAQs answer
 * real questions honestly. No prices, guarantees or invented results.
 */

export type ServicePage = {
  slug: string;
  /** id of the matching entry in services.ts (pre-selects the enquiry type) */
  serviceId: string;
  /** Short name for links and breadcrumbs */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  /** Situations people recognise themselves in */
  signs: string[];
  includes: { title: string; text: string }[];
  evidence: { project: string; text: string }[];
  technologies: string;
  faqs: { q: string; a: string }[];
  related: string[];
  /** ISO date the content last changed (used in the sitemap) */
  updated: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-application-development",
    serviceId: "web-apps",
    name: "Custom web application development",
    metaTitle: "Custom Web Application Development for UK Businesses",
    metaDescription:
      "Bespoke web applications built around how your business works: customer portals, booking and application systems, dashboards and admin areas. Freelance developer in London.",
    h1: "Custom web applications, built around how your business actually works",
    intro: [
      "Off-the-shelf software is built for the average business. If yours has a process that doesn't quite fit — the way you take bookings, handle applications, manage customers or report on your numbers — a custom web application can do exactly what you need, and nothing you don't.",
      "I design and build complete web applications: the screens people use, the back end and database behind them, and the hosting they run on. You deal with one engineer from the first conversation to launch, and the result is software you own and that another developer can pick up later.",
    ],
    signs: [
      "Your team runs a core part of the business from spreadsheets, email threads or paper forms",
      "You've tried off-the-shelf tools and keep working around what they can't do",
      "Customers or applicants need to submit information online, and staff need somewhere to manage it",
      "You need an admin area so non-technical staff can update content themselves",
    ],
    includes: [
      { title: "Customer-facing applications", text: "Portals, registration and application forms, booking or request flows, and account areas for your customers." },
      { title: "Internal tools and dashboards", text: "Admin areas, content management and dashboards that bring the information your team needs into one place." },
      { title: "Secure sign-in and permissions", text: "Accounts, roles and access control, so each person sees and changes only what they should." },
      { title: "Notifications and integrations", text: "Email notifications when something needs attention, and connections to the tools you already use." },
      { title: "Responsive by default", text: "Layouts that work properly on phones, tablets and desktops, because your users will arrive on all three." },
      { title: "Deployment and handover", text: "Hosting set up, the application deployed, and documentation so you're never dependent on one person." },
    ],
    evidence: [
      { project: "dhub-education", text: "An education consultancy's first website, with course pages, student registration and application forms, enquiries and a content management area — built single-handed in PHP." },
      { project: "jordan-care", text: "A care provider's website with service pages, enquiry and appointment request forms, email notifications and an admin area for staff." },
      { project: "aligncv", text: "A complete web product I designed and built myself: sign-in, document upload and parsing, background processing, generated downloads and an admin area." },
    ],
    technologies: "TypeScript, React, Next.js, Node.js, NestJS, PHP, Laravel, Symfony, Python, Django, PostgreSQL and other SQL databases, AWS.",
    faqs: [
      { q: "How much does a custom web application cost?", a: "It depends almost entirely on scope: how many types of user, how many screens and workflows, and what it has to connect to. A focused tool can be a modest project; a multi-role platform is a larger one. After an initial conversation I agree the scope with you in writing and give you a fixed price for it, so you know the cost before any build starts." },
      { q: "How long does it take?", a: "Smaller applications can take a few weeks; larger ones are delivered in milestones over a few months. I'll give you a realistic timeline with the proposal, and you'll see working software at each milestone rather than waiting until the end." },
      { q: "Will I own the code?", a: "Yes. Once the project is paid for, the code is yours. I write it to be readable and documented, so you can bring in another developer later if you want to." },
      { q: "Can you work with an existing design or brand?", a: "Yes. I can build from designs you already have, work alongside your designer, or keep the interface simple and consistent with your existing brand." },
    ],
    related: ["api-development", "mvp-development"],
    updated: "2026-10-24",
  },
  {
    slug: "api-development",
    serviceId: "backend",
    name: "Backend and API development",
    metaTitle: "Backend & API Development — Freelance Backend Developer, UK",
    metaDescription:
      "REST APIs, backend services, databases and background jobs designed to be reliable and easy to extend. Freelance backend developer in London with Node.js, NestJS, Go and PHP experience.",
    h1: "Backend systems and APIs that keep working as you grow",
    intro: [
      "The back end is the part of your software nobody sees and everybody depends on: the business rules, the data, and the APIs that your website, app and other systems talk to. When it's designed well, adding features is straightforward. When it isn't, every change becomes slow and risky.",
      "Backend engineering is where I'm strongest. I design and build APIs and server-side systems with clear structure, sensible data models and the unglamorous details — validation, error handling, security and background processing — done properly from the start.",
    ],
    signs: [
      "You have a front end or mobile app, and need the API and database behind it",
      "Your current back end struggles under load, or each change breaks something else",
      "Slow tasks like processing files or sending emails are holding up your users",
      "You need a reliable API for partners or other systems to connect to",
    ],
    includes: [
      { title: "REST API design and build", text: "APIs designed around your data and the clients that use them, with validation, consistent errors and documentation." },
      { title: "Data modelling and databases", text: "Database design, migrations and queries that stay fast as data grows — usually PostgreSQL." },
      { title: "Background jobs and queues", text: "Moving slow work — file processing, document generation, notifications — out of the request, so your app stays responsive." },
      { title: "Authentication and security", text: "Sign-in, role-based permissions, encrypted secrets and sensible defaults against common attacks." },
      { title: "Third-party integrations", text: "Connecting your system to payment providers, email services, CRMs and other APIs, with retries and error handling." },
      { title: "Cloud deployment", text: "Deployment to AWS or another host, with file storage, configuration and environments set up properly." },
    ],
    evidence: [
      { project: "aligncv", text: "A NestJS API with PostgreSQL, organised into modules for auth, CVs, matching, tailoring, documents, quotas and audit logging, with long-running work on Redis and BullMQ background jobs and files in S3." },
      { project: "casino-platforms", text: "Backend services and API integrations on a shared platform running four live brands, built in Go and Node.js on AWS as part of a senior engineering team." },
      { project: "dhub-education", text: "A PHP back end with database-backed content, form processing and email notifications for student applications and enquiries." },
    ],
    technologies: "Node.js, NestJS, TypeScript, Go, PHP (Laravel, Symfony), Python and Django, PostgreSQL, Redis, BullMQ, Kafka, MikroORM, TypeORM, AWS (EC2, S3, Lambda, API Gateway).",
    faqs: [
      { q: "Do you only build the back end, or the front end too?", a: "Both. I'm happy to build just the API for your existing front end or mobile app, or to deliver the whole application. Backend work is my strongest area." },
      { q: "Can you work on a back end someone else built?", a: "Yes. I'll start by reading the code and understanding how it works, then agree with you what to fix or extend. Some of my most useful work has been inside existing production systems." },
      { q: "Which language or framework will you use?", a: "Usually TypeScript with Node.js and NestJS for new projects, because it's productive and widely supported. If you already have a PHP, Go or Python system, or a team that works in one, I'll work in that instead." },
      { q: "Will the API be documented?", a: "Yes. You'll get documentation for the endpoints and for running and deploying the system, so other developers can work with it." },
    ],
    related: ["systems-integration", "web-application-development"],
    updated: "2026-10-24",
  },
  {
    slug: "mvp-development",
    serviceId: "mvp",
    name: "MVP development for startups",
    metaTitle: "MVP Development for Startups and Founders — UK Freelance Developer",
    metaDescription:
      "Turn your idea into a working first version real users can try. Help scoping the smallest useful MVP, then a properly built product that can grow. Freelance developer in London.",
    h1: "MVP development: a first version real users can try",
    intro: [
      "The point of a minimum viable product is to learn whether your idea works, as quickly and cheaply as you responsibly can. That means building the smallest version that delivers real value — and building it well enough that you can keep it if the idea takes off, rather than starting again.",
      "I've done this for myself: AlignCV went from an idea to a product in private beta that I designed, built and run on my own. I bring the same approach to founders' products, technical or not.",
    ],
    signs: [
      "You have an idea and want to test it with real users before raising money or spending more",
      "You're not technical and need someone to turn the idea into working software",
      "You have a prototype or no-code version that's hitting its limits",
      "You need to show investors or early customers something that works",
    ],
    includes: [
      { title: "Scoping the first version", text: "Working out with you which features prove the idea, and which can wait. This is often the most valuable part." },
      { title: "A working, deployed product", text: "A real application on a real domain, ready for users — not a clickable mock-up." },
      { title: "Foundations that can grow", text: "Sensible architecture, data model and code structure, so success doesn't mean a rewrite." },
      { title: "The essentials, done properly", text: "Sign-in, security, sensible error handling and the admin tools you'll need to support early users." },
      { title: "Iteration after launch", text: "Changes based on what you learn from users, if you want to keep working together." },
    ],
    evidence: [
      { project: "aligncv", text: "An independent product taken from concept to private beta single-handed: product design, CV parsing, a structured match engine, AI-assisted tailoring with a provenance check, and DOCX and PDF generation." },
      { project: "dhub-education", text: "A first website for an organisation that had none, delivered end to end — from the first build to production." },
    ],
    technologies: "TypeScript, Next.js, React, Node.js, NestJS, PostgreSQL, Redis, AWS. I choose mainstream, well-supported tools so you can hire for them later.",
    faqs: [
      { q: "I'm not technical. Is that a problem?", a: "Not at all. I'll explain decisions in plain English and ask about your users and business, not your technology preferences. You need to know what problem you're solving and for whom; I'll handle the rest." },
      { q: "How small should an MVP be?", a: "Small enough to build and launch quickly, big enough that someone would genuinely use it. In practice that usually means one core workflow done well, plus sign-in and the basics. We'll decide together during scoping." },
      { q: "What happens after the MVP?", a: "You'll own the code and have documentation. You can carry on working with me, bring in your own team, or hire developers — the codebase is built to make any of those straightforward." },
      { q: "Can you sign an NDA?", a: "Yes, I'm happy to sign a reasonable NDA before you share the details of your idea." },
    ],
    related: ["web-application-development", "api-development"],
    updated: "2026-10-24",
  },
  {
    slug: "systems-integration",
    serviceId: "automation",
    name: "Business automation and systems integration",
    metaTitle: "Business Automation & Systems Integration — Freelance Developer UK",
    metaDescription:
      "Connect the software your business already uses and automate the repetitive work between it. API integrations, automated workflows and notifications by a London-based developer.",
    h1: "Connect your systems and stop doing the same work twice",
    intro: [
      "Most businesses don't need more software. They need the software they already have to talk to each other. When your website, CRM, accounting tool and spreadsheets don't share data, people end up copying it between them by hand — slowly, and with mistakes.",
      "I build the connections between systems using their APIs, and automate the workflows that currently depend on someone remembering to do something. The aim is simple: enter information once, and have it appear everywhere it's needed.",
    ],
    signs: [
      "Someone re-types orders, enquiries or customer details from one system into another",
      "Important updates only happen when a person remembers to send them",
      "Reports take hours because the data lives in several places",
      "A form on your website just sends an email, and someone has to act on it manually",
    ],
    includes: [
      { title: "API integrations", text: "Connecting your systems to each other and to third-party services such as payment providers, CRMs and email platforms." },
      { title: "Automated workflows", text: "Background processes that move data, trigger actions and run on a schedule without anyone pressing a button." },
      { title: "Notifications", text: "The right person told at the right time — by email or another channel — when something needs attention." },
      { title: "Internal tools", text: "A simple dashboard or admin area that pulls scattered information into one place." },
      { title: "Reliability built in", text: "Retries, logging and alerts, so when a third-party service has a bad day, nothing is silently lost." },
    ],
    evidence: [
      { project: "casino-platforms", text: "Built a content translation workflow inside an existing shared platform so brand content is translated automatically, and integrated the sportsbook into the landing page — as part of the senior engineering team." },
      { project: "aligncv", text: "Background job pipelines that parse uploaded documents and generate files automatically, with external AI provider integration." },
      { project: "jordan-care", text: "Enquiries and appointment requests processed, stored and sent to staff as email notifications, so no request depends on someone checking a form." },
    ],
    technologies: "Node.js, TypeScript, Go, PHP, Python, REST APIs, webhooks, background jobs and queues (BullMQ, Kafka), Redis, AWS Lambda.",
    faqs: [
      { q: "Can you connect any two systems?", a: "If both offer an API or a reliable way to import and export data, usually yes. I'll check the systems you use before quoting, and tell you honestly if something isn't feasible or would cost more than it saves." },
      { q: "Is a custom integration better than a tool like Zapier?", a: "Not always. For simple, low-volume tasks a no-code tool can be the right answer, and I'll say so. Custom integrations make sense when the logic is complex, volumes are high, reliability matters, or the per-task fees add up." },
      { q: "What happens if one of the services changes or goes down?", a: "I build integrations to retry, log failures and alert someone rather than fail silently. If a provider changes their API, the integration is documented so it can be updated quickly." },
    ],
    related: ["api-development", "software-maintenance"],
    updated: "2026-10-24",
  },
  {
    slug: "software-maintenance",
    serviceId: "improvements",
    name: "Software maintenance and bug fixing",
    metaTitle: "Website & Application Maintenance, Bug Fixing and Improvements — UK",
    metaDescription:
      "Fix bugs, speed up slow pages and extend existing websites and web applications — including ones another developer built. Experienced freelance engineer in London.",
    h1: "Fixing, improving and looking after existing software",
    intro: [
      "Plenty of businesses have software that mostly works, but is slow, has bugs nobody has got round to fixing, or is hard to change because the original developer has moved on. Starting again is rarely the answer. Understanding what's there and improving it usually is.",
      "I'm comfortable working inside existing codebases, including production systems with live users. I'll find out how your software works, fix what's broken, and leave the code easier for the next person to change.",
    ],
    signs: [
      "There are known bugs that keep being put off",
      "Pages are slow, or the site struggles when traffic picks up",
      "Your original developer is no longer available, and nobody understands the code",
      "You want new features added to software you already have",
    ],
    includes: [
      { title: "Bug investigation and fixes", text: "Reproducing the problem, finding the root cause and fixing it properly, not just the symptom." },
      { title: "Performance improvements", text: "Finding what makes pages or requests slow — queries, assets, code — and fixing the biggest causes first." },
      { title: "Refactoring and modernising", text: "Improving older code and dependencies step by step, so changes become safer and faster." },
      { title: "New features", text: "Extending your existing product in a way that fits how it's already built." },
      { title: "Ongoing maintenance", text: "Updates, security patches and a dependable person to call when something goes wrong." },
    ],
    evidence: [
      { project: "casino-platforms", text: "Troubleshooting, production fixes, performance and reliability improvements on live platforms serving real players, where a change for one brand can affect four." },
      { project: "jordan-care", text: "A care provider's website built, tested and deployed end to end, with an admin area so content stays current." },
    ],
    technologies: "JavaScript and TypeScript (React, Next.js, Node.js), PHP (Laravel, Symfony), Go, Python and Django, SQL databases, AWS and shared hosting.",
    faqs: [
      { q: "Will you work on code another developer wrote?", a: "Yes — that's a large part of this service. I'll start with a short review to understand the codebase and its risks, then agree priorities with you." },
      { q: "My site is built in PHP. Can you help?", a: "Yes. I've built and maintained PHP websites and applications, alongside JavaScript, TypeScript, Go and Python systems." },
      { q: "Do you offer ongoing support?", a: "Yes. After an initial fix or improvement project, we can agree an ongoing arrangement for updates, security patches and new work." },
      { q: "How do you price bug fixes?", a: "For well-defined fixes I can quote a fixed price. For problems that need investigation first, I'll agree a short, capped investigation, then quote the fix once the cause is known." },
    ],
    related: ["systems-integration", "web-application-development"],
    updated: "2026-10-24",
  },
];

export const getServicePage = (slug: string) => servicePages.find((p) => p.slug === slug);
export const servicePageFor = (serviceId: string) => servicePages.find((p) => p.serviceId === serviceId);
