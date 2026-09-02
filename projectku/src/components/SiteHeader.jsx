import { useState, useEffect } from "react";
import { profile } from "../content/profile";
import { NAV_ITEMS } from "../content/site";

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      <a className="nav-brand" href="#">
        <div className="brand-dot" />
        <span>PORTOAZURE48</span>
      </a>

      <ul className="nav-menu">
        {NAV_ITEMS.map((item) => {
          const sec = item.href.substring(1);
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeSection === sec ? "active" : ""}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <a
        className="btn btn-glass"
        style={{ padding: "6px 16px", fontSize: "0.8125rem", borderRadius: "100px" }}
        href={profile.discordInvite}
        target="_blank"
        rel="noreferrer"
      >
        Discord
      </a>
    </header>
  );
}
