import { useState } from "react";
import { profile } from "../content/profile";

const navigation = [["Home", "home"], ["About", "about"], ["Projects", "projects"], ["Skills", "skills"], ["Contact", "contact"]];
const stack = {
  Frontend: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  Backend: ["Node.js", "PHP"],
  Database: ["SQL", "MongoDB"],
  Tools: ["Vercel", "Git"],
  Automation: ["Lua", "Discord.js"],
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Landscape() {
  return <svg className="landscape" viewBox="0 0 1440 350" preserveAspectRatio="none" role="img" aria-label="Abstract night landscape">
    <defs><linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#0d1725"/><stop offset="1" stopColor="#071018"/></linearGradient></defs>
    <rect width="1440" height="350" fill="url(#sky)"/>
    <g className="landscape-stars" fill="currentColor"><circle cx="94" cy="58" r="1"/><circle cx="227" cy="102" r="1"/><circle cx="370" cy="45" r="1.5"/><circle cx="530" cy="84" r="1"/><circle cx="777" cy="54" r="1"/><circle cx="970" cy="88" r="1.5"/><circle cx="1130" cy="42" r="1"/><circle cx="1327" cy="94" r="1"/></g>
    <circle className="landscape-moon" cx="1120" cy="91" r="29" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path className="landscape-back" d="M0 235 128 155l88 68 130-118 105 102 143-73 131 99 130-134 106 104 136-74 112 105 127-82 124 85v113H0Z"/>
    <path className="landscape-mid" d="M0 265 155 199l99 53 159-111 120 104 118-69 149 84 130-121 120 103 143-70 137 91v87H0Z"/>
    <path className="landscape-front" d="M0 284c127-47 220-53 331-16 156 52 267 14 391-16 203-48 307 44 459 12 92-19 164-42 259-35v121H0Z"/>
    <g className="landscape-city" fill="currentColor"><path d="M225 250h12v-42h10v42h16v-63h11v63h31v40h-80Zm776 8h16v-54h13v54h20v-91h15v91h25v43h-89Z"/><path d="M1095 301v-62l18-23 18 23v62h-36Z"/></g>
  </svg>;
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return <div className="project-dialog-backdrop" role="presentation" onClick={onClose}>
    <article className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={(event) => event.stopPropagation()}>
      <button className="project-dialog-close" onClick={onClose} aria-label="Close project details">Close</button>
      <p className="section-label">{project.tags[0]} / Project overview</p>
      <h2 id="project-dialog-title">{project.title}</h2>
      <p>{project.description}</p>
      {project.showcase?.length ? <><h3>Includes</h3><ul>{project.showcase.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
      <h3>Technology</h3><p className="modal-tags">{project.tags.join(" · ")}</p>
      {project.links?.[0] ? <a className="outline-button" href={project.links[0].href} target={project.links[0].href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.links[0].label} <Arrow /></a> : null}
    </article>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const filters = ["All", "Web", "Discord", "Roblox"];
  const shownProjects = filter === "All" ? profile.projects : profile.projects.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())) || project.title.includes(filter));
  const journey = [...profile.education, ...profile.experience];

  return <div className="portfolio-shell">
    <header className="site-header"><nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home">FR<span>.</span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>{navigation.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
      <a className="nav-status" href={profile.discordInvite} target="_blank" rel="noreferrer"><i /> Available</a>
    </nav></header>
    <main>
      <section className="hero-section" id="home">
        <div className="hero-grid"><div className="hero-copy"><p className="section-label">Portfolio / 2026</p><h1>Faisal<br /><span>Riza</span></h1><p className="hero-role">Fullstack Developer</p><p className="hero-summary">Building web experiences, automation systems, developer tools, and digital products.</p><div className="hero-actions"><a className="solid-button" href="#projects">View Projects <Arrow /></a><a className="outline-button" href={profile.discordInvite} target="_blank" rel="noreferrer">Contact Me <Arrow /></a></div></div><aside className="hero-note"><span>01</span><p>Based in<br />Jawa Timur, Indonesia</p><p>Available for opportunities</p></aside></div><Landscape />
      </section>
      <section className="section about-section" id="about"><p className="section-label">01 / About</p><div><h2>Built from curiosity.<br />Refined through <em>practice.</em></h2><p>{profile.about.join(" ")}</p><div className="about-points"><span>Modern UI</span><span>Performance</span><span>User experience</span></div></div></section>
      <section className="section projects-section" id="projects"><div className="section-top"><p className="section-label">02 / Selected work</p><p>Projects, experiments, and systems built while learning.</p></div><div className="project-filters" aria-label="Filter projects">{filters.map((item) => <button className={filter === item ? "is-selected" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="projects-grid">{shownProjects.map((project, index) => <article className={`project-card project-card--${index + 1}`} key={project.title}><button className="project-preview" onClick={() => setSelected(project)} aria-label={`Open ${project.title} details`}>{project.thumbnail ? <img src={project.thumbnail} alt={`${project.title} preview`} loading={index > 1 ? "lazy" : "eager"} /> : <span>{project.title}</span>}<b>View details <Arrow /></b></button><div className="project-content"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>{project.links?.[0] ? <a href={project.links[0].href} target={project.links[0].href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{project.links[0].label} <Arrow /></a> : null}</div></div></article>)}</div></section>
      <section className="section stack-section" id="skills"><p className="section-label">03 / Tech stack</p><div><h2>Tools used to<br />ship <em>useful work.</em></h2><div className="stack-grid">{Object.entries(stack).map(([group, technologies]) => <article key={group}><h3>{group}</h3>{technologies.map((technology) => <span key={technology}><i>{technology.slice(0, 1)}</i>{technology}</span>)}</article>)}</div></div></section>
      <section className="section journey-section"><p className="section-label">04 / Journey</p><div className="timeline">{journey.map((item) => <article key={`${item.period}-${item.title}`}><p>{item.period}</p><div><h3>{item.title}</h3><span>{item.subtitle}</span>{item.details ? <small>{item.details}</small> : null}</div></article>)}</div></section>
      <section className="github-strip"><p className="section-label">Elsewhere</p><h2>Code, experiments, and ongoing work.</h2><a href={profile.socials[0].href} target="_blank" rel="noreferrer">Visit GitHub <Arrow /></a></section>
      <section className="contact-section" id="contact"><p className="section-label">05 / Contact</p><h2>Let's build<br /><em>something.</em></h2><p>Have an idea, project, or opportunity? Let's talk.</p><a className="discord-button" href={profile.discordInvite} target="_blank" rel="noreferrer"><strong>Discord</strong> Message Me on Discord <Arrow /></a></section>
    </main>
    <footer><div><strong>Faisal Riza</strong><span>Fullstack Developer</span></div><div>{profile.socials.filter((social) => social.label !== "Email").map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</div><small>© 2026 Faisal Riza / Built with code.</small></footer>
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
  </div>;
}
