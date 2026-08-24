import { useState, useEffect, useRef } from "react";
import { profile } from "../content/profile";
import Hero3DScene from "../components/Hero3DScene";
import {
  CodeIcon,
  TerminalIcon,
  LayersIcon,
  CpuChipIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LaunchArrow,
  ArrowDownIcon,
  GithubBrandIcon,
  DiscordBrandIcon,
  MailBrandIcon,
  LinkedInBrandIcon,
  SectionDecorSVG,
} from "../components/CustomIcons";

const NAV_ITEMS = [
  ["Home", "home"],
  ["About", "about"],
  ["Expertise", "services"],
  ["Stack", "skills"],
  ["Projects", "projects"],
  ["Journey", "journey"],
  ["Contact", "contact"],
];

const SKILL_DOMAINS = [
  {
    title: "Frontend Engineering",
    desc: "Crafting performant web interfaces with fluid rendering, component isolation, and accessibility.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "HTML5/CSS3"],
  },
  {
    title: "Backend & Systems",
    desc: "Architecting reliable API routes, asynchronous workers, and scalable data layers.",
    tools: ["Node.js", "Express", "PHP", "PostgreSQL", "MongoDB", "SQL"],
  },
  {
    title: "Scripting & Automation",
    desc: "Building Discord bot systems, game automation pipelines, and CLI dev tools.",
    tools: ["Lua / Luau", "Discord.js", "Roblox Studio", "Git", "Vercel", "Linux"],
  },
];

const SERVICES_LIST = [
  {
    icon: CodeIcon,
    title: "Custom Web Application Development",
    desc: "Full-cycle web application delivery from responsive interactive frontend to serverless backend endpoints and database schemas.",
  },
  {
    icon: TerminalIcon,
    title: "Discord Bot Systems & Automation",
    desc: "Robust bots with slash commands, ticketing architectures, role automation, security gates, and webhook integrations.",
  },
  {
    icon: LayersIcon,
    title: "Lua Scripting & Game Utilities",
    desc: "High-performance Luau scripts, GUI components, and automation tools engineered for clean execution and zero latency.",
  },
  {
    icon: ServerStackIcon,
    title: "Performance & UI/UX Optimization",
    desc: "Refining web speed, smooth 60fps micro-interactions, responsive mobile views, and search engine metadata compliance.",
  },
];

/* ── Scroll Reveal Component ── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-box ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Rotating Typewriter ── */
function useTypewriter(phrases, speed = 80, pause = 2400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = phrases[idx];
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
            setIdx((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timer);
  }, [text, idx, deleting, phrases, speed, pause]);

  return text;
}

/* ── Interactive Project Case Modal ── */
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="case-modal-overlay" role="presentation" onClick={onClose}>
      <article
        className="case-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="case-modal-close" onClick={onClose} aria-label="Close dialog">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="case-modal-tagline">
          <span className="case-tag-lead">{project.tags[0]}</span>
          <span className="case-tag-type">PRODUCTION SYSTEM</span>
        </div>

        <h2 id="case-modal-title" className="case-modal-title">{project.title}</h2>
        <p className="case-modal-summary">{project.description}</p>

        {project.showcase?.length ? (
          <div className="case-section-block">
            <h3 className="case-subhead">System Capabilities & Modules</h3>
            <ul className="case-feature-grid">
              {project.showcase.map((item) => (
                <li key={item}>
                  <SparklesIcon size={14} className="case-sparkle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="case-section-block">
          <h3 className="case-subhead">Engineering Stack</h3>
          <div className="case-pill-cloud">
            {project.tags.map((t) => (
              <span key={t} className="case-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.links?.[0] ? (
          <div className="case-modal-actions">
            <a
              className="studio-btn studio-btn--primary"
              href={project.links[0].href}
              target={project.links[0].href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <span>{project.links[0].label}</span>
              <LaunchArrow size={16} />
            </a>
          </div>
        ) : null}
      </article>
    </div>
  );
}

/* ── Main Portfolio Page ── */
export default function Home({ entered = true }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const filters = ["All", "Web", "Discord", "Roblox"];
  const displayProjects =
    activeFilter === "All"
      ? profile.projects
      : profile.projects.filter(
          (p) =>
            p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
            p.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const typedRole = useTypewriter(
    ["Fullstack Developer", "UI/UX Systems Engineer", "Discord Bot Architect", "Lua Specialist"],
    70,
    2200
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="studio-layout">
      {/* Background SVG Grid Pattern */}
      <svg className="studio-bg-grid" width="100%" height="100%" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 70 0 L 0 0 0 70" fill="none" stroke="rgba(112, 186, 255, 0.045)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* ── Navigation Bar ── */}
      <header className={`studio-nav-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="studio-nav-container">
          <a className="studio-brand" href="#home">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="34" height="34" rx="10" fill="rgba(112, 186, 255, 0.08)" stroke="rgba(112, 186, 255, 0.3)" strokeWidth="1.5" />
              <text x="18" y="23" textAnchor="middle" fill="#70baff" fontSize="13" fontWeight="800" fontFamily="DM Mono, monospace">
                FR
              </text>
            </svg>
            <span className="studio-brand-title">
              faisal<span className="brand-dot">.</span>riza
            </span>
          </a>

          <button
            className="studio-mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`toggle-line ${mobileMenuOpen ? "line-open-1" : ""}`} />
            <span className={`toggle-line ${mobileMenuOpen ? "line-open-2" : ""}`} />
          </button>

          <nav className={`studio-nav-links ${mobileMenuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            {NAV_ITEMS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="studio-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="studio-nav-status">
            <a
              className="status-chip"
              href={profile.discordInvite}
              target="_blank"
              rel="noreferrer"
            >
              <span className="status-blinker" />
              <span>AVAILABLE FOR HIRE</span>
            </a>
          </div>
        </div>
      </header>

      <main className="studio-main-flow">
        {/* ── 01. HERO SECTION ── */}
        <section className="hero-studio-section" id="home">
          <div className="hero-studio-grid">
            <div className="hero-copy-col">
              <Reveal>
                <div className="hero-pill-badge">
                  <span className="pill-dot" />
                  FULLSTACK ENGINEER // PORTFOLIO 2026
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="hero-massive-headline">
                  Engineering
                  <span className="headline-hollow">Resilient</span>
                  Digital Systems.
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <div className="hero-dynamic-role">
                  <span className="role-glyph">{">"}</span>
                  <span className="role-current">{typedRole}</span>
                  <span className="role-caret">_</span>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="hero-explanatory-lead">
                  I design and build production-ready web experiences, scalable Discord bot infrastructures, and high-precision automation tools with meticulous craftsmanship.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <div className="hero-button-row">
                  <a className="studio-btn studio-btn--primary" href="#projects">
                    <span>EXPLORE PROJECTS</span>
                    <LaunchArrow size={16} />
                  </a>
                  <a
                    className="studio-btn studio-btn--secondary"
                    href={profile.discordInvite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>CONNECT ON DISCORD</span>
                    <DiscordBrandIcon size={16} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="hero-stats-band">
                  <div className="stat-unit">
                    <strong>3+</strong>
                    <span>Years Active</span>
                  </div>
                  <div className="stat-unit">
                    <strong>{profile.projects.length}+</strong>
                    <span>Production Builds</span>
                  </div>
                  <div className="stat-unit">
                    <strong>100%</strong>
                    <span>Crafted With Code</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="hero-3d-col">
              <Reveal delay={150}>
                <div className="hero-scene-wrapper">
                  <Hero3DScene />
                  <div className="hero-scene-badge">
                    <span className="scene-coord">XYZ // 3D CANVAS</span>
                    <span className="scene-hint">INTERACTIVE ORBIT</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="hero-scroll-cue" aria-hidden="true">
            <a href="#about" className="scroll-cue-link" aria-label="Scroll to About section">
              <span>EXPLORE</span>
              <ArrowDownIcon size={14} />
            </a>
          </div>
        </section>

        {/* ── 02. ABOUT SECTION ── */}
        <section className="content-section" id="about">
          <div className="section-rail">
            <span className="rail-number">01</span>
            <span className="rail-label">ABOUT</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="section-headline">
                Crafted through practice.<br />
                Driven by <em>pure curiosity.</em>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="about-editorial-text">
                <p>{profile.about[0]}</p>
                <p>{profile.about[1]} {profile.about[2]}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-icon-box">
                    <CodeIcon size={22} />
                  </div>
                  <h3>Modular & Pure</h3>
                  <p>Writing deterministic, typed, and well-structured code without bloated abstractions or fragile dependencies.</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon-box">
                    <LayersIcon size={22} />
                  </div>
                  <h3>Modern Interaction</h3>
                  <p>Building responsive interfaces with thoughtful 3D canvas physics, custom vector SVG graphics, and 60fps motion.</p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon-box">
                    <ShieldCheckIcon size={22} />
                  </div>
                  <h3>Reliable Operations</h3>
                  <p>End-to-end delivery from database architecture and permission-safe Discord bot servers to automated workflows.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 03. SERVICES / WHAT I DO ── */}
        <section className="content-section" id="services">
          <div className="section-rail">
            <span className="rail-number">02</span>
            <span className="rail-label">SERVICES</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="section-headline">
                Specialized Technical<br />
                <em>Capabilities & Services</em>
              </h2>
            </Reveal>

            <div className="services-showcase-grid">
              {SERVICES_LIST.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <Reveal key={service.title} delay={idx * 80}>
                    <div className="service-card">
                      <div className="service-header">
                        <div className="service-icon-wrap">
                          <IconComponent size={20} />
                        </div>
                        <span className="service-num">0{idx + 1}</span>
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-desc">{service.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 04. SKILLS & TECHNOLOGIES ── */}
        <section className="content-section" id="skills">
          <div className="section-rail">
            <span className="rail-number">03</span>
            <span className="rail-label">ARSENAL</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="section-headline">
                Tools & Technologies<br />
                <em>Used in Production</em>
              </h2>
            </Reveal>

            <div className="skills-domain-grid">
              {SKILL_DOMAINS.map((domain, idx) => (
                <Reveal key={domain.title} delay={idx * 100}>
                  <div className="domain-card">
                    <div className="domain-header">
                      <CpuChipIcon size={18} />
                      <h3>{domain.title}</h3>
                    </div>
                    <p className="domain-desc">{domain.desc}</p>
                    <div className="domain-chips-flex">
                      {domain.tools.map((t) => (
                        <span key={t} className="tech-chip">
                          <span className="tech-chip-dot" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05. FEATURED PROJECTS ── */}
        <section className="content-section" id="projects">
          <div className="section-rail">
            <span className="rail-number">04</span>
            <span className="rail-label">PROJECTS</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <div className="projects-top-bar">
              <Reveal>
                <h2 className="section-headline">Selected Projects</h2>
              </Reveal>

              <Reveal delay={100}>
                <div className="project-filter-dock">
                  {filters.map((f) => (
                    <button
                      key={f}
                      className={`filter-dock-btn ${activeFilter === f ? "is-active" : ""}`}
                      onClick={() => setActiveFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="editorial-projects-stack">
              {displayProjects.map((project, idx) => (
                <Reveal key={project.title} delay={idx * 70}>
                  <article className={`editorial-project-row ${idx % 2 === 1 ? "row-reversed" : ""}`}>
                    <div
                      className="project-visual-frame"
                      onClick={() => setSelectedCase(project)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open details for ${project.title}`}
                    >
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={`${project.title} thumbnail`}
                          loading={idx > 1 ? "lazy" : "eager"}
                          className="project-image"
                        />
                      ) : (
                        <div className="project-fallback-visual">
                          <TerminalIcon size={40} />
                        </div>
                      )}
                      <div className="visual-inspect-banner">
                        <span>INSPECT CASE STUDY</span>
                        <LaunchArrow size={14} />
                      </div>
                    </div>

                    <div className="project-narrative-box">
                      <div className="project-index-badge">
                        <span>CASE #{String(idx + 1).padStart(2, "0")}</span>
                        <span className="project-tag-accent">{project.tags[0]}</span>
                      </div>

                      <h3 className="project-title-large">{project.title}</h3>
                      <p className="project-summary-text">{project.description}</p>

                      <div className="project-tags-cloud">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-tag-item">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="project-links-row">
                        <button
                          type="button"
                          className="studio-text-action"
                          onClick={() => setSelectedCase(project)}
                        >
                          <span>OVERVIEW</span>
                          <LaunchArrow size={14} />
                        </button>

                        {project.links?.[0] ? (
                          <a
                            className="studio-text-action studio-text-action--dim"
                            href={project.links[0].href}
                            target={project.links[0].href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                          >
                            <span>{project.links[0].label}</span>
                            <LaunchArrow size={14} />
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

        {/* ── 06. EXPERIENCE & JOURNEY ── */}
        <section className="content-section" id="journey">
          <div className="section-rail">
            <span className="rail-number">05</span>
            <span className="rail-label">JOURNEY</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="section-headline">
                Milestones &<br />
                <em>Professional Experience</em>
              </h2>
            </Reveal>

            <div className="journey-timeline">
              {[...profile.experience, ...profile.education].map((item, idx) => (
                <Reveal key={`${item.period}-${item.title}`} delay={idx * 60}>
                  <div className="timeline-entry">
                    <div className="timeline-time-col">
                      <span className="timeline-period-pill">{item.period}</span>
                    </div>
                    <div className="timeline-body-col">
                      <h3 className="timeline-role-title">{item.title}</h3>
                      <span className="timeline-role-subtitle">{item.subtitle}</span>
                      {item.details ? <p className="timeline-role-desc">{item.details}</p> : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07. GITHUB STRIP ── */}
        <section className="github-highlight-band">
          <div className="github-band-content">
            <Reveal>
              <div className="band-lead-tag">OPEN LABS</div>
              <h2 className="band-headline">Source Code, Bots & Experiments</h2>
              <p className="band-desc">All open-source contributions and architecture prototypes are maintained publicly on GitHub.</p>
            </Reveal>
            <Reveal delay={150}>
              <a
                className="studio-btn studio-btn--primary"
                href={profile.socials[0].href}
                target="_blank"
                rel="noreferrer"
              >
                <GithubBrandIcon size={18} />
                <span>EXPLORE VOIXERA REPOSITORIES</span>
                <LaunchArrow size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── 08. CONTACT SECTION ── */}
        <section className="content-section section-contact-studio" id="contact">
          <div className="section-rail">
            <span className="rail-number">06</span>
            <span className="rail-label">CONTACT</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="contact-huge-headline">
                Let's Build<br />
                <em>Something Distinct.</em>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="contact-sub-lead">
                I am currently open for fullstack engineering roles, freelance builds, Discord bot systems, and technical consulting.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="contact-action-dock">
                <a
                  className="contact-card-btn contact-card-btn--discord"
                  href={profile.discordInvite}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="contact-btn-icon">
                    <DiscordBrandIcon size={24} />
                  </div>
                  <div className="contact-btn-text">
                    <small>DIRECT MESSAGE // DISCORD</small>
                    <strong>@voixera</strong>
                  </div>
                  <LaunchArrow size={18} className="contact-arrow" />
                </a>

                <a
                  className="contact-card-btn contact-card-btn--email"
                  href="mailto:rizafaisal173@gmail.com"
                >
                  <div className="contact-btn-icon">
                    <MailBrandIcon size={24} />
                  </div>
                  <div className="contact-btn-text">
                    <small>EMAIL INQUIRIES</small>
                    <strong>rizafaisal173@gmail.com</strong>
                  </div>
                  <LaunchArrow size={18} className="contact-arrow" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Studio Footer ── */}
      <footer className="studio-footer">
        <div className="footer-content-wrap">
          <div className="footer-identity-col">
            <strong className="footer-name">FAISAL RIZA</strong>
            <span className="footer-role">FULLSTACK & SYSTEMS DEVELOPER // JAWA TIMUR, ID</span>
          </div>

          <div className="footer-socials-col">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-nav-item">
                {s.label}
              </a>
            ))}
          </div>

          <div className="footer-bottom-col">
            <span>© 2026 FAISAL RIZA. DESIGNED WITH PRECISION, THREE.JS & BESPOKE SVGS.</span>
          </div>
        </div>
      </footer>

      {/* Case Study Modal */}
      <ProjectModal project={selectedCase} onClose={() => setSelectedCase(null)} />
    </div>
  );
}
