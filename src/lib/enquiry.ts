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
/** Control characters (incl. CR/LF) — never valid in single-line fields; blocks header injection. */
const CONTROL = /[\u0000-\u001f\u007f]/;
/** Control characters except tab and newlines, for the multi-line description. */
const CONTROL_MULTILINE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export const FIELD_LIMITS = { name: 120, email: 254, company: 160, description: 5000 } as const;
/** Largest request body the API accepts, in bytes. Generous for 5,000 characters of text. */
export const MAX_BODY_BYTES = 32 * 1024;

/** Shared by the browser and the API route so both enforce the same rules. */
export function validateEnquiry(e: Partial<Enquiry>): FieldErrors {
  const errors: FieldErrors = {};
  if (!e.name?.trim()) errors.name = "Enter your name.";
  else if (e.name.length > FIELD_LIMITS.name) errors.name = "Keep your name under 120 characters.";
  else if (CONTROL.test(e.name)) errors.name = "Remove line breaks and special characters from your name.";
  if (!e.email?.trim()) errors.email = "Enter your email address so I can reply.";
  else if (e.email.length > FIELD_LIMITS.email || !EMAIL.test(e.email.trim()))
    errors.email = "Enter an email address in the format name@example.com.";
  if ((e.company ?? "").length > FIELD_LIMITS.company) errors.company = "Keep this under 160 characters.";
  else if (CONTROL.test(e.company ?? "")) errors.company = "Remove line breaks and special characters.";
  if (!e.type || !projectTypes.includes(e.type)) errors.type = "Choose the type of project.";
  if (!e.budget || !budgets.includes(e.budget)) errors.budget = "Choose an approximate budget, or 'Not sure yet'.";
  if (!e.timeframe || !timeframes.includes(e.timeframe)) errors.timeframe = "Choose a timeframe.";
  const d = e.description?.trim() ?? "";
  if (d.length < 20) errors.description = "Tell me a little more — a couple of sentences is plenty.";
  else if (d.length > FIELD_LIMITS.description) errors.description = "Keep the description under 5,000 characters.";
  else if (CONTROL_MULTILINE.test(d)) errors.description = "Remove special control characters from the description.";
  return errors;
}

/** Server-only: true when the Resend integration has everything it needs. */
export function enquiryApiConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL);
}
