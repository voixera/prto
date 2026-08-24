import { useState } from "react";
import { profile } from "../content/profile";
import Reveal from "./Reveal";
import Hero3DScene from "./Hero3DScene";
import HeroSignal from "./HeroSignal";
import { DiscordBrandIcon, LaunchArrow } from "./CustomIcons";

export default function HeroSection() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
    });
  };

  return (
    <section id="home" className="hero" onPointerMove={onMove}>
      <div className="hero-copy">
        <Reveal>
          <p className="kicker">Portfolio / 2026</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display">
            I build things
            <span>people can actually use.</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede">{profile.tagline}</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">
              Selected work
              <LaunchArrow size={15} />
            </a>
            <a className="btn btn-ghost" href={profile.discordInvite} target="_blank" rel="noreferrer">
              Discord
              <DiscordBrandIcon size={15} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <dl className="hero-meta">
            <div>
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>Web · Discord · Lua</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <div className="hero-stage">
        <HeroSignal pointer={pointer} />
        <Hero3DScene />
        <p className="stage-caption">Interface frames / live scene</p>
      </div>
    </section>
  );
}
