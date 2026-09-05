import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import { WEB_PROJECTS, isExternalHref } from "../content/site";
import Reveal from "./Reveal";
import { Arc, FloatingBadge, OrganicShape, Ring } from "./ArtShapes";

function ProjectStage({ project, index }) {
  const { scrollYProgress } = useScroll();
  const mediaY = useSpring(useTransform(scrollYProgress, [index * .1, .5 + index * .06], [30, -30]), { stiffness: 65, damping: 22 });
  const x = useSpring(0, { stiffness: 180, damping: 24 });
  const y = useSpring(0, { stiffness: 180, damping: 24 });
  const move = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) / 70);
    y.set(-(event.clientY - box.top - box.height / 2) / 70);
  };
  const reset = () => { x.set(0); y.set(0); };
  const link = project.links?.[0];

  return (
    <motion.article className={`project-stage stage-${index + 1}`} onMouseMove={move} onMouseLeave={reset}>
      <div className="project-stage-heading">
        <span className="project-stage-number">0{index + 1}</span>
        <span className="project-stage-kind">{project.tags?.join(" / ")}</span>
      </div>
      <motion.div className="project-stage-media" style={{ y: mediaY, rotateX: y, rotateY: x }}>
        {project.thumbnail ? <img src={project.thumbnail} alt={project.title} loading="lazy" /> : <span>{project.title}</span>}
        <FloatingBadge className="project-stage-badge">SELECTED WORK</FloatingBadge>
      </motion.div>
      <div className="project-stage-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {link && <a className="project-stage-link" href={link.href} target={isExternalHref(link.href) ? "_blank" : undefined} rel={isExternalHref(link.href) ? "noreferrer" : undefined} data-cursor-label="VIEW PROJECT">
          {link.label}<span aria-hidden="true">↗</span>
        </a>}
      </div>
      <div className="project-stage-shape" aria-hidden="true"><OrganicShape size={110} color="rgba(216,255,101,.7)" /><Ring size={160} color="rgba(241,239,232,.25)" /></div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="section projects-section">
      <Reveal><div className="section-index"><span className="index-num">03</span><span>SELECTED WORK</span></div></Reveal>
      <Reveal delay={100}><h2 className="section-title">Things made to be <em>used.</em></h2></Reveal>
      <div className="project-stages">
        {WEB_PROJECTS.map((project, index) => <Reveal key={project.title} delay={index * 70}><ProjectStage project={project} index={index} /></Reveal>)}
      </div>
      <Reveal delay={160}>
        <div className="auxiliary-work">
          <div><span className="section-index"><span className="index-num">03.B</span> BOT SYSTEMS</span><h3>Discord bots that make busy servers quieter.</h3></div>
          <a className="project-stage-link" href="#/discord-bots">Explore bot systems <span aria-hidden="true">↗</span></a>
        </div>
      </Reveal>
      <Reveal delay={220}>
        <div className="auxiliary-work auxiliary-script">
          <div><span className="section-index"><span className="index-num">03.C</span> AUTOMATION</span><h3>Lua tools, interfaces, and game experiments.</h3></div>
          <a className="project-stage-link" href="#/roblox-scripts">Open script archive <span aria-hidden="true">↗</span></a>
        </div>
      </Reveal>
    </section>
  );
}
