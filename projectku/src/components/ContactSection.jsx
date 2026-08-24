import { useState } from "react";
import { profile } from "../content/profile";
import { discordUsername } from "../content/site";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { DiscordBrandIcon, LaunchArrow } from "./CustomIcons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const handle = discordUsername();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-index">
        <span className="index-num">05</span>
        <span>Contact</span>
      </div>

      <div className="section-body">
        <Reveal>
          <h2 className="contact-title">
            Have an idea
            <em>worth building?</em>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="lede contact-lede">
            The fastest way to reach me is Discord. Whether you need a website, 
            a bot, or help turning a rough concept into something real — send a message.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="discord-stage">
            <MagneticButton strength={0.2}>
              <a
                className="discord-main"
                href={profile.discordInvite}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="OPEN"
              >
                <DiscordBrandIcon size={24} />
                <span>
                  <small>Open Discord</small>
                  <strong>{profile.discordHandle}</strong>
                </span>
                <LaunchArrow size={16} />
              </a>
            </MagneticButton>
            <button
              type="button"
              className="discord-copy"
              onClick={copy}
              aria-label={`Copy username ${handle}`}
            >
              {copied ? "✓ Copied to clipboard" : `Copy ${handle}`}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
