"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Analytics is OFF unless NEXT_PUBLIC_ANALYTICS=vercel is set at build time.
 * Vercel Web Analytics is cookieless (no consent banner needed); the privacy
 * notice updates itself when this is enabled.
 *
 * Events (custom events need a Vercel Pro plan; page views work on Hobby):
 *   enquiry_sent    — form delivered via the API
 *   enquiry_email   — form handed to the visitor's email app
 *   email_click     — a mailto: link
 *   bark_click      — a link to the Bark profile
 *   linkedin_click / github_click
 */
export const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS === "vercel";

export function track(event: string, props?: Record<string, string>) {
  if (!analyticsEnabled) return;
  try { vercelTrack(event, props); } catch { /* never let analytics break the page */ }
}
