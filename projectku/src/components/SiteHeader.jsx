import { useState, useEffect } from "react";
import { profile } from "../content/profile";
import { NAV_ITEMS } from "../content/site";
import BrandMark from "./BrandMark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      {/* Brand */}
      <a className="brand" href="#home" onClick={() => setOpen(false)}>
        <BrandMark size={18} />
        <span>
          PORTO<span className="brand-accent">AZURE</span>48
        </span>
      </a>

      {/* Navigation */}
      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Status */}
      <a
        className="header-status"
        href={profile.discordInvite}
        target="_blank"
        rel="noreferrer"
      >
        <span className="status-dot" aria-label="Available on Discord" />
        Discord
      </a>

      {/* Mobile toggle */}
      <button
        className={`nav-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
