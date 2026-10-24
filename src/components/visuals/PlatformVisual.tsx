import s from "./visuals.module.css";

type Tone = { base: string; tile: string; mark: string } | undefined;

/** Abstract lobby composition. No logos, no game art, no copied UI. */
export default function PlatformVisual({ tone, name }: { tone: Tone; name: string }) {
  const t = tone ?? { base: "#2a2b27", tile: "#55564f", mark: "#efede6" };
  const seed = name.length;
  return (
    <div className={s.pf} style={{ ["--pf-base" as string]: t.base, ["--pf-tile" as string]: t.tile, ["--pf-mark" as string]: t.mark }}>
      <div className={s.pfBar}><span /><span /><span /></div>
      <div className={s.pfBanner}><span className={s.pfBannerText} /><span className={s.pfBannerCta} /></div>
      <div className={s.pfGrid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={s.pfTile} style={{ opacity: 0.55 + (((i * 7 + seed) % 5) * 0.1) }} />
        ))}
      </div>
    </div>
  );
}
