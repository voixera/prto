import { useState } from "react";
import { STACK_GROUPS } from "../content/site";
import Reveal from "./Reveal";

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
};

export default function StackSection() {
  const [active, setActive] = useState("React");

  return (
    <section id="stack" className="section stack">
      <div className="section-index">
        <span className="index-num">02</span>
        <span>Stack</span>
      </div>

      <div className="section-body">
        <Reveal>
          <h2 className="section-title">
            Tools I use.
            <em>What they build.</em>
          </h2>
        </Reveal>

        <div className="stack-board">
          {STACK_GROUPS.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 100} className="stack-col">
              <p className="stack-category">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={active === item ? "is-active" : ""}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                      aria-label={`${item}: ${techDescriptions[item] || ""}`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Decorative SVG */}
          <svg
            className="stack-decor"
            viewBox="0 0 280 160"
            fill="none"
            aria-hidden="true"
          >
            <rect x="20" y="20" width="240" height="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="80" x2="260" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.5" />
            <circle cx="20" cy="80" r="3" fill="currentColor" />
            <circle cx="260" cy="80" r="3" fill="currentColor" />
            <text x="30" y="50" fill="currentColor" fontSize="9" fontFamily="DM Mono, monospace" opacity="0.4">ACTIVE: {active}</text>
          </svg>
        </div>

        {/* Active technology description */}
        {techDescriptions[active] && (
          <p
            style={{
              marginTop: 24,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--muted)",
              maxWidth: "42ch",
              lineHeight: 1.7,
              transition: "opacity 0.3s ease",
            }}
          >
            {techDescriptions[active]}
          </p>
        )}
      </div>
    </section>
  );
}
