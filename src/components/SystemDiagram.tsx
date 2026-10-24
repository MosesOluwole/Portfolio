"use client";

import { useId, useState } from "react";
import s from "./SystemDiagram.module.css";

type NodeId = "users" | "web" | "api" | "db" | "tools" | "jobs";
type EdgeId = "uw" | "wa" | "ad" | "at" | "aj" | "jt";

const nodes: Record<NodeId, { x: number; y: number; label: string; sub: string }> = {
  users: { x: 20, y: 30, label: "Your users", sub: "customers or staff" },
  web: { x: 225, y: 30, label: "Web app", sub: "what people use" },
  api: { x: 225, y: 160, label: "API", sub: "your business rules" },
  db: { x: 225, y: 290, label: "Database", sub: "your data, safe" },
  tools: { x: 430, y: 160, label: "Existing tools", sub: "payments, CRM, email" },
  jobs: { x: 430, y: 290, label: "Automation", sub: "runs on a schedule" },
};
const W = 150, H = 56;

const edges: Record<EdgeId, string> = {
  uw: "M170 58 H225",
  wa: "M300 86 V160",
  ad: "M300 216 V290",
  at: "M375 188 H430",
  aj: "M375 204 H402 V318 H430",
  jt: "M505 290 V216",
};

const scenarios = [
  {
    id: "new",
    label: "A new product",
    nodes: ["users", "web", "api", "db", "tools", "jobs"] as NodeId[],
    edges: ["uw", "wa", "ad", "at", "aj", "jt"] as EdgeId[],
    faults: [] as NodeId[],
    caption:
      "The whole system, end to end: the app your users see, the API and database behind it, the services it connects to, and the hosting it runs on.",
  },
  {
    id: "internal",
    label: "An internal tool",
    nodes: ["users", "web", "api", "db", "tools"] as NodeId[],
    edges: ["uw", "wa", "ad", "at"] as EdgeId[],
    faults: [] as NodeId[],
    caption:
      "A dashboard or portal for your team that pulls information from the tools you already use into one place.",
  },
  {
    id: "connect",
    label: "Connecting systems",
    nodes: ["api", "db", "tools", "jobs"] as NodeId[],
    edges: ["ad", "at", "aj", "jt"] as EdgeId[],
    faults: [] as NodeId[],
    caption:
      "Your existing tools pass data to each other automatically, so nobody has to copy it across by hand.",
  },
  {
    id: "fix",
    label: "Fixing an existing app",
    nodes: ["web", "api"] as NodeId[],
    edges: ["wa"] as EdgeId[],
    faults: ["web", "api"] as NodeId[],
    caption:
      "Find what's slow or broken, fix it properly, and leave the code easier for the next person to change.",
  },
];

export default function SystemDiagram() {
  const [idx, setIdx] = useState(0);
  const sc = scenarios[idx]!;
  const captionId = useId();

  return (
    <figure className={s.figure} aria-labelledby={captionId}>
      <div className={s.chooser} role="group" aria-label="What do you need built?">
        <span className={s.chooserLabel}>What do you need?</span>
        <div className={s.options}>
          {scenarios.map((o, i) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={i === idx}
              aria-controls={captionId}
              className={s.option}
              onClick={() => setIdx(i)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.canvas}>
        <svg viewBox="0 0 600 392" role="img" aria-label={`Diagram of a typical web system. Highlighted for ${sc.label.toLowerCase()}: ${sc.nodes.map((n) => nodes[n].label).join(", ")}.`}>
          {/* hosting boundary */}
          <rect x="208" y="14" width="384" height="348" className={s.boundary} />
          <text x="584" y="30" textAnchor="end" className={s.anno}>hosting / AWS</text>

          {(Object.keys(edges) as EdgeId[]).map((e) => {
            const on = sc.edges.includes(e);
            return (
              <g key={e} className={on ? s.edgeOn : s.edgeOff}>
                <path d={edges[e]} className={s.edge} />
                {on && <path d={edges[e]} className={s.flow} />}
              </g>
            );
          })}

          {(Object.keys(nodes) as NodeId[]).map((id) => {
            const n = nodes[id];
            const on = sc.nodes.includes(id);
            const fault = sc.faults.includes(id);
            return (
              <g key={id} className={`${s.node} ${on ? s.nodeOn : s.nodeOff}`} transform={`translate(${n.x} ${n.y})`}>
                <rect width={W} height={H} />
                <text x="12" y="24" className={s.nodeLabel}>{n.label}</text>
                <text x="12" y="42" className={s.nodeSub}>{n.sub}</text>
                {fault && (
                  <g className={s.fault} transform={`translate(${W - 18} 10)`}>
                    <circle r="7" cx="4" cy="4" />
                    <path d="M4 0.5 V5 M4 6.8 V7.4" />
                  </g>
                )}
              </g>
            );
          })}

          {/* dimension line */}
          <g className={s.dim}>
            <path d="M225 378 H580 M225 372 V384 M580 372 V384" />
            <text x="402" y="374" textAnchor="middle" className={s.anno}>built and owned end to end</text>
          </g>
          <text x="20" y="378" className={s.anno}>fig. 1 — a typical web system</text>
        </svg>
      </div>

      <figcaption id={captionId} className={s.caption} aria-live="polite">
        {sc.caption}
      </figcaption>
    </figure>
  );
}
