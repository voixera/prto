import { useState } from "react";
import { profile } from "../content/profile";
import { NAV_ITEMS } from "../content/site";
import BrandMark from "./BrandMark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => setOpen(false)}>
        <BrandMark />
        <span>
          faisal<span className="brand-dot">.</span>riza
        </span>
      </a>

      <button
        className={`nav-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary">
        {NAV_ITEMS.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span className="nav-index">0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-status" href={profile.discordInvite} target="_blank" rel="noreferrer">
        <span className="status-dot" />
        Discord
      </a>
    </header>
  );
}
