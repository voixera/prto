import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import { TECH_ASSETS, WEB_PROJECTS, isExternalHref } from "../content/site";
import Reveal from "./Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

function ProjectFeature({ project, index }) {
  const mediaRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressStart = Math.min(index * 0.12, 0.38);
  const progressEnd = Math.min(progressStart + 0.28, 0.92);
  const parallax = useSpring(useTransform(scrollYProgress, [progressStart, progressEnd], reduced ? [0, 0] : [34, -34]), { stiffness: 70, damping: 24 });
  const pointerX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24 });
  const link = project.links?.[0];

  useLayoutEffect(() => {
    if (reduced || !mediaRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(mediaRef.current, { clipPath: "inset(0 18% 18% 0)" }, { clipPath: "inset(0 0% 0% 0)", duration: 1.15, ease: "power4.out", delay: index * 0.08 });
    }, mediaRef);
    return () => ctx.revert();
  }, [index, reduced]);

  function handlePointerMove(event) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) / 80);
    pointerY.set(-(event.clientY - rect.top - rect.height / 2) / 80);
  }

  return (
    <article className={`project-feature feature-${index + 1}`}>
      <Reveal className="project-feature-top" delay={index * 70}>
        <span className="project-feature-number">{String(index + 1).padStart(2, "0")}</span>
        <span>PROJECT</span>
        <span>{project.tags?.join(" / ")}</span>
      </Reveal>

      <motion.div
        ref={mediaRef}
        className="project-feature-media"
        style={{ y: parallax, rotateX: pointerY, rotateY: pointerX }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      >
        {project.thumbnail ? <img src={project.thumbnail} alt={`${project.title} project preview`} loading="lazy" /> : null}
        <span className="project-feature-caption">{project.showcase?.[0] || "Web experience"}</span>
        <span className="project-feature-corner" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 06</span>
      </motion.div>

      <Reveal className="project-feature-copy" delay={150 + index * 70}>
        <span className="project-feature-year">2026 / {project.tags?.[0] || "WEB"}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-feature-tech" aria-label={`${project.title} technologies`}>
          {project.tags?.map((tag) => <span key={tag}>{TECH_ASSETS[tag] && <img src={TECH_ASSETS[tag]} alt="" />}{tag}</span>)}
        </div>
        {link && <a className="project-feature-link" href={link.href} target={isExternalHref(link.href) ? "_blank" : undefined} rel={isExternalHref(link.href) ? "noreferrer" : undefined} data-cursor-label="VIEW PROJECT">{link.label}<span aria-hidden="true">↗</span></a>}
      </Reveal>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="project" className="projects-section">
      <div className="project-intro">
        <Reveal><div className="section-index"><span className="index-num">03</span><span>PROJECT INDEX</span></div></Reveal>
        <Reveal delay={100}><h2>Things made to be<br /><em>used.</em></h2></Reveal>
        <Reveal delay={170}><p>Selected web applications, interfaces, and useful systems built from idea to delivery.</p></Reveal>
      </div>
      <div className="project-features">{WEB_PROJECTS.map((project, index) => <ProjectFeature key={project.title} project={project} index={index} />)}</div>
      <Reveal className="project-archive-links" delay={120}>
        <a href="#/discord-bots">Discord bot systems <span aria-hidden="true">↗</span></a>
        <a href="#/roblox-scripts">Lua script archive <span aria-hidden="true">↗</span></a>
      </Reveal>
    </section>
  );
}
