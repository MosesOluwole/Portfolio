export type Service = {
  id: string;
  title: string;
  /** The business problem, in the client's words. */
  problem: string;
  deliver: string[];
  suitedTo: string;
  nextStep: string;
  /** Pre-selects the project type in the enquiry form. */
  enquiryType: string;
};

export const services: Service[] = [
  {
    id: "web-apps",
    title: "Web applications built from scratch",
    problem:
      "You need software that fits how your business actually works — a customer portal, a booking system, a dashboard — and nothing off the shelf quite does.",
    deliver: [
      "A complete web application: interface, back end, database and hosting",
      "Customer portals, dashboards and admin areas",
      "Secure sign-in and role-based access",
      "A codebase another developer can pick up later",
    ],
    suitedTo: "Businesses replacing spreadsheets or patchwork tools, and organisations with a clear process to put online.",
    nextStep: "Tell me what the software needs to do and who will use it.",
    enquiryType: "New web application",
  },
  {
    id: "backend",
    title: "Back-end systems and APIs",
    problem:
      "Your app or website needs a reliable engine behind it — business rules, data, integrations — that won't fall over as usage grows.",
    deliver: [
      "REST APIs designed around your data and your clients' needs",
      "Database design and migrations",
      "Background jobs, queues and scheduled tasks",
      "Authentication, authorisation and sensible security defaults",
    ],
    suitedTo: "Teams with a front end but no back end, and products outgrowing their first server setup.",
    nextStep: "Share what your system has to handle and what it connects to.",
    enquiryType: "Back end or API",
  },
  {
    id: "mvp",
    title: "MVPs for founders",
    problem:
      "You have an idea and need a first version real users can try — built properly enough to keep, without overbuilding before you know what works.",
    deliver: [
      "Help cutting the idea down to the smallest useful first version",
      "A working product, deployed and ready for real users",
      "Foundations that can grow if the idea does",
    ],
    suitedTo: "Founders and early-stage startups, technical or not.",
    nextStep: "Describe the idea and who it's for — a rough description is fine.",
    enquiryType: "MVP",
  },
  {
    id: "automation",
    title: "Automation and integrations",
    problem:
      "Your team copies data between systems, re-keys orders or chases the same updates by hand every week.",
    deliver: [
      "Connections between the tools you already use, through their APIs",
      "Automated workflows that replace repetitive manual steps",
      "Internal tools that pull scattered information into one place",
    ],
    suitedTo: "Small businesses and operations teams losing hours to manual admin.",
    nextStep: "List the tools involved and the job you'd like to stop doing by hand.",
    enquiryType: "Automation or integration",
  },
  {
    id: "improvements",
    title: "Fixing and improving existing software",
    problem:
      "Your current website or app is slow, buggy, hard to change, or the original developer has moved on.",
    deliver: [
      "Bug investigation and fixes",
      "Performance improvements",
      "Refactoring and modernising older code",
      "New features added to an existing product",
    ],
    suitedTo: "Anyone with software that works, mostly — and needs someone to take care of it.",
    nextStep: "Tell me what's going wrong and what the software is built with, if you know.",
    enquiryType: "Improve an existing application",
  },
  {
    id: "ongoing",
    title: "Technical advice and ongoing development",
    problem:
      "You need an experienced engineer to help make technical decisions, plan features, or join your team for a while.",
    deliver: [
      "Technical planning and architecture advice",
      "Code and system reviews",
      "Ongoing maintenance and feature work",
      "Working alongside your existing developers",
    ],
    suitedTo: "Businesses without an in-house engineer, and teams that need extra senior capacity.",
    nextStep: "Tell me about your team and where you'd like help.",
    enquiryType: "Advice or ongoing development",
  },
];
