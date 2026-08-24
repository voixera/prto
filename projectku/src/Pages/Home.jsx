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
    category: "FRONTEND ARCHITECTURE",
    desc: "Component-driven, accessible UI systems built with strict typing and micro-interactions.",
    skills: [
      { name: "React", level: "Primary", tag: "v18+" },
      { name: "Next.js", level: "Production", tag: "App Router" },
      { name: "TypeScript", level: "Strict", tag: "Typed" },
      { name: "Tailwind CSS", level: "Advanced", tag: "Design System" },
      { name: "Three.js", level: "Interactive", tag: "WebGL" },
      { name: "HTML5 / CSS3", level: "Semantic", tag: "Native" },
    ],
  },
  {
    category: "BACKEND & DATABASES",
    desc: "Robust API services, authentication protocols, and low-latency database queries.",
    skills: [
      { name: "Node.js", level: "Runtime", tag: "Async Engine" },
      { name: "Express", level: "Services", tag: "REST APIs" },
      { name: "PostgreSQL", level: "Relational", tag: "SQL" },
      { name: "MongoDB", level: "Document", tag: "NoSQL" },
      { name: "PHP", level: "Legacy/Server", tag: "Backend" },
      { name: "Vercel", level: "Deployment", tag: "Serverless" },
    ],
  },
  {
    category: "SYSTEM AUTOMATION & LUA",
    desc: "Real-time bot infrastructures, secure game script logic, and developer tooling.",
    skills: [
      { name: "Lua / Luau", level: "Specialist", tag: "Game & CLI" },
      { name: "Discord.js", level: "Architect", tag: "Bot Systems" },
      { name: "Git", level: "VCS", tag: "Version Control" },
      { name: "Roblox Studio", level: "Engine", tag: "Luau Execution" },
      { name: "Figma", level: "Wireframing", tag: "Prototyping" },
      { name: "Linux / CLI", level: "Environment", tag: "POSIX" },
    ],
  },
];

const SERVICES_LIST = [
  {
    num: "01",
    icon: CodeIcon,
    title: "Fullstack Web Engineering",
    desc: "End-to-end development of bespoke, fast-loading web applications with React, Next.js, and serverless Node.js architecture.",
    tags: ["React", "Next.js", "TypeScript", "REST APIs"],
  },
  {
    num: "02",
    icon: TerminalIcon,
    title: "Discord Bot Ecosystems",
    desc: "Permission-aware automation, community management bots, store ticketing workflows, and webhook integrations with high reliability.",
    tags: ["Discord.js", "Node.js", "Slash Commands", "Async Queue"],
  },
  {
    num: "03",
    icon: LayersIcon,
    title: "Lua Scripting & Game Logic",
    desc: "Custom Luau systems, runtime game optimizations, UI panels, and automation tools built with clean, maintainable script organization.",
    tags: ["Luau", "Roblox Engine", "GUI Frameworks", "Automation"],
  },
  {
    num: "04",
    icon: ServerStackIcon,
    title: "Performance & UI Systems",
    desc: "Auditing web performance, fluid 60fps animations, vector SVG art direction, responsive cross-device layouts, and SEO compliance.",
    tags: ["WebGL", "Bespoke SVGs", "A11y", "Responsive"],
  },
];

/* ── Scroll Reveal Hook ── */
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
function useTypewriter(phrases, speed = 70, pause = 2200) {
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

/* ── Case Study Modal ── */
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
        <button className="case-modal-close" onClick={onClose} aria-label="Close case study details">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="case-modal-tagline">
          <span className="case-tag-lead">{project.tags[0]}</span>
          <span className="case-tag-type">PRODUCTION ARCHITECTURE</span>
        </div>

        <h2 id="case-modal-title" className="case-modal-title">{project.title}</h2>
        <p className="case-modal-summary">{project.description}</p>

        {project.showcase?.length ? (
          <div className="case-section-block">
            <h3 className="case-subhead">System Architecture & Features</h3>
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
          <h3 className="case-subhead">Technology Stack</h3>
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

/* ── Main Component ── */
export default function Home({ entered = true }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

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
    ["Fullstack Developer", "UI Systems Engineer", "Discord Bot Architect", "Lua Specialist"],
    70,
    2200
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyDiscord = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText("voixera");
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2400);
  };

  return (
    <div className="studio-layout">
      {/* Background Architectural Vector Overlay */}
      <svg className="studio-bg-grid" width="100%" height="100%" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(112, 186, 255, 0.035)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* ── Navigation Bar ── */}
      <header className={`studio-nav-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="studio-nav-container">
          <a className="studio-brand" href="#home" aria-label="Faisal Riza Homepage">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="32" height="32" rx="8" fill="rgba(112, 186, 255, 0.08)" stroke="rgba(112, 186, 255, 0.35)" strokeWidth="1.5" />
              <text x="17" y="22" textAnchor="middle" fill="#70baff" fontSize="13" fontWeight="800" fontFamily="DM Mono, monospace">
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
              <span>AVAILABLE // 2026</span>
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
                  FULLSTACK DEVELOPER & SYSTEMS CREATOR
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="hero-massive-headline">
                  Faisal
                  <span className="headline-hollow">Riza</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <div className="hero-dynamic-role">
                  <span className="role-glyph">{">"}</span>
                  <span className="role-current">{typedRole}</span>
                  <span className="role-caret">_</span>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <p className="hero-explanatory-lead">
                  I construct responsive web applications, high-concurrency Discord bot platforms, and performance-tuned Lua automation scripts with architectural discipline.
                </p>
              </Reveal>

              <Reveal delay={340}>
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
                    <span>OPEN DISCORD</span>
                    <DiscordBrandIcon size={16} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={420}>
                <div className="hero-stats-band">
                  <div className="stat-unit">
                    <strong>3+</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="stat-unit">
                    <strong>{profile.projects.length}+</strong>
                    <span>Shipped Projects</span>
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
                    <span className="scene-coord">XYZ // THREE.JS ENGINE</span>
                    <span className="scene-hint">CURSOR-REACTIVE ORBIT</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="hero-scroll-cue" aria-hidden="true">
            <a href="#about" className="scroll-cue-link" aria-label="Scroll down to About section">
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
                Built from curiosity.<br />
                Refined through <em>practice.</em>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="about-editorial-text">
                <p>
                  I'm an Information System student at Universitas Terbuka (UT) and a software developer focused on modern UI engineering, backend logic, and scalable interactive applications.
                </p>
                <p>
                  Whether architecting permission-aware Discord bot systems, crafting fullstack web portals, or engineering Luau scripting frameworks, my workflow prioritizes clarity, performance, and clean code.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="about-meta-grid">
                <div className="meta-box">
                  <span className="meta-box-label">LOCATION</span>
                  <strong className="meta-box-val">Jawa Timur, Indonesia</strong>
                </div>
                <div className="meta-box">
                  <span className="meta-box-label">FOCUS</span>
                  <strong className="meta-box-val">Fullstack & Bot Automation</strong>
                </div>
                <div className="meta-box">
                  <span className="meta-box-label">PRIMARY TOOLS</span>
                  <strong className="meta-box-val">React, Node.js, Lua</strong>
                </div>
                <div className="meta-box">
                  <span className="meta-box-label">STATUS</span>
                  <strong className="meta-box-val">Available for Opportunities</strong>
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
                <em>Capabilities</em>
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
                          <IconComponent size={22} />
                        </div>
                        <span className="service-num">{service.num}</span>
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-desc">{service.desc}</p>
                      <div className="service-tags">
                        {service.tags.map((t) => (
                          <span key={t} className="service-tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 04. SKILLS & ARSENAL ── */}
        <section className="content-section" id="skills">
          <div className="section-rail">
            <span className="rail-number">03</span>
            <span className="rail-label">ARSENAL</span>
            <SectionDecorSVG />
          </div>

          <div className="section-main">
            <Reveal>
              <h2 className="section-headline">
                Technical Systems &<br />
                <em>Tooling</em>
              </h2>
            </Reveal>

            <div className="skills-domain-grid">
              {SKILL_DOMAINS.map((domain, idx) => (
                <Reveal key={domain.category} delay={idx * 100}>
                  <div className="domain-card">
                    <div className="domain-header">
                      <CpuChipIcon size={18} />
                      <h3>{domain.category}</h3>
                    </div>
                    <p className="domain-desc">{domain.desc}</p>
                    <div className="domain-items-list">
                      {domain.skills.map((skill) => (
                        <div key={skill.name} className="domain-item-row">
                          <div className="domain-item-left">
                            <span className="domain-dot" />
                            <strong>{skill.name}</strong>
                          </div>
                          <div className="domain-item-right">
                            <span className="domain-tag">{skill.tag}</span>
                            <span className="domain-level">{skill.level}</span>
                          </div>
                        </div>
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
                      aria-label={`Open case overview for ${project.title}`}
                    >
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={`${project.title} preview`}
                          loading={idx > 1 ? "lazy" : "eager"}
                          className="project-image"
                        />
                      ) : (
                        <div className="project-fallback-visual">
                          <TerminalIcon size={40} />
                        </div>
                      )}
                      <div className="visual-inspect-banner">
                        <span>INSPECT CASE OVERVIEW</span>
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

        {/* ── 06. EXPERIENCE & TIMELINE ── */}
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
                <em>Experience</em>
              </h2>
            </Reveal>

            <div className="journey-timeline">
              {[...profile.experience, ...profile.education].map((item, idx) => (
                <Reveal key={`${item.period}-${item.title}`} delay={idx * 60}>
                  <div className="timeline-entry">
                    <div className="timeline-period-pill">{item.period}</div>
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
              <p className="band-desc">All open-source contributions and automation systems are maintained publicly on GitHub.</p>
            </Reveal>
            <Reveal delay={150}>
              <a
                className="studio-btn studio-btn--primary"
                href={profile.socials[0].href}
                target="_blank"
                rel="noreferrer"
              >
                <GithubBrandIcon size={18} />
                <span>EXPLORE GITHUB</span>
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
                I am currently open for engineering roles, freelance software builds, Discord bot architectures, and technical collaborations.
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

                <button
                  type="button"
                  className="contact-card-btn contact-card-btn--copy"
                  onClick={handleCopyDiscord}
                >
                  <div className="contact-btn-icon">
                    <SparklesIcon size={22} />
                  </div>
                  <div className="contact-btn-text">
                    <small>DISCORD USERNAME</small>
                    <strong>{copiedDiscord ? "COPIED TO CLIPBOARD!" : "voixera (CLICK TO COPY)"}</strong>
                  </div>
                  <LaunchArrow size={18} className="contact-arrow" />
                </button>

                <a
                  className="contact-card-btn contact-card-btn--email"
                  href="mailto:rizafaisal173@gmail.com"
                >
                  <div className="contact-btn-icon">
                    <MailBrandIcon size={24} />
                  </div>
                  <div className="contact-btn-text">
                    <small>DIRECT INQUIRY</small>
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
            <span>© 2026 FAISAL RIZA. ARCHITECTED WITH REACT & THREE.JS.</span>
          </div>
        </div>
      </footer>

      {/* Case Study Dialog Modal */}
      <ProjectModal project={selectedCase} onClose={() => setSelectedCase(null)} />
    </div>
  );
}
