"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";
import PlatformVisual from "./visuals/PlatformVisual";
import s from "./Work.module.css";

export default function PlatformIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active] ?? projects[0];

  return (
    <div className={s.index}>
      <div className={s.indexHeader} aria-hidden="true">
        <span>Platform</span><span>My role</span><span>Stack</span><span>Live site</span>
      </div>
      <ul className={s.indexList}>
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className={`${s.indexRow} ${i === active ? s.indexRowOn : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Link href={`/work/${p.slug}`} className={s.indexName}>
              {p.name}<span className="visually-hidden">: read the case study</span>
            </Link>
            <span className={s.indexRole}>{p.role}, {p.team.toLowerCase()}</span>
            <span className={s.indexStack}>{p.technologies.join(", ")}</span>
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={s.indexLive}>
              {p.liveLabel}<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      {current && (
        <div className={s.preview} aria-hidden="true">
          <PlatformVisual tone={current.tone} name={current.name} />
          <p className={s.previewNote}>{current.name}: abstract illustration, not the product&rsquo;s interface</p>
        </div>
      )}
    </div>
  );
}
