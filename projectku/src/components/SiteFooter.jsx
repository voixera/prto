import { profile } from "../content/profile";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Animated SVG line */}
      <svg className="footer-svg" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 24H1200" opacity="0.3" />
        <path
          className="footer-path-animated"
          d="M0 24C150 8 300 40 450 24C600 8 750 40 900 24C1050 8 1120 32 1200 24"
          opacity="0.6"
        />
      </svg>

      <div className="footer-inner">
        {/* Brand */}
        <strong className="footer-brand">
          PORTO<span className="brand-accent">AZURE</span>48
        </strong>

        {/* Navigation links */}
        <nav className="footer-links" aria-label="Footer navigation">
          {profile.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              {item.label}
            </a>
          ))}
          <a href={profile.discordInvite} target="_blank" rel="noreferrer">
            Discord
          </a>
        </nav>

        {/* Copyright */}
        <p className="footer-copy">© {year} — Built with intent</p>
      </div>
    </footer>
  );
}
