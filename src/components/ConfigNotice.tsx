import { missingConfig } from "@/content/site";

/** Development only: lists placeholders still to fill in. Never renders in production. */
export default function ConfigNotice() {
  if (process.env.NODE_ENV === "production") return null;
  const missing = missingConfig();
  if (!missing.length) return null;
  return (
    <div style={{ background: "#1d1e1b", color: "#cdeb2f", fontSize: 13, padding: "8px 16px", fontFamily: "var(--font-mono)" }}>
      Dev note — not configured yet (hidden on the site until set): {missing.join(", ")}. Edit src/content/site.ts.
    </div>
  );
}
