import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS } from "../content/site";
import { profile } from "../content/profile";
import { GithubBrandIcon, DiscordBrandIcon } from "./CustomIcons";

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
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

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = (event) => event.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
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

      {/* ── Desktop vertical nav ── */}
      <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary navigation">
        {/* Brand mark */}
        <a href="#home" className="nav-brand-vertical" aria-label="Back to top" />

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
                  <span className="nav-link-line" aria-hidden="true" />
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
      <div className={`mobile-nav ${scrolled ? "is-scrolled" : ""}`} role="banner">
        <span className="mobile-nav-brand" aria-hidden="true" />
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

      <AnimatePresence>
      {mobileOpen && <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
        transition={{ duration: .25 }} className="mobile-nav-menu"
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
      </motion.div>}
      </AnimatePresence>
    </>
  );
}
