import { useState, useRef } from "react";
import { STACK_GROUPS, TECH_ASSETS } from "../content/site";
import Reveal from "./Reveal";

const techDescriptions = {
  "HTML": "Semantic, accessible markup foundations — the skeleton of every web experience.",
  "CSS": "Custom properties, animations, layout systems, responsive design at scale.",
  "React": "Component architecture, state management, hooks — UI as a function of state.",
  "Next.js": "SSR, static generation, API routes, edge functions — full-stack React.",
  "TypeScript": "Type safety across the stack — catching errors before they become bugs.",
  "Tailwind CSS": "Utility-first rapid styling — design systems at speed.",
  "Node.js": "Server-side JavaScript — APIs, tooling, real-time systems.",
  "PHP": "Server logic, dynamic content generation, legacy system integration.",
  "SQL": "PostgreSQL, MySQL — relational data, query optimization, schema design.",
  "MongoDB": "Document databases, flexible schema, aggregation pipelines.",
  "Discord.js": "Bot development, slash commands, event systems, server automation.",
  "Lua": "Roblox scripting, game automation, UI frameworks in Luau.",
  "Vercel": "Edge deployments, serverless functions, analytics, CI/CD pipelines.",
  "Three.js": "WebGL, 3D scenes, shaders, interactive spatial experiences.",
  "Git": "Version control, branching strategies, collaborative workflows.",
};

export default function StackSection() {
  const [activeTech, setActiveTech] = useState(null);
  const stripRef = useRef(null);

  return (
    <section id="stack" style={{ padding: 0, paddingTop: "clamp(80px, 10vh, 140px)", paddingBottom: "clamp(80px, 10vh, 140px)" }}>
      {/* Header */}
      <div className="stack-header">
        <Reveal>
          <div className="section-label">
            <span className="section-label-num">02</span>
            ECOSYSTEM &amp; TOOLS
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1,
            color: "var(--text-white)",
            marginBottom: 8,
          }}>
            What powers<br />
            <em style={{ fontStyle: "italic", color: "var(--text-warm)" }}>
              the build.
            </em>
          </h2>
        </Reveal>
      </div>

      {/* Horizontal editorial tech strip */}
      <Reveal delay={160}>
        <div className="stack-strip-wrapper" role="list" aria-label="Technology stack">
          <div className="stack-strip" ref={stripRef}>
            {STACK_GROUPS.map((group) => (
              <div key={group.id} className="stack-group" role="group" aria-label={group.label}>
                <div className="stack-group-label">{group.label}</div>
                <div className="stack-group-items">
                  {group.items.map((tech) => {
                    const imgSrc = TECH_ASSETS[tech];
                    const isActive = activeTech === tech;
                    return (
                      <div
                        key={tech}
                        className="stack-tech-item"
                        role="listitem"
                        style={{
                          background: isActive ? "rgba(200, 130, 74, 0.05)" : undefined,
                          borderBottom: isActive ? "1px solid var(--accent-warm)" : "1px solid transparent",
                        }}
                        onMouseEnter={() => setActiveTech(tech)}
                        onMouseLeave={() => setActiveTech(null)}
                        onFocus={() => setActiveTech(tech)}
                        onBlur={() => setActiveTech(null)}
                        tabIndex={0}
                        aria-label={tech}
                      >
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={tech}
                            className="stack-tech-img"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="stack-tech-img"
                            style={{
                              background: "var(--bg-surface)",
                              display: "grid",
                              placeItems: "center",
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.25rem",
                              color: "var(--text-warm)",
                              border: "1px solid var(--border-hair)",
                            }}
                            aria-hidden="true"
                          >
                            {tech[0]}
                          </div>
                        )}
                        <span className="stack-tech-name">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Info bar */}
      <div className="stack-info-bar">
        {activeTech ? (
          <>
            <span className="stack-info-selected">{activeTech}</span>
            <span
              className="stack-info-desc"
              style={{ transition: "opacity 0.3s ease" }}
            >
              {techDescriptions[activeTech] ?? ""}
            </span>
          </>
        ) : (
          <span className="stack-info-desc" style={{ color: "var(--text-dim)" }}>
            Hover a technology to learn more
          </span>
        )}
      </div>
    </section>
  );
}
