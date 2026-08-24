import { profile } from "../content/profile";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <svg className="footer-line" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40H1200" />
        <path className="footer-draw" d="M0 40C180 12 360 68 540 40C720 12 900 68 1200 40" />
      </svg>
      <div className="footer-grid">
        <strong>{profile.name}</strong>
        <nav>
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
        <p>© {new Date().getFullYear()} / built in React</p>
      </div>
    </footer>
  );
}
