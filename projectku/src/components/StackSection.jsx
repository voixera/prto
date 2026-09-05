import { useState } from "react";
import { motion } from "framer-motion";
import { STACK_GROUPS, TECH_ASSETS } from "../content/site";
import Reveal from "./Reveal";

const descriptions = { React: "Component architecture and expressive interfaces.", "Next.js": "Full-stack React, rendered for speed.", "Node.js": "APIs, tooling, and real-time systems.", Lua: "Scripting, automation, and game tooling.", TypeScript: "Clearer systems and fewer surprises." };

export default function StackSection() {
  const [active, setActive] = useState(null);
  return <section id="stack" className="stack-section section"><Reveal><div className="section-label"><span className="section-label-num">02</span> THE TOOLKIT</div></Reveal><div className="stack-intro"><Reveal delay={80}><h2 className="section-title">Tools for<br /><em>making.</em></h2></Reveal><Reveal delay={140}><p>Chosen for the job. Kept close through the build.</p></Reveal></div><div className="tech-atlas">{STACK_GROUPS.map((group, groupIndex) => <div className={`tech-column tech-column-${groupIndex + 1}`} key={group.id}><span className="tech-column-label">{group.label}</span>{group.items.map((tech, index) => <motion.button key={tech} className={active === tech ? "is-active" : ""} onMouseEnter={() => setActive(tech)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(tech)} onBlur={() => setActive(null)} whileHover={{ x: 10 }}><span className="tech-index">{String(index + 1).padStart(2, "0")}</span>{TECH_ASSETS[tech] && <img src={TECH_ASSETS[tech]} alt="" loading="lazy" />}<span>{tech}</span></motion.button>)}</div>)}</div><div className="tech-note">{active ? <><strong>{active}</strong><span>{descriptions[active] || "Part of the working toolkit."}</span></> : <span>Hover or focus a technology.</span>}</div></section>;
}
