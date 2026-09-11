import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import scriptLandscape from "../../gallery/PWS 211 Hardscape Materials Handbook.jpg";
import landscapeBackground from "../../gallery/download.jpg";

const violenceDistrict = {
  name: "Violence District",
  category: "Roblox Lua script",
  status: "Preview",
  description: "A visual preview of the Violence District Roblox script interface and gameplay workflow.",
  videoSrc: "/roblox-script-videos/ViolenceDistrict.mp4",
  stack: ["Lua", "Luau", "Roblox Studio"],
};

function ScriptShowcase({ script, index }) {
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [index * .08, .55 + index * .05], [34, -34]), { stiffness: 60, damping: 22 });
  return <article className="script-showcase">
    <div className="script-heading"><span className="case-num">{String(index + 1).padStart(2, "0")}</span><span className="kicker">{script.category}</span><span className="script-status">{script.status}</span></div>
    <Reveal delay={index * 50}><motion.div className="script-media" style={{ y }}>
      {script.videoSrc ? <video controls muted loop playsInline preload="metadata" poster={script.iconSrc} aria-label={`${script.name} preview`}><source src={script.videoSrc} type="video/mp4" /></video> : <img src={scriptLandscape} alt={script.name} loading="lazy" />}
      <div className="script-orbit" aria-hidden="true" />
    </motion.div></Reveal>
    <div className="script-copy"><h2>{script.name}</h2><p>{script.description}</p><ul className="tech-line">{script.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
  </article>;
}

function GithubRepos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/voixera/repos?sort=updated&per_page=12")
      .then((response) => response.ok ? response.json() : [])
      .then((items) => setRepos(items.filter((repo) => !repo.fork)))
      .catch(() => setRepos([]));
  }, []);

  return <section className="github-archive" aria-labelledby="github-title">
    <div className="github-heading"><span className="kicker">Open source / GitHub</span><h2 id="github-title">More work,<br /><em>in the repo.</em></h2><a className="project-stage-link" href="https://github.com/voixera" target="_blank" rel="noreferrer">Open profile <span aria-hidden="true">↗</span></a></div>
    <div className="github-repos">{repos.map((repo, index) => <a className="github-repo" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><span className="github-repo-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{repo.name}</strong><small>{repo.language || "Repository"}</small></span><span className="github-arrow" aria-hidden="true">↗</span></a>)}</div>
  </section>;
}

export default function RobloxScripts() {
  return <div className="page subpage roblox" style={{ "--landscape-background": `url("${landscapeBackground}")` }}><SiteHeader archive /><main>
    <section className="sub-hero script-hero"><a className="text-link" href="#project"><span className="link-line" />Back to projects</a><h1 className="display"><em>Lua</em><span>made visible.</span></h1><p className="lede">Roblox Lua experiments, automation patterns, and interface designs. A visual archive of tools built through play.</p></section>
    <section className="script-archive"><ScriptShowcase script={violenceDistrict} index={0} /></section>
    <GithubRepos />
  </main><SiteFooter /></div>;
}
