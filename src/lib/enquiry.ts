import { budgets, projectTypes, timeframes } from "@/content/enquiry";

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  timeframe: string;
  description: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the browser and the API route so both enforce the same rules. */
export function validateEnquiry(e: Partial<Enquiry>): FieldErrors {
  const errors: FieldErrors = {};
  if (!e.name?.trim()) errors.name = "Enter your name.";
  else if (e.name.length > 120) errors.name = "Keep your name under 120 characters.";
  if (!e.email?.trim()) errors.email = "Enter your email address so I can reply.";
  else if (!EMAIL.test(e.email.trim())) errors.email = "Enter an email address in the format name@example.com.";
  if ((e.company ?? "").length > 160) errors.company = "Keep this under 160 characters.";
  if (!e.type || !projectTypes.includes(e.type)) errors.type = "Choose the type of project.";
  if (!e.budget || !budgets.includes(e.budget)) errors.budget = "Choose an approximate budget, or 'Not sure yet'.";
  if (!e.timeframe || !timeframes.includes(e.timeframe)) errors.timeframe = "Choose a timeframe.";
  const d = e.description?.trim() ?? "";
  if (d.length < 20) errors.description = "Tell me a little more — a couple of sentences is plenty.";
  else if (d.length > 5000) errors.description = "Keep the description under 5,000 characters.";
  return errors;
}

/** Server-only: true when the Resend integration has everything it needs. */
export function enquiryApiConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL);
}
