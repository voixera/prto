import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STACK_GROUPS, TECH_ASSETS } from "../content/site";
import Reveal from "./Reveal";

const descriptions = {
  HTML: "Semantic structure for accessible interfaces.",
  CSS: "Responsive systems, motion, and visual detail.",
  React: "Component architecture for expressive interfaces.",
  "Next.js": "Full-stack React, rendered for speed.",
  TypeScript: "Clearer systems and fewer surprises.",
  "Tailwind CSS": "Fast interface composition with consistent tokens.",
  "Node.js": "APIs, tooling, and real-time systems.",
  PHP: "Server logic and practical web systems.",
  SQL: "Structured data and dependable queries.",
  MongoDB: "Flexible document data for evolving products.",
  "Discord.js": "Bots, events, commands, and automation.",
  Lua: "Scripting, automation, and game tooling.",
  Vercel: "Deployment, edge functions, and delivery.",
};

const stacks = STACK_GROUPS.flatMap((group) => group.items);

export default function StackSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="stack" className="stack-section section">
      <Reveal>
        <div className="section-label">THE TOOLKIT</div>
      </Reveal>
      <div className="stack-intro">
        <Reveal delay={80}><h2 className="section-title">Tools for<br /><em>making.</em></h2></Reveal>
        <Reveal delay={140}><p>Chosen for the job. Kept close through the build.</p></Reveal>
      </div>

      <div className="tech-orbit" role="list" aria-label="Technology stack">
        <div className="tech-orbit-center" aria-hidden="true"><span>STACK</span><strong>IN USE</strong></div>
        {stacks.map((tech, index) => (
          <motion.button
            key={tech}
            className={`tech-orbit-item tech-orbit-item-${index + 1}${active === tech ? " is-active" : ""}`}
            role="listitem"
            onMouseEnter={() => setActive(tech)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(tech)}
            onBlur={() => setActive(null)}
            whileHover={{ scale: 1.12, y: -5 }}
            initial={{ opacity: 0, scale: .7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ delay: index * .035, type: "spring", stiffness: 240, damping: 22 }}
          >
            {TECH_ASSETS[tech] && <img src={TECH_ASSETS[tech]} alt="" loading="lazy" />}
            <span>{tech}</span>
          </motion.button>
        ))}
      </div>

      <motion.div className="tech-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {active && <motion.span key={active} className="tech-note-content" initial={{ opacity: 0, filter: "blur(7px)", y: 4 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} exit={{ opacity: 0, filter: "blur(7px)", y: -4 }} transition={{ duration: .24, ease: [0.16, 1, .3, 1] }}><strong>{active}</strong><span>{descriptions[active] || "Part of the working toolkit."}</span></motion.span>}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
