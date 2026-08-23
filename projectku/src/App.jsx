import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, ExternalLink, Github, Linkedin, Menu, X } from "lucide-react";
import { profile } from "./content/profile";

const categories = ["All", "Web", "Automation", "Tools"];
const stackGroups = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
  Backend: ["Node.js", "PHP"],
  Database: ["SQL", "MongoDB"],
  Tools: ["Vercel", "Figma", "Roblox Studio"],
  Automation: ["Discord.js", "Lua", "Luau"],
};

function Landscape() {
  return <div className="landscape" aria-label="An atmospheric blue line-art mountain landscape" role="img">
    <svg viewBox="0 0 1440 430" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="sky" x2="0" y2="1"><stop stopColor="#07111d"/><stop offset="1" stopColor="#0b1825"/></linearGradient></defs>
      <rect width="1440" height="430" fill="url(#sky)"/>
      <g className="stars" fill="#8ecbff"><circle cx="160" cy="110" r="1"/><circle cx="370" cy="65" r="1.5"/><circle cx="690" cy="120" r="1"/><circle cx="1110" cy="82" r="1.2"/><circle cx="1280" cy="155" r="1"/></g>
      <g className="landscape-back" fill="#0d2434" stroke="#15384e" strokeWidth="1"><path d="M0 315 170 175l100 80 164-176 188 184 125-118 192 163 143-138 258 153v107H0Z"/></g>
      <g className="landscape-mid" fill="#0b1b29" stroke="#1a4967" strokeWidth="1.5"><path d="M0 351 140 260l91 52 151-125 164 126 113-73 142 97 132-120 174 102 128-67 205 109v69H0Z"/></g>
      <path className="horizon" d="M0 367 Q190 326 340 365T680 355 1010 366 1440 342V430H0Z" fill="#071018" stroke="#205777" strokeWidth="2"/>
      <g className="landscape-front" fill="#060c12" stroke="#123a53" strokeWidth="1"><path d="M0 392q170-65 325-11t297-8 290 13 285-28 243 18v54H0Z"/></g>
      <g className="trees" stroke="#377da7" strokeWidth="2" fill="none"><path d="M185 385v-48m0 0-16 20m16-8 17-22m-17 31-22-10m22 1 21-15M1040 377v-61m0 0-20 28m20-10 21-31m-21 43-26-13m26 5 27-20M1190 370v-45m0 0-15 21m15-8 17-24"/></g>
      <g className="signal" fill="none" stroke="#5fbaff" strokeWidth="1"><path d="M1060 275h74M1100 275v-31m0 0 30-19"/><circle cx="1130" cy="225" r="3"/><path d="M1119 225h-40"/></g>
    </svg>
  </div>;
}

function SectionLabel({ number, children }) { return <div className="section-label"><span>{number}</span>{children}</div>; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => profile.projects.filter((p) => filter === "All" || p.tags.includes(filter)), [filter]);

  useEffect(() => {
    const nodes = ["home", "about", "projects", "skills", "journey", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <div className="site-shell">
    <div className="technical-bg" aria-hidden="true" />
    <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation"><a className="wordmark" href="#home" onClick={() => go("home")}><span>FR</span> FAISAL RIZA</a><button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button><div className={`nav-links ${menuOpen ? "is-open" : ""}`}>{["home", "about", "projects", "skills", "contact"].map((id, i) => <a className={active === id ? "active" : ""} href={`#${id}`} key={id} onClick={() => go(id)}><span>0{i + 1}</span>{id[0].toUpperCase() + id.slice(1)}</a>)}</div></nav></header>
    <main>
      <section id="home" className="hero container"><div className="hero-copy"><div className="eyebrow"><i/> AVAILABLE FOR OPPORTUNITIES</div><p className="hero-kicker">FULLSTACK DEVELOPER <span>/</span> EAST JAVA, ID</p><h1>FAISAL<br/><em>RIZA</em></h1><p className="hero-intro">Building web experiences, automation systems, developer tools, and digital products.</p><div className="hero-actions"><a className="button button-primary" href="#projects" onClick={() => go("projects")}>View projects <ArrowUpRight size={16}/></a><a className="button button-secondary" href={profile.discordInvite} target="_blank" rel="noreferrer">Contact me <ChevronRight size={16}/></a></div></div><div className="hero-index"><span>PORTFOLIO / 2026</span><span>SCROLL TO EXPLORE</span></div><Landscape/></section>
      <section id="about" className="section container about"><SectionLabel number="01">ABOUT / THE PERSON BEHIND THE BUILDS</SectionLabel><div className="about-grid"><h2>Turning complex ideas<br/><span>into useful interfaces.</span></h2><div className="about-copy">{profile.about.map((text) => <p key={text}>{text}</p>)}<div className="about-meta"><span>BASED IN</span><strong>{profile.location}</strong></div><div className="about-meta"><span>FOCUS</span><strong>Web / Automation / Tools</strong></div></div></div></section>
      <section id="projects" className="section container projects"><SectionLabel number="02">SELECTED WORK / 2022—2026</SectionLabel><div className="section-heading"><h2>Things I’ve<br/><span>built.</span></h2><p>A selection of interfaces, utilities, and experiments. Each one is a small record of learning through building.</p></div><div className="filters" role="group" aria-label="Filter projects">{categories.map((cat) => <button className={filter === cat ? "selected" : ""} onClick={() => setFilter(cat)} key={cat}>{cat}</button>)}</div><div className="project-grid">{filtered.map((project, i) => <article className={`project-card card-${i === 0 ? "feature" : "standard"}`} key={project.title} onClick={() => setSelected(project)}><div className="project-image"><img src={project.thumbnail} alt={`${project.title} preview`} loading="lazy"/><span className="project-number">0{i + 1}</span><ArrowUpRight className="project-arrow" size={20}/></div><div className="project-info"><div className="project-top"><span>{project.tags[0]}</span><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section id="skills" className="section container skills"><SectionLabel number="03">TECH STACK / THE TOOLS I REACH FOR</SectionLabel><div className="skills-grid">{Object.entries(stackGroups).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map((item) => <span key={item}>{item}<ArrowUpRight size={13}/></span>)}</div></div>)}</div></section>
      <section id="journey" className="section container journey"><SectionLabel number="04">JOURNEY / RECENT CHAPTERS</SectionLabel><div className="timeline">{[...profile.education, ...profile.experience].map((item) => <div className="timeline-item" key={`${item.period}-${item.title}`}><span className="timeline-date">{item.period}</span><div><h3>{item.title}</h3><p>{item.subtitle}</p>{item.details && <small>{item.details}</small>}</div></div>)}</div></section>
      <section id="contact" className="contact container"><div><SectionLabel number="05">CONTACT / OPEN CHANNEL</SectionLabel><h2>LET’S BUILD<br/><span>SOMETHING.</span></h2><p>Have an idea, project, or opportunity? Let’s talk.</p></div><a className="button button-primary contact-button" href={profile.discordInvite} target="_blank" rel="noreferrer">Message me on Discord <ArrowUpRight size={17}/></a></section>
    </main>
    <footer className="footer container"><div><strong>FAISAL RIZA</strong><span>Fullstack Developer</span></div><div className="socials"><a href={profile.socials[0].href} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href={profile.socials[1].href} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href={profile.discordInvite} target="_blank" rel="noreferrer">Discord</a></div><small>© 2026 Faisal Riza / Designed & built with code.</small></footer>
    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><article className="modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" aria-label="Close project details" onClick={() => setSelected(null)}><X size={18}/></button><span className="eyebrow">PROJECT DETAIL / {selected.tags[0]}</span><h2 id="project-title">{selected.title}</h2><p>{selected.description}</p><h4>WHAT IT INCLUDES</h4><ul>{selected.showcase?.map((item) => <li key={item}>{item}</li>)}</ul><div className="tag-row">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{selected.links[0]?.href.startsWith("#") ? <button className="button button-primary" onClick={() => setSelected(null)}>Collection details <ChevronRight size={15}/></button> : <a className="button button-primary" href={selected.links[0]?.href} target="_blank" rel="noreferrer">Open project <ExternalLink size={15}/></a>}</article></div>}
  </div>;
}
