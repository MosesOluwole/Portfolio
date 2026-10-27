import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared social-sharing card, drawn in the site's own palette. */
export function ogImage({ kicker, title, footer }: { kicker: string; title: string; footer?: string }) {
  const size = title.length > 48 ? 66 : title.length > 30 ? 80 : 96;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#efede6", padding: 72, color: "#1d1e1b", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, background: "#1d1e1b", color: "#cdeb2f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>{site.monogram}</div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 30, color: "#66655e" }}>{kicker}</div>
          <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#66655e" }}>
          <div>{footer ?? "Freelance web developer and software engineer, London"}</div>
          <div style={{ width: 160, height: 14, background: "#cdeb2f", border: "2px solid #1d1e1b" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
