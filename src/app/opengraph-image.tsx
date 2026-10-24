import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — freelance full-stack software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#efede6", padding: 72, color: "#1d1e1b", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, background: "#1d1e1b", color: "#cdeb2f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>{site.monogram}</div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>I build the software</div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>your business runs on.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#66655e" }}>
          <div>Freelance full-stack software engineer, London</div>
          <div style={{ width: 160, height: 14, background: "#cdeb2f", border: "2px solid #1d1e1b" }} />
        </div>
      </div>
    ),
    size,
  );
}
