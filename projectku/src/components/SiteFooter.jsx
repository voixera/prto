import { profile } from "../content/profile";
import Reveal from "./Reveal";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Reveal as="footer" className="site-footer-reveal" variant="fade" duration={400}>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-socials">
            <a href={profile.discordInvite} target="_blank" rel="noreferrer">Discord</a>
            <a href="https://github.com/voixera" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          <p>
            © {new Date().getFullYear()} {profile.name}. Built with intent.
          </p>
        </div>
      </footer>
    </Reveal>
  );
}
