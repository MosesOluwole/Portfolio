import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy matched to what the site actually loads:
 * everything is same-origin (fonts are self-hosted by next/font, Vercel
 * Analytics is served from /_vercel/insights on the same domain).
 *
 * 'unsafe-inline' for scripts is needed because the site is statically
 * generated: Next.js injects inline bootstrap scripts, and per-request
 * nonces would force every page to render dynamically. The site renders
 * no user-supplied HTML, which is what makes this trade-off acceptable.
 *
 * Set CSP_REPORT_ONLY=true to ship the policy in report-only mode instead
 * of enforcing it (e.g. after adding a new third-party service).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: process.env.CSP_REPORT_ONLY === "true" ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy", value: csp },
  // Two years. Add "; includeSubDomains; preload" only once every subdomain serves HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  outputFileTracingRoot: path.resolve("."),
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return ["wildz", "wheelz", "caxino", "spinz"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work/casino-platforms",
      permanent: true,
    }));
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/api/(.*)", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
