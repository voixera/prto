import { useState, useEffect, useRef } from "react";
import { profile } from "../content/profile";
import {
  CodeBracketsIcon,
  CpuChipIcon,
  LayersIcon,
  TerminalIcon,
  ServerStackIcon,
  SparklesIcon,
  LaunchArrow,
  GithubBrandIcon,
  DiscordBrandIcon,
} from "../components/CustomIcons";

const NAVIGATION_ITEMS = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Stack", "skills"],
  ["Contact", "contact"],
];

const TECH_CATEGORIES = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  Backend: ["Node.js", "PHP", "Express"],
  Data: ["PostgreSQL", "MongoDB", "SQL"],
  "Automation & Systems": ["Lua", "Discord.js", "Git", "Vercel"],
};

/* ── Interactive Hero SVG Graphic with Motion Geometry ── */
function HeroGraphic() {
  return (
    <div className="hero-visual-wrap" aria-hidden="true">
      <svg className="hero-svg-canvas" viewBox="0 0 720 540" fill="none">
        <defs>
          <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(112, 186, 255, 0.2)" />
            <stop offset="60%" stopColor="rgba(119, 214, 178, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="cyber-frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(112, 186, 255, 0.6)" />
            <stop offset="50%" stopColor="rgba(119, 214, 178, 0.2)" />
            <stop offset="100%" stopColor="rgba(199, 166, 255, 0.5)" />
          </linearGradient>
          <pattern id="dot-matrix" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(112, 186, 255, 0.15)" />
          </pattern>
        </defs>

        {/* Ambient Core Glow */}
        <circle cx="360" cy="270" r="240" fill="url(#hero-core-glow)" />

        {/* Dot Matrix Screen Area */}
        <rect x="80" y="60" width="560" height="420" rx="16" fill="url(#dot-matrix)" />

        {/* Rotating Outer Gyro Rings */}
        <g className="hero-gyro-ring hero-gyro--outer">
          <circle cx="360" cy="270" r="180" stroke="rgba(112, 186, 255, 0.18)" strokeWidth="1.5" strokeDasharray="30 20 10 20" />
          <circle cx="360" cy="90" r="5" fill="#70baff" className="pulse-dot" />
          <circle cx="540" cy="270" r="4" fill="#77d6b2" className="pulse-dot" />
        </g>
        <g className="hero-gyro-ring hero-gyro--mid">
          <circle cx="360" cy="270" r="130" stroke="rgba(119, 214, 178, 0.25)" strokeWidth="1" strokeDasharray="60 40" />
          <circle cx="360" cy="400" r="4.5" fill="#c7a6ff" className="pulse-dot" />
        </g>

        {/* Central Isometric Dev Cube Structure */}
        <g className="hero-isometric-cube" transform="translate(360, 270)">
          {/* Top Face */}
          <polygon
            points="0,-70 60,-35 0,0 -60,-35"
            fill="rgba(112, 186, 255, 0.12)"
            stroke="rgba(112, 186, 255, 0.7)"
            strokeWidth="1.5"
            className="cube-face cube-top"
          />
          {/* Left Face */}
          <polygon
            points="-60,-35 0,0 0,70 -60,35"
            fill="rgba(12, 17, 24, 0.85)"
            stroke="rgba(112, 186, 255, 0.45)"
            strokeWidth="1.5"
            className="cube-face cube-left"
          />
          {/* Right Face */}
          <polygon
            points="0,0 60,-35 60,35 0,70"
            fill="rgba(19, 36, 54, 0.6)"
            stroke="rgba(119, 214, 178, 0.5)"
            strokeWidth="1.5"
            className="cube-face cube-right"
          />
          {/* Inner Glyph */}
          <text x="0" y="24" textAnchor="middle" fill="#70baff" fontSize="13" fontFamily="DM Mono, monospace" fontWeight="700">
            {"{ code }"}
          </text>
        </g>

        {/* Floating Cyber Badges / Code Pills */}
        <g className="hero-floating-pill pill-a" transform="translate(130, 140)">
          <rect width="130" height="34" rx="8" fill="rgba(12, 17, 24, 0.85)" stroke="rgba(112, 186, 255, 0.3)" strokeWidth="1" />
          <circle cx="16" cy="17" r="4" fill="#77d6b2" />
          <text x="32" y="21" fill="#edf3f7" fontSize="11" fontFamily="DM Mono, monospace">React 18 & Vite</text>
        </g>

        <g className="hero-floating-pill pill-b" transform="translate(480, 110)">
          <rect width="138" height="34" rx="8" fill="rgba(12, 17, 24, 0.85)" stroke="rgba(119, 214, 178, 0.3)" strokeWidth="1" />
          <circle cx="16" cy="17" r="4" fill="#70baff" />
          <text x="32" y="21" fill="#edf3f7" fontSize="11" fontFamily="DM Mono, monospace">Node.js Engine</text>
        </g>

        <g className="hero-floating-pill pill-c" transform="translate(440, 390)">
          <rect width="144" height="34" rx="8" fill="rgba(12, 17, 24, 0.85)" stroke="rgba(199, 166, 255, 0.3)" strokeWidth="1" />
          <circle cx="16" cy="17" r="4" fill="#c7a6ff" />
          <text x="32" y="21" fill="#edf3f7" fontSize="11" fontFamily="DM Mono, monospace">Lua Automation</text>
        </g>

        {/* Tech Corner Crosshairs */}
        <g stroke="rgba(112, 186, 255, 0.4)" strokeWidth="1.5">
          <path d="M 90 75 L 75 75 L 75 90" />
          <path d="M 630 75 L 645 75 L 645 90" />
          <path d="M 90 465 L 75 465 L 75 450" />
          <path d="M 630 465 L 645 465 L 645 450" />
        </g>
      </svg>
    </div>
  );
}

/* ── Scroll Reveal Hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-unit ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Rotating Typewriter Hook ── */
function useTypingEffect(words, speed = 80, pause = 2200) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length === 0) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timer);
  }, [text, index, deleting, words, speed, pause]);

  return text;
}

/* ── Counter Animation ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, 35);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Project Dialog Modal ── */
function ProjectDialog({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <article
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="modal-badge-row">
          <span className="section-tag">{project.tags[0]}</span>
          <span className="modal-scope">PRODUCTION PROJECT</span>
        </div>
        <h2 id="modal-title">{project.title}</h2>
        <p className="modal-desc">{project.description}</p>

        {project.showcase?.length ? (
          <div className="modal-features-wrap">
            <h3>Key Capabilities</h3>
            <ul className="modal-feature-list">
              {project.showcase.map((item) => (
                <li key={item}>
                  <SparklesIcon size={14} className="feature-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="modal-tech-box">
          <h3>Built With</h3>
          <div className="modal-tag-cloud">
            {project.tags.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.links?.[0] ? (
          <a
            className="action-btn action-btn--primary"
            href={project.links[0].href}
            target={project.links[0].href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <span>{project.links[0].label}</span>
            <LaunchArrow size={16} />
          </a>
        ) : null}
      </article>
    </div>
  );
}

/* ── Main Component ── */
export default function Home({ entered = true }) {
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const filters = ["All", "Web", "Discord", "Roblox"];
  const filteredProjects =
    filter === "All"
      ? profile.projects
      : profile.projects.filter(
          (p) =>
            p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase())) ||
            p.title.toLowerCase().includes(filter.toLowerCase())
        );

  const timelineItems = [...profile.education, ...profile.experience];
  const typingRole = useTypingEffect(
    ["Fullstack Developer", "UI/UX Engineer", "Discord Bot Architect", "Roblox Lua Specialist"],
    75,
    2200
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* ── Fixed Navigation Bar ── */}
      <header className={`app-header ${scrolled ? "app-header--scrolled" : ""}`}>
        <nav className="header-nav-container" aria-label="Main Navigation">
          <a className="brand-monogram" href="#home" aria-label="Faisal Riza Home">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect x="1" y="1" width="32" height="32" rx="8" fill="rgba(112, 186, 255, 0.08)" stroke="rgba(112, 186, 255, 0.3)" strokeWidth="1.5" />
              <text x="17" y="22" textAnchor="middle" fill="#70baff" fontSize="13" fontWeight="800" fontFamily="DM Mono, monospace">
                FR
              </text>
            </svg>
            <span className="brand-text">
              Faisal<span className="brand-accent">.</span>
            </span>
          </a>

          <button
            className="mobile-nav-toggle"
            aria-label="Toggle Menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className={`burger-bar ${navOpen ? "bar-1--open" : ""}`} />
            <span className={`burger-bar ${navOpen ? "bar-2--open" : ""}`} />
          </button>

          <div className={`nav-link-list ${navOpen ? "nav-link-list--open" : ""}`}>
            {NAVIGATION_ITEMS.map(([label, id]) => (
              <a
                href={`#${id}`}
                key={id}
                className="nav-item-link"
                onClick={() => setNavOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            className="status-pill"
            href={profile.discordInvite}
            target="_blank"
            rel="noreferrer"
            title="Available for projects & roles"
          >
            <span className="status-orb" />
            <span className="status-label">OPEN FOR WORK</span>
          </a>
        </nav>
      </header>

      <main className="main-content-flow">
        {/* ── 01. Hero Section ── */}
        <section className="section-hero" id="home">
          <div className="hero-split-grid">
            <div className="hero-text-col">
              <Reveal>
                <div className="hero-eyebrow">
                  <span className="eyebrow-dot" />
                  FULLSTACK DEVELOPER // 2026
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="hero-headline">
                  Faisal
                  <span className="hero-name-stroke">Riza</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <div className="hero-interactive-role">
                  <span className="role-prefix">{">"} </span>
                  <span className="role-text">{typingRole}</span>
                  <span className="role-cursor">|</span>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <p className="hero-bio">
                  Crafting resilient web architectures, modern interface systems, automated Discord tools, and high-performance Lua code.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="hero-cta-group">
                  <a className="action-btn action-btn--primary" href="#projects">
                    <span>EXPLORE WORK</span>
                    <LaunchArrow size={16} />
                  </a>
                  <a
                    className="action-btn action-btn--ghost"
                    href={profile.discordInvite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>GET IN TOUCH</span>
                    <DiscordBrandIcon size={16} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={420}>
                <div className="hero-metric-strip">
                  <div className="metric-cell">
                    <strong className="metric-val">
                      <Counter target={profile.yearsExperience} suffix="+" />
                    </strong>
                    <span className="metric-key">Years Experience</span>
                  </div>
                  <div className="metric-cell">
                    <strong className="metric-val">
                      <Counter target={profile.projects.length} suffix="+" />
                    </strong>
                    <span className="metric-key">Completed Projects</span>
                  </div>
                  <div className="metric-cell">
                    <strong className="metric-val">
                      <Counter target={profile.skills.length} />
                    </strong>
                    <span className="metric-key">Core Technologies</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="hero-graphic-col">
              <Reveal delay={200}>
                <HeroGraphic />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 02. About Section ── */}
        <section className="section-block" id="about">
          <div className="section-index-col">
            <span className="section-num">01</span>
            <span className="section-subtext">PHILOSOPHY</span>
          </div>

          <div className="section-body-col">
            <Reveal>
              <h2 className="section-title">
                Engineered with precision.<br />
                Refined through <em>continuous creation.</em>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="section-desc-lead">{profile.about.join(" ")}</p>
            </Reveal>

            <Reveal delay={200}>
              <div className="value-cards-grid">
                <div className="value-card">
                  <div className="value-icon-box">
                    <CodeBracketsIcon size={22} />
                  </div>
                  <h3>Resilient Code</h3>
                  <p>Writing clean, maintainable, self-documenting code with modern standards and typed safety.</p>
                </div>

                <div className="value-card">
                  <div className="value-icon-box">
                    <LayersIcon size={22} />
                  </div>
                  <h3>Sharp UI & Motion</h3>
                  <p>Delivering fast, accessible interfaces with rich SVG graphics and intentional interactive motion.</p>
                </div>

                <div className="value-card">
                  <div className="value-icon-box">
                    <ServerStackIcon size={22} />
                  </div>
                  <h3>Full-Stack Systems</h3>
                  <p>Building everything from scalable Node.js backend pipelines to reliable cloud deployments on Vercel.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 03. Selected Projects ── */}
        <section className="section-block" id="projects">
          <div className="section-index-col">
            <span className="section-num">02</span>
            <span className="section-subtext">SELECTED WORK</span>
          </div>

          <div className="section-body-col">
            <div className="projects-header-bar">
              <Reveal>
                <h2 className="section-title">Featured Projects</h2>
              </Reveal>

              <Reveal delay={100}>
                <div className="filter-button-group" role="tablist">
                  {filters.map((item) => (
                    <button
                      key={item}
                      className={`filter-btn ${filter === item ? "filter-btn--active" : ""}`}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="projects-showcase-grid">
              {filteredProjects.map((project, idx) => (
                <Reveal key={project.title} delay={idx * 70}>
                  <article className={`project-item-card ${idx === 0 ? "project-item-card--featured" : ""}`}>
                    <div
                      className="project-thumb-frame"
                      onClick={() => setSelectedProject(project)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details of ${project.title}`}
                    >
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={`${project.title} preview`}
                          loading={idx > 1 ? "lazy" : "eager"}
                        />
                      ) : (
                        <div className="project-thumb-fallback">
                          <TerminalIcon size={36} />
                        </div>
                      )}
                      <div className="thumb-hover-overlay">
                        <span className="inspect-pill">
                          <span>INSPECT PROJECT</span>
                          <LaunchArrow size={14} />
                        </span>
                      </div>
                    </div>

                    <div className="project-detail-pane">
                      <div className="project-index-tag">
                        #{String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="project-text-content">
                        <h3 className="project-heading">{project.title}</h3>
                        <p className="project-snippet">{project.description}</p>
                        <div className="project-tag-row">
                          {project.tags.map((t) => (
                            <span key={t} className="project-mini-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                        {project.links?.[0] ? (
                          <a
                            className="project-direct-link"
                            href={project.links[0].href}
                            target={project.links[0].href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                          >
                            <span>{project.links[0].label}</span>
                            <LaunchArrow size={13} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04. Tech Stack ── */}
        <section className="section-block" id="skills">
          <div className="section-index-col">
            <span className="section-num">03</span>
            <span className="section-subtext">ARSENAL</span>
          </div>

          <div className="section-body-col">
            <Reveal>
              <h2 className="section-title">
                Technical Stack &<br />
                <em>Core Competencies</em>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="tech-category-grid">
                {Object.entries(TECH_CATEGORIES).map(([catName, techList]) => (
                  <div key={catName} className="tech-cat-card">
                    <div className="tech-cat-header">
                      <CpuChipIcon size={16} />
                      <h4>{catName}</h4>
                    </div>
                    <div className="tech-pills-wrap">
                      {techList.map((tech) => (
                        <div key={tech} className="tech-badge-chip">
                          <span className="chip-indicator" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 05. Journey & Experience ── */}
        <section className="section-block" id="journey">
          <div className="section-index-col">
            <span className="section-num">04</span>
            <span className="section-subtext">EXPERIENCE</span>
          </div>

          <div className="section-body-col">
            <Reveal>
              <h2 className="section-title">Timeline & Milestones</h2>
            </Reveal>

            <div className="timeline-ladder">
              {timelineItems.map((item, i) => (
                <Reveal key={`${item.period}-${item.title}`} delay={i * 60}>
                  <div className="timeline-node">
                    <div className="timeline-period-badge">{item.period}</div>
                    <div className="timeline-content-card">
                      <h3 className="timeline-role">{item.title}</h3>
                      <span className="timeline-sub">{item.subtitle}</span>
                      {item.details ? <p className="timeline-desc">{item.details}</p> : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06. GitHub / Open Source Strip ── */}
        <section className="github-cta-banner">
          <div className="github-cta-inner">
            <Reveal>
              <div className="section-tag">OPEN SOURCE & LABS</div>
              <h2 className="cta-headline">Explore source code, bots & experimental systems.</h2>
            </Reveal>
            <Reveal delay={150}>
              <a
                className="action-btn action-btn--primary"
                href={profile.socials[0].href}
                target="_blank"
                rel="noreferrer"
              >
                <GithubBrandIcon size={18} />
                <span>GITHUB REPOSITORIES</span>
                <LaunchArrow size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── 07. Contact Section ── */}
        <section className="section-block section-contact" id="contact">
          <div className="section-index-col">
            <span className="section-num">05</span>
            <span className="section-subtext">INITIATE</span>
          </div>

          <div className="section-body-col">
            <Reveal>
              <h2 className="contact-huge-title">
                Let's Build<br />
                <em>Something Great.</em>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="contact-lead">
                Open for full-time roles, freelance opportunities, discord automation, and web application builds.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="contact-buttons-row">
                <a
                  className="action-btn action-btn--discord"
                  href={profile.discordInvite}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DiscordBrandIcon size={20} />
                  <div className="discord-btn-text">
                    <small>CHAT ON DISCORD</small>
                    <strong>@voixera</strong>
                  </div>
                  <LaunchArrow size={16} />
                </a>

                <a
                  className="action-btn action-btn--ghost"
                  href="mailto:rizafaisal173@gmail.com"
                >
                  <span>SEND DIRECT EMAIL</span>
                  <LaunchArrow size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── App Footer ── */}
      <footer className="app-footer">
        <div className="footer-inner-container">
          <div className="footer-identity">
            <strong>FAISAL RIZA</strong>
            <span>FULLSTACK DEVELOPER // EAST JAVA, INDONESIA</span>
          </div>

          <div className="footer-social-links">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-social-item">
                {s.label}
              </a>
            ))}
          </div>

          <div className="footer-copyright">
            <span>© 2026 FAISAL RIZA. CRAFTED WITH REACT & BESPOKE SVGS.</span>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
