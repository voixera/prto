import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "../content/profile";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { OrganicShape } from "../components/ArtShapes";
import scriptLandscape from "../../gallery/PWS 211 Hardscape Materials Handbook.jpg";

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

export default function RobloxScripts() {
  return <div className="page subpage roblox"><SiteHeader /><main>
    <section className="sub-hero script-hero"><a className="text-link" href="#work"><span className="link-line" />Back to work</a><OrganicShape className="script-hero-shape" size={220} color="rgba(216,255,101,.76)" /><h1 className="display"><em>Lua</em><span>made visible.</span></h1><p className="lede">Roblox Lua experiments, automation patterns, and interface designs. A visual archive of tools built through play.</p></section>
    <section className="script-archive">{(profile.robloxScripts ?? []).map((script, index) => <ScriptShowcase key={script.name} script={script} index={index} />)}</section>
  </main><SiteFooter /></div>;
}
