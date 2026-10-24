import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConfigNotice from "@/components/ConfigNotice";
import { JsonLd, siteGraph } from "@/lib/schema";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["wdth"],
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false, // only used for small diagram labels
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  // Canonical and og:url are set per page, so nothing inherits the home page's.
  openGraph: { type: "website", locale: "en_GB", siteName: site.name },
  twitter: { card: "summary_large_image" },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#efede6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bricolage.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ConfigNotice />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={siteGraph()} />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
