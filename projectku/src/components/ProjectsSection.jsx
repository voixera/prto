import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import { WEB_PROJECTS, isExternalHref } from "../content/site";
import Reveal from "./Reveal";

const positions = [
  { left: "38%", top: "21%", width: "31vw", rotate: -5, depth: 2 },
  { left: "61%", top: "7%", width: "22vw", rotate: 4, depth: 4 },
  { left: "70%", top: "29%", width: "27vw", rotate: 8, depth: 3 },
  { left: "17%", top: "55%", width: "28vw", rotate: 7, depth: 1 },
];

function CollageProject({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const moveY = useSpring(useTransform(scrollYProgress, [0.18, 0.72], [index * 24, -index * 18]), { stiffness: 55, damping: 20 });
  const x = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });
  const item = positions[index % positions.length];
  const link = project.links?.[0];

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, scale: .82, y: 45, rotate: item.rotate - 3 }, { opacity: 1, scale: 1, y: 0, rotate: item.rotate, duration: 1.1, delay: index * .11, ease: "power4.out", scrollTrigger: { trigger: cardRef.current, start: "top 92%", once: true } });
    }, cardRef);
    return () => context.revert();
  }, [index, item.rotate]);

  return <motion.a
    ref={cardRef}
    className={`collage-project collage-project-${index + 1}`}
    href={link?.href || "#"}
    target={link && isExternalHref(link.href) ? "_blank" : undefined}
    rel={link && isExternalHref(link.href) ? "noreferrer" : undefined}
    data-cursor-label="VIEW"
    style={{ left: item.left, top: item.top, width: item.width, zIndex: item.depth, rotate: item.rotate, y: moveY, rotateX: y, rotateY: x }}
    onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) / 80);
      y.set(-(event.clientY - rect.top - rect.height / 2) / 80);
    }}
    onPointerLeave={() => { x.set(0); y.set(0); }}
  >
    <img src={project.thumbnail} alt={`${project.title} preview`} loading="lazy" />
    <span className="collage-project-label">{String(index + 1).padStart(2, "0")} / {project.title}</span>
    <span className="collage-project-arrow" aria-hidden="true">↗</span>
  </motion.a>;
}

export default function ProjectsSection() {
  return <section id="project" className="project-collage-section">
    <div className="project-collage-heading">
      <Reveal><span className="section-label">SELECTED PROJECTS</span></Reveal>
      <Reveal delay={100}><h2>Things I’ve<br /><em>built.</em></h2></Reveal>
      <Reveal delay={160}><p>Interfaces, tools, and small systems made useful through iteration.</p></Reveal>
    </div>
    <div className="project-collage-stage">
      <div className="collage-grid-lines" aria-hidden="true" />
      <span className="collage-stage-note">SCROLL TO SURF / 04</span>
      {WEB_PROJECTS.slice(0, 4).map((project, index) => <CollageProject key={project.title} project={project} index={index} />)}
    </div>
    <div className="project-collage-footer"><span>WEB / INTERFACE / SYSTEM</span><a href="#/discord-bots">More systems <span>↗</span></a><a href="#/roblox-scripts">Lua archive <span>↗</span></a></div>
  </section>;
}
