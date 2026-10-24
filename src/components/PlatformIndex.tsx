"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";
import PlatformVisual from "./visuals/PlatformVisual";
import s from "./Work.module.css";

/** One case study covering several sister brands on a shared platform. */
export default function PlatformIndex({ project }: { project: Project }) {
  const brands = project.brands ?? [];
  const [active, setActive] = useState(0);
  const current = brands[active] ?? brands[0];

  return (
    <div className={s.platforms}>
      <div className={s.platformsText}>
        <p className={s.platformsSummary}>{project.summary}</p>
        {project.highlights && (
          <div className={s.highlights}>
            <h4 className={s.highlightsTitle}>What I built</h4>
            <ul>{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        )}
        <p className="techline">{project.role}, {project.team.toLowerCase()}. {project.technologies.join(", ")}</p>
        <p className={s.links}>
          <Link href={`/work/${project.slug}`} className="textlink">Read the platforms case study</Link>
        </p>
      </div>

      <div className={s.platformsSide}>
        {current && (
          <div className={s.preview} aria-hidden="true">
            <PlatformVisual tone={current.tone} name={current.name} />
          </div>
        )}
        <ul className={s.brandList} aria-label="Live brands">
          {brands.map((b, i) => (
            <li
              key={b.name}
              className={`${s.brandRow} ${i === active ? s.brandRowOn : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <span className={s.brandName}>{b.name}</span>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className={s.indexLive} onFocus={() => setActive(i)}>
                {b.label}<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className={s.previewNote}>Abstract illustrations, not the products&rsquo; interfaces</p>
      </div>
    </div>
  );
}
