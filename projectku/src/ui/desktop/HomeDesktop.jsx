import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../../components/Reveal";
import Showcase from "../../components/Showcase";
import AvatarPlaceholder from "../../components/AvatarPlaceholder";
import AnimatedProfileMeta from "../../components/AnimatedProfileMeta";
import EducationTimeline from "../../components/EducationTimeline";
import HighlightText from "../../components/HighlightText";
import TypingCodeBlock from "../../components/TypingCodeBlock";
import { GithubIcon, LinkedinIcon, MailIcon as MailIcon2 } from "../../components/Icons";
import { profile } from "../../content/profile";

const ROLE_PHRASES = ["Fullstack Developer", "Web Development", "Roblox Studio Scripting", "Discord Bot Development", "Cybersecurity Beginner"];
const EDU_DECOR_TAGS = ["Self-Taught", "Web Dev", "Bots", "Scripting"];
const EXPERIENCE_DECOR_TAGS = ["Lua", "Luau", "Roblox Studio", "Figma"];
const FAQ_ITEMS = [
  {
    question: "What is a Full Stack Developer?",
    answer: (
      <>
        A Full Stack Developer can work across both <b>Frontend</b> (UI/UX,
        web interfaces) and <b>Backend</b> (servers, APIs, databases).
        It does not always mean mastering everything, but it does mean
        understanding the end-to-end flow of an application.
      </>
    ),
  },
  {
    question: "What is the difference between Frontend and Backend?",
    answer: (
      <>
        Frontend focuses on the interface and user interactions. Backend
        focuses on application logic, authentication, data storage, and
        the APIs used by the frontend.
      </>
    ),
  },
  {
    question: "Which technologies are used most often?",
    answer: (
      <>
        Most often: <b>React</b> + <b>Vite</b> / <b>Next.js</b> for frontend,{" "}
        <b>Tailwind CSS</b> / CSS for styling, and <b>Node.js</b> for backend
        needs or tooling. For data, the stack usually uses <b>MongoDB</b> / SQL,
        with <b>Three.js</b> sometimes added for interactive visuals.
      </>
    ),
  },
  {
    question: "Can the projects be tried as demos?",
    answer: (
      <>
        Yes. Go to the <b>Projects</b> section, then click <b>Open Web</b> / <b>Open App</b>{" "}
        on a project card. Example demo:{" "}
        <code className="inlineCode">helloenglish.vercel.app</code>.
      </>
    ),
  },
];

function socialIcon(label) {
  const lower = label.toLowerCase();
  if (lower.includes("github")) return GithubIcon;
  if (lower.includes("linkedin")) return LinkedinIcon;
  if (lower.includes("email") || lower.includes("mail")) return MailIcon2;
  return null;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function useRotatingTypewriter(
  phrases,
  {
    typeMs = 36,
    pauseMs = 820,
    resetMs = 520,
    startDelayMs = 420,
  } = {}
) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    if (!phrases?.length) {
      setText("");
      setPhase("typing");
      return;
    }

    const phrase = phrases[idx] ?? "";

    if (prefersReducedMotion()) {
      setText(phrase);
      setPhase("complete");
      return;
    }

    let timeoutId = 0;

    if (text.length < phrase.length) {
      setPhase("typing");
      timeoutId = window.setTimeout(() => {
        setText(phrase.slice(0, text.length + 1));
      }, text.length === 0 ? startDelayMs : typeMs);
    } else {
      setPhase("complete");
      timeoutId = window.setTimeout(() => {
        setPhase("reset");
        timeoutId = window.setTimeout(() => {
          setText("");
          setIdx((v) => (v + 1) % phrases.length);
          setPhase("typing");
        }, resetMs);
      }, pauseMs);
    }

    return () => window.clearTimeout(timeoutId);
  }, [phrases, idx, text, typeMs, pauseMs, resetMs, startDelayMs]);

  return { text, phase };
}

function RotatingTypeLine({ phrases = ROLE_PHRASES }) {
  const { text: typedRole, phase } = useRotatingTypewriter(phrases);
  return (
    <p className={`typeLine typeLine--${phase}`}>
      <span className="typeText">{typedRole}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}

function FaqItem({ question, children, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef(null);
  const [bodyHeight, setBodyHeight] = useState(0);
  const answerId = `faq-answer-${index}`;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const updateHeight = () => {
      setBodyHeight(el.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [children, isOpen]);

  return (
    <article
      className={`faqItem${isOpen ? " isOpen" : ""}`}
      style={{
        "--faq-body-height": `${bodyHeight}px`,
        "--faq-index": index,
      }}
    >
      <button
        type="button"
        className="faqQ"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="faqQText">{question}</span>
        <span className="faqIcon" aria-hidden="true" />
      </button>
      <div className="faqAOuter" id={answerId} aria-hidden={!isOpen}>
        <div className="faqA muted" ref={bodyRef}>
          {children}
        </div>
      </div>
    </article>
  );
}

export default function HomeDesktop({ rootClassName = "homeRoot homeRoot--desktop" }) {
  const aboutText = useMemo(() => profile.about.join(" "), []);
  const aboutBadges = useMemo(() => profile.aboutBadges?.slice(0, 3) ?? [], []);
  const [timelineMode, setTimelineMode] = useState("education");
  const visibleSocials = useMemo(
    () => profile.socials.slice(0, 3),
    []
  );
  const isExperienceMode = timelineMode === "experience";
  const timelineItems = isExperienceMode ? profile.experience ?? [] : profile.education ?? [];
  const timelineTags = isExperienceMode ? EXPERIENCE_DECOR_TAGS : EDU_DECOR_TAGS;

  const heroDecoRef = useRef(null);
  const heroTiltRafRef = useRef(0);
  const heroTiltTargetRef = useRef({ x: 0, y: 0 });
  const heroTiltCurrentRef = useRef({ x: 0, y: 0 });

  const tiltEnabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    return !reduce && !coarse;
  }, []);

  const setHeroDecoVars = (x, y) => {
    const el = heroDecoRef.current;
    if (!el) return;

    const tiltX = (-y * 9).toFixed(2);
    const tiltY = (x * 11).toFixed(2);
    const moveX = (x * 24).toFixed(1);
    const moveY = (y * 16).toFixed(1);
    const glowX = `${(x * 18 + 50).toFixed(2)}%`;
    const glowY = `${(y * 18 + 50).toFixed(2)}%`;

    el.style.setProperty("--heroTiltX", `${tiltX}deg`);
    el.style.setProperty("--heroTiltY", `${tiltY}deg`);
    el.style.setProperty("--heroShiftX", `${moveX}px`);
    el.style.setProperty("--heroShiftY", `${moveY}px`);
    el.style.setProperty("--heroGlowX", glowX);
    el.style.setProperty("--heroGlowY", glowY);
  };

  const tickHeroTilt = () => {
    const current = heroTiltCurrentRef.current;
    const target = heroTiltTargetRef.current;

    current.x += (target.x - current.x) * 0.1;
    current.y += (target.y - current.y) * 0.1;

    setHeroDecoVars(current.x, current.y);

    const done =
      Math.abs(target.x - current.x) < 0.0008 && Math.abs(target.y - current.y) < 0.0008;

    if (done) {
      heroTiltRafRef.current = 0;
      return;
    }

    heroTiltRafRef.current = requestAnimationFrame(tickHeroTilt);
  };

  const onHeroPointerMove = (e) => {
    if (!tiltEnabled) return;
    const el = heroDecoRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = Math.max(-1, Math.min(1, px * 2 - 1));
    const y = Math.max(-1, Math.min(1, py * 2 - 1));

    heroTiltTargetRef.current = { x, y };
    if (!heroTiltRafRef.current) heroTiltRafRef.current = requestAnimationFrame(tickHeroTilt);
  };

  const onHeroPointerLeave = () => {
    heroTiltTargetRef.current = { x: 0, y: 0 };
    if (!heroTiltRafRef.current) heroTiltRafRef.current = requestAnimationFrame(tickHeroTilt);
  };

  useEffect(() => {
    return () => {
      if (heroTiltRafRef.current) cancelAnimationFrame(heroTiltRafRef.current);
    };
  }, []);

  return (
    <main className={rootClassName}>
      <section
        id="home"
        className="heroV2"
        onPointerMove={onHeroPointerMove}
        onPointerLeave={onHeroPointerLeave}
      >
        <div className="heroDeco" aria-hidden="true">
          <div className="heroDecoScene" ref={heroDecoRef}>
            <span className="heroDecoAura auraA" />
            <span className="heroDecoAura auraB" />
            <span className="heroDecoMotif motifA" />
            <span className="heroDecoMotif motifB" />
            <span className="heroDecoMotif motifC" />
            <span className="heroDecoMotif motifD" />
            <span className="heroDecoMotif motifE" />
            <span className="heroDecoTrail trailA" />
            <span className="heroDecoTrail trailB" />
          </div>
        </div>
        <div className="container heroV2Inner heroV2Inner--developer">
          <div className="heroLeftV2">
            <Reveal>
              <p className="heroEyebrow">{profile.name}</p>
            </Reveal>

            {false ? (
              <Reveal>
                <div className="badge">
                  <span className="badgeSpark" aria-hidden="true">
                  ✦
                  </span>
                  {/* removed */}
                </div>
              </Reveal>
            ) : null}

            <Reveal delayMs={60}>
              <h1 className="heroTitle">
                <span className="heroTitleTop edgyText heroTitleChain" data-text="Full Stack">
                  Full Stack
                </span>
                <span
                  className="heroTitleBottom accentText heroTitleChain heroTitleChain--follow"
                  data-text="Developer"
                >
                  Developer
                </span>
              </h1>
            </Reveal>

            <Reveal delayMs={90}>
              <RotatingTypeLine />
            </Reveal>

            <Reveal delayMs={120}>
              <p className="heroSubtitle">{profile.tagline}</p>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="chipRow" aria-label="Tech highlight">
                {profile.heroChips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={180}>
              <div className="heroButtons">
                <a className="btn2" href="#portfolio">
                  <span>Projects</span>
                  <span className="btnIcon pillLinkIcon" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={210}>
              <div className="iconRow" aria-label="Sosial">
                {visibleSocials.map((s) => {
                  const Icon = socialIcon(s.label);
                  return (
                    <a
                      key={s.href}
                      className="iconBtn"
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      aria-label={s.label}
                      title={s.label}
                    >
                      {Icon ? <Icon title={s.label} /> : s.label.slice(0, 1)}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={180} className="heroWorkbenchReveal">
            <aside className="heroWorkbench" aria-label="Developer summary">
              <div className="heroWorkbenchTop">
                <span className="heroWorkbenchDot" />
                <span className="heroWorkbenchDot" />
                <span className="heroWorkbenchDot" />
                <span className="heroWorkbenchTitle">developer.profile.js</span>
              </div>
              <div className="heroWorkbenchBody">
                <TypingCodeBlock profile={profile} />
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section id="about" className="aboutV2">
        <div className="container">
          <div className="aboutDesktopGrid">
            <div className="aboutDesktopMain">
          <Reveal>
            <div className="aboutHeaderCard" aria-label="About header">
              <div className="aboutHeaderCover" aria-hidden="true" />
              <div className="aboutSectionHead aboutSectionHeadCentered" aria-hidden="true" />
              <div className="aboutHeaderRow">
                <div className="aboutHeaderMain" aria-label="Profile">
                  <div className="aboutHeaderTop">
                    <div className="aboutHeaderAvatarWrap" aria-label="Profile photo">
                      <div className="aboutHeaderAvatarInner">
                        <AvatarPlaceholder alt={`${profile.name} profile photo`} />
                      </div>
                      <span className="aboutHeaderStatus" aria-hidden="true" />
                    </div>

                    <div className="aboutHeaderInfo">
                      <h2 className="aboutHeaderName">{profile.name}</h2>
                      <p
                        className="aboutHeaderMeta muted"
                      >
                        <span className="aboutHeaderMetaLegacy" aria-hidden="true">
                          {profile.role}
                          {profile.age ? ` \u2022 ${profile.age} y/o` : ""}
                        </span>
                        <AnimatedProfileMeta
                          text={
                            profile.age
                              ? `${profile.role} \u2022 ${profile.age} y/o`
                              : profile.role
                          }
                        />
                      </p>
                      <p className="aboutHeaderLocation">
                        <span className="aboutLocIcon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                            />
                            <circle cx="12" cy="10" r="2.6" fill="currentColor" />
                          </svg>
                        </span>
                        <span>{profile.location}</span>
                      </p>
                      {aboutBadges.length ? (
                        <div className="aboutHeaderBadges" aria-label="Focus area">
                          {aboutBadges.map((badge, index) => (
                            <span
                              key={badge}
                              className="aboutHeaderBadge"
                              style={{ "--about-badge-delay": `${index * 140}ms` }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="aboutHeaderActions" aria-label="Social actions">
                    <div className="aboutHeaderIcons">
                      {visibleSocials.map((s) => {
                        const Icon = socialIcon(s.label);
                        return (
                          <a
                            key={s.href}
                            className="iconBtn"
                            href={s.href}
                            target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                            aria-label={s.label}
                            title={s.label}
                          >
                            {Icon ? <Icon title={s.label} /> : s.label.slice(0, 1)}
                          </a>
                        );
                      })}

                      {profile.discordInvite ? (
                        <a
                          className="iconBtn aboutDiscordBtn"
                          href={profile.discordInvite}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Discord"
                          title="Discord"
                        >
                          <span className="aboutDiscordIcon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <path
                                d="M19.54 5.34A16.5 16.5 0 0 0 15.58 4l-.2.39c1.42.42 2.08.98 2.08.98a13.3 13.3 0 0 0-8.92 0s.67-.56 2.08-.98L10.42 4c-1.45.24-2.78.7-3.96 1.34C3.96 9.08 3.28 12.74 3.6 16.34A16.2 16.2 0 0 0 8.46 18.8l.98-1.34c-.54-.2-1.05-.45-1.54-.76l.36-.28c2.98 1.4 6.48 1.4 9.48 0l.36.28c-.49.31-1 .56-1.54.76l.98 1.34a16.2 16.2 0 0 0 4.86-2.46c.38-4.18-.64-7.8-2.86-11ZM9.72 14.28c-.94 0-1.7-.86-1.7-1.92s.74-1.92 1.7-1.92c.95 0 1.72.86 1.7 1.92 0 1.06-.75 1.92-1.7 1.92Zm4.56 0c-.94 0-1.7-.86-1.7-1.92s.75-1.92 1.7-1.92c.95 0 1.72.86 1.7 1.92 0 1.06-.75 1.92-1.7 1.92Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="aboutBodyV3">
            <Reveal delayMs={60}>
              <p className="aboutLead muted">
                <HighlightText text={aboutText} />
              </p>
            </Reveal>

            {profile.quote ? (
              <Reveal delayMs={110}>
                <div className="aboutQuote" aria-label="Quote">
                  <div className="aboutQuoteMark" aria-hidden="true">
                    “
                  </div>
                  <p className="aboutQuoteText">{profile.quote}</p>
                </div>
              </Reveal>
            ) : null}

          </div>
            </div>

          </div>
        </div>
      </section>

      <section id="education" className="eduV2">
        <div className="container">
          <div className="eduHeader">
            <div className="eduHeaderTop">
              <div>
                <Reveal>
                  <p className="kickerV2">{isExperienceMode ? "Experience" : "Education"}</p>
                </Reveal>
                <Reveal delayMs={70}>
                  <h2 className="h2V2">{isExperienceMode ? "Experience" : "Education History"}</h2>
                </Reveal>
              </div>
              <Reveal delayMs={90}>
                <div className="eduModeSwitch" aria-label="Timeline view">
                  <button
                    type="button"
                    className={!isExperienceMode ? "isActive" : ""}
                    onClick={() => setTimelineMode("education")}
                    aria-pressed={!isExperienceMode}
                  >
                    Education
                  </button>
                  <button
                    type="button"
                    className={isExperienceMode ? "isActive" : ""}
                    onClick={() => setTimelineMode("experience")}
                    aria-pressed={isExperienceMode}
                  >
                    Experience
                  </button>
                </div>
              </Reveal>
            </div>
            <Reveal delayMs={110}>
              <div className="eduRibbon" aria-label={`${isExperienceMode ? "Experience" : "Education"} highlights`}>
                <span className="eduRibbonLine" aria-hidden="true" />
                {timelineTags.map((item) => (
                  <span key={item} className="eduRibbonChip">
                    {item}
                  </span>
                ))}
                <span className="eduRibbonLine" aria-hidden="true" />
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={90}>
            <EducationTimeline
              key={timelineMode}
              items={timelineItems}
              label={isExperienceMode ? "Experience timeline" : "Education timeline"}
            />
          </Reveal>
        </div>
      </section>

      <Showcase
        projects={profile.projects}
        skills={profile.skills}
        yearsExperience={profile.yearsExperience}
      />

      <section id="faq" className="faq">
        <div className="container">
          <Reveal>
            <div className="faqHeader">
              <h2 className="h2V2">FAQ</h2>
              <p className="muted">
                Quick notes about how I build, ship, and choose tools.
              </p>
            </div>
          </Reveal>

          <div className="faqGrid">
            {FAQ_ITEMS.map((item, index) => (
              <Reveal key={item.question} delayMs={60 + index * 30}>
                <FaqItem question={item.question} index={index}>
                  {item.answer}
                </FaqItem>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
