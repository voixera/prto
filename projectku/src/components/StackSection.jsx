import { useState } from "react";
import { STACK_GROUPS, TECH_ASSETS } from "../content/site";

const techDescriptions = {
  "HTML": "Semantic, accessible markup foundations.",
  "CSS": "Custom properties, animations, responsive systems.",
  "React": "Component architecture, state management, hooks.",
  "Next.js": "SSR, routing, API routes, deployment.",
  "TypeScript": "Type safety across the stack.",
  "Tailwind CSS": "Utility-first rapid styling.",
  "Node.js": "Server-side JavaScript, APIs, tooling.",
  "PHP": "Server logic, WordPress, legacy systems.",
  "SQL": "PostgreSQL, MySQL, query optimization.",
  "MongoDB": "Document databases, schema design.",
  "Discord.js": "Bot development, slash commands, events.",
  "Lua": "Roblox scripting, game automation, UI tools.",
  "Vercel": "Edge functions, deployments, analytics.",
  "Three.js": "WebGL, 3D scenes, shaders, interactivity.",
  "Git": "Version control, branching, team workflows.",
};

export default function StackSection() {
  const [activeTech, setActiveTech] = useState("React");

  return (
    <section id="stack" className="section">
      <div className="section-index">
        <span className="index-num">02</span>
        <span>TECH STACK</span>
      </div>

      <h2 className="section-title">
        Ecosystem & Tools.
        <em>What powers the build.</em>
      </h2>

      <div className="stack-grid">
        {STACK_GROUPS.flatMap((g) => g.items).map((tech) => {
          const imgSrc = TECH_ASSETS[tech];
          return (
            <div
              key={tech}
              className={`tech-card ${activeTech === tech ? "is-active" : ""}`}
              onClick={() => setActiveTech(tech)}
              onMouseEnter={() => setActiveTech(tech)}
            >
              {imgSrc ? (
                <img src={imgSrc} alt={tech} className="tech-card-img" />
              ) : (
                <div className="tech-card-img" style={{ background: '#1e293b', display: 'grid', placeItems: 'center', color: '#38bdf8', fontWeight: 'bold' }}>
                  {tech[0]}
                </div>
              )}
              <span className="tech-card-name">{tech}</span>
            </div>
          );
        })}
      </div>

      {techDescriptions[activeTech] && (
        <div style={{ marginTop: 32, padding: '16px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', display: 'inline-block' }}>
          <span className="mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.8125rem' }}>SELECTED: {activeTech}</span>
          <p className="project-desc" style={{ margin: 0, marginTop: 4 }}>
            {techDescriptions[activeTech]}
          </p>
        </div>
      )}
    </section>
  );
}
