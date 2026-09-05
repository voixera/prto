import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import { WEB_PROJECTS, isExternalHref } from "../content/site";
import Reveal from "./Reveal";

function ProjectFeature({ project, index }) {
  const { scrollYProgress } = useScroll();
  const imageY = useSpring(useTransform(scrollYProgress, [index * .1, .55 + index * .06], [35, -35]), { stiffness: 65, damping: 22 });
  const link = project.links?.[0];
  return <article className={`project-feature feature-${index + 1}`}>
    <div className="project-feature-top"><span>PROJECT {String(index + 1).padStart(2, "0")}</span><span>{project.tags?.join(" / ")}</span></div>
    <motion.div className="project-feature-media" style={{ y: imageY }} whileHover={{ scale: 1.02 }}>
      {project.thumbnail && <img src={project.thumbnail} alt={project.title} loading="lazy" />}
      <span className="project-feature-caption">{project.showcase?.[0] || "Web experience"}</span>
    </motion.div>
    <Reveal className="project-feature-copy" delay={90}>
      <span className="project-feature-year">2026</span><h3>{project.title}</h3><p>{project.description}</p>
      {link && <a className="project-feature-link" href={link.href} target={isExternalHref(link.href) ? "_blank" : undefined} rel={isExternalHref(link.href) ? "noreferrer" : undefined} data-cursor-label="OPEN">{link.label}<span>↗</span></a>}
    </Reveal>
  </article>;
}

export default function ProjectsSection() {
  return <section id="project" className="projects-section">
    <div className="project-intro"><Reveal><div className="section-index"><span className="index-num">03</span><span>PROJECT INDEX</span></div></Reveal><Reveal delay={100}><h2>Things made to be<br /><em>used.</em></h2></Reveal><p>Selected web applications, tools, and systems.</p></div>
    <div className="project-features">{WEB_PROJECTS.map((project, index) => <ProjectFeature key={project.title} project={project} index={index} />)}</div>
    <div className="project-archive-links"><a href="#/discord-bots">Discord bot systems <span>↗</span></a><a href="#/roblox-scripts">Lua script archive <span>↗</span></a></div>
  </section>;
}
