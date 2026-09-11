import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

function ProjectMedia({ project, index }) {
  return <div className="project-showcase-media">
    {project.videoSrc ? <video src={project.videoSrc} poster={project.thumbnail} muted playsInline loop autoPlay preload="metadata" /> : <img src={project.thumbnail} alt={`${project.title} preview`} loading={index === 0 ? "eager" : "lazy"} />}
  </div>;
}

function ShowcaseProject({ project, index }) {
  const reduced = useReducedMotion();
  const tags = project.tags?.slice(0, 4) || [];

  return <motion.article
    className={`project-showcase-item project-showcase-item-${index + 1}`}
    initial={reduced ? false : { opacity: 0, y: 42 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: 0.78, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="project-showcase-index" aria-hidden="true">Selected work</div>
    <div
    className="project-showcase-link"
    data-cursor-label="VIEW"
  >
      <ProjectMedia project={project} index={index} />
      <div className="project-showcase-copy">
        <div className="project-showcase-topline"><span>{project.tags?.[0] || "Web project"}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-showcase-meta">
          <div><span className="project-meta-label">Built with</span><span>{tags.join(" · ")}</span></div>
          <div><span className="project-meta-label">Focus</span><span>{project.showcase?.[0] || "Web experience"}</span></div>
        </div>
      </div>
    </div>
  </motion.article>;
}

const featuredProject = {
  title: "Violence District",
  description: "Roblox Lua exploiting script preview focused on the Violence District gameplay workflow.",
  tags: ["Lua", "Exploiting", "Roblox"],
  showcase: ["Script preview"],
  videoSrc: "/roblox-script-videos/ViolenceDistrict.mp4",
  links: [{ label: "Open preview", href: "#/roblox-scripts" }],
};

function GithubRepos() {
  const [repos, setRepos] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    fetch("https://api.github.com/users/voixera/repos?sort=updated&per_page=12")
      .then((response) => response.ok ? response.json() : [])
      .then((items) => setRepos(items.filter((repo) => !repo.fork)))
      .catch(() => setRepos([]));
  }, []);

  useEffect(() => {
    if (!listRef.current || !repos.length) return;
    const links = listRef.current.querySelectorAll(".project-repo");
    gsap.fromTo(links, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: .55, stagger: .06, ease: "power3.out" });
  }, [repos]);

  return <section className="project-repos" aria-labelledby="repo-title">
    <div className="project-repos-heading"><span className="section-label">GITHUB / OPEN SOURCE</span><h3 id="repo-title">Built with<br /><em>curiosity.</em></h3><p>Projects, experiments, and tools from my GitHub workspace.</p><div className="project-stack"><span>Framer Motion</span><span>GSAP</span><span>WebGL</span><span>React</span><span>Lua</span></div><a className="project-stage-link" href="https://github.com/voixera" target="_blank" rel="noreferrer">View GitHub profile <span aria-hidden="true">↗</span></a></div>
    <div className="project-repo-list" ref={listRef}>{repos.map((repo, index) => <motion.a className="project-repo" whileHover={{ x: 8 }} transition={{ duration: .2 }} key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><span className="project-repo-index">{String(index + 1).padStart(2, "0")}</span><span className="project-repo-name"><strong>{repo.name}</strong><small>{repo.language || "Repository"}</small></span><span className="project-repo-arrow" aria-hidden="true">↗</span></motion.a>)}</div>
  </section>;
}

export default function ProjectsSection() {
  return <section id="project" className="project-collage-section">
    <div className="project-collage-heading">
      <Reveal><span className="section-label">PROJECT</span></Reveal>
      <Reveal delay={100}><h2>Small<br /><em>Project.</em></h2></Reveal>
      <Reveal delay={160}><p>A Small Project by Faisal Riza, built as a Roblox Lua exploiting script preview.</p></Reveal>
    </div>
    <div className="project-showcase-list">
      <ShowcaseProject project={featuredProject} index={0} />
    </div>
    <GithubRepos />
  </section>;
}
