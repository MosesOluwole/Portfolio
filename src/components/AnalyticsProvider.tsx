"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { analyticsEnabled, track } from "@/lib/analytics";

/** Page views plus outbound contact clicks, detected from link targets. */
export default function AnalyticsProvider() {
  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      const where = window.location.pathname;
      if (href.startsWith("mailto:")) track("email_click", { where });
      else if (href.includes("bark.com")) track("bark_click", { where });
      else if (href.includes("linkedin.com")) track("linkedin_click", { where });
      else if (href.includes("github.com")) track("github_click", { where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return analyticsEnabled ? <Analytics /> : null;
}
