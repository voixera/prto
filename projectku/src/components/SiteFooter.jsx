import { profile } from "../content/profile";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">
          PORTO<span style={{ color: 'var(--accent-cyan)' }}>AZURE</span>48
        </span>

        <div className="footer-socials">
          <a href={profile.discordInvite} target="_blank" rel="noreferrer">
            Discord
          </a>
          <a href="https://github.com/voixera" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>

        <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          © {year} {profile.name}. Built with intent.
        </p>
      </div>
    </footer>
  );
}
