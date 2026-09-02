import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../content/site";
import { profile } from "../content/profile";
import { GithubBrandIcon, DiscordBrandIcon } from "./CustomIcons";

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Active section tracking
      const sections = ["home", ...NAV_ITEMS.map(i => i.href.substring(1))];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Scroll progress
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const githubSocial = profile.socials.find(s => s.label === "GitHub");
  const discordSocial = profile.socials.find(s => s.label === "Discord");

  return (
    <>
      {/* ── Scroll progress line ── */}
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── Desktop vertical nav ── */}
      <nav className="site-nav" aria-label="Primary navigation">
        {/* Brand mark */}
        <a href="#home" className="nav-brand-vertical" aria-label="Back to top">
          <div className="nav-brand-mark">AF</div>
          <div className="nav-status-dot" title="Available for projects" />
        </a>

        {/* Section links */}
        <ul className="nav-links" role="list">
          {NAV_ITEMS.map(item => {
            const sec = item.href.substring(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === sec ? "active" : ""}
                  aria-current={activeSection === sec ? "true" : undefined}
                  title={item.label}
                >
                  <span className="nav-link-dot" aria-hidden="true" />
                  <span className="nav-link-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Social links */}
        <div className="nav-socials">
          {githubSocial && (
            <a
              href={githubSocial.href}
              target="_blank"
              rel="noreferrer"
              className="nav-social-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubBrandIcon size={14} />
            </a>
          )}
          {discordSocial && (
            <a
              href={discordSocial.href}
              target="_blank"
              rel="noreferrer"
              className="nav-social-link"
              aria-label="Discord"
              title="Discord"
            >
              <DiscordBrandIcon size={14} />
            </a>
          )}
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <div className="mobile-nav" role="banner">
        <span className="mobile-nav-brand">AF</span>
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span style={{ width: mobileOpen ? "16px" : "22px", transform: mobileOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ width: mobileOpen ? "16px" : "22px", transform: mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>

      <div
        className={`mobile-nav-menu ${mobileOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {NAV_ITEMS.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
