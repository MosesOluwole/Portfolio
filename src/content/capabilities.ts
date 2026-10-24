/**
 * Only technologies established by real experience. Strongest first
 * within each group. Edit freely, but keep it truthful.
 */
export type CapabilityGroup = { group: string; useFor: string; items: string[] };

export const capabilities: CapabilityGroup[] = [
  {
    group: "Back end",
    useFor: "Business logic, services and the systems behind an app",
    items: ["Node.js", "NestJS", "TypeScript", "Go", "PHP", "Laravel", "Symfony", "Python", "Django"],
  },
  {
    group: "APIs and integrations",
    useFor: "Connecting your software to other software",
    items: ["REST API design", "Third-party API integration", "Event-driven messaging (Kafka)", "Background jobs and queues"],
  },
  {
    group: "Front end",
    useFor: "What your users see and use",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Responsive layouts", "Tailwind CSS"],
  },
  {
    group: "Databases",
    useFor: "Storing your data safely and finding it quickly",
    items: ["PostgreSQL", "SQL", "NoSQL databases", "Redis", "MikroORM", "TypeORM"],
  },
  {
    group: "Cloud and infrastructure",
    useFor: "Hosting and running it reliably",
    items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS API Gateway", "Production deployments"],
  },
  {
    group: "Security and quality",
    useFor: "Making sure it works, and keeps working",
    items: ["Authentication and authorisation", "Secure application design", "Automated testing", "Debugging", "Performance work", "Ongoing maintenance"],
  },
];
