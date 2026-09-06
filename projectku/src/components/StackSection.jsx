import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useReducedMotion, useSpring, AnimatePresence } from "framer-motion";
import { STACK_GROUPS, TECH_ASSETS } from "../content/site";

const descriptions = {
  HTML: "Semantic structure for accessible interfaces.", CSS: "Responsive systems, motion, and visual detail.", React: "Component architecture for expressive interfaces.", "Next.js": "Full-stack React, rendered for speed.", TypeScript: "Clearer systems and fewer surprises.", "Tailwind CSS": "Fast interface composition with consistent tokens.", "Node.js": "APIs, tooling, and real-time systems.", PHP: "Server logic and practical web systems.", SQL: "Structured data and dependable queries.", MongoDB: "Flexible document data for evolving products.", "Discord.js": "Bots, events, commands, and automation.", Lua: "Scripting, automation, and game tooling.", Vercel: "Deployment, edge functions, and delivery."
};

const related = { React: ["Next.js", "TypeScript", "Tailwind CSS"], "Next.js": ["React", "TypeScript", "Vercel"], TypeScript: ["React", "Next.js", "Node.js"], "Tailwind CSS": ["React", "CSS"], "Node.js": ["TypeScript", "Discord.js", "MongoDB"], "Discord.js": ["Node.js", "JavaScript"], SQL: ["PHP", "Node.js", "MongoDB"] };
const stack = STACK_GROUPS.flatMap((group) => group.items);

function TechItem({ tech, index, active, setActive }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 22 }); const y = useSpring(my, { stiffness: 220, damping: 22 });
  const focused = active === tech; const relatedItem = active && (related[active] || []).includes(tech);
  const handleMove = (event) => { if (reduced) return; const box = event.currentTarget.getBoundingClientRect(); mx.set((event.clientX - box.left - box.width / 2) * .12); my.set((event.clientY - box.top - box.height / 2) * .12); window.dispatchEvent(new CustomEvent("tech-focus", { detail: { intensity: .22 } })); };
  return <motion.button ref={ref} className={`living-tech living-tech-${index + 1} ${focused ? "is-focused" : ""} ${relatedItem ? "is-related" : ""}`} style={{ x, y }} onMouseEnter={() => setActive(tech)} onMouseLeave={() => { setActive(null); mx.set(0); my.set(0); }} onFocus={() => setActive(tech)} onBlur={() => { setActive(null); mx.set(0); my.set(0); }} whileHover={reduced ? undefined : { scale: 1.06 }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .035, duration: .6, ease: [0.16, 1, .3, 1] }} onPointerMove={handleMove}>
    <span className="living-tech-index">{String(index + 1).padStart(2, "0")}</span>{TECH_ASSETS[tech] && <img src={TECH_ASSETS[tech]} alt="" loading="lazy" />}<span>{tech}</span>
  </motion.button>;
}

export default function StackSection() {
  const sectionRef = useRef(null); const [active, setActive] = useState(null);
  useLayoutEffect(() => { const ctx = gsap.context(() => { gsap.fromTo(".stack-rail", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } }); }, sectionRef); return () => ctx.revert(); }, []);
  return <section ref={sectionRef} id="stack" className="stack-section section living-stack">
    <div className="living-stack-heading"><div className="section-label">THE TOOLKIT</div><h2 className="section-title">Tools for<br /><em>making.</em></h2><p>Chosen for the job. Kept close through the build.</p></div>
    <div className="stack-rail" aria-hidden="true" />
    <div className="living-tech-field" role="list" aria-label="Technology stack">{stack.map((tech, index) => <TechItem key={tech} tech={tech} index={index} active={active} setActive={setActive} />)}</div>
    <div className="living-tech-detail" aria-live="polite"><AnimatePresence mode="wait" initial={false}>{active && <motion.div key={active} initial={{ opacity: 0, y: 7, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -7, filter: "blur(5px)" }} transition={{ duration: .25 }}><strong>{active}</strong><span>{descriptions[active]}</span></motion.div>}</AnimatePresence></div>
  </section>;
}
