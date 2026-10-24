import Image from "next/image";
import type { Project } from "@/content/projects";
import AlignCVVisual from "./AlignCVVisual";
import DhubVisual from "./DhubVisual";
import JordanVisual from "./JordanVisual";
import PlatformVisual from "./PlatformVisual";
import s from "./visuals.module.css";

/**
 * Renders a permitted screenshot if one is configured; otherwise an
 * original illustration, always labelled so nobody mistakes it for a
 * screenshot of the live product.
 */
export default function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.screenshot) {
    return (
      <figure className={s.frame}>
        <Image
          src={project.screenshot}
          alt={`Screenshot of the ${project.name} website`}
          width={1600}
          height={1000}
          sizes="(max-width: 860px) 100vw, 60vw"
          priority={priority}
          className={s.shot}
        />
      </figure>
    );
  }

  const art = {
    aligncv: <AlignCVVisual />,
    dhub: <DhubVisual />,
    jordan: <JordanVisual />,
    platform: <PlatformVisual tone={project.tone} name={project.name} />,
  }[project.visual];

  return (
    <figure className={s.frame}>
      <div className={s.art} aria-hidden="true">{art}</div>
      <figcaption className={s.note}>
        {project.visual === "aligncv"
          ? "Illustration of AlignCV's provenance check, not a screenshot"
          : project.visual === "platform"
            ? "Abstract illustration, not the product's interface"
            : "Illustration, not a screenshot of the live site"}
      </figcaption>
    </figure>
  );
}
