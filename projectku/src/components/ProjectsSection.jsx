import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import { TECH_ASSETS, WEB_PROJECTS, isExternalHref } from "../content/site";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

function ProjectFeature({ project, index }) {
  const stageRef = useRef(null);
  const mediaRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [42, -42]), { stiffness: 70, damping: 24 });
  const pointerX = useSpring(useMotionValue(0), { stiffness: 170, damping: 24 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 170, damping: 24 });
  const link = project.links?.[0];

  useLayoutEffect(() => {
    if (reduced || !stageRef.current || !mediaRef.current) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo(mediaRef.current, { clipPath: "inset(12% 14% 12% 0)" }, {
        clipPath: "inset(0% 0% 0% 0)",
        ease: "power4.out",
        duration: 1.15,
        scrollTrigger: { trigger: stageRef.current, start: "top 82%", once: true },
      });
    }, stageRef);
    return () => context.revert();
  }, [reduced]);

  const handleMove = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) / 90);
    pointerY.set(-(event.clientY - rect.top - rect.height / 2) / 90);
  };

  return (
    <article ref={stageRef} className={`project-feature feature-${index + 1}`}>
      <Reveal className="project-feature-top" delay={index * 70}>
        <span>PROJECT</span>
        <span>{project.tags?.join(" / ")}</span>
      </Reveal>

      <motion.div
        ref={mediaRef}
        className="project-feature-media"
        style={{ y: imageY, rotateX: pointerY, rotateY: pointerX }}
        onPointerMove={handleMove}
        onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      >
        {project.thumbnail && <img src={project.thumbnail} alt={`${project.title} project preview`} loading="lazy" />}
        <span className="project-feature-caption">{project.showcase?.[0] || "Web experience"}</span>
      </motion.div>

      <Reveal className="project-feature-copy" delay={150 + index * 70}>
        <span className="project-feature-type">{project.tags?.[0] || "WEB"} / SELECTED BUILD</span>
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
        <Reveal><div className="section-index"><span className="index-num">03</span><span>SELECTED PROJECTS</span></div></Reveal>
        <Reveal delay={100}><h2>Things made to be<br /><em>used.</em></h2></Reveal>
        <Reveal delay={170}><p>Web applications and tools shaped from first idea to a useful, working experience.</p></Reveal>
      </div>
      <div className="project-features">{WEB_PROJECTS.map((project, index) => <ProjectFeature key={project.title} project={project} index={index} />)}</div>
      <Reveal className="project-archive-links" delay={120}>
        <a href="#/discord-bots">Discord bot systems <span aria-hidden="true">↗</span></a>
        <a href="#/roblox-scripts">Lua script archive <span aria-hidden="true">↗</span></a>
      </Reveal>
    </section>
  );
}
