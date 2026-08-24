import { useState } from "react";
import { profile } from "../content/profile";
import { discordUsername } from "../content/site";
import Reveal from "./Reveal";
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
        <span>05</span>
        <span>Contact</span>
      </div>
      <div className="section-body">
        <Reveal>
          <h2 className="contact-title">
            If it needs to be built,
            <em> start on Discord.</em>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lede contact-lede">
            Fastest way to reach me is Discord. Send a message if you want a website, a bot, or help turning a messy idea into something usable.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="discord-stage">
            <a className="discord-main" href={profile.discordInvite} target="_blank" rel="noreferrer">
              <DiscordBrandIcon size={28} />
              <span>
                <small>Open Discord</small>
                <strong>{profile.discordHandle}</strong>
              </span>
              <LaunchArrow size={18} />
            </a>
            <button type="button" className="discord-copy" onClick={copy}>
              {copied ? "Copied" : `Copy ${handle}`}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
