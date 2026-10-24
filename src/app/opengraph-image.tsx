import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name} — freelance full-stack software engineer in London`;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return ogImage({ kicker: "Freelance full-stack developer, London", title: "I build the software your business runs on." });
}
