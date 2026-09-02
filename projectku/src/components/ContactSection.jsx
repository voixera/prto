import { profile } from "../content/profile";
import Reveal from "./Reveal";

export default function ContactSection() {
  const githubSocial = profile.socials.find((s) => s.label === "GitHub");

  return (
    <Reveal className="contact-section-reveal" as="section" id="contact" variant="fade" duration={500}>
      <div className="contact-wrapper">
        <div className="section-index" style={{ justifyContent: 'center' }}>
          <span className="index-num">05</span>
          <span>INITIATE CONTACT</span>
        </div>

        <h2 className="contact-hero-text">
          LET'S BUILD <br />
          <span className="text-highlight">SOMETHING REAL.</span>
        </h2>

        <p className="lede" style={{ margin: '0 auto 32px' }}>
          Have a project idea, web application, Discord bot, or script automation in mind? Connect directly via Discord or inspect source code on GitHub.
        </p>

        <div className="contact-actions">
          <a
            className="btn btn-solid"
            style={{ padding: '14px 32px', fontSize: '1rem' }}
            href={profile.discordInvite}
            target="_blank"
            rel="noreferrer"
          >
            DISCORD ({profile.discordHandle})
          </a>

          {githubSocial && (
            <a
              className="btn btn-glass"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
              href={githubSocial.href}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB REPOSITORIES
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
